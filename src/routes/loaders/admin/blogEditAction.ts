import { bitblogApi } from "@/api";
import { redirect, type ActionFunction } from "react-router";
import { AxiosError } from "axios";
import type { ActionResponse } from "@/types";



const blogEditAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();               // Publish or draft
  let blogId = formData.get("blogId") as string;           // ID del blog desde el formData
  const accessToken = localStorage.getItem("accessToken"); // Token de acceso

  if (!accessToken) {
    return redirect("/login");
  }

  try {
    const response = await bitblogApi.put(`/blogs/${blogId}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Encoding": "multipart/form-data"
      }
    });

    const responseData = response.data;
    console.log("Update Success:", responseData);

    return {
      ok: true,
      data: responseData
    } as ActionResponse

  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Update Error:", error.response?.status, error.response?.data);
      return {
        ok: false,
        err: error.response?.data || { message: "Error 404: Route not found or blog not found in backend" }
      } as ActionResponse
    }

    throw error;
  }

}

export default blogEditAction