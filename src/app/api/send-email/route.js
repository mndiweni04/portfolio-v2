import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

const PACKAGE_PRICES = {
    basic: { name: "Basic Webpage", basePrice: 2500 },
    starter: { name: "Starter (MVP)", basePrice: 12500 },
    growth: { name: "Growth (Custom)", basePrice: 35000 },
    enterprise: { name: "Enterprise", basePrice: 75000 }
};

const ADDON_PRICES = {
    additionalPages: { name: "Additional Pages", price: 1000 },
    shareCode: { name: "Full Source Ownership", price: 5000 },
    emailServer: { name: "Domain & Email Configuration", price: 1500 },
    analytics: { name: "Standard Analytics Setup", price: 1200 },
    cmsSetup: { name: "Lightweight CMS", price: 3500 },
    chatbotDialogflow: { name: "Website Chatbot (Dialogflow)", price: 4500 },
    chatbotBotpress: { name: "Hybrid Chatbot (Botpress)", price: 8500 },
    chatbotPowerVirtual: { name: "Internal Ops Bot", price: 12500 },
    chatbotRasa: { name: "Private AI Agent (Rasa)", price: 18500 },
    chatbotWatson: { name: "Enterprise Customer Support", price: 32000 }
};

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message, inquiryType, serviceType, rawAddonIds, isFastTrack, timeline } = body;

        // Initialize Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: { 
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Protocol: ${isFastTrack ? '[PRIORITY] ' : ''}${inquiryType.toUpperCase()} from ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`,
            attachments: []
        };

        let clientMailOptions = {
            from: `"Mandla Ndiweni | MCSAS" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Architecture Request Received - Staging Documents Enclosed`,
            text: `Dear ${firstName},\n\nThank you for requesting an architecture review. Attached you will find the formal Master Service Agreement, Privacy Policy, and your dynamic Statement of Work (SOW) based on your selection.\n\nBest,\nMandla Ndiweni`,
            attachments: []
        };

        // Project Specific Logic (Pricing & PDF Generation)
        if (inquiryType === 'project' && serviceType && PACKAGE_PRICES[serviceType]) {
            const pkg = PACKAGE_PRICES[serviceType];
            let addonsTotal = 0;
            let addonsDisplayString = "";

            // Guard: Only process addons if rawAddonIds is a valid string
            if (rawAddonIds && typeof rawAddonIds === 'string') {
                const addonsArr = rawAddonIds.split(',');
                addonsArr.forEach(pair => {
                    const parts = pair.split(':');
                    const id = parts[0];
                    const qty = parseInt(parts[1]) || 1;
                    if (ADDON_PRICES[id]) {
                        const addonCost = ADDON_PRICES[id].price * qty;
                        addonsTotal += addonCost;
                        addonsDisplayString += `- ${ADDON_PRICES[id].name} (x${qty}): R ${addonCost.toLocaleString()}\n`;
                    }
                });
            }

            const commitmentPercentage = isFastTrack ? 0.25 : 0.10;
            const balancePercentage = isFastTrack ? 0.75 : 0.90;
            const commitmentFee = pkg.basePrice * commitmentPercentage;
            const totalBudget = pkg.basePrice + addonsTotal;
            const remainingBalance = totalBudget - commitmentFee;

            // Generate Legal Framework PDF
            const legalDoc = new jsPDF();
            legalDoc.setFontSize(16);
            legalDoc.text("MASTER SERVICE AGREEMENT (MSA)", 15, 20);
            legalDoc.setFontSize(10);
            
            const legalText = `Executed by and between: MCSAS (Developer) AND ${firstName} ${lastName} (Client).

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

5. LIABILITY AND THIRD-PARTY INFRASTRUCTURE
5.1 Liability is capped at total fees paid under the SOW.
5.2 Third-Party Framework Dependency: MCSAS is not liable for upstream outages or latency native to third-party providers (e.g., Dialogflow, Watson).

----------------------------------------------------------------------------------
PRIVACY POLICY (POPIA COMPLIANT)
1. DATA COLLECTION: Processed exclusively for technical scope and communication.
2. SUB-PROCESSORS: Cloud infrastructure is hosted predominantly in South Africa.
3. DATA SECURITY: Deploys encrypted protocols and access-controlled servers.`;

            const splitLegalText = legalDoc.splitTextToSize(legalText.trim(), 180);
            legalDoc.text(splitLegalText, 15, 30);
            const legalPdfBuffer = Buffer.from(legalDoc.output('arraybuffer'));

            // Generate Statement of Work PDF
            const sowDoc = new jsPDF();
            sowDoc.setFontSize(16);
            sowDoc.text("STATEMENT OF WORK (SOW)", 15, 20);
            sowDoc.setFontSize(10);
            
            const generatedId = `SOW-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
            const sowText = `SOW IDENTIFIER: ${generatedId} | Date of Issue: ${new Date().toISOString().split('T')[0]}

1. PROJECT SUMMARY
Client Entity Name: ${firstName} ${lastName}
Selected Base Architecture Tier: ${pkg.name}
Target Delivery Timeline: ${timeline || 'Determined by Tier'}
Delivery Modifier: ${isFastTrack ? "PRIORITY FAST-TRACK APPLIED" : "Standard"}

2. FINANCIAL BREAKDOWN
Base Architecture Fee: R ${pkg.basePrice.toLocaleString()}
Add-ons Selected:
${addonsDisplayString || "None"}

Total Estimated Project Budget: R ${totalBudget.toLocaleString()}

3. INVOICING SCHEDULE
Upfront Commitment Fee (${commitmentPercentage * 100}% of Base): R ${commitmentFee.toLocaleString()}
Remaining Balance Due Upon Acceptance: R ${remainingBalance.toLocaleString()}

4. FORMAL AUTHORIZATION
Payment of the Commitment Fee authorizes MCSAS to commence operations.`;

            const splitSowText = sowDoc.splitTextToSize(sowText.trim(), 180);
            sowDoc.text(splitSowText, 15, 30);
            const sowPdfBuffer = Buffer.from(sowDoc.output('arraybuffer'));

            const pdfAttachments = [
                { filename: 'MCSAS_Legal_Agreement.pdf', content: legalPdfBuffer, contentType: 'application/pdf' },
                { filename: `SOW_${generatedId}.pdf`, content: sowPdfBuffer, contentType: 'application/pdf' }
            ];

            mailOptions.attachments = pdfAttachments;
            clientMailOptions.attachments = pdfAttachments;
            mailOptions.text += `\n\n[System Alert: SOW auto-generated. Budget: R${totalBudget.toLocaleString()} | Fast-Track: ${isFastTrack}. Legal Artifacts attached.]`;
        }

        // Transmission
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