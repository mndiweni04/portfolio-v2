import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

// Core pricing logic synchronized from packages.json
const PACKAGE_PRICES = {
    basic: { name: "Basic Webpage", basePrice: 2500, delivery: "3-5 Days" },
    starter: { name: "Starter (MVP)", basePrice: 12500, delivery: "10-14 Days" },
    growth: { name: "Growth (Custom)", basePrice: 35000, delivery: "21-30 Days" },
    enterprise: { name: "Enterprise", basePrice: 75000, delivery: "45+ Days" }
};

const ADDON_PRICES = {
    shareCode: 5000,
    hostingBasic: 250,
    seoOptimization: 3500
};

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message, inquiryType, serviceType, rawAddonIds } = body;

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Internal notification
            subject: `Portfolio Protocol: ${inquiryType.toUpperCase()} from ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        let clientMailOptions = {
            from: `"Mandla Ndiweni | MCSAS" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Architecture Request Received - Staging Documents enclosed`,
            text: `Dear ${firstName},\n\nThank you for requesting an architecture review. Attached you will find the formal Master Service Agreement, Privacy Policy, and your dynamic Statement of Work (SOW) based on your selection.\n\nBest,\nMandla Ndiweni`,
            attachments: []
        };

        if (inquiryType === 'project' && serviceType && PACKAGE_PRICES[serviceType]) {
            const pkg = PACKAGE_PRICES[serviceType];
            
            let addonsTotal = 0;
            if (rawAddonIds) {
                const addonsArr = rawAddonIds.split(',');
                addonsArr.forEach(id => {
                    if (ADDON_PRICES[id]) addonsTotal += ADDON_PRICES[id];
                });
            }

            const commitmentFee = pkg.basePrice * 0.10;
            const remainingBalance = (pkg.basePrice * 0.90) + addonsTotal;
            const totalBudget = pkg.basePrice + addonsTotal;

            // Generate Legal Framework PDF (MSA & POPIA)
            const legalDoc = new jsPDF();
            legalDoc.setFontSize(16);
            legalDoc.text("MASTER SERVICE AGREEMENT (MSA)", 15, 20);
            legalDoc.setFontSize(10);
            
            const legalText = `
Executed by and between: MCSAS (Developer) AND ${firstName} ${lastName} (Client).

1. DEFINITIONS
1.1 Base Architecture: Pre-existing software frameworks.
1.2 Commitment Fee: Non-refundable 10% payment.
1.3 Final Acceptance: Confirmation that software conforms to requirements.

2. THE COMMITMENT MODEL
2.1 Commencement: Begins upon receipt of the Commitment Fee.
2.2 Non-Refundability: The 10% Commitment Fee is expressly non-refundable.

3. DEMONSTRATION AND REVISIONS
3.1 Revisions: Client is entitled to a maximum of three (3) rounds of revisions.
3.2 Scope: Changes outside original SOW are classified as Change Orders.

4. PAYMENT TRIGGER AND DELIVERY
4.1 Full settlement is required prior to live migration or code handover.
4.2 Failure to pay within 14 days results in Staging decommissioning.

5. INTELLECTUAL PROPERTY AND LIABILITY
5.1 Liability is capped at total fees paid under the SOW.

----------------------------------------------------------------------------------
PRIVACY POLICY (POPIA COMPLIANT)

1. DATA COLLECTION: Processed exclusively for technical scope and communication.
2. SUB-PROCESSORS: Cloud infrastructure is hosted predominantly in South Africa.
3. DATA SECURITY: Deploys encrypted protocols and access-controlled servers.
            `;
            const splitLegalText = legalDoc.splitTextToSize(legalText.trim(), 180);
            legalDoc.text(splitLegalText, 15, 30);
            const legalPdfBuffer = Buffer.from(legalDoc.output('arraybuffer'));

            // Generate Statement of Work PDF (SOW)
            const sowDoc = new jsPDF();
            sowDoc.setFontSize(16);
            sowDoc.text("STATEMENT OF WORK (SOW)", 15, 20);
            sowDoc.setFontSize(10);
            
            const generatedId = `SOW-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
            
            const sowText = `
SOW IDENTIFIER: ${generatedId} | Date of Issue: ${new Date().toISOString().split('T')[0]}

1. PROJECT SUMMARY
Client Entity Name: ${firstName} ${lastName}
Selected Base Architecture Tier: ${pkg.name}

2. FINANCIAL BREAKDOWN
Base Architecture Fee: R ${pkg.basePrice.toLocaleString()}
Commitment Fee (10% of Base): R ${commitmentFee.toLocaleString()}
Selected Add-ons Total: R ${addonsTotal.toLocaleString()}

Total Estimated Project Budget: R ${totalBudget.toLocaleString()}
Remaining Balance Due Upon Acceptance: R ${remainingBalance.toLocaleString()}

3. DELIVERY SCHEDULE AND REVISION PROTOCOL
Estimated Delivery Timeline: ${pkg.delivery}
Revision Entitlement: Three (3) Formal Rounds on Staging environment.

4. FORMAL AUTHORIZATION
Payment of the Commitment Fee (R ${commitmentFee.toLocaleString()}) authorizes MCSAS to commence.
            `;
            const splitSowText = sowDoc.splitTextToSize(sowText.trim(), 180);
            sowDoc.text(splitSowText, 15, 30);
            const sowPdfBuffer = Buffer.from(sowDoc.output('arraybuffer'));

            // Attach to client email
            clientMailOptions.attachments = [
                {
                    filename: 'MCSAS_Legal_Agreement.pdf',
                    content: legalPdfBuffer,
                    contentType: 'application/pdf'
                },
                {
                    filename: `SOW_${generatedId}.pdf`,
                    content: sowPdfBuffer,
                    contentType: 'application/pdf'
                }
            ];
            
            // Append payload to internal notification
            mailOptions.text += `\n\n[System Alert: SOW and Legal Documents auto-generated and dispatched to client. Budget: R${totalBudget}]`;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send to self
        await transporter.sendMail(mailOptions);
        
        // Dispatch legal documents to client if it was a project request
        if (inquiryType === 'project' && clientMailOptions.attachments.length > 0) {
            await transporter.sendMail(clientMailOptions);
        }

        return NextResponse.json({ message: "Transmission verified and documents dispatched." }, { status: 200 });

    } catch (error) {
        console.error('Email Routing Error:', error);
        return NextResponse.json({ error: "Failed to dispatch payload." }, { status: 500 });
    }
}