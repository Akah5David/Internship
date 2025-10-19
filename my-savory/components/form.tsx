"use client";

import type React from "react";
import { useState } from "react";

import ShowPasswordSvg from "./show-password-svg";

type ChildFormProps = {
  message: string;
  errors: { [key: string]: string };
  handleFormSubmission: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
  formType: string;
  title: string;
  loading: boolean;
};

type PasswordToggleState = {
  password: boolean;
  "confirm-password": boolean;
};

const PASSWORD_TYPE = ["password", "confirm-password"];

export default function Form({
  message,
  errors,
  handleFormSubmission,
  formType,
  title,
  loading,
}: ChildFormProps) {
  const formDivStyle = "flex flex-col gap-2 px-2.5";
  const inputStyle =
    "border border-border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground";
  const labelStyle = "text-lg font-semibold text-foreground";

  const passwordInputStyle =
    "p-2.5 border-none focus:outline-none  text-foreground";

  const [showPassword, setShowPassword] = useState<PasswordToggleState>({
    password: false,
    "confirm-password": false,
  });

  function showPasswordHandler(type: keyof PasswordToggleState) {
    setShowPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4">
      <h2 className="font-serif text-3xl font-bold text-foreground">{title}</h2>
      <form
        onSubmit={(e) => {
          console.log("Form submitted");
          handleFormSubmission(e);
        }}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-card p-6 shadow-lg"
      >
        <div className={formDivStyle}>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            defaultValue=""
            className={`p-2.5 ${inputStyle}`}
          />
          {errors && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        <ul className="flex flex-col gap-3">
          {PASSWORD_TYPE.map((type, index) => (
            <ShowPasswordSvg
              key={index}
              type={type}
              passwordInputStyle={passwordInputStyle}
              inputStyle={inputStyle}
              showPassword={showPassword[type as keyof PasswordToggleState]}
              showPasswordHandler={() =>
                showPasswordHandler(type as keyof PasswordToggleState)
              }
              formDivStyle={formDivStyle}
              labelStyle={labelStyle}
              formType={formType}
              errors={errors}
            />
          ))}
        </ul>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Submit
        </button>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
}
