"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, XCircle } from "lucide-react"
import Link from "next/link"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

type Sequence = {
  id: string
  title: string
  steps: string[]
  options: { id: string; label: string; emoji: string }[]
  correctOption: string
}

const sequences: Sequence[] = [
  {
    id: "banana",
    title: "Comer una banana",
    steps: ["🍌", "🫳", "🍌✂️", "😋"],
    options: [
      { id: "eat", label: "Comer", emoji: "🍽️" },
      { id: "peel", label: "Pelar", emoji: "✂️" },
      { id: "throw", label: "Tirar", emoji: "🗑️" },
    ],
    correctOption: "eat",
  },
  {
    id: "dishes",
    title: "Lavar platos",
    steps: ["🍽️", "💧", "🧽", "✨"],
    options: [
      { id: "wash", label: "Lavar", emoji: "🧼" },
      { id: "cook", label: "Cocinar", emoji: "👨‍🍳" },
      { id: "eat", label: "Comer", emoji: "🍴" },
    ],
    correctOption: "wash",
  },
  {
    id: "read",
    title: "Leer un libro",
    steps: ["📚", "📖", "👀", "✍️"],
    options: [
      { id: "write", label: "Escribir", emoji: "✏️" },
      { id: "read", label: "Leer", emoji: "📖" },
      { id: "sleep", label: "Dormir", emoji: "😴" },
    ],
    correctOption: "read",
  },
]

export default function CapacidadApreciativaPage() {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleOptionClick = (sequenceId: string, optionId: string) => {
    if (completed) return

    setSelectedOptions({
      ...selectedOptions,
      [sequenceId]: optionId,
    })
  }

  const checkAnswers = () => {
    const allAnswered = sequences.every((seq) => selectedOptions[seq.id])

    if (!allAnswered) {
      setFeedback("Por favor, selecciona una opción para cada secuencia.")
      return
    }

    const correctCount = sequences.filter((seq) => selectedOptions[seq.id] === seq.correctOption).length

    setShowResults(true)
    setCompleted(true)

    if (correctCount === sequences.length) {
      setFeedback("¡Excelente! Has identificado correctamente todas las acciones.")

      // Save progress
      const progress = safeGetItem("smartlogy-progress", {})
      progress.capacidadApreciativa = true
      safeSetItem("smartlogy-progress", progress)

      // Mark as complete
      setTimeout(() => {
        const completedActivities = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
        if (!completedActivities.includes("capacidad-apreciativa")) {
          completedActivities.push("capacidad-apreciativa")
          localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completedActivities))
        }
      }, 2000)
    } else {
      setFeedback(`Has acertado ${correctCount} de ${sequences.length} secuencias.`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Capacidad Apreciativa
          </h1>
          <p className="text-gray-600">
            Observa cada secuencia y selecciona la imagen que representa la acción completa
          </p>
        </div>

        <div className="space-y-6 mb-6">
          {sequences.map((sequence) => (
            <Card key={sequence.id} className="p-6">
              <h3 className="text-lg font-bold mb-4">{sequence.title}</h3>

              {/* Sequence Steps */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Secuencia de pasos:</p>
                <div className="flex justify-center gap-4 mb-4">
                  {sequence.steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-4xl bg-white p-4 rounded-lg shadow-sm border-2 border-gray-200">{step}</div>
                      {index < sequence.steps.length - 1 && <div className="text-2xl mx-2 text-gray-400">→</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div>
                <p className="text-sm text-gray-600 mb-3">¿Qué acción representa esta secuencia?</p>
                <div className="grid grid-cols-3 gap-4">
                  {sequence.options.map((option) => {
                    const isSelected = selectedOptions[sequence.id] === option.id
                    const isCorrect = option.id === sequence.correctOption
                    const showCorrectness = showResults && isSelected

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(sequence.id, option.id)}
                        disabled={completed}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          showCorrectness
                            ? isCorrect
                              ? "bg-green-100 border-green-500"
                              : "bg-red-100 border-red-500"
                            : isSelected
                              ? "bg-blue-100 border-blue-500"
                              : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        <div className="text-5xl mb-2">{option.emoji}</div>
                        <div className="text-sm font-medium">{option.label}</div>
                        {showCorrectness && (
                          <div className="mt-2">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 mx-auto text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 mx-auto text-red-600" />
                            )}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Button onClick={checkAnswers} disabled={completed} size="lg" className="w-full">
            Comprobar
          </Button>

          {feedback && (
            <div
              className={`w-auto max-w-md mx-auto p-4 rounded-lg flex items-center gap-2 ${
                completed && sequences.every((seq) => selectedOptions[seq.id] === seq.correctOption)
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {completed && sequences.every((seq) => selectedOptions[seq.id] === seq.correctOption) ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
