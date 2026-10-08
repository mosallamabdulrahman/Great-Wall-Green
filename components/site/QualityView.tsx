import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Search,
  ExternalLink,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface QualityViewProps {
  lang: Lang;
  c: SiteCopy;
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
  setDialog: (dialog: string) => void;
}

export function QualityView({
  lang,
  c,
  href,
  rfq,
  setDialog,
}: QualityViewProps) {
  // 3 Inspection Focus Cards from Mockup 6 (design screens/quality.jpeg)
  const inspectionCards = [
    {
      id: "source",
      title: lang === "ar" ? "مراقبة المصدر" : "Source Monitoring",
      desc:
        lang === "ar"
          ? "فريق جودة متخصص في قواعد الزراعة لمراقبة جودة الكستناء من الشجرة."
          : "Quality staff at growing bases to monitor chestnut quality.",
      icon: Search,
    },
    {
      id: "grading",
      title: lang === "ar" ? "نظام الفرز والتصنيف" : "Grading System",
      desc:
        lang === "ar"
          ? "فرز وتصنيف الكستناء الخام بدقة حسب الحجم والوزن والنقاء."
          : "Raw chestnuts are classified by size and quality.",
      icon: ShieldCheck,
    },
    {
      id: "zero",
      title: lang === "ar" ? "خالٍ من الإضافات" : "Zero Additives",
      desc:
        lang === "ar"
          ? "رقابة جودة صارمة مطبقة على كل خطوة من خطوات عملية الإنتاج."
          : "Strict quality control applied to every production process step.",
      icon: Award,
    },
  ];

  // 5 Official Certificate Cards matching Mockup 6 (with crisp high-res images and SVG fallbacks)
  const certificates = [
    {
      id: "brcgs",
      name: "BRCGS",
      standard: lang === "ar" ? "المعيار العالمي" : "Global Standard",
      category: lang === "ar" ? "سلامة الغذاء" : "Food Safety",
      image: "/assets/certificates/brc-logo.jpg",
      svg: "/assets/certificates/brcgs.svg",
    },
    {
      id: "haccp",
      name: "HACCP",
      standard: lang === "ar" ? "تحليل المخاطر" : "Hazard Analysis",
      category: lang === "ar" ? "إدارة سلامة الغذاء" : "Food Safety Management",
      image: "/assets/certificates/haccp.webp",
      svg: "/assets/certificates/haccp.svg",
    },
    {
      id: "iso",
      name: "ISO 9001",
      standard: lang === "ar" ? "إدارة الجودة" : "Quality Management",
      category: lang === "ar" ? "نظام إدارة الجودة" : "Quality Management",
      image: "/assets/certificates/iso-50001.webp",
      svg: "/assets/certificates/iso9001.svg",
    },
    {
      id: "organic",
      name: "EU Organic",
      standard: lang === "ar" ? "شهادة عضوية" : "Organic Certification",
      category: lang === "ar" ? "عضوي ECOCERT" : "EU Organic ECOCERT",
      image: "/assets/certificates/eu-organic.jpg",
      svg: "/assets/certificates/eu-organic.svg",
    },
    {
      id: "halal",
      name: "Halal",
      standard: lang === "ar" ? "شهادة حلال" : "Halal Certification",
      category: lang === "ar" ? "أغذية إسلامية" : "Halal Certification",
      image: "/assets/certificates/halal-certification.png",
      svg: "/assets/certificates/halal.svg",
    },
  ];

  return (
    <div className="quality-page-wrapper">
      {/* 1. Hero Section matching Mockup 6 */}
      <section className="quality-hero-custom">
        <SiteImage
          name="quality"
          alt="Quality & Compliance"
          className="quality-hero-backdrop"
          priority
        />
        <div className="container">
          <div className="quality-hero-content">
            <h1>{lang === "ar" ? "الجودة والامتثال" : "Quality & Compliance"}</h1>
            <p>
              {lang === "ar"
                ? "رقابة الجودة من اختيار المواد الخام حتى فحص المنتج النهائي."
                : "Quality control from raw material selection through finished-product inspection."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Three Feature / Inspection Cards Section */}
      <section className="quality-cards-bar">
        <div className="container">
          <div className="quality-inspection-grid">
            {inspectionCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="q-inspection-card">
                  <div className="q-card-icon-circle">
                    <Icon size={24} />
                  </div>
                  <div className="q-card-text">
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Our Certifications Section matching Mockup 6 */}
      <section className="section quality-cert-section">
        <div className="container">
          <div className="quality-cert-header-row">
            <div>
              <h2>{lang === "ar" ? "شهاداتنا" : "Our Certifications"}</h2>
              <p>
                {lang === "ar"
                  ? "شهادات معتمدة وموثقة لأسواق الأغذية الدولية."
                  : "Verified certifications for international food markets."}
              </p>
            </div>
            <button
              className="view-all-certs-link"
              onClick={() => setDialog("cert:BRCGS")}
            >
              {lang === "ar" ? "عرض جميع الشهادات" : "View All Certificates"}
              <ArrowRight size={15} className="btn-arrow-icon" />
            </button>
          </div>

          <div className="quality-5cert-grid">
            {certificates.map((cert) => (
              <div key={cert.id} className="q-cert-card">
                <div className="q-cert-logo-box">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = cert.svg;
                    }}
                  />
                </div>
                <div className="q-cert-body">
                  <span className="q-cert-cat">{cert.category}</span>
                  <span className="q-cert-std">{cert.standard}</span>
                </div>
                <button
                  className="q-cert-view-btn"
                  onClick={() => setDialog(`cert:${cert.name}`)}
                >
                  {lang === "ar" ? "عرض الشهادة" : "View Certificate"}
                  <ArrowRight size={15} className="btn-arrow-icon" />
                </button>
              </div>
            ))}
          </div>

          <div className="cert-note-card">
            <p>
              {lang === "ar"
                ? "ملاحظة: تتوفر ملفات الشهادات الحالية والجهات المصدرة ونطاق الصلاحية لكل شحنة ومنتج. يرجى التواصل مع فريق التصدير للحصول على ملفات التدقيق الكاملة."
                : "Note: Full audit reports, issuer credentials, and current scope certificates are provided with commercial documentation upon request."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Inspection & Standards Matrix */}
      <section className="section quality-matrix-section">
        <div className="container">
          <div className="q-matrix-grid">
            <div className="q-matrix-info">
              <span className="eyebrow">
                {lang === "ar" ? "بروتوكول الفحص" : "TESTING STANDARDS"}
              </span>
              <h2>
                {lang === "ar"
                  ? "فحص مخبري شامل لكل دفعة إنتاج"
                  : "Comprehensive Lab Verification on Every Batch"}
              </h2>
              <p>
                {lang === "ar"
                  ? "يخضع كل طلب لفحوص مخبرية صارمة لضمان خلوه من متبقيات المبيدات، والأفلاتوكسين، والمعادن الثقيلة، مع توفير شهادة تحليل COA معتمدة مع كل بوليصة شحن."
                  : "Each batch undergoes rigorous internal and 3rd-party laboratory testing ensuring zero detectable pesticide residues, zero artificial additives, and strict compliance with destination country import requirements."}
              </p>
              <div className="q-matrix-badges">
                <span className="badge-item">
                  <CheckCircle2 size={16} />{" "}
                  {lang === "ar" ? "شهادة تحليل COA" : "Batch COA Issued"}
                </span>
                <span className="badge-item">
                  <CheckCircle2 size={16} />{" "}
                  {lang === "ar" ? "فحص الأشعة السينية" : "X-Ray Foreign Matter Check"}
                </span>
                <span className="badge-item">
                  <CheckCircle2 size={16} />{" "}
                  {lang === "ar" ? "تتبع كامل للشحنة" : "Lot Traceability"}
                </span>
              </div>
            </div>

            <div className="q-table-card">
              <table className="quality-table">
                <thead>
                  <tr>
                    <th>{lang === "ar" ? "معيار الاختبار" : "Test Parameter"}</th>
                    <th>{lang === "ar" ? "المعيار المعتمد" : "Specification"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{lang === "ar" ? "متبقيات المبيدات" : "Pesticide Residue"}</td>
                    <td className="highlight-pass">
                      {lang === "ar" ? "غير مكتشفة (معايير الاتحاد الأوروبي)" : "Non-detected (EU Compliant)"}
                    </td>
                  </tr>
                  <tr>
                    <td>{lang === "ar" ? "الأفلاتوكسين" : "Aflatoxin"}</td>
                    <td className="highlight-pass">
                      {lang === "ar" ? "أقل من 2.0 ميكروغرام/كغ" : "< 2.0 µg/kg"}
                    </td>
                  </tr>
                  <tr>
                    <td>{lang === "ar" ? "محتوى الرطوبة" : "Moisture Content"}</td>
                    <td>12.0% - 15.0%</td>
                  </tr>
                  <tr>
                    <td>{lang === "ar" ? "المعادن الثقيلة" : "Heavy Metals (Pb, Cd)"}</td>
                    <td className="highlight-pass">
                      {lang === "ar" ? "ضمن حدود منظمة الصحة العالمية" : "Within WHO & FDA Limits"}
                    </td>
                  </tr>
                  <tr>
                    <td>{lang === "ar" ? "المواد الحافظة والألوان" : "Preservatives & Colorants"}</td>
                    <td className="highlight-pass">
                      {lang === "ar" ? "صفر (خالٍ 100%)" : "0.0% (Zero Added)"}
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <a className="btn" href={rfq("", "Bulk Supply")}>
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
