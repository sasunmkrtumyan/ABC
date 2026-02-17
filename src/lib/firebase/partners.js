import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./client";

const partnersCollection = collection(db, "partners");

export async function fetchPartners() {
  const q = query(partnersCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((partner) => ({ id: partner.id, ...partner.data() }));
}

export function subscribePartners(onData, onError) {
  const q = query(partnersCollection, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(snapshot.docs.map((partner) => ({ id: partner.id, ...partner.data() })));
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}

export async function fetchPartnerBySlug(slug) {
  const snapshot = await getDocs(query(partnersCollection, orderBy("createdAt", "desc")));
  const found = snapshot.docs.find((d) => d.data().slug === slug);
  if (!found) return null;
  return { id: found.id, ...found.data() };
}

export async function createPartner(data) {
  const now = Timestamp.now();
  return addDoc(partnersCollection, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updatePartner(partnerId, data) {
  return updateDoc(doc(db, "partners", partnerId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePartner(partnerId) {
  return deleteDoc(doc(db, "partners", partnerId));
}

export async function fetchPartnerById(partnerId) {
  const snapshot = await getDoc(doc(db, "partners", partnerId));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}
