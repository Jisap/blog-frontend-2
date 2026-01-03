import { bitblogApi } from "@/api";
import type { LoaderFunction } from "react-router";
import { AxiosError } from "axios";

const getCommentsByBlogLoader: LoaderFunction = async ({ params }) => {
  const { blogId } = params;
  const accessToken = localStorage.getItem("accessToken");

  // Si tel backend requiere autenticación para ver comentarios, retornamos vacío si no hay token.
  // Si es público, puedes quitar esta verificación.
  //if (!accessToken) {
  //  return [];
  //}

  try {
    const { data } = await bitblogApi.get(`/comments/blog/${blogId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Manejo robusto de la estructura de respuesta
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.comments)) return data.comments; // Patrón común en tu proyecto
    if (data.data && Array.isArray(data.data)) return data.data;

    return [];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching comments:", error.response?.data);
    }
    return [];
  }
};

export default getCommentsByBlogLoader;
