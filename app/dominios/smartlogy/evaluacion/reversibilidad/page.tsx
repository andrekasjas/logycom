"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export default function ReversibilidadPage() {
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [carPosition, setCarPosition] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  const correctAnswer = "retroceder"

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true)
      let pos = 0
      const interval = setInterval(() => {
        pos += 1
        setCarPosition(pos)
        if (pos >= 3) {
          clearInterval(interval)
        }
      }, 600)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleVerify = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === correctAnswer
    setResult(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
      if (!completed.includes("reversibilidad")) {
        completed.push("reversibilidad")
        localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
      }

      setTimeout(() => {
        router.push("/dominios/smartlogy/evaluacion")
      }, 2000)
    }
  }

  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <section className="pt-24 pb-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <Button
              variant="ghost"
              className="mb-6 md:mb-8 gap-2"
              onClick={() => router.push("/dominios/smartlogy/evaluacion")}
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </Button>

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Reversibilidad</h1>
              <p className="text-base md:text-lg text-muted-foreground">Encuentra la operación inversa</p>
            </div>

            <Card className="p-6 md:p-8">
              <div className="space-y-6">
                <div className="bg-secondary/30 p-8 rounded-lg mb-8">
                  <p className="text-lg text-center mb-6">Un auto se mueve 3 pasos hacia la derecha</p>
                  <div className="relative h-24 flex items-center">
                    <div className="absolute left-0 w-full h-1 bg-secondary top-1/2"></div>
                    {[0, 1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className="absolute w-3 h-3 bg-primary rounded-full top-1/2 -translate-y-1/2"
                        style={{ left: `${step * 25}%` }}
                      ></div>
                    ))}
                    <div
                      className="absolute text-5xl transition-all duration-500 ease-in-out"
                      style={{
                        left: showAnimation ? `${carPosition * 25}%` : "0%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      🚗
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-sm text-muted-foreground px-4">
                    <span>Inicio</span>
                    <span>Posición final</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-center mb-4 text-lg">¿Qué acción lo lleva al punto de partida?</p>

                  <Button
                    variant={selectedAnswer === "avanzar" ? "default" : "outline"}
                    className="w-full h-auto py-4 text-left"
                    onClick={() => setSelectedAnswer("avanzar")}
                    disabled={result !== null}
                  >
                    <span className="block">a) Avanzar 2 pasos más</span>
                  </Button>

                  <Button
                    variant={selectedAnswer === "retroceder" ? "default" : "outline"}
                    className="w-full h-auto py-4 text-left"
                    onClick={() => setSelectedAnswer("retroceder")}
                    disabled={result !== null}
                  >
                    <span className="block">b) Retroceder 3 pasos</span>
                  </Button>

                  <Button
                    variant={selectedAnswer === "girar" ? "default" : "outline"}
                    className="w-full h-auto py-4 text-left"
                    onClick={() => setSelectedAnswer("girar")}
                    disabled={result !== null}
                  >
                    <span className="block">c) Girar en círculo</span>
                  </Button>
                </div>

                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleVerify}
                  disabled={!selectedAnswer || result !== null}
                >
                  Listo
                </Button>

                {result && (
                  <div className="flex justify-center mt-6">
                    <div
                      className={`inline-flex items-center gap-3 px-6 py-4 rounded-lg ${
                        result === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {result === "correct" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Correcto</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Incorrecto</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}
