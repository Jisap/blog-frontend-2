import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Toggle } from "@/components/ui/toggle"
import { EyeClosedIcon, EyeIcon } from "lucide-react";

// Omit es un tipo de utilidad de TypeScript que construye un nuevo tipo a partir de uno existente,
// pero eliminando las propiedades que se especifiquen. 
// En este caso, está tomando todas las propiedades del <input> y omitiendo (quitando) la propiedad type.
// Se controlará si el type es "password" o "text" dependiendo del estado del Toggle.

type InputPasswordProps = Omit<React.ComponentProps<"input">, "type">;

export const InputPassword: React.FC<InputPasswordProps> = ({ className, ...props }) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(
          "pe-12 placeholder:tracking-normal",
          !showPassword && "tracking-widest",
          className
        )}
        {...props}
      />

      <Toggle
        type="button"
        pressed={showPassword}
        onPressedChange={setShowPassword}
        className="absolute top-1/2 -translate-y-1/2 right-1 size-8"
      >
        {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
      </Toggle>
    </div>
  )
}