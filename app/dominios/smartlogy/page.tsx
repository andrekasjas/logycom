"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { safeGetItem } from "@/lib/storage-utils"
import { RouteMapModal } from "@/components/route-map-modal"

export default function SmartlogyPage() {
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    window.scrollTo(0, 0)
    const evaluacionProgress = safeGetItem("smartlogyCompletedActivities", [])
    const evaluacionActivities = [
      "clasificacion",
      "seriaciones",
      "correspondencias",
      "imitacion-figuras",
      "conservacion-sustancia",
      "relaciones-asimetricas",
      "cuantificadores",
      "capacidad-asociativa",
      "capacidad-apreciativa",
    ]
    const evaluacionCompleted = evaluacionActivities.filter((id) => evaluacionProgress.includes(id)).length
    const evaluacionPercent = Math.round((evaluacionCompleted / evaluacionActivities.length) * 100)

    const procesosActivities = [
      "clasificacion",
      "seriaciones",
      "correspondencias",
      "imitacion-figuras",
      "conservacion-sustancia",
      "relaciones-asimetricas",
      "cuantificadores",
      "capacidad-asociativa",
      "capacidad-apreciativa",
      "conservacion-peso",
      "conservacion-volumen",
      "manejo-automatico-numero",
      "operaciones-matematicas",
      "reversibilidad",
      "problemas-matematicos",
    ]
    const procesosCompleted = procesosActivities.filter((id) => evaluacionProgress.includes(id)).length
    const procesosPercent = Math.round((procesosCompleted / procesosActivities.length) * 100)

    const manejoProgress = safeGetItem("smartlogy-manejo-dinero-progress", {})
    const manejoActivities = ["identificar", "contar", "pagar-exacto", "pagar-mas", "calcular-vueltas", "dar-vueltas"]
    const manejoCompleted = manejoActivities.filter((id) => manejoProgress[id]).length
    const manejoPercent = Math.round((manejoCompleted / manejoActivities.length) * 100)

    const educacionProgress = safeGetItem("smartlogy-educacion-financiera-progress", {})
    const educacionActivities = ["concepto-ahorro", "gastar-vs-ahorrar", "meta-ahorro"]
    const educacionCompleted = educacionActivities.filter((id) => educacionProgress[id]).length
    const educacionPercent = Math.round((educacionCompleted / educacionActivities.length) * 100)

    setModuleProgress({
      evaluacion: evaluacionPercent,
      "procesos-logicomatematicos": procesosPercent,
      "manejo-dinero": manejoPercent,
      "educacion-financiera": educacionPercent,
    })
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section con imagen de fondo */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(/placeholder.svg?height=800&width=1600&query=colorful+education+learning+mathematics+coins+money+friendly)",
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-29%20at%2010.29.38%20AM-IfBpOCPHh30fYCgJwJCCJltR1ULker.jpeg"
                alt="$MAR+L🪙GY Logo"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-balance">{"$MAR+L🪙GY"}</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 px-4">
              "$MAR+L🪙GY" trata de una herramienta digital educativa diseñada especialmente para personas con
              discapacidad cognitiva leve, implementando procesos lógico-matemáticos, manejo del dinero y educación
              financiera de manera práctica, accesible y adaptada a sus capacidades.
            </p>
            <div className="flex flex-wrap gap-4 justify-center px-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => (window.location.href = "/dominios/smartlogy/evaluacion")}
              >
                Comenzar Aprendizaje
                <ArrowRight className="w-5 h-5" />
              </Button>
              <RouteMapModal
                title="Ruta de Atención SMARTLOGY"
                imageSrc="/ruta-smartlogy.png"
                imageAlt="Ruta de Atención SMARTLOGY"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">Módulos de Aprendizaje</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
              Evaluación completa y módulos de aprendizaje práctico
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card
              className="p-8 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => (window.location.href = "/dominios/smartlogy/evaluacion")}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-balance">Evaluación</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">Evaluación de procesos lógicos matemáticos</p>
                <p className="text-sm text-muted-foreground">9 actividades de evaluación cognitiva</p>
                {moduleProgress.evaluacion > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Progreso</span>
                      <span className="text-sm font-semibold">{moduleProgress.evaluacion}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${moduleProgress.evaluacion}%` }}
                      ></div>
                    </div>
                    {moduleProgress.evaluacion === 100 && (
                      <div className="flex items-center justify-center gap-2 text-green-600 mt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-semibold">Completado</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Button className="w-full" size="lg">
                {moduleProgress.evaluacion > 0 && moduleProgress.evaluacion < 100 ? "Continuar" : "Comenzar Evaluación"}
              </Button>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => (window.location.href = "/dominios/smartlogy/procesos-logicomatematicos")}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🧮</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-balance">Procesos Lógico Matemáticos</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Desarrollo progresivo de habilidades lógico-matemáticas
                </p>
                <p className="text-sm text-muted-foreground">15 actividades en 4 subniveles</p>
                {moduleProgress["procesos-logicomatematicos"] > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Progreso</span>
                      <span className="text-sm font-semibold">{moduleProgress["procesos-logicomatematicos"]}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${moduleProgress["procesos-logicomatematicos"]}%` }}
                      ></div>
                    </div>
                    {moduleProgress["procesos-logicomatematicos"] === 100 && (
                      <div className="flex items-center justify-center gap-2 text-green-600 mt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-semibold">Completado</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Button className="w-full" size="lg">
                {moduleProgress["procesos-logicomatematicos"] > 0 && moduleProgress["procesos-logicomatematicos"] < 100
                  ? "Continuar"
                  : "Comenzar Módulo"}
              </Button>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => (window.location.href = "/dominios/smartlogy/manejo-dinero")}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💵</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-balance">MANEJO DEL DINERO</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Procesos lógico-matemáticos, manejo del dinero y educación financiera
                </p>
                <p className="text-sm text-muted-foreground">6 actividades prácticas con dinero</p>
                {moduleProgress["manejo-dinero"] > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Progreso</span>
                      <span className="text-sm font-semibold">{moduleProgress["manejo-dinero"]}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all"
                        style={{ width: `${moduleProgress["manejo-dinero"]}%` }}
                      ></div>
                    </div>
                    {moduleProgress["manejo-dinero"] === 100 && (
                      <div className="flex items-center justify-center gap-2 text-green-600 mt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-semibold">Completado</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Button className="w-full" size="lg">
                {moduleProgress["manejo-dinero"] > 0 && moduleProgress["manejo-dinero"] < 100
                  ? "Continuar"
                  : "Comenzar Módulo"}
              </Button>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => (window.location.href = "/dominios/smartlogy/educacion-financiera")}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🏦</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-balance">EDUCACIÓN FINANCIERA</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conceptos de ahorro y decisiones financieras
                </p>
                <p className="text-sm text-muted-foreground">3 actividades sobre ahorro</p>
                {moduleProgress["educacion-financiera"] > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Progreso</span>
                      <span className="text-sm font-semibold">{moduleProgress["educacion-financiera"]}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${moduleProgress["educacion-financiera"]}%` }}
                      ></div>
                    </div>
                    {moduleProgress["educacion-financiera"] === 100 && (
                      <div className="flex items-center justify-center gap-2 text-green-600 mt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-semibold">Completado</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Button className="w-full" size="lg">
                {moduleProgress["educacion-financiera"] > 0 && moduleProgress["educacion-financiera"] < 100
                  ? "Continuar"
                  : "Comenzar Módulo"}
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
