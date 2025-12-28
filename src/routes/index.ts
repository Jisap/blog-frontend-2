import { createBrowserRouter } from "react-router";
import loginAction from "./actions/auth/login";
import signupAction from "./actions/auth/signup";

import { RootLayout } from "@/components/layouts/Root";

import { Login } from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";
import { Home } from "@/pages/user/Home";
import { RootErrorBoundary } from "@/pages/error/Root";
import { Blogs } from "@/pages/user/Blogs";
import { BlogDetail } from "@/pages/user/Blogdetail";
import { About } from "@/pages/user/About";

import homeLoader from "./loaders/user/homeLoader";
import refreshTokenLoader from "./loaders/refreshToken";
import userBlogLoader from "./loaders/user/userBlogLoader";
import blogDetailLoader from "./loaders/user/blogDetailsLoader";
import { AdminLayout } from "@/components/layouts/AdminLayouts";
import adminLoader from "./loaders/admin/adminLoader";






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
    loader: refreshTokenLoader
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },
      {
        path: "blogs",
        Component: Blogs,
        loader: userBlogLoader,
      },
      {
        path: "blogs/:slug",
        Component: BlogDetail,
        loader: blogDetailLoader,
      },
      {
        path: "about",
        Component: About,
      }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    loader: adminLoader,
    ErrorBoundary: RootErrorBoundary,
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