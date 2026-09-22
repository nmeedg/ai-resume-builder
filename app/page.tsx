"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const displayGooglePrompt = async () => {
    await authClient.oneTap({fetchOptions: {
    onSuccess: () => {
      router.push("/workspace");
    }
  }});
  };

  useEffect(() => {
    displayGooglePrompt();
  }, []);
  return (
    <div>
      <h1>Landing page</h1>
    </div>
  );
}
