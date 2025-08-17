import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== Starting property enquiry processing ===");
    
    const enquiry: EnquiryRequest = await req.json();
    console.log("Property enquiry received from:", enquiry.name);
    console.log("Property:", enquiry.propertyTitle);
    console.log("Email:", enquiry.email);
    
    // Input validation
    if (!enquiry.propertyId || !enquiry.name || !enquiry.email) {
      throw new Error("Missing required fields: propertyId, name, and email are required");
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!enquiry.email.test(emailRegex)) {
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

    // Store enquiry in database
    const { error: dbError } = await supabase
      .from("enquiries")
      .insert({
        property_id: enquiry.propertyId,
        property_title: enquiry.propertyTitle,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        check_in: enquiry.checkIn || null,
        check_out: enquiry.checkOut || null,
        guests: enquiry.guests,
        message: enquiry.message,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save enquiry");
    }

    console.log("=== Database save successful ===");

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

    console.log("=== Preparing to send emails ===");

    // Send notification email to Amelia using verified domain
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

    console.log("=== Sending notification email ===");

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const managerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hammond Properties <noreply@hammondproperties.com.au>",
        to: ["amelia@hammondproperties.com.au"],
        reply_to: [enquiry.email],
        subject: `New Property Enquiry: ${enquiry.propertyTitle} - ${enquiry.name}`,
        html: managerEmailHtml,
      }),
    });

    const managerResult = await managerEmailResponse.json();
    console.log("Manager email response:", JSON.stringify(managerResult));

    console.log("=== Sending confirmation email ===");

    // Send confirmation email to guest using verified domain
    const guestEmailHtml = `
     <h2>Thanks for your enquiry!</h2>

<p>Hi ${enquiry.name},</p>

<p>Thanks for your interest in <strong>${enquiry.propertyTitle}</strong>. I’ve received your enquiry and will be in touch as soon as I can to assist with your booking.</p>

<h3>Your enquiry details:</h3>
<p><strong>Property:</strong> ${enquiry.propertyTitle}</p>
<p><strong>Check-in:</strong> ${formatDate(enquiry.checkIn)}</p>
<p><strong>Check-out:</strong> ${formatDate(enquiry.checkOut)}</p>
<p><strong>Guests:</strong> ${enquiry.guests || "Not specified"}</p>

<p>I usually reply within 24 hours. If it’s something urgent, you can always call or text me directly on <a href="tel:0401825547">0401 825 547</a>.</p>

<p>Talk soon,<br>
Amelia Hammond<br>
Hammond Properties</p>

<hr>
<p><em>(This note was sent automatically, but I’ve got your enquiry and will reply personally.)</em></p>

    `;

    const guestEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hammond Properties <noreply@hammondproperties.com.au>",
        to: [enquiry.email],
        reply_to: ["amelia@hammondproperties.com.au"],
        subject: `Property Enquiry Confirmation - ${enquiry.propertyTitle}`,
        html: guestEmailHtml,
      }),
    });

    const guestResult = await guestEmailResponse.json();
    console.log("Guest email response:", JSON.stringify(guestResult));

    console.log("=== All emails sent successfully ===");

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
    console.error("=== ERROR in send-property-enquiry function ===");
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
});