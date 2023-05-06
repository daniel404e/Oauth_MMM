import { Link } from "react-router-dom";
import { SocialLogin } from "./SocialLogin";

export function LoginForm() {
  return (
    <div>
      <Link className="m-4" to="/">
        Home
      </Link>
      |
      <Link className="m-4" to="/dashboard">
        Dashboard (Private Route)
      </Link>
      <div className="container h-screen flex justify-center items-center">
        <div className="p-8 bg-white rounded-lg max-w-6xl pb-10">
          <div className="flex justify-center mb-4 text-black">
            <h1 className="h-4/6">Login</h1>
          </div>

          <input
            type="text"
            className="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Email"
          />

          <input
            type="text"
            className="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
            placeholder="Password"
          />

          <div className="flex justify-end items-center mt-2 mx-2">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              Forgot password?
            </a>
          </div>

          <button className="uppercase h-12 mt-3 text-white w-full rounded bg-green-700 hover:bg-green-800">
            login
          </button>

          <div className="flex justify-between items-center mt-3">
            <hr className="w-full" />
            <span className="p-2 text-gray-400 mb-1">OR</span>
            <hr className="w-full" />
          </div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
