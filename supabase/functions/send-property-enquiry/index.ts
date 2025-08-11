import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EnquiryRequest {
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const enquiry: EnquiryRequest = await req.json();
    
    // Input validation
    if (!enquiry.propertyId || !enquiry.name || !enquiry.email) {
      throw new Error("Missing required fields: propertyId, name, and email are required");
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enquiry.email)) {
      throw new Error("Invalid email format");
    }
    
    console.log("Enquiry received for property:", enquiry.propertyId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store enquiry in database
    const { error: dbError } = await supabase
      .from("enquiries")
      .insert({
        property_id: enquiry.propertyId,
        property_title: enquiry.propertyTitle,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        check_in: enquiry.checkIn,
        check_out: enquiry.checkOut,
        guests: enquiry.guests,
        message: enquiry.message,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save enquiry");
    }

    // Format dates for email display
    const formatDate = (dateStr?: string) => {
      if (!dateStr) return "Not specified";
      return new Date(dateStr).toLocaleDateString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Send notification email to Amelia
    const managerEmailHtml = `
      <h2>New Property Enquiry - ${enquiry.propertyTitle}</h2>
      
      <h3>Guest Information:</h3>
      <p><strong>Name:</strong> ${enquiry.name}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Phone:</strong> ${enquiry.phone || "Not provided"}</p>
      
      <h3>Stay Details:</h3>
      <p><strong>Property:</strong> ${enquiry.propertyTitle}</p>
      <p><strong>Check-in:</strong> ${formatDate(enquiry.checkIn)}</p>
      <p><strong>Check-out:</strong> ${formatDate(enquiry.checkOut)}</p>
      <p><strong>Guests:</strong> ${enquiry.guests || "Not specified"}</p>
      
      <h3>Message:</h3>
      <p>${enquiry.message || "No additional message provided."}</p>
      
      <hr>
      <p><em>This enquiry was submitted via the Hammond Properties website.</em></p>
    `;

    const managerEmailResponse = await resend.emails.send({
      from: "Hammond Properties <amelia@hammondproperties.com.au>",
      to: ["amelia@hammondproperties.com.au"],
      subject: `New Property Enquiry: ${enquiry.propertyTitle} - ${enquiry.name}`,
      html: managerEmailHtml,
    });

    console.log("Manager email sent successfully");

    // Send confirmation email to guest
    const guestEmailHtml = `
      <h2>Thank you for your enquiry!</h2>
      
      <p>Hi ${enquiry.name},</p>
      
      <p>Thank you for your interest in <strong>${enquiry.propertyTitle}</strong>. We have received your enquiry and will get back to you as soon as possible.</p>
      
      <h3>Your enquiry details:</h3>
      <p><strong>Property:</strong> ${enquiry.propertyTitle}</p>
      <p><strong>Check-in:</strong> ${formatDate(enquiry.checkIn)}</p>
      <p><strong>Check-out:</strong> ${formatDate(enquiry.checkOut)}</p>
      <p><strong>Guests:</strong> ${enquiry.guests || "Not specified"}</p>
      
      <p>We typically respond to enquiries within 24 hours. If you have any urgent questions, please don't hesitate to contact us directly at amelia@hammondproperties.com.au or call us on 0401 825 547.</p>
      
      <p>Best regards,<br>
      Amelia Hammond<br>
      Hammond Properties</p>
      
      <hr>
      <p><em>This is an automated confirmation email from Hammond Properties.</em></p>
    `;

    const guestEmailResponse = await resend.emails.send({
      from: "Hammond Properties <amelia@hammondproperties.com.au>",
      to: [enquiry.email],
      subject: `Property Enquiry Confirmation - ${enquiry.propertyTitle}`,
      html: guestEmailHtml,
    });

    console.log("Guest confirmation email sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Enquiry submitted successfully" 
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
    console.error("Error in send-property-enquiry function:", error.message);
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