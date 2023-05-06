import { Link } from "react-router-dom";
export function HomePage() {
  return (
    <div className="container-fluid">
      <h1 className="text-3xl font-bold">Home page!</h1>
      <Link className="m-4" to="/dashboard">Dashboard</Link>|<Link className="m-4" to="/login">Login</Link>
    </div>
  );
}
