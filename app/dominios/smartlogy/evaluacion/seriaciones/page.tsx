"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

type Figure = {
  id: number
  size: number
  color: string
}

export default function SeriacionesPage() {
  const router = useRouter()
  const [currentActivity, setCurrentActivity] = useState<number>(0)

  // Ordenamiento state
  const [ordenamientoFigures, setOrdenamientoFigures] = useState<Figure[]>([])
  const [ordenamientoMode, setOrdenamientoMode] = useState<"asc" | "desc">("asc")
  const [ordenamientoCompleted, setOrdenamientoCompleted] = useState(false)
  const [ordenamientoFeedback, setOrdenamientoFeedback] = useState<string>("")

  // Injerto state
  const [injertoFigures, setInjertoFigures] = useState<Figure[]>([])
  const [injertoOptions, setInjertoOptions] = useState<Figure[]>([])
  const [injertoMissingIndex, setInjertoMissingIndex] = useState<number>(3)
  const [injertoSelected, setInjertoSelected] = useState<Figure | null>(null)
  const [injertoCompleted, setInjertoCompleted] = useState(false)
  const [injertoFeedback, setInjertoFeedback] = useState<string>("")

  // Corrección state
  const [correccionFigures, setCorreccionFigures] = useState<Figure[]>([])
  const [correccionSelected, setCorreccionSelected] = useState<number[]>([])
  const [correccionCompleted, setCorreccionCompleted] = useState(false)
  const [correccionFeedback, setCorreccionFeedback] = useState<string>("")

  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // Initialize Ordenamiento
  useEffect(() => {
    if (currentActivity === 0) {
      const figures: Figure[] = Array.from({ length: 7 }, (_, i) => ({
        id: i,
        size: (i + 1) * 20 + 40,
        color: `hsl(${(i * 50) % 360}, 70%, 60%)`,
      }))
      setOrdenamientoFigures(shuffleArray([...figures]))
      setOrdenamientoMode("asc")
      setOrdenamientoCompleted(false)
      setOrdenamientoFeedback("")
    }
  }, [currentActivity])

  // Initialize Injerto
  useEffect(() => {
    if (currentActivity === 1) {
      const allFigures: Figure[] = Array.from({ length: 7 }, (_, i) => ({
        id: i,
        size: (i + 1) * 20 + 40,
        color: `hsl(${(i * 50) % 360}, 70%, 60%)`,
      }))

      const missingIdx = 3
      const correctFigure = allFigures[missingIdx]
      const visibleFigures = allFigures.filter((_, idx) => idx !== missingIdx)

      // Create distractors
      const distractor1 = { ...correctFigure, id: 100, size: correctFigure.size + 15 }
      const distractor2 = { ...correctFigure, id: 101, size: correctFigure.size - 15 }

      setInjertoFigures(visibleFigures)
      setInjertoOptions(shuffleArray([correctFigure, distractor1, distractor2]))
      setInjertoMissingIndex(missingIdx)
      setInjertoSelected(null)
      setInjertoCompleted(false)
      setInjertoFeedback("")
    }
  }, [currentActivity])

  // Initialize Corrección
  useEffect(() => {
    if (currentActivity === 2) {
      const figures: Figure[] = Array.from({ length: 7 }, (_, i) => ({
        id: i,
        size: (i + 1) * 20 + 40,
        color: `hsl(${(i * 50) % 360}, 70%, 60%)`,
      }))

      // Swap two random figures
      const swappedFigures = [...figures]
      const idx1 = 2
      const idx2 = 5
      ;[swappedFigures[idx1], swappedFigures[idx2]] = [swappedFigures[idx2], swappedFigures[idx1]]

      setCorreccionFigures(swappedFigures)
      setCorreccionSelected([])
      setCorreccionCompleted(false)
      setCorreccionFeedback("")
    }
  }, [currentActivity])

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Ordenamiento handlers
  const handleOrdenamientoDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleOrdenamientoDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
  }

  const handleOrdenamientoDrop = (index: number) => {
    if (draggedItem === null) return

    const newFigures = [...ordenamientoFigures]
    const draggedFigure = newFigures[draggedItem]
    newFigures.splice(draggedItem, 1)
    newFigures.splice(index, 0, draggedFigure)

    setOrdenamientoFigures(newFigures)
    setDraggedItem(null)
  }

  const checkOrdenamiento = () => {
    const isCorrect = ordenamientoFigures.every((fig, idx) => {
      if (idx === 0) return true
      const prevSize = ordenamientoFigures[idx - 1].size
      return ordenamientoMode === "asc" ? fig.size > prevSize : fig.size < prevSize
    })

    if (isCorrect) {
      setOrdenamientoFeedback("¡Excelente! Has ordenado correctamente las figuras.")
      setOrdenamientoCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.seriaciones = progress.seriaciones || {}
      progress.seriaciones.ordenamiento = true
      safeSetItem("smartlogy-progress", progress)

      setTimeout(() => {
        setCurrentActivity(1)
      }, 2000)
    } else {
      setOrdenamientoFeedback("Intenta nuevamente. Revisa el orden de las figuras.")
    }
  }

  const cambiarOrden = () => {
    setOrdenamientoMode(ordenamientoMode === "asc" ? "desc" : "asc")
    setOrdenamientoCompleted(false)
    setOrdenamientoFeedback("")
  }

  // Injerto handlers
  const handleInjertoSelect = (figure: Figure) => {
    setInjertoSelected(figure)
  }

  const comprobarInjerto = () => {
    if (!injertoSelected) return

    const isCorrect = injertoSelected.id === injertoMissingIndex

    if (isCorrect) {
      setInjertoFeedback("¡Correcto! Has encontrado la pieza que falta.")
      setInjertoCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.seriaciones = progress.seriaciones || {}
      progress.seriaciones.injerto = true
      safeSetItem("smartlogy-progress", progress)

      setTimeout(() => {
        setCurrentActivity(2)
      }, 2000)
    } else {
      setInjertoFeedback("Incorrecto. Intenta nuevamente.")
    }
  }

  // Corrección handlers
  const handleCorreccionSelect = (index: number) => {
    if (correccionSelected.includes(index)) {
      setCorreccionSelected(correccionSelected.filter((i) => i !== index))
    } else if (correccionSelected.length < 2) {
      setCorreccionSelected([...correccionSelected, index])
    }
  }

  const handleCorreccionDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleCorreccionDrop = (index: number) => {
    if (draggedItem === null) return

    const newFigures = [...correccionFigures]
    ;[newFigures[draggedItem], newFigures[index]] = [newFigures[index], newFigures[draggedItem]]

    setCorreccionFigures(newFigures)
    setDraggedItem(null)
  }

  const comprobarCorreccion = () => {
    const isCorrect = correccionFigures.every((fig, idx) => {
      if (idx === 0) return true
      return fig.size > correccionFigures[idx - 1].size
    })

    if (isCorrect) {
      setCorreccionFeedback("¡Excelente! Has corregido el orden correctamente.")
      setCorreccionCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.seriaciones = progress.seriaciones || {}
      progress.seriaciones.correccion = true
      safeSetItem("smartlogy-progress", progress)

      // Check if all seriaciones activities are complete
      if (progress.seriaciones.ordenamiento && progress.seriaciones.injerto && progress.seriaciones.correccion) {
        progress.evaluacion = progress.evaluacion || {}
        progress.evaluacion.seriaciones = true
        safeSetItem("smartlogy-progress", progress)
      }

      setTimeout(() => {
        router.push("/dominios/smartlogy/evaluacion")
      }, 2000)
    } else {
      setCorreccionFeedback("Intenta nuevamente. Revisa el orden de las figuras.")
    }
  }

  const activities = [
    {
      title: "Ordenamiento",
      description: "Ordena las figuras de menor a mayor",
    },
    {
      title: "Injerto",
      description: "Encuentra la pieza que falta",
    },
    {
      title: "Corrección",
      description: "Corrige el orden de las figuras",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Seriaciones
          </h1>
          <p className="text-gray-600">Completa las tres actividades de seriación</p>
        </div>

        {/* Activity Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {activities.map((activity, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all ${
                currentActivity === index ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-lg"
              }`}
              onClick={() => setCurrentActivity(index)}
            >
              <h3 className="font-semibold text-lg mb-1">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </Card>
          ))}
        </div>

        {/* Ordenamiento Activity */}
        {currentActivity === 0 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ordena de {ordenamientoMode === "asc" ? "menor a mayor" : "mayor a menor"}
            </h2>
            <p className="text-gray-600 mb-6">Arrastra las figuras para ordenarlas por tamaño</p>

            <div className="flex flex-wrap gap-4 justify-center mb-8 p-6 bg-gray-50 rounded-lg min-h-[200px] items-end">
              {ordenamientoFigures.map((figure, index) => (
                <div
                  key={figure.id}
                  draggable
                  onDragStart={() => handleOrdenamientoDragStart(index)}
                  onDragOver={(e) => handleOrdenamientoDragOver(e, index)}
                  onDrop={() => handleOrdenamientoDrop(index)}
                  className="cursor-move transition-transform hover:scale-105"
                  style={{
                    width: "40px",
                    height: `${figure.size}px`,
                    backgroundColor: figure.color,
                    borderRadius: "4px",
                    border: "2px solid #333",
                  }}
                />
              ))}
            </div>

            {ordenamientoFeedback && (
              <div
                className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                  ordenamientoCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {ordenamientoCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {ordenamientoFeedback}
                {ordenamientoCompleted && <span className="ml-2">Avanzando a la siguiente actividad...</span>}
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={checkOrdenamiento} disabled={ordenamientoCompleted}>
                Comprobar
              </Button>
              {ordenamientoCompleted && (
                <Button onClick={cambiarOrden} variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Cambiar orden
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Injerto Activity */}
        {currentActivity === 1 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Encuentra la pieza que falta</h2>
            <p className="text-gray-600 mb-6">Observa la secuencia y selecciona la figura que falta</p>

            <div className="mb-8">
              <div className="flex gap-4 justify-center mb-8 p-6 bg-gray-50 rounded-lg items-end">
                {Array.from({ length: 7 }).map((_, index) => {
                  if (index === injertoMissingIndex) {
                    return (
                      <div
                        key={`missing-${index}`}
                        className="border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center"
                        style={{ width: "60px", height: "120px" }}
                      >
                        {injertoSelected && (
                          <div
                            style={{
                              width: "40px",
                              height: `${injertoSelected.size}px`,
                              backgroundColor: injertoSelected.color,
                              borderRadius: "4px",
                              border: "2px solid #333",
                            }}
                          />
                        )}
                      </div>
                    )
                  }

                  const figureIndex = index > injertoMissingIndex ? index - 1 : index
                  const figure = injertoFigures[figureIndex]

                  if (!figure) {
                    return null
                  }

                  return (
                    <div
                      key={figure.id}
                      style={{
                        width: "40px",
                        height: `${figure.size}px`,
                        backgroundColor: figure.color,
                        borderRadius: "4px",
                        border: "2px solid #333",
                      }}
                    />
                  )
                })}
              </div>

              <div className="flex gap-4 justify-center">
                {injertoOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleInjertoSelect(option)}
                    className={`cursor-pointer transition-all p-4 rounded-lg border-2 ${
                      injertoSelected?.id === option.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: `${option.size}px`,
                        backgroundColor: option.color,
                        borderRadius: "4px",
                        border: "2px solid #333",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {injertoFeedback && (
              <div
                className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                  injertoCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {injertoCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {injertoFeedback}
                {injertoCompleted && <span className="ml-2">Avanzando a la siguiente actividad...</span>}
              </div>
            )}

            <Button onClick={comprobarInjerto} disabled={!injertoSelected || injertoCompleted}>
              Comprobar
            </Button>
          </Card>
        )}

        {/* Corrección Activity */}
        {currentActivity === 2 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Corrección</h2>
            <p className="text-gray-600 mb-6">
              Encuentra las dos figuras que están en el lugar incorrecto y corrígelas
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8 p-6 bg-gray-50 rounded-lg min-h-[200px] items-end">
              {correccionFigures.map((figure, index) => (
                <div
                  key={figure.id}
                  draggable
                  onDragStart={() => handleCorreccionDragStart(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleCorreccionDrop(index)}
                  onClick={() => handleCorreccionSelect(index)}
                  className={`cursor-move transition-all hover:scale-105 ${
                    correccionSelected.includes(index) ? "ring-4 ring-blue-500" : ""
                  }`}
                  style={{
                    width: "40px",
                    height: `${figure.size}px`,
                    backgroundColor: figure.color,
                    borderRadius: "4px",
                    border: "2px solid #333",
                  }}
                />
              ))}
            </div>

            {correccionFeedback && (
              <div
                className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                  correccionCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {correccionCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {correccionFeedback}
                {correccionCompleted && <span className="ml-2">Redirigiendo a la lista de actividades...</span>}
              </div>
            )}

            <Button onClick={comprobarCorreccion} disabled={correccionCompleted}>
              Listo
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
