"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/lib/types";

export default function ForgotPassword() {
  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("Forgot password request submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSentEmail(data.email);
    setIsSent(true);
  };

  const handleResend = async () => {
    console.log("Resending reset email to:", sentEmail);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-full hidden md:inline-block">
        <Image
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          src="/assets/images/forgot_password_side_image.png"
          alt="Forgot Password Side Image"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center p-6">
        {isSent ? (
          <div className="md:w-96 w-80 flex flex-col space-y-1 items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
            <Link href="/" className="mb-8">
              <Image
                src="/assets/logo/logo.svg"
                alt="Tailrcv Logo"
                width={226}
                height={72}
                className="h-20 w-auto"
                priority
              />
            </Link>

            <h3 className="text-3xl text-gray-900 font-medium">
              Check your email
            </h3>

            <p className="text-sm text-gray-500/90 mt-3 leading-relaxed">
              We have sent a password reset link to :{" "}
              <span className="font-semibold text-brand-teal">{sentEmail}</span>
            </p>

            <button
              onClick={handleResend}
              type="button"
              className="mt-6 w-full h-11 rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-colors font-medium text-sm cursor-pointer"
            >
              Resend reset link
            </button>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="text-sm text-gray-500 hover:text-brand-teal underline transition-colors"
              >
                Back to Sign in
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 w-full">
              <p className="text-xs text-gray-400 text-center">
                Didn't receive the email? Check your spam folder or try
                resending.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-96 w-80 flex flex-col items-center justify-center"
            noValidate
          >
            <Link href="/" className="mb-6">
              <Image
                src="/assets/logo/logo.svg"
                alt="Tailrcv Logo"
                width={226}
                height={72}
                className="h-20 w-auto"
                priority
              />
            </Link>

            <h3 className="text-3xl text-gray-900 font-medium text-center">
              Forgot Password
            </h3>
            <p className="text-sm text-gray-500/90 mt-4 text-center">
              Enter your email address and we will send you a link to reset your
              password.
            </p>

            <div className="w-full flex flex-col mt-10">
              <div
                className={`flex items-center w-full bg-transparent border ${errors.email ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}
              >
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 pl-4">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full h-11 rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-colors font-medium cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? "Sending link..." : "Send Reset Link"}
            </button>
            <p className="text-gray-500/90 text-sm mt-6">
              Remembered your password?{" "}
              <Link
                className="text-brand-teal hover:underline"
                href="/auth/login"
              >
                Back to Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
