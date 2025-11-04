"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

export default function ConservacionSustanciaPage() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [isPouring, setIsPouring] = useState(false)

  useEffect(() => {
    startAnimation()
  }, [])

  const startAnimation = () => {
    setShowAnimation(true)
    setAnimationComplete(false)
    setSelectedAnswer(null)
    setFeedback("")
    setIsCorrect(false)
    setIsPouring(false)

    setTimeout(() => {
      setIsPouring(true)
    }, 500)

    setTimeout(() => {
      setAnimationComplete(true)
      setIsPouring(false)
    }, 3500)
  }

  const checkAnswer = () => {
    if (!selectedAnswer) {
      setFeedback("Por favor, selecciona una respuesta.")
      return
    }

    const correct = selectedAnswer === "misma"
    setIsCorrect(correct)

    if (correct) {
      setFeedback("¡Correcto! La cantidad de agua es la misma, solo cambió de forma.")

      // Save progress
      const progress = safeGetItem("smartlogy-progress", {})
      progress.conservacionSustancia = true
      safeSetItem("smartlogy-progress", progress)

      // Mark as complete
      setTimeout(() => {
        const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
        if (!completed.includes("conservacion-sustancia")) {
          completed.push("conservacion-sustancia")
          localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
        }
      }, 2000)
    } else {
      setFeedback("Intenta de nuevo. Piensa: ¿se agregó o quitó agua?")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Conservación de Sustancia
          </h1>
          <p className="text-gray-600">¿Hay más agua o es la misma?</p>
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6">
              {!animationComplete
                ? "Observa cómo el agua se trasvasa de un vaso a otro..."
                : "Ahora responde: ¿La cantidad de agua es la misma?"}
            </p>

            <div className="relative h-96 flex items-end justify-center gap-12 mb-8">
              <div className="relative">
                <div className="w-20 h-64 border-4 border-blue-400 rounded-b-lg relative overflow-hidden bg-blue-50">
                  <div
                    className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-[2500ms] ease-in-out ${
                      isPouring ? "h-0" : "h-48"
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-200 opacity-50 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm font-semibold mt-2">Vaso Alto</p>
              </div>

              {isPouring && !animationComplete && (
                <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-32 bg-gradient-to-b from-blue-300 to-blue-400 opacity-70 animate-pulse rounded-full" />
                </div>
              )}

              <div className="relative">
                <div className="w-32 h-40 border-4 border-blue-400 rounded-b-lg relative overflow-hidden bg-blue-50">
                  <div
                    className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-[2500ms] ease-in-out ${
                      isPouring ? "h-24" : "h-0"
                    }`}
                  >
                    {isPouring && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-200 opacity-50 animate-pulse" />
                    )}
                  </div>
                </div>
                <p className="text-sm font-semibold mt-2">Vaso Bajo</p>
              </div>
            </div>

            {animationComplete && (
              <>
                <Button variant="outline" onClick={startAnimation} className="mb-6 bg-transparent">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Repetir animación
                </Button>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setSelectedAnswer("misma")}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedAnswer === "misma"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <span className="font-semibold">a)</span> Es la misma cantidad de agua
                  </button>

                  <button
                    onClick={() => setSelectedAnswer("alto")}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedAnswer === "alto" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <span className="font-semibold">b)</span> Hay más en el vaso alto
                  </button>

                  <button
                    onClick={() => setSelectedAnswer("bajo")}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedAnswer === "bajo" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <span className="font-semibold">c)</span> Hay más en el vaso bajo
                  </button>
                </div>

                <Button onClick={checkAnswer} disabled={!!feedback} className="w-full">
                  Comprobar
                </Button>

                {feedback && (
                  <div
                    className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                      isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect && <CheckCircle2 className="h-5 w-5" />}
                    {feedback}
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
