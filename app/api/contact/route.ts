import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Hardcoded key as requested to bypass environment variable issues
const resend = new Resend('re_i3u1LBAY_KaSTg1hadfbL3gEsCqk2ieF3');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Extracting fields from your form
    const { name, email, phone, "project-type": projectType, message } = body;

    const { data, error } = await resend.emails.send({
      /**
       * CHANGE 1: THE SENDER
       * Now that you are verified, you MUST use an email from your domain.
       * 'onboarding@resend.dev' will no longer work for external sending.
       */
      from: 'Duka Interiors <info@dukainteriors.com>', 
      
      /**
       * CHANGE 2: THE RECIPIENT
       * You can now send directly to your business email or your gmail.
       */
      to: 'contact@dukainteriors.com', 
      
      subject: `New Project Inquiry: ${name}`,
      
      // This allows you to click 'Reply' in your email app to talk to the customer
      reply_to: email, 
      
      text: `
        NEW LEAD DETAILS
        ================
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Project: ${projectType}
        
        MESSAGE:
        ${message}
        
        --------------------------------------------------
        This email was sent from the Duka Interiors Website.
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("System Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}