export default {
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { user } = ctx.state;
      const body = ctx.request.body;
      const files = ctx.request.files;
      const imageFile = files?.["files.image"] || files?.image || files?.files;

      if (!user)
        return ctx.unauthorized("You must be logged in to update a delicacy");
      if (!id) return ctx.badRequest("ID parameter is required");

      console.log("user", user);
      console.log("id to update", id);
      console.log("body info", body);

      let data;

      if (body.data) {
        try {
          data = JSON.parse(body.data);
        } catch (err) {
          return ctx.badRequest("Invalid JSON in 'data' field");
        }
      } else {
        data = body;
      }

      const errors: string[] = [];
      if (!data.title || !data.title.trim()) errors.push("Title is required");
      if (!data.excerpt) errors.push("Excerpt is required");
      if (!data.category) errors.push("Category is required");
      if (!imageFile) errors.push("Image is required");

      //backend safeguard validation for 'excerpt'
      if (typeof data.excerpt === "string") {
        // Wrap string into a single paragraph block
        data.excerpt = [
          {
            type: "paragraph",
            children: [{ type: "text", text: data.excerpt }],
          },
        ];
      }

      if (!Array.isArray(data.excerpt) || data.excerpt.length === 0) {
        return ctx.badRequest("Excerpt must be a blocks array");
      }

      function getExcerptText(blocks: any[]) {
        return blocks
          .map((block) =>
            block.children.map((child: any) => child.text).join(" ")
          )
          .join(" ");
      }

      if (errors.length > 0) {
        return ctx.badRequest("Validation errors", { errors });
      }

      // Upload image
      const uploadedFiles = await strapi
        .plugin("upload")
        .service("upload")
        .upload({
          data: {
            fileInfo: {
              alternativeText: data.title || "Uploaded image",
              caption: data.excerpt || "",
              name: imageFile.originalFilename || "image",
            },
          },
          files: imageFile,
        });

      // Helper to generate slug
      function generateSlug(str: string) {
        return str
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-") // replace spaces with -
          .replace(/[^\w\-]+/g, "") // remove all non-word chars
          .replace(/\-\-+/g, "-"); // replace multiple - with single -
      }

      // Helper to calculate reading time (approx. 200 words/min)
      function calculateReadingTime(text: string) {
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
      }

      const delicacy = (await strapi.entityService.findOne(
        "api::delicacy.delicacy",
        id,
        {
          populate: ["user", "image"],
        }
      )) as any;

      if (!delicacy) {
        return ctx.notFound("Delicacy not found");
      }

      console.log("Delicacy to update:", delicacy);

      const isOwner = delicacy.user?.documentId === user.documentId;

      if (!isOwner) {
        return ctx.forbidden("You are not allowed to update this delicacy");
      }

      // Prepare data for creation
      const delicacyData = {
        title: data.title ?? delicacy.title,
        excerpt: data.excerpt ?? delicacy.excerpt,
        category: data.category ?? delicacy.category,
        slug: generateSlug(data.title) || delicacy.slug,
        readingTime:
          calculateReadingTime(getExcerptText(data.excerpt)) ??
          delicacy.readingTime, // <-- added field
        user: delicacy.user.id,
        image: uploadedFiles?.[0]?.id ?? delicacy.image.id,
      };

      const updatedDelicacy = await strapi.entityService.update(
        "api::delicacy.delicacy",
        id,
        {
          data: delicacyData,
        }
      );

      // Populate image relation
      const result = await strapi.entityService.findOne(
        "api::delicacy.delicacy",
        updatedDelicacy.id,
        { populate: ["image", "user"] }
      );

      ctx.send({
        result,
        status: 200,
        message: "Delicacy updated successfully",
      });
    } catch (err) {
      console.error("Error updating delicacy:", err);
      ctx.send({
        error: {
          message: "An error occurred while updating the delicacy",
          details: err.message,
        },
        status: 500,
      });
    }
  },
};
