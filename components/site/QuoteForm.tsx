import React, { useState, useRef } from "react";
import {
  Check,
  CheckCircle2,
  Warehouse,
  Package,
  Factory,
  Globe2,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { productIds, productImages, type Lang } from "../../content";
import { SiteImage } from "./Image";
import type { SiteCopy } from "./types";

interface QuoteFormProps {
  c: SiteCopy;
  lang: Lang;
  pn: string[];
  href: (r?: string) => string;
}

export function QuoteForm({ c, lang, pn, href }: QuoteFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => {
    const initial = {
      intent: "",
      product: "",
      quantity: "",
      packaging: "",
      market: "",
      message: "",
      name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      website: "",
    };
    if (typeof window === "undefined") return initial;
    const q = new URLSearchParams(window.location.search);
    return {
      ...initial,
      product: productIds.includes(q.get("product") || "")
        ? q.get("product") || ""
        : "",
      intent: [
        "Bulk Supply",
        "Private Label",
        "OEM Manufacturing",
        "Distribution Partnership",
        "Other",
      ].includes(q.get("intent") || "")
        ? q.get("intent") || ""
        : "",
      message: q.get("message") || "",
      market: q.get("country") || "",
      country: q.get("country") || "",
    };
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const update = (key: string, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const field = (
    key: keyof typeof data,
    label: string,
    required = false,
    textarea = false,
    type = "text",
  ) => (
    <label className={`field ${textarea ? "full-width" : ""}`} key={key}>
      <span>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      {textarea ? (
        <textarea
          value={data[key]}
          onChange={(e) => update(key, e.target.value)}
          maxLength={4000}
          rows={4}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={data[key]}
          onChange={(e) => update(key, e.target.value)}
          maxLength={300}
          autoComplete={
            key === "name"
              ? "name"
              : key === "email"
                ? "email"
                : key === "phone"
                  ? "tel"
                  : key === "company"
                    ? "organization"
                    : key === "country"
                      ? "country-name"
                      : "off"
          }
        />
      )}
    </label>
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if ((step === 0 && !data.intent) || (step === 1 && !data.product)) {
      setError(c.required);
      return;
    }
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language: lang, consent }),
      });
      const r = (await res.json()) as { ok?: boolean; reference?: string };
      if (!res.ok || !r.ok) throw new Error();
      setReference(r.reference || "");
    } catch {
      setError(c.saveError);
    } finally {
      setLoading(false);
    }
  }

  if (reference)
    return (
      <section className="rfq-section">
        <div className="container">
          <div className="success-panel">
            <CheckCircle2 size={60} strokeWidth={1.2} />
            <h1>{c.success}</h1>
            <p>{c.response}</p>
            <p className="reference">
              {c.reference}: {reference}
            </p>
            <button
              className="btn"
              onClick={() => {
                setReference("");
                setStep(0);
                setData({
                  intent: "",
                  product: "",
                  quantity: "",
                  packaging: "",
                  market: "",
                  message: "",
                  name: "",
                  company: "",
                  country: "",
                  email: "",
                  phone: "",
                  website: "",
                });
                setConsent(false);
              }}
            >
              {c.again}
            </button>
            <a className="text-link" href={href("products")}>
              {c.explore}
            </a>
          </div>
        </div>
      </section>
    );

  const intents = [
    "Bulk Supply",
    "Private Label",
    "OEM Manufacturing",
    "Distribution Partnership",
    "Other",
  ];

  return (
    <section className="rfq-section">
      <div className="container rfq-layout">
        <aside className="rfq-intro">
          <span className="eyebrow">{c.quote}</span>
          <h1>{c.rfqTitle}</h1>
          <p>{c.rfqIntro}</p>
          <div className="response">
            <CheckCircle2 size={17} />
            {c.response}
          </div>
          <SiteImage name="kernels" alt={pn[1]} />
          <div className="rfq-note">
            <ShieldCheck size={20} />
            <p>{c.oemNote}</p>
          </div>
        </aside>
        <div className="rfq-card">
          <ol className="stepper">
            {c.steps.split("|").map((s, i) => (
              <li
                key={s}
                className={`${step === i ? "current" : ""} ${step > i ? "done" : ""}`}
                aria-current={step === i ? "step" : undefined}
              >
                <span>{step > i ? <Check size={16} /> : i + 1}</span>
                <small>{s}</small>
              </li>
            ))}
          </ol>
          <form ref={form} onSubmit={submit}>
            <div className="step-heading">
              <span className="eyebrow">0{step + 1} / 04</span>
              <h2>
                {
                  [
                    c.intentQuestion,
                    c.productQuestion,
                    c.requirementsTitle,
                    c.detailsTitle,
                  ][step]
                }
              </h2>
            </div>
            {step === 0 && (
              <fieldset className="option-grid">
                <legend className="sr-only">{c.intentQuestion}</legend>
                {c.intents.split("|").map((s, i) => {
                  const I = [
                    Warehouse,
                    Package,
                    Factory,
                    Globe2,
                    ClipboardList,
                  ][i];
                  const isOther = i === 4;
                  return (
                    <label
                      className={`choice ${data.intent === intents[i] ? "selected" : ""} ${isOther ? "choice-other" : ""}`}
                      key={s}
                    >
                      <input
                        type="radio"
                        name="intent"
                        required
                        value={intents[i]}
                        checked={data.intent === intents[i]}
                        onChange={(e) => update("intent", e.target.value)}
                      />
                      <I size={26} strokeWidth={1.2} />
                      <strong>{s}</strong>
                      <span className="choice-check">
                        <Check size={14} />
                      </span>
                    </label>
                  );
                })}
              </fieldset>
            )}
            {step === 1 && (
              <fieldset className="product-options">
                <legend className="sr-only">{c.productQuestion}</legend>
                {productIds.map((id, i) => (
                  <label
                    className={`product-choice ${data.product === id ? "selected" : ""}`}
                    key={id}
                  >
                    <input
                      type="radio"
                      name="product"
                      required
                      value={id}
                      checked={data.product === id}
                      onChange={(e) => update("product", e.target.value)}
                    />
                    <SiteImage name={productImages[i]} alt="" />
                    <span>{pn[i]}</span>
                    {data.product === id && <Check size={17} />}
                  </label>
                ))}
              </fieldset>
            )}
            {step === 2 && (
              <div className="form-grid">
                {field("quantity", c.quantity, true)}
                {field("packaging", c.packReq)}
                {field("market", c.market, true)}
                {field("message", c.message, false, true)}
              </div>
            )}
            {step === 3 && (
              <>
                <div className="brief-summary">
                  <span className="eyebrow">{c.review}</span>
                  <p>
                    {c.intents.split("|")[intents.indexOf(data.intent)]} ·{" "}
                    {pn[productIds.indexOf(data.product)]}
                  </p>
                  <small>
                    {data.quantity} · {data.market}
                  </small>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setStep(2)}
                  >
                    {c.back}
                  </button>
                </div>
                <div className="form-grid">
                  {field("name", c.name, true)}
                  {field("company", c.company, true)}
                  {field("country", c.country, true)}
                  {field("email", c.email, true, false, "email")}
                  {field("phone", c.phone, false, false, "tel")}
                </div>
                <details id="privacy" className="contact-privacy">
                  <summary>{c.privacy}</summary>
                  <p>{c.privacyBody}</p>
                </details>
                <label className="consent">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    {c.consent} <a href="#privacy">{c.privacy}</a>
                  </span>
                </label>
              </>
            )}
            <div className="honeypot" aria-hidden="true">
              <label>
                Website
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </label>
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="form-actions">
              {step > 0 ? (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setStep((s) => s - 1);
                    setError("");
                  }}
                  disabled={loading}
                >
                  {c.back}
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className="btn rfq-next-btn" disabled={loading}>
                {loading ? (
                  c.submitting
                ) : step === 3 ? (
                  c.submit
                ) : (
                  <>
                    {lang === "ar" ? "الخطوة التالية" : "Next Step"}
                    <ArrowRight size={16} className="btn-arrow-icon" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
