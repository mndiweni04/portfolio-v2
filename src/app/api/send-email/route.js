/* src/app/api/send-email/route.js */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';
import { getPackageById, getAddonById } from '../../../data/servicesCatalog';

/**
 * Escapes user-submitted strings to prevent HTML injection inside email templates.
 * @param {unknown} str - The value to sanitize.
 * @returns {string} Sanitized string safe for HTML interpolation.
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates the inbound payload schema.
 * @param {Record<string, unknown>} body - Parsed JSON request body.
 * @returns {string | null} Error description if invalid, or null if valid.
 */
function validateInboundPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Invalid request payload. Request body must be a JSON object.';
  }

  const { firstName, lastName, email, inquiryType, message, serviceType } = body;

  if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
    return 'First name is required.';
  }
  if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
    return 'Last name is required.';
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return 'Email address is required.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Invalid email address format.';
  }

  const validInquiryTypes = ['general', 'project'];
  if (
    !inquiryType ||
    typeof inquiryType !== 'string' ||
    !validInquiryTypes.includes(inquiryType.toLowerCase().trim())
  ) {
    return 'Invalid inquiry type. Expected "general" or "project".';
  }

  const normalizedType = inquiryType.toLowerCase().trim();

  if (normalizedType === 'general') {
    if (!message || typeof message !== 'string' || !message.trim()) {
      return 'Message content is required for general inquiries.';
    }
  }

  if (normalizedType === 'project') {
    if (!serviceType || typeof serviceType !== 'string' || !getPackageById(serviceType)) {
      return 'A valid service architecture must be selected for project inquiries.';
    }
  }

  return null;
}

class DocumentLayout {
  constructor(doc, startY = 20) {
    this.doc = doc;
    this.y = startY;
    this.pageHeight = 297; // Standard A4 height (mm)
    this.margin = 15;
    this.maxWidth = 180; // 210mm total - 30mm total margins
  }

  addPage() {
    this.doc.addPage();
    this.y = 20;
  }

  writeText(text, fontSize, isBold = false, colorRGB = [51, 65, 85], lineSpacing = 1.3) {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    this.doc.setTextColor(colorRGB[0], colorRGB[1], colorRGB[2]);

    const lines = this.doc.splitTextToSize(text, this.maxWidth);
    const step = fontSize * 0.35 * lineSpacing;

    for (let i = 0; i < lines.length; i++) {
      if (this.y > this.pageHeight - 25) {
        this.addPage();
        this.doc.setFontSize(fontSize);
        this.doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        this.doc.setTextColor(colorRGB[0], colorRGB[1], colorRGB[2]);
      }
      this.doc.text(lines[i], this.margin, this.y);
      this.y += step;
    }
    this.y += 2.5;
  }

  drawHeader(title, subtitle = '') {
    if (this.y > this.pageHeight - 40) {
      this.addPage();
    }

    this.doc.setFillColor(56, 189, 248);
    this.doc.rect(this.margin, this.y, 4, 12, 'F');

    this.doc.setFontSize(15);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(15, 23, 42);
    this.doc.text(title, this.margin + 8, this.y + 9.5);
    this.y += 18;

    if (subtitle) {
      this.writeText(subtitle, 9.5, false, [148, 163, 184]);
      this.y += 3;
    }
  }

