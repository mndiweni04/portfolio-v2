import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // 1. Parse the request body from the frontend
        const { firstName, lastName, email, message } = await request.json();

        // 2. Validate fields
        if (!firstName || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 3. Prepare payload for EmailJS API
        // NOTE: Ensure your EmailJS Template uses variables: {{from_name}}, {{reply_to}}, {{message}}
        const payload = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY, // Securely authenticates the request
            template_params: {
                from_name: `${firstName} ${lastName}`,
                reply_to: email,
                message: message,
            },
        };

        // 4. Send to EmailJS REST API
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
        } else {
            const errorData = await response.text();
            console.error("EmailJS Error:", errorData);
            return NextResponse.json({ error: "Failed to send email via EmailJS." }, { status: 500 });
        }

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}