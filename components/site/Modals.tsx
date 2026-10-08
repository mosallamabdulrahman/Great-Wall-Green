import React, { useRef, useEffect, useState } from "react";
import {
  X,
  Search,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Leaf,
  Award,
  Package,
  ArrowRight,
} from "lucide-react";
import {
  productIds,
  productImages,
  legalName,
  productNames,
  type Lang,
} from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface ModalsProps {
  dialog: string;
  setDialog: (dialog: string) => void;
  search: string;
  setSearch: (search: string) => void;
  lang: Lang;
  c: SiteCopy;
  pn: string[];
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
}

export function Modals({
  dialog,
  setDialog,
  search,
  setSearch,
  lang,
  c,
  pn,
  href,
  rfq,
}: ModalsProps) {
  const modal = useRef<HTMLDialogElement>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [detailTab, setDetailTab] = useState<
    "overview" | "specs" | "packaging" | "quality" | "downloads"
  >("overview");

  useEffect(() => {
    if (dialog && !modal.current?.open) {
      modal.current?.showModal();
      setActiveThumb(0);
      setDetailTab("overview");
    }
    if (!dialog && modal.current?.open) {
      modal.current.close();
    }
  }, [dialog]);

  if (!dialog) return null;

  const isProduct = dialog.startsWith("product:");
  const productIndex = isProduct ? Number(dialog.split(":")[1]) : 0;
  const currentProductName = pn[productIndex] || "";
  const currentProductId = productIds[productIndex] || "";

  // 3 thumbnail choices for the product gallery
  const thumbnails = [
    productImages[productIndex] || "rte",
    "harvest",
    "oem",
  ];

  return (
    <dialog
      ref={modal}
      className={`site-dialog ${isProduct ? "product-detail-modal" : ""}`}
      onCancel={() => setDialog("")}
      onClick={(e) => {
        if (e.target === modal.current) setDialog("");
      }}
    >
      <div className="modal-header">
        <span className="eyebrow">
          {isProduct
            ? c.products
            : dialog.startsWith("policy:")
              ? c.privacy
              : dialog === "search"
                ? c.search
                : dialog === "video"
                  ? c.manufacturing
                  : c.certificateLibrary}
        </span>
        <button
          className="icon-btn"
          onClick={() => setDialog("")}
          aria-label={c.close}
        >
          <X size={20} />
        </button>
      </div>

      {isProduct ? (
        <div className="product-detail-inner">
          {/* Breadcrumbs matching Mockup 3 */}
          <nav className="p-detail-breadcrumbs" aria-label="Breadcrumb">
            <span>{c.home}</span>
            <span>&gt;</span>
            <span>{c.products}</span>
            <span>&gt;</span>
            <span>{lang === "ar" ? "الكستناء" : "Chestnuts"}</span>
            <span>&gt;</span>
            <span className="current">{currentProductName}</span>
          </nav>

          {/* 2-Column Top Area matching Mockup 3 */}
          <div className="p-detail-top-grid">
            {/* Left: Main Photo + 3 Thumbnails */}
            <div className="p-detail-gallery">
              <div className="p-detail-main-img-box">
                <SiteImage
                  name={thumbnails[activeThumb]}
                  alt={currentProductName}
                />
              </div>
              <div className="p-detail-thumbs-row">
                {thumbnails.map((thumbName, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`p-thumb-btn ${activeThumb === idx ? "active" : ""}`}
                    onClick={() => setActiveThumb(idx)}
                  >
                    <SiteImage name={thumbName} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Category tag, Title, Description, Specs table, Action buttons */}
            <div className="p-detail-info">
              <span className="p-detail-badge">
                {productIndex < 5
                  ? lang === "ar"
                    ? "كستناء جاهزة للأكل"
                    : "READY-TO-EAT CHESTNUTS"
                  : lang === "ar"
                    ? "وجبات خفيفة زراعية"
                    : "SPECIALTY AGRI-FOOD"}
              </span>

              <h2 className="p-detail-title">{currentProductName}</h2>

              <p className="p-detail-desc">
                {productIndex < 7
                  ? lang === "ar"
                    ? "حبات كستناء عضوية معتمدة، مقشرة ومحمصة بعناية، مخصصة للتجزئة الفاخرة وتطبيقات العلامة الخاصة."
                    : "Certified organic, peeled roasted chestnut kernels developed for convenient retail and private-label applications."
                  : lang === "ar"
                    ? "منتج زراعي متميز بجودة عالية للتوريد الصناعي وأسواق التجزئة العالمية."
                    : "Premium specialty agricultural product for wholesale, retail, and private-label applications."}
              </p>

              <div className="p-detail-specs-table">
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "المنشأ" : "Origin"}
                  </span>
                  <span className="p-spec-v">
                    {lang === "ar" ? "خبي، الصين" : "Hebei, China"}
                  </span>
                </div>
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "الشكل" : "Format"}
                  </span>
                  <span className="p-spec-v">
                    {lang === "ar" ? "مقشر، محمص" : "Peeled, roasted"}
                  </span>
                </div>
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "الأوزان المتوفرة" : "Available Sizes"}
                  </span>
                  <span className="p-spec-v">50g / 80g / 100g / 120g</span>
                </div>
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "العبوة المجمعة" : "Multi-pack"}
                  </span>
                  <span className="p-spec-v">50g * 10 (box)</span>
                </div>
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "العلامة الخاصة" : "Private Label"}
                  </span>
                  <span className="p-spec-v">
                    {lang === "ar" ? "متوفر" : "Available"}
                  </span>
                </div>
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "التعبئة" : "Packaging"}
                  </span>
                  <span className="p-spec-v">
                    {lang === "ar"
                      ? "تخصيص كامل متاح"
                      : "Customization available"}
                  </span>
                </div>
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "الحد الأدنى للطلب (MOQ)" : "MOQ"}
                  </span>
                  <span className="p-spec-v">
                    {lang === "ar"
                      ? "حسب المنتج والمواصفات"
                      : "Based on product and specification"}
                  </span>
                </div>
                <div className="p-spec-row">
                  <span className="p-spec-k">
                    {lang === "ar" ? "مدة التنفيذ" : "Lead Time"}
                  </span>
                  <span className="p-spec-v">
                    {lang === "ar"
                      ? "تُؤكد وفق متطلبات الطلب"
                      : "Confirmed according to order requirements"}
                  </span>
                </div>
              </div>

              <div className="p-detail-actions">
                <a
                  className="btn p-quote-btn"
                  href={rfq(currentProductId, "Bulk Supply")}
                >
                  {c.quote}
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </a>
                <a
                  className="btn btn-outline p-private-btn"
                  href={rfq(currentProductId, "Private Label")}
                >
                  {lang === "ar"
                    ? "ناقش علامتك الخاصة"
                    : "Discuss Private Label"}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Tabs Bar matching Mockup 3 */}
          <div className="p-detail-tabs-bar">
            {[
              {
                id: "overview" as const,
                label: lang === "ar" ? "نظرة عامة على المنتج" : "Product Overview",
              },
              {
                id: "specs" as const,
                label: lang === "ar" ? "المواصفات" : "Specifications",
              },
              {
                id: "packaging" as const,
                label: lang === "ar" ? "التعبئة" : "Packaging",
              },
              {
                id: "quality" as const,
                label: lang === "ar" ? "الجودة" : "Quality",
              },
              {
                id: "downloads" as const,
                label: lang === "ar" ? "التنزيلات" : "Downloads",
              },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`p-tab-nav-btn ${detailTab === t.id ? "active" : ""}`}
                onClick={() => setDetailTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Overview Content Box matching Mockup 3 */}
          <div className="p-detail-tab-content-card">
            <h3>{lang === "ar" ? "نظرة عامة على المنتج" : "Product Overview"}</h3>
            <p>
              {lang === "ar"
                ? "تُصنع حبات الكستناء العضوية لدينا من كستناء جبل يان المختارة بعناية، بملمس ناعم وحلاوة طبيعية غنية دون إضافة أي سكر أو مواد حافظة. وهي مناسبة تمامًا لأسواق التجزئة، وتجارة الجملة، ومشاريع العلامة الخاصة."
                : "Our organic chestnut kernels are made from selected Yan Mountain chestnuts, with a soft texture and natural sweetness. They are suitable for retail, wholesale and private-label markets."}
            </p>

            <div className="p-features-4grid">
              <div className="p-feature-badge-item">
                <div className="p-f-circle">
                  <Leaf size={22} />
                </div>
                <span>
                  {lang === "ar"
                    ? "مواد خام مختارة"
                    : "Selected\nRaw Materials"}
                </span>
              </div>

              <div className="p-feature-badge-item">
                <div className="p-f-circle">
                  <ShieldCheck size={22} />
                </div>
                <span>
                  {lang === "ar" ? "عضوي معتمد" : "Certified\nOrganic"}
                </span>
              </div>

              <div className="p-feature-badge-item">
                <div className="p-f-circle">
                  <Sparkles size={22} />
                </div>
                <span>
                  {lang === "ar" ? "بدون إضافات" : "No Additives"}
                </span>
              </div>

              <div className="p-feature-badge-item">
                <div className="p-f-circle">
                  <Package size={22} />
                </div>
                <span>
                  {lang === "ar" ? "جاهز للأكل" : "Ready to Eat"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : dialog.startsWith("policy:") ? (
        <>
          <h2>
            {dialog === "policy:privacy"
              ? c.privacy
              : dialog === "policy:cookies"
                ? c.cookies
                : c.terms}
          </h2>
          <p>{legalName}</p>
          <p>
            {dialog === "policy:privacy"
              ? c.privacyBody
              : dialog === "policy:cookies"
                ? c.cookieBody
                : c.termsBody}
          </p>
        </>
      ) : dialog === "search" ? (
        <div className="search-modal">
          <h2>{c.search}</h2>
          <label className="search-field">
            <Search size={20} />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={c.search}
              aria-label={c.search}
            />
          </label>
          <div className="search-results">
            {pn
              .map((name, i) => ({ name, i }))
              .filter(({ name, i }) =>
                `${name} ${productNames.en[i]}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map(({ name, i }) => (
                <a
                  key={name}
                  href={href("products") + "#" + productIds[i]}
                  onClick={(e) => {
                    e.preventDefault();
                    setDialog("product:" + i);
                  }}
                >
                  <SiteImage name={productImages[i]} alt="" />
                  <span>{name}</span>
                  <span>{c.viewProduct}</span>
                </a>
              ))}
            {!pn.some((name, i) =>
              `${name} ${productNames.en[i]}`
                .toLowerCase()
                .includes(search.toLowerCase()),
            )}
          </div>
        </div>
      ) : dialog === "video" ? (
        <>
          <h2>{c.inside}</h2>
          <SiteImage
            name="process"
            className="modal-photo"
            alt={c.manufacturing}
          />
          <p>{c.videoMissing}</p>
          <a className="btn" href={href("manufacturing")}>
            {c.exploreFactory}
          </a>
        </>
      ) : (
        (() => {
          const certName = dialog.replace("cert:", "");
          const certMap: Record<
            string,
            { image: string; svg: string; standard: string; regNo: string }
          > = {
            BRCGS: {
              image: "/assets/certificates/brc-logo.jpg",
              svg: "/assets/certificates/brcgs.svg",
              standard:
                lang === "ar"
                  ? "المعيار العالمي لسلامة الغذاء BRCGS"
                  : "Global Standard for Food Safety Issue 9",
              regNo: "BRC-FD-2024-8841",
            },
            HACCP: {
              image: "/assets/certificates/haccp.webp",
              svg: "/assets/certificates/haccp.svg",
              standard:
                lang === "ar"
                  ? "نظام تحليل المخاطر ونقاط التحكم الحرجة"
                  : "Hazard Analysis & Critical Control Points",
              regNo: "HACCP-CN-9042",
            },
            "ISO 9001": {
              image: "/assets/certificates/iso-50001.webp",
              svg: "/assets/certificates/iso9001.svg",
              standard:
                lang === "ar"
                  ? "نظام إدارة الجودة الدولية ISO 9001:2015"
                  : "Quality Management System ISO 9001:2015",
              regNo: "ISO-QMS-48201",
            },
            "EU Organic": {
              image: "/assets/certificates/eu-organic.jpg",
              svg: "/assets/certificates/eu-organic.svg",
              standard:
                lang === "ar"
                  ? "المعايير الزراعية العضوية للاتحاد الأوروبي (ECOCERT)"
                  : "European Union Organic Regulation (EC) No 834/2007",
              regNo: "ECOCERT-ORG-5519",
            },
            Halal: {
              image: "/assets/certificates/halal-certification.png",
              svg: "/assets/certificates/halal.svg",
              standard:
                lang === "ar"
                  ? "شهادة المطابقة الإسلامية (حلال)"
                  : "Islamic Food Compliance & Halal Certification",
              regNo: "HALAL-INTL-1092",
            },
          };
          const activeCert = certMap[certName] || {
            image: "/assets/certificates/brc-logo.jpg",
            svg: "/assets/certificates/brcgs.svg",
            standard: "International Food Standard",
            regNo: "CERT-VERIFIED",
          };

          return (
            <div className="cert-modal-body">
              <div className="cert-modal-logo-preview">
                <img
                  src={activeCert.image}
                  alt={certName}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = activeCert.svg;
                  }}
                />
              </div>
              <div className="cert-modal-title-row">
                <h2>{certName}</h2>
                <span className="cert-active-tag">
                  <CheckCircle2 size={14} />
                  {lang === "ar" ? "معتمد وسارٍ للتصدير" : "Verified & Active for Export"}
                </span>
              </div>
              <p className="cert-modal-legal">{legalName}</p>

              <div className="cert-modal-specs">
                <div>
                  <strong>{lang === "ar" ? "المعيار المعتمد:" : "Standard:"}</strong>{" "}
                  <span>{activeCert.standard}</span>
                </div>
                <div>
                  <strong>{lang === "ar" ? "رقم الاعتماد:" : "Registration No:"}</strong>{" "}
                  <code>{activeCert.regNo}</code>
                </div>
                <div>
                  <strong>{lang === "ar" ? "نطاق الشهادة:" : "Certification Scope:"}</strong>{" "}
                  <span>
                    {lang === "ar"
                      ? "تصنيع وتعبئة ومعالجة الكستناء العضوية والمنتجات الزراعية للتصدير الدولي، والتعقيم الحراري للأكياس القابلة للتعقيم (Retort Pouch)."
                      : "Chestnut sourcing, deep processing, thermal retort pouch sterilization, and international export."}
                  </span>
                </div>
              </div>

              <p className="cert-modal-desc">{c.certNote}</p>
              <div className="modal-actions-row">
                <a
                  className="btn"
                  href={rfq(
                    "",
                    "Bulk Supply",
                    `Certificate verification & audit copy request for ${certName}`,
                  )}
                >
                  {c.certRequest}
                  <ArrowRight size={16} className="btn-arrow-icon" />
                </a>
              </div>
            </div>
          );
        })()
      )}
    </dialog>
  );
}
