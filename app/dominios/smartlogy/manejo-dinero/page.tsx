"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

type Activity = "identificar" | "contar" | "pagar-exacto" | "pagar-mas" | "calcular-vueltas" | "dar-vueltas"

interface Coin {
  id: number
  value: number
  image: string
  isBill?: boolean
}

const COIN_IMAGES = {
  50: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/50-dyKEYFFQBkn4xj6T4aJm4e47y1AtyT.webp",
  100: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/100-zYInTZCRKa8CGHNmi9fEUebst5rivP.webp",
  200: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/200-yVVpTsMhA8pZvevfuPgyHVT1SgqdCm.webp",
  500: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/500-EMXpTRTlxjtYuj9kiWpyMqtEJQnz3U.webp",
  1000: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000-2FPOuXEmDrOFCgGjEDvCcqPnqq3hXK.webp",
}

export default function ManejoDineroPage() {
  const [currentActivity, setCurrentActivity] = useState<Activity>("identificar")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [selectedCoinIds, setSelectedCoinIds] = useState<number[]>([])
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [showRetry, setShowRetry] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const progress = safeGetItem("smartlogy-manejo-dinero-progress", {})
    const activityOrder: Activity[] = [
      "identificar",
      "contar",
      "pagar-exacto",
      "pagar-mas",
      "calcular-vueltas",
      "dar-vueltas",
    ]

    const firstIncomplete = activityOrder.find((activity) => !progress[activity])
    if (firstIncomplete) {
      setCurrentActivity(firstIncomplete)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentActivity])

  const handleCheck = (correctAnswer: string | number, availableCoins?: Coin[]) => {
    let isCorrect = false

    if (typeof correctAnswer === "number" && availableCoins) {
      const selectedValues = selectedCoinIds.map((id) => availableCoins.find((c) => c.id === id)?.value || 0)
      const total = selectedValues.reduce((sum, val) => sum + val, 0)
      isCorrect = total === correctAnswer
    } else {
      isCorrect = selectedAnswer === correctAnswer
    }

    setFeedback(isCorrect ? "correct" : "incorrect")
    setShowRetry(!isCorrect)

    if (isCorrect) {
      const progress = safeGetItem("smartlogy-manejo-dinero-progress", {})
      progress[currentActivity] = true
      safeSetItem("smartlogy-manejo-dinero-progress", progress)

      const allComplete = Object.keys(activities).every((key) => progress[key])
      if (allComplete) {
        const completed = safeGetItem("smartlogyCompletedActivities", [])
        if (!completed.includes("manejo-dinero")) {
          completed.push("manejo-dinero")
          safeSetItem("smartlogyCompletedActivities", completed)
        }
      }

      setTimeout(() => {
        const activityOrder: Activity[] = [
          "identificar",
          "contar",
          "pagar-exacto",
          "pagar-mas",
          "calcular-vueltas",
          "dar-vueltas",
        ]
        const currentIndex = activityOrder.indexOf(currentActivity)
        if (currentIndex < activityOrder.length - 1) {
          setCurrentActivity(activityOrder[currentIndex + 1])
          setSelectedAnswer(null)
          setSelectedCoinIds([])
          setFeedback(null)
          setShowRetry(false)
        } else {
          setTimeout(() => {
            window.location.href = "/dominios/smartlogy"
          }, 1500)
        }
      }, 2000)
    }
  }

  const handleRetry = () => {
    setSelectedAnswer(null)
    setSelectedCoinIds([])
    setFeedback(null)
    setShowRetry(false)
  }

  const toggleCoin = (coinId: number) => {
    if (selectedCoinIds.includes(coinId)) {
      setSelectedCoinIds(selectedCoinIds.filter((id) => id !== coinId))
    } else {
      setSelectedCoinIds([...selectedCoinIds, coinId])
    }
  }

  const calculateTotal = (coins: Coin[]) => {
    return selectedCoinIds.reduce((sum, id) => {
      const coin = coins.find((c) => c.id === id)
      return sum + (coin?.value || 0)
    }, 0)
  }

  const activities = {
    identificar: {
      title: "1. Identificar Valores",
      description: "¿Cuánto vale esta moneda?",
      content: (
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src={COIN_IMAGES[500] || "/placeholder.svg"}
              alt="Moneda de 500 pesos"
              className="w-32 h-32 object-contain"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["$200", "$500", "$1.000", "$100"].map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedAnswer(option)}
                disabled={feedback !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button className="w-full" size="lg" onClick={() => handleCheck("$500")} disabled={!selectedAnswer}>
            Comprobar
          </Button>
        </div>
      ),
    },
    contar: {
      title: "2. Contar Dinero",
      description: "¿Cuánto dinero hay en total?",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            {[1000, 500, 200, 100, 100].map((value, idx) => (
              <img
                key={idx}
                src={COIN_IMAGES[value as keyof typeof COIN_IMAGES] || "/placeholder.svg"}
                alt={`Moneda de ${value} pesos`}
                className="w-20 h-20 object-contain"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["$1.800", "$1.900", "$2.000", "$1.700"].map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedAnswer(option)}
                disabled={feedback !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button className="w-full" size="lg" onClick={() => handleCheck("$1.900")} disabled={!selectedAnswer}>
            Comprobar
          </Button>
        </div>
      ),
    },
    "pagar-exacto": {
      title: "3. Pagar Exacto",
      description: "Selecciona las monedas para pagar exactamente $1.200",
      content: (() => {
        const coins: Coin[] = [
          { id: 0, value: 1000, image: COIN_IMAGES[1000] },
          { id: 1, value: 500, image: COIN_IMAGES[500] },
          { id: 2, value: 200, image: COIN_IMAGES[200] },
          { id: 3, value: 200, image: COIN_IMAGES[200] },
          { id: 4, value: 100, image: COIN_IMAGES[100] },
          { id: 5, value: 100, image: COIN_IMAGES[100] },
          { id: 6, value: 50, image: COIN_IMAGES[50] },
        ]
        return (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">Precio: $1.200</p>
              <p className="text-muted-foreground mb-4">Selecciona las monedas correctas</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {coins.map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => toggleCoin(coin.id)}
                  disabled={feedback !== null}
                  className={`w-24 h-24 rounded-full p-1 transition-all ${
                    selectedCoinIds.includes(coin.id)
                      ? "ring-4 ring-green-500 scale-110"
                      : "ring-2 ring-gray-300 hover:ring-gray-400"
                  }`}
                >
                  <img
                    src={coin.image || "/placeholder.svg"}
                    alt={`Moneda de ${coin.value} pesos`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg">
                Total seleccionado: <span className="font-bold">${calculateTotal(coins).toLocaleString("es-CO")}</span>
              </p>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => handleCheck(1200, coins)}
              disabled={selectedCoinIds.length === 0}
            >
              Comprobar
            </Button>
          </div>
        )
      })(),
    },
    "pagar-mas": {
      title: "4. Pagar con Más",
      description: "El precio es $800. Selecciona monedas para pagar (puede ser más)",
      content: (() => {
        const coins: Coin[] = [
          { id: 0, value: 1000, image: COIN_IMAGES[1000] },
          { id: 1, value: 500, image: COIN_IMAGES[500] },
          { id: 2, value: 200, image: COIN_IMAGES[200] },
          { id: 3, value: 100, image: COIN_IMAGES[100] },
          { id: 4, value: 100, image: COIN_IMAGES[100] },
          { id: 5, value: 50, image: COIN_IMAGES[50] },
        ]
        return (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">Precio: $800</p>
              <p className="text-muted-foreground mb-4">Puedes pagar con más dinero</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {coins.map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => toggleCoin(coin.id)}
                  disabled={feedback !== null}
                  className={`w-24 h-24 rounded-full p-1 transition-all ${
                    selectedCoinIds.includes(coin.id)
                      ? "ring-4 ring-green-500 scale-110"
                      : "ring-2 ring-gray-300 hover:ring-gray-400"
                  }`}
                >
                  <img
                    src={coin.image || "/placeholder.svg"}
                    alt={`Moneda de ${coin.value} pesos`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg">
                Total seleccionado: <span className="font-bold">${calculateTotal(coins).toLocaleString("es-CO")}</span>
              </p>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                const total = calculateTotal(coins)
                const isCorrect = total >= 800
                setFeedback(isCorrect ? "correct" : "incorrect")
                setShowRetry(!isCorrect)
                if (isCorrect) {
                  const progress = safeGetItem("smartlogy-manejo-dinero-progress", {})
                  progress[currentActivity] = true
                  safeSetItem("smartlogy-manejo-dinero-progress", progress)
                  setTimeout(() => {
                    setCurrentActivity("calcular-vueltas")
                    setSelectedAnswer(null)
                    setSelectedCoinIds([])
                    setFeedback(null)
                    setShowRetry(false)
                  }, 2000)
                }
              }}
              disabled={selectedCoinIds.length === 0}
            >
              Comprobar
            </Button>
          </div>
        )
      })(),
    },
    "calcular-vueltas": {
      title: "5. Calcular Vueltas",
      description: "Un cuaderno cuesta $650. Si pagas con $1.000, ¿cuánto te devuelven?",
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">Producto: Cuaderno</p>
            <p className="text-xl">Precio: $650</p>
            <p className="text-xl">Pagas con: $1.000</p>
            <p className="text-2xl font-bold">¿Cuánto te devuelven?</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["$250", "$350", "$450", "$550"].map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedAnswer(option)}
                disabled={feedback !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button className="w-full" size="lg" onClick={() => handleCheck("$350")} disabled={!selectedAnswer}>
            Comprobar
          </Button>
        </div>
      ),
    },
    "dar-vueltas": {
      title: "6. Dar Vueltas",
      description: "Una goma cuesta $600. El cliente paga con $1.000. Debes devolver $400",
      content: (() => {
        const coins: Coin[] = [
          { id: 0, value: 500, image: COIN_IMAGES[500] },
          { id: 1, value: 200, image: COIN_IMAGES[200] },
          { id: 2, value: 200, image: COIN_IMAGES[200] },
          { id: 3, value: 100, image: COIN_IMAGES[100] },
          { id: 4, value: 100, image: COIN_IMAGES[100] },
          { id: 5, value: 50, image: COIN_IMAGES[50] },
          { id: 6, value: 50, image: COIN_IMAGES[50] },
        ]
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg text-muted-foreground">Producto: Goma</p>
              <p className="text-lg">Precio: $600</p>
              <p className="text-lg">Cliente paga: $1.000</p>
              <p className="text-2xl font-bold mb-4">Vueltas: $400</p>
              <p className="text-muted-foreground">Selecciona las monedas para dar el cambio</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {coins.map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => toggleCoin(coin.id)}
                  disabled={feedback !== null}
                  className={`w-24 h-24 rounded-full p-1 transition-all ${
                    selectedCoinIds.includes(coin.id)
                      ? "ring-4 ring-green-500 scale-110"
                      : "ring-2 ring-gray-300 hover:ring-gray-400"
                  }`}
                >
                  <img
                    src={coin.image || "/placeholder.svg"}
                    alt={`Moneda de ${coin.value} pesos`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg">
                Total seleccionado: <span className="font-bold">${calculateTotal(coins).toLocaleString("es-CO")}</span>
              </p>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => handleCheck(400, coins)}
              disabled={selectedCoinIds.length === 0}
            >
              Comprobar
            </Button>
          </div>
        )
      })(),
    },
  }

  const activity = activities[currentActivity]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <section className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            className="mb-6 md:mb-8 gap-2"
            onClick={() => (window.location.href = "/dominios/smartlogy")}
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Button>

          <Card className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{activity.title}</h2>
              <p className="text-muted-foreground">{activity.description}</p>
            </div>

            {activity.content}

            {feedback && (
              <div
                className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
                  feedback === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {feedback === "correct" ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-semibold">¡Correcto! Avanzando a la siguiente actividad...</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    <span className="font-semibold">Incorrecto. Intenta de nuevo.</span>
                  </>
                )}
              </div>
            )}

            {showRetry && (
              <Button className="w-full mt-4 bg-transparent" variant="outline" onClick={handleRetry}>
                Reintentar
              </Button>
            )}
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  )
}
