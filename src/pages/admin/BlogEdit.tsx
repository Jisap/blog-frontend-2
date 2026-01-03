import { BlogForm } from "@/components/BlogForm";
import { useFetcher, useLoaderData } from "react-router"
import { toast } from "sonner"
import { useEffect, useRef } from "react";
import type { ActionResponse, Blog } from "@/types";



export const BlogEdit = () => {

  const loaderData = useLoaderData() as { blog: Blog };
  const fetcher = useFetcher();
  const data = fetcher.data as ActionResponse;

  const isSubmitting = fetcher.state !== "idle";
  const wasSubmitting = useRef(false);


  const blog = loaderData.blog;

  useEffect(() => {
    // Solo mostramos el toast si estábamos enviando (wasSubmitting) y ya terminamos (!isSubmitting)
    if (wasSubmitting.current && !isSubmitting && data) {
      if (data.ok) {
        toast.success("Changes Saved successfully!", {
          description: "Your updates have been saved and applied.",
        });
      } else {
        toast.error("Failed to save change", {
          description: "Something went wrong while saving. Please try again later.",
        });
      }
    }

    // Actualizamos la referencia para el próximo render
    wasSubmitting.current = isSubmitting;
  }, [isSubmitting, data]);

  return (
    <div className="max-w-3xl w-full mx-auto p-4">
      <BlogForm
        defaultValue={{
          bannerUrl: blog.banner.url,
          title: blog.title,
          content: blog.content,
          status: blog.status
        }}
        onSubmit={({ banner_image, title, content }, status) => {

          const formData = new FormData();

          if (banner_image) formData.append("banner_image", banner_image);
          if (title !== blog.title) formData.append("title", title);
          if (content !== blog.content) formData.append("content", content);
          if (status !== blog.status) formData.append("status", status);
          formData.append("blogId", blog._id);

          fetcher.submit(formData, { // Este submit llama a la action -> llama a la api con la data
            method: "put",
            encType: "multipart/form-data",
          });
        }} />
    </div>
  )
}
