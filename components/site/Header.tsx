import React, { useEffect, useState } from "react";
import { Search, Globe2, Menu, X } from "lucide-react";
import { languages, type Lang } from "../../content";
import type { SiteCopy } from "./types";
import { LanguageSelector } from "./LanguageSelector";

interface HeaderProps {
  lang: Lang;
  route: string;
  c: SiteCopy;
  href: (r?: string) => string;
  rfq: (product?: string, intent?: string, message?: string) => string;
  mobile: boolean;
  setMobile: (open: boolean) => void;
  setDialog: (dialog: string) => void;
}

export function Header({
  lang,
  route,
  c,
  href,
  rfq,
  mobile,
  setMobile,
  setDialog,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    ["", c.home],
    ["about", c.about],
    ["products", c.products],
    ["oem", c.oem],
    ["contact", lang === "en" ? "Contact us" : c.contact],
    ["insights", c.insights],
  ];

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href={href()} aria-label="Great Wall Green Source">
          <img src="/assets/logo.png" alt="Great Wall Green Source" />
        </a>

        <nav className="desktop-nav" aria-label={c.menu}>
          {navItems.map(([r, t]) => (
            <a
              aria-current={route === r ? "page" : undefined}
              key={r}
              href={href(r)}
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="header-tools">
          <button
            className="icon-btn desktop-search"
            onClick={() => setDialog("search")}
            aria-label={c.search}
          >
            <Search size={18} />
          </button>

          <LanguageSelector lang={lang} route={route} />

          <a className="btn header-cta" href={rfq()}>
            <span>{c.quote}</span>
          </a>

          <button
            className="icon-btn mobile-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label={c.menu}
            aria-expanded={mobile}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobile && (
        <nav className="mobile-nav" aria-label={c.menu}>
          {navItems.map(([r, t]) => (
            <a
              aria-current={route === r ? "page" : undefined}
              key={r}
              href={href(r)}
              onClick={() => setMobile(false)}
            >
              {t}
            </a>
          ))}
          <button
            className="mobile-search-btn"
            type="button"
            onClick={() => {
              setDialog("search");
              setMobile(false);
            }}
            aria-label={c.search}
          >
            <Search size={18} className="mobile-search-icon" />
            <span>{c.search}</span>
          </button>
          <a className="btn" href={rfq()}>
            <span>{c.quote}</span>
            <svg
              className="btn-arrow-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </nav>
      )}
    </header>
  );
}
