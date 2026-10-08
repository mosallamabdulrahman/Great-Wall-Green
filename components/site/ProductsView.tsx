import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface ProductsViewProps {
  lang: Lang;
  c: SiteCopy;
  href: (r?: string) => string;
  setDialog: (dialog: string) => void;
  rfq: (product?: string, intent?: string, message?: string) => string;
}

export function ProductsView({
  lang,
  c,
  href,
  setDialog,
  rfq,
}: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // The 9 products shown in mockup Image 3:
  const productsList = [
    {
      id: "ready-to-eat-chestnuts",
      name: lang === "ar" ? "كستناء جاهزة للأكل" : "Ready-to-Eat Chestnuts",
      image: "rte",
      category: "chestnuts",
      modalIndex: 0,
    },
    {
      id: "organic-chestnut-kernels",
      name: lang === "ar" ? "حبات كستناء عضوية" : "Organic Chestnut Kernels",
      image: "kernels",
      category: "chestnuts",
      modalIndex: 1,
    },
    {
      id: "sweetened-chestnuts",
      name: lang === "ar" ? "كستناء مُحلّاة" : "Sweetened Chestnuts",
      image: "sweetened",
      category: "chestnuts",
      modalIndex: 2,
    },
    {
      id: "honey-chestnuts",
      name: lang === "ar" ? "كستناء بالعسل" : "Honey Chestnuts",
      image: "honey",
      category: "chestnuts",
      modalIndex: 3,
    },
    {
      id: "frozen-chestnuts",
      name: lang === "ar" ? "كستناء مجمدة" : "Frozen Chestnuts",
      image: "frozen",
      category: "chestnuts",
      modalIndex: 4,
    },
    {
      id: "dried-sweet-potato",
      name: lang === "ar" ? "بطاطا حلوة مجففة" : "Dried Sweet Potato",
      image: "sweet-potato",
      category: "other",
      modalIndex: 7,
    },
    {
      id: "roasted-chickpeas",
      name: lang === "ar" ? "حمص محمص" : "Roasted Chickpeas",
      image: "chickpeas",
      category: "other",
      modalIndex: 8,
    },
    {
      id: "hollow-hawthorn",
      name: lang === "ar" ? "زعرور مفرغ" : "Hollow Hawthorn",
      image: "hawthorn",
      category: "other",
      modalIndex: 9,
    },
    {
      id: "sweet-potato-chunks",
      name: lang === "ar" ? "قطع البطاطا الحلوة" : "Sweet Potato Chunks",
      image: "sweet-potato",
      category: "other",
      modalIndex: 7,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? productsList
      : productsList.filter(
          (p) =>
            p.category === selectedCategory ||
            p.id === selectedCategory,
        );

  const getHeadingText = () => {
    if (selectedCategory === "all")
      return lang === "ar" ? "جميع المنتجات" : "All Products";
    if (selectedCategory === "chestnuts")
      return lang === "ar" ? "الكستناء" : "Chestnuts";
    if (selectedCategory === "other")
      return lang === "ar" ? "منتجات خفيفة أخرى" : "Other Snack Products";
    const found = productsList.find((p) => p.id === selectedCategory);
    return found ? found.name : lang === "ar" ? "جميع المنتجات" : "All Products";
  };

  return (
    <div className="products-page-container">
      {/* 1. Page Hero Banner - Mountains Landscape matching About design */}
      <section className="products-hero">
        <SiteImage
          name="mountains"
          alt="Our Products"
          className="products-hero-backdrop"
          priority
        />
        <div className="products-hero-overlay" />
        <div className="container">
          <div className="products-hero-content">
            <h1>{lang === "ar" ? "منتجاتنا" : "Our Products"}</h1>
            <p>
              {lang === "ar"
                ? "مجموعة متكاملة من منتجات الكستناء والوجبات الخفيفة للأسواق العالمية."
                : "A complete range of chestnut and snack products for global markets."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Breadcrumbs Bar */}
      <div className="products-breadcrumbs-bar">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href={href()}>{c.home}</a>
            <span className="separator">&gt;</span>
            <span className="current">{c.products}</span>
          </nav>
        </div>
      </div>

      {/* 3. Main 2-Column Layout */}
      <section className="section products-layout-section">
        <div className="container products-layout-grid">
          {/* Left Sidebar: Product Categories */}
          <aside className="products-sidebar">
            <div className="sidebar-card">
              <h2 className="sidebar-title">
                {lang === "ar" ? "فئات المنتجات" : "Product Categories"}
              </h2>

              <button
                className={`category-pill-btn ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                {lang === "ar" ? "جميع المنتجات" : "All Products"}
              </button>

              <div className="category-group">
                <button
                  className="category-group-header"
                  onClick={() => setSelectedCategory("chestnuts")}
                >
                  {lang === "ar" ? "الكستناء" : "Chestnuts"}
                </button>
                <div className="category-group-links">
                  {[
                    {
                      id: "ready-to-eat-chestnuts",
                      label:
                        lang === "ar"
                          ? "كستناء جاهزة للأكل"
                          : "Ready-to-Eat Chestnuts",
                    },
                    {
                      id: "organic-chestnut-kernels",
                      label:
                        lang === "ar"
                          ? "كستناء عضوية"
                          : "Organic Chestnuts",
                    },
                    {
                      id: "sweetened-chestnuts",
                      label:
                        lang === "ar"
                          ? "كستناء مُحلّاة"
                          : "Sweetened Chestnuts",
                    },
                    {
                      id: "honey-chestnuts",
                      label:
                        lang === "ar" ? "كستناء بالعسل" : "Honey Chestnuts",
                    },
                    {
                      id: "frozen-chestnuts",
                      label:
                        lang === "ar" ? "كستناء مجمدة" : "Frozen Chestnuts",
                    },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      className={`category-sublink ${selectedCategory === sub.id ? "active" : ""}`}
                      onClick={() => setSelectedCategory(sub.id)}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="category-group">
                <button
                  className="category-group-header"
                  onClick={() => setSelectedCategory("other")}
                >
                  {lang === "ar"
                    ? "منتجات خفيفة أخرى"
                    : "Other Snack Products"}
                </button>
                <div className="category-group-links">
                  {[
                    {
                      id: "dried-sweet-potato",
                      label:
                        lang === "ar" ? "بطاطا حلوة" : "Sweet Potato",
                    },
                    {
                      id: "roasted-chickpeas",
                      label:
                        lang === "ar" ? "حمص محمص" : "Roasted Chickpeas",
                    },
                    {
                      id: "hollow-hawthorn",
                      label: lang === "ar" ? "زعرور" : "Hawthorn",
                    },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      className={`category-sublink ${selectedCategory === sub.id ? "active" : ""}`}
                      onClick={() => setSelectedCategory(sub.id)}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Grid */}
          <main className="products-main-content">
            <div className="products-header-row">
              <h2>{getHeadingText()}</h2>
              {selectedCategory !== "all" && (
                <button
                  className="btn btn-outline reset-filter-btn"
                  onClick={() => setSelectedCategory("all")}
                >
                  {lang === "ar" ? "إظهار الكل" : "Show All"}
                </button>
              )}
            </div>

            <div className="products-3col-grid">
              {filteredProducts.map((p, index) => (
                <div
                  key={`${p.id}-${index}`}
                  className="product-grid-card"
                  onClick={() => setDialog("product:" + p.modalIndex)}
                >
                  <div className="product-grid-card-image">
                    <SiteImage name={p.image} alt={p.name} />
                  </div>
                  <div className="product-grid-card-body">
                    <h3>{p.name}</h3>
                    <button
                      type="button"
                      className="product-view-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDialog("product:" + p.modalIndex);
                      }}
                    >
                      {c.viewProduct}
                      <ArrowRight size={15} className="btn-arrow-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
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
