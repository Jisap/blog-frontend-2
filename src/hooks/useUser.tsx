import { useEffect, useState } from "react";
import type { User } from "@/types";
import { bitblogApi } from "@/api";

export type UserResponse = Pick<User, "username" | "email" | "role" | "_id">; // exportamos el tipo de la respuesta


// El propósito de este hook es obtener la información del usuario que ha iniciado sesión 
// y que está guardada en el localStorage del navegador. La idea es que cualquier componente 
// que necesite saber quién es el usuario actual pueda usar este hook para acceder a esa información de forma sencilla.


export const useUser = () => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (userJson) {
      const parsedUser = JSON.parse(userJson) as UserResponse;

      // Si el usuario almacenado no tiene _id pero tenemos un token, intentamos recuperarlo del backend
      if (!parsedUser._id && accessToken) {
        bitblogApi.get("/users/current", {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
          .then(({ data }) => {
            const fetchedUser = data?.data || data?.user || data;
            const updatedUser = { ...parsedUser, _id: fetchedUser._id || fetchedUser.id };
            localStorage.setItem("user", JSON.stringify(updatedUser)); // Actualizamos localStorage para futuras cargas
            setUser(updatedUser);
          })
          .catch((error) => {
            console.error("Failed to fetch user details in useUser", error);
            setUser(parsedUser); // Fallback: usamos lo que tenemos
          });
      } else {
        setUser(parsedUser);
      }
    }
  }, [])

  return user
}