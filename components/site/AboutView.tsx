import React, { useState } from "react";
import {
  Leaf,
  Factory,
  Globe2,
  Package,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface AboutViewProps {
  lang: Lang;
  c: SiteCopy;
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
}

export function AboutView({
  lang,
  c,
  href,
  rfq,
}: AboutViewProps) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "history" | "advantages" | "honors"
  >("profile");

  const tabs = [
    {
      id: "profile" as const,
      label: lang === "ar" ? "ملف الشركة" : "Company Profile",
    },
    {
      id: "history" as const,
      label: lang === "ar" ? "تاريخ التطوير" : "Development History",
    },
    {
      id: "advantages" as const,
      label: lang === "ar" ? "مميزاتنا" : "Our Advantages",
    },
    {
      id: "honors" as const,
      label: lang === "ar" ? "شهاداتنا وأوسمتنا" : "Our Honors",
    },
  ];

  return (
    <div className="about-page-wrapper">
      {/* 1. Page Hero Banner - Exact visual match */}
      <section className="about-hero">
        <SiteImage
          name="mountains"
          alt="About Great Wall Luyuan"
          className="about-hero-backdrop"
          priority
        />
        <div className="about-hero-overlay" />
        <div className="container">
          <div className="about-hero-content">
            <h1>{lang === "ar" ? "عن Great Wall Luyuan" : "About Great Wall Luyuan"}</h1>
            <p>
              {lang === "ar"
                ? "تركيز على الكستناء. التزام بالأسواق العالمية."
                : "Focused on chestnuts. Committed to global markets."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Horizontal Navigation Tabs Bar */}
      <div className="about-tabs-bar">
        <div className="container">
          <div className="about-tabs-list">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`about-tab-btn ${activeTab === t.id ? "active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Tab Content Section */}
      <section className="section about-content-section">
        <div className="container">
          {activeTab === "profile" && (
            <div className="about-profile-grid">
              <div className="about-profile-text">
                <h2>
                  {lang === "ar"
                    ? "تأسست شركة Hebei Changcheng Luyuan Food Co., Ltd. في عام 2001 وتقع في منطقة الإنتاج الأساسية لكستناء يانشان، خبي، الصين."
                    : "Hebei Changcheng Luyuan Food Co., Ltd. was established in 2001 and is located in the core production area of Yanshan chestnuts, Hebei, China."}
                </h2>
                <p>
                  {lang === "ar"
                    ? "تتخصص الشركة في زراعة الكستناء وتوريدها ومعالجتها وتخزينها والتصنيع العميق للكستناء والمنتجات الزراعية. من خلال مرافق الإنتاج الحديثة وسعة التخزين الكبيرة وخطوط الإنتاج الآلية، نقدم جودة موثوقة وإنتاجًا مرنًا وحلول سلسلة توريد متكاملة لشركائنا حول العالم."
                    : "The company specializes in the cultivation, sourcing, processing, storage, and deep processing of chestnuts and agricultural products. With modern production facilities, large storage capacity, and automated production lines, we provide reliable quality, flexible production, and integrated supply chain solutions."}
                </p>
                <div className="about-profile-actions">
                  <a className="btn" href={rfq("", "Bulk Supply")}>
                    {c.quote}
                    <ArrowRight size={16} className="btn-arrow-icon" />
                  </a>
                  <a className="btn btn-outline" href={href("products")}>
                    {c.explore}
                  </a>
                </div>
              </div>
              <div className="about-profile-photo-wrapper">
                <SiteImage
                  name="factory"
                  alt="Hebei Changcheng Luyuan Food Co., Ltd. Factory"
                  className="about-factory-photo"
                />
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="about-history-timeline">
              <div className="history-step">
                <div className="history-step-badge">
                  <Calendar size={20} />
                  <span>2001</span>
                </div>
                <div>
                  <h3>{lang === "ar" ? "التأسيس في يانشان" : "Foundation in Yanshan"}</h3>
                  <p>
                    {lang === "ar"
                      ? "تأسيس الشركة في قلب منطقة زراعة كستناء يانشان التاريخية في مقاطعة خبي بالصين."
                      : "Establishment in the heart of China's premier Yanshan chestnut origin in Hebei Province."}
                  </p>
                </div>
              </div>
              <div className="history-step">
                <div className="history-step-badge">
                  <Calendar size={20} />
                  <span>2008</span>
                </div>
                <div>
                  <h3>{lang === "ar" ? "بدء التصدير الدولي" : "International Export Launch"}</h3>
                  <p>
                    {lang === "ar"
                      ? "تحديث خطوط الإنتاج الآلية وبدء التصدير المباشر لأسواق آسيا وأوروبا."
                      : "Upgrading automated processing equipment and entering Asian and European export markets."}
                  </p>
                </div>
              </div>
              <div className="history-step">
                <div className="history-step-badge">
                  <Calendar size={20} />
                  <span>2015</span>
                </div>
                <div>
                  <h3>{lang === "ar" ? "توسيع مرافق التخزين والإنتاج" : "Facilities & Storage Expansion"}</h3>
                  <p>
                    {lang === "ar"
                      ? "توسيع مساحة المصنع إلى 50,000 متر مربع وسعة تخزين تتجاوز 50,000 طن."
                      : "Expanding to 50,000 m² modern production facility with cold storage exceeding 50,000 tons."}
                  </p>
                </div>
              </div>
              <div className="history-step">
                <div className="history-step-badge">
                  <Calendar size={20} />
                  <span>2021+</span>
                </div>
                <div>
                  <h3>{lang === "ar" ? "الاعتماد العالمي الشامل" : "Global Standards & Private Label"}</h3>
                  <p>
                    {lang === "ar"
                      ? "الحصول على شهادات BRCGS وHACCP وISO 9001 وOrganic وHalal والتوسع في تصنيع العلامات الخاصة لأكثر من 50 دولة."
                      : "Achieving international food safety certifications (BRCGS, HACCP, ISO 9001, EU Organic, Halal) supplying 50+ countries."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "advantages" && (
            <div className="about-advantages-grid">
              <div className="advantage-card">
                <CheckCircle2 size={32} />
                <h3>{lang === "ar" ? "ميزة المنشأ في يانشان" : "Yanshan Origin Advantage"}</h3>
                <p>
                  {lang === "ar"
                    ? "كستناء يانشان تشتهر بنكهتها الحلوة الطبيعية وملمسها الناعم، ننتقيها مباشرة من المصدر."
                    : "Yanshan mountain chestnuts are globally renowned for their natural sweetness and delicate texture."}
                </p>
              </div>
              <div className="advantage-card">
                <Factory size={32} />
                <h3>{lang === "ar" ? "سلسلة تبريد وتخزين متكاملة" : "Cold Chain & Capacity"}</h3>
                <p>
                  {lang === "ar"
                    ? "سعة تخزين ضخمة تتجاوز 50,000 طن تضمن إمدادًا مستقرًا وموثوقًا على مدار العام."
                    : "Over 50,000 tons of cold storage guarantee consistent, year-round international supply."}
                </p>
              </div>
              <div className="advantage-card">
                <Award size={32} />
                <h3>{lang === "ar" ? "شهادات جودة عالمية" : "Global Certified Quality"}</h3>
                <p>
                  {lang === "ar"
                    ? "امتثال كامل لمعايير BRCGS وHACCP وISO 9001 والمواصفات العضوية والحلال."
                    : "Strict compliance with BRCGS, HACCP, ISO 9001, Organic and Halal standards."}
                </p>
              </div>
              <div className="advantage-card">
                <Package size={32} />
                <h3>{lang === "ar" ? "حلول تصنيع OEM مرنة" : "Custom OEM & Private Label"}</h3>
                <p>
                  {lang === "ar"
                    ? "تصنيع العبوات والأوزان والتصاميم المخصصة لتناسب متطلبات علامتك التجارية وسوقك."
                    : "Full packaging, weight, formulation and artwork customization for your retail brand."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "honors" && (
            <div className="about-honors-grid">
              <div className="honor-card">
                <Award size={36} />
                <h3>{lang === "ar" ? "مؤسسة تصنيع زراعي رائدة" : "Agricultural Key Enterprise"}</h3>
                <p>
                  {lang === "ar"
                    ? "معتمدة كمؤسسة صناعية رئيسية للتصنيع الزراعي في مقاطعة خبي."
                    : "Recognized as a leading enterprise in agricultural processing and export industrialization."}
                </p>
              </div>
              <div className="honor-card">
                <CheckCircle2 size={36} />
                <h3>{lang === "ar" ? "قاعدة زراعة عضوية معتمدة" : "Eco & Organic Certified Base"}</h3>
                <p>
                  {lang === "ar"
                    ? "مزارع زراعة كستناء بيئية عضوية خاضعة للمراقبة المستمرة."
                    : "Certified organic cultivation and environmental sustainable farming orchards."}
                </p>
              </div>
              <div className="honor-card">
                <Globe2 size={36} />
                <h3>{lang === "ar" ? "مورد تصدير موثوق دولياً" : "Trusted International Exporter"}</h3>
                <p>
                  {lang === "ar"
                    ? "سجل امتياز مثبت في توريد العلامات الغذائية وتجار التجزئة في أكثر من 50 دولة."
                    : "Proven export record supplying leading supermarket brands and distributors globally."}
                </p>
              </div>

              <div className="about-certs-honors-block">
                <h4 className="about-certs-subhead">
                  {lang === "ar"
                    ? "شهادات الجودة والامتثال الدولية المعتمدة"
                    : "International Quality & Compliance Certifications"}
                </h4>
                <div className="about-certs-5strip">
                  {[
                    {
                      name: "BRCGS",
                      img: "/assets/certificates/brc-logo.jpg",
                      svg: "/assets/certificates/brcgs.svg",
                      sub: lang === "ar" ? "سلامة الغذاء" : "Food Safety",
                    },
                    {
                      name: "HACCP",
                      img: "/assets/certificates/haccp.webp",
                      svg: "/assets/certificates/haccp.svg",
                      sub: lang === "ar" ? "إدارة سلامة الغذاء" : "Food Safety Management",
                    },
                    {
                      name: "ISO 9001",
                      img: "/assets/certificates/iso-50001.webp",
                      svg: "/assets/certificates/iso9001.svg",
                      sub: lang === "ar" ? "إدارة الجودة" : "Quality Management",
                    },
                    {
                      name: "EU Organic",
                      img: "/assets/certificates/eu-organic.jpg",
                      svg: "/assets/certificates/eu-organic.svg",
                      sub: lang === "ar" ? "عضوي ECOCERT" : "EU Organic ECOCERT",
                    },
                    {
                      name: "Halal",
                      img: "/assets/certificates/halal-certification.png",
                      svg: "/assets/certificates/halal.svg",
                      sub: lang === "ar" ? "شهادة حلال" : "Halal Certified",
                    },
                  ].map((cert) => (
                    <a
                      key={cert.name}
                      href={href("quality")}
                      className="about-cert-mini-card"
                      title={cert.name}
                    >
                      <div className="about-cert-mini-img">
                        <img
                          src={cert.img}
                          alt={cert.name}
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = cert.svg;
                          }}
                        />
                      </div>
                      <span>{cert.sub}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom 4 Feature Badges Strip - Exact match to Image 2 */}
      <section className="about-stats-showcase-bar">
        <div className="container">
          <div className="about-stats-showcase-grid">
            <div className="about-stat-item">
              <div className="about-stat-icon-circle">
                <Leaf size={28} />
              </div>
              <span className="about-stat-title">
                {lang === "ar" ? "20+ عاماً\nمن الخبرة" : "20+ Years\nof Experience"}
              </span>
            </div>

            <div className="about-stat-item">
              <div className="about-stat-icon-circle">
                <Factory size={28} />
              </div>
              <span className="about-stat-title">
                {lang === "ar" ? "سلسلة إمداد\nمتكاملة" : "Integrated\nSupply Chain"}
              </span>
            </div>

            <div className="about-stat-item">
              <div className="about-stat-icon-circle">
                <Globe2 size={28} />
              </div>
              <span className="about-stat-title">
                {lang === "ar" ? "تصدير إلى\nأكثر من 50 دولة" : "Exporting to\n50+ Countries"}
              </span>
            </div>

            <div className="about-stat-item">
              <div className="about-stat-icon-circle">
                <Package size={28} />
              </div>
              <span className="about-stat-title">
                {lang === "ar"
                  ? "تصنيع للغير\nوعلامة خاصة"
                  : "OEM & Private Label\nManufacturing"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="conversion">
        <div className="container conversion-inner">
          <div>
            <span className="eyebrow">GREAT WALL GREEN SOURCE</span>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <div className="banner-actions">
            <a className="btn" href={rfq("", "Private Label")}>
              {c.quote}
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
