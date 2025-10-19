"use client";

import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import Form from "@/components/form";
import { AuthContext } from "@/components/auth";

export default function SignIn() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const newErrors: { [key: string]: string } = {};

    if (!data.email || !data.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.password || data.password.length < 8) {
      newErrors.password = !data.password
        ? "Password is required"
        : "Password must be at least 8 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result?.error?.message || "Login failed");
        setLoading(false);
        return;
      }
      console.log("Token from localStorage:", result);
      if (result.jwt) {
        localStorage.setItem("authToken", result.jwt);
        login();
      }

      setMessage("Successfully signed in");

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server unreachable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      message={message}
      errors={errors}
      handleFormSubmission={handleFormSubmission}
      formType="signin"
      title="Sign In"
      loading={loading}
    />
  );
}
