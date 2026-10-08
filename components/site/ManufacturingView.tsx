import React from "react";
import {
  Play,
  Factory,
  Warehouse,
  Cpu,
  Boxes,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface ManufacturingViewProps {
  lang: Lang;
  c: SiteCopy;
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
  setDialog: (dialog: string) => void;
}

export function ManufacturingView({
  lang,
  c,
  href,
  rfq,
  setDialog,
}: ManufacturingViewProps) {
  const stats = [
    {
      val: "50,000 m²",
      label: lang === "ar" ? "مرافق الإنتاج" : "Production Facilities",
    },
    {
      val: "50,000+ Tons",
      label: lang === "ar" ? "سعة التخزين" : "Storage Capacity",
    },
    {
      val: lang === "ar" ? "حديثة" : "Modern",
      label:
        lang === "ar"
          ? "خطوط إنتاج مؤتمتة"
          : "Automated Production Lines",
    },
    {
      val: lang === "ar" ? "متكاملة" : "Integrated",
      label: lang === "ar" ? "سلسلة توريد متكاملة" : "Supply Chain",
    },
  ];

  // 5 Process Steps matching Mockup 5 (design screens/manufactiuring.jpeg)
  const processSteps = [
    {
      id: "cleaning",
      title: lang === "ar" ? "التنظيف والتقشير" : "Cleaning & Peeling",
      image: "mfg-cleaning",
    },
    {
      id: "roasting",
      title: lang === "ar" ? "التحميص" : "Roasting",
      image: "mfg-roasting",
    },
    {
      id: "drying",
      title: lang === "ar" ? "التجفيف" : "Drying",
      image: "mfg-drying",
    },
    {
      id: "packaging",
      title: lang === "ar" ? "التعبئة والتغليف" : "Packaging",
      image: "mfg-packaging",
    },
    {
      id: "detection",
      title: lang === "ar" ? "كشف المعادن" : "Metal Detection",
      image: "mfg-metal-detection",
    },
  ];

  return (
    <div className="manufacturing-page-wrapper">
      {/* 1. Hero Section - Exact Match with mockup 5 */}
      <section className="manufacturing-hero">
        <SiteImage
          name="mfg-hero"
          alt="Our Manufacturing"
          className="manufacturing-hero-backdrop"
          priority
        />
        <div className="manufacturing-hero-overlay" />
        <div className="container manufacturing-hero-inner">
          <div className="manufacturing-hero-content">
            <h1>{lang === "ar" ? "تصنيعنا" : "Our Manufacturing"}</h1>
            <p>
              {lang === "ar"
                ? "مرافق إنتاج حديثة وعمليات متكاملة من المواد الخام حتى المنتجات النهائية."
                : "Modern production facilities and integrated operations from raw materials to finished products."}
            </p>
            <div className="manufacturing-hero-actions">
              <button
                className="btn btn-video"
                onClick={() => setDialog("video")}
              >
                <span className="btn-video-icon">
                  <Play size={13} fill="currentColor" />
                </span>
                {lang === "ar" ? "شاهد الفيديو الخاص بنا" : "Watch Our Video"}
                <ArrowRight size={15} className="btn-arrow-icon" />
              </button>
              <a href="#facilities" className="btn btn-facilities-outline">
                {lang === "ar" ? "عرض المرافق" : "View Facilities"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Stats Bar */}
      <section className="manufacturing-stats-bar">
        <div className="container">
          <div className="manufacturing-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="m-stat-item">
                <span className="m-stat-val">{s.val}</span>
                <span className="m-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Five Process Photo Cards - Exact Match with mockup 5 */}
      <section className="section manufacturing-process-section" id="facilities">
        <div className="container">
          <div className="manufacturing-process-grid">
            {processSteps.map((step) => (
              <div key={step.id} className="m-process-card">
                <div className="m-process-img-box">
                  <SiteImage name={step.image} alt={step.title} />
                </div>
                <div className="m-process-body">
                  <h3>{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Infrastructure Highlights */}
      <section className="section manufacturing-features-section">
        <div className="container">
          <div className="manufacturing-features-grid">
            <div className="m-feature-text">
              <span className="eyebrow">
                {lang === "ar" ? "القدرة التنافسية" : "FACILITY CAPABILITIES"}
              </span>
              <h2>
                {lang === "ar"
                  ? "بنية تحتية متطورة لتوريد موثوق للشركات"
                  : "State-of-the-Art Production & Cold-Chain Storage"}
              </h2>
              <p>
                {lang === "ar"
                  ? "يقع مجمعنا الصناعي في قلب منطقة يانشان لخبي، بمساحة 50,000 متر مربع وسعة تخزين تبريد تتجاوز 50,000 طن متري للحفاظ على الكستناء طازجة على مدار العام."
                  : "Located at the heart of Yanshan, Hebei, our 50,000 m² facility features low-temperature cold chain preservation holding 50,000+ tons, ensuring year-round supply stability."}
              </p>

              <div className="m-feature-bullets">
                <div className="m-bullet">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>
                      {lang === "ar"
                        ? "غرف نظيفة بمعايير التجزئة العالمية"
                        : "GMP / ISO Grade Cleanrooms"}
                    </strong>
                    <span>
                      {lang === "ar"
                        ? "بيئة معقمة ومحكمة بالكامل للتعبئة والتغليف."
                        : "Fully sanitized, pressure-controlled packing environments."}
                    </span>
                  </div>
                </div>

                <div className="m-bullet">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <strong>
                      {lang === "ar"
                        ? "سلسلة توريد متكاملة من المزرعة للميناء"
                        : "Direct Farm-to-Port Supply Chain"}
                    </strong>
                    <span>
                      {lang === "ar"
                        ? "قرب جغرافي من موانئ تيانجين للشحن الدولي السريع."
                        : "Proximity to Tianjin Port for efficient global export."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="m-feature-actions">
                <a className="btn" href={rfq("", "OEM Manufacturing")}>
                  {c.quote}
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </a>
                <a className="btn btn-outline" href={href("quality")}>
                  {c.quality}
                </a>
              </div>
            </div>

            <div className="m-feature-visual">
              <SiteImage
                name="factory"
                alt="Great Wall Green Source Production Facility"
                className="m-feature-photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Conversion Banner */}
      <section className="conversion">
        <div className="container conversion-inner">
          <div>
            <span className="eyebrow">GREAT WALL GREEN SOURCE</span>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <div className="banner-actions">
            <a className="btn" href={rfq("", "OEM Manufacturing")}>
              {c.quote}
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
