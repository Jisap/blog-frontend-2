import { data } from "react-router";
import { bitblogApi } from "@/api";
import type { LoaderFunction } from "react-router";
import type { Blog, PaginatedResponse } from "@/types";
import { AxiosError } from "axios";

export interface HomeLoaderResponse {
  recentBlog: PaginatedResponse<Blog, "blogs">,
  allBlog: PaginatedResponse<Blog, "blogs">
};

const homeLoader: LoaderFunction = async () => {
  try {
    // const accessToken = localStorage.getItem("accessToken");
    // const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    const { data: recentBlog } = await bitblogApi.get("/blogs", {
      params: { limit: 4 },
      //headers,
    })

    const { data: allBlog } = await bitblogApi.get("/blogs", {
      params: {
        offset: 4,
        limit: 12,
      },
      //headers,
    });

    return { recentBlog, allBlog } as HomeLoaderResponse

  } catch (error) {
    if (error instanceof AxiosError) {
      throw data({ message: error.response?.data?.message || error.message }, {
        status: error.response?.status || error.status,
        statusText: error.response?.statusText || "Error"
      });
    }
  }
}

export default homeLoader