import { BlogForm } from "@/components/BlogForm";
import { cn } from "@/lib/utils"
import { useFetcher } from "react-router"
import { toast } from "sonner"




export const BlogCreate = () => {

  const fetcher = useFetcher();                          // Instancia del fetcher para interactuar con las acciones o loaders de ruta
  const isSubmitting = fetcher.state === "submitting";   // Se utiliza fetcher state para saber si se está enviando -> modifica ui 

  return (
    <div className={
      cn(
        "max-w-3xl w-full mx-auto p-4",
        isSubmitting && "opacity-50 pointer-events-none"
      )
    }>
      <BlogForm
        onSubmit={({ banner_image, title, content }, status) => {
          if (!banner_image) return;

          const formData = new FormData();
          formData.append("banner_image", banner_image);
          formData.append("title", title);
          formData.append("content", content);
          formData.append("status", status);
          console.log("FormData", formData)
          const submitPromise = fetcher.submit(formData, { // Este submit llama a la action -> llama a la api con la data
            method: "post",
            encType: "multipart/form-data",
          });

          toast.promise(submitPromise, {
            loading: "Publishin blog...",
            success: {
              message: "Blog published successfully!",
              description: "Your blog is now live and visible to everyone.",
            },
            error: {
              message: "Failed to publish blog",
              description: "Something went wrong while publishing your blog. Please try again later.",
            }
          })
        }} />
    </div>
  )
}


