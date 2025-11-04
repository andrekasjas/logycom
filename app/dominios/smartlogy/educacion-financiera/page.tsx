"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle, Coins } from "lucide-react"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

type Activity = "concepto-ahorro" | "gastar-vs-ahorrar" | "meta-ahorro"

export default function EducacionFinancieraPage() {
  const [currentActivity, setCurrentActivity] = useState<Activity>("concepto-ahorro")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [savedAmount, setSavedAmount] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [showRetry, setShowRetry] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const progress = safeGetItem("smartlogy-educacion-financiera-progress", {})
    const activityOrder: Activity[] = ["concepto-ahorro", "gastar-vs-ahorrar", "meta-ahorro"]

    const firstIncomplete = activityOrder.find((activity) => !progress[activity])
    if (firstIncomplete) {
      setCurrentActivity(firstIncomplete)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentActivity])

  const handleCheck = (correctAnswer: string) => {
    const isCorrect = selectedAnswer === correctAnswer

    setFeedback(isCorrect ? "correct" : "incorrect")
    setShowRetry(!isCorrect)

    if (isCorrect) {
      const progress = safeGetItem("smartlogy-educacion-financiera-progress", {})
      progress[currentActivity] = true
      safeSetItem("smartlogy-educacion-financiera-progress", progress)

      const allComplete = Object.keys(activities).every((key) => progress[key])
      if (allComplete) {
        const completed = safeGetItem("smartlogyCompletedActivities", [])
        if (!completed.includes("educacion-financiera")) {
          completed.push("educacion-financiera")
          safeSetItem("smartlogyCompletedActivities", completed)
        }
      }

      setTimeout(() => {
        const activityOrder: Activity[] = ["concepto-ahorro", "gastar-vs-ahorrar", "meta-ahorro"]
        const currentIndex = activityOrder.indexOf(currentActivity)
        if (currentIndex < activityOrder.length - 1) {
          setCurrentActivity(activityOrder[currentIndex + 1])
          setSelectedAnswer(null)
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
    setFeedback(null)
    setShowRetry(false)
  }

  const handleSave = (amount: number) => {
    setSavedAmount((prev) => prev + amount)
  }

  const activities = {
    "concepto-ahorro": {
      title: "1. ¿Qué es Ahorrar?",
      description: "Selecciona la mejor definición de ahorrar",
      content: (
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Coins className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            {[
              { id: "a", text: "Gastar todo el dinero que tengo" },
              { id: "b", text: "Guardar dinero para usarlo en el futuro" },
              { id: "c", text: "Pedir dinero prestado" },
              { id: "d", text: "Comprar cosas que no necesito" },
            ].map((option) => (
              <Button
                key={option.id}
                variant={selectedAnswer === option.id ? "default" : "outline"}
                size="lg"
                className="w-full text-left justify-start h-auto py-4 px-6"
                onClick={() => setSelectedAnswer(option.id)}
                disabled={feedback !== null}
              >
                <span className="text-base">{option.text}</span>
              </Button>
            ))}
          </div>
          <Button className="w-full" size="lg" onClick={() => handleCheck("b")} disabled={!selectedAnswer}>
            Comprobar
          </Button>
        </div>
      ),
    },
    "gastar-vs-ahorrar": {
      title: "2. Gastar vs Ahorrar",
      description: "¿Qué harías en esta situación?",
      content: (
        <div className="space-y-6">
          <div className="bg-secondary/50 p-6 rounded-lg">
            <p className="text-lg text-center mb-4">
              Tienes $5000 y quieres comprar un juguete que cuesta $8000. ¿Qué deberías hacer?
            </p>
          </div>
          <div className="space-y-4">
            {[
              { id: "a", text: "Pedir dinero prestado para comprarlo ahora" },
              { id: "b", text: "Ahorrar hasta tener los $8000" },
              { id: "c", text: "Gastar los $5000 en otras cosas" },
              { id: "d", text: "Comprar algo más barato que no quiero" },
            ].map((option) => (
              <Button
                key={option.id}
                variant={selectedAnswer === option.id ? "default" : "outline"}
                size="lg"
                className="w-full text-left justify-start h-auto py-4 px-6"
                onClick={() => setSelectedAnswer(option.id)}
                disabled={feedback !== null}
              >
                <span className="text-base">{option.text}</span>
              </Button>
            ))}
          </div>
          <Button className="w-full" size="lg" onClick={() => handleCheck("b")} disabled={!selectedAnswer}>
            Comprobar
          </Button>
        </div>
      ),
    },
    "meta-ahorro": {
      title: "3. Meta de Ahorro",
      description: "Ahorra $5000 para alcanzar tu meta",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full"></div>
              <div className="absolute inset-4 bg-pink-300 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Coins className="w-12 h-12 text-pink-800 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-pink-900">${savedAmount}</p>
                  <p className="text-sm text-pink-700">de $5000</p>
                </div>
              </div>
            </div>
            <div className="w-full bg-secondary rounded-full h-4 mb-6">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(savedAmount / 5000) * 100}%` }}
              ></div>
            </div>
          </div>

          {savedAmount < 5000 ? (
            <>
              <p className="text-center text-muted-foreground mb-4">Selecciona cuánto quieres ahorrar</p>
              <div className="grid grid-cols-2 gap-4">
                {[500, 1000, 1500, 2000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="lg"
                    onClick={() => handleSave(amount)}
                    disabled={savedAmount + amount > 5000}
                  >
                    Ahorrar ${amount}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <p className="text-xl font-bold mb-2">¡Meta alcanzada!</p>
                <p>Has ahorrado exitosamente $5000</p>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  const progress = safeGetItem("smartlogy-educacion-financiera-progress", {})
                  progress["meta-ahorro"] = true
                  safeSetItem("smartlogy-educacion-financiera-progress", progress)

                  const completed = safeGetItem("smartlogyCompletedActivities", [])
                  if (!completed.includes("educacion-financiera")) {
                    completed.push("educacion-financiera")
                    safeSetItem("smartlogyCompletedActivities", completed)
                  }

                  setTimeout(() => {
                    window.location.href = "/dominios/smartlogy"
                  }, 1500)
                }}
              >
                Finalizar
              </Button>
            </div>
          )}

          {feedback && (
            <div
              className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
                feedback === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {feedback === "correct" ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-semibold">¡Correcto! Avanzando...</span>
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
            <Button className="w-full bg-transparent" variant="outline" onClick={handleRetry}>
              Reintentar
            </Button>
          )}
        </div>
      ),
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
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  )
}
