function escapeHtml(text = "") {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function hasHtmlTags(text = "") {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

function decodeHtmlEntities(text = "") {
  if (!text) return "";
  if (typeof window === "undefined") {
    return String(text)
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&amp;", "&");
  }
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export function sanitizeHtml(raw = "") {
  if (!raw.trim()) return "";
  if (typeof window === "undefined") return raw;

  const doc = new DOMParser().parseFromString(raw, "text/html");
  const blockedTags = ["script", "style", "iframe", "object", "embed", "link", "meta"];
  blockedTags.forEach((tag) => {
    doc.querySelectorAll(tag).forEach((node) => node.remove());
  });

  doc.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const key = attribute.name.toLowerCase();
      const value = attribute.value || "";
      if (key.startsWith("on")) {
        element.removeAttribute(attribute.name);
        return;
      }
      if ((key === "href" || key === "src") && /^\s*javascript:/i.test(value)) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return doc.body.innerHTML;
}

export function prepareHtmlForRender(raw = "") {
  const text = String(raw || "");
  if (!text.trim()) return "";
  if (hasHtmlTags(text)) return sanitizeHtml(text);

  const decoded = decodeHtmlEntities(text);
  if (hasHtmlTags(decoded)) return sanitizeHtml(decoded);

  return escapeHtml(text).replaceAll("\n", "<br />");
}
