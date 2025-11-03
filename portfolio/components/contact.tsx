"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "22btrtcn341@jainuniversity.ac.in",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=22btrtcn341@jainuniversity.ac.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9901784813",
      href: "tel:+919901784813",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bangalore, India",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-32 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I'm currently looking for new opportunities and my inbox is always
              open. Whether you have a question or just want to say hi, I'll try
              my best to get back to you!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center gap-3 p-6 bg-card rounded-lg border border-border"
              >
                <motion.div
                  className="p-4 bg-primary/10 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <info.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    {info.label}
                  </p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 text-center text-muted-foreground"
        >
          <p className="font-mono text-sm">
            Built with React, Next.js, Tailwind CSS & Framer Motion
          </p>
          <p className="mt-2 text-sm">
            © 2025 David Akah. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
