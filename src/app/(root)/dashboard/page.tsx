import { caller } from "@/trpc/server";

const Dashboard = async () => {
  const user = await caller.getUser();

  return (
    <div>
      {user.map((u) => (
        <div>
          <h1 key={u.id}>Welcome, {u.name}!</h1>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
