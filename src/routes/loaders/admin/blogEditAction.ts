import { bitblogApi } from "@/api";
import { redirect, type ActionFunction } from "react-router";
import { AxiosError } from "axios";
import type { ActionResponse } from "@/types";



const blogEditAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();               // Publish or draft
  const slug = params.slug;                                // Slug desde la ruta
  const accessToken = localStorage.getItem("accessToken"); // Token de acceso

  if (!accessToken) {
    return redirect("/login");
  }

  try {
    const response = await bitblogApi.put(`/blogs/${slug}`, formData, {
      headers:{
        Authorization: `Bearer ${accessToken}`,
        "Content-Encoding": "multipart/form-data"
      }
    });

    const responseData = response.data;

    return {
      ok: true,
      data: responseData
    } as ActionResponse

  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        err: error.response?.data
      } as ActionResponse
    }

    throw error;
  }

}

export default blogEditAction