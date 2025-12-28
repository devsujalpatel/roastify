"use client";

export const Client = ({ users }: { users: Record<string, any>[] }) => {
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
