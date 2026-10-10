"use client";
import { useEffect, useState } from "react";
import { getCopy, productNames, type Lang } from "../content";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { HomeView } from "../components/site/HomeView";
import { AboutView } from "../components/site/AboutView";
import { ProductsView } from "../components/site/ProductsView";
import { ProductDetailView } from "../components/site/ProductDetailView";
import { OemView } from "../components/site/OemView";
import { ManufacturingView } from "../components/site/ManufacturingView";
import { QualityView } from "../components/site/QualityView";
import { InsightsView } from "../components/site/InsightsView";
import { ContactView } from "../components/site/ContactView";
import { Modals } from "../components/site/Modals";

export default function Site({ lang, path }: { lang: Lang; path: string[] }) {
  const c = getCopy(lang);
  const pn = productNames[lang];
  const base = `/${lang}`;
  const route = path.join("/");

  const [mobile, setMobile] = useState(false);
  const [dialog, setDialog] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const href = (r = "") => `${base}/${r}`;
  const rfq = (product = "", intent = "", message = "") =>
    href("contact") +
    `?product=${encodeURIComponent(product)}&intent=${encodeURIComponent(intent)}&message=${encodeURIComponent(message)}#request`;

  let mainContent;
  if (!route) {
    mainContent = (
      <HomeView
        lang={lang}
        c={c}
        pn={pn}
        href={href}
        rfq={rfq}
        setDialog={setDialog}
      />
    );
  } else if (route === "about") {
    mainContent = (
      <AboutView
        lang={lang}
        c={c}
        href={href}
        rfq={rfq}
      />
    );
  } else if (route === "products") {
    mainContent = (
      <ProductsView
        lang={lang}
        c={c}
        href={href}
        setDialog={setDialog}
        rfq={rfq}
      />
    );
  } else if (path[0] === "products" && path[1]) {
    mainContent = (
      <ProductDetailView
        lang={lang}
        c={c}
        productId={path[1]}
        href={href}
        rfq={rfq}
      />
    );
  } else if (route === "oem") {
    mainContent = (
      <OemView
        c={c}
        lang={lang}
        href={href}
        rfq={rfq}
      />
    );
  } else if (route === "manufacturing") {
    mainContent = (
      <ManufacturingView
        lang={lang}
        c={c}
        href={href}
        rfq={rfq}
        setDialog={setDialog}
      />
    );
  } else if (route === "quality") {
    mainContent = (
      <QualityView
        lang={lang}
        c={c}
        href={href}
        rfq={rfq}
        setDialog={setDialog}
      />
    );
  } else if (route === "insights") {
    mainContent = (
      <InsightsView
        c={c}
        href={href}
        rfq={rfq}
      />
    );
  } else if (route === "contact") {
    mainContent = (
      <ContactView
        lang={lang}
        c={c}
        pn={pn}
        href={href}
      />
    );
  } else {
    mainContent = (
      <div className="container section">
        <h1>404</h1>
        <p>{c.noResults}</p>
        <a href={href()} className="btn">
          {c.home}
        </a>
      </div>
    );
  }

  return (
    <div className="site" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Header
        lang={lang}
        route={route}
        c={c}
        href={href}
        rfq={rfq}
        mobile={mobile}
        setMobile={setMobile}
        setDialog={setDialog}
      />

      <main id="main">{mainContent}</main>

      <Footer
        lang={lang}
        route={route}
        c={c}
        pn={pn}
        href={href}
        rfq={rfq}
        setDialog={setDialog}
      />

      <a href="#main" className="skip-link">
        {c.overview}
      </a>
      <a className="mobile-rfq btn" href={rfq()}>
        {c.quote}
      </a>

      <Modals
        dialog={dialog}
        setDialog={setDialog}
        search={search}
        setSearch={setSearch}
        lang={lang}
        c={c}
        pn={pn}
        href={href}
        rfq={rfq}
      />
    </div>
  );
}
