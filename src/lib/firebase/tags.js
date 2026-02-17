import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./client";
import { slugify } from "../slugify";

const tagsCollection = collection(db, "tags");

export async function fetchTags() {
  const snapshot = await getDocs(query(tagsCollection, orderBy("name", "asc")));
  return snapshot.docs.map((tag) => ({ id: tag.id, ...tag.data() }));
}

export function subscribeTags(onData, onError) {
  const q = query(tagsCollection, orderBy("name", "asc"));
  return onSnapshot(
    q,
    (snapshot) => {
      onData(snapshot.docs.map((tag) => ({ id: tag.id, ...tag.data() })));
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}

export async function createTag(name) {
  const cleanName = name.trim();
  return addDoc(tagsCollection, {
    name: cleanName,
    slug: slugify(cleanName),
  });
}

export async function updateTag(tagId, name) {
  const cleanName = name.trim();
  return updateDoc(doc(db, "tags", tagId), {
    name: cleanName,
    slug: slugify(cleanName),
  });
}

export async function deleteTag(tagId) {
  return deleteDoc(doc(db, "tags", tagId));
}
