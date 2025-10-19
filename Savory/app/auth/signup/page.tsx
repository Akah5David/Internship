"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Form from "@/components/form";

export default function SignUp() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Convert FormData to a plain object dynamically
    const data: { [key: string]: string } = Object.fromEntries(
      Array.from(formData.entries(), ([key, value]) => [key, value.toString()])
    );

    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!data.email || !data.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!data.password || data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation
    if (data.password && data["confirm-password"]) {
      if (data.password !== data["confirm-password"]) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage("");
      return;
    }

    // Clear Previous errors
    setErrors({});

    // Get the default role (usually 'authenticated')

    const strapiDataFormat = {
      username: data.email,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(strapiDataFormat),
        }
      );

      const result = await response.json();
      console.log("Signup result", result);

      if (!response.ok) {
        console.error(result);
        setMessage(result?.error?.message || "Signup failed");
        return;
      }

      setMessage("Successfully signed up");
      router.push("/auth/signin");
    } catch (error) {
      setMessage("Server not reachable");
      console.error(error);
    }
  }

  return (
    <Form
      message={message}
      errors={errors}
      handleFormSubmission={handleFormSubmission}
      formType="signup"
      title="Sign Up"
      loading
    />
  );
}
