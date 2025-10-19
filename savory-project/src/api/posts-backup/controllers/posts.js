const slugify = require("slugify").default;

module.exports = {
  async create(ctx) {
    try {
      // Debug: inspect incoming request
      console.log("=== incoming create /posts ===");
      console.log(
        "content-type:",
        ctx.request.header && ctx.request.header["content-type"]
      );
      console.log(
        "ctx.request.body keys:",
        ctx.request.body ? Object.keys(ctx.request.body) : ctx.request.body
      );
      console.log(
        "ctx.request.files keys:",
        ctx.request.files ? Object.keys(ctx.request.files) : ctx.request.files
      );

      const user = ctx.state.user; // Authenticated user

      if (!user) {
        return ctx.unauthorized("You must be logged in to create a delicacy");
      }

      const body = ctx.request.body || {};
      const files = ctx.request.files || {};

      const fileField =
        files.image ||
        files["files.image"] ||
        files.files ||
        (Array.isArray(files) ? files[0] : null);

      // Parse JSON if it exists
      let data = {};
      if (body.data) {
        try {
          data = JSON.parse(body.data);
        } catch (err) {
          return ctx.badRequest("Invalid JSON in 'data' field");
        }
      } else {
        // If no 'data', maybe the frontend sent JSON directly
        data = body;
      }

      // Ensure excerpt is a Slate-compatible value (array of nodes)
      const makeSlate = (val) => {
        if (Array.isArray(val)) return val;
        const text = (val || "").toString();
        return [
          {
            type: "paragraph",
            children: [{ text }],
          },
        ];
      };

      console.log("Entered excerpt value:", data.excerpt);
      console.log("Exited excerpt value:", makeSlate(data.excerpt)[0].children);

      // validation uses plain text, so derive a plain string
      const plainExcerptText = Array.isArray(data.excerpt)
        ? data.excerpt
            .map((block) => (block.children || []).map((c) => c.text).join(" "))
            .join(" ")
        : String(data.excerpt || "");

      // Validation
      const errors = [];
      if (!data.title || !data.title.trim()) errors.push("Title is required");
      if (!data.excerpt || !data.excerpt.trim())
        errors.push("Excerpt is required");
      if (!data.category) errors.push("Category is required");

      if (!fileField) {
        return ctx.badRequest("Validation errors", {
          errors: ["Image is required"],
        });
      }

      if (errors.length > 0) {
        return ctx.badRequest("Validation errors", { errors });
      }

      // Upload image (fileField can be single file or array)
      const filesToUpload = Array.isArray(fileField) ? fileField : fileField;

      const uploadedFiles = await strapi
        .plugin("upload")
        .service("upload")
        .upload({
          data: {},
          files: filesToUpload,
        });

      const wordCount = plainExcerptText
        ? plainExcerptText.trim().split(/\s+/).length
        : 0;
      const WORDS_PER_MINUTE = 200;
      const readingTime =
        wordCount === 0
          ? 0
          : Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

      // Prepare data for creation
      const delicacyData = {
        title: data.title,
        excerpt: makeSlate(data.excerpt),
        category: data.category,
        readingTime: readingTime,
        slug: slugify(data.title, { lower: true }),
        user: user.id,
        image: uploadedFiles[0].id,
        publishedAt: new Date().toISOString(),
      };

      // Create the delicacy entry
      const entity = await strapi.db.query("api::delicacy.delicacy").create({
        data: delicacyData,
      });

      strapi.log.info("Created delicacy:", entity);

      // Populate image relation
      const result = await strapi.entityService.findOne(
        "api::delicacy.delicacy",
        entity.id,
        { populate: ["image", "user"] }
      );

      console.log("Created delicacy with image:", result);

      return ctx.send(result);
    } catch (err) {
      console.error("Error creating delicacy:", err);
      return ctx.internalServerError("Failed to create delicacy");
    }
  },
};
