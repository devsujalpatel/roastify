"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const Client = () => {
  const trpc = useTRPC();
  const router = useRouter();

  const handleClick = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const { data: users } = useSuspenseQuery(trpc.getUser.queryOptions());

  return (
    <div>
      <Button onClick={handleClick}>Sign Out</Button>
      {users.map((u) => (
        <div key={u.id}>
          <h1 key={u.id}>Welcome, {u.name}!</h1>
        </div>
      ))}
    </div>
  );
};
