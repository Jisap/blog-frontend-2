import { Fragment, useMemo } from "react"
import { Link, useLocation, useMatches } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { UIMatch } from "react-router";

/**
 * Define la estructura del objeto `handle` que nuestras rutas pueden tener.
 * El `breadcrumb` puede ser un texto estático o una función para generar un texto dinámico (ej: a partir de datos del loader).
 */
type HandleType = {
  breadcrumb?:
    | string
    | ((args: {
        params: Record<string, string | undefined>;
        data: unknown;
    }) => string);
}

/**
 * Componente dinámico que renderiza la navegación de "migas de pan" (breadcrumb).
 * Lee la jerarquía de rutas activas y muestra un breadcrumb para aquellas que tengan
 * una propiedad `breadcrumb` en su `handle`.
 */
export const AppBreadcrumb = () => {

  // `useMatches` nos da un array de las rutas que coinciden con la URL actual.
  // El array contiene todas las rutas que te llevan a esta página.
  // matches contiene: pathname (url actual), params, data (data de un loader) y handle
  // Hacemos un casting para que TypeScript conozca la forma de nuestro `handle`.
  const matches = useMatches() as UIMatch<unknown, HandleType>[];
  const location = useLocation();

  // `useMemo` para calcular los "crumbs" (las migas de pan) solo cuando las rutas cambian.
  const crumbs = useMemo(
    // 1. Filtramos para quedarnos solo con las rutas que tienen un `handle.breadcrumb` definido.
    () => matches.filter((match) => match.handle?.breadcrumb).map((match) => {
      
      const { handle, params, data } = match;
      
      // 2. Determinamos el texto (label) del crumb.
      // Si `breadcrumb` es una función, la ejecutamos para obtener el texto dinámico.
      // Si no, usamos el texto estático directamente.
      const label =
        typeof handle.breadcrumb === "function"
          ? handle.breadcrumb({ params, data })
          : handle.breadcrumb;
        
      // 3. Devolvemos un objeto con el texto y la URL para este crumb.
      return { label, href: match.pathname };
    
    }), [matches]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          // Usamos Fragment para agrupar cada item con su separador.
          <Fragment key={crumb.href}>
            <BreadcrumbItem className="hidden md:block">
              {/* Si el crumb corresponde a la página actual, lo mostramos como texto. */}
              {crumb.href === location.pathname
                ? (<BreadcrumbPage>{crumb.label}</BreadcrumbPage>)
                // Si no, lo mostramos como un enlace.
                : (<BreadcrumbLink asChild>
                    <Link to={crumb.href} viewTransition>
                      {crumb.label}
                    </Link>
                </BreadcrumbLink>)
              }
            </BreadcrumbItem>
            {/* Añadimos un separador, excepto para el último elemento. */}
            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
