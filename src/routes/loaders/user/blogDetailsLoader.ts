import { bitblogApi } from "@/api";
import { data, redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import type { Blog, PaginatedResponse } from '@/types';
import { AxiosError } from "axios";




const blogDetailLoader: LoaderFunction = async ({ params }) => {

  const slug = params.slug;

  try {
    const { data } = await bitblogApi.get(`/blogs/${slug}`)
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

export default blogDetailLoader;