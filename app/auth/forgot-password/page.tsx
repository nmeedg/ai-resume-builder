"use client";

import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();

  const tokenParam = searchParams.get("token");
  const isResetMode = Boolean(tokenParam);

  const [isSent, setIsSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [isResending, startResending] = useTransition();

  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors, isSubmitting: isSubmittingForgot },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors, isSubmitting: isSubmittingReset },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onForgotSubmit = async (data: ForgotPasswordFormData) => {
    const redirectTo = `/auth/forgot-password`;
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo,
    });

    if (!error) {
      toast.success("Password reset email sent!");
      setSentEmail(data.email);
      setIsSent(true);
    }
  };

  const handleResend = async () => {
    if (!sentEmail) return;
    startResending(async () => {
      const redirectTo = `/auth/forgot-password`;
      const { error } = await authClient.requestPasswordReset({
        email: sentEmail,
        redirectTo,
      });

      if (!error) {
        toast.success("Password reset link resent!");
      }
    });
  };

  const onResetSubmit = async (data: ResetPasswordFormData) => {
    if (!tokenParam) {
      toast.error(
        "Reset token is missing or invalid. Please request a new reset link.",
      );
      return;
    }

    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token: tokenParam,
    });

    if (error) {
      toast.error(error.message || "Failed to reset password.");
    } else {
      toast.success("Password reset successfully!");
      setIsResetSuccess(true);
    }
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
      <div className="w-full flex flex-col items-center justify-center p-6 overflow-y-auto">
        {isResetMode ? (
          isResetSuccess ? (
            <div className="md:w-96 w-80 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
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

              <h3 className="text-3xl font-medium text-brand-teal">Password Reset Complete!</h3>

              <p className="text-sm text-gray-500/90 mt-3 leading-relaxed">
                Your password has been successfully updated. You can now sign in
                with your new credentials to get connected to your account.
              </p>

              <Link
                href="/auth/login"
                className="mt-6 w-full h-11 rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-colors font-medium text-sm flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitReset(onResetSubmit)}
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

              <h3 className="text-2xl text-gray-900 font-medium text-center">
                Set New Password
              </h3>
              <p className="text-sm text-gray-500/90 mt-3 text-center">
                Please enter your new password below to update your account
                access.
              </p>

              <div className="w-full flex flex-col mt-6">
                <div
                  className={`flex items-center w-full bg-transparent border ${resetErrors.password ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}
                >
                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    {...registerReset("password")}
                    className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {resetErrors.password && (
                  <p className="text-xs text-red-500 mt-1 pl-4">
                    {resetErrors.password.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col mt-4">
                <div
                  className={`flex items-center w-full bg-transparent border ${resetErrors.confirmPassword ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}
                >
                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    {...registerReset("confirmPassword")}
                    className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {resetErrors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 pl-4">
                    {resetErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmittingReset || !tokenParam}
                className="mt-6 w-full h-11 rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-colors font-medium cursor-pointer disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmittingReset ? (
                  <Loader className="flex items-center justify-center scale-50" />
                ) : (
                  "Reset Password"
                )}
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
          )
        ) : isSent ? (
          <div className="md:w-96 w-80 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
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
              disabled={isResending}
              className="mt-6 w-full h-11 rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-colors font-medium text-sm cursor-pointer disabled:opacity-70 flex items-center justify-center"
            >
              {isResending ? (
                <Loader className="flex items-center justify-center scale-50" />
              ) : (
                "Resend reset link"
              )}
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
                Didn&apos;t receive the email? Check your spam folder or try
                resending.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmitForgot(onForgotSubmit)}
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
                className={`flex items-center w-full bg-transparent border ${forgotErrors.email ? "border-red-500" : "border-gray-300/60 focus-within:border-brand-teal"} h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-colors`}
              >
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...registerForgot("email")}
                  className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                />
              </div>
              {forgotErrors.email && (
                <p className="text-xs text-red-500 mt-1 pl-4">
                  {forgotErrors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmittingForgot}
              className="mt-4 w-full h-11 rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-colors font-medium cursor-pointer disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmittingForgot ? (
                <Loader className="flex items-center justify-center scale-50" />
              ) : (
                "Send Reset Link"
              )}
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
