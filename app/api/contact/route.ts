import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  // Key lives in Vercel → Settings → Environment Variables, never in the code
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  try {
    const body = await req.json();

    // Extracting fields from your form
    const { name, email, phone, "project-type": projectType, area, budget, timeline, message } = body;

    const { data, error } = await resend.emails.send({
      // Must be an address on the verified dukainteriors.com domain
      from: 'Duka Interiors <info@dukainteriors.com>',
      to: 'contact@dukainteriors.com',

      subject: `New Project Inquiry: ${name}${projectType ? ` – ${projectType}` : ''}`,

      // This allows you to click 'Reply' in your email app to talk to the customer
      ...(email ? { replyTo: email } : {}),

      text: `
        NEW LEAD DETAILS
        ================
        Name: ${name}
        Email: ${email || 'Not provided'}
        Phone: ${phone || 'Not provided'}
        Project: ${projectType}
        Area: ${area ? `${area} m²` : 'Not provided'}
        Budget: ${budget || 'Not provided'}
        Timeline: ${timeline || 'Not provided'}

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
