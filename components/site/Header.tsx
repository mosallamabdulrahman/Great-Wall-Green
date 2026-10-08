import React from "react";
import { Search, Globe2, Menu, X, ArrowRight } from "lucide-react";
import { languages, type Lang } from "../../content";
import type { SiteCopy } from "./types";

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
  const navItems = [
    ["products", c.products],
    ["oem", c.oem],
    ["manufacturing", c.manufacturing],
    ["quality", c.quality],
    ["about", c.about],
    ["insights", c.insights],
    ["contact", lang === "en" ? "Contact us" : c.contact],
  ];

  return (
    <header className="header">
      <div className="preview-strip">
        <span>{c.preview}</span>
        <span>{c.previewBody}</span>
      </div>
      <div className="container header-inner">
        <a className="brand" href={href()} aria-label="Great Wall Green Source">
          <img
            src="/assets/logo.png"
            alt="Great Wall Green Source"
          />
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

          <div className="language">
            <Globe2 size={17} />
            <select
              value={lang}
              onChange={(e) =>
                window.location.assign(
                  `/${e.target.value}/${route}${window.location.search}`,
                )
              }
              aria-label={c.custom.split("|")[3]}
            >
              {Object.entries(languages).map(([v, l]) => (
                <option value={v} key={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <a className="btn header-cta" href={rfq()}>
            {c.quote}
            <ArrowRight size={15} className="btn-arrow-icon" />
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
            onClick={() => {
              setDialog("search");
              setMobile(false);
            }}
          >
            {c.search}
          </button>
          <a className="btn" href={rfq()}>
            {c.quote}
            <ArrowRight size={15} className="btn-arrow-icon" />
          </a>
        </nav>
      )}
    </header>
  );
}
