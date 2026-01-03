import { bitblogApi } from "@/api";
import { data, redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import { AxiosError } from "axios";
import type { Blog, Comment, User } from "@/types";



export type DashboardData = {
  blogsCount: number;
  commentsCount: number;
  usersCount: number;
  blogs: Blog[];
  comments: Comment[];
  users: User[];
}

const allCommentLoader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);                                                   // Obtiene la URL a la que se debe redirigir al usuario después de refrescar el token.                           
  const accessToken = localStorage.getItem("accessToken");                            // Obtiene el accessToken de la sesión del usuario.
  if(!accessToken) return redirect("/");                                              // Si no hay accessToken, redirige al usuario a la página de login.

  try {

    const { data } = await bitblogApi.get(`/comments`, {
      params: Object.fromEntries(url.searchParams.entries()),                         // Obtiene los parámetros de la URL y los pasa como parámetros a la petición.
      headers: { Authorization: `Bearer ${accessToken}` },                            // Añade el accessToken como header a la petición.
    });

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

export default allCommentLoader;