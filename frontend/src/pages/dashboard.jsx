import { useSocialAuth } from "../hooks/useSocialAuth";

export function DashboardPage() {
  const { user, logout } = useSocialAuth();
  return (
    <div className="container-fluid">
      <h1 className="text-3xl font-bold">Dashboard page!</h1>
      <h2 className="text-2xl font-bold">Welcome, {user.email}</h2>
      <button
        onClick={logout}
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Logout
      </button>
    </div>
  );
}
