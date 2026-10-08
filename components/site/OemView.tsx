import React from "react";
import { ArrowRight } from "lucide-react";
import { type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

// Custom Capability Icons matching Mockup 4
function WeightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13h8" />
      <path d="M21 9h6a2 2 0 0 1 2 2v2h-10v-2a2 2 0 0 1 2-2z" />
      <path d="M15 13c-4 2-7 8-6 16 1 8 6 13 15 13s14-5 15-13c1-8-2-14-6-16H15z" />
      <circle cx="24" cy="27" r="4.5" />
    </svg>
  );
}

function PackagingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M24 7 38 15v18L24 41 10 33V15z" />
      <path d="M10 15l14 8 14-8" />
      <path d="M24 23v18" />
      <path d="M17 11l14 8" />
      <path d="M24 7v16" />
    </svg>
  );
}

function ArtworkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="8" width="30" height="32" rx="5" />
      <circle cx="19" cy="19" r="3.5" />
      <path d="m39 29-7-7-14 14" />
      <line x1="16" y1="34" x2="32" y2="14" strokeWidth="1.8" />
    </svg>
  );
}

function LanguageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 14h16" />
      <path d="M18 10v4" />
      <path d="M23 18c-2 6-6 10-12 12" />
      <path d="M15 22c3 3 7 6 10 8" />
      <path d="M30 38l7-18 7 18" />
      <path d="M33 32h8" />
    </svg>
  );
}

function BarcodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 11v26" strokeWidth="3" />
      <path d="M14 11v26" strokeWidth="1.8" />
      <path d="M19 11v26" strokeWidth="2.5" />
      <path d="M25 11v26" strokeWidth="1.8" />
      <path d="M29 11v26" strokeWidth="3" />
      <path d="M35 11v26" strokeWidth="1.8" />
      <path d="M40 11v26" strokeWidth="2.5" />
    </svg>
  );
}

function CartonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M24 7 38 15v17L24 40 10 32V15z" />
      <path d="M10 15l14 8 14-8" />
      <path d="M24 23v17" />
      <path d="M10 15 5 11l14-6 5 7" />
      <path d="M38 15l5-4-14-6-5 7" />
    </svg>
  );
}

interface OemViewProps {
  c: SiteCopy;
  lang?: Lang;
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
}

