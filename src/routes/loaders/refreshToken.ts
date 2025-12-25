
import { redirect, data } from "react-router";
import { bitblogApi } from "@/api";
import type { LoaderFunction } from "react-router";
import { AxiosError } from "axios";

/**
 * Loader para refrescar el token de acceso.
 * Se activa al navegar a /refresh-token?redirect=<ruta_deseada>.
 * Utiliza el refreshToken (almacenado en una cookie httpOnly) para obtener un nuevo accessToken.
 */
const refreshTokenLoader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);                                                  // Obtiene la URL a la que se debe redirigir al usuario después de refrescar el token.
  const redirectUri = url.searchParams.get("redirect") ?? "/";

  try {
    const { data } = await bitblogApi.post(                                          // Realiza la petición al backend para obtener un nuevo accessToken.
      "/auth/refresh-token",
      {},
      { withCredentials: true }                                                      // withCredentials: true es crucial para enviar la cookie httpOnly con el refreshToken.
    );


    localStorage.setItem("accessToken", data.accessToken);                           // Almacena el nuevo accessToken en el localStorage.


    return redirect(redirectUri);                                                    // Redirige al usuario a la página que originalmente quería visitar.
  } catch (error) {
    if (error instanceof AxiosError) {
      // Si el refresco de token falla con 400 (Bad Request) o 401 (Unauthorized),
      // asumimos que el refreshToken ha expirado o es inválido.
      // Esto cubre tanto los errores 401 del controlador como un posible 400
      // de un middleware que se ejecute antes.
      const isAuthError = error.response?.status === 400 || error.response?.status === 401;

      if (isAuthError) {
        // Si el refreshToken expiró, la sesión del usuario ha terminado.
        // Limpiamos el localStorage y lo enviamos a la página de login.
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        return redirect("/login");
      }

      // Si es otro tipo de error (ej. el servidor no responde), lanzamos una respuesta de error
      // para que sea capturada por el errorElement más cercano en el árbol de rutas.
      throw data({ message: error.response?.data?.message || error.message }, {
        status: error.response?.status || error.status,
        statusText: error.response?.statusText || "Error"
      });
    }
  }
}

export default refreshTokenLoader