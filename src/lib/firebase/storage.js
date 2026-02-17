import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app, firebaseConfig, storage } from "./client";

function getFallbackStorageInstance() {
  const configuredBucket = firebaseConfig.storageBucket || "";
  const projectId = firebaseConfig.projectId || "";

  if (!configuredBucket.endsWith(".firebasestorage.app") || !projectId) {
    return null;
  }

  return getStorage(app, `gs://${projectId}.appspot.com`);
}

export async function uploadPartnerLogo(file, slug) {
  const path = `partners/${slug}-${Date.now()}-${file.name}`;
  const logoRef = ref(storage, path);

  try {
    await uploadBytes(logoRef, file);
    return getDownloadURL(logoRef);
  } catch (error) {
    const fallbackStorage = getFallbackStorageInstance();
    if (!fallbackStorage) throw error;

    const fallbackRef = ref(fallbackStorage, path);
    await uploadBytes(fallbackRef, file);
    return getDownloadURL(fallbackRef);
  }
}
