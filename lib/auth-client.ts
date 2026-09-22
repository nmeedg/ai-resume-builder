import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";
import { oneTapClient } from "better-auth/client/plugins"; 

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      autoSelect: true,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {
      },
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5
      }
    })
  ],
  fetchOptions: {
    onError: (ctx) => {
      console.log(ctx.error);
      
      toast.error(ctx.error.message);
    },
  },
});
