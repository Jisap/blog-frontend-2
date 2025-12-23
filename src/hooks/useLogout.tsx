import { bitblogApi } from "@/api";
import { useLocation, useNavigate } from "react-router";



export const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await bitblogApi.post("/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true,
      })
    } catch (error) {
      // Ignoramos el error (ej. 401 si el token ya expiró).
      // El objetivo es desloguear al usuario del lado del cliente de todas formas.
      console.error("Logout failed on server, proceeding with client-side cleanup.", error);
    } finally {
      // Esta lógica se ejecuta siempre, con o sin error.
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      if (location.pathname === "/") {
        window.location.reload();
      } else {
        navigate("/", { viewTransition: true });
      }
    }
  }
}