import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing Supabase env variables. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY in .env.local."
  );
}

// Service role bypasses RLS; keep this key server-only.
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const slugify = (input) =>
  String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const mockPartners = [
  "Grand Candy",
  "Ararat Agro",
  "Noyan Logistics",
  "Anahit Textile",
  "Van IT Solutions",
  "Yerevan Trade Hub",
  "Hayk Construction",
  "Sevan Foods",
  "Sasun Motors",
  "Arpi Energy",
  "Masis Pharma",
  "Dilijan Hospitality",
  "Ani Export Group",
  "Lori Fresh",
  "Tigran Finance",
  "Norik Digital",
  "Kilikia Beverages",
  "Arax Packaging",
  "Vardan Consulting",
  "Syunik Mining Service",
].map((name, index) => ({
  name: {
    am: name,
    ru: name,
    en: name,
  },
  description: {
    am: `${name}-ը հայկական ընկերություն է, որը ակտիվորեն համագործակցում է ABC ցանցում։`,
    ru: `${name} - армянская компания, активно развивающая сотрудничество в сети ABC.`,
    en: `${name} is an Armenian company actively building partnerships in the ABC network.`,
  },
  email: `contact${index + 1}@abcpartners.am`,
  location: "Yerevan, Armenia",
  phones: [`+374 91 1000${String(index).padStart(2, "0")}`],
  tags: [
    ["food", "export"],
    ["agriculture", "production"],
    ["logistics", "transport"],
    ["textile", "retail"],
    ["technology", "services"],
  ][index % 5],
}));

const seed = async () => {
  const rows = mockPartners.map((item) => ({
    slug: slugify(item.name.en),
    name: item.name,
    description: item.description,
    email: item.email,
    location: item.location,
    phones: item.phones,
    tags: item.tags,
    logo_url: "",
  }));

  const { error } = await supabase.from("partners").insert(rows);
  if (error) throw error;

  console.log(`Seeded ${rows.length} mock partners (Supabase)`);
};

seed();
