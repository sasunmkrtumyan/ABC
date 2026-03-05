'use client';

import { Mail, MapPin, Phone, Tag } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../../lib/i18n/LanguageContext';
import { pickTextByLanguage } from '../../../lib/localize';
import { fetchPartnerBySlug } from '../../../lib/supabase/partners';
import { fetchTags } from '../../../lib/supabase/tags';

export default function PartnerDetailsPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const [partner, setPartner] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    if (!slug) return;
    Promise.all([fetchPartnerBySlug(slug), fetchTags()])
      .then(([partnerData, tagsData]) => {
        setPartner(partnerData);
        setAvailableTags((tagsData || []).map((t) => t.name));
      })
      .catch(() => {
        setPartner(null);
        setAvailableTags([]);
      });
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
        <div className="gap-6 md:flex-row md:items-center flex flex-col">
          {partner.logoUrl ? (
            <Image
              src={partner.logoUrl}
              alt={pickTextByLanguage(partner.name, language) || 'logo'}
              width={300}
              height={150}
              className="rounded-xl object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-xl bg-slate-100" />
          )}

          <div>
            <h1 className="text-4xl font-black text-brand.dark">{pickTextByLanguage(partner.name, language)}</h1>
            <div className="mt-3 text-slate-600">
              {(() => {
                const validTags = (partner.tags || []).filter((tag) => availableTags.includes(tag));
                return validTags.length > 0 ? (
                  <div className="gap-2 flex flex-wrap items-center">
                    {validTags.map((tag) => (
                      <span key={tag} className="gap-1 text-sm bg-gray-100 px-2 py-1 rounded-md flex items-center">
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  '-'
                );
              })()}
            </div>
            <p className="mt-2 text-slate-600">
              <Mail className="size-4 mr-2 inline" /> {partner.email}
            </p>
            {partner.location ? (
              <p className="mt-1 text-slate-600">
                <MapPin className="size-4 mr-2 inline" /> {partner.location}
              </p>
            ) : null}
            {(partner.phones || []).map((phone) => (
              <p key={phone} className="mt-1 text-slate-600">
                <Phone className="size-4 mr-2 inline" /> {phone}
              </p>
            ))}
          </div>
        </div>

        <p className="mt-8 text-slate-700 whitespace-pre-line">{pickTextByLanguage(partner.description, language)}</p>
      </div>
    </main>
  );
}
