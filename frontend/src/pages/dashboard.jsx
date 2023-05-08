import { useSocialAuth } from "../hooks/useSocialAuth";

export function DashboardPage() {
  const { user } = useSocialAuth();
  return (
    <div className="container-fluid">
      <h1 className="text-3xl font-bold">Dashboard page!</h1>
      <h2 className="text-2xl font-bold">Welcome, {user.email}</h2>
    </div>
  );
}
