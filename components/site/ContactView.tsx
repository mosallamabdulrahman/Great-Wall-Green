import React from "react";
import { Mail, MapPin, Phone, Building2 } from "lucide-react";
import { legalName, type Lang } from "../../content";
import { SiteImage } from "./Image";
import { QuoteForm } from "./QuoteForm";
import type { SiteCopy } from "./types";

interface ContactViewProps {
  lang: Lang;
  c: SiteCopy;
  pn: string[];
  href: (r?: string) => string;
}

export function ContactView({
  lang,
  c,
  pn,
  href,
}: ContactViewProps) {
  return (
    <div className="contact-page-wrapper">
      {/* 1. Request a Quote Hero matching Mockup 9 (design screens/requaste.jpeg) */}
      <section className="quote-hero-custom">
        <SiteImage
          name="harvest"
          alt="Request a Quote"
          className="quote-hero-backdrop"
          priority
        />
        <div className="quote-hero-overlay" />
        <div className="container quote-hero-content">
          <h1>{lang === "ar" ? "طلب عرض سعر" : "Request a Quote"}</h1>
          <p>
            {lang === "ar"
              ? "أخبرنا بمتطلباتك. سيرد فريق التصدير لدينا خلال 24 ساعة."
              : "Tell us your requirements. Our export team will respond within 24 hours."}
          </p>
        </div>
      </section>

      {/* 2. Form Section */}
      <div id="request" className="quote-form-container">
        <QuoteForm c={c} lang={lang} pn={pn} href={href} />
      </div>

      {/* 3. Export Office & Facility Info */}
      <section className="section contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <span className="eyebrow">HEADQUARTERS & FACTORY</span>
              <h3>{legalName}</h3>
              <p>
                <MapPin size={18} />
                {lang === "ar"
                  ? "منطقة يانشان، مقاطعة خبي، الصين"
                  : "Yanshan Core Chestnut Region, Hebei, China"}
              </p>
              <p>
                <Mail size={18} />
                export@greatwall-greensource.com
              </p>
            </div>
            <div className="contact-info-card">
              <span className="eyebrow">EXPORT INQUIRIES</span>
              <h3>
                {lang === "ar"
                  ? "فريق التجارة الدولية"
                  : "International Trade Team"}
              </h3>
              <p>{c.response}</p>
              <p>
                <Building2 size={18} />
                {lang === "ar"
                  ? "خدمة الشحن إلى موانئ تيانجين، تشينغداو، وكافة الوجهات العالمية"
                  : "FOB / CIF shipments via Tianjin Port, Qingdao, and global routes."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
