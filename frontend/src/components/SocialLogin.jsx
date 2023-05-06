import { env } from "../constants";

export function SocialLogin() {
  const onLoginGoogle = () => {
    window.open(`${env.VITE_API_ENDPOINT}/auth/google`, "_self");
  };

  const onLoginTwitter = () => {
    window.open(`${env.VITE_API_ENDPOINT}/auth/twitter`, "_self");
  };

  const onLoginLinkedin = () => {
    window.open(`${env.VITE_API_ENDPOINT}/auth/linkedin`, "_self");
  };

  return (
    <>
      <button
        onClick={onLoginTwitter}
        className="uppercase h-12 mt-3 text-white w-full rounded bg-blue-800 hover:bg-blue-900"
      >
        <i className="fa fa-twitter mr-2"></i>Twitter
      </button>
      <button
        onClick={onLoginGoogle}
        className="uppercase h-12 mt-3 text-white w-full rounded bg-red-500 hover:bg-red-600"
      >
        <i className="fa fa-google mr-2"></i>Google
      </button>
      <button
        onClick={onLoginLinkedin}
        className="uppercase h-12 mt-3 text-white w-full rounded bg-blue-500 hover:bg-blue-600"
      >
        <i className="fa fa-linkedin mr-2"></i>LinkedIn
      </button>
    </>
  );
}
