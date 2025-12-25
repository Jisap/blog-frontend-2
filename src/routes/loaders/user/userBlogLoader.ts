import { bitblogApi } from "@/api";
import { data } from "react-router";
import type { LoaderFunction } from "react-router";
import type { Blog, PaginatedResponse } from '@/types';
import { AxiosError } from "axios";




const userBlogLoader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);

  try {
    const response = await bitblogApi.get("/blogs", {
      params: Object.fromEntries(url.searchParams),
    })

    const data = response.data as PaginatedResponse<Blog, "blogs">

    return data;

  } catch (error) {
    if (error instanceof AxiosError) {
      throw data({ message: error.response?.data?.message || error.message }, {
        status: error.response?.status || error.status,
        statusText: error.response?.statusText || "Error"
      });
    }
  }
}

export default userBlogLoader