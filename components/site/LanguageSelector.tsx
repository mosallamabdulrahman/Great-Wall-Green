import React, { useState, useRef, useEffect } from "react";
import { Globe2, ChevronDown, Check } from "lucide-react";
import { languages, type Lang } from "../../content";

interface LanguageSelectorProps {
  lang: Lang;
  route: string;
}

export function LanguageSelector({ lang, route }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newLang: string) => {
    setOpen(false);
    window.location.assign(`/${newLang}/${route}${window.location.search}`);
  };

  return (
    <div className="custom-lang-selector" ref={containerRef}>
      <button
        type="button"
        className={`custom-lang-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select Language"
      >
        <Globe2 size={16} className="lang-globe-icon" />
        <span className="lang-current-label">{languages[lang]}</span>
        <ChevronDown
          size={14}
          className={`lang-chevron-icon ${open ? "rotate" : ""}`}
        />
      </button>

      {open && (
        <div className="custom-lang-menu" role="listbox">
          {Object.entries(languages).map(([code, name]) => {
            const isSelected = code === lang;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`custom-lang-option ${isSelected ? "active" : ""}`}
                onClick={() => handleSelect(code)}
              >
                <span>{name}</span>
                {isSelected && (
                  <Check size={14} className="lang-check-icon" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
