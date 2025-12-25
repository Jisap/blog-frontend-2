import { Link } from "react-router";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatDistanceToNowStrict } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
 

interface BlogCardProps extends React.ComponentProps<"div"> {
  bannerUrl: string;
  bannerWidth: number;
  bannerHeight: number;
  title: string;
  content: string;
  slug: string;
  authorName: string;
  publishedAt: string;
  size?: "default" | "sm"
}

export const BlogCard = ({
  bannerUrl,
  bannerWidth,
  bannerHeight,
  title,
  content,
  slug,
  authorName,
  publishedAt,
  size = "default", // Valor por defecto
  className,
  ...props
}: BlogCardProps) => {

  const editor = new Editor({
    extensions: [StarterKit],
    content,
    editable: false,
    autofocus: false,
  })

  return (
    <Card className={cn(
      "relative group pt-2 h-full @container",
      // Si size es "default", aplica un layout de columna invertida (imagen arriba, texto abajo)
      size === "default" && "flex flex-col-reverse justify-end",
      // Si size es "sm", aplica un layout de grid horizontal (imagen y texto lado a lado)
      size === "sm" && "py-2 grid grid-cols-[1fr_1.15fr] gap-0 items-center",
      className
    )}
    {...props}
    >
      <CardHeader
        className={cn(
          "gap-2",
          // Para el tamaño "sm", el texto va a la derecha de la imagen
          size === "sm" && "content-center order-1 ps-4 py-3"
        )}
      >
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          {/* oculta el nombre del autor cuando el componente Card es más estrecho que 16rem (o 256px) */}
          <p className="@max-3xs:hidden">{authorName}</p>

          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>

          <Tooltip delayDuration={250}>
            <TooltipTrigger>
              {formatDistanceToNowStrict(publishedAt, { addSuffix: true })}
            </TooltipTrigger>

            <TooltipContent>
              {new Date(publishedAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </TooltipContent>
          </Tooltip>
        </div>

        <Link
          to={`/blogs/${slug}`}
          viewTransition
        >
          <CardTitle
            // Cuando el contenedor (el Card) es más ancho que 28rem, el tamaño del título aumenta a `text-2xl`.
            // Por defecto, es `text-xl`.
            className={cn("underline-offset-4 hover:underline leading-tight line-clamp-2",
              // Para el tamaño "default", el título es más grande
              size === "default" && "text-xl @md:text-2xl"
            )}
          >
            {title}
          </CardTitle>
        </Link>

        <CardDescription
          className={cn(
            "line-clamp-2 text-balance",
            size === "sm" && "@max-2xs:hidden"
          )}
        >
          {editor.getText()}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2">
        <Link to={`/blogs/${slug}`} viewTransition>
          <AspectRatio
            ratio={21 / 9}
            className="rounded-lg overflow-hidden"
          >
            <img 
              src={bannerUrl}
              width={bannerWidth}
              height={bannerHeight}
              alt={title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </Link>
      </CardContent>
    </Card>
  )
}

