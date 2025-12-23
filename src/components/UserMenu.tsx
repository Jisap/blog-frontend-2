import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Avatar from "react-avatar"
import { useLogout } from "@/hooks/useLogout";
import { SettingsDialog } from "./SettingsDialog";

// SettingsDialog es un componente que encapsula la lógica y la interfaz visual para editar la configuración 
// del usuario (perfil y contraseña) dentro de una ventana modal (diálogo).

export const UserMenu = () => {

  const user = useUser();

  const logout = useLogout();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Avatar
              email={user.email}
              size="28"
              className="rounded-sm"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar
                email={user.email}
                size="32"
                className="rounded-lg"
              />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="truncate font-medium">
                  {user.username}
                </div>
                <div className="truncate text-xs">
                  {user.email}
                </div>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {user.role === "admin" && (
              <DropdownMenuItem asChild>
                <Link to="/admin/dashboard" viewTransition>
                  <LayoutDashboardIcon />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}

            <SettingsDialog>
              {/* DropdownMenuItem se pasa como hijo de SettingsDialog que es un DialogTrigger */}
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
            </SettingsDialog>

            <DropdownMenuItem onClick={logout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
