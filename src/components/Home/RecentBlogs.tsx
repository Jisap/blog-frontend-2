import { cn } from "@/lib/utils"
import { motion, stagger } from "motion/react"
import { useLoaderData } from "react-router"
import type { Variants } from "motion/react";
import type { HomeLoaderResponse } from '../../routes/loaders/user/homeLoader';
import { BlogCard } from "../BlogCard";





const listVariant: Variants = {
  to: {
    transition: {
      staggerChildren: 0.05,
    }
  }
}

const itemVariant: Variants = {
  from: { opacity: 0 },
  to: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "backInOut",
    }
  }
}

export const RecentBlogs = ({ className, ...props }: React.ComponentProps<"section">) => {

  const { recentBlog } = useLoaderData<HomeLoaderResponse>();
  console.log("recentblog", recentBlog);

  return (
    <section className={cn("section", className)} {...props}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        >
          Recent blog posts
        </motion.h2>

        <motion.ul
          className="grid gap-4 lg:grid-cols-2 lg:grid-rows-3"
          initial="from"
          whileInView="to"
          viewport={{ once: true }}
          variants={listVariant}
        >
          {
            recentBlog.blogs.map(({ slug, banner, title, content, author, publishedAt }, index) => (
              <motion.li
                key={slug}
                variants={itemVariant}
                // La primera tarjeta (index === 0) es más grande y ocupa 3 filas en el grid de LG
                className={cn(index === 0 && "lg:row-span-3")}
              >
                <BlogCard
                  bannerUrl={banner.url}
                  bannerWidth={banner.width}
                  bannerHeight={banner.height}
                  title={title}
                  content={content}
                  slug={slug}
                  authorName={author.firstName && author.lastName ? `${author.firstName} ${author.lastName}` : author.username}
                  publishedAt={publishedAt}
                  // La primera tarjeta es "default", las demás son "sm"
                  size={index > 0 ? "sm" : "default"}
                />
              </motion.li>
            ))
          }
        </motion.ul>
      </div>
    </section>
  )
}
