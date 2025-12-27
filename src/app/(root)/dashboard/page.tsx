"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const trpc = useTRPC();
  const { data: user } = useQuery(trpc.getUser.queryOptions());

  return (
    <div>
      {user &&
        user.map((u) => (
          <div key={u.id}>
            <h1 key={u.id}>Welcome, {u.name}!</h1>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
