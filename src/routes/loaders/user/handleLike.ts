import { bitblogApi } from "@/api";
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

const handleLikeAction = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const blogId = params.blogId;
  const accessToken = localStorage.getItem("accessToken");

  console.log("handleLikeAction initiated", {
    method: request.method,
    blogId,
    userId,
    hasToken: !!accessToken
  });

  if (!accessToken) {
    console.error("No access token found");
    toast.error("You must be logged in to like posts");
    return redirect("/login");
  }

  // Ensure userId is a string string, not a File or other type
  let userIdStr = userId?.toString();

  // Fallback: If userId is missing in formData, try to get it from localStorage
  if (!userIdStr || userIdStr === "undefined" || userIdStr === "null") {
    console.warn("UserId missing in formData, attempting to retrieve from localStorage");
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        userIdStr = user._id || user.id; // Try both _id and id
        console.log("Retrieved userId from localStorage:", userIdStr);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }

  // Fallback: If userId is still missing, try to fetch it from the backend
  if (!userIdStr || userIdStr === "undefined" || userIdStr === "null") {
    console.warn("UserId missing in localStorage, attempting to fetch from /users/current");
    try {
      const { data } = await bitblogApi.get("/users/current", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const fetchedUser = data?.data || data?.user || data;
      userIdStr = fetchedUser?._id || fetchedUser?.id;
      console.log("Retrieved userId from /users/current:", userIdStr);
    } catch (error) {
      console.error("Failed to fetch current user from API", error);
    }
  }

  if (!userIdStr || userIdStr === "undefined" || userIdStr === "null" || !blogId) {
    console.error("Invalid request data", { userId: userIdStr, blogId });
    toast.error("Invalid request data: Missing User ID or Blog ID. Please Try Logging out and in.");
    return { ok: false };
  }

  try {
    let response;
    if (request.method === "POST") {
      console.log("Sending POST request to like blog");
      response = await bitblogApi.post(`/likes/blog/${blogId}`, { userId: userIdStr }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } else if (request.method === "DELETE") {
      console.log("Sending DELETE request to unlike blog");
      // Explicitly sending data in config, which Axios supports
      response = await bitblogApi.delete(`/likes/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { userId: userIdStr }
      });
    }

    const responseData = response?.data?.data || response?.data?.blog || response?.data || {};

    // Forzamos el estado de 'isLiked' basándonos en la acción que acabamos de realizar (POST o DELETE).
    // Esto asegura que la UI se sincronice con la intención del usuario, incluso si la respuesta del backend no es inmediata o está desactualizada.
    responseData.isLiked = request.method === "POST";

    // Devolvemos los datos del backend para actualizar la UI inmediatamente
    return { ok: true, ...responseData };
  } catch (error) {
    console.error("Like action caught error:", error);
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = data?.message || "Failed to update like status";

      // Si el backend responde que ya dimos like, actualizamos el estado local para sincronizarlo
      if (status === 400 && message === "You already liked this blog") {
        return { ok: true, isLiked: true };
      }

      // Si el backend responde que intentamos quitar un like que no existe, lo sincronizamos
      if (status === 400 && (message === "You have not liked this blog" || message === "Like not found")) {
        return { ok: true, isLiked: false };
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
