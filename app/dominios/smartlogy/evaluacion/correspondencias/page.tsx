"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

type Coin = {
  id: number
  placed: boolean
}

export default function CorrespondenciasPage() {
  const [currentActivity, setCurrentActivity] = useState<number>(0)

  // Uno-uno state
  const [unoUnoCoins, setUnoUnoCoins] = useState<Coin[]>([])
  const [unoUnoSlots, setUnoUnoSlots] = useState<(number | null)[]>([])
  const [unoUnoCompleted, setUnoUnoCompleted] = useState(false)
  const [unoUnoFeedback, setUnoUnoFeedback] = useState<string>("")

  // Acorta state
  const [acortaAnswer, setAcortaAnswer] = useState<string | null>(null)
  const [acortaCompleted, setAcortaCompleted] = useState(false)
  const [acortaFeedback, setAcortaFeedback] = useState<string>("")

  // Alarga state
  const [alargaAnswer, setAlargaAnswer] = useState<string | null>(null)
  const [alargaCompleted, setAlargaCompleted] = useState(false)
  const [alargaFeedback, setAlargaFeedback] = useState<string>("")
  const [alargaStretched, setAlargaStretched] = useState(false)

  // Agrega state
  const [agregaAnswer, setAgregaAnswer] = useState<string | null>(null)
  const [agregaCompleted, setAgregaCompleted] = useState(false)
  const [agregaFeedback, setAgregaFeedback] = useState<string>("")
  const [agregaAdded, setAgregaAdded] = useState(false)

  // Separa state
  const [separaAnswer, setSeparaAnswer] = useState<string | null>(null)
  const [separaCompleted, setSeparaCompleted] = useState(false)
  const [separaFeedback, setSeparaFeedback] = useState<string>("")

  const [draggedCoin, setDraggedCoin] = useState<number | null>(null)

  // Initialize Uno-uno
  useEffect(() => {
    if (currentActivity === 0) {
      const coins: Coin[] = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        placed: false,
      }))
      setUnoUnoCoins(coins)
      setUnoUnoSlots(Array(10).fill(null))
      setUnoUnoCompleted(false)
      setUnoUnoFeedback("")
    }
  }, [currentActivity])

  // Initialize Alarga animation
  useEffect(() => {
    if (currentActivity === 2) {
      setAlargaStretched(false)
      setAlargaAnswer(null)
      setAlargaCompleted(false)
      setAlargaFeedback("")

      // Stretch after 2 seconds
      setTimeout(() => {
        setAlargaStretched(true)
      }, 2000)
    }
  }, [currentActivity])

  // Initialize Agrega animation
  useEffect(() => {
    if (currentActivity === 3) {
      setAgregaAdded(false)
      setAgregaAnswer(null)
      setAgregaCompleted(false)
      setAgregaFeedback("")

      // Add coin after 2 seconds
      setTimeout(() => {
        setAgregaAdded(true)
      }, 2000)
    }
  }, [currentActivity])

  // Uno-uno handlers
  const handleCoinDragStart = (coinId: number) => {
    setDraggedCoin(coinId)
  }

  const handleSlotDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleSlotDrop = (slotIndex: number) => {
    if (draggedCoin === null) return
    if (unoUnoSlots[slotIndex] !== null) return

    const newSlots = [...unoUnoSlots]
    newSlots[slotIndex] = draggedCoin

    const newCoins = unoUnoCoins.map((coin) => (coin.id === draggedCoin ? { ...coin, placed: true } : coin))

    setUnoUnoSlots(newSlots)
    setUnoUnoCoins(newCoins)
    setDraggedCoin(null)
  }

  const removeFromSlot = (slotIndex: number) => {
    const coinId = unoUnoSlots[slotIndex]
    if (coinId === null) return

    const newSlots = [...unoUnoSlots]
    newSlots[slotIndex] = null

    const newCoins = unoUnoCoins.map((coin) => (coin.id === coinId ? { ...coin, placed: false } : coin))

    setUnoUnoSlots(newSlots)
    setUnoUnoCoins(newCoins)
  }

  const checkUnoUno = () => {
    const allPlaced = unoUnoSlots.every((slot) => slot !== null)

    if (!allPlaced) {
      setUnoUnoFeedback("Debes colocar todas las monedas en los espacios.")
      return
    }

    // Check if coins are in correct order (0-9)
    const isCorrect = unoUnoSlots.every((coinId, index) => coinId === index)

    if (isCorrect) {
      setUnoUnoFeedback("¡Excelente! Has emparejado todas las monedas correctamente.")
      setUnoUnoCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.correspondencias = progress.correspondencias || {}
      progress.correspondencias.unoUno = true
      safeSetItem("smartlogy-progress", progress)

      // Auto-advance after 2 seconds
      setTimeout(() => {
        setCurrentActivity(1)
      }, 2000)
    } else {
      setUnoUnoFeedback("Intenta nuevamente. Asegúrate de emparejar cada moneda con su espacio correspondiente.")
    }
  }

  // Acorta handler
  const checkAcorta = () => {
    if (!acortaAnswer) return

    const isCorrect = acortaAnswer === "a"

    if (isCorrect) {
      setAcortaFeedback("¡Correcto! Ambas filas tienen la misma cantidad de monedas.")
      setAcortaCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.correspondencias = progress.correspondencias || {}
      progress.correspondencias.acorta = true
      safeSetItem("smartlogy-progress", progress)

      // Auto-advance after 2 seconds
      setTimeout(() => {
        setCurrentActivity(2)
      }, 2000)
    } else {
      setAcortaFeedback("Incorrecto. Observa bien ambas filas y cuenta las monedas.")
    }
  }

  // Alarga handler
  const checkAlarga = () => {
    if (!alargaAnswer) return

    const isCorrect = alargaAnswer === "c"

    if (isCorrect) {
      setAlargaFeedback("¡Correcto! Ambas filas tienen la misma cantidad de monedas.")
      setAlargaCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.correspondencias = progress.correspondencias || {}
      progress.correspondencias.alarga = true
      safeSetItem("smartlogy-progress", progress)

      // Auto-advance after 2 seconds
      setTimeout(() => {
        setCurrentActivity(3)
      }, 2000)
    } else {
      setAlargaFeedback("Incorrecto. El espacio entre las monedas no cambia la cantidad.")
    }
  }

  // Agrega handler
  const checkAgrega = () => {
    if (!agregaAnswer) return

    const isCorrect = agregaAnswer === "c"

    if (isCorrect) {
      setAgregaFeedback("¡Correcto! La fila de abajo tiene más monedas.")
      setAgregaCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.correspondencias = progress.correspondencias || {}
      progress.correspondencias.agrega = true
      safeSetItem("smartlogy-progress", progress)

      // Auto-advance after 2 seconds
      setTimeout(() => {
        setCurrentActivity(4)
      }, 2000)
    } else {
      setAgregaFeedback("Incorrecto. Observa cuántas monedas hay en cada fila.")
    }
  }

  // Separa handler
  const checkSepara = () => {
    if (!separaAnswer) return

    const isCorrect = separaAnswer === "a"

    if (isCorrect) {
      setSeparaFeedback("¡Correcto! Ambas filas tienen la misma cantidad de monedas.")
      setSeparaCompleted(true)

      const progress = safeGetItem("smartlogy-progress", {})
      progress.correspondencias = progress.correspondencias || {}
      progress.correspondencias.separa = true
      safeSetItem("smartlogy-progress", progress)

      // Mark entire correspondencias section as complete
      const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
      if (!completed.includes("correspondencias")) {
        completed.push("correspondencias")
        localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
      }
    } else {
      setSeparaFeedback("Incorrecto. El espacio entre las monedas no afecta la cantidad.")
    }
  }

  const activities = [
    {
      title: "Uno-uno",
      description: "Empareja las monedas",
    },
    {
      title: "Acorta",
      description: "Fila más corta, misma cantidad",
    },
    {
      title: "Alarga",
      description: "Fila más larga, misma cantidad",
    },
    {
      title: "Agrega",
      description: "¿Hay más o menos monedas?",
    },
    {
      title: "Separa",
      description: "Aumenta el espacio, no la cantidad",
    },
  ]

  const restartAlargaAnimation = () => {
    setAlargaStretched(false)
    setTimeout(() => {
      setAlargaStretched(true)
    }, 100)
  }

  const restartAgregaAnimation = () => {
    setAgregaAdded(false)
    setTimeout(() => {
      setAgregaAdded(true)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/dominios/smartlogy/evaluacion">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Evaluación
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Correspondencias
          </h1>
          <p className="text-gray-600">Completa las cinco actividades de correspondencia</p>
        </div>

        {/* Activity Selector */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {activities.map((activity, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all ${
                currentActivity === index ? "ring-2 ring-amber-500 bg-amber-50" : "hover:shadow-lg"
              }`}
              onClick={() => setCurrentActivity(index)}
            >
              <h3 className="font-semibold text-sm mb-1">{activity.title}</h3>
              <p className="text-xs text-gray-600">{activity.description}</p>
            </Card>
          ))}
        </div>

        {/* Uno-uno Activity */}
        {currentActivity === 0 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Empareja las monedas</h2>
            <p className="text-gray-600 mb-6">
              Arrastra cada moneda de la parte superior hacia su espacio correspondiente en la fila inferior
            </p>

            {/* Top row - Available coins */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Monedas disponibles:</h3>
              <div className="flex gap-3 justify-center p-6 bg-gray-50 rounded-lg min-h-[100px] flex-wrap">
                {unoUnoCoins
                  .filter((coin) => !coin.placed)
                  .map((coin) => (
                    <div
                      key={coin.id}
                      draggable
                      onDragStart={() => handleCoinDragStart(coin.id)}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 cursor-move hover:scale-110 transition-transform flex items-center justify-center text-amber-900 font-bold text-xl shadow-lg"
                    >
                      {coin.id + 1}
                    </div>
                  ))}
              </div>
            </div>

            {/* Bottom row - Slots */}
            <div>
              <h3 className="font-semibold mb-3">Espacios para emparejar:</h3>
              <div className="flex gap-3 justify-center p-6 bg-amber-50 rounded-lg flex-wrap">
                {unoUnoSlots.map((coinId, index) => (
                  <div
                    key={index}
                    onDragOver={handleSlotDragOver}
                    onDrop={() => handleSlotDrop(index)}
                    onClick={() => coinId !== null && removeFromSlot(index)}
                    className={`w-16 h-16 rounded-full border-4 border-dashed transition-all relative ${
                      coinId !== null
                        ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-amber-600 cursor-pointer hover:scale-110"
                        : "border-amber-300 bg-amber-100/50"
                    } flex items-center justify-center text-amber-900 font-bold text-xl shadow-inner`}
                  >
                    {coinId === null && (
                      <span className="text-amber-300 text-2xl font-bold opacity-40">{index + 1}</span>
                    )}
                    {coinId !== null && coinId + 1}
                  </div>
                ))}
              </div>
            </div>

            {unoUnoFeedback && (
              <div
                className={`mt-6 p-4 rounded-lg flex items-center gap-2 ${
                  unoUnoCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {unoUnoCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {unoUnoFeedback}
              </div>
            )}

            <Button onClick={checkUnoUno} disabled={unoUnoCompleted} className="mt-6 w-full" size="lg">
              Comprobar
            </Button>
          </Card>
        )}

        {/* Acorta Activity */}
        {currentActivity === 1 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Fila más corta, misma cantidad</h2>
            <p className="text-gray-600 mb-6">Observa ambas filas y responde la pregunta</p>

            <div className="space-y-6 mb-8">
              {/* Top row - spread out */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila superior:</p>
                <div className="flex gap-8 justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom row - closer together */}
              <div className="p-6 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila inferior (más corta):</p>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="font-semibold">¿Qué observas?</p>
              {[
                { value: "a", label: "Tienen la misma cantidad" },
                { value: "b", label: "La fila corta tiene menos" },
                { value: "c", label: "La fila larga tiene más" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAcortaAnswer(option.value)}
                  disabled={acortaCompleted}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    acortaAnswer === option.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-300 hover:border-amber-300"
                  } ${acortaCompleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {acortaFeedback && (
              <div
                className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                  acortaCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {acortaCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {acortaFeedback}
              </div>
            )}

            <Button onClick={checkAcorta} disabled={!acortaAnswer || acortaCompleted} className="w-full" size="lg">
              Comprobar
            </Button>
          </Card>
        )}

        {/* Alarga Activity */}
        {currentActivity === 2 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Fila más larga, misma cantidad</h2>
            <p className="text-gray-600 mb-6">
              Observa cómo la fila superior se estira. ¿Cambia la cantidad de monedas?
            </p>

            <div className="mb-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={restartAlargaAnimation}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Repetir animación
              </Button>
            </div>

            <div className="space-y-6 mb-8">
              {/* Top row - stretches */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila superior:</p>
                <div
                  className={`flex justify-center transition-all duration-1000 ${alargaStretched ? "gap-8" : "gap-2"}`}
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom row - stays same */}
              <div className="p-6 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila inferior:</p>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            {alargaStretched && (
              <>
                <div className="space-y-3 mb-6">
                  <p className="font-semibold">¿Qué observas?</p>
                  {[
                    { value: "a", label: "La fila de arriba tiene más" },
                    { value: "b", label: "La fila de abajo tiene más" },
                    { value: "c", label: "Tienen la misma cantidad" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAlargaAnswer(option.value)}
                      disabled={alargaCompleted}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        alargaAnswer === option.value
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-300 hover:border-amber-300"
                      } ${alargaCompleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {alargaFeedback && (
                  <div
                    className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                      alargaCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {alargaCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    {alargaFeedback}
                  </div>
                )}

                <Button onClick={checkAlarga} disabled={!alargaAnswer || alargaCompleted} className="w-full" size="lg">
                  Comprobar
                </Button>
              </>
            )}
          </Card>
        )}

        {/* Agrega Activity */}
        {currentActivity === 3 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">¿Hay más o menos monedas?</h2>
            <p className="text-gray-600 mb-6">Observa cómo se agrega una moneda. ¿Qué cambia?</p>

            <div className="mb-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={restartAgregaAnimation}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Repetir animación
              </Button>
            </div>

            <div className="space-y-6 mb-8">
              {/* Top row - stays same */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila superior:</p>
                <div className="flex gap-3 justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom row - adds one */}
              <div className="p-6 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila inferior:</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                  {agregaAdded && (
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                      style={{
                        animation: "scaleIn 0.8s ease-out forwards",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {agregaAdded && (
              <>
                <div className="space-y-3 mb-6">
                  <p className="font-semibold">¿Qué observas?</p>
                  {[
                    { value: "a", label: "Son iguales" },
                    { value: "b", label: "La fila de arriba tiene más" },
                    { value: "c", label: "La fila de abajo tiene más" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAgregaAnswer(option.value)}
                      disabled={agregaCompleted}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        agregaAnswer === option.value
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-300 hover:border-amber-300"
                      } ${agregaCompleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {agregaFeedback && (
                  <div
                    className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                      agregaCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {agregaCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    {agregaFeedback}
                  </div>
                )}

                <Button onClick={checkAgrega} disabled={!agregaAnswer || agregaCompleted} className="w-full" size="lg">
                  Comprobar
                </Button>
              </>
            )}

            <style jsx>{`
              @keyframes scaleIn {
                from {
                  transform: scale(0) rotate(0deg);
                  opacity: 0;
                }
                50% {
                  transform: scale(1.2) rotate(180deg);
                }
                to {
                  transform: scale(1) rotate(360deg);
                  opacity: 1;
                }
              }
            `}</style>
          </Card>
        )}

        {/* Separa Activity */}
        {currentActivity === 4 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Aumenta el espacio, pero no la cantidad</h2>
            <p className="text-gray-600 mb-6">La segunda fila tiene las monedas más separadas. ¿Cambia la cantidad?</p>

            <div className="space-y-6 mb-8">
              {/* Top row - normal spacing */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila superior:</p>
                <div className="flex gap-3 justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom row - more spacing */}
              <div className="p-6 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Fila inferior (más separada):</p>
                <div className="flex gap-8 justify-center">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-4 border-amber-600 shadow-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="font-semibold">¿Qué observas?</p>
              {[
                { value: "a", label: "Son iguales" },
                { value: "b", label: "La de arriba tiene más" },
                { value: "c", label: "La de abajo tiene más" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSeparaAnswer(option.value)}
                  disabled={separaCompleted}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    separaAnswer === option.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-300 hover:border-amber-300"
                  } ${separaCompleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {separaFeedback && (
              <div
                className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                  separaCompleted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {separaCompleted ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {separaFeedback}
              </div>
            )}

            <Button onClick={checkSepara} disabled={!separaAnswer || separaCompleted} className="w-full" size="lg">
              Comprobar
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
