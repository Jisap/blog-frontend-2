import { useEffect, useState } from "react";
import type { User } from "@/types";

export type UserResponse = Pick<User, "username" | "email" | "role">; // exportamos el tipo de la respuesta


// El propósito de este hook es obtener la información del usuario que ha iniciado sesión 
// y que está guardada en el localStorage del navegador. La idea es que cualquier componente 
// que necesite saber quién es el usuario actual pueda usar este hook para acceder a esa información de forma sencilla.


export const useUser = () => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (userJson) {
      const user = JSON.parse(userJson) as UserResponse;
      setUser(user);
    }
  }, [])

  return user
}