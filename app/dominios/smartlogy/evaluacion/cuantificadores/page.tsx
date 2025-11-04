"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, XCircle } from "lucide-react"
import Link from "next/link"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

type Activity = {
  id: string
  title: string
  description: string
  correctOrder?: string[]
  correctAnswer?: string
}

const activities: Activity[] = [
  {
    id: "mucho-poco",
    title: "Mucho – Poco",
    description: "Selecciona primero muchas manzanas, luego pocas",
    correctOrder: ["mucho", "poco"],
  },
  {
    id: "mas-menos",
    title: "Más – Menos",
    description: "Selecciona primero más vasos, luego menos",
    correctOrder: ["mas", "menos"],
  },
  {
    id: "algunos-casi-todos",
    title: "Algunos – Casi todos",
    description: "Selecciona primero algunos globos, luego casi todos",
    correctOrder: ["algunos", "casi-todos"],
  },
  {
    id: "todo-nada",
    title: "Todo – Nada",
    description: "Selecciona primero la alcancía llena, luego la vacía",
    correctOrder: ["todo", "nada"],
  },
  {
    id: "igual-mismo",
    title: "Igual – Lo mismo",
    description: "¿Tienen la misma cantidad?",
    correctAnswer: "mismo",
  },
]

export default function CuantificadoresPage() {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [selections, setSelections] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [imageOrder, setImageOrder] = useState<string[]>([])

  const activity = activities[currentActivity]

  useEffect(() => {
    if (activity.correctOrder) {
      const order = [...activity.correctOrder]
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }
      setImageOrder(order)
    }
  }, [currentActivity])

  const handleSelection = (option: string) => {
    if (completed) return

    if (activity.correctOrder) {
      if (selections.includes(option)) {
        setSelections(selections.filter((s) => s !== option))
      } else if (selections.length < 2) {
        setSelections([...selections, option])
      }
    }
  }

  const checkAnswer = () => {
    let correct = false

    if (activity.correctOrder) {
      if (selections.length !== 2) {
        setFeedback("Por favor, selecciona ambas opciones en orden.")
        return
      }
      correct = selections[0] === activity.correctOrder[0] && selections[1] === activity.correctOrder[1]
    } else if (activity.correctAnswer) {
      if (!selectedAnswer) {
        setFeedback("Por favor, selecciona una respuesta.")
        return
      }
      correct = selectedAnswer === activity.correctAnswer
    }

    setIsCorrect(correct)
    setCompleted(true)

    if (correct) {
      setFeedback("¡Excelente! Has respondido correctamente.")

      const progress = safeGetItem("smartlogy-progress", {})
      progress.cuantificadores = progress.cuantificadores || {}
      progress.cuantificadores[activity.id] = true
      safeSetItem("smartlogy-progress", progress)

      setTimeout(() => {
        if (currentActivity < activities.length - 1) {
          setCurrentActivity(currentActivity + 1)
          setSelections([])
          setSelectedAnswer(null)
          setFeedback("")
          setCompleted(false)
        } else {
          const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
          if (!completed.includes("cuantificadores")) {
            completed.push("cuantificadores")
            localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
          }
        }
      }, 2000)
    } else {
      setFeedback("Intenta de nuevo.")
    }
  }

  const renderActivity = () => {
    const [first, second] = imageOrder.length === 2 ? imageOrder : activity.correctOrder || []

    if (activity.id === "mucho-poco") {
      return (
        <div className="flex gap-8 justify-center">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-red-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-6 shadow-lg">
              <div className={first === "mucho" ? "grid grid-cols-5 gap-2" : "flex items-center justify-center gap-4"}>
                {Array.from({ length: first === "mucho" ? 10 : 2 }).map((_, i) => (
                  <div key={i} className="text-4xl">
                    🍎
                  </div>
                ))}
              </div>
            </div>
            {selections.includes(first) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(first) + 1}
              </div>
            )}
          </button>

          <button
            onClick={() => handleSelection(second)}
            className={`relative transition-all ${
              selections.includes(second) ? "ring-4 ring-red-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-6 shadow-lg">
              <div className={second === "mucho" ? "grid grid-cols-5 gap-2" : "flex items-center justify-center gap-4"}>
                {Array.from({ length: second === "mucho" ? 10 : 2 }).map((_, i) => (
                  <div key={i} className="text-4xl">
                    🍎
                  </div>
                ))}
              </div>
            </div>
            {selections.includes(second) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(second) + 1}
              </div>
            )}
          </button>
        </div>
      )
    }

    if (activity.id === "mas-menos") {
      return (
        <div className="flex gap-8 justify-center">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 shadow-lg">
              <div className={first === "mas" ? "grid grid-cols-4 gap-3" : "grid grid-cols-2 gap-6"}>
                {Array.from({ length: first === "mas" ? 8 : 4 }).map((_, i) => (
                  <div key={i} className={first === "mas" ? "text-3xl" : "text-4xl"}>
                    🥤
                  </div>
                ))}
              </div>
            </div>
            {selections.includes(first) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(first) + 1}
              </div>
            )}
          </button>

          <button
            onClick={() => handleSelection(second)}
            className={`relative transition-all ${
              selections.includes(second) ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 shadow-lg">
              <div className={second === "mas" ? "grid grid-cols-4 gap-3" : "grid grid-cols-2 gap-6"}>
                {Array.from({ length: second === "mas" ? 8 : 4 }).map((_, i) => (
                  <div key={i} className={second === "mas" ? "text-3xl" : "text-4xl"}>
                    🥤
                  </div>
                ))}
              </div>
            </div>
            {selections.includes(second) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(second) + 1}
              </div>
            )}
          </button>
        </div>
      )
    }

    if (activity.id === "algunos-casi-todos") {
      return (
        <div className="flex gap-8 justify-center">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-pink-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="text-3xl">
                    🎈
                  </div>
                ))}
              </div>
              <p className="text-sm text-center mt-2 font-semibold">
                {first === "algunos" ? "3 de 10 inflados" : "8 de 10 inflados"}
              </p>
            </div>
            {selections.includes(first) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(first) + 1}
              </div>
            )}
          </button>

          <button
            onClick={() => handleSelection(second)}
            className={`relative transition-all ${
              selections.includes(second) ? "ring-4 ring-pink-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-64 h-64 bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="text-3xl">
                    🎈
                  </div>
                ))}
              </div>
              <p className="text-sm text-center mt-2 font-semibold">
                {second === "algunos" ? "3 de 10 inflados" : "8 de 10 inflados"}
              </p>
            </div>
            {selections.includes(second) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(second) + 1}
              </div>
            )}
          </button>
        </div>
      )
    }

    if (activity.id === "todo-nada") {
      return (
        <div className="flex gap-8 justify-center">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-yellow-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-48 h-56 bg-gradient-to-br from-pink-300 to-pink-400 rounded-3xl p-6 shadow-lg relative">
              <div className="absolute top-4 right-4 text-2xl">🐷</div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-pink-600 rounded"></div>
              {first === "todo" && (
                <div className="grid grid-cols-4 gap-1 mt-12">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="text-xl">
                      🪙
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selections.includes(first) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(first) + 1}
              </div>
            )}
          </button>

          <button
            onClick={() => handleSelection(second)}
            className={`relative transition-all ${
              selections.includes(second) ? "ring-4 ring-yellow-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div className="w-48 h-56 bg-gradient-to-br from-pink-300 to-pink-400 rounded-3xl p-6 shadow-lg relative">
              <div className="absolute top-4 right-4 text-2xl">🐷</div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-pink-600 rounded"></div>
              {second === "todo" && (
                <div className="grid grid-cols-4 gap-1 mt-12">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="text-xl">
                      🪙
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selections.includes(second) && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                {selections.indexOf(second) + 1}
              </div>
            )}
          </button>
        </div>
      )
    }

    if (activity.id === "igual-mismo") {
      return (
        <div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 shadow-lg">
              <p className="text-sm font-semibold mb-4 text-center">Grupo A</p>
              <div className="grid grid-cols-5 gap-2 justify-items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="text-3xl">
                    🧸
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 shadow-lg">
              <p className="text-sm font-semibold mb-4 text-center">Grupo B</p>
              <div className="grid grid-cols-5 gap-2 justify-items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="text-3xl">
                    🧸
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedAnswer("mismo")}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedAnswer === "mismo"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <span className="font-semibold">a)</span> Tienen lo mismo
            </button>

            <button
              onClick={() => setSelectedAnswer("diferente")}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedAnswer === "diferente"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <span className="font-semibold">b)</span> Tienen diferente cantidad
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            Cuantificadores
          </h1>
          <p className="text-gray-600">Identifica cantidades y relaciones</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {activities.map((act, index) => (
            <Card
              key={act.id}
              className={`p-4 cursor-pointer transition-all ${
                currentActivity === index ? "ring-2 ring-orange-500 bg-orange-50" : "hover:shadow-lg"
              }`}
              onClick={() => {
                setCurrentActivity(index)
                setSelections([])
                setSelectedAnswer(null)
                setFeedback("")
                setCompleted(false)
              }}
            >
              <h3 className="font-semibold text-sm">{act.title}</h3>
            </Card>
          ))}
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-2">{activity.title}</h2>
          <p className="text-gray-600 mb-8">{activity.description}</p>

          <div className="mb-8">{renderActivity()}</div>

          <Button
            onClick={checkAnswer}
            disabled={completed || (activity.correctOrder ? selections.length !== 2 : !selectedAnswer)}
            className="w-full mb-4"
          >
            Comprobar
          </Button>

          {feedback && (
            <div
              className={`p-4 rounded-lg flex items-center gap-2 ${
                isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {feedback}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
