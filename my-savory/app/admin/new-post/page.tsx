"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
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
import { Just_Me_Again_Down_Here } from "next/font/google";

interface FormData {
  title: string;
  excerpt: string;
  category: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Frontend validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.excerpt) newErrors.excerpt = "Excerpt is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    if (!image) newErrors.image = "Image is required";
    else if (!["image/jpeg", "image/jpg", "image/png"].includes(image.type)) {
      newErrors.image = "Image must be JPG or PNG";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected image file:", file);

    if (file) {
      setImage(file);
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append(
        "data",
        JSON.stringify({
          title: formData.title,
          excerpt: [
            {
              type: "paragraph",
              children: [{ type: "text", text: formData.excerpt }],
            },
          ],
          category: formData.category,
        })
      );
      if (image) {
        formDataToSend.append("files.image", image); // your current key
        formDataToSend.append("files", image); // also send under "files"
      }

      // Get JWT from localStorage
      const token = localStorage.getItem("authToken");
      console.log("Jwt_Token is here: ", token);

      if (!token)
        throw new Error("Authentication required. Please log in first.");

      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      // Send POST request to Strapi
      const response = await fetch("http://localhost:1337/api/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Full error from Strapi:", data); // logs full object
        throw new Error(
          data.error?.message +
            (data.error?.details
              ? ": " + JSON.stringify(data.error.details)
              : "")
        );
      }

      setSubmitSuccess(true);
      setFormData({ title: "", excerpt: "", category: "" });
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Create New Post</CardTitle>
          <CardDescription>
            Submit a new blog post to your Strapi CMS
          </CardDescription>
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
                placeholder="Write a brief excerpt or summary"
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
              <Label htmlFor="image">
                Image <span className="text-destructive">*</span>
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
                className={errors.image ? "border-destructive" : ""}
              />
              <p className="text-xs text-muted-foreground">JPG or PNG only</p>
              {errors.image && (
                <p className="text-sm text-destructive">{errors.image}</p>
              )}
              {image && (
                <p className="text-sm text-muted-foreground">
                  Selected: {image.name} ({(image.size / 1024).toFixed(2)} KB)
                </p>
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
                  Post created successfully! Redirecting to blog...
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
