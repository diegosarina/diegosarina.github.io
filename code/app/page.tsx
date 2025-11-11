"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { portfolioConfig } from "@/portfolio.config"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics: string[]
}

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch("https://api.github.com/users/diegosarina")
        const userData = await userResponse.json()
        setAvatarUrl(userData.avatar_url)

        const reposResponse = await fetch("https://api.github.com/users/diegosarina/repos?sort=updated&per_page=6")
        let reposData = await reposResponse.json()
        if (Array.isArray(reposData)) {
          reposData = reposData.filter((repo) => !portfolioConfig.excludedRepos.includes(repo.name))
        }
        setRepos(reposData)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const skills = {
    "Cloud & DevOps": ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "Helm", "Jenkins", "ArgoCD", "Vault"],
    Programming: ["Python", "Bash", "C", "FastAPI", "CI/CD Pipelines"],
    "AI & ML": ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV", "MLflow"],
    Monitoring: ["Prometheus", "Grafana", "Fluent Bit", "ELK Stack"],
  }

  const featuredProjects = [
    {
      title: "AI Dental Diagnostic Assistance Platform",
      description:
        "Computer vision proof-of-concept for automatic pathology detection in dental panoramic X-rays using advanced segmentation models. Developed as part of my Postgraduate Specialization in AI at FIUBA.",
      tags: ["PyTorch", "Computer Vision", "Deep Learning", "Medical AI"],
      link: "https://www.youtube.com/watch?v=G-9Ml5SWPg0&t=1s",
      featured: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Theme Toggle */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-6 right-6 z-50">
        <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full bg-transparent">
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex items-center gap-6 mb-8">
            {avatarUrl && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={avatarUrl}
                alt="Diego Sarina"
                className="w-20 h-20 rounded-full border-2 border-primary/30"
              />
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Diego Sarina <span className="inline-block animate-wave">👋</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                DevOps & Cloud Infrastructure Engineer | Machine Learning Specialist
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            I'm an Electronic and DevOps Engineer passionate about building scalable cloud systems and deploying AI
            solutions that bridge research and real-world applications.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="default" asChild>
              <a href="https://github.com/diegosarina" target="_blank" rel="noopener noreferrer" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://linkedin.com/in/diegosarina" target="_blank" rel="noopener noreferrer" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:sarinadiego@gmail.com" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/cv/Diego_Sarina_CV.pdf" download className="gap-2">
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>
        </motion.section>

        {/* About Me Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
            <p>
              I'm an <strong className="text-foreground">Electronic Engineer</strong> with a deep passion 
              for technology and innovation. My career spans over <strong className="text-foreground">5 years 
              of experience</strong> in DevOps and Cloud infrastructure, where I've focused on building robust, 
              scalable systems that bridge the gap between development and operations.
            </p>
            <p>
              I hold a <strong className="text-foreground">Postgraduate Specialization in Artificial Intelligence</strong> from the
              University of Buenos Aires (UBA), where I developed a machine learning platform for dental diagnostics
              using computer vision and deep learning. This project strengthened my interest in applying AI to solve
              real-world challenges in medicine and industry.
            </p>
            <p>
              I'm particularly interested in working on projects that integrate <strong className="text-foreground">AI, DevOps, and cloud technologies </strong>
              to drive innovation in sectors such as <strong className="text-foreground">healthcare, biotechnology, and industrial automation</strong>.
              I’m always looking to collaborate on real-world projects that can make a difference and turn technology into meaningful impact.
            </p>
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View all →
            </Link>
          </div>

          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-primary/30 hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/experience">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Experience</h3>
                  <p className="text-sm text-muted-foreground">5+ years in DevOps, cloud infrastructure, and MLOps</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/projects">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">All Projects</h3>
                  <p className="text-sm text-muted-foreground">Explore my repositories and open-source work</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/articles">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Articles</h3>
                  <p className="text-sm text-muted-foreground">Thoughts on DevOps, MLOps, and infrastructure</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground py-8 border-t border-border/50"
        >
          <p>© 2025 Diego Sarina</p>
        </motion.footer>
      </div>
    </div>
  )
}
