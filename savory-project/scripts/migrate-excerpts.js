// ...existing code...
require("dotenv").config();
const StrapiModule = require("@strapi/strapi");
const Strapi = /** @type {any} */ (StrapiModule.default || StrapiModule);

function sanitizeToSafeSlate(raw) {
  let s = String(raw || "");
  // basic decode & strip HTML/artifacts
  s = s.replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g, (m) =>
    ({ "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }[m] || " ")
  );
  s = s.replace(/<\/?[^>]+(>|$)/g, " ");
  s = s.replace(/\[object Object\]/g, " ");
  s = s.replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]+/g, " ");
  s = s.replace(/\s+/g, " ").trim();

  if (!s) return [{ type: "paragraph", children: [{ text: "" }] }];

  const paragraphs = s.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return paragraphs.length > 0
    ? paragraphs.map((p) => ({ type: "paragraph", children: [{ text: p }] }))
    : [{ type: "paragraph", children: [{ text: s }] }];
}

async function run() {
  const strapi = Strapi();
  await strapi.load();

  const entries = await strapi.entityService.findMany("api::delicacy.delicacy", {
    fields: ["id", "excerpt", "locale"],
    limit: -1,
  });

  for (const e of entries) {
    try {
      const excerpt = e.excerpt;
      const locale = e.locale || "en";

      if (typeof excerpt === "string" && excerpt.trim().length > 0) {
        console.log(`\n--- id=${e.id} raw excerpt (preview) ---`);
        console.log(excerpt.length > 400 ? excerpt.slice(0, 400) + "..." : excerpt);
        const slate = sanitizeToSafeSlate(excerpt);

        // Try normal entityService.update first
        try {
          await strapi.entityService.update("api::delicacy.delicacy", e.id, {
            data: { excerpt: /** @type {any} */ (slate) },
            locale,
          });
          console.log(`Migrated id=${e.id} locale=${locale} (entityService)`);
          continue;
        } catch (updateErr) {
          console.warn(`entityService.update failed for id=${e.id}:`, updateErr?.details || updateErr);
        }

        // Fallback: lower-level DB update (bypasses some entityService validation)
        try {
          await strapi.db.query("api::delicacy.delicacy").update({
            where: { id: e.id },
            data: { excerpt: slate },
          });
          console.log(`Migrated id=${e.id} locale=${locale} (db.query fallback)`);
        } catch (dbErr) {
          console.error(`db.query.update also failed for id=${e.id}. Raw excerpt:`, excerpt);
          console.error(dbErr?.details || dbErr);
        }
      } else {
        console.log(`Skipping id=${e.id} (no string excerpt)`);
      }
    } catch (err) {
      console.error(`Unexpected error for id=${e.id}:`, err?.details || err);
    }
  }

  await strapi.destroy();
  console.log("Done");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// ...existing code...