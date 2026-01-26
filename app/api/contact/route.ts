import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 1. Ensure your API Key is in .env.local as RESEND_API_KEY
// If not using .env yet, replace process.env.RESEND_API_KEY with your string 're_i3u1...'
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, "project-type": projectType, message } = body;

    // DEBUG: This will show up in your terminal to confirm data is arriving
    console.log("Form Data Received:", { name, email, projectType });

    const { data, error } = await resend.emails.send({
      /* CRITICAL: If your domain 'dukainteriors.com' is NOT yet verified in Resend,
         you MUST use 'onboarding@resend.dev' as the 'from' address.
      */
      from: 'Duka Website <onboarding@resend.dev>',
      
      /* CRITICAL: If your domain is NOT verified, Resend only allows you to 
         send emails TO THE EMAIL ADDRESS YOU SIGNED UP WITH.
         Change 'YOUR_SIGNUP_EMAIL@GMAIL.COM' to your actual Gmail below.
      */
      to: 'YOUR_SIGNUP_EMAIL@GMAIL.COM', 
      
      subject: `NEW INQUIRY: ${name} (${projectType})`,
      reply_to: email, // This lets you reply directly to the client from your inbox
      text: `
        NEW LEAD DETAILS:
        -----------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Project Type: ${projectType}
        
        MESSAGE:
        ${message}
        
        ---
        Sent via Duka Interiors Contact Form
      `,
    });

    if (error) {
      // This log is vital for you to see WHY it failed (e.g., "Unauthorized" or "Unverified")
      console.error("Resend API Specific Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}