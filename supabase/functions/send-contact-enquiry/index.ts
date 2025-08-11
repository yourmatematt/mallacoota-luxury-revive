import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  enquiryType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contact: ContactRequest = await req.json();
    
    // Input validation
    if (!contact.name || !contact.email || !contact.message) {
      throw new Error("Missing required fields: name, email, and message are required");
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      throw new Error("Invalid email format");
    }
    
    console.log("Contact enquiry received from:", contact.email);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store contact enquiry in database
    const { error: dbError } = await supabase
      .from("contact_enquiries")
      .insert({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
        enquiry_type: contact.enquiryType,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save contact enquiry");
    }

    // Send notification email to Amelia
    const managementEmailHtml = `
      <h2>New Contact Enquiry - ${contact.enquiryType || 'General'}</h2>
      
      <h3>Contact Information:</h3>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
      <p><strong>Enquiry Type:</strong> ${contact.enquiryType || "General"}</p>
      <p><strong>Subject:</strong> ${contact.subject || "No subject provided"}</p>
      
      <h3>Message:</h3>
      <p>${contact.message}</p>
      
      <hr>
      <p><em>This enquiry was submitted via the Hammond Properties website.</em></p>
    `;

    const managementEmailResponse = await resend.emails.send({
      from: "Hammond Properties <amelia@hammondproperties.com.au>",
      to: ["amelia@hammondproperties.com.au"],
      subject: `New Contact Enquiry: ${contact.enquiryType || 'General'} - ${contact.name}`,
      html: managementEmailHtml,
    });

    console.log("Management email sent successfully");

    // Send confirmation email to contact
    const confirmationEmailHtml = `
      <h2>Thank you for contacting us!</h2>
      
      <p>Hi ${contact.name},</p>
      
      <p>Thank you for reaching out to Hammond Properties. We have received your ${contact.enquiryType?.toLowerCase() || 'general'} enquiry and will get back to you as soon as possible.</p>
      
      <h3>Your enquiry details:</h3>
      <p><strong>Enquiry Type:</strong> ${contact.enquiryType || "General"}</p>
      <p><strong>Subject:</strong> ${contact.subject || "No subject provided"}</p>
      <p><strong>Message:</strong> ${contact.message}</p>
      
      <p>We typically respond to enquiries within 24 hours. If you have any urgent questions, please don't hesitate to contact us directly at amelia@hammondproperties.com.au or call us on 0401 825 547.</p>
      
      <p>Best regards,<br>
      Amelia Hammond<br>
      Hammond Properties</p>
      
      <hr>
      <p><em>This is an automated confirmation email from Hammond Properties.</em></p>
    `;

    const confirmationEmailResponse = await resend.emails.send({
      from: "Hammond Properties <amelia@hammondproperties.com.au>",
      to: [contact.email],
      subject: `Contact Enquiry Confirmation - Hammond Properties`,
      html: confirmationEmailHtml,
    });

    console.log("Confirmation email sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact enquiry submitted successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-enquiry function:", error.message);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to submit contact enquiry. Please try again or contact us directly." 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);