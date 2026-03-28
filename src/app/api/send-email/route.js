import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { inquiryType, firstName, lastName, email, message, serviceType, timeline } = body;

        // 1. Strict Validation Layer
        if (!firstName || !email || !message) {
            return NextResponse.json({ error: "Missing required fields: Name, Email, or Message" }, { status: 400 });
        }

        if (!process.env.EMAILJS_PRIVATE_KEY) {
            return NextResponse.json({ error: "Server configuration error: Missing Private Key" }, { status: 500 });
        }

        // 2. Data Preparation
        const generalSubjects = ["New General Inquiry", "Contact Form Submission", "General Information Request"];
        const projectSubjects = ["New Project Request", "Service Inquiry Submission", "Project Scope Details"];
        
        const subjectOptions = inquiryType === 'project' ? projectSubjects : generalSubjects;
        const selectedSubject = subjectOptions[Math.floor(Math.random() * subjectOptions.length)];
        const inquiryLabel = inquiryType === 'project' ? `Project: ${serviceType}` : 'General Inquiry';
        
        let finalMessage = '';
        if (inquiryType === 'project') {
            finalMessage += `TIMELINE: ${timeline}\n--------------------------\n\n`;
        }
        finalMessage += `MESSAGE:\n${message}`;

        // 3. Payload Mapping
        const templateParams = {
            subject_line: selectedSubject,
            inquiry_label: inquiryLabel,
            from_firstname: firstName,
            from_lastname: lastName,
            from_email: email,
            from_message: finalMessage,
            reply_to: email
        };

        const payload = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID, 
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: templateParams,
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