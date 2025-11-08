"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ConservacionVolumenPage() {
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
      if (!completed.includes("conservacion-volumen")) {
        completed.push("conservacion-volumen")
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Noción de conservación de volumen</h1>
            <p className="text-base md:text-lg text-muted-foreground">¿Cuál tiene más agua?</p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="space-y-6">
              <p className="text-lg text-center mb-8">
                En pantalla se presentan dos recipientes con líquidos de igual cantidad, pero de diferentes formas.
              </p>

              <div className="flex justify-center items-end gap-8 mb-8">
                <div className="text-center">
                  <div className="w-24 h-40 bg-blue-200 border-4 border-blue-400 rounded-lg flex items-end justify-center overflow-hidden mb-2">
                    <div className="w-full h-32 bg-blue-400"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Alto y delgado</p>
                </div>

                <div className="text-center">
                  <div className="w-40 h-24 bg-blue-200 border-4 border-blue-400 rounded-lg flex items-end justify-center overflow-hidden mb-2">
                    <div className="w-full h-16 bg-blue-400"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Bajo y ancho</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-center mb-4">¿Cuál tiene más agua?</p>

                <Button
                  variant={selectedAnswer === "alto" ? "default" : "outline"}
                  className="w-full h-auto py-4"
                  onClick={() => setSelectedAnswer("alto")}
                  disabled={result !== null}
                >
                  El recipiente alto y delgado
                </Button>

                <Button
                  variant={selectedAnswer === "bajo" ? "default" : "outline"}
                  className="w-full h-auto py-4"
                  onClick={() => setSelectedAnswer("bajo")}
                  disabled={result !== null}
                >
                  El recipiente bajo y ancho
                </Button>

                <Button
                  variant={selectedAnswer === "igual" ? "default" : "outline"}
                  className="w-full h-auto py-4"
                  onClick={() => setSelectedAnswer("igual")}
                  disabled={result !== null}
                >
                  Ambos tienen la misma cantidad
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
