/* src/app/api/send-email/route.js */
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

/**
 * Object-oriented layout engine to govern dynamic positioning,
 * styling grids, and clean multi-page boundary flows.
 */
class DocumentLayout {
    constructor(doc, startY = 20) {
        this.doc = doc;
        this.y = startY;
        this.pageHeight = 297; // Standard A4 height (mm)
        this.margin = 15;
        this.maxWidth = 180;  // 210mm total - 30mm total margins
    }

    addPage() {
        this.doc.addPage();
        this.y = 20;
    }

    writeText(text, fontSize, isBold = false, colorRGB = [51, 65, 85], lineSpacing = 1.3) {
        this.doc.setFontSize(fontSize);
        this.doc.setFont("helvetica", isBold ? "bold" : "normal");
        this.doc.setTextColor(colorRGB[0], colorRGB[1], colorRGB[2]);
        
        const lines = this.doc.splitTextToSize(text, this.maxWidth);
        const step = fontSize * 0.35 * lineSpacing; // mm conversion for line increments
        
        for (let i = 0; i < lines.length; i++) {
            if (this.y > this.pageHeight - 25) {
                this.addPage();
                this.doc.setFontSize(fontSize);
                this.doc.setFont("helvetica", isBold ? "bold" : "normal");
                this.doc.setTextColor(colorRGB[0], colorRGB[1], colorRGB[2]);
            }
            this.doc.text(lines[i], this.margin, this.y);
            this.y += step;
        }
        this.y += 2.5; 
    }

    drawHeader(title, subtitle = "") {
        if (this.y > this.pageHeight - 40) {
            this.addPage();
        }
        
        // Brand side marker bar
        this.doc.setFillColor(56, 189, 248); // Sky Blue accent
        this.doc.rect(this.margin, this.y, 4, 12, "F");
        
        // Header Text
        this.doc.setFontSize(15);
        this.doc.setFont("helvetica", "bold");
        this.doc.setTextColor(15, 23, 42); // Navy Blue
        this.doc.text(title, this.margin + 8, this.y + 9.5);
        this.y += 18;

        if (subtitle) {
            this.writeText(subtitle, 9.5, false, [148, 163, 184]);
            this.y += 3;
        }
    }

    drawMetadataCard(pairs) {
        const cardHeight = (pairs.length * 6) + 8;
        if (this.y + cardHeight > this.pageHeight - 25) {
            this.addPage();
        }

        this.doc.setFillColor(248, 250, 252);
        this.doc.setDrawColor(226, 232, 240);
        this.doc.roundedRect(this.margin, this.y, this.maxWidth, cardHeight, 3, 3, "FD");

        let innerY = this.y + 6;
        pairs.forEach(([label, val]) => {
            this.doc.setFontSize(9);
            this.doc.setFont("helvetica", "bold");
            this.doc.setTextColor(15, 23, 42);
            this.doc.text(label, this.margin + 6, innerY);

            this.doc.setFont("helvetica", "normal");
            this.doc.setTextColor(51, 65, 85);
            this.doc.text(String(val), this.margin + 55, innerY);
            innerY += 6;
        });

        this.y += cardHeight + 8;
    }

    drawTable(headers, rows) {
        const colWidths = [120, 60]; 
        const rowHeight = 8;
        
        if (this.y + rowHeight * (rows.length + 2) > this.pageHeight - 25) {
            this.addPage();
        }

        // Render Table Header Block
        this.doc.setFillColor(15, 23, 42);
        this.doc.rect(this.margin, this.y, this.maxWidth, rowHeight, "F");
        
        this.doc.setFont("helvetica", "bold");
        this.doc.setFontSize(9.5);
        this.doc.setTextColor(255, 255, 255);
        this.doc.text(headers[0], this.margin + 4, this.y + 5.5);
        this.doc.text(headers[1], this.margin + colWidths[0] + 4, this.y + 5.5);
        
        this.y += rowHeight;

        // Render Data Rows
        this.doc.setFont("helvetica", "normal");
        this.doc.setFontSize(9);
        rows.forEach((row, i) => {
            if (this.y > this.pageHeight - 25) {
                this.addPage();
                this.doc.setDrawColor(226, 232, 240);
                this.doc.line(this.margin, this.y, this.margin + this.maxWidth, this.y);
            }

            if (i % 2 === 1) {
                this.doc.setFillColor(248, 250, 252);
                this.doc.rect(this.margin, this.y, this.maxWidth, rowHeight, "F");
            }

            this.doc.setDrawColor(226, 232, 240);
            this.doc.setLineWidth(0.1);
            this.doc.rect(this.margin, this.y, this.maxWidth, rowHeight, "D");

            this.doc.setTextColor(51, 65, 85);
            this.doc.text(row[0], this.margin + 4, this.y + 5.5);
            this.doc.setTextColor(15, 23, 42);
            this.doc.text(row[1], this.margin + colWidths[0] + 4, this.y + 5.5);
            this.y += rowHeight;
        });
        this.y += 6;
    }

