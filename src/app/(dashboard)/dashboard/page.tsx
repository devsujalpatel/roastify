import { Client } from "../../client";
import { Suspense } from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<DashboardSkeleton />}>
          <Client />
        </Suspense>
      </main>
    </div>
  );
};

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-16 w-64 bg-muted rounded-lg" />
      <div className="h-48 w-full bg-muted rounded-2xl" />
      <div className="h-32 w-full bg-muted rounded-2xl" />
    </div>
  );
}

export default Dashboard;
