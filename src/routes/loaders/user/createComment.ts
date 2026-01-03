import { bitblogApi } from "@/api";
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

const createCommentAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const blogId = formData.get("blogId");
  const content = formData.get("content");

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("You must be logged in to comment");
    return redirect("/login");
  }

  if (!blogId || !content) {
    toast.error("Content is required");
    return null;
  }

  try {
    // Asumiendo que tu router de comentarios está montado en /comments
    await bitblogApi.post(`/comments/blog/${blogId}`, { content }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    toast.success("Comment posted successfully");
    return { ok: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || "Failed to post comment";
      toast.error(message);
    } else {
      toast.error("An unexpected error occurred");
    }
    return { ok: false };
  }
};

export default createCommentAction;
