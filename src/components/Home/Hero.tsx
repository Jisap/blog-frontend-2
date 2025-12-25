import { cn } from "@/lib/utils"




export const Hero = ({ className, ...props }: React.ComponentProps<"section">) => {
  return (
    <section className={cn("section", className)} {...props}>

    </section>
  )
}