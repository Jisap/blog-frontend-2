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
import { Dashboard } from "@/pages/admin/Dashboard";
import dashboardLoader from "./loaders/admin/dashboardLoader";
import { BlogsAdmin } from "@/pages/admin/Blogs";
import allBlogsLoader from "./loaders/admin/allBlogsLoader";
import { BlogCreate } from "@/pages/admin/BlogCreate";
import blogCreateAction from "./loaders/admin/BlogCreateAction";
import { BlogEdit } from "@/pages/admin/BlogEdit";
import blogEditAction from "./loaders/admin/blogEditAction";






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
        Component: Dashboard,
        loader: dashboardLoader,
        handle: { breadcrumb: "Dashboard" }
      },
      {
        path: "blogs",
        Component: BlogsAdmin,
        loader: allBlogsLoader,
        handle: { breadcrumb: "Blogs" }
      },
      {
        path: "blogs/create",
        Component: BlogCreate,
        action: blogCreateAction,
        handle: { breadcrumb: "Create a new Blog" }
      },
      {
        path: "blogs/:slug/edit",
        Component: BlogEdit,
        loader: blogDetailLoader,
        action: blogEditAction,
        handle: { breadcrumb: "Edit Blog" }
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