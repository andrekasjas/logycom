"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"
import Image from "next/image"
import { safeGetItem } from "@/lib/storage-utils"
import { RouteMapModal } from "@/components/route-map-modal"

export default function CognicomPage() {
  const [enrolledModules, setEnrolledModules] = useState<string[]>([])
  const [moduleProgress, setModuleProgress] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    window.scrollTo(0, 0)
    const enrolled = localStorage.getItem("enrolledModules")
    if (enrolled) {
      setEnrolledModules(JSON.parse(enrolled))
    }

    const progress = safeGetItem("cognicom-progress", {})
    const calculatedProgress: { [key: string]: number } = {}

    // Diagnostic module progress (3 activities)
    if (progress.diagnostic) {
      const completed = Object.values(progress.diagnostic).filter(Boolean).length
      calculatedProgress.diagnostic = Math.round((completed / 3) * 100)
    } else {
      calculatedProgress.diagnostic = 0
    }

    // Habilidades module progress (4 activities)
    if (progress.habilidades) {
      const completed = Object.values(progress.habilidades).filter(Boolean).length
      calculatedProgress.habilidades = Math.round((completed / 4) * 100)
    } else {
      calculatedProgress.habilidades = 0
    }

    // Competencias module progress (4 activities)
    if (progress.competencias) {
      const completed = Object.values(progress.competencias).filter(Boolean).length
      calculatedProgress.competencias = Math.round((completed / 4) * 100)
    } else {
      calculatedProgress.competencias = 0
    }

    setModuleProgress(calculatedProgress)
  }, [])

  const handleEnrollModule = (moduleId: string) => {
    if (moduleId === "diagnostic") {
      window.location.href = "/dominios/cognicom/prueba-diagnostica"
      return
    }
    if (moduleId === "habilidades") {
      window.location.href = "/dominios/cognicom/habilidades-comunicativas"
      return
    }
    if (moduleId === "competencias") {
      window.location.href = "/dominios/cognicom/competencias-comunicativas"
      return
    }
    const newEnrolled = [...enrolledModules, moduleId]
    setEnrolledModules(newEnrolled)
    localStorage.setItem("enrolledModules", JSON.stringify(newEnrolled))
  }

  const modules = [
    {
      id: "diagnostic",
      title: "Prueba Diagnóstica",
      description: "Evaluación completa de competencias comunicativas: Comprensión Oral, Lectura y Escritura",
      level: "Evaluación",
    },
    {
      id: "habilidades",
      title: "Habilidades Comunicativas",
      description:
        "Desarrolla escucha activa, habla, lectoescritura y habilidades conversacionales mediante actividades interactivas y dinámicas",
      level: "Básico-Intermedio",
    },
    {
      id: "competencias",
      title: "Competencias Comunicativas",
      description:
        "Domina competencias lingüísticas, paralingüísticas, pragmáticas y próxemicas a través de ejercicios especializados",
      level: "Intermedio-Avanzado",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section con imagen de fondo */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(/placeholder.svg?height=800&width=1600&query=artificial+intelligence+neural+network+blue+purple)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-29%20at%209.59.37%20AM-cpDtn3mTMvUZF55FK2nisRp9yTh6vA.jpeg"
                alt="COGNICOM Logo"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance">COGNICOM</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 px-4">
              COGNICOM ofrece servicios a través de módulos de formación para incrementar las competencias y habilidades
              comunicativas dirigidas hacia la inclusión y/o emprendimientos para la autonomía de personas en condición
              de discapacidad.
            </p>
            <div className="flex flex-wrap gap-4 justify-center px-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => (window.location.href = "/dominios/cognicom/prueba-diagnostica")}
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5" />
              </Button>
              <RouteMapModal
                title="Ruta de Atención COGNICOM"
                imageSrc="/ruta-cognicom.png"
                imageAlt="Ruta de Atención COGNICOM"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">Módulos de Aprendizaje</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
              Evaluación diagnóstica y desarrollo de habilidades comunicativas integrales
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {modules.map((module) => {
              const progress = moduleProgress[module.id] || 0
              const isStarted = progress > 0
              const isCompleted = progress === 100

              return (
                <Card key={module.id} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-start gap-6 mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 w-full">
                      <h3 className="text-xl font-bold mb-3 text-balance">{module.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{module.description}</p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="text-xs px-4 py-2 bg-accent/10 text-accent rounded-full font-medium">
                          {module.level}
                        </span>
                        {isCompleted && (
                          <span className="text-xs px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                            Completado
                          </span>
                        )}
                      </div>

                      {isStarted && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-muted-foreground">Progreso</span>
                            <span className="text-sm font-bold text-primary">{progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {enrolledModules.includes(module.id) && !isStarted ? (
                        <Button variant="outline" disabled className="w-full bg-transparent">
                          Inscrito
                        </Button>
                      ) : (
                        <Button onClick={() => handleEnrollModule(module.id)} className="w-full">
                          {isStarted ? "Continuar" : "Comenzar"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
