"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ProcesosLogicomatematicosPage() {
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const completed = localStorage.getItem("smartlogyCompletedActivities")
    if (completed) {
      setCompletedActivities(JSON.parse(completed))
    }
  }, [])

  const subniveles = [
    {
      nivel: "Subnivel 1",
      descripcion: "Operaciones Lógicas Básicas",
      actividades: [
        {
          id: "clasificacion",
          title: "Clasificación",
          description: "Agrupa los objetos según su semejanza",
          icon: "🔍",
          href: "/dominios/smartlogy/evaluacion/clasificacion",
        },
        {
          id: "seriaciones",
          title: "Seriaciones",
          description: "Ordena los objetos del más pequeño al más grande",
          icon: "📊",
          href: "/dominios/smartlogy/evaluacion/seriaciones",
        },
        {
          id: "correspondencias",
          title: "Correspondencia",
          description: "Empareja cada objeto con su pareja correcta",
          icon: "💰",
          href: "/dominios/smartlogy/evaluacion/correspondencias",
        },
      ],
    },
    {
      nivel: "Subnivel 2",
      descripcion: "Conservación y Relaciones",
      actividades: [
        {
          id: "imitacion-figuras",
          title: "Imitación de figuras",
          description: "Imita la figura que ves",
          icon: "✏️",
          href: "/dominios/smartlogy/evaluacion/imitacion-figuras",
        },
        {
          id: "conservacion-sustancia",
          title: "Conservación de sustancia",
          description: "¿Tienen la misma cantidad?",
          icon: "⚖️",
          href: "/dominios/smartlogy/evaluacion/conservacion-sustancia",
        },
        {
          id: "relaciones-asimetricas",
          title: "Relaciones asimétricas",
          description: "Establece relaciones de orden entre objetos",
          icon: "↔️",
          href: "/dominios/smartlogy/evaluacion/relaciones-asimetricas",
        },
        {
          id: "cuantificadores",
          title: "Cuantificadores",
          description: "¿Dónde hay más?",
          icon: "🔢",
          href: "/dominios/smartlogy/evaluacion/cuantificadores",
        },
      ],
    },
    {
      nivel: "Subnivel 3",
      descripcion: "Capacidades Complejas",
      actividades: [
        {
          id: "capacidad-asociativa",
          title: "Capacidad asociativa",
          description: "Asocia los objetos que se usan juntos",
          icon: "🧩",
          href: "/dominios/smartlogy/evaluacion/capacidad-asociativa",
        },
        {
          id: "capacidad-apreciativa",
          title: "Capacidad abreviativa",
          description: "Completa la secuencia abreviada",
          icon: "📝",
          href: "/dominios/smartlogy/evaluacion/capacidad-apreciativa",
        },
        {
          id: "conservacion-peso",
          title: "Noción de conservación de peso",
          description: "¿Cuál pesa lo mismo?",
          icon: "⚖️",
          href: "/dominios/smartlogy/evaluacion/conservacion-peso",
        },
        {
          id: "conservacion-volumen",
          title: "Noción de conservación de volumen",
          description: "¿Cuál tiene más agua?",
          icon: "💧",
          href: "/dominios/smartlogy/evaluacion/conservacion-volumen",
        },
      ],
    },
    {
      nivel: "Subnivel 4",
      descripcion: "Operaciones Matemáticas",
      actividades: [
        {
          id: "manejo-automatico-numero",
          title: "Manejo automático del número",
          description: "Reconoce el número sin contar",
          icon: "🎯",
          href: "/dominios/smartlogy/evaluacion/manejo-automatico-numero",
        },
        {
          id: "operaciones-matematicas",
          title: "Operaciones matemáticas",
          description: "Resuelve con lógica",
          icon: "➕",
          href: "/dominios/smartlogy/evaluacion/operaciones-matematicas",
        },
        {
          id: "reversibilidad",
          title: "Reversibilidad",
          description: "Acción y operación inversa",
          icon: "↩️",
          href: "/dominios/smartlogy/evaluacion/reversibilidad",
        },
        {
          id: "problemas-matematicos",
          title: "Problemas matemáticos",
          description: "Resuelve problemas matemáticos",
          icon: "🧮",
          href: "/dominios/smartlogy/evaluacion/problemas-matematicos",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <section className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            className="mb-6 md:mb-8 gap-2"
            onClick={() => (window.location.href = "/dominios/smartlogy")}
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Button>

          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance">
              Procesos Lógico Matemáticos
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Desarrolla habilidades lógico-matemáticas progresivamente a través de 4 subniveles
            </p>
          </div>

          {subniveles.map((subnivel, index) => (
            <div key={index} className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{subnivel.nivel}</h2>
                <p className="text-muted-foreground text-lg">{subnivel.descripcion}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {subnivel.actividades.map((activity) => (
                  <Card
                    key={activity.id}
                    className="p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={() => activity.href !== "#" && (window.location.href = activity.href)}
                  >
                    <div className="text-4xl mb-4">{activity.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{activity.description}</p>
                    {completedActivities.includes(activity.id) && (
                      <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Completado
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
