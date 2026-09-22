"use client";

import { authClient } from "@/lib/auth-client";

function UserAvatar() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!session) return <div>Not signed in</div>;

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}

export default UserAvatar;
