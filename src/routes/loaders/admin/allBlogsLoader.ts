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

const allBlogsLoader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);                                                  // Obtiene la URL a la que se debe redirigir al usuario después de refrescar el token.
  const offset = url.searchParams.get("offset") || 0;                                // Obtiene el offset de la página actual
  const limit = url.searchParams.get("limit") || 10;                                 // Obtiene el limite de blogs por página (por defecto 10)


  try {

    const response = await bitblogApi.get(`/blogs`, {
      params: { offset, limit },
    });

    const data = response.data as PaginatedResponse<Blog, 'blogs'>;
   
    return data;
   
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

export default allBlogsLoader;