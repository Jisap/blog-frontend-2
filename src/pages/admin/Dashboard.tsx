import { BlogTable, columns } from "@/components/BlogTable";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import type { DashboardData } from "@/routes/loaders/admin/dashboardLoader";
import { MessageSquareIcon, TextIcon, UsersRoundIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router";



export const Dashboard = () => {

  const loaderData = useLoaderData() as DashboardData;
  console.log("loaderData", loaderData);
  const loggedInUser = useUser();


  return (
    <div className="container p-4 space-y-4">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total Articles */}
        <Card className="gap-4 py-4">
          <CardHeader className="flex items-center gap-2.5 px-4">
            <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
              <TextIcon size={18} />
            </div>

            <CardTitle className="font-normal text-lg">
              Total Articles
            </CardTitle>
          </CardHeader>

          <CardContent className="text-4xl tracking-wider px-4">
            {loaderData.blogsCount}
          </CardContent>
        </Card>

        {/* Total Comments */}
        <Card className="gap-4 py-4">
          <CardHeader className="flex items-center gap-2.5 px-4">
            <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
              <MessageSquareIcon size={18} />
            </div>

            <CardTitle className="font-normal text-lg">
              Total Comments
            </CardTitle>
          </CardHeader>

          <CardContent className="text-4xl tracking-wider px-4">
            {loaderData.commentsCount}
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="gap-4 py-4">
          <CardHeader className="flex items-center gap-2.5 px-4">
            <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
              <UsersRoundIcon size={18} />
            </div>

            <CardTitle className="font-normal text-lg">
              Total Users
            </CardTitle>
          </CardHeader>

          <CardContent className="text-4xl tracking-wider px-4">
            {loaderData.usersCount}
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <Card className="gap-4 py-4">
        <CardHeader className="flex items-center gap-2.5 px-4">
          <div className="bg-muted text-muted-foreground max-w-max p-2 rounded-lg">
            <TextIcon size={18} />
          </div>

          <CardTitle className="font-normal text-lg">
            Recent Article
          </CardTitle>

          <CardAction className="ms-auto">
            <Button
              variant="link"
              size="sm"
              asChild
            >
              <Link to="/admin/blogs">
                See all
              </Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="px-4">
          <BlogTable
            columns={columns}        // Esquema de contrucción de la tabla
            data={loaderData.blogs}  // Datos del loader 
          />
        </CardContent>
      </Card>

    </div>
  )
}

