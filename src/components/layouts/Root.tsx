import { Outlet } from "react-router";
import Loading from "../Loading";
import { Header } from "../Header";



export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Loading className="z-40" />
      <Header />
      <main className="grow flex flex-col">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}