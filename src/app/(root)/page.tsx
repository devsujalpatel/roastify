import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";

export default function Page() {
  const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(
  //   trpc.hello.queryOptions({
  //     /** input */
  //   }),
  // );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-screen">
        <Navbar />
      </div>
    </HydrationBoundary>
  );
}
