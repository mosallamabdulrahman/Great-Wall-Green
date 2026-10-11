import React from "react";
import { Mail, MapPin, Building2, ExternalLink, Navigation } from "lucide-react";
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
  const mapLink = "https://maps.apple/p/xyJwMKkSbyyWAb";
  const googleSearchMap = "https://www.google.com/maps/search/?api=1&query=40.300914,117.943471";

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
        <div className="container">
          <div className="quote-hero-content">
            <h1>{lang === "ar" ? "طلب عرض سعر" : "Request a Quote"}</h1>
            <p>
              {lang === "ar"
                ? "أخبرنا بمتطلباتك. سيرد فريق التصدير لدينا خلال 24 ساعة."
                : "Tell us your requirements. Our export team will respond within 24 hours."}
            </p>
          </div>
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
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map-text-link"
                  title={lang === "ar" ? "عرض اللوكيشن في الخرائط" : "View location in Maps"}
                >
                  <span>
                    {lang === "ar"
                      ? "منطقة يانشان، مقاطعة خبي، الصين"
                      : "Yanshan Core Chestnut Region, Hebei, China"}
                  </span>
                  <ExternalLink size={13} />
                </a>
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

      {/* 4. Interactive Google Map Section */}
      <section className="section contact-map-section">
        <div className="container">
          <div className="contact-map-header">
            <span className="eyebrow">
              {lang === "ar" ? "الموقع الجغرافي والمصنع" : "FACTORY LOCATION & LOGISTICS"}
            </span>
            <h2>
              {lang === "ar"
                ? "مقر الشركة ومرافق التصنيع في خبي"
                : "Headquarters & Manufacturing Base"}
            </h2>
            <p>
              {lang === "ar"
                ? "تقع منشآتنا في قلب موطن كستناء يانشان بمقاطعة خبي، مع ربط لوجستي مباشر بميناء تيانجين والأسواق الدولية."
                : "Situated in the core Yanshan chestnut origin in Hebei, China, with direct highway transport to Tianjin Port and global export hubs."}
            </p>
          </div>

          <div className="contact-map-container">
            <div className="contact-map-frame-box">
              <iframe
                title={lang === "ar" ? "خريطة موقع مصنع Great Wall Green Source" : "Great Wall Green Source Facility Map"}
                src={`https://maps.google.com/maps?q=40.300914,117.943471&hl=${lang === "ar" ? "ar" : lang === "zh" ? "zh-CN" : "en"}&z=14&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="contact-map-info-panel">
              <div className="map-badge-tag">
                <MapPin size={15} />
                <span>{lang === "ar" ? "موقع المصنع المعتمد" : "Verified Factory Location"}</span>
              </div>
              <h3 className="map-company-name">{legalName}</h3>
              <p className="map-address-text">
                {lang === "ar"
                  ? "منطقة يانشان لزراعة الكستناء، مقاطعة خبي، الصين"
                  : "Yanshan Core Chestnut Growing Region, Hebei Province, China"}
              </p>
              <div className="map-meta-specs">
                <div className="map-meta-row">
                  <span className="meta-label">{lang === "ar" ? "الإحداثيات:" : "Coordinates:"}</span>
                  <span className="meta-val">40.300914° N, 117.943471° E</span>
                </div>
                <div className="map-meta-row">
                  <span className="meta-label">{lang === "ar" ? "الميناء الرئيسي:" : "Main Port:"}</span>
                  <span className="meta-val">{lang === "ar" ? "ميناء تيانجين الدولي" : "Tianjin Port (FOB / CIF)"}</span>
                </div>
              </div>
              <div className="map-actions-group">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-map-navigate"
                  title="Open location in Maps"
                >
                  <Navigation size={16} />
                  <span>{lang === "ar" ? "فتح اللوكيشن في الخرائط" : "Open in Maps"}</span>
                  <ExternalLink size={14} className="map-ext-icon" />
                </a>
                <a
                  href={googleSearchMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-map-google"
                  title="Open location in Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
