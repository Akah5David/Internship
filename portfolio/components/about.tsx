"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Rocket, Users } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed and efficiency",
    },
    {
      icon: Users,
      title: "User-Focused",
      description: "Creating intuitive experiences that users love",
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Hi there! I'm a passionate Fullstack Developer, Data Analyst, and
              Data Scientist dedicated to building scalable, user-friendly, and
              data-driven applications. I love transforming ideas into impactful
              digital experiences — from modern web apps to insightful data
              visualizations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I specialize in developing scalable web applications, building
              clean RESTful APIs, and uncovering valuable insights from data
              using modern tools and technologies. Whether it’s crafting an
              engaging user interface, optimizing backend performance, or
              analyzing complex datasets, I’m driven by the goal of solving
              real-world problems through innovation and precision.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              When I’m not coding or analyzing data, I’m exploring new
              technologies, contributing to open-source projects, and sharing
              knowledge with the tech community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border"
              >
                <motion.div
                  className="p-3 bg-primary/10 rounded-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
