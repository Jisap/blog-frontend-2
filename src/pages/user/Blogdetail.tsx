import { Page } from "@/components/Page";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useMemo } from "react";
import Avatar from "react-avatar";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "sonner";


import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftIcon, Facebook, LinkedinIcon, LinkIcon, MessageSquareIcon, Share, ShareIcon, ThumbsUpIcon, TwitterIcon } from "lucide-react";
import type { Blog } from "@/types";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu"
import { getReadingTime, getUsername } from "@/lib/utils";


interface ShareDropdownProps extends DropdownMenuProps {
  blogTitle: string,
}

export const ShareDropdown = ({ blogTitle, children, ...props }: ShareDropdownProps) => {

  const blogUrl = window.location.href;
  const shareText = 'Just read this insightful article and wanted to share!'

  const SHARE_LINKS = useMemo(() => {
    return {
      x: `https://x.com/intent/post?url=${encodeURIComponent(
        blogUrl
      )}&text=${encodeURIComponent(`${shareText} "${blogTitle}"`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        blogUrl
      )}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        blogUrl
      )}&title=${encodeURIComponent(blogTitle)}&summary=${encodeURIComponent(
        shareText
      )}`,
    };
  }, [blogTitle, blogUrl])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
      console.log("Error copying link:", error);
    }
  }, [blogUrl]);

  const shareOnSocial = useCallback((platformUrl: string) => {  // Abre una nueva pestaña con la red social donde queremos compartir el link a nuestro artículo de blog
    window.open(platformUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[240px]">
        <DropdownMenuItem onSelect={handleCopy}>
          <LinkIcon />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.x)}>
          <TwitterIcon />
          Share on X
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.facebook)}>
          <Facebook />
          Share on Facebook
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.facebook)}>
          <LinkedinIcon />
          Share on Linkedin
        </DropdownMenuItem>

        <DropdownMenuSeparator />

      </DropdownMenuContent>
    </DropdownMenu>
  )
}



export const BlogDetail = () => {

  const navigate = useNavigate();
  const { blog } = useLoaderData() as { blog: Blog };
  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editable: false,
    autofocus: false,
  });

  return (
    <Page>
      <article className="relative container max-w-[720px] pt-6 pb-12">
        <Button
          variant="outline"
          size="icon"
          className="sticky top-2'' -ms-16"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
        </Button>

        <h1 className="text-4xl leading-tight font-semibold -mt-10">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 my-8">
          <div className="flex items-center gap-3">
            <Avatar email={blog.author.email} size="32" round />

            <span>
              {getUsername(blog.author)}
            </span>
          </div>

          {/* Sobreescribimos los valores por defecto de data-[orientation=vertical] para que el separador sea un círculo */}
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full"
          />

          <div className="text-muted-foreground">
            {getReadingTime(editor.getText() || "")} min read
          </div>

          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full"
          />

          <div className="text-muted-foreground">
            {new Date(blog.publishedAt).toLocaleString("en-US", {
              dateStyle: "medium",
            })}
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-2 my-2">
          <Button variant="ghost">
            <ThumbsUpIcon />
            {blog.likesCount}
          </Button>

          <Button variant="ghost">
            <MessageSquareIcon />
            {blog.commentsCount}
          </Button>

          <ShareDropdown blogTitle={blog.title}>
            <Button variant="ghost" className="ms-auto">
              <ShareIcon />
              Share
            </Button>
          </ShareDropdown>
        </div>

        <Separator />

        <div className="my-8">
          <AspectRatio
            ratio={21 / 9}
            className="overflow-hidden rounded-xl bg-border"
          >
            <img
              src={blog.banner.url}
              width={blog.banner.width}
              height={blog.banner.height}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>

        <EditorContent
          editor={editor}
        />
      </article>
    </Page>
  )
}