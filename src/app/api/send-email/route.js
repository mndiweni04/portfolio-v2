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

function addWrappedText(doc, text, yPos, fontSize, isBold = false) {
    const pageHeight = 297;
    const margin = 15;
    const maxWidth = 180;
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");

    const lines = doc.splitTextToSize(text, maxWidth);
    let currentY = yPos;

    for (let i = 0; i < lines.length; i++) {
        if (currentY > pageHeight - 20) {
            doc.addPage();
            currentY = 20;
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", isBold ? "bold" : "normal");
        }
        doc.text(lines[i], margin, currentY);
        currentY += (fontSize * 0.45);
    }
    return currentY + 4;
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message, inquiryType, serviceType, rawAddonIds, isFastTrack, timeline } = body;

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
            html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #1e293b;">
                <h2 style="color: #38bdf8; border-bottom: 1px solid #1e293b; padding-bottom: 15px; margin-top: 0;">System Alert: New ${inquiryType.toUpperCase()}</h2>
                <p style="color: #94a3b8; font-size: 14px;"><strong>Client:</strong> ${firstName} ${lastName}</p>
                <p style="color: #94a3b8; font-size: 14px;"><strong>Email:</strong> ${email}</p>
                <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; line-height: 1.6; color: #f8fafc;">${message || "No additional message provided."}</p>
                </div>
            </div>`,
            attachments: []
        };

        let clientMailOptions = {
            from: `"Mandla Ndiweni | MCSAS" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Architecture Request Received - Staging Documents Enclosed`,
            html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 40px; border-radius: 12px; border: 1px solid #38bdf8;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #38bdf8; margin: 0; font-size: 28px; letter-spacing: -1px;">MCSAS</h1>
                    <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Architecture Protocol</p>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">Dear ${firstName},</p>
                <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Thank you for requesting an architecture review. Your technical specifications have been registered.</p>
                <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Attached to this transmission, you will find the formal <strong>Master Service Agreement (MSA)</strong>, <strong>Privacy Policy</strong>, and your dynamically generated <strong>Statement of Work (SOW)</strong> based on your selected parameters.</p>
                <div style="background-color: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 15px; margin: 30px 0;">
                    <p style="margin: 0; color: #38bdf8; font-weight: bold; font-size: 14px;">ACTION REQUIRED</p>
                    <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Please review the attached Staging Documents. The execution of the 10% Commitment Fee will formally authorize development to commence.</p>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong style="color: #fff;">Mandla Ndiweni</strong></p>
            </div>`,
            attachments: []
        };

        if (inquiryType === 'project' && serviceType && PACKAGE_PRICES[serviceType]) {
            const pkg = PACKAGE_PRICES[serviceType];
            let addonsTotal = 0;
            let addonsDisplayString = "";
            if (rawAddonIds && typeof rawAddonIds === 'string') {
                const addonsArr = rawAddonIds.split(',');
                addonsArr.forEach(pair => {
                    const parts = pair.split(':');
                    const id = parts[0];
                    const qty = parseInt(parts[1]) || 1;
                    if (ADDON_PRICES[id]) {
                        const addonCost = ADDON_PRICES[id].price * qty;
                        addonsTotal += addonCost;
                        addonsDisplayString += `${ADDON_PRICES[id].name} (x${qty})\n`;
                    }
                });
            }
            const commitmentPercentage = isFastTrack ? 0.25 : 0.10;
            const commitmentFee = pkg.basePrice * commitmentPercentage;
            const totalBudget = pkg.basePrice + addonsTotal;
            const remainingBalance = totalBudget - commitmentFee;
            const clientName = `${firstName} ${lastName}`;

            const docMSA = new jsPDF();
            let y = 20;
            y = addWrappedText(docMSA, "MASTER SERVICE AGREEMENT (MSA)", y, 16, true);
            y += 5;
            y = addWrappedText(docMSA, `Executed by and between: MCSAS (Master Class Scalable Affordable Software), a software engineering entity (hereinafter referred to as the "Developer") AND ${clientName} (hereinafter referred to as the "Client").`, y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "1. DEFINITIONS AND INTERPRETATION", y, 11, true);
            y = addWrappedText(docMSA, "1.1. \"Base Architecture\" shall denote the proprietary, pre-existing software frameworks and tiers (specifically Basic, Starter, Growth, or Enterprise) provided by the Developer.", y, 10, false);
            y = addWrappedText(docMSA, "1.2. \"Commitment Fee\" shall mean a non-refundable, initial payment equivalent to ten percent (10%) of the stipulated Base Architecture price, exclusive of any additional Add-ons.", y, 10, false);
            y = addWrappedText(docMSA, "1.3. \"Staging\" shall refer to the secure, non-production environment utilized by the Developer to demonstrate the functional software to the Client for review and acceptance.", y, 10, false);
            y = addWrappedText(docMSA, "1.4. \"Final Acceptance\" shall signify the formal written confirmation by the Client that the delivered software conforms entirely to the mutually agreed-upon Functional Requirements.", y, 10, false);
            y = addWrappedText(docMSA, "1.5. \"Revision\" shall define a formal request for minor adjustments, rectifications of identified errors (bug fixes), or refinements to the User Interface (UI), strictly confined within the original agreed Project Scope.", y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "2. THE COMMITMENT MODEL", y, 11, true);
            y = addWrappedText(docMSA, "2.1. Commencement: Development activities shall be initiated solely upon the successful receipt of the Commitment Fee from the Client.", y, 10, false);
            y = addWrappedText(docMSA, "2.2. Deductibility: The Commitment Fee shall be fully credited against the Final Total amount stipulated within the SOW.", y, 10, false);
            y = addWrappedText(docMSA, "2.3. Non-Refundability: In light of the \"Commitment-Free\" structure pertaining to the remaining ninety percent (90%) of the project budget, the ten percent (10%) Commitment Fee is expressly non-refundable and is designated to cover initial resource allocation and the provisioning of the necessary development environment.", y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "3. DEMONSTRATION AND REVISIONS", y, 11, true);
            y = addWrappedText(docMSA, "3.1. Subsequent to the conclusion of the engineering phase, the Developer shall grant the Client authenticated access to a Staging environment.", y, 10, false);
            y = addWrappedText(docMSA, "3.2. Included Revisions: The Client is hereby entitled to a maximum of three (3) rounds of revisions at no additional cost following the initial demonstration in the Staging environment.", y, 10, false);
            y = addWrappedText(docMSA, "3.3. Scope of Revisions: Revision requests must strictly adhere to the Functional Requirements and Project Scope documented within the original SOW. Any request falling outside these defined parameters shall be formally classified as a \"Change Order\" and may necessitate supplementary charges.", y, 10, false);
            y = addWrappedText(docMSA, "3.4. Final Acceptance: Upon the exhaustion of the complimentary revision allowance or the formal approval by the Client, the remaining financial balance (Total amount less the Commitment Fee) shall become immediately due and payable.", y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "4. PAYMENT TRIGGER AND DELIVERY", y, 11, true);
            y = addWrappedText(docMSA, "4.1. The complete settlement of the remaining balance constitutes a condition precedent to the migration of the software to a live production environment or the formal handover of any associated source code.", y, 10, false);
            y = addWrappedText(docMSA, "4.2. Failure to remit the outstanding balance within fourteen (14) calendar days following Final Acceptance shall result in the immediate and irreversible decommissioning of the Staging environment.", y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "5. INTELLECTUAL PROPERTY AND LIABILITY", y, 11, true);
            y = addWrappedText(docMSA, "5.1. Ownership: The Developer shall retain all rights, title, and interest in its Background Intellectual Property (IP). Rights to the Bespoke Intellectual Property (IP) shall be assigned to the Client only upon full and complete payment for the \"Full Source Ownership\" add-on.", y, 10, false);
            y = addWrappedText(docMSA, "5.2. Liability: The total cumulative liability of the Developer for any and all claims arising under the terms of the relevant SOW shall be strictly capped at the total cumulative fees paid by the Client under that specific SOW.", y, 10, false);

            docMSA.addPage();
            y = 20;
            y = addWrappedText(docMSA, "PRIVACY POLICY (POPIA COMPLIANT)", y, 16, true);
            y += 5;
            y = addWrappedText(docMSA, "1. DATA COLLECTION AND PURPOSE", y, 11, true);
            y = addWrappedText(docMSA, "Personal information (including, but not limited to, Name, Email Address, Company Affiliation, and Project Logic) is collected via our designated digital intake mechanisms. This data is processed exclusively for the purposes of technical scope definition, infrastructure provisioning, and formal project communication.", y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "2. SERVICE PROVIDERS (SUB-PROCESSORS)", y, 11, true);
            y = addWrappedText(docMSA, "To facilitate the delivery of our services, we engage the use of third-party service providers, which are categorized as follows:", y, 10, false);
            y = addWrappedText(docMSA, "  Cloud Infrastructure Providers: Utilized for the hosting of staging environments and application logic, predominantly localized within the South African (af-south-1) region.", y, 10, false);
            y = addWrappedText(docMSA, "  Electronic Communication Services: Employed for the secure and reliable transmission of intake specifications and official project notifications.", y, 10, false);
            y = addWrappedText(docMSA, "  Analytics Providers: Used for comprehensive monitoring of application performance and user engagement metrics.", y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "3. DATA SECURITY", y, 11, true);
            y = addWrappedText(docMSA, "We implement and maintain administrative, technical, and physical safeguards commensurate with industry standards to ensure the protection of your personal information against unauthorized access, accidental loss, or theft. This protective regimen includes the deployment of encrypted transmission protocols and rigorously access-controlled server environments.", y, 10, false);
            y += 5;

            y = addWrappedText(docMSA, "4. TRANSBORDER INFORMATION FLOWS", y, 11, true);
            y = addWrappedText(docMSA, "Although we prioritize the localized processing of data within the Republic of South Africa, it is possible that certain third-party service providers may store or process data in foreign jurisdictions. By engaging our services, you hereby consent to the transfer of information to these jurisdictions, provided that the recipient is subject to statutory obligations or contractual agreements that afford a level of data protection substantially equivalent to that mandated by POPIA.", y, 10, false);

            const msaPdfBuffer = Buffer.from(docMSA.output('arraybuffer'));

            const docSOW = new jsPDF();
            const generatedId = `SOW-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
            let sy = 20;
            sy = addWrappedText(docSOW, "STATEMENT OF WORK (SOW)", sy, 16, true);
            sy += 2;
            sy = addWrappedText(docSOW, `SOW IDENTIFIER: ${generatedId}   |   Date of Issue: ${new Date().toISOString().split('T')[0]}`, sy, 10, false);
            sy += 8;

            sy = addWrappedText(docSOW, "1. PROJECT SUMMARY", sy, 12, true);
            sy = addWrappedText(docSOW, `Client Entity Name: ${clientName}`, sy, 10, false);
            sy = addWrappedText(docSOW, `Selected Base Architecture Tier: ${pkg.name}`, sy, 10, false);
            sy = addWrappedText(docSOW, `Defined Project Scope: Base framework delivery with designated add-on integrations.`, sy, 10, false);
            sy = addWrappedText(docSOW, `Stipulated Functional Requirements: Native features of ${pkg.name} tier${addonsDisplayString ? ', plus configured add-ons.' : '.'}`, sy, 10, false);
            sy += 8;

            sy = addWrappedText(docSOW, "2. FINANCIAL BREAKDOWN", sy, 12, true);

            const startY = sy;
            const marginX = 15;
            docSOW.setLineWidth(0.2);
            docSOW.line(marginX, startY, 195, startY);

            docSOW.setFont("helvetica", "bold");
            docSOW.text("Item", marginX + 2, startY + 6);
            docSOW.text("Price (ZAR)", 155, startY + 6);
            docSOW.line(marginX, startY + 8, 195, startY + 8);

            docSOW.setFont("helvetica", "normal");
            docSOW.text("Base Architecture Fee", marginX + 2, startY + 14);
            docSOW.text(`R ${pkg.basePrice.toLocaleString()}`, 155, startY + 14);
            docSOW.line(marginX, startY + 16, 195, startY + 16);

            docSOW.text(`Commitment Fee (${commitmentPercentage * 100}% of Base)`, marginX + 2, startY + 22);
            docSOW.text(`R ${commitmentFee.toLocaleString()}`, 155, startY + 22);
            docSOW.line(marginX, startY + 24, 195, startY + 24);

            docSOW.text("Selected Supplementary Add-ons", marginX + 2, startY + 30);
            docSOW.text(`R ${addonsTotal.toLocaleString()}`, 155, startY + 30);
            docSOW.line(marginX, startY + 32, 195, startY + 32);

            docSOW.setFont("helvetica", "bold");
            docSOW.text("Total Estimated Project Budget", marginX + 2, startY + 40);
            docSOW.text(`R ${totalBudget.toLocaleString()}`, 155, startY + 40);
            docSOW.line(marginX, startY + 42, 195, startY + 42);

            docSOW.text("Remaining Balance Due Upon Acceptance", marginX + 2, startY + 50);
            docSOW.text(`R ${remainingBalance.toLocaleString()}`, 155, startY + 50);
            docSOW.line(marginX, startY + 52, 195, startY + 52);

            sy = startY + 65;
            sy = addWrappedText(docSOW, "3. DELIVERY SCHEDULE AND REVISION PROTOCOL", sy, 12, true);
            const calcTimeline = timeline || 'Determined by Tier';
            sy = addWrappedText(docSOW, `Estimated Delivery Timeline: [${calcTimeline}] ${isFastTrack ? "  Priority Fast-Track Applied" : ""}`, sy, 10, false);
            sy = addWrappedText(docSOW, "Revision Entitlement: Three (3) Formal Rounds of Revisions permitted on the Staging environment.", sy, 10, false);
            sy = addWrappedText(docSOW, "Acceptance Criteria: The successful demonstration of all stipulated Functional Requirements within the Staging environment.", sy, 10, false);
            sy += 8;

            sy = addWrappedText(docSOW, "4. FORMAL AUTHORIZATION AND INITIAL PAYMENT", sy, 12, true);
            sy = addWrappedText(docSOW, `The Commitment Fee constitutes the initial and most critical payment under this Statement of Work. The remittance of this non-refundable fee, amounting to R ${commitmentFee.toLocaleString()}, serves as the definitive trigger that formally authorizes MCSAS to allocate infrastructure, secure resources, and commence development operations in strict accordance with the specifications and terms outlined herein.`, sy, 10, false);

            const sowPdfBuffer = Buffer.from(docSOW.output('arraybuffer'));
            const pdfAttachments = [
                { filename: 'MCSAS_Legal_Framework.pdf', content: msaPdfBuffer, contentType: 'application/pdf' },
                { filename: `MCSAS_${generatedId}.pdf`, content: sowPdfBuffer, contentType: 'application/pdf' }
            ];
            mailOptions.attachments = pdfAttachments;
            clientMailOptions.attachments = pdfAttachments;

            mailOptions.html += `<div style="background-color: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 15px; margin: 20px 0;"><p style="margin: 0; color: #38bdf8; font-weight: bold; font-size: 14px;">SYSTEM ALERT</p><p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">SOW auto-generated. Budget: R${totalBudget.toLocaleString()} | Fast-Track: ${isFastTrack}. Legal Artifacts attached.</p></div>`;
        }

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