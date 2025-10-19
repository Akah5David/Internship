"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async create(ctx) {
        try {
            const { user } = ctx.state; // Authenticated user
            if (!user) {
                return ctx.unauthorized("You must be logged in to create a delicacy");
            }
            const body = ctx.request.body || {};
            const files = ctx.request.files || {};
            console.log("Request body:", body);
            const imageFile = files["files.image"] || files.image || files.files;
            console.log("Requested image files:", imageFile);
            // Parse JSON if it exists
            let data = {};
            if (body.data) {
                try {
                    data = JSON.parse(body.data);
                }
                catch (err) {
                    return ctx.badRequest("Invalid JSON in 'data' field");
                }
            }
            else {
                // If no 'data', maybe the frontend sent JSON directly
                data = body;
            }
            strapi.log.info("data", data);
            strapi.log.info("files", files);
            // Validation
            const errors = [];
            if (!data.title || !data.title.trim())
                errors.push("Title is required");
            if (!data.excerpt || !data.excerpt)
                errors.push("Excerpt is required");
            if (!data.category)
                errors.push("Category is required");
            if (!imageFile)
                errors.push("Image is required");
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
            function getExcerptText(blocks) {
                return blocks
                    .map((block) => block.children.map((child) => child.text).join(" "))
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
            function generateSlug(str) {
                return str
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-") // replace spaces with -
                    .replace(/[^\w\-]+/g, "") // remove all non-word chars
                    .replace(/\-\-+/g, "-"); // replace multiple - with single -
            }
            // Helper to calculate reading time (approx. 200 words/min)
            function calculateReadingTime(text) {
                const wordsPerMinute = 200;
                const wordCount = text.trim().split(/\s+/).length;
                return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
            }
            // Prepare data for creation
            const delicacyData = {
                title: data.title,
                excerpt: data.excerpt,
                category: data.category,
                slug: generateSlug(data.title),
                readingTime: calculateReadingTime(getExcerptText(data.excerpt)), // <-- added field
                user: user.id,
                image: uploadedFiles[0].id,
            };
            // Create the delicacy entry using entityService in v5
            const entity = await strapi.entityService.create("api::delicacy.delicacy", {
                data: delicacyData,
            });
            // Populate image relation
            const result = await strapi.entityService.findOne("api::delicacy.delicacy", entity.id, { populate: ["image"] });
            return ctx.send(result);
        }
        catch (err) {
            console.error("Error creating delicacy:", err);
            return ctx.internalServerError("Failed to create delicacy");
        }
    },
};
