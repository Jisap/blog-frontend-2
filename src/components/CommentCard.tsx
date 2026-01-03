import { formatDistanceToNow } from "date-fns"
import Avatar from "react-avatar"
import { Link, useFetcher } from "react-router"
import { Button } from "./ui/button"
import { AspectRatio } from "./ui/aspect-ratio"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2Icon, SquareArrowOutUpRightIcon, ThumbsUpIcon, TrashIcon } from "lucide-react"
import type { User, Blog } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Props = {
  commentId: string;
  content: string;
  likesCount: number;
  user: User | null;
  blog?: Blog | null;
  createdAt: string;
}


export const CommentCard = ({ commentId, content, likesCount, user, blog, createdAt }: Props) => {

  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle" && fetcher.formData?.get("commentId") === commentId;

  return (
    <div className="@container">
      <div className="group flex flex-col items-start gap-4 p-4 rounded-xl hover:bg-accent/25 @md:flex-row">
        {/* Avatar */}
        <Avatar
          email={user?.email}
          size="40"
          round
        />

        {/* Content */}
        <div className="flex flex-col gap-2 me-auto">
          {/* Author */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="text-sm text-muted-foreground">
                @{user.username}
              </div>
            ) : (
              <div className="text-sm text-destructive/80 italic">
                <Tooltip delayDuration={250}>
                  <TooltipTrigger>
                    Account deleted
                  </TooltipTrigger>

                  <TooltipContent>
                    This account has been deleted.
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            <div className="size-1 rounded-full bg-muted-foreground/50"></div>

            <div className="text-sm text-muted-foreground">
              <Tooltip delayDuration={250}>
                <TooltipTrigger>
                  {formatDistanceToNow(createdAt, { addSuffix: true })}
                </TooltipTrigger>

                <TooltipContent>
                  {new Date(createdAt).toLocaleString("en-US", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* comment content */}
          <div className="max-w-[60ch]">
            {content}
          </div>

          {/* Likes and actions */}
          <div className="flex items-center gap-2 mt-1">
            <Button variant="ghost" aria-label="Like comment">
              <ThumbsUpIcon />

              {likesCount > 0 && (
                <span className="sr-only">Total likes: ${likesCount}</span>
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label="Remove comment"
                  disabled={isDeleting}
                >
                  {isDeleting ? <Loader2Icon className="animate-spin" /> : <TrashIcon />}
                  Remove
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the comment.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    const formData = new FormData();
                    formData.append("commentId", commentId);

                    fetcher.submit(formData, {
                      method: "delete",
                    });
                    toast.info("Deleting comment...");
                  }}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {blog && (
          <>
            <div className="max-w-80 grid grid-cols-[120px_minmax(200px,1fr)] gap-3 @max-3xl:hidden">
              <AspectRatio
                ratio={21 / 9}
                className="rounded-lg overflow-hidden"
              >
                <img
                  src={blog.banner.url}
                  alt={blog.title}
                  width={blog.banner.width}
                  height={blog.banner.height}
                />
              </AspectRatio>

              <div className="line-clamp-3 max-w-[30ch] text-sm text-muted-foreground my-1">
                {blog.title}
              </div>
            </div>

            <Button
              variant="ghost"
              className="@3xl:invisible @xl:group-hover:visible @xl:group-focus-within:visible"
              asChild
            >
              <Link to={`/blogs/${blog.slug}`} viewTransition>
                <span className="@md:hidden">Go to blog</span>
                <SquareArrowOutUpRightIcon />
              </Link>
            </Button>
          </>
        )}

      </div>
    </div>
  )
}
