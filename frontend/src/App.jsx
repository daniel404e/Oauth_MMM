import { RouterProvider } from "react-router-dom";
import "./App.css";
import { SocialAuthProvider } from "./context/SocialAuthContext";
import { router } from "./routes";

function App() {
  return (
    <SocialAuthProvider>
      <RouterProvider router={router} />
    </SocialAuthProvider>
  );
}

export default App;
