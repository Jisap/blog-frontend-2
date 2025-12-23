import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"                // Valores que son válidos para el tema

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState); // Crea el canal de comunicación para que cualquier componente hijo pueda acceder al tema

export function ThemeProvider({                                               // Componente principal que proporciona el tema a los componentes hijos 
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {

  const [theme, setTheme] = useState<Theme>(                                  // Inicialización de estado para el tema  
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme         // Obtiene el tema guardado en localStorage o el tema por defecto
  )

  useEffect(() => {                                                           // Cada vez que el tema cambia,
    const root = window.document.documentElement

    root.classList.remove("light", "dark")                                    // Remueve las clases de tema

    if (theme === "system") {                                                 // Si el tema es "system", se aplica el tema del sistema
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)                                                  // Si el tema es "light" o "dark", se aplica el tema correspondiente
  }, [theme])

  const value = {                                                             // Objeto que contiene el tema actual y la función para cambiar el tema
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)                                 // Guarda el tema en localStorage

      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {                                               // Hook personalizado para acceder al tema
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}