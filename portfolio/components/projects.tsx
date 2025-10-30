"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

const projects = [
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, ",
      image: "/task-management-dashboard.png",
      tech: ["React", "Tailwind", "css", "Html"],
      github: "https://github.com/EliasAkah/full-stack/tree/master/frontend-development/React_Projects/Management_App",
      
    },
    {
      title: "Food Order Application",
      description:
        "A mini food order application that is used to practise the form submission aspect of React",
      image: "/people-taking-photos-food.jpg",
      tech: ["React", "Tailwind", "css", "MySQL"],
      github: "https://github.com/EliasAkah/full-stack/tree/master/frontend-development/REACT_CONCEPTS/Food-Order-App",
      
    },
    {
      title: "Weather Forecast App",
      description:
        "A beautiful weather application with location-based forecasts, and detailed weather information.",
image: "/weather-app-interface.png",
      tech: ["javascript", "css", "Weather API", "HTML"],
      github:
        "https://github.com/EliasAkah/full-stack/tree/master/frontend-development/javascript%20projects/Weather_App",
    },
    {
      title: "React Meetups",
      description:
        "A minimal meetup management application allowing users to create, manage, and join local meetups.",
      image: "/cms-admin-interface.jpg",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/yourusername/portfolio-cms",
    },
  ];

  return (
    <section id="projects" className="py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-card rounded-lg border border-border overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-video">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-primary/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-background rounded-full"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-background rounded-full"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </motion.a>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="flex-1 bg-transparent"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
