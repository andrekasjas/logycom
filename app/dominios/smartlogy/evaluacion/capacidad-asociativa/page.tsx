"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, XCircle } from "lucide-react"
import Link from "next/link"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

type ImagePair = {
  id: string
  image1: string
  image2: string
  label1: string
  label2: string
}

const quadrants = [
  {
    title: "Animales y su hábitat",
    pairs: [
      { id: "pez-pecera", image1: "🐠", image2: "🏺", label1: "Pez", label2: "Pecera" },
      { id: "perro-casa", image1: "🐕", image2: "🏠", label1: "Perro", label2: "Casa" },
      { id: "pajaro-jaula", image1: "🐦", image2: "🪹", label1: "Pájaro", label2: "Jaula" },
      { id: "vaca-pasto", image1: "🐄", image2: "🌾", label1: "Vaca", label2: "Pasto" },
    ],
  },
  {
    title: "Objetos y su uso",
    pairs: [
      { id: "cepillo-cabello", image1: "🪮", image2: "💇", label1: "Cepillo", label2: "Cabello" },
      { id: "cuchillo-pan", image1: "🔪", image2: "🍞", label1: "Cuchillo", label2: "Pan" },
      { id: "llave-puerta", image1: "🔑", image2: "🚪", label1: "Llave", label2: "Puerta" },
      { id: "lapiz-cuaderno", image1: "✏️", image2: "📓", label1: "Lápiz", label2: "Cuaderno" },
    ],
  },
  {
    title: "Acciones y objetos",
    pairs: [
      { id: "dormir-cama", image1: "😴", image2: "🛏️", label1: "Dormir", label2: "Cama" },
      { id: "escribir-lapiz", image1: "✍️", image2: "✏️", label1: "Escribir", label2: "Lápiz" },
      { id: "comer-plato", image1: "🍽️", image2: "🍴", label1: "Comer", label2: "Plato" },
      { id: "leer-libro", image1: "📖", image2: "📚", label1: "Leer", label2: "Libro" },
    ],
  },
  {
    title: "Ropa y parte del cuerpo",
    pairs: [
      { id: "zapato-pie", image1: "👞", image2: "🦶", label1: "Zapato", label2: "Pie" },
      { id: "guante-mano", image1: "🧤", image2: "✋", label1: "Guante", label2: "Mano" },
      { id: "gorro-cabeza", image1: "🧢", image2: "👤", label1: "Gorro", label2: "Cabeza" },
      { id: "gafas-ojos", image1: "👓", image2: "👁️", label1: "Gafas", label2: "Ojos" },
    ],
  },
]

export default function CapacidadAsociativaPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [shuffledQuadrants, setShuffledQuadrants] = useState<any[]>([])

  useEffect(() => {
    const shuffled = quadrants.map((quadrant) => {
      const allItems = quadrant.pairs.flatMap((pair, pIndex) => [
        { ...pair, type: "1", uniqueId: `${pair.id}-1` },
        { ...pair, type: "2", uniqueId: `${pair.id}-2` },
      ])

      for (let i = allItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[allItems[i], allItems[j]] = [allItems[j], allItems[i]]
      }

      return {
        ...quadrant,
        shuffledItems: allItems,
      }
    })
    setShuffledQuadrants(shuffled)
  }, [])

  const handleItemClick = (quadrantIndex: number, itemId: string) => {
    if (matchedPairs.includes(itemId) || completed) return

    const newSelected = [...selectedItems, itemId]
    setSelectedItems(newSelected)

    if (newSelected.length === 2) {
      const [first, second] = newSelected
      const firstBase = first.replace("-1", "").replace("-2", "")
      const secondBase = second.replace("-1", "").replace("-2", "")

      const isPair = firstBase === secondBase && first !== second

      if (isPair) {
        setMatchedPairs([...matchedPairs, ...newSelected])
      }

      setTimeout(() => {
        setSelectedItems([])
      }, 300)
    }
  }

  const checkCompletion = () => {
    const totalPairs = quadrants.reduce((sum, q) => sum + q.pairs.length, 0)
    const matchedCount = matchedPairs.length / 2

    if (matchedCount === totalPairs) {
      setCompleted(true)
      setFeedback("¡Excelente! Has completado todas las asociaciones correctamente.")

      const progress = safeGetItem("smartlogy-progress", {})
      progress.capacidadAsociativa = true
      safeSetItem("smartlogy-progress", progress)

      setTimeout(() => {
        const completedActivities = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
        if (!completedActivities.includes("capacidad-asociativa")) {
          completedActivities.push("capacidad-asociativa")
          localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completedActivities))
        }
      }, 2000)
    } else {
      setFeedback(`Has emparejado ${matchedCount} de ${totalPairs} parejas. Continúa emparejando.`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Capacidad Asociativa
          </h1>
          <p className="text-gray-600">Haz clic en las imágenes que se relacionan entre sí</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {shuffledQuadrants.map((quadrant, qIndex) => (
            <Card key={qIndex} className="p-6">
              <h3 className="text-lg font-bold mb-4 text-center">{quadrant.title}</h3>

              <div className="grid grid-cols-4 gap-3">
                {quadrant.shuffledItems?.map((item: any) => {
                  const itemId = `${qIndex}-${item.uniqueId}`
                  const isImage1 = item.type === "1"

                  return (
                    <button
                      key={itemId}
                      onClick={() => handleItemClick(qIndex, itemId)}
                      disabled={matchedPairs.includes(itemId)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        matchedPairs.includes(itemId)
                          ? "bg-green-100 border-green-500"
                          : selectedItems.includes(itemId)
                            ? "bg-blue-100 border-blue-500 scale-95"
                            : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <div className="text-4xl mb-1">{isImage1 ? item.image1 : item.image2}</div>
                      <div className="text-xs font-medium">{isImage1 ? item.label1 : item.label2}</div>
                    </button>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Button onClick={checkCompletion} disabled={completed} size="lg" className="w-full">
            Listo
          </Button>

          {feedback && (
            <div
              className={`w-auto max-w-md mx-auto p-4 rounded-lg flex items-center gap-2 ${
                completed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {completed ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
