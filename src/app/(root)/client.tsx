"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
  const trpc = useTRPC();

  const { data: users } = useSuspenseQuery(trpc.getUser.queryOptions());

  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>
          <h1 key={u.id}>Welcome, {u.name}!</h1>
        </div>
      ))}
    </div>
  );
};
