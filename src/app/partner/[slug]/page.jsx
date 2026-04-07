"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Link2, Mail, MapPin, Phone } from "lucide-react";
import { fetchPartnerBySlug } from "../../../lib/supabase/partners";
import { prepareHtmlForRender } from "../../../lib/html";
import { useLanguage } from "../../../lib/i18n/LanguageContext";
import { pickTextByLanguage } from "../../../lib/localize";

function isAvifImage(url = "") {
  return /\.avif(\?|#|$)/i.test(String(url || ""));
}

function normalizeWebsiteLink(value = "") {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(text)) return text;
  return `https://${text}`;
}

export default function PartnerDetailsPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetchPartnerBySlug(slug).then(setPartner).catch(() => setPartner(null));
  }, [slug]);

  if (!partner) {
    return (
      <main className="container-abc py-12">
        <p className="text-slate-500">{t.common.noData}</p>
      </main>
    );
  }

  const descriptionHtml = prepareHtmlForRender(pickTextByLanguage(partner.description, language));
  const locationText = String(partner.location || "").trim();
  const locationHref = locationText
    ? /^https?:\/\//i.test(locationText)
      ? locationText
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : "";

  return (
    <main className="container-abc py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {partner.logoUrl ? (
            <Image
              src={partner.logoUrl}
              alt={pickTextByLanguage(partner.name, language) || "logo"}
              width={110}
              height={110}
              className="rounded-xl object-cover"
              unoptimized={isAvifImage(partner.logoUrl)}
            />
          ) : (
            <div className="h-24 w-24 rounded-xl bg-slate-100" />
          )}

          <div>
            <h1 className="text-4xl font-black text-brand.dark">{pickTextByLanguage(partner.name, language)}</h1>
            <p className="mt-3 text-slate-600">{(partner.tags || []).join(", ")}</p>
            {partner.email ? (
              <p className="mt-2 flex items-center gap-2 text-slate-600">
                <Mail size={16} className="shrink-0" />
                <a href={`mailto:${partner.email}`} className="underline hover:text-blue-600">
                  {partner.email}
                </a>
              </p>
            ) : null}
            {locationText ? (
              <p className="mt-1 flex items-center gap-2 text-slate-600">
                <MapPin size={16} className="shrink-0" />
                <a href={locationHref} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                  {locationText}
                </a>
              </p>
            ) : null}
            {(partner.phones || []).map((phone) => (
              <p key={phone} className="mt-1 flex items-center gap-2 text-slate-600">
                <Phone size={16} className="shrink-0" />
                {phone}
              </p>
            ))}
            {(partner.links || []).map((linkValue) => {
              const href = normalizeWebsiteLink(linkValue);
              if (!href) return null;
              return (
                <p key={href} className="mt-1 flex items-center gap-2 text-slate-600">
                  <Link2 size={16} className="shrink-0" />
                  <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">
                    {linkValue}
                  </a>
                </p>
              );
            })}
          </div>
        </div>

        <div className="rich-text-content mt-8 text-slate-700" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
    </main>
  );
}
