"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ConservacionPesoPage() {
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)

  const correctAnswer = "igual"

  const handleVerify = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === correctAnswer
    setResult(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
      if (!completed.includes("conservacion-peso")) {
        completed.push("conservacion-peso")
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Noción de conservación de peso</h1>
            <p className="text-base md:text-lg text-muted-foreground">¿Cuál pesa lo mismo?</p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="space-y-6">
              <p className="text-lg text-center mb-8">
                En pantalla se muestran dos figuras de plastilina o masas del mismo tamaño, una de ellas modificada en
                su forma.
              </p>

              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-orange-300 rounded-full flex items-center justify-center mb-2">
                    <span className="text-4xl">⚪</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Bola de plastilina</p>
                </div>

                <div className="text-center">
                  <div className="w-40 h-20 bg-orange-300 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-4xl">▬</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Misma plastilina (aplastada)</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-center mb-4">¿Cuál pesa más o pesan lo mismo?</p>

                <Button
                  variant={selectedAnswer === "bola" ? "default" : "outline"}
                  className="w-full h-auto py-4"
                  onClick={() => setSelectedAnswer("bola")}
                  disabled={result !== null}
                >
                  La bola pesa más
                </Button>

                <Button
                  variant={selectedAnswer === "aplastada" ? "default" : "outline"}
                  className="w-full h-auto py-4"
                  onClick={() => setSelectedAnswer("aplastada")}
                  disabled={result !== null}
                >
                  La aplastada pesa más
                </Button>

                <Button
                  variant={selectedAnswer === "igual" ? "default" : "outline"}
                  className="w-full h-auto py-4"
                  onClick={() => setSelectedAnswer("igual")}
                  disabled={result !== null}
                >
                  Pesan lo mismo
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
  )
}
