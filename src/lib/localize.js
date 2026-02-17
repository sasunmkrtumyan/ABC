export function pickTextByLanguage(valueByLanguage = {}, selectedLanguage) {
  if (!valueByLanguage || typeof valueByLanguage !== "object") return "";

  if (selectedLanguage && valueByLanguage[selectedLanguage]) {
    return valueByLanguage[selectedLanguage];
  }

  return valueByLanguage.am || valueByLanguage.en || valueByLanguage.ru || "";
}
