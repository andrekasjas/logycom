"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ClasificacionPage() {
  const router = useRouter()
  const [currentActivity, setCurrentActivity] = useState<1 | 2>(1)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)

  const [shuffledObjects, setShuffledObjects] = useState<typeof objects>([])
  const [shuffledFigures, setShuffledFigures] = useState<typeof figures>([])

  // Activity 1: Objects
  const [objectGroups, setObjectGroups] = useState<{ [key: string]: string[] }>({
    transporte: [],
    animales: [],
    cocina: [],
    muebles: [],
    ropa: [],
  })

  const objects = [
    { id: "carro", emoji: "🚗", category: "transporte", label: "Carro" },
    { id: "avion", emoji: "✈️", category: "transporte", label: "Avión" },
    { id: "perro", emoji: "🐕", category: "animales", label: "Perro" },
    { id: "gato", emoji: "🐈", category: "animales", label: "Gato" },
    { id: "olla", emoji: "🍲", category: "cocina", label: "Olla" },
    { id: "cuchara", emoji: "🥄", category: "cocina", label: "Cuchara" },
    { id: "silla", emoji: "🪑", category: "muebles", label: "Silla" },
    { id: "mesa", emoji: "🛋️", category: "muebles", label: "Mueble" },
    { id: "camisa", emoji: "👕", category: "ropa", label: "Camisa" },
    { id: "zapatos", emoji: "👟", category: "ropa", label: "Zapatos" },
  ]

  // Activity 2: Figures
  const [figureGroups, setFigureGroups] = useState<{ [key: string]: string[] }>({
    circulos: [],
    triangulos: [],
    cuadrados: [],
  })

  const figures = [
    { id: "circulo-rojo", shape: "circle", color: "red", label: "Círculo Rojo" },
    { id: "circulo-azul", shape: "circle", color: "blue", label: "Círculo Azul" },
    { id: "circulo-verde", shape: "circle", color: "green", label: "Círculo Verde" },
    { id: "triangulo-rojo", shape: "triangle", color: "red", label: "Triángulo Rojo" },
    { id: "triangulo-azul", shape: "triangle", color: "blue", label: "Triángulo Azul" },
    { id: "triangulo-verde", shape: "triangle", color: "green", label: "Triángulo Verde" },
    { id: "cuadrado-rojo", shape: "square", color: "red", label: "Cuadrado Rojo" },
    { id: "cuadrado-azul", shape: "square", color: "blue", label: "Cuadrado Azul" },
    { id: "cuadrado-verde", shape: "square", color: "green", label: "Cuadrado Verde" },
    { id: "circulo-amarillo", shape: "circle", color: "yellow", label: "Círculo Amarillo" },
    { id: "triangulo-amarillo", shape: "triangle", color: "yellow", label: "Triángulo Amarillo" },
    { id: "cuadrado-amarillo", shape: "square", color: "yellow", label: "Cuadrado Amarillo" },
  ]

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (currentActivity === 1) {
      setShuffledObjects(shuffleArray(objects))
    } else if (currentActivity === 2) {
      setShuffledFigures(shuffleArray(figures))
    }
  }, [currentActivity])

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData("itemId", itemId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDropObject = (e: React.DragEvent, category: string) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData("itemId")
    const item = objects.find((obj) => obj.id === itemId)

    if (item && !objectGroups[category].includes(itemId)) {
      setObjectGroups((prev) => ({
        ...prev,
        [category]: [...prev[category], itemId],
      }))
    }
  }

  const handleDropFigure = (e: React.DragEvent, group: string) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData("itemId")
    const item = figures.find((fig) => fig.id === itemId)

    if (item && !figureGroups[group].includes(itemId)) {
      setFigureGroups((prev) => ({
        ...prev,
        [group]: [...prev[group], itemId],
      }))
    }
  }

  const removeFromGroup = (category: string, itemId: string, isObject: boolean) => {
    if (isObject) {
      setObjectGroups((prev) => ({
        ...prev,
        [category]: prev[category].filter((id) => id !== itemId),
      }))
    } else {
      setFigureGroups((prev) => ({
        ...prev,
        [category]: prev[category].filter((id) => id !== itemId),
      }))
    }
  }

  const verifyActivity1 = () => {
    const allPlaced = objects.every((obj) => Object.values(objectGroups).some((group) => group.includes(obj.id)))

    if (!allPlaced) {
      setResult("incorrect")
      return
    }

    const correct = objects.every((obj) => {
      const placedCategory = Object.keys(objectGroups).find((cat) => objectGroups[cat].includes(obj.id))
      return placedCategory === obj.category
    })

    setResult(correct ? "correct" : "incorrect")

    if (correct) {
      setTimeout(() => {
        setCurrentActivity(2)
        setResult(null)
        setFigureGroups({
          circulos: [],
          triangulos: [],
          cuadrados: [],
        })
      }, 2000)
    }
  }

  const verifyActivity2 = () => {
    const allPlaced = figures.every((fig) => Object.values(figureGroups).some((group) => group.includes(fig.id)))

    if (!allPlaced) {
      setResult("incorrect")
      return
    }

    const correct = figures.every((fig) => {
      const placedGroup = Object.keys(figureGroups).find((grp) => figureGroups[grp].includes(fig.id))
      if (placedGroup === "circulos") return fig.shape === "circle"
      if (placedGroup === "triangulos") return fig.shape === "triangle"
      if (placedGroup === "cuadrados") return fig.shape === "square"
      return false
    })

    setResult(correct ? "correct" : "incorrect")

    if (correct) {
      const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
      if (!completed.includes("clasificacion")) {
        completed.push("clasificacion")
        localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
      }

      setTimeout(() => {
        router.push("/dominios/smartlogy/evaluacion")
      }, 2000)
    }
  }

  const getAvailableObjects = () => {
    const placedIds = Object.values(objectGroups).flat()
    return shuffledObjects.filter((obj) => !placedIds.includes(obj.id))
  }

  const getAvailableFigures = () => {
    const placedIds = Object.values(figureGroups).flat()
    return shuffledFigures.filter((fig) => !placedIds.includes(fig.id))
  }

  const renderShape = (shape: string, color: string, size = 60) => {
    const colors: { [key: string]: string } = {
      red: "#ef4444",
      blue: "#3b82f6",
      green: "#22c55e",
      yellow: "#eab308",
    }

    if (shape === "circle") {
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: colors[color],
          }}
        />
      )
    }
    if (shape === "triangle") {
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${colors[color]}`,
          }}
        />
      )
    }
    if (shape === "square") {
      return (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: colors[color],
          }}
        />
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <section className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            className="mb-6 md:mb-8 gap-2"
            onClick={() => (window.location.href = "/dominios/smartlogy/evaluacion")}
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Clasificación</h1>
            <p className="text-base md:text-lg text-muted-foreground">Actividad {currentActivity} de 2</p>
          </div>

          {currentActivity === 1 && (
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Agrupa los objetos según su semejanza</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Objetos disponibles:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {getAvailableObjects().map((obj) => (
                      <div
                        key={obj.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, obj.id)}
                        className="p-4 bg-background border-2 border-dashed rounded-lg text-center cursor-move hover:border-primary transition"
                      >
                        <p className="text-4xl mb-2">{obj.emoji}</p>
                        <p className="text-sm font-semibold">{obj.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(objectGroups).map((category) => (
                    <div
                      key={category}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropObject(e, category)}
                      className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-lg p-4 min-h-40"
                    >
                      <h4 className="font-semibold mb-3 capitalize">{category}</h4>
                      <div className="space-y-2">
                        {objectGroups[category].map((itemId) => {
                          const obj = objects.find((o) => o.id === itemId)
                          return obj ? (
                            <div
                              key={itemId}
                              className="flex items-center gap-2 bg-background p-2 rounded cursor-pointer hover:bg-secondary"
                              onClick={() => removeFromGroup(category, itemId, true)}
                            >
                              <span className="text-2xl">{obj.emoji}</span>
                              <span className="text-sm flex-1">{obj.label}</span>
                              <span className="text-xs text-muted-foreground">✕</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full" size="lg" onClick={verifyActivity1}>
                  Listo
                </Button>

                {result && (
                  <div className="flex justify-center">
                    <div
                      className={`inline-flex items-center gap-3 px-6 py-4 rounded-lg ${
                        result === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {result === "correct" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Correcto</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Incorrecto</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentActivity === 2 && (
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Encuentra las figuras que pertenecen al mismo grupo</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Figuras disponibles:</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {getAvailableFigures().map((fig) => (
                      <div
                        key={fig.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, fig.id)}
                        className="p-4 bg-background border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-move hover:border-primary transition min-h-28"
                      >
                        {renderShape(fig.shape, fig.color, 50)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: "circulos", label: "Círculos" },
                    { key: "triangulos", label: "Triángulos" },
                    { key: "cuadrados", label: "Cuadrados" },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropFigure(e, key)}
                      className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-lg p-4 min-h-48"
                    >
                      <h4 className="font-semibold mb-3">{label}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {figureGroups[key].map((itemId) => {
                          const fig = figures.find((f) => f.id === itemId)
                          return fig ? (
                            <div
                              key={itemId}
                              className="bg-background p-3 rounded cursor-pointer hover:bg-secondary flex items-center justify-center relative"
                              onClick={() => removeFromGroup(key, itemId, false)}
                            >
                              {renderShape(fig.shape, fig.color, 40)}
                              <span className="absolute top-1 right-1 text-xs text-muted-foreground">✕</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full" size="lg" onClick={verifyActivity2}>
                  Listo
                </Button>

                {result && (
                  <div className="flex justify-center">
                    <div
                      className={`inline-flex items-center gap-3 px-6 py-4 rounded-lg ${
                        result === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {result === "correct" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Correcto</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Incorrecto</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
