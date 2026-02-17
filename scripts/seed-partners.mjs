import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { config } from "dotenv";

config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  throw new Error("Missing Firebase env variables. Set them in .env.local first.");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  for (const item of mockPartners) {
    await addDoc(collection(db, "partners"), {
      ...item,
      slug: slugify(item.name.en),
      logoUrl: "",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }
  console.log(`Seeded ${mockPartners.length} mock partners`);
};

seed();
