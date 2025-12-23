import { cn } from "@/lib/utils"
import { Logo } from "./Logo"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";


const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/bitblog",
    Icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/bitblog",
    Icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/bitblog",
    Icon: Linkedin,
    label: "Linkedin",
  },
  {
    href: "https://www.youtube.com/channel/UC-8-y-7-9-5-6-2",
    Icon: Youtube,
    label: "Youtube",
  },
] as const;


export const Footer = ({ className, ...props }: React.ComponentProps<"footer">) => {
  return (
    <footer className={cn("border-t", className)}>
      <div className="container py-8 grid max-md:justify-items-center md:grid-cols-[1fr_3fr_1fr] md:items-center">
        <Logo />

        <p className="text-muted-foreground order-1 max-md:text-center md:order-none md:justify-self-center">
          &copy; {new Date().getFullYear()} BitBlog. All rights reserved.
        </p>

        <ul className="flex items-center gap-1 max-md:mt-6 max-md:mb-4 md:justify-self-end">
          {SOCIAL_LINKS.map(({ href, Icon, label }) => (
            <li key={href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    arial-label={label}
                    asChild
                  >
                    <a href={href} target="_blank">
                      <Icon />
                    </a>
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  {label}
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

