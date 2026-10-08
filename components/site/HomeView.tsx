import React from "react";
import {
  Leaf,
  Factory,
  Warehouse,
  Globe2,
  ShieldCheck,
  Package,
  Building2,
  Check,
  CheckCircle2,
  Play,
  ArrowRight,
} from "lucide-react";
import {
  productIds,
  productImages,
  legalName,
  type Lang,
} from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface HomeViewProps {
  lang: Lang;
  c: SiteCopy;
  pn: string[];
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
  setDialog: (dialog: string) => void;
}

export function HomeView({
  lang,
  c,
  pn,
  href,
  rfq,
  setDialog,
}: HomeViewProps) {
  const articleIds = [
    "choose-chestnut-manufacturer",
    "chestnut-harvest-season",
    "private-label-procurement",
  ];

  // Certificate logos according to user specification & reference screenshot
  const homeCertificates = [
    {
      id: "brcgs",
      name: "BRCGS",
      subtitle: lang === "ar" ? "سلامة الغذاء" : "Food Safety",
      image: "/assets/certificates/brc-logo.jpg",
      svg: "/assets/certificates/brcgs.svg",
    },
    {
      id: "haccp",
      name: "HACCP",
      subtitle: lang === "ar" ? "إدارة سلامة الغذاء" : "Food Safety Management",
      image: "/assets/certificates/haccp.webp",
      svg: "/assets/certificates/haccp.svg",
    },
    {
      id: "iso",
      name: "ISO 9001",
      subtitle: lang === "ar" ? "إدارة الجودة" : "Quality Management",
      image: "/assets/certificates/iso-50001.webp",
      svg: "/assets/certificates/iso9001.svg",
    },
    {
      id: "organic",
      name: "EU Organic",
      subtitle: lang === "ar" ? "عضوي ECOCERT" : "EU Organic ECOCERT",
      image: "/assets/certificates/eu-organic.jpg",
      svg: "/assets/certificates/eu-organic.svg",
    },
    {
      id: "halal",
      name: "Halal",
      subtitle: lang === "ar" ? "شهادة حلال" : "Halal Certification",
      image: "/assets/certificates/halal-certification.png",
      svg: "/assets/certificates/halal.svg",
    },
  ];

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero">
        <SiteImage
          name="hero-wide"
          alt={c.manufacturing}
          className="hero-backdrop"
          priority
        />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="tiny-line" />
              {c.heroLabel}
            </span>
            <h1>{c.hero}</h1>
            <p>{c.heroBody}</p>
            <div className="actions">
              <a className="btn" href={rfq()}>
                {c.quote}
                <ArrowRight size={16} className="btn-arrow-icon" />
              </a>
              <a className="btn btn-outline" href={href("products")}>
                {c.explore}
              </a>
            </div>
            <div className="response">
              <CheckCircle2 size={16} />
              {c.response}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section 2: Certifications Row (Pixel-Perfect from Screenshot) */}
      <section className="certifications-showcase-bar">
        <div className="container">
          <div className="certifications-showcase-grid">
            {homeCertificates.map((cert) => (
              <button
                key={cert.id}
                className="cert-showcase-card"
                onClick={() => setDialog(`cert:${cert.name}`)}
                title={cert.name}
              >
                <div className="cert-showcase-img-box">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    loading="eager"
                    onError={(e) => {
                      // Fallback to crisp SVG if raster image fails
                      (e.currentTarget as HTMLImageElement).src = cert.svg;
                    }}
                  />
                </div>
                <div className="cert-showcase-text">
                  <span className="cert-showcase-subtitle">{cert.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section 3: Built for Reliable Global Supply */}
      <section className="section proof-section">
        <div className="container">
          <div className="reliable-supply-heading">
            <h2>{c.proof}</h2>
            <p>{c.proofBody}</p>
          </div>
          <div className="reliable-supply-grid">
            {[
              {
                icon: Leaf,
                val: "20+",
                label: lang === "ar" ? "سنوات خبرة" : "Years Experience",
              },
              {
                icon: Factory,
                val: "50,000 m²",
                label: lang === "ar" ? "مرافق الإنتاج" : "Production Facilities",
              },
              {
                icon: Warehouse,
                val: "50,000+ Tons",
                label: lang === "ar" ? "سعة التخزين" : "Storage Capacity",
              },
              {
                icon: Globe2,
                val: lang === "ar" ? "تصدير عالمي" : "Global Export",
                label: lang === "ar" ? "خدمة أكثر من 50 دولة ومنطقة" : "Serving 50+ countries and regions",
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="reliable-supply-item">
                  <div className="reliable-supply-icon">
                    <Icon size={24} />
                  </div>
                  <div className="reliable-supply-text">
                    <span className="reliable-supply-val">{stat.val}</span>
                    <span className="reliable-supply-label">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Section 4: Chestnut Products for Global Markets (No description, no button, card is button) */}
      <section className="section product-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{c.specialty}</span>
              <h2>{c.core}</h2>
            </div>
            <a className="text-link" href={href("products")}>
              {c.viewAll}
              <span className="line-mark" />
            </a>
          </div>

          <div className="homepage-products-clean-grid">
            {[0, 1, 2, 3].map((i) => {
              const isFirst = i === 0;
              return (
                <a
                  key={i}
                  href={href("products") + "#" + productIds[i]}
                  onClick={(e) => {
                    e.preventDefault();
                    setDialog("product:" + i);
                  }}
                  className={`home-clean-card ${isFirst ? "home-clean-card-primary" : ""}`}
                  aria-label={pn[i]}
                >
                  <div className="home-clean-card-image">
                    <SiteImage name={productImages[i]} alt={pn[i]} />
                  </div>
                  <div className="home-clean-card-body">
                    <h3>{pn[i]}</h3>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="other-strip">
            <span className="eyebrow">{c.other}</span>
            {[7, 8, 9].map((i) => (
              <a key={i} href={href("products") + "#" + productIds[i]}>
                <SiteImage name={productImages[i]} alt="" />
                <strong>{pn[i]}</strong>
              </a>
            ))}
          </div>

          <a
            className="frozen-link text-link"
            href={href("products") + "#" + productIds[4]}
          >
            {pn[4]}
          </a>
        </div>
      </section>

      {/* 5. Risk Reduction Section */}
      <section className="section risk-section">
        <div className="container risk-grid">
          <div className="risk-image">
            <SiteImage name="factory" alt={c.manufacturing} />
            <div className="image-note">
              <Factory size={22} />
              {c.integrated}
            </div>
          </div>
          <div>
            <span className="eyebrow">{c.manufacturing}</span>
            <h2>{c.risk}</h2>
            <p className="intro">{c.riskBody}</p>
            <div className="benefits">
              {[
                [c.source, c.sourceBody, Leaf],
                [c.integrated, c.integratedBody, Factory],
                [c.certified, c.certifiedBody, ShieldCheck],
                [c.flexible, c.flexibleBody, Package],
              ].map(([title, body, Icon], i) => {
                const I = Icon as typeof Leaf;
                return (
                  <div className="benefit" key={i}>
                    <I size={25} strokeWidth={1.4} />
                    <div>
                      <h3>{title as string}</h3>
                      <p>{body as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <a className="text-link" href={href("about") + "#manufacturing"}>
              {c.exploreFactory}
              <span className="line-mark" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. OEM Section - Modern Luxury Industrial Showcase */}
      <section className="section oem-section">
        <div className="container oem-grid">
          <div className="oem-content-col">
            <span className="eyebrow oem-badge-tag">
              {lang === "ar" ? "تصنيع للغير والعلامة الخاصة" : "OEM & PRIVATE LABEL"}
            </span>
            <h2 className="oem-title-display">
              {lang === "ar" ? "علامتك التجارية. خبرتنا التصنيعية." : c.oemTitle}
            </h2>
            <p className="oem-lead-desc">{c.oemBody}</p>
            <div className="capability-list">
              {[
                { title: lang === "ar" ? "وزن مخصص" : "Custom Weight" },
                { title: lang === "ar" ? "تعبئة مخصصة" : "Packaging" },
                { title: lang === "ar" ? "تصميم علامتك" : "Brand Artwork" },
                { title: lang === "ar" ? "لغات متعددة" : "Language" },
                { title: lang === "ar" ? "باركود مخصص" : "Barcode" },
                { title: lang === "ar" ? "كرتون الشحن" : "Carton" },
              ].map((item, i) => (
                <span key={i} className="capability-chip">
                  <CheckCircle2 size={16} />
                  {item.title}
                </span>
              ))}
            </div>
            <div className="oem-actions-row">
              <a className="btn oem-cta-btn" href={rfq("", "Private Label")}>
                {c.startOem}
                <ArrowRight size={16} className="btn-arrow-icon" />
              </a>
              <a className="btn btn-outline oem-learn-btn" href={href("oem")}>
                {lang === "ar" ? "عرض تفاصيل OEM" : "Explore OEM Process"}
              </a>
            </div>
            <small className="oem-footnote">{c.oemNote}</small>
          </div>
          <div className="oem-picture-card">
            <div className="oem-picture-inner">
              <SiteImage name="oem" alt={c.oem} />
            </div>
            <div className="oem-picture-floating-badge">
              <Package size={18} />
              <span>{lang === "ar" ? "تعبئة وتغليف احترافي للتجزئة" : "Retail & Bulk Custom Packing"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Inside Factory Video Section */}
      <section className="section film-section">
        <div className="container film-grid">
          <div className="film-copy">
            <span className="eyebrow film-eyebrow">
              {lang === "ar" ? "تصنيع متطور" : "ADVANCED MANUFACTURING"}
            </span>
            <h2>{c.inside}</h2>
            <p className="film-desc">{c.insideBody}</p>
            <div className="film-specs-list">
              <div className="film-spec-item">
                <CheckCircle2 size={18} />
                <span>{lang === "ar" ? "مرافق إنتاج حديثة بمساحة 50,000 م²" : "50,000 m² Advanced Production Facility"}</span>
              </div>
              <div className="film-spec-item">
                <CheckCircle2 size={18} />
                <span>{lang === "ar" ? "خطوط تعقيم عالي الضغط مؤتمتة بالكامل" : "Automated High-Pressure Retort Lines"}</span>
              </div>
              <div className="film-spec-item">
                <CheckCircle2 size={18} />
                <span>{lang === "ar" ? "فحص متكامل بالأشعة السينية وكواشف المعادن" : "Multi-Stage Optical Sorting & X-Ray Inspection"}</span>
              </div>
            </div>
            <div className="film-actions">
              <button className="btn film-tour-btn" onClick={() => setDialog("video")}>
                <Play size={16} fill="currentColor" />
                {lang === "ar" ? "شاهد جولة المصنع" : "Watch Factory Tour"}
              </button>
              <a className="btn btn-outline film-btn" href={href("about") + "#manufacturing"}>
                {c.exploreFactory}
                <ArrowRight size={16} className="btn-arrow-icon" />
              </a>
            </div>
          </div>
          <div className="film-poster-container">
            <button
              className="film-poster"
              onClick={() => setDialog("video")}
              aria-label={c.inside}
            >
              <SiteImage name="process" alt={c.manufacturing} />
              <div className="film-overlay" />
              <div className="play-pulse">
                <span className="play-pulse-ring" />
                <span className="play">
                  <Play fill="currentColor" size={24} />
                </span>
              </div>
              <div className="film-badge-tag">
                <span className="rec-dot" />
                <span>{lang === "ar" ? "جولة المصنع الافتراضية" : "Virtual Factory Tour"}</span>
              </div>
              <span className="film-title">{c.inside}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Quality Section - Real Certificate Logos and Verification Badges */}
      <section id="quality" className="section quality-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{c.qualityLabel}</span>
              <h2>{c.qualityTitle}</h2>
            </div>
            <a className="text-link" href={href("quality")}>
              {c.certificateLibrary}
              <ArrowRight size={16} className="btn-arrow-icon" />
            </a>
          </div>
          <div className="certificate-grid">
            {homeCertificates.map((x) => (
              <article className="certificate-card" key={x.name}>
                <div className="cert-card-logo-box">
                  <img
                    src={x.image}
                    alt={x.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = x.svg;
                    }}
                  />
                </div>
                <div className="cert-card-info">
                  <div className="cert-name">{x.name}</div>
                  <span className="eyebrow cert-card-sub">{x.subtitle}</span>
                </div>
                <dl>
                  <div>
                    <dt>{c.company}</dt>
                    <dd>{legalName}</dd>
                  </div>
                  <div>
                    <dt>{lang === "ar" ? "الحالة" : "Status"}</dt>
                    <dd className="cert-status-badge">
                      <CheckCircle2 size={13} />
                      {lang === "ar" ? "معتمد وموثق" : "Verified & Active"}
                    </dd>
                  </div>
                </dl>
                <button
                  className="cert-inspect-btn"
                  onClick={() => setDialog(`cert:${x.name}`)}
                >
                  {c.viewCert}
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </button>
              </article>
            ))}
          </div>
          <p className="disclaimer">{c.certNote}</p>
        </div>
      </section>

      {/* 9. B2B Buyers Section */}
      <section className="section buyer-section">
        <div className="container">
          <span className="eyebrow">B2B</span>
          <h2>{c.buyers}</h2>
          <div className="buyers-grid">
            {c.buyerNames.split("|").map((title, i) => {
              const I = [Globe2, Building2, Warehouse][i];
              return (
                <article key={title}>
                  <I size={30} strokeWidth={1.3} />
                  <h3>{title}</h3>
                  <p>{c.buyerBodies.split("|")[i]}</p>
                  <a
                    className="text-link"
                    href={rfq("", i === 1 ? "Private Label" : "Bulk Supply")}
                  >
                    {c.quote}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Insights Section */}
      <section className="section insights-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{c.insights}</span>
              <h2>{c.insightTitle}</h2>
            </div>
            <a className="text-link" href={href("insights")}>
              {c.insights}
            </a>
          </div>
          <div className="insights-grid">
            {c.articles.split("|").map((title, i) => (
              <a
                className="insight-card"
                key={title}
                href={href("insights") + "#" + articleIds[i]}
              >
                <div className="insight-image">
                  <SiteImage name={["rte", "harvest", "oem"][i]} alt={title} />
                </div>
                <div>
                  <span className="eyebrow">
                    0{i + 1} / {c.insights}
                  </span>
                  <h3>{title}</h3>
                  <span className="text-link">
                    {c.read}
                    <span className="line-mark" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Conversion Banner */}
      <section className="conversion">
        <div className="container conversion-inner">
          <div>
            <span className="eyebrow">GREAT WALL GREEN SOURCE</span>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <div className="banner-actions">
            <a className="btn" href={rfq()}>
              {c.quote}
            </a>
            <a href={href("contact")} className="text-link light">
              {c.contactSales}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
