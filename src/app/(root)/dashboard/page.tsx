import { caller } from "@/trpc/server";
import { Client } from "../client";

const Dashboard = async () => {
  const users = await caller.getUser();

  return (
    <div className="flex h-screen justify-center items-center">
      <Client users={users} />
    </div>
  );
};

export default Dashboard;
