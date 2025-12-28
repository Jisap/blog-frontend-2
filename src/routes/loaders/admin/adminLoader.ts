import { bitblogApi } from "@/api";
import { data, redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import { AxiosError } from "axios";




const adminLoader: LoaderFunction = async () => {

  const accessToken = localStorage.getItem("accessToken");
  console.log("[AdminLoader] Checking token:", !!accessToken);

  if (!accessToken) {
    console.warn("[AdminLoader] No token found, redirecting to /");
    return redirect("/");
  }


  try {
    console.log("[AdminLoader] Fetching /users/current");
    const { data } = await bitblogApi.get(`/users/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })


    const userRole = data?.data?.role;


    if (userRole !== "admin") {
      return redirect("/");
    }

    return data.data;


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