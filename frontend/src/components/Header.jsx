import { Link } from "react-router-dom";
import { useSocialAuth } from "../hooks/useSocialAuth";

export function Header() {
  const { user, logout } = useSocialAuth();
  return (
    <div className="">
      <Link className="m-4" to="/">
        Home
      </Link>
      {user && (
        <>
          |
          <Link className="m-4" to="/dashboard">
            Dashboard (Private Route)
          </Link>
          |<span> Hi, {user.fullName}</span>
          <button className="bg-green-300 mx-4" onClick={logout}>
            Logout
          </button>
        </>
      )}
      {!user && (
        <>
          |
          <Link className="m-4" to="/sign-up">
            Sign up
          </Link>
          |
          <Link className="m-4" to="/login">
            Login
          </Link>
        </>
      )}
    </div>
  );
}
