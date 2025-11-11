"use client"

import { motion } from "framer-motion"
import { Moon, Sun, ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { portfolioConfig } from "@/portfolio.config"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const UnderConstruction = () => (
  <Alert className="mt-8 border-primary/50 text-primary">
    <Construction className="h-4 w-4" />
    <AlertTitle>Work in Progress</AlertTitle>
    <AlertDescription>
      This section is currently under construction. New articles will be published soon!
    </AlertDescription>
  </Alert>
)

export default function Articles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const isWip = portfolioConfig.wip.articles

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
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles</h1>
          <p className="text-lg text-muted-foreground">
            Coming soon — thoughts on DevOps, MLOps, and infrastructure
          </p>
        </motion.section>

        {isWip ? <UnderConstruction /> : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Articles will appear here soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