    drawFinancialSummaryBox(total, deposit, remaining, commitmentPct) {
        if (this.y + 35 > this.pageHeight - 25) {
            this.addPage();
        }
        
        this.doc.setFillColor(248, 250, 252);
        this.doc.setDrawColor(56, 189, 248);
        this.doc.setLineWidth(0.4);
        this.doc.roundedRect(this.margin, this.y, this.maxWidth, 32, 3, 3, "FD");

        this.doc.setFont("helvetica", "bold");
        this.doc.setFontSize(10);
        this.doc.setTextColor(15, 23, 42);
        
        this.doc.text("Project Financial Breakdown", this.margin + 6, this.y + 7);
        this.doc.line(this.margin + 6, this.y + 10, this.margin + this.maxWidth - 6, this.y + 10);

        this.doc.setFontSize(9);
        this.doc.setFont("helvetica", "normal");
        this.doc.text("Total Estimated Project Value:", this.margin + 6, this.y + 16);
        this.doc.text(`Activation Deposit Required (${commitmentPct}%):`, this.margin + 6, this.y + 22);
        this.doc.text("Remaining Balance Deferred:", this.margin + 6, this.y + 28);

        this.doc.setFont("helvetica", "bold");
        this.doc.text(`R ${total.toLocaleString()}`, this.margin + 120, this.y + 16);
        this.doc.setTextColor(56, 189, 248); 
        this.doc.text(`R ${deposit.toLocaleString()}`, this.margin + 120, this.y + 22);
        this.doc.setTextColor(15, 23, 42);
        this.doc.text(`R ${remaining.toLocaleString()}`, this.margin + 120, this.y + 28);

        this.y += 38;
    }
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

