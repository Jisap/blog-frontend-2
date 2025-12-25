import { Button } from "@/components/ui/button";
import { isRouteErrorResponse, Navigate, useLocation, useNavigate, useRouteError } from "react-router";


export const RootErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation(); // ruta donde se produjo el error

  if (isRouteErrorResponse(error)) {
    // `error.data` es el objeto que lanzamos desde el loader: { message: "..." }
    // Accedemos a la propiedad `message` para comprobar el texto del error.
    // Usamos `?.` (optional chaining) para evitar errores si `data` o `message` no existen.
    const isAccessTokenExpired = error.status === 401 && typeof error.data?.message === 'string' && error.data.message.includes("token expired");

    if (isAccessTokenExpired) {
      // si el token ha expirado, redirige al usuario a la página de refresco de token
      // y despues de refrescarlo, redirige al usuario a la página original.
      return <Navigate to={`/refresh-token?redirect=${location.pathname}`} />
    }

    // Si el error viene del refreshTokenLoader (status 400 o 401), la sesión ha terminado.
    if (location.pathname.startsWith('/refresh-token') && (error.status === 400 || error.status === 401)) {
      // No es necesario limpiar localStorage aquí porque el loader ya lo hizo.
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="h-dvh grid place-content-center place-items-center gap-4">
        <h1 className="text-4xl font-semibold">
          {error.status} {error.statusText}
        </h1>

        {/* Mostramos el mensaje de error que viene en el objeto `data` */}
        <p className="text-muted-foreground max-w-[60ch] text-center text-blanced">
          {error.data?.message || "An unexpected error occurred."}
        </p>

        <Button onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1 className="text-4xl font-semibold">Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    return (
      <h1>Unknown Error</h1>
    )

  }
}