import { Page } from "@/components/Page";
import { cn } from "@/lib/utils";



export const ComponentAbout = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in duration-500">
      {/* Encabezado */}
      <div className="space-y-6 text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          About BitBlog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A space dedicated to modern web development, sharing insights on the MERN stack, and building a community of passionate developers.
        </p>
      </div>

      {/* Contenido Principal */}
      <div className="grid gap-12 md:grid-cols-2">

        {/* Sección Misión */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed text-balance">
            BitBlog was born from the idea that knowledge grows when shared.
            Our goal is to provide high-quality tutorials, deep dives into code,
            and practical examples that help developers of all levels master the art of software engineering.
          </p>
        </div>

        {/* Sección Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Built with MERN</h2>
          <p className="text-muted-foreground leading-relaxed text-balance">
            This platform isn't just about code; it's built with the very technologies we write about.
            We leverage the full power of the MERN stack to deliver a fast and seamless experience:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
            <li><span className="font-medium text-foreground">M</span>ongoDB for flexible data storage.</li>
            <li><span className="font-medium text-foreground">E</span>xpress.js for a robust backend API.</li>
            <li><span className="font-medium text-foreground">R</span>eact for a dynamic user interface.</li>
            <li><span className="font-medium text-foreground">N</span>ode.js for scalable server-side logic.</li>
          </ul>
        </div>
      </div>

    </div>
  )
}



export const About = () => {
  return (
    <Page>
      <ComponentAbout />
    </Page>
  );
};
