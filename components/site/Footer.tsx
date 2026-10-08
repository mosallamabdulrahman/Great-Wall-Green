import React from "react";
import { productIds, legalName, type Lang } from "../../content";
import type { SiteCopy } from "./types";

interface FooterProps {
  lang: Lang;
  route: string;
  c: SiteCopy;
  pn: string[];
  href: (r?: string) => string;
  rfq: () => string;
  setDialog: (dialog: string) => void;
}

export function Footer({
  c,
  pn,
  href,
  rfq,
  setDialog,
}: FooterProps) {
  const navItems = [
    ["", c.home],
    ["about", c.about],
    ["products", c.products],
    ["oem", c.oem],
    ["contact", c.contact],
    ["insights", c.insights],
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/assets/logo.png" alt="Great Wall Green Source" />
            <h3>Great Wall Green Source</h3>
            <p>{c.footerBody}</p>
            <span>{legalName}</span>
          </div>

          <div>
            <span className="eyebrow">{c.products}</span>
            {[0, 1, 4, 6].map((i) => (
              <a key={i} href={href("products") + "#" + productIds[i]}>
                {pn[i]}
              </a>
            ))}
          </div>

          <div>
            <span className="eyebrow">{c.company}</span>
            {navItems.map(([r, t]) => (
              <a key={r} href={href(r)}>
                {t}
              </a>
            ))}
          </div>

          <div>
            <span className="eyebrow">{c.contact}</span>
            <p>{c.response}</p>
            <a className="btn" href={rfq()}>
              {c.quote}
            </a>
            <a href={href("contact")}>{c.contactSales}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {legalName}
          </span>
          <div>
            {[
              ["privacy", c.privacy],
              ["cookies", c.cookies],
              ["terms", c.terms],
            ].map(([r, t]) => (
              <button
                className="text-link footer-policy"
                key={r}
                onClick={() => setDialog("policy:" + r)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="footer-preview">
          {c.visualNote} {c.previewBody}
        </p>
      </div>
    </footer>
  );
}
