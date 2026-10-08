import React from "react";

export function SiteImage({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const src = name.startsWith("/")
    ? name
    : name.includes(".")
      ? `/assets/${name}`
      : `/assets/${name}.webp`;

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
