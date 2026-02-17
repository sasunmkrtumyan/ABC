"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { subscribePartners } from "../../lib/firebase/partners";
import { subscribeTags } from "../../lib/firebase/tags";
import { useLanguage } from "../../lib/i18n/LanguageContext";
import { pickTextByLanguage } from "../../lib/localize";
import { readLocalPartners, readLocalTags } from "../../lib/localDb";

const PAGE_SIZE = 8;

export default function PartnersPage() {
  const { t, language } = useLanguage();
  const [partners, setPartners] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const unsubPartners = subscribePartners(
      (data) => setPartners(data),
      (error) => {
        setLoadError(`Firebase unavailable (${error?.code || "unknown"}), using local data`);
        setPartners(readLocalPartners());
      }
    );
    const unsubTags = subscribeTags(
      (tags) => setAvailableTags(tags.map((tag) => tag.name)),
      (error) => {
        setLoadError(`Firebase unavailable (${error?.code || "unknown"}), using local tags`);
        setAvailableTags(readLocalTags().map((tag) => tag.name));
      }
    );

    return () => {
      unsubPartners();
      unsubTags();
    };
  }, []);

  const categories = useMemo(() => {
    if (availableTags.length) return availableTags;
    const unique = new Set();
    partners.forEach((item) => (item.tags || []).forEach((tag) => unique.add(tag)));
    return Array.from(unique);
  }, [partners, availableTags]);

  const filtered = useMemo(() => {
    return partners.filter((item) => {
      const localizedName = pickTextByLanguage(item.name, language);
      const byName = localizedName.toLowerCase().includes(query.toLowerCase());
      const byCategory = category === "all" ? true : (item.tags || []).includes(category);
      return byName && byCategory;
    });
  }, [partners, query, category, language]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query, category]);

  return (
    <main className="container-abc py-12">
      <h1 className="text-4xl font-black text-brand.dark">{t.partners.title}</h1>
      {loadError ? <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{loadError}</p> : null}

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.partners.search}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="all">{t.partners.allCategories}</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-slate-500">{t.partners.table.name}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-slate-500">{t.partners.table.categories}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-slate-500">{t.partners.table.email}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                      {item.logoUrl ? (
                        <Image
                          src={item.logoUrl}
                          alt={pickTextByLanguage(item.name, language) || "logo"}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <Link href={`/partner/${item.slug}`} className="font-semibold text-blue-500 hover:underline">
                      {pickTextByLanguage(item.name, language)}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{(item.tags || []).join(", ")}</td>
                <td className="px-4 py-3 text-slate-600">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-40"
        >
          Prev
        </button>
        <p className="text-sm text-slate-600">{`${t.common.page} ${page} ${t.common.of} ${totalPages}`}</p>
        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page >= totalPages}
          className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
