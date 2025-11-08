"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ManejoAutomaticoNumeroPage() {
  const router = useRouter()
  const [showObjects, setShowObjects] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [currentNumber, setCurrentNumber] = useState(5)

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 6) + 3 // 3 to 8
    setCurrentNumber(randomNumber)

    // Show objects for 3 seconds
    const timer = setTimeout(() => {
      setShowObjects(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleVerify = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentNumber
    setResult(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
      if (!completed.includes("manejo-automatico-numero")) {
        completed.push("manejo-automatico-numero")
        localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
      }

      setTimeout(() => {
        router.push("/dominios/smartlogy/evaluacion")
      }, 2000)
    }
  }

  return (
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Manejo automático del número</h1>
            <p className="text-base md:text-lg text-muted-foreground">Reconoce el número sin contar</p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="space-y-6">
              {showObjects ? (
                <div className="text-center py-12">
                  <p className="text-lg mb-8">¡Observa atentamente!</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {Array.from({ length: currentNumber }).map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-primary rounded-full"></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-lg text-center mb-8">¿Cuántos objetos viste?</p>

                  <div className="grid grid-cols-3 gap-3">
                    {[3, 4, 5, 6, 7, 8].map((num) => (
                      <Button
                        key={num}
                        variant={selectedAnswer === num ? "default" : "outline"}
                        className="h-16 text-xl"
                        onClick={() => setSelectedAnswer(num)}
                        disabled={result !== null}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>

                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleVerify}
                    disabled={selectedAnswer === null || result !== null}
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
              )}
            </div>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  )
}
