import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, message } = body; // Read Frontend Names

        if (!process.env.EMAILJS_PRIVATE_KEY) {
            return NextResponse.json({ error: "Server missing Private Key" }, { status: 500 });
        }

        const payload = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: {
                // Map Frontend Names -> EmailJS Template Names
                from_firstname: firstName, 
                from_lastname: lastName,
                from_email: email,
                from_message: message,
                
                // Extra helper for templates using {{from_name}}
                from_name: `${firstName} ${lastName}`,
                reply_to: email
            },
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}