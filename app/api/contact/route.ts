import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_i3u1LBAY_KaSTg1hadfbL3gEsCqk2ieF3');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, "project-type": projectType, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Duka Website <onboarding@resend.dev>',
      to: 'contact@dukainteriors.com',
      subject: `NEW INQUIRY: ${name} - ${projectType}`,
      reply_to: email,
      text: `
        New Lead from Duka Interiors Website:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Project: ${projectType}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}