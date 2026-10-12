/* src/data/servicesCatalog.js */

export const SERVICE_PILLARS = [
  {
    id: "telemetry",
    name: "Performance Telemetry & Lead Intelligence",
    badge: "The Verification Layer (Strategic Pivot)",
    description:
      "Anyone can build a webpage. We instrument custom event telemetry, dwell-time triggers, and funnel tracking to mathematically prove whether your digital asset captures leads or leaks traffic.",
  },
  {
    id: "growth",
    name: "Growth Marketing & Traffic Acquisition",
    badge: "The Distribution Layer",
    description:
      "High-intent search engine optimization, paid media orchestration, and multi-channel brand management to feed qualified prospective clients into verified funnels.",
  },
  {
    id: "engineering",
    name: "System Engineering & Web Development",
    badge: "The Build Layer",
    description:
      "Deterministic software architecture, web applications, and digital platforms engineered for high throughput, mobile responsiveness, and long-term maintainability.",
  },
];

export const SERVICES_CATALOG = [
  // ----------------------------------------------------
  // PILLAR 1: SYSTEM ENGINEERING & WEB DEVELOPMENT
  // ----------------------------------------------------
  {
    id: "basic",
    pillarId: "engineering",
    name: "Basic Webpage",
    price: "R 2,500",
    basePrice: 2500,
    billingModel: "fixed",
    billingCadence: "Once-Off Milestone",
    description:
      "A single-page high-conversion landing page for businesses needing an immediate online presence.",
    features: [
      "Single responsive layout",
      "Contact form integration",
      "Mobile-first design",
      "Basic SEO metadata",
    ],
    isPrimary: false,
    timelineStandard: "3-5 Business Days",
    timelineFastTrack: "1-2 Business Days",
    deliverables: [
      "Single-page responsive production deployment",
      "Client contact form integration & routing",
      "Baseline OpenGraph and metadata configuration",
      "Staging demonstration and DNS cutover",
    ],
  },
  {
    id: "starter",
    pillarId: "engineering",
    name: "Starter (MVP)",
    price: "R 12,500",
    basePrice: 12500,
    billingModel: "fixed",
    billingCadence: "Once-Off Milestone",
    description:
      "Basic 3-5 page responsive site, contact forms, and SEO setup optimized for early user acquisition.",
    features: [
      "Up to 5 responsive pages",
      "CMS for basic content edits",
      "Standard analytics setup",
      "Domain & Email configuration",
    ],
    isPrimary: true,
    timelineStandard: "10-14 Business Days",
    timelineFastTrack: "5-7 Business Days",
    deliverables: [
      "5 responsive modular pages",
      "Decoupled or lightweight headless CMS",
      "Standard GA4 & GTM property integration",
      "Domain records, SSL, and transactional email setup",
    ],
  },
  {
    id: "growth",
    pillarId: "engineering",
    name: "Growth (Custom)",
    price: "R 35,000",
    basePrice: 35000,
    billingModel: "fixed",
    billingCadence: "Once-Off Milestone",
    description:
      "Full feature roadmap implementation, API integrations, and performance optimization for growing teams.",
    features: [
      "Full custom feature set",
      "Third-party API integrations",
      "Performance & Speed optimization",
      "Advanced SEO & Monitoring",
    ],
    isPrimary: false,
    timelineStandard: "21-30 Business Days",
    timelineFastTrack: "10-14 Business Days",
    deliverables: [
      "Bespoke application architecture and custom backend logic",
      "Secure third-party API and payment gateway integrations",
      "Core Web Vitals tuning and 90+ Lighthouse scoring",
      "Automated system health telemetry and monitoring",
    ],
  },
  {
    id: "enterprise",
    pillarId: "engineering",
    name: "Enterprise Architecture",
    price: "R 75,000",
    basePrice: 75000,
    billingModel: "fixed",
    billingCadence: "Once-Off Milestone",
    description:
      "Custom infrastructure, security reviews, and mission-critical scalability for large-scale platforms.",
    features: [
      "Custom cloud architecture",
      "Penetration testing & Security audit",
      "High-availability setup",
      "Multi-platform synchronization",
    ],
    isPrimary: false,
    timelineStandard: "45+ Business Days",
    timelineFastTrack: "21-30 Business Days",
    deliverables: [
      "Multi-region cloud infrastructure and containerization",
      "Zero-trust security protocol audit and hardening",
      "Redundant failover, backup, and high-availability systems",
      "Continuous integration / continuous deployment pipelines",
    ],
  },

  // ----------------------------------------------------
  // PILLAR 2: PERFORMANCE TELEMETRY & LEAD INTELLIGENCE (THE PIVOT)
  // ----------------------------------------------------
  {
    id: "telemetry-setup",
    pillarId: "telemetry",
    name: "Lead Funnel Telemetry Implementation",
    price: "R 8,500",
    basePrice: 8500,
    billingModel: "fixed",
    billingCadence: "Once-Off Implementation",
    description:
      "Build a transparent lead intelligence engine. Configures custom hover-intent, dwell-time listeners, and conversion funnels to verify page performance.",
    features: [
      "Audit of existing GA4 and GTM installation",
      "Hover-intent & dwell-time trigger injection",
      "Form-submission & lead qualification events",
      "Custom GA4 funnel exploration dashboards",
      "End-to-end GTM preview QA verification",
    ],
    isPrimary: true,
    timelineStandard: "5-7 Business Days",
    timelineFastTrack: "2-3 Business Days",
    deliverables: [
      "Production Google Tag Manager container deployment",
      "Custom JavaScript listeners for client engagement tracking",
      "Qualified lead pipeline event triggers in GA4",
      "Lead drop-off and conversion rate visualization dashboard",
    ],
  },
  {
    id: "telemetry-advanced",
    pillarId: "telemetry",
    name: "Full-Funnel Behavioral Instrumentation",
    price: "R 14,500",
    basePrice: 14500,
    billingModel: "fixed",
    billingCadence: "Once-Off Implementation",
    description:
      "Advanced behavioral instrumentation for high-traffic assets. Maps granular drop-offs, multi-step qualification steps, and server-side tracking.",
    features: [
      "Everything in Funnel Telemetry Implementation",
      "Server-side Meta Conversions API (CAPI) / Google Tagging",
      "Multi-step lead qualification gate tracking",
      "Cross-domain & session attribution mapping",
      "Custom executive reporting dashboard (Looker Studio)",
    ],
    isPrimary: false,
    timelineStandard: "10-14 Business Days",
    timelineFastTrack: "5-7 Business Days",
    deliverables: [
      "Server-side GTM cloud container deployment",
      "First-party attribution cookies and CAPI pipeline",
      "Multi-step lead scoring telemetry",
      "Looker Studio executive lead pipeline report",
    ],
  },
  {
    id: "telemetry-retainer",
    pillarId: "telemetry",
    name: "Conversion Optimization & Analytics Retainer",
    price: "R 5,500 / month",
    basePrice: 5500,
    billingModel: "retainer",
    billingCadence: "Monthly Retainer",
    description:
      "Continuous data auditing, user friction anomaly detection, and monthly CRO recommendations to eliminate funnel drop-off.",
    features: [
      "Monthly GA4 anomaly & leakage detection",
      "Conversion Rate Optimization (CRO) audits",
      "Hover threshold & scroll depth tuning",
      "Monthly lead intelligence report & strategy briefing",
    ],
    isPrimary: false,
    timelineStandard: "Monthly Recurring",
    timelineFastTrack: "N/A",
    deliverables: [
      "Continuous GA4 / GTM data hygiene and monitoring",
      "Monthly behavioral friction and drop-off diagnosis",
      "Actionable CRO layout and copy adjustment proposals",
      "Monthly executive video debrief and telemetry report",
    ],
  },

  // ----------------------------------------------------
  // PILLAR 3: GROWTH MARKETING & TRAFFIC ACQUISITION
  // ----------------------------------------------------
  {
    id: "seo-local",
    pillarId: "growth",
    name: "Local Market SEO",
    price: "R 7,500 / month",
    basePrice: 7500,
    billingModel: "retainer",
    billingCadence: "Monthly Retainer",
    description:
      "Capture local search intent across targeted cities and suburbs to feed localized service funnels.",
    features: [
      "Google Business Profile optimization & management",
      "Local citation & directory building",
      "Suburb- and city-level keyword targeting",
      "Localized landing page optimization",
      "Monthly local organic ranking reports",
    ],
    isPrimary: false,
    timelineStandard: "Monthly Recurring",
    timelineFastTrack: "N/A",
    deliverables: [
      "Optimized Google Business Profile and local listings",
      "Targeted localized on-page keyword enhancements",
      "Review acquisition and reputation workflows",
      "Monthly local keyword visibility indexing reports",
    ],
  },
  {
    id: "seo-sme",
    pillarId: "growth",
    name: "SME & National Service SEO",
    price: "R 18,500 / month",
    basePrice: 18500,
    billingModel: "retainer",
    billingCadence: "Monthly Retainer",
    description:
      "Comprehensive search engine dominance for national service businesses and consultancies demanding organic inbound leads.",
    features: [
      "Comprehensive technical site audits & indexing fixes",
      "Core Web Vitals & speed tracking",
      "Multi-keyword cluster content mapping",
      "Monthly optimized thought-leadership content",
      "High-authority strategic backlink acquisition",
    ],
    isPrimary: true,
    timelineStandard: "Monthly Recurring",
    timelineFastTrack: "N/A",
    deliverables: [
      "Continuous technical SEO auditing and code remediation",
      "Monthly editorial content production focused on buyer intent",
      "High-authority link acquisition campaigns",
      "Organic conversion and attribution dashboard",
    ],
  },
  {
    id: "seo-enterprise",
    pillarId: "growth",
    name: "E-Commerce / Enterprise SEO",
    price: "R 38,000 / month",
    basePrice: 38000,
    billingModel: "retainer",
    billingCadence: "Monthly Retainer",
    description:
      "Large-scale technical architecture optimization for high-SKU stores and enterprise web applications.",
    features: [
      "Advanced platform reviews (Shopify, WooCommerce, Custom)",
      "Product & Organization schema markup",
      "Faceted navigation & indexing control",
      "High-volume backlink acquisition",
      "Direct technical liaison with engineering teams",
    ],
    isPrimary: false,
    timelineStandard: "Monthly Recurring",
    timelineFastTrack: "N/A",
    deliverables: [
      "Automated schema and structured data injection",
      "Faceted indexing and crawl budget optimization",
      "High-tier digital PR and editorial link placement",
      "Bi-weekly technical synchronization meetings",
    ],
  },
  {
    id: "ppc-management",
    pillarId: "growth",
    name: "Paid Media (PPC) Management",
    price: "R 9,500 / month",
    basePrice: 9500,
    billingModel: "retainer",
    billingCadence: "Monthly Retainer (+ Pass-Through Ad Spend)",
    description:
      "Full campaign orchestration on Google Ads, Meta, and LinkedIn. Flat fee covers spend up to R50,000/mo (12% of spend thereafter).",
    features: [
      "Campaign architecture & account structure",
      "Target audience segmentation & intent modeling",
      "High-converting ad copy & creative briefing",
      "Conversion tracking setup & offline event sync",
      "Continuous weekly A/B budget & bid testing",
    ],
    isPrimary: false,
    timelineStandard: "Monthly Recurring",
    timelineFastTrack: "N/A",
    deliverables: [
      "Full ad account strategy and continuous bid management",
      "Conversion tracking synchronization with ad networks",
      "Creative brief iterations and ad copy variants",
      "Weekly performance optimization & spend governance",
    ],
  },
  {
    id: "social-starter",
    pillarId: "growth",
    name: "Social Management (Starter)",
    price: "R 6,500 / month",
    basePrice: 6500,
    billingModel: "retainer",
    billingCadence: "Monthly Retainer",
    description:
      "Baseline visibility and consistent brand proof across core digital networks for founders and local businesses.",
    features: [
      "Management of 1 to 2 platforms (Meta/Instagram)",
      "2 to 3 static grid posts or templates weekly",
      "Routine comment and direct message monitoring",
      "Monthly executive summary report",
    ],
    isPrimary: false,
    timelineStandard: "Monthly Recurring",
    timelineFastTrack: "N/A",
    deliverables: [
      "Monthly content calendar and scheduled publishing",
      "Standard community engagement and triage",
      "Monthly visibility and reach report",
    ],
  },
  {
    id: "social-growth",
    pillarId: "growth",
    name: "Social Management (Growth SME)",
    price: "R 18,500 / month",
    basePrice: 18500,
    billingModel: "retainer",
    billingCadence: "Monthly Retainer",
    description:
      "Active multi-channel execution featuring short-form video editing, proactive audience engagement, and performance dashboards.",
    features: [
      "Management of 3 platforms (e.g., LinkedIn, Instagram, Meta)",
      "3 to 5 multi-format posts/week (includes Reels/Shorts editing)",
      "Proactive industry engagement and conversation seeding",
      "Custom monthly reporting dashboards & strategy reviews",
    ],
    isPrimary: false,
    timelineStandard: "Monthly Recurring",
    timelineFastTrack: "N/A",
    deliverables: [
      "Weekly short-form video editing and post scheduling",
      "Active audience engagement and lead direct messaging",
      "Custom monthly performance analytics dashboard",
      "Monthly strategy alignment briefing",
    ],
  },
];

