"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useRef, useEffect, useState} from "react"

const SKILLS = [
  "FullStack Developer",
  "Data Analyst",
  "Data Scientist"
]

type SkillsState = {
  skills: []
}

export function Hero() {
  const [skills, setSkills] = useState<String>();
  const skillsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    
    skillsRef.current = setInterval(() => {
  SKILLS.map(skill =>{
      skill.split('').map(s => {
        setInterval(() => {
          setSkills(prev => prev + s)
        }, 300)
      })
  })

    }, 1000)

  }, [])
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4"></motion.div>

        <motion.img
          src="/david-photo.jpg"
          alt="David Photo"
          className="w-50 h-50 rounded-full mx-auto mb-6 border-4 border-primary"
        ></motion.img>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-2xl lg:text-3xl font-bold mb-4 text-balance"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Hi, my name is <span className="text-pink-600">David Akah</span>
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60"></span>
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-muted-foreground text-balance"
        >
          I build exceptional digital experiences
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty"
        >
          I'm a fullstack developer specializing in building scalable web
          applications with modern technologies. Currently focused on creating
          accessible, user-centered products.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <a
            href="#about"
            className="inline-block text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
