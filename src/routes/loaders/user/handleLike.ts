import { bitblogApi } from "@/api";
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Helper para validar IDs
const isValidId = (id: string | undefined | null) => !!id && id !== "undefined" && id !== "null";

// Helper para obtener el ID del usuario de múltiples fuentes (FormData, LocalStorage, API)
const getUserId = async (formData: FormData, accessToken: string) => {
  let userId = formData.get("userId")?.toString();
  if (isValidId(userId)) return userId;

  // 1. Intentar recuperar desde localStorage
  try {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      userId = user._id || user.id;
      if (isValidId(userId)) return userId;
    }
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
  }

  // 2. Intentar recuperar desde el backend (/users/current)
  try {
    const { data } = await bitblogApi.get("/users/current", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const fetchedUser = data?.data || data?.user || data;
    userId = fetchedUser?._id || fetchedUser?.id;
    if (isValidId(userId)) return userId;
  } catch (e) {
    console.error("Failed to fetch current user from API", e);
  }

  return undefined;
};

const handleLikeAction = async ({ request, params }: ActionFunctionArgs) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("You must be logged in to like posts");
    return redirect("/login");
  }

  const formData = await request.formData();
  const userId = await getUserId(formData, accessToken);
  const blogId = params.blogId;

  if (!userId || !blogId) {
    console.error("Invalid request data", { userId, blogId });
    toast.error("Invalid request data: Missing User ID or Blog ID. Please Try Logging out and in.");
    return { ok: false };
  }

  try {
    const isLike = request.method === "POST";
    const endpoint = `/likes/blog/${blogId}`;
    const headers = { Authorization: `Bearer ${accessToken}` };

    const response = isLike
      ? await bitblogApi.post(endpoint, { userId }, { headers })
      : await bitblogApi.delete(endpoint, { headers, data: { userId } });

    const responseData = response?.data?.data || response?.data?.blog || response?.data || {};

    // Forzamos el estado de 'isLiked' basándonos en la acción realizada para sincronizar la UI
    return { ok: true, ...responseData, isLiked: isLike };

  } catch (error) {
    console.error("Like action caught error:", error);

    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      const message = data?.message || "Failed to update like status";

      // Manejo de errores de sincronización (ya dado like / no dado like)
      if (status === 400) {
        if (message === "You already liked this blog") {
          return { ok: true, isLiked: true };
        }
        if (message === "You have not liked this blog" || message === "Like not found") {
          return { ok: true, isLiked: false };
        }
      }

      console.error("Axios Error Details:", { status, data });
      toast.error(`Error ${status}: ${message}`);
    } else {
      toast.error("An unexpected error occurred");
    }
    return { ok: false };
  }
};

export default handleLikeAction;
