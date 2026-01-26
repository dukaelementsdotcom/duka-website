import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// I am hardcoding your key here to ensure the "undefined" error stops happening.
const resend = new Resend('re_i3u1LBAY_KaSTg1hadfbL3gEsCqk2ieF3');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // We match the names exactly as they are in your form
    const { name, email, phone, "project-type": projectType, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Duka Website <onboarding@resend.dev>',
      // CRITICAL: Change this to the email you used to log into Resend.com
      to: 'YOUR_PERSONAL_GMAIL_HERE@gmail.com', 
      subject: `New Lead: ${name}`,
      reply_to: email,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Project: ${projectType}
        Message: ${message}
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("System Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}