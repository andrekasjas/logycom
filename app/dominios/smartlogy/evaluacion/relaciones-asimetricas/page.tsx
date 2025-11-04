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
  correctOrder: string[]
}

const activities: Activity[] = [
  {
    id: "grande-pequeno",
    title: "Grande – Pequeño",
    description: "Selecciona primero el grande, luego el pequeño",
    correctOrder: ["grande", "pequeno"],
  },
  {
    id: "gordo-flaco",
    title: "Gordo – Flaco",
    description: "Selecciona primero el gordo, luego el flaco",
    correctOrder: ["gordo", "flaco"],
  },
  {
    id: "alto-bajo",
    title: "Alto – Bajo",
    description: "Selecciona primero el alto, luego el bajo",
    correctOrder: ["alto", "bajo"],
  },
  {
    id: "ancho-angosto",
    title: "Ancho – Angosto",
    description: "Selecciona primero el ancho, luego el angosto",
    correctOrder: ["ancho", "angosto"],
  },
]

export default function RelacionesAsimetricasPage() {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [selections, setSelections] = useState<string[]>([])
  const [feedback, setFeedback] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [imageOrder, setImageOrder] = useState<string[]>([])

  const activity = activities[currentActivity]

  useEffect(() => {
    const order = [...activity.correctOrder]
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }
    setImageOrder(order)
  }, [currentActivity])

  const handleSelection = (option: string) => {
    if (completed) return

    if (selections.includes(option)) {
      setSelections(selections.filter((s) => s !== option))
    } else if (selections.length < 2) {
      setSelections([...selections, option])
    }
  }

  const checkAnswer = () => {
    if (selections.length !== 2) {
      setFeedback("Por favor, selecciona ambas opciones en orden.")
      return
    }

    const correct = selections[0] === activity.correctOrder[0] && selections[1] === activity.correctOrder[1]
    setIsCorrect(correct)
    setCompleted(true)

    if (correct) {
      setFeedback("¡Excelente! Has seleccionado el orden correcto.")

      const progress = safeGetItem("smartlogy-progress", {})
      progress.relacionesAsimetricas = progress.relacionesAsimetricas || {}
      progress.relacionesAsimetricas[activity.id] = true
      safeSetItem("smartlogy-progress", progress)

      setTimeout(() => {
        if (currentActivity < activities.length - 1) {
          setCurrentActivity(currentActivity + 1)
          setSelections([])
          setFeedback("")
          setCompleted(false)
        } else {
          const completedActivities = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
          if (!completedActivities.includes("relaciones-asimetricas")) {
            completedActivities.push("relaciones-asimetricas")
            localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completedActivities))
          }
        }
      }, 2000)
    } else {
      setFeedback("Intenta de nuevo. Revisa el orden de selección.")
    }
  }

  const renderImages = () => {
    const [first, second] = imageOrder.length === 2 ? imageOrder : activity.correctOrder

    if (activity.id === "grande-pequeno") {
      return (
        <div className="flex gap-8 justify-center">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div
              className={`${
                first === "grande" ? "w-48 h-48" : "w-32 h-32"
              } bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${first === "grande" ? "text-6xl" : "text-4xl"}`}>🏀</span>
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
            <div
              className={`${
                second === "grande" ? "w-48 h-48" : "w-32 h-32"
              } bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${second === "grande" ? "text-6xl" : "text-4xl"}`}>🏀</span>
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

    if (activity.id === "gordo-flaco") {
      return (
        <div className="flex gap-8 justify-center items-end">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div
              className={`${
                first === "gordo" ? "w-48 h-56" : "w-24 h-56"
              } bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${first === "gordo" ? "text-6xl" : "text-5xl"}`}>🐷</span>
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
            <div
              className={`${
                second === "gordo" ? "w-48 h-56" : "w-24 h-56"
              } bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${second === "gordo" ? "text-6xl" : "text-5xl"}`}>🐷</span>
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

    if (activity.id === "alto-bajo") {
      return (
        <div className="flex gap-8 justify-center items-end">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div
              className={`w-32 ${
                first === "alto" ? "h-72" : "h-40"
              } bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${first === "alto" ? "text-6xl" : "text-5xl"}`}>🌲</span>
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
            <div
              className={`w-32 ${
                second === "alto" ? "h-72" : "h-40"
              } bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${second === "alto" ? "text-6xl" : "text-5xl"}`}>🌲</span>
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

    if (activity.id === "ancho-angosto") {
      return (
        <div className="flex gap-8 justify-center items-center">
          <button
            onClick={() => handleSelection(first)}
            className={`relative transition-all ${
              selections.includes(first) ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105"
            }`}
          >
            <div
              className={`${
                first === "ancho" ? "w-56 h-48" : "w-32 h-48"
              } bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${first === "ancho" ? "text-6xl" : "text-5xl"}`}>🚪</span>
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
            <div
              className={`${
                second === "ancho" ? "w-56 h-48" : "w-32 h-48"
              } bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg`}
            >
              <span className={`text-white ${second === "ancho" ? "text-6xl" : "text-5xl"}`}>🚪</span>
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Relaciones Asimétricas
          </h1>
          <p className="text-gray-600">Identifica y ordena las diferencias</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {activities.map((act, index) => (
            <Card
              key={act.id}
              className={`p-4 cursor-pointer transition-all ${
                currentActivity === index ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-lg"
              }`}
              onClick={() => {
                setCurrentActivity(index)
                setSelections([])
                setFeedback("")
                setCompleted(false)
              }}
            >
              <h3 className="font-semibold text-sm mb-1">{act.title}</h3>
            </Card>
          ))}
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-2">{activity.title}</h2>
          <p className="text-gray-600 mb-8">{activity.description}</p>

          <div className="mb-8">{renderImages()}</div>

          <Button onClick={checkAnswer} disabled={completed || selections.length !== 2} className="w-full mb-4">
            {selections.length === 2 ? "Comprobar" : `Selecciona ${2 - selections.length} más`}
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
