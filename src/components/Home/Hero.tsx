import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { motion, type Variants } from "motion/react"


const HERO = {
  headline: "Mastering the Craft, One Bit at a Time",
  text: "This blog is built om a simple principle: the best way to understand a topic is to explain it. Follow along through a growing library if articles that brak down the complexities of modern web development"
} as const;

const containerVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const childVariants: Variants = {
  from: { opacity: 0, filter: "blur(10px)" },
  to: {
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  }
}


export const Hero = ({ className, ...props }: React.ComponentProps<"section">) => {
  return (
    <section className={cn("section", className)} {...props}>
      <motion.div
        className="container"
        initial="from"
        whileInView="to"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl font-semibold text-balance text-center md:text-4xl xl:text-5xl"
          variants={childVariants}
        >
          {HERO.headline}
        </motion.h1>

        <motion.p
          className="text-center text-muted-foreground text-balance mt-5 mb-8 md:text-xl"
          variants={childVariants}
        >
          {HERO.text}
        </motion.p>

        <motion.div
          className="max-w-md mx-auto flex items-center gap-2"
          variants={childVariants}
        >
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            aria-label="Enter your email"
          />

          <Button>
            Subscribe
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}