        const developerName = "Mandla Ndiweni";

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `System Notification: ${isFastTrack ? '[PRIORITY] ' : ''}${inquiryType.toUpperCase()} from ${firstName} ${lastName}`,
            html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #1e293b;">
                <h2 style="color: #38bdf8; border-bottom: 1px solid #1e293b; padding-bottom: 15px; margin-top: 0;">Inquiry Registered</h2>
                <p style="color: #94a3b8; font-size: 14px;"><strong>Client:</strong> ${firstName} ${lastName}</p>
                <p style="color: #94a3b8; font-size: 14px;"><strong>Email:</strong> ${email}</p>
                <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; line-height: 1.6; color: #f8fafc;">${message || "No additional parameters provided."}</p>
                </div>
            </div>`,
            attachments: []
        };

        let clientMailOptions = {
            from: `"${developerName}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Architecture Request Received - Staging Documents Enclosed`,
            html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 40px; border-radius: 12px; border: 1px solid #38bdf8;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #38bdf8; margin: 0; font-size: 28px; letter-spacing: -1px;">${developerName}</h1>
                    <p style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Architecture & Software Engineering</p>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">Dear ${firstName},</p>
                <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Thank you for requesting an architecture review. Your technical configurations have been compiled and registered.</p>
                <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Attached to this transmission, you will find your Master Service Agreement (MSA), POPIA Privacy Policy, and a personalized Statement of Work (SOW) based on your chosen specifications.</p>
                <div style="background-color: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 15px; margin: 30px 0;">
                    <p style="margin: 0; color: #38bdf8; font-weight: bold; font-size: 14px;">ACTIVATION REQUIRED</p>
                    <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Please review the attached Staging Documents. Handing over the initial activation deposit commits the engineering schedule and reserves your slot to begin implementation.</p>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong style="color: #fff;">${developerName}</strong></p>
            </div>`,
            attachments: []
        };

        if (inquiryType === 'project' && serviceType && PACKAGE_PRICES[serviceType]) {
            const pkg = PACKAGE_PRICES[serviceType];
            let addonsTotal = 0;
            let addonsDisplayString = "";
            const tableRows = [];

            tableRows.push([`${pkg.name} (Base Tier)`, `R ${pkg.basePrice.toLocaleString()}`]);

            if (rawAddonIds && typeof rawAddonIds === 'string') {
                const addonsArr = rawAddonIds.split(',');
                addonsArr.forEach(pair => {
                    const parts = pair.split(':');
                    const id = parts[0];
                    const qty = parseInt(parts[1]) || 1;
                    if (ADDON_PRICES[id]) {
                        const addonCost = ADDON_PRICES[id].price * qty;
                        addonsTotal += addonCost;
                        const qtyStr = qty > 1 ? ` (x${qty})` : "";
                        addonsDisplayString += `${ADDON_PRICES[id].name}${qtyStr}\n`;
                        tableRows.push([`${ADDON_PRICES[id].name}${qtyStr}`, `R ${addonCost.toLocaleString()}`]);
                    }
                });
            }

            const commitmentPercentage = isFastTrack ? 0.25 : 0.10;
            const commitmentFee = pkg.basePrice * commitmentPercentage;
            const totalBudget = pkg.basePrice + addonsTotal;
            const remainingBalance = totalBudget - commitmentFee;
            const clientName = `${firstName} ${lastName}`;

            // --- MSA & Privacy Policy Compilation ---
            const docMSA = new jsPDF();
            const msaLayout = new DocumentLayout(docMSA, 20);

            msaLayout.drawHeader("MASTER SERVICE AGREEMENT (MSA)", "Standard legal guidelines for software development and deliveries");
            
            msaLayout.drawMetadataCard([
                ["Developer / Consultant:", developerName],
                ["Client Entity:", clientName],
                ["Issue Date:", new Date().toISOString().split('T')[0]],
                ["Standard Policy Region:", "Republic of South Africa"]
            ]);

            msaLayout.writeText("1. DEFINITIONS AND TERMS", 11, true, [15, 23, 42]);
            msaLayout.writeText("1.1. \"Base Architecture\" refers to standard core frameworks and software packages configured and customized by the Developer.", 10);
            msaLayout.writeText("1.2. \"Commitment Activation Fee\" refers to the initial non-refundable scheduling deposit required to secure engineering capacity and allocate staging infrastructure.", 10);
            msaLayout.writeText("1.3. \"Staging\" refers to the secure, private hosting environment utilized by the Developer to demonstrate fully functioning updates to the Client prior to release.", 10);
            msaLayout.writeText("1.4. \"Final Acceptance\" means written confirmation from the Client validating that target functional parameters are met.", 10);
            msaLayout.writeText("1.5. \"Revisions\" refers to minor adjustments, bug fixes, or design adjustments handled strictly within original scope limits.", 10);
            
            msaLayout.writeText("2. ACTIVATION & COMMITMENT FLOW", 11, true, [15, 23, 42]);
            msaLayout.writeText("2.1. Scheduling: Engineering actions commence immediately following safe verification of the Commitment Activation Fee.", 10);
            msaLayout.writeText("2.2. Deduction: The full balance of the Commitment Activation Fee is credited against final project billing parameters.", 10);
            msaLayout.writeText("2.3. Structural Purpose: This Activation Fee funds environment setup, base tier configuration, and dedicated timelines. It supports the deferred structure, leaving the remaining 90% balance completely risk-free until staging approval.", 10);

            msaLayout.writeText("3. DEMO & QUALITY REVIEW REVISIONS", 11, true, [15, 23, 42]);
            msaLayout.writeText("3.1. When core implementation finishes, the Developer provisions a functional live sandbox link for active review.", 10);
            msaLayout.writeText("3.2. Complementary Revisions: Every setup includes three (3) iterative feedback loops to refine elements at no extra cost.", 10);
            msaLayout.writeText("3.3. Scope Controls: Revisions are bound strictly to parameters declared in the SOW. Outside adjustments require an explicit change request.", 10);
            
            msaLayout.writeText("4. ENVIRONMENT DEPLOYMENT & DELIVERY", 11, true, [15, 23, 42]);
            msaLayout.writeText("4.1. Settlement of the remaining balance is a prerequisite to migrating code assets, removing sandboxes, or setting up production domain systems.", 10);
            msaLayout.writeText("4.2. Inactivity: If outstanding balances remain unaddressed 14 calendar days post Final Acceptance, staging environments are archived and held pending reconciliation.", 10);

            msaLayout.addPage(); // Segregate Privacy Statement on its own page sheet
            msaLayout.drawHeader("POPIA PRIVACY STATEMENT", "Governance policies regulating client logic, scope inputs, and security metrics");

            msaLayout.writeText("1. COMPLIANCE INFORMATION DEFINITIONS", 11, true, [15, 23, 42]);
            msaLayout.writeText("All data collected during consultation and intake phases—including name, email, brand requirements, and logic flows—is handled strictly for workspace scoping, infrastructure setup, and email delivery.", 10);

            msaLayout.writeText("2. SECURITY POLICIES", 11, true, [15, 23, 42]);
            msaLayout.writeText("To protect structural integrity, technical details are maintained within encrypted, credential-secured repositories. Direct database setups reside strictly in secure local af-south-1 cloud nodes.", 10);

            msaLayout.writeText("3. REGULATORY AND DATA FLOW PROTECTION", 11, true, [15, 23, 42]);
            msaLayout.writeText("No customer specifications are outsourced, sold, or exposed to third parties. In compliance with South Africa's POPI Act regulations, data storage pathways employ industry-standard secure socket layers (SSL) and access controls.", 10);

            const msaPdfBuffer = Buffer.from(docMSA.output('arraybuffer'));

            // --- SOW Compilation ---
            const docSOW = new jsPDF();
            const sowLayout = new DocumentLayout(docSOW, 20);
            const generatedId = `SOW-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

