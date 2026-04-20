import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

const PACKAGE_PRICES = {
    basic: { name: "Basic Webpage", basePrice: 2500, delivery: "3-5 Days" },
    starter: { name: "Starter (MVP)", basePrice: 12500, delivery: "10-14 Days" },
    growth: { name: "Growth (Custom)", basePrice: 35000, delivery: "21-30 Days" },
    enterprise: { name: "Enterprise", basePrice: 75000, delivery: "45+ Days" }
};

const ADDON_PRICES = {
    additionalPages: 1000,
    shareCode: 5000,
    emailServer: 1500,
    analytics: 1200,
    cmsSetup: 3500,
    chatbotDialogflow: 4500,
    chatbotBotpress: 8500,
    chatbotPowerVirtual: 12500,
    chatbotRasa: 18500,
    chatbotWatson: 32000
};

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message, inquiryType, serviceType, rawAddonIds, isFastTrack } = body;

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
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
                addonsArr.forEach(pair => {
                    const id = pair.split(':')[0];
                    const qty = parseInt(pair.split(':')[1]) || 1;
                    if (ADDON_PRICES[id]) addonsTotal += (ADDON_PRICES[id] * qty);
                });
            }

            // Zero-Sum Fast-Track Logic Implementation
            const commitmentPercentage = isFastTrack ? 0.25 : 0.10;
            const balancePercentage = isFastTrack ? 0.75 : 0.90;

            const commitmentFee = pkg.basePrice * commitmentPercentage;
            const remainingBalance = (pkg.basePrice * balancePercentage) + addonsTotal;
            const totalBudget = pkg.basePrice + addonsTotal;

            // Generate Legal Framework PDF
            const legalDoc = new jsPDF();
            legalDoc.setFontSize(16);
            legalDoc.text("MASTER SERVICE AGREEMENT (MSA)", 15, 20);
            legalDoc.setFontSize(10);
            
            const legalText = `
Executed by and between: MCSAS (Developer) AND ${firstName} ${lastName} (Client).

1. DEFINITIONS
1.1 Base Architecture: Pre-existing software frameworks.
1.2 Commitment Fee: Non-refundable upfront payment (${commitmentPercentage * 100}% of Base).
1.3 Final Acceptance: Confirmation that software conforms to requirements.

2. THE COMMITMENT MODEL
2.1 Commencement: Begins upon receipt of the Commitment Fee.
2.2 Non-Refundability: The Commitment Fee is expressly non-refundable.

3. DEMONSTRATION AND REVISIONS
3.1 Revisions: Client is entitled to a maximum of three (3) rounds of revisions.
3.2 Scope: Changes outside original SOW are classified as Change Orders.

4. PAYMENT TRIGGER AND DELIVERY
4.1 Full settlement is required prior to live migration or code handover.
4.2 Failure to pay within 14 days results in Staging decommissioning.

----------------------------------------------------------------------------------
PRIVACY POLICY (POPIA COMPLIANT)

1. DATA COLLECTION: Processed exclusively for technical scope and communication.
2. SUB-PROCESSORS: Cloud infrastructure is hosted predominantly in South Africa.
3. DATA SECURITY: Deploys encrypted protocols and access-controlled servers.
            `;
            const splitLegalText = legalDoc.splitTextToSize(legalText.trim(), 180);
            legalDoc.text(splitLegalText, 15, 30);
            const legalPdfBuffer = Buffer.from(legalDoc.output('arraybuffer'));

            // Generate Statement of Work PDF
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
Delivery Timeline Modifier: ${isFastTrack ? "PRIORITY FAST-TRACK APPLIED" : "Standard"}

2. FINANCIAL BREAKDOWN
Base Architecture Fee: R ${pkg.basePrice.toLocaleString()}
Selected Add-ons Total: R ${addonsTotal.toLocaleString()}
Total Estimated Project Budget: R ${totalBudget.toLocaleString()}

3. INVOICING SCHEDULE
Upfront Commitment Fee (${commitmentPercentage * 100}% of Base): R ${commitmentFee.toLocaleString()}
Remaining Balance Due Upon Acceptance: R ${remainingBalance.toLocaleString()}

4. DELIVERY SCHEDULE AND REVISION PROTOCOL
Revision Entitlement: Three (3) Formal Rounds on Staging environment.

5. FORMAL AUTHORIZATION
Payment of the Commitment Fee (R ${commitmentFee.toLocaleString()}) authorizes MCSAS to commence operations.
            `;
            const splitSowText = sowDoc.splitTextToSize(sowText.trim(), 180);
            sowDoc.text(splitSowText, 15, 30);
            const sowPdfBuffer = Buffer.from(sowDoc.output('arraybuffer'));

            clientMailOptions.attachments = [
                { filename: 'MCSAS_Legal_Agreement.pdf', content: legalPdfBuffer, contentType: 'application/pdf' },
                { filename: `SOW_${generatedId}.pdf`, content: sowPdfBuffer, contentType: 'application/pdf' }
            ];
            
            mailOptions.text += `\n\n[System Alert: SOW auto-generated. Budget: R${totalBudget} | Fast-Track: ${isFastTrack}]`;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail(mailOptions);
        if (inquiryType === 'project' && clientMailOptions.attachments.length > 0) {
            await transporter.sendMail(clientMailOptions);
        }

        return NextResponse.json({ message: "Transmission verified and documents dispatched." }, { status: 200 });

    } catch (error) {
        console.error('Email Routing Error:', error);
        return NextResponse.json({ error: "Failed to dispatch payload." }, { status: 500 });
    }
}