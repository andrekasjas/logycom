"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function EvaluacionPage() {
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const completed = localStorage.getItem("smartlogyCompletedActivities")
    if (completed) {
      setCompletedActivities(JSON.parse(completed))
    }
  }, [])

  const activities = [
    {
      id: "clasificacion",
      title: "1. Clasificación",
      description: "Dos partes: objetos y figuras",
      icon: "🔍",
      href: "/dominios/smartlogy/evaluacion/clasificacion",
    },
    {
      id: "seriaciones",
      title: "2. Seriaciones",
      description: "Tres partes: ordenamiento, injerto y corrección",
      icon: "📊",
      href: "/dominios/smartlogy/evaluacion/seriaciones",
    },
    {
      id: "correspondencias",
      title: "3. Correspondencias",
      description: "Uno-uno, acorta, alarga, agrega, separa con monedas",
      icon: "💰",
      href: "/dominios/smartlogy/evaluacion/correspondencias",
    },
    {
      id: "imitacion-figuras",
      title: "4. Imitación de figuras",
      description: "Cruz, círculo, rombo",
      icon: "✏️",
      href: "/dominios/smartlogy/evaluacion/imitacion-figuras",
    },
    {
      id: "conservacion-sustancia",
      title: "5. Conservación de sustancia",
      description: "Evaluación de conservación",
      icon: "⚖️",
      href: "/dominios/smartlogy/evaluacion/conservacion-sustancia",
    },
    {
      id: "relaciones-asimetricas",
      title: "6. Relaciones asimétricas",
      description: "Grande-pequeño, gordo-flaco, alto-bajo, ancho-angosto",
      icon: "↔️",
      href: "/dominios/smartlogy/evaluacion/relaciones-asimetricas",
    },
    {
      id: "cuantificadores",
      title: "7. Cuantificadores",
      description: "Mucho-poco, más-menos, algunos-casi todos, todo-nada",
      icon: "🔢",
      href: "/dominios/smartlogy/evaluacion/cuantificadores",
    },
    {
      id: "capacidad-asociativa",
      title: "8. Capacidad asociativa",
      description: "Hoja dividida en 4, con 16",
      icon: "🧩",
      href: "/dominios/smartlogy/evaluacion/capacidad-asociativa",
    },
    {
      id: "capacidad-apreciativa",
      title: "9. Capacidad abreviativa",
      description: "Evaluación de capacidad abreviativa",
      icon: "📝",
      href: "/dominios/smartlogy/evaluacion/capacidad-apreciativa",
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
              EVALUACIÓN: Examen Jacobo Feldman
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Evaluación de niveles de pensamiento preparatorio y operatorio
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {activities.map((activity) => (
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
                {activity.href === "#" && <p className="text-xs text-muted-foreground mt-2">Próximamente</p>}
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
