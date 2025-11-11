"use client"

import { motion } from "framer-motion"
import { Moon, Sun, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Experience() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const experiences = [
    {
      title: "DevOps Engineer & Engineering Manager",
      company: "Renaiss",
      period: "2024 — Present",
      color: "primary",
      achievements: [
        "Infrastructure modernization and cloud architecture optimization",
        "Designed and implemented CI/CD pipelines for automated deployments",
        "Led Kubernetes adoption and container orchestration strategy",
        "Implemented SSO security architecture using Keycloak",
      ],
    },
    {
      title: "Operations Lead",
      company: "Teracode",
      period: "2023",
      color: "cyan-500",
      achievements: [
        "Improved Apache Airflow reliability and workflow orchestration",
        "Enhanced AWS observability with comprehensive monitoring solutions",
        "Optimized cloud infrastructure costs and resource allocation",
      ],
    },
    {
      title: "DevOps Engineer",
      company: "Nextira",
      period: "2020 — 2023",
      color: "blue-500",
      achievements: [
        "Managed 1000+ GPU HPC cluster for high-performance computing workloads",
        "Integrated PyTorch + CUDA environments on AWS for ML training",
        "Implemented Infrastructure as Code using Terraform for cloud provisioning",
      ],
    },
    {
      title: "Software & Cloud Engineer",
      company: "Incluit",
      period: "2019 — 2020",
      color: "slate-500",
      achievements: [
        "Developed cloud platform for HPC clusters using AWS infrastructure",
        "Built automation tools and scripts using Python for operational efficiency",
      ],
    },
  ]

  const skills = {
    "Cloud & DevOps": ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "Helm", "Jenkins", "ArgoCD", "Vault"],
    Programming: ["Python", "Bash", "C", "FastAPI", "CI/CD Pipelines"],
    "AI & ML": ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV", "MLflow"],
    Monitoring: ["Prometheus", "Grafana", "Fluent Bit", "ELK Stack"],
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Theme Toggle */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-6 right-6 z-50">
        <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full bg-transparent">
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience</h1>
          <p className="text-lg text-muted-foreground">5+ years building and managing cloud infrastructure</p>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-l-4 border-l-${exp.color}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-lg font-medium text-foreground">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">{exp.period}</span>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-2xl font-bold mb-8">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-primary">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
