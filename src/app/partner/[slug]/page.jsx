"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPartnerBySlug } from "../../../lib/supabase/partners";
import { useLanguage } from "../../../lib/i18n/LanguageContext";
import { pickTextByLanguage } from "../../../lib/localize";

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

  return (
    <main className="container-abc py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {partner.logoUrl ? (
            <Image
              src={partner.logoUrl}
              alt={pickTextByLanguage(partner.name, language) || "logo"}
              width={300}
              height={150}
              className="rounded-xl object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-xl bg-slate-100" />
          )}

          <div>
            <h1 className="text-4xl font-black text-brand.dark">{pickTextByLanguage(partner.name, language)}</h1>
            <p className="mt-3 text-slate-600">{(partner.tags || []).join(", ")}</p>
            <p className="mt-2 text-slate-600">{partner.email}</p>
            {partner.location ? <p className="mt-1 text-slate-600">{partner.location}</p> : null}
            {(partner.phones || []).map((phone) => (
              <p key={phone} className="mt-1 text-slate-600">
                {phone}
              </p>
            ))}
          </div>
        </div>

        <p className="mt-8 whitespace-pre-line text-slate-700">
          {pickTextByLanguage(partner.description, language)}
        </p>
      </div>
    </main>
  );
}
