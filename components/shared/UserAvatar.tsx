"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

function UserAvatar() {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!session) return <div>Not signed in</div>;

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <Button onClick={logout}>Logout</Button>
      <div className="p-5"></div>{" "}
    </div>
  );
}

export default UserAvatar;
