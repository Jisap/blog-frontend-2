import type { User } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUsername = (user: User): string => {
  const { firstName, lastName, username } = user;

  return firstName || lastName ? [firstName, lastName].join(" ") : username;
}


// Calcula el tiempo estimado de lectura de un texto (como el contenido de un blog) y lo devuelve en minutos.
export const getReadingTime = (content: string): number => {
  const AVG_READING_WPM = 150; // Velocidad promedio de lectura en palabras por minuto

  return Math.ceil(content.split(" ").length / AVG_READING_WPM); // Divide el número total de palabras entre 150. El resultado es el tiempo de lectura en minutos, pero como un número decimal 

}