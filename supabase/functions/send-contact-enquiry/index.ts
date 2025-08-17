import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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

serve(async (req) => {
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

    // Send notification email to Amelia using Resend API directly
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
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

    const notificationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hammond Properties <noreply@hammondproperties.com.au>",
        to: ["amelia@hammondproperties.com.au"],
        reply_to: [contact.email],
        subject: `New Contact Enquiry: ${contact.enquiryType} - ${contact.name}`,
        html: notificationEmailHtml,
      }),
    });

    const notificationResult = await notificationEmailResponse.json();
    console.log("Notification email response:", JSON.stringify(notificationResult));

    console.log("=== Sending confirmation email ===");

    // Send confirmation email to the contact
    const confirmationEmailHtml = `
      <h2>Thanks for reaching out to Hammond Properties!</h2>

<p>Hi ${contact.name},</p>

<p>I’ve received your <strong>${contact.enquiryType.toLowerCase()}</strong> enquiry and just wanted to let you know it landed safely in my inbox. I’ll be back in touch as soon as I can.</p>

<h3>Your enquiry details:</h3>
<p><strong>Subject:</strong> ${contact.subject || "General enquiry"}</p>
<p><strong>Message:</strong> ${contact.message}</p>

<p>I usually reply within 24 hours. If it’s something urgent, feel free to give me a call or send me a text on <a href="tel:0401825547">0401 825 547</a>.</p>

<p>Talk soon,<br>
Amelia Hammond<br>
Hammond Properties</p>

<hr>
<p><em>(This note was sent automatically, but I’ve got your message and will be in touch personally.)</em></p>

    `;

    const confirmationEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hammond Properties <noreply@hammondproperties.com.au>",
        to: [contact.email],
        reply_to: ["amelia@hammondproperties.com.au"],
        subject: `Contact Enquiry Received - We'll be in touch soon!`,
        html: confirmationEmailHtml,
      }),
    });

    const confirmationResult = await confirmationEmailResponse.json();
    console.log("Confirmation email response:", JSON.stringify(confirmationResult));

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
});