import { Login } from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";
import { createBrowserRouter } from "react-router";
import loginAction from "./actions/auth/login";
import signupAction from "./actions/auth/signup";






const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
    action: loginAction
  },
  {
    path: "/signup",
    Component: SignUp,
    action: signupAction
  },
  {
    path: "/refresh-token",
  },
  {
    path: "/",
    children: [
      {
        index: true,
      },
      {
        path: "blogs",
      },
      {
        path: "blogs/:slug",
      }
    ]
  },
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
      },
      {
        path: "blogs",
      },
      {
        path: "blogs/create",
      },
      {
        path: "blogs/:slug/edit",
      },
      {
        path: "comments",
      },
      {
        path: "users",
      }
    ]
  },
  {
    path: "/settings"
  }
])

export default router;