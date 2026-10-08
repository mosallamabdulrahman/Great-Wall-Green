import React from "react";
import { ArrowRight } from "lucide-react";
import { type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface InsightsViewProps {
  c: SiteCopy;
  lang?: Lang;
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
}

export function InsightsView({
  c,
  lang = "en",
  href,
  rfq,
}: InsightsViewProps) {
  const articleIds = [
    "choose-chestnut-manufacturer",
    "chestnut-harvest-season",
    "private-label-procurement",
  ];

  const articles = [
    {
      id: "choose-chestnut-manufacturer",
      title:
        lang === "ar"
          ? "كيف تختار مصنع كستناء موثوقًا؟"
          : "How to Choose a Reliable Chestnut Manufacturer",
      desc:
        lang === "ar"
          ? "معايير أساسية لتقييم قدرات الموردين، ومطابقة الشهادات، وضمان استمرارية الجودة."
          : "Key factors for evaluating suppliers: equipment, certificates, and quality stability.",
      image: "rte",
    },
    {
      id: "chestnut-harvest-season",
      title:
        lang === "ar"
          ? "موسم حصاد الكستناء في الصين: ما يجب أن يعرفه المستورد"
          : "China Chestnut Harvest Season: What Importers Should Know",
      desc:
        lang === "ar"
          ? "توقيت الحصاد، ونصائح التوريد، والتخطيط المبكر لحجز حصص التصدير."
          : "Harvest time, sourcing tips, and early procurement planning.",
      image: "harvest",
    },
    {
      id: "private-label-procurement",
      title:
        lang === "ar"
          ? "كستناء بعلامتك الخاصة: دليل التعبئة والشراء"
          : "Private Label Chestnuts: A Buyer's Guide",
      desc:
        lang === "ar"
          ? "خيارات التعبئة، والاشتراطات التنظيمية للملصقات، وأفضل ممارسات الشراء للشركات."
          : "Packaging options, labeling compliance, and procurement tips.",
      image: "oem",
    },
  ];

  return (
    <div className="insights-page-wrapper">
      {/* 1. Hero matching Mockup 8 (design screens/insights.jpeg) */}
      <section className="insights-hero-custom">
        <SiteImage
          name="harvest"
          alt="Insights for Chestnut Buyers"
          className="insights-hero-backdrop"
          priority
        />
        <div className="insights-hero-overlay" />
        <div className="container">
          <div className="insights-hero-content">
            <h1>{c.insightTitle}</h1>
            <p>
              {lang === "ar"
                ? "أدلة عملية ورؤى سوقية لمشتري الكستناء الدوليين."
                : "Practical guides and market insights for international buyers."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Breadcrumbs Bar */}
      <div className="insights-breadcrumbs-bar">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href={href()}>{c.home}</a>
            <span className="separator">&gt;</span>
            <span className="current">{c.insights}</span>
          </nav>
        </div>
      </div>

      {/* 3. Three Article Cards matching Mockup 8 */}
      <section className="section insights-cards-section">
        <div className="container">
          <div className="insights-3col-grid">
            {articles.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="insight-card-custom"
              >
                <div className="insight-card-img-box">
                  <SiteImage name={item.image} alt={item.title} />
                </div>
                <div className="insight-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="insight-read-more-link">
                    {lang === "ar" ? "اقرأ المزيد" : "Read More"}
                    <ArrowRight size={15} className="btn-arrow-icon" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Full In-depth Guides */}
          <div className="inline-guides">
            {articles.map((item, i) => (
              <article id={item.id} key={item.id} className="guide-full-article">
                <span className="eyebrow">
                  0{i + 1} / {c.insights}
                </span>
                <h2>{item.title}</h2>
                <p className="intro">
                  {i === 1
                    ? c.harvestIntro
                    : i === 2
                      ? c.packIntro
                      : c.guideIntro}
                </p>
                {c.guideSections.split("|").map((heading, j) => (
                  <section key={heading}>
                    <h3>{heading}</h3>
                    <p>{c.guideBodies.split("|")[j]}</p>
                  </section>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Conversion Banner */}
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
