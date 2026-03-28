import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { inquiryType, firstName, lastName, email, message, serviceType, timeline } = body;

        // Verify primary credentials
        if (!process.env.EMAILJS_PRIVATE_KEY) {
            return NextResponse.json({ error: "Server missing Private Key" }, { status: 500 });
        }

        // Logical Routing: Determine template based on client submission
        const isProject = inquiryType === 'project';
        const targetTemplateId = isProject 
            ? process.env.EMAILJS_PROJECT_TEMPLATE_ID 
            : process.env.EMAILJS_GENERAL_TEMPLATE_ID;

        // Validate target template exists in environment variables
        if (!targetTemplateId) {
            return NextResponse.json({ error: "Server missing target Template ID configuration" }, { status: 500 });
        }

        const payload = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: targetTemplateId,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: {
                from_firstname: firstName, 
                from_lastname: lastName,
                from_email: email,
                from_message: message,
                from_name: `${firstName} ${lastName}`,
                reply_to: email,
                
                // Project-specific fields. Fallback to 'N/A' if general inquiry.
                service_type: serviceType || 'N/A', 
                project_timeline: timeline || 'N/A'
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
