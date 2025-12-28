import { bitblogApi } from "@/api";
import { data, redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import { AxiosError } from "axios";
import type { PaginatedResponse, Blog, Comment, User } from "@/types";



export type DashboardData = {
  blogsCount: number;
  commentsCount: number;
  usersCount: number;
  blogs: Blog[];
  comments: Comment[];
  users: User[];
}

const dashboardLoader: LoaderFunction = async () => {

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return redirect("/");


  try {

    const blogsResponse = await bitblogApi.get(`/blogs`, {
     params: { limit: 5 },
    });

    const commentsResponse = await bitblogApi.get(`/comments`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { limit: 5 },
    });

    const usersResponse = await bitblogApi.get(`/users`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { limit: 5 },
    });

    const PaginatedBlogs = blogsResponse.data as PaginatedResponse<Blog, 'blogs'>;
    const PaginatedComments = commentsResponse.data as PaginatedResponse<Comment, 'comments'>;
    const PaginatedUsers = usersResponse.data as PaginatedResponse<User, 'users'>;

    return {
      blogsCount: PaginatedBlogs.total,
      commentsCount: PaginatedComments.total,
      usersCount: PaginatedUsers.total,
      blogs: PaginatedBlogs.blogs,
      comments: PaginatedComments.comments,
      users: PaginatedUsers.users,
    } as DashboardData;


  } catch (error) {
    if (error instanceof AxiosError) {
      // Si es un error de Axios, lo transformamos en una `Response`
      // para que el ErrorBoundary pueda leer el status y los datos.
      throw data({ message: error.response?.data?.message || error.message }, {
        status: error.response?.status || error.status,
        statusText: error.response?.statusText || "Error"
      });
    }

    // Para cualquier otro tipo de error (de red, de código, etc.),
    // lo relanzamos para que el ErrorBoundary lo capture como un `Error` estándar.
    throw error;
  }
}

export default dashboardLoader;