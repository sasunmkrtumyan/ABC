import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./client";

export async function uploadPartnerLogo(file, slug) {
  const path = `partners/${slug}-${Date.now()}-${file.name}`;
  const logoRef = ref(storage, path);
  await uploadBytes(logoRef, file);
  return getDownloadURL(logoRef);
}
