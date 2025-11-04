"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Eraser, RotateCcw } from "lucide-react"
import Link from "next/link"
import { safeSetItem } from "@/lib/storage-utils"
import { useRouter } from "next/navigation"

type DrawingActivity = {
  id: string
  title: string
  description: string
}

const activities: DrawingActivity[] = [
  { id: "cruz", title: "Cruz", description: "Dibuja una cruz" },
  { id: "circulo", title: "Círculo", description: "Dibuja un círculo" },
  { id: "rombo", title: "Rombo", description: "Dibuja un rombo" },
]

export default function ImitacionFigurasPage() {
  const router = useRouter()
  const [currentActivity, setCurrentActivity] = useState<number>(0)
  const [showModel, setShowModel] = useState(true)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [savedDrawings, setSavedDrawings] = useState<{ [key: string]: string }>({})
  const [showReview, setShowReview] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingPointsRef = useRef<{ x: number; y: number }[]>([])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      if (context) {
        context.lineCap = "round"
        context.lineJoin = "round"
        context.lineWidth = 3
        context.strokeStyle = "#1f2937"
      }
    }
  }, [])

  useEffect(() => {
    setShowModel(true)
    setHasDrawn(false)
    drawingPointsRef.current = []

    setTimeout(() => {
      clearCanvas()
    }, 100)

    const timer = setTimeout(() => {
      setShowModel(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [currentActivity])

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (showModel) return

    if ("touches" in e) {
      e.preventDefault()
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    setIsDrawing(true)
    setHasDrawn(true)

    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    drawingPointsRef.current.push({ x, y })
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || showModel) return

    if ("touches" in e) {
      e.preventDefault()
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    drawingPointsRef.current.push({ x, y })
  }

  const stopDrawing = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return

    setIsDrawing(false)
    ctx.closePath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
    drawingPointsRef.current = []
  }

  const saveDrawing = () => {
    if (!hasDrawn) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL()
    const activity = activities[currentActivity]

    setSavedDrawings((prev) => ({
      ...prev,
      [activity.id]: dataUrl,
    }))

    if (currentActivity < activities.length - 1) {
      setCurrentActivity(currentActivity + 1)
    } else {
      setShowReview(true)
    }
  }

  const handlePassActivity = () => {
    const progress = safeSetItem("smartlogy-progress", {
      ...JSON.parse(localStorage.getItem("smartlogy-progress") || "{}"),
      imitacionFiguras: true,
    })

    const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
    if (!completed.includes("imitacion-figuras")) {
      completed.push("imitacion-figuras")
      localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
    }

    setTimeout(() => {
      router.push("/dominios/smartlogy/evaluacion")
    }, 1000)
  }

  const handleRepeat = () => {
    setSavedDrawings({})
    setCurrentActivity(0)
    setShowReview(false)
  }

  const renderModel = () => {
    const activity = activities[currentActivity]

    if (activity.id === "cruz") {
      return (
        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
          <line x1="100" y1="40" x2="100" y2="160" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" />
          <line x1="40" y1="100" x2="160" y2="100" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" />
        </svg>
      )
    }

    if (activity.id === "circulo") {
      return (
        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
          <circle cx="100" cy="100" r="60" stroke="#1f2937" strokeWidth="8" fill="none" />
        </svg>
      )
    }

    if (activity.id === "rombo") {
      return (
        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
          <path d="M 100 40 L 160 100 L 100 160 L 40 100 Z" stroke="#1f2937" strokeWidth="8" fill="none" />
        </svg>
      )
    }
  }

  if (showReview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/dominios/smartlogy/evaluacion">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Evaluación
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Revisión de Dibujos
            </h1>
            <p className="text-gray-600">Compara los dibujos con las figuras originales</p>
          </div>

          <div className="grid gap-6 mb-8">
            {activities.map((activity) => (
              <Card key={activity.id} className="p-6">
                <h3 className="text-xl font-bold mb-4">{activity.title}</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Original */}
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Figura Original</p>
                    <div className="bg-white rounded-lg p-8 shadow-inner border-2 border-gray-200">
                      {activity.id === "cruz" && (
                        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                          <line
                            x1="100"
                            y1="40"
                            x2="100"
                            y2="160"
                            stroke="#1f2937"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <line
                            x1="40"
                            y1="100"
                            x2="160"
                            y2="100"
                            stroke="#1f2937"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {activity.id === "circulo" && (
                        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                          <circle cx="100" cy="100" r="60" stroke="#1f2937" strokeWidth="8" fill="none" />
                        </svg>
                      )}
                      {activity.id === "rombo" && (
                        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                          <path
                            d="M 100 40 L 160 100 L 100 160 L 40 100 Z"
                            stroke="#1f2937"
                            strokeWidth="8"
                            fill="none"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* User Drawing */}
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Tu Dibujo</p>
                    <div className="bg-white rounded-lg p-4 shadow-inner border-2 border-gray-200">
                      {savedDrawings[activity.id] ? (
                        <img
                          src={savedDrawings[activity.id] || "/placeholder.svg"}
                          alt={`Dibujo de ${activity.title}`}
                          className="w-full h-auto"
                        />
                      ) : (
                        <div className="h-[200px] flex items-center justify-center text-gray-400">No dibujado</div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleRepeat} variant="outline" className="flex-1 bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" />
              Repetirla
            </Button>
            <Button onClick={handlePassActivity} className="flex-1 bg-green-600 hover:bg-green-700">
              Paso esta actividad
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Imitación de Figuras
          </h1>
          <p className="text-gray-600">Observa la figura y luego dibújala</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {activities.map((activity, index) => (
            <Card
              key={activity.id}
              className={`p-4 ${
                currentActivity === index
                  ? "ring-2 ring-purple-500 bg-purple-50"
                  : savedDrawings[activity.id]
                    ? "bg-green-50"
                    : ""
              }`}
            >
              <h3 className="font-semibold text-sm mb-1">{activity.title}</h3>
              <p className="text-xs text-gray-600">
                {savedDrawings[activity.id] ? "✓ Completado" : activity.description}
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4">{activities[currentActivity].title}</h2>

          {showModel ? (
            <div className="text-center">
              <p className="text-gray-600 mb-6">Observa la figura atentamente...</p>
              <div className="bg-white rounded-lg p-8 shadow-inner">{renderModel()}</div>
              <p className="text-sm text-gray-500 mt-4">La figura desaparecerá en unos segundos</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">Ahora dibuja la figura que viste</p>

              <div className="bg-white rounded-lg p-4 shadow-inner mb-4">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="border-2 border-gray-200 rounded cursor-crosshair w-full"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={clearCanvas} className="flex-1 bg-transparent">
                  <Eraser className="mr-2 h-4 w-4" />
                  Borrar
                </Button>
                <Button onClick={saveDrawing} disabled={!hasDrawn} className="flex-1">
                  {currentActivity < activities.length - 1 ? "Siguiente" : "Finalizar"}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
