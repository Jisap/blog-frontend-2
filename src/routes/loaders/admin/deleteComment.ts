import { bitblogApi } from "@/api";
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

const deleteCommentAction = async ({ request }: ActionFunctionArgs) => {
  // Solo procesamos peticiones DELETE
  if (request.method !== "DELETE") {
    return null;
  }

  const formData = await request.formData();
  const commentId = formData.get("commentId");
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("You must be logged in");
    return redirect("/login");
  }

  if (!commentId) {
    toast.error("Invalid comment ID");
    return null;
  }

  try {
    await bitblogApi.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    toast.success("Comment deleted successfully");
    return null; // Retornar null dispara la revalidación de los loaders (actualizando la lista)
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || "Failed to delete comment";
      toast.error(message);
    } else {
      toast.error("An unexpected error occurred");
    }
    return null;
  }
};

export default deleteCommentAction;