export const ADDONS_CATALOG = [
  {
    id: "additionalPages",
    category: "Scope Expansion",
    name: "Additional Pages",
    type: "scalar",
    price: "+ R 1,000 /page",
    unitPrice: 1000,
    description: "Expand your site's scope. Basic: Max 2. Starter: Max 5.",
    restrictedTo: ["basic", "starter", "growth"],
    maxLimit: { basic: 2, starter: 5, growth: 99, enterprise: 99 },
  },
  {
    id: "shareCode",
    category: "Scope Expansion",
    name: "Full Source Ownership",
    type: "boolean",
    price: "+ R 5,000",
    unitPrice: 5000,
    description:
      "Complete handover of the git repository and intellectual property rights.",
    restrictedTo: ["basic", "starter", "growth", "enterprise"],
  },
  {
    id: "emailServer",
    category: "Infrastructure",
    name: "Domain & Email Configuration",
    type: "boolean",
    price: "+ R 1,500",
    unitPrice: 1500,
    description:
      "Professional communication integration. (Native to Starter+).",
    restrictedTo: ["basic"],
  },
  {
    id: "analytics",
    category: "Infrastructure",
    name: "Standard Analytics Setup",
    type: "boolean",
    price: "+ R 1,200",
    unitPrice: 1200,
    description:
      "Traffic monitoring and basic conversion tracking. (Native to Starter+).",
    restrictedTo: ["basic"],
  },
  {
    id: "cmsSetup",
    category: "Infrastructure",
    name: "Lightweight CMS",
    type: "boolean",
    price: "+ R 3,500",
    unitPrice: 3500,
    description:
      "Administrative interface for dynamic content edits. (Native to Starter+).",
    restrictedTo: ["basic"],
  },
  {
    id: "chatbotDialogflow",
    category: "Conversational AI",
    name: "Website Chatbot (Quick Setup)",
    type: "boolean",
    price: "+ R 4,500",
    unitPrice: 4500,
    description:
      "Dialogflow/Tidio. Best for immediate lead capture and FAQ handling.",
    restrictedTo: [
      "basic",
      "starter",
      "growth",
      "enterprise",
      "telemetry-setup",
      "telemetry-advanced",
    ],
  },
  {
    id: "chatbotBotpress",
    category: "Conversational AI",
    name: "Hybrid Chatbot (Botpress)",
    type: "boolean",
    price: "+ R 8,500",
    unitPrice: 8500,
    description:
      "Balanced visual logic with custom nodes for specialized user journeys.",
    restrictedTo: [
      "starter",
      "growth",
      "enterprise",
      "telemetry-setup",
      "telemetry-advanced",
    ],
  },
  {
    id: "chatbotPowerVirtual",
    category: "Conversational AI",
    name: "Internal Ops Bot",
    type: "boolean",
    price: "+ R 12,500",
    unitPrice: 12500,
    description:
      "Power Virtual Agents. Automation for employee-facing internal tools.",
    restrictedTo: ["growth", "enterprise"],
  },
  {
    id: "chatbotRasa",
    category: "Conversational AI",
    name: "Private AI Agent (Rasa)",
    type: "boolean",
    price: "+ R 18,500",
    unitPrice: 18500,
    description:
      "Self-hosted AI for 100% data control and privacy compliance.",
    restrictedTo: ["growth", "enterprise"],
  },
  {
    id: "chatbotWatson",
    category: "Conversational AI",
    name: "Enterprise Customer Support",
    type: "boolean",
    price: "+ R 32,000",
    unitPrice: 32000,
    description:
      "Amazon Lex/IBM Watson. High-volume, deep NLP for mission-critical platforms.",
    restrictedTo: ["enterprise"],
  },
];

export function getPackageById(id) {
  return SERVICES_CATALOG.find((p) => p.id === id) || null;
}

export function getAddonById(id) {
  return ADDONS_CATALOG.find((a) => a.id === id) || null;
}

export function getAllPackageDisplayNames() {
  const map = {};
  SERVICES_CATALOG.forEach((pkg) => {
    map[pkg.id] = pkg.name;
  });
  return map;
}