            sowLayout.drawHeader("STATEMENT OF WORK (SOW)", "Dynamic architectural specification mapping scope, timelines, and financial breakdown");
            
            sowLayout.drawMetadataCard([
                ["SOW Reference ID:", generatedId],
                ["Date of Issue:", new Date().toISOString().split('T')[0]],
                ["Lead Consultant:", developerName],
                ["Client Account:", clientName],
                ["Selected Architecture:", pkg.name]
            ]);

            sowLayout.writeText("1. PROJECT SCOPE & OBJECTIVE", 11, true, [15, 23, 42]);
            sowLayout.writeText("Standardized configuration, adjustment, and deployment of the chosen architecture tier. Implementation aligns with strict architectural standards, optimized speed metrics, and cross-platform compatibility.", 10);

            sowLayout.writeText("2. IMPLEMENTATION MILESTONES", 11, true, [15, 23, 42]);
            sowLayout.writeText("• Milestone 1: Environment Setup & Setup Scaffolding (Deposit Activated)", 10);
            sowLayout.writeText("• Milestone 2: Logical System Build & Interface Composition", 10);
            sowLayout.writeText("• Milestone 3: Sandbox Release, Review, and Revisions", 10);
            sowLayout.writeText("• Milestone 4: Production Handover & DNS Target Launch (Final Payment)", 10);

            sowLayout.writeText("3. SPECIFIED SERVICES & ADDONS", 11, true, [15, 23, 42]);
            sowLayout.drawTable(["Selected System Parameter", "Standard Pricing"], tableRows);

            sowLayout.drawFinancialSummaryBox(totalBudget, commitmentFee, remainingBalance, commitmentPercentage * 100);

            sowLayout.writeText("4. PROJECT SCHEDULE PROTOCOLS", 11, true, [15, 23, 42]);
            const calcTimeline = timeline || 'Determined by Tier';
            sowLayout.writeText(`Target Project Timeline: [${calcTimeline}]${isFastTrack ? "  (Fast-Track Scheduling Applied)" : ""}`, 10);
            sowLayout.writeText("Commitment authorization begins immediately upon confirmation of the Activation Fee deposit. Handover and sandbox reviews progress sequentially according to standard operational standards.", 10);

            const sowPdfBuffer = Buffer.from(docSOW.output('arraybuffer'));

            const pdfAttachments = [
                { filename: `${developerName.replace(/\s+/g, '_')}_Legal_Framework.pdf`, content: msaPdfBuffer, contentType: 'application/pdf' },
                { filename: `${developerName.replace(/\s+/g, '_')}_SOW_${generatedId}.pdf`, content: sowPdfBuffer, contentType: 'application/pdf' }
            ];

            mailOptions.attachments = pdfAttachments;
            clientMailOptions.attachments = pdfAttachments;
            mailOptions.html += `
            <div style="background-color: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #38bdf8; font-weight: bold; font-size: 14px;">SYSTEM METRICS</p>
                <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Total SOW value R ${totalBudget.toLocaleString()} | Fast-Track: ${isFastTrack}. Attachments compiled successfully.</p>
            </div>`;
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