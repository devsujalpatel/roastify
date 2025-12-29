import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "../client";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

const Dashboard = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUser.queryOptions());

  return (
    <div className="flex h-screen justify-center items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Dashboard;
