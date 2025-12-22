import { Login } from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";
import { createBrowserRouter } from "react-router";






const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
    //action: loginAction
  },
  {
    path: "/signup",
    Component: SignUp,
    //action: signupAction
  }
])

export default router;