  drawMetadataCard(pairs) {
    const cardHeight = pairs.length * 6 + 8;
    if (this.y + cardHeight > this.pageHeight - 25) {
      this.addPage();
    }
    this.doc.setFillColor(248, 250, 252);
    this.doc.setDrawColor(226, 232, 240);
    this.doc.roundedRect(this.margin, this.y, this.maxWidth, cardHeight, 3, 3, 'FD');
    let innerY = this.y + 6;
    pairs.forEach(([label, val]) => {
      this.doc.setFontSize(9);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(15, 23, 42);
      this.doc.text(label, this.margin + 6, innerY);
      this.doc.setFont('helvetica', 'normal');
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

    this.doc.setFillColor(15, 23, 42);
    this.doc.rect(this.margin, this.y, this.maxWidth, rowHeight, 'F');

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.5);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(headers[0], this.margin + 4, this.y + 5.5);
    this.doc.text(headers[1], this.margin + colWidths[0] + 4, this.y + 5.5);

    this.y += rowHeight;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9);

    rows.forEach((row, i) => {
      if (this.y > this.pageHeight - 25) {
        this.addPage();
        this.doc.setDrawColor(226, 232, 240);
        this.doc.line(this.margin, this.y, this.margin + this.maxWidth, this.y);
      }
      if (i % 2 === 1) {
        this.doc.setFillColor(248, 250, 252);
        this.doc.rect(this.margin, this.y, this.maxWidth, rowHeight, 'F');
      }
      this.doc.setDrawColor(226, 232, 240);
      this.doc.setLineWidth(0.1);
      this.doc.rect(this.margin, this.y, this.maxWidth, rowHeight, 'D');
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
    this.doc.roundedRect(this.margin, this.y, this.maxWidth, 32, 3, 3, 'FD');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(15, 23, 42);

    this.doc.text('Project Financial Breakdown', this.margin + 6, this.y + 7);
    this.doc.line(this.margin + 6, this.y + 10, this.margin + this.maxWidth - 6, this.y + 10);
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Total Estimated Project Value:', this.margin + 6, this.y + 16);
    this.doc.text(
      `Activation Deposit Required (${commitmentPct}%):`,
      this.margin + 6,
      this.y + 22
    );
    this.doc.text('Remaining Balance Deferred:', this.margin + 6, this.y + 28);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`R ${total.toLocaleString()}`, this.margin + 120, this.y + 16);
    this.doc.setTextColor(56, 189, 248);
    this.doc.text(`R ${deposit.toLocaleString()}`, this.margin + 120, this.y + 22);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text(`R ${remaining.toLocaleString()}`, this.margin + 120, this.y + 28);
    this.y += 38;
  }

  drawRetainerSummaryBox(monthlyFee, cadenceNotice = 'Calendar Month-to-Month') {
    if (this.y + 32 > this.pageHeight - 25) {
      this.addPage();
    }

    this.doc.setFillColor(248, 250, 252);
    this.doc.setDrawColor(56, 189, 248);
    this.doc.setLineWidth(0.4);
    this.doc.roundedRect(this.margin, this.y, this.maxWidth, 28, 3, 3, 'FD');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(15, 23, 42);

    this.doc.text('Recurring Retainer Commercial Terms', this.margin + 6, this.y + 7);
    this.doc.line(this.margin + 6, this.y + 10, this.margin + this.maxWidth - 6, this.y + 10);
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Monthly Service Management Retainer:', this.margin + 6, this.y + 16);
    this.doc.text('Contract Notice & Operational Cadence:', this.margin + 6, this.y + 22);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(56, 189, 248);
    this.doc.text(`R ${monthlyFee.toLocaleString()} / month`, this.margin + 120, this.y + 16);
    this.doc.setTextColor(15, 23, 42);
    this.doc.text(cadenceNotice, this.margin + 120, this.y + 22);
    this.y += 34;
  }
}

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const validationError = validateInboundPayload(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const {
      firstName,
      lastName,
      email,
      message,
      inquiryType,
      serviceType,
      rawAddonIds,
      isFastTrack,
      timeline,
    } = body;

    const normalizedInquiryType = inquiryType.toLowerCase().trim();
    const developerName = 'Mandla Ndiweni';
    const clientName = `${firstName.trim()} ${lastName.trim()}`;

    const safeFirstName = escapeHtml(firstName.trim());
    const safeLastName = escapeHtml(lastName.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml((message || '').trim());
    const safeServiceType = escapeHtml((serviceType || 'General').trim());

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `System Notification: ${
        isFastTrack ? '[PRIORITY] ' : ''
      }${normalizedInquiryType.toUpperCase()} from ${safeFirstName} ${safeLastName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #1e293b;">
            <h2 style="color: #38bdf8; border-bottom: 1px solid #1e293b; padding-bottom: 15px; margin-top: 0;">Inquiry Registered</h2>
            <p style="color: #94a3b8; font-size: 14px;"><strong>Client:</strong> ${safeFirstName} ${safeLastName}</p>
            <p style="color: #94a3b8; font-size: 14px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="color: #94a3b8; font-size: 14px;"><strong>Service ID:</strong> ${safeServiceType}</p>
            <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; line-height: 1.6; color: #f8fafc;">${
                  safeMessage || 'No additional parameters provided.'
                }</p>
            </div>
        </div>`,
      attachments: [],
    };

    let clientMailOptions = {
      from: `"${developerName}" <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      subject: `Architecture & Growth Request Received - Documents Enclosed`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 40px; border-radius: 12px; border: 1px solid #38bdf8;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #38bdf8; margin: 0; font-size: 28px; letter-spacing: -1px;">${developerName}</h1>
                <p style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Systems Engineering & Lead Intelligence</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">Dear ${safeFirstName},</p>
            <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Thank you for your inquiry. Your specifications have been processed by our intake engine.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Attached to this communication, you will find your Master Service Agreement (MSA), POPIA Compliance Notice, and tailored commercial documentation.</p>
            <div style="background-color: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; padding: 15px; margin: 30px 0;">
                <p style="margin: 0; color: #38bdf8; font-weight: bold; font-size: 14px;">CONTRACT INITIATION</p>
                <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Please review the attached staging artifacts. Handing over the activation verification commits engineering capacity and initiates production provisioning.</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong style="color: #fff;">${developerName}</strong></p>
        </div>`,
      attachments: [],
    };

    const pkg = serviceType ? getPackageById(serviceType) : null;

    if (normalizedInquiryType === 'project' && pkg) {
      let addonsTotal = 0;
      const tableRows = [];
      tableRows.push([`${pkg.name} (Base Scope)`, `R ${pkg.basePrice.toLocaleString()}`]);

      if (rawAddonIds && typeof rawAddonIds === 'string') {
        const addonsArr = rawAddonIds.split(',');
        addonsArr.forEach((pair) => {
          const parts = pair.split(':');
          const id = parts[0];
          const qty = parseInt(parts[1], 10) || 1;
          const addonObj = getAddonById(id);
          if (addonObj) {
            const addonCost = addonObj.unitPrice * qty;
            addonsTotal += addonCost;
            const qtyStr = qty > 1 ? ` (x${qty})` : '';
            tableRows.push([`${addonObj.name}${qtyStr}`, `R ${addonCost.toLocaleString()}`]);
          }
        });
      }

      // 1. Master Service Agreement (MSA) & POPIA Compliance
      const docMSA = new jsPDF();
      const msaLayout = new DocumentLayout(docMSA, 20);
      msaLayout.drawHeader(
        'MASTER SERVICE AGREEMENT (MSA)',
        'Legal standards governing software architecture, telemetry, and growth marketing'
      );

      msaLayout.drawMetadataCard([
        ['Consultant / Developer:', developerName],
        ['Client Organization:', clientName],
        ['Date of Issuance:', new Date().toISOString().split('T')[0]],
        ['Jurisdiction:', 'Republic of South Africa (POPIA Compliant)'],
      ]);

      msaLayout.writeText('1. ENGAGEMENT AND DEFINITIONS', 11, true, [15, 23, 42]);
      msaLayout.writeText(
        '1.1. "Asset" denotes custom web, mobile, analytics, or funnel architectures produced or instrumented under this agreement.',
        10
      );
      msaLayout.writeText(
        '1.2. "Telemetry Setup" refers to custom Google Tag Manager listeners, GA4 conversion tracking, and conversion optimization instrumentation.',
        10
      );
      msaLayout.writeText(
        '1.3. "Pass-Through Media Spend" refers to ad budgets paid directly by the Client to advertising networks (Google, Meta, LinkedIn), strictly segregated from agency fees.',
        10
      );

      msaLayout.writeText('2. COMMERCIAL TERMS & ACTIVATION', 11, true, [15, 23, 42]);
      msaLayout.writeText(
        '2.1. Milestone Builds: Engineering begins upon clearing of the non-refundable Commitment Fee (10% standard, 25% fast-track). The remainder is deferred until final Staging acceptance.',
        10
      );
      msaLayout.writeText(
        '2.2. Monthly Retainers: Retainer cycles are invoiced at the commencement of each 30-day operating window. Retainers operate month-to-month unless otherwise agreed in writing.',
        10
      );

      msaLayout.writeText('3. REVISIONS & QUALITY ASSURANCE', 11, true, [15, 23, 42]);
      msaLayout.writeText(
        '3.1. Standard implementation packages include three (3) iterative review cycles within declared scope boundaries.',
        10
      );
      msaLayout.writeText(
        '3.2. Work requested beyond declared scope parameters requires a written Change Order.',
        10
      );

      msaLayout.addPage();
      msaLayout.drawHeader(
        'POPIA COMPLIANCE & DATA PROTECTION',
        'Statutory alignment with the Protection of Personal Information Act (South Africa)'
      );

      msaLayout.writeText('1. RESPONSIBLE DATA PROCESSING', 11, true, [15, 23, 42]);
      msaLayout.writeText(
        'All intake payloads, analytics events, and user telemetry are processed exclusively for workspace provisioning, conversion diagnostics, and client verification.',
        10
      );
      msaLayout.writeText('2. ENCRYPTION & DATA RETENTION', 11, true, [15, 23, 42]);
      msaLayout.writeText(
        'Client telemetry configurations and intellectual property are stored in encrypted, isolated repositories. Cloud infrastructure nodes reside strictly within af-south-1 regional zones.',
        10
      );

      const msaPdfBuffer = Buffer.from(docMSA.output('arraybuffer'));

      // 2. Dynamic Contract Branch: SOW vs Retainer SLA
      const docSOW = new jsPDF();
      const sowLayout = new DocumentLayout(docSOW, 20);
      const generatedId = `REF-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;

      if (pkg.billingModel === 'fixed') {
        const commitmentPercentage = isFastTrack ? 0.25 : 0.1;
        const commitmentFee = pkg.basePrice * commitmentPercentage;
        const totalBudget = pkg.basePrice + addonsTotal;
        const remainingBalance = totalBudget - commitmentFee;

        sowLayout.drawHeader(
          'STATEMENT OF WORK (SOW)',
          'Milestone specification: Scoping, delivery timelines, and financial breakdown'
        );

        sowLayout.drawMetadataCard([
          ['SOW Reference ID:', generatedId],
          ['Date of Issue:', new Date().toISOString().split('T')[0]],
          ['Principal Consultant:', developerName],
          ['Client Entity:', clientName],
          ['Selected Architecture:', pkg.name],
        ]);

        sowLayout.writeText('1. SYSTEM OBJECTIVE & SCOPE', 11, true, [15, 23, 42]);
        sowLayout.writeText(pkg.description, 10);

        sowLayout.writeText('2. CONTRACTED DELIVERABLES', 11, true, [15, 23, 42]);
        pkg.deliverables.forEach((item, idx) => {
          sowLayout.writeText(`  ${idx + 1}. ${item}`, 10);
        });

        sowLayout.writeText('3. FINANCIAL SPECIFICATION', 11, true, [15, 23, 42]);
        sowLayout.drawTable(['System Parameter', 'Investment'], tableRows);
        sowLayout.drawFinancialSummaryBox(
          totalBudget,
          commitmentFee,
          remainingBalance,
          commitmentPercentage * 100
        );

        sowLayout.writeText('4. DELIVERY PROTOCOLS', 11, true, [15, 23, 42]);
        const calcTimeline = timeline || pkg.timelineStandard;
        sowLayout.writeText(
          `Target Timeline: [${calcTimeline}]${
            isFastTrack ? ' (Fast-Tracked Deployment)' : ''
          }`,
          10
        );
      } else {
        const totalMonthlyRetainer = pkg.basePrice + addonsTotal;

        sowLayout.drawHeader(
          'SERVICE LEVEL RETAINER AGREEMENT (SLA)',
          'Monthly recurring scope, telemetry governance, and performance metrics'
        );

        sowLayout.drawMetadataCard([
          ['SLA Reference ID:', generatedId],
          ['Date of Issue:', new Date().toISOString().split('T')[0]],
          ['Managing Consultant:', developerName],
          ['Client Entity:', clientName],
          ['Service Retainer Tier:', pkg.name],
        ]);

        sowLayout.writeText('1. RECURRING OPERATIONAL SCOPE', 11, true, [15, 23, 42]);
        sowLayout.writeText(pkg.description, 10);

        sowLayout.writeText('2. MONTHLY DELIVERABLES & SERVICE TASKS', 11, true, [15, 23, 42]);
        pkg.deliverables.forEach((item, idx) => {
          sowLayout.writeText(`  ${idx + 1}. ${item}`, 10);
        });

        sowLayout.writeText('3. FINANCIAL SPECIFICATION & RETAINER TERMS', 11, true, [15, 23, 42]);
        sowLayout.drawTable(['Retainer Scope Component', 'Monthly Fee'], tableRows);
        sowLayout.drawRetainerSummaryBox(totalMonthlyRetainer);

        sowLayout.writeText('4. PASS-THROUGH COSTS & EXCLUSIONS', 11, true, [15, 23, 42]);
        sowLayout.writeText(
          '4.1. Raw Advertising Spend: Ad budgets paid to Meta, Google, or LinkedIn are billed directly to client corporate cards and excluded from agency retainers.',
          10
        );
        sowLayout.writeText(
          '4.2. Creator & Production Exclusions: Direct influencer compensation and professional external studio videography are quoted as standalone project add-ons.',
          10
        );
      }

      const sowPdfBuffer = Buffer.from(docSOW.output('arraybuffer'));

      const pdfAttachments = [
        {
          filename: `${developerName.replace(/\s+/g, '_')}_Legal_Framework.pdf`,
          content: msaPdfBuffer,
          contentType: 'application/pdf',
        },
        {
          filename: `${developerName.replace(/\s+/g, '_')}_${
            pkg.billingModel === 'fixed' ? 'SOW' : 'SLA'
          }_${generatedId}.pdf`,
          content: sowPdfBuffer,
          contentType: 'application/pdf',
        },
      ];

      mailOptions.attachments = pdfAttachments;
      clientMailOptions.attachments = pdfAttachments;
    }

    await transporter.sendMail(mailOptions);

    if (normalizedInquiryType === 'project' && clientMailOptions.attachments.length > 0) {
      await transporter.sendMail(clientMailOptions);
    }

    return NextResponse.json(
      { message: 'Transmission verified and documents dispatched.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email Routing Error:', error);
    return NextResponse.json(
      { error: 'Email delivery failed: ' + (error?.message || 'Failed to dispatch payload.') },
      { status: 500 }
    );
  }
}