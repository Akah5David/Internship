const slugify = require("slugify").default;

module.exports = {
  // Update a delicacy entry
  async update(ctx) {
    try {
      const { id } = ctx.params;
      if (!id) return ctx.badRequest("Missing id param");

      // optional auth check
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized();

      const body = ctx.request.body || {};
      const files = ctx.request.files || {};

      // parse incoming data (supports multipart with `data` field or direct fields)
      let data = {};
      if (body.data) {
        try {
          data = JSON.parse(body.data);
        } catch (err) {
          return ctx.badRequest("Invalid JSON in data");
        }
      } else {
        data = body;
      }

      // find existing entity
      const existingEntity = await strapi.entityService.findOne(
        "api::delicacy.delicacy",
        id,
        { populate: ["image"] }
      );

      if (!existingEntity) return ctx.notFound("Entry not found");

      console.log("existingEntity", existingEntity);
      console.log("data", data);

      // prepare excerpt as Slate array if field expects rich text
      const makeSlate = (val) => {
        if (Array.isArray(val)) return val;
        const text = (val || "").toString();
        return [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text,
              },
            ],
          },
        ];
      };

      console.log("Entered excerpt value:", data.excerpt);

      // validation uses plain text, so derive a plain string
      const plainExcerptText = Array.isArray(data.excerpt)
        ? data.excerpt
            .map((block) => (block.children || []).map((c) => c.text).join(" "))
            .join(" ")
        : String(data.excerpt || "");

      // handle image upload (if provided)
      let imageRelation =
        existingEntity.image && existingEntity.image.id
          ? existingEntity.image.id
          : null;
      const fileField =
        files.image ||
        files["files.image"] ||
        files.files ||
        files["files[0]"] ||
        null;

      if (fileField) {
        const filesToUpload = Array.isArray(fileField) ? fileField : fileField;
        const uploaded = await strapi
          .plugin("upload")
          .service("upload")
          .upload({
            data: {},
            files: filesToUpload,
          });

        if (Array.isArray(uploaded) && uploaded.length > 0) {
          // use first uploaded file id (adjust if you expect multiple)
          imageRelation = uploaded[0].id;
        }
      }

      const wordCount = plainExcerptText
        ? plainExcerptText.trim().split(/\s+/).length
        : 0;
      const WORDS_PER_MINUTE = 200;
      const readingTime =
        wordCount === 0
          ? 0
          : Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

      console.log("Raw excerpt input:", data.excerpt);
      const excerptPayload = makeSlate(data.excerpt);
      console.log(
        "Processed excerpt (final):",
        JSON.stringify(excerptPayload, null, 2)
      );

      // prepare update payload
      const updatedData = {
        title: data.title ?? existingEntity.title,
        excerpt: makeSlate(data.excerpt) ?? existingEntity.excerpt,
        category: data.category ?? existingEntity.category,
        readingTime,
        slug: data.title
          ? slugify(data.title, { lower: true })
          : existingEntity.slug,
        image: imageRelation ? imageRelation : existingEntity.image,
        // publish immediately if requested (or you can remove this)
        ...(data.publish ? { publishedAt: new Date().toISOString() } : {}),
      };

      // perform update via entityService (passes through Strapi validation)
      const entity = await strapi.entityService.update(
        "api::delicacy.delicacy",
        id,
        {
          data: updatedData,
          populate: ["image", "user"], // add this
        }
      );

      

      return ctx.send(entity);
    } catch (err) {
      strapi.log.error(err);
      return ctx.internalServerError("Failed to update delicacy");
    }
  },
};
