import { bitblogApi } from "@/api";
import { data, redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import { AxiosError } from "axios";




const adminLoader: LoaderFunction = async () => {

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return redirect("/");


  try {

    const { data } = await bitblogApi.get(`/users/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (data.user.role !== "admin") return redirect("/");

    return data;


  } catch (error) {
    if (error instanceof AxiosError) {
      throw data({ message: error.response?.data?.message || error.message }, {
        status: error.response?.status || error.status,
        statusText: error.response?.statusText || "Error"
      });
    }

    // Para cualquier otro tipo de error (de red, de código, etc.),
    // lo relanzamos para que el ErrorBoundary lo capture como un `Error` estándar.
    throw error;
  }
}

export default adminLoader;