export function OemView({ c, lang = "en", href, rfq }: OemViewProps) {
  // 6 OEM Capabilities matching Mockup 4
  const capabilities = [
    {
      id: "weight",
      title: lang === "ar" ? "وزن مخصص" : "Custom Weight",
      icon: WeightIcon,
    },
    {
      id: "packaging",
      title: lang === "ar" ? "تعبئة مخصصة" : "Packaging",
      icon: PackagingIcon,
    },
    {
      id: "artwork",
      title: lang === "ar" ? "تصميم علامتك" : "Brand Artwork",
      icon: ArtworkIcon,
    },
    {
      id: "language",
      title: lang === "ar" ? "لغات متعددة" : "Language",
      icon: LanguageIcon,
    },
    {
      id: "barcode",
      title: lang === "ar" ? "باركود مخصص" : "Barcode",
      icon: BarcodeIcon,
    },
    {
      id: "carton",
      title: lang === "ar" ? "كرتون الشحن" : "Carton",
      icon: CartonIcon,
    },
  ];

  // 6 OEM Process Steps matching Mockup 4
  const oemSteps = [
    {
      num: "01",
      title: lang === "ar" ? "المتطلبات" : "Requirements",
      desc:
        lang === "ar"
          ? "أخبرنا بمنتجك، وسوقك المستهدف، وتفاصيل التعبئة، ومتطلباتك التجارية."
          : "Tell us your product, target market, packaging and commercial requirements.",
    },
    {
      num: "02",
      title: lang === "ar" ? "المراجعة" : "Review",
      desc:
        lang === "ar"
          ? "يراجع فريقنا ملاءمة المنتج والجدوى الفنية والتصنيعية."
          : "Our team reviews product and production feasibility.",
    },
    {
      num: "03",
      title: lang === "ar" ? "التأكيد" : "Confirmation",
      desc:
        lang === "ar"
          ? "يتم تأكيد مواصفات المنتج والتعبئة والشروط التجارية."
          : "Product, packaging and commercial details are confirmed.",
    },
    {
      num: "04",
      title: lang === "ar" ? "العينة" : "Sample",
      desc:
        lang === "ar"
          ? "تنتقل المشاريع المؤهلة إلى مرحلة اعتماد العينات والمذاق."
          : "Qualified projects may proceed to sample confirmation.",
    },
    {
      num: "05",
      title: lang === "ar" ? "الإنتاج" : "Production",
      desc:
        lang === "ar"
          ? "يتم التصنيع ومراقبة الجودة وفقًا لمتطلبات المشروع المعتمدة."
          : "Manufacturing and quality control are performed according to the approved project requirements.",
    },
    {
      num: "06",
      title: lang === "ar" ? "التصدير" : "Export",
      desc:
        lang === "ar"
          ? "يتم شحن المنتجات النهائية وفقًا لترتيبات التصدير والتسليم المتفق عليها."
          : "Final products proceed to agreed export and delivery arrangements.",
    },
  ];

  return (
    <div className="oem-page-wrapper">
      {/* 1. OEM Hero matching Mockup 4 (image as full backdrop, no overlay) */}
      <section className="oem-hero-custom">
        <div className="oem-hero-backdrop-wrapper">
          <SiteImage
            name="oem-hero-cropped"
            alt="OEM & Private Label Chestnuts"
            className="oem-hero-backdrop-img"
            priority
          />
        </div>
        <div className="container oem-hero-inner">
          <div className="oem-hero-copy">
            <span className="oem-eyebrow">
              {lang === "ar"
                ? "التصنيع للغير والعلامة الخاصة"
                : "OEM & PRIVATE LABEL"}
            </span>
            <h1>
              {lang === "ar" ? (
                <>
                  علامتك التجارية.
                  <br />
                  خبرتنا التصنيعية.
                </>
              ) : (
                <>
                  Your Brand.
                  <br />
                  Our Manufacturing
                  <br />
                  Expertise.
                </>
              )}
            </h1>
            <p>
              {lang === "ar"
                ? "طوّر منتجات الكستناء والوجبات الخفيفة وفق متطلبات سوقك وعبواتك وهويتك التجارية."
                : "Develop chestnut and snack products around your market, packaging and branding requirements."}
            </p>
            <a className="btn oem-white-btn" href={rfq("", "Private Label")}>
              {lang === "ar"
                ? "ابدأ مشروع علامتك الخاصة"
                : "Start Your OEM Project"}
              <ArrowRight size={16} className="btn-arrow-icon" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Capability Row (6 Items) matching Mockup 4 */}
      <section className="oem-capabilities-bar">
        <div className="container">
          <div className="oem-capabilities-grid">
            {capabilities.map((cItem) => {
              const Icon = cItem.icon;
              return (
                <div key={cItem.id} className="oem-cap-item">
                  <div className="oem-cap-icon-box">
                    <Icon className="oem-cap-icon-svg" />
                  </div>
                  <span className="oem-cap-title">{cItem.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How Our OEM Process Works (Left: 6 Steps with isolated badge capsule, Right: Image Collage) */}
      <section className="oem-process-section">
        <div className="container">
          <h2 className="oem-process-main-heading">
            {lang === "ar"
              ? "كيف تعمل عملية التصنيع للغير لدينا"
              : "How Our OEM Process Works"}
          </h2>

          <div className="oem-process-two-col">
            {/* Left Column: 6 Steps with isolated badge capsule */}
            <div className="oem-steps-panel-clean">
              <div className="oem-steps-list">
                {oemSteps.map((step, idx) => (
                  <div key={step.num} className="oem-step-row">
                    <div className="oem-step-badge-col">
                      <div className="oem-step-badge">{step.num}</div>
                      {idx < oemSteps.length - 1 && (
                        <div className="oem-step-line" />
                      )}
                    </div>
                    <div className="oem-step-text">
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Photo Collage matching Mockup 4 */}
            <div className="oem-collage-wrapper">
              <div className="oem-collage-top">
                <img
                  src="/assets/oem-process-conveyor.webp"
                  alt="Chestnut Processing Conveyor"
                  className="collage-img-main"
                />
              </div>
              <div className="oem-collage-grid4">
                <img
                  src="/assets/factory.webp"
                  alt="Factory Cleanroom Workers"
                  className="collage-sub"
                />
                <img
                  src="/assets/oem.webp"
                  alt="Packaged Chestnut Pouches"
                  className="collage-sub"
                />
                <img
                  src="/assets/harvest.webp"
                  alt="Chestnut Harvest"
                  className="collage-sub"
                />
                <img
                  src="/assets/process.webp"
                  alt="Factory Workers Sorting"
                  className="collage-sub"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Conversion Banner */}
      <section className="conversion">
        <div className="container conversion-inner">
          <div>
            <span className="eyebrow">GREAT WALL GREEN SOURCE</span>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <div className="banner-actions">
            <a className="btn" href={rfq("", "Private Label")}>
              {c.startOem}
              <ArrowRight size={16} className="btn-arrow-icon" />
            </a>
            <a href={href("contact")} className="text-link light">
              {c.contactSales}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
