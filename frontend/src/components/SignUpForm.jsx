import { SocialLogin } from "./SocialLogin";

export function SignUpForm() {
  return (
    <div>
      <div className="container h-screen flex justify-center items-center">
        <div className="p-8 bg-white rounded-lg max-w-6xl pb-10">
          <div className="flex justify-center mb-4 text-black">
            <h1 className="h-4/6">Sign Up</h1>
          </div>
          <div className="flex justify-evenly flex-col">
            <input
              type="text"
              className="flex h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="First Name"
            />

            <input
              type="text"
              className="flex h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="Last Name"
            />

            <input
              type="text"
              className="flex h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="Email"
            />

            <input
              type="text"
              className="flex h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="Password"
            />
          </div>

          <button className="uppercase h-12 mt-3 text-white w-full rounded bg-green-700 hover:bg-green-800">
            Sign up
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
