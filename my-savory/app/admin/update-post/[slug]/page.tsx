"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormData {
  title: string;
  excerpt: string;
  category: string;
}

export default function UpdateDelicacy({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [delicacyId, setDelicacyId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 Fetch existing delicacy data by slug
  useEffect(() => {
    async function fetchDelicacy() {
      try {
        const response = await fetch(
          `http://localhost:1337/api/delicacies?filters[slug][$eq]=${slug}&populate=image`
        );

        const data = await response.json();
        if (!response.ok || !data.data.length)
          throw new Error("Delicacy not found");

        const item = data.data[0];
        const id = item.id;
        const attributes = item;

        // Convert excerpt safely into a string
        let excerptValue = "";
        if (typeof attributes.excerpt === "string") {
          excerptValue = attributes.excerpt;
        } else if (Array.isArray(attributes.excerpt)) {
          excerptValue = attributes.excerpt
            .map((item: any) =>
              typeof item === "string" ? item : item.children?.[0]?.text || ""
            )
            .join(" ");
        } else if (
          typeof attributes.excerpt === "object" &&
          attributes.excerpt !== null
        ) {
          excerptValue =
            attributes.excerpt.value ||
            JSON.stringify(attributes.excerpt) ||
            "";
        }

        // Prefill form fields
        setDelicacyId(id);
        setFormData({
          title: attributes.title || "",
          excerpt: excerptValue || "",
          category: attributes.category || "",
        });

        // Prefill image preview
        if (attributes.image?.url) {
          const imageUrl = attributes.image.url.startsWith(
            "http"
          )
            ? attributes.image.data.attributes.url
            : `http://localhost:1337${attributes.image.url}`;
          setImagePreview(imageUrl);
        }
      } catch (err) {
        console.error("Error fetching existing delicacy:", err);
        setSubmitError("Failed to load existing data.");
      }
    }

    fetchDelicacy();
  }, [slug]);

  // 🔹 Validation (same logic as NewPostPage)
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    if (!image && !imagePreview)
      newErrors.image = "Please upload or retain an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  // 🔹 Submit update (send same format as NewPostPage)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateForm()) return;
    if (!delicacyId) {
      setSubmitError("Delicacy ID not found. Cannot update.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "data",
        JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          category: formData.category,
        })
      );

      // Send both image keys to match create post request
      if (image) {
        formDataToSend.append("files.image", image);
        formDataToSend.append("files", image);
      }

      const token = localStorage.getItem("authToken");
      if (!token)
        throw new Error("Authentication required. Please log in first.");

      const response = await fetch(
        `http://localhost:1337/api/update/${delicacyId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Full error from Strapi:", data);
        throw new Error(
          data.error?.message || "Failed to update delicacy. Please try again."
        );
      }

      setSubmitSuccess(true);
      setImage(null);

      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 UI
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Update Post</CardTitle>
          <CardDescription>Edit your existing post below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">
                Excerpt <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Write a short excerpt"
                rows={4}
                className={errors.excerpt ? "border-destructive" : ""}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive">{errors.excerpt}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Recipes, Stories, Tips"
                className={errors.category ? "border-destructive" : ""}
              />
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
                className={errors.image ? "border-destructive" : ""}
              />
              <p className="text-xs text-muted-foreground">
                JPG or PNG only (optional if keeping old image)
              </p>
              {errors.image && (
                <p className="text-sm text-destructive">{errors.image}</p>
              )}

              {(imagePreview || image) && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {image
                      ? `Selected: ${image.name}`
                      : "Current image preview:"}
                  </p>
                  <img
                    src={image ? URL.createObjectURL(image) : imagePreview!}
                    alt="Delicacy"
                    className="mt-2 w-40 h-40 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>

            {/* Submit Error */}
            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            {/* Submit Success */}
            {submitSuccess && (
              <Alert className="border-secondary bg-secondary/10">
                <AlertDescription>
                  Post updated successfully! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Updating Post..." : "Update Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
