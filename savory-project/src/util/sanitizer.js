function sanitizeToSafeSlate(raw) {
  let s = String(raw || "");
  s = s
    .replace(
      /&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g,
      (m) =>
        ({
          "&nbsp;": " ",
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'",
        }[m] || " ")
    )
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/\[object Object\]/g, " ")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!s)
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];

  const paragraphs = s
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((p) => ({
    type: "paragraph",
    children: [{ text: p }],
  }));
}

function estimateReadingTime(text, wpm = 200) {
  const plain = String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = plain ? plain.split(" ").length : 0;
  return words === 0 ? 0 : Math.max(1, Math.ceil(words / wpm));
}

module.exports = {
  sanitizeToSafeSlate,
  estimateReadingTime,
};
