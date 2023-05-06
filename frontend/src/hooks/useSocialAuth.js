import { useContext } from "react";
import { SocialAuthContext } from "../context/SocialAuthContext";

export function useSocialAuth() {
  return useContext(SocialAuthContext);
}
