import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import sendMail from "./sendMail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true, requireEmailVerification: true, autoSignIn: false },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendMail(user.email, "verify_email", url);
    },
  },
});
