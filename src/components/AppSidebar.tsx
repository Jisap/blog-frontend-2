import { Link, useLocation } from "react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "./ui/sidebar"
import { Logo } from "./Logo"
import { LayoutDashboardIcon, MessageSquareIcon, TextIcon, UserIcon } from "lucide-react";
import type React from "react";
import { SidebarUserMenu } from "./SidebarUserMenu";

const MAIN_MENU = [
  {
    label: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Blogs",
    url: "/admin/blogs",
    icon: TextIcon,
  },
  {
    label: "Comments",
    url: "/admin/comments",
    icon: MessageSquareIcon,
  },
  {
    label: "Users",
    url: "/admin/users",
    icon: UserIcon,
  },

]

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

  const location = useLocation();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

          <SidebarMenu>
            {MAIN_MENU.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  isActive={location.pathname === item.url}
                  tooltip={item.label}
                  asChild
                >
                  <Link to={item.url} viewTransition>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}