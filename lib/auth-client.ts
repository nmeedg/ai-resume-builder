import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  fetchOptions: {
    onError: (ctx) => {
      console.log(ctx.error);
      
      toast.error(ctx.error.message);
    },
  },
});
