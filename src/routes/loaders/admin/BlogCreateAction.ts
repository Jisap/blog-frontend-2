import { bitblogApi } from "@/api";
import { redirect, type ActionFunction } from "react-router";
import { AxiosError } from "axios";
import type { ActionResponse, BlogCreateResponse } from "@/types";



const blogCreateAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();               // Publish or draft

  const accessToken = localStorage.getItem("accessToken"); // Token de acceso

  if (!accessToken) {
    return redirect("/login");
  }

  try {
    const response = await bitblogApi.post(`/blogs`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Encoding": "multipart/form-data"
      }
    });

    const responseData = response.data as BlogCreateResponse;

    return {
      ok: true,
      data: responseData
    } as ActionResponse<BlogCreateResponse>

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

export default blogCreateAction