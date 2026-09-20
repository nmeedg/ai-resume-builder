import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "@better-auth/prisma-adapter";


export const auth = betterAuth({
 database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: "http://localhost:3000/",
  emailAndPassword: { enabled: true },
});
