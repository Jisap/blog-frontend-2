import { Outlet } from "react-router"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import TopAppBar from "../TopAppBar"
import AppSidebar from "../AppSidebar"

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="relative max-h-[calc(100dvh-16px)] overflow-auto">
        <TopAppBar />

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )

}