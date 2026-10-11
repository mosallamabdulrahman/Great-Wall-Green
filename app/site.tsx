"use client";
import { useEffect, useState } from "react";
import { ArrowUp, MessageSquare, Send, Package, Factory, ShieldCheck, X } from "lucide-react";
import { getCopy, productNames, productIds, type Lang } from "../content";
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [chat, setChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatCountry, setChatCountry] = useState("");
  const [chatProduct, setChatProduct] = useState("");
  const [chatRequirement, setChatRequirement] = useState("");
  const [messages, setMessages] = useState<{ text: string; user?: boolean }[]>([]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setMobile(false);
      }
    };
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const href = (r = "") => `${base}/${r}`;
  const rfq = (product = "", intent = "", message = "") =>
    href("contact") +
    `?product=${encodeURIComponent(product)}&intent=${encodeURIComponent(intent)}&message=${encodeURIComponent(message)}&country=${encodeURIComponent(chatCountry)}#request`;

  function chatAction(action: string) {
    let text = c.confirmTeam;
    if (action === "product") text = c.chatProduct;
    if (action === "oem") text = c.chatOem;
    if (action === "cert") text = c.chatCert;
    setMessages((m) => [...m, { text }]);
  }

  function sendChat(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    let matched = pn.findIndex((n) =>
      n.toLowerCase().includes(text.toLowerCase())
    );
    if (matched < 0)
      matched = productNames.en.findIndex((n) =>
        text.toLowerCase().includes(n.toLowerCase())
      );
    if (matched >= 0) setChatProduct(productIds[matched]);
    setChatRequirement((v) => [v, text].filter(Boolean).join("\n"));
    setMessages((m) => [
      ...m,
      { text, user: true },
      { text: c.confirmTeam + " " + c.chatBrief },
    ]);
    setChatInput("");
  }

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
    mainContent = <AboutView lang={lang} c={c} href={href} rfq={rfq} />;
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
    mainContent = <OemView c={c} lang={lang} href={href} rfq={rfq} />;
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
    mainContent = <InsightsView c={c} href={href} rfq={rfq} />;
  } else if (route === "contact") {
    mainContent = <ContactView lang={lang} c={c} pn={pn} href={href} />;
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

      <button
        type="button"
        className={`scroll-to-top-btn ${showScrollTop ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label={lang === "ar" ? "الصعود للأعلى" : "Scroll to top"}
      >
        <ArrowUp size={20} />
      </button>

      <button
        className={`chat-toggle ${chat ? "is-open" : ""}`}
        onClick={() => setChat(!chat)}
        aria-label={c.assistant}
        aria-expanded={chat}
      >
        {chat ? <X size={22} /> : <MessageSquare size={24} />}
      </button>

      {chat && (
        <aside className="chat-panel" aria-label={c.assistant}>
          <div className="chat-header">
            <div>
              <strong>Great Wall Green Source</strong>
              <small>{c.assistant}</small>
            </div>
            <button
              className="icon-btn"
              onClick={() => setChat(false)}
              aria-label={c.close}
            >
              <X size={18} />
            </button>
          </div>
          <div className="chat-content">
            <p className="chat-bubble">{c.assistantHello}</p>
            <div className="chat-actions">
              <button onClick={() => chatAction("product")}>
                <Package size={16} />
                {c.findProduct}
              </button>
              <button onClick={() => chatAction("oem")}>
                <Factory size={16} />
                {c.oem}
              </button>
              <button onClick={() => chatAction("cert")}>
                <ShieldCheck size={16} />
                {c.certificateLibrary}
              </button>
            </div>
            <div className="chat-messages" aria-live="polite">
              {messages.map((m, i) => (
                <p className={`chat-bubble ${m.user ? "user" : ""}`} key={i}>
                  {m.text}
                </p>
              ))}
            </div>
            <label>
              {c.products}
              <select
                value={chatProduct}
                onChange={(e) => setChatProduct(e.target.value)}
              >
                <option value="">{c.productQuestion}</option>
                {productIds.map((id, i) => (
                  <option key={id} value={id}>
                    {pn[i]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {c.chatCountry}
              <input
                value={chatCountry}
                onChange={(e) => setChatCountry(e.target.value)}
              />
            </label>
            <a className="btn" href={rfq(chatProduct, "", chatRequirement)}>
              {c.quote}
            </a>
            <small>{c.savedBrief}</small>
          </div>
          <form className="chat-compose" onSubmit={sendChat}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={c.chatPlaceholder}
              aria-label={c.message}
            />
            <button className="icon-btn" aria-label={c.send}>
              <Send size={18} />
            </button>
          </form>
        </aside>
      )}

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
