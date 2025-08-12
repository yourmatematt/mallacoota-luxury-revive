import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
console.log("RESEND_API_KEY exists:", !!resendApiKey);
console.log("RESEND_API_KEY starts with re_:", resendApiKey?.startsWith("re_"));

const resend = new Resend(resendApiKey);

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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== Starting contact enquiry processing ===");
    
    const contact: ContactRequest = await req.json();
    console.log("Contact enquiry received from:", contact.name);
    console.log("Email:", contact.email);
    console.log("Enquiry type:", contact.enquiryType);

    // Input validation
    if (!contact.name || !contact.email || !contact.message) {
      throw new Error("Missing required fields: name, email, and message are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      throw new Error("Invalid email format");
    }

    console.log("=== Validation passed ===");

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    console.log("Supabase URL exists:", !!supabaseUrl);
    console.log("Supabase key exists:", !!supabaseKey);
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("=== Saving to database ===");
    
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

    console.log("=== Database save successful ===");

    console.log("=== Preparing to send emails ===");

    // Send notification email to Amelia
    const notificationEmailHtml = `
      <h2>New Contact Enquiry - ${contact.enquiryType}</h2>
      
      <h3>Contact Information:</h3>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || "Not provided"}</p>
      <p><strong>Enquiry Type:</strong> ${contact.enquiryType}</p>
      <p><strong>Subject:</strong> ${contact.subject || "No subject"}</p>
      
      <h3>Message:</h3>
      <p>${contact.message}</p>
      
      <hr>
      <p><em>This enquiry was submitted via the Hammond Properties contact form.</em></p>
    `;

    console.log("=== Sending notification email ===");

    const notificationEmailResponse = await resend.emails.send({
      from: "Hammond Properties <onboarding@resend.dev>",
      to: ["matt@yourmateagency.com.au"],
      reply_to: ["matt@yourmateagency.com.au"],
      subject: `New Contact Enquiry: ${contact.enquiryType} - ${contact.name}`,
      html: notificationEmailHtml,
    });

    console.log("Notification email response:", JSON.stringify(notificationEmailResponse));

    console.log("=== Sending confirmation email ===");

    // Send confirmation email to the contact
    const confirmationEmailHtml = `
      <h2>Thank you for contacting us!</h2>
      
      <p>Hi ${contact.name},</p>
      
      <p>Thank you for your <strong>${contact.enquiryType.toLowerCase()}</strong> enquiry. We have received your message and will get back to you as soon as possible.</p>
      
      <h3>Your enquiry details:</h3>
      <p><strong>Subject:</strong> ${contact.subject || "General enquiry"}</p>
      <p><strong>Message:</strong> ${contact.message}</p>
      
      <p>We typically respond to enquiries within 24 hours. If you have any urgent questions, please don't hesitate to call us directly at 0401 825 547.</p>
      
      <p>Best regards,<br>
      Amelia Hammond<br>
      Hammond Properties</p>
      
      <hr>
      <p><em>This is an automated confirmation email from Hammond Properties.</em></p>
    `;

    const confirmationEmailResponse = await resend.emails.send({
      from: "Hammond Properties <onboarding@resend.dev>",
      to: [contact.email],
      reply_to: ["matt@yourmateagency.com.au"],
      subject: `Contact Enquiry Received - We'll be in touch soon!`,
      html: confirmationEmailHtml,
    });

    console.log("Confirmation email response:", JSON.stringify(confirmationEmailResponse));

    console.log("=== All emails sent successfully ===");

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
    console.error("=== ERROR in send-contact-enquiry function ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to submit enquiry. Please try again or contact us directly." 
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