import readingTime from "reading-time";

// Extract plain text from Rich Text JSON
function extractTextFromRichText(richText: any): string {
  if (!Array.isArray(richText)) return "";
  return richText
    .map(block =>
      block.children?.map((child: any) => child.text).join(" ") || ""
    )
    .join(" ");
}

export const lifecycles = {
  async afterCreate(event: any) {
    const { result } = event;

    if (result.excerpt) {
      const text = extractTextFromRichText(result.excerpt);

      await strapi.db.query("api::delicacy.delicacy").update({
        where: { id: result.id },
        data: { readingTime: Math.ceil(readingTime(text).minutes) },
      });
    }
  },

  async afterUpdate(event: any) {
    const { result } = event;

    if (result.excerpt) {
      const text = extractTextFromRichText(result.excerpt);

      await strapi.db.query("api::delicacy.delicacy").update({
        where: { id: result.id },
        data: { readingTime: Math.ceil(readingTime(text).minutes) },
      });
    }
  },
};
