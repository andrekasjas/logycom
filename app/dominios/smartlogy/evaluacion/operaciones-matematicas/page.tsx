"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OperacionesMatematicasPage() {
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)

  const correctAnswer = 7

  const handleVerify = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === correctAnswer
    setResult(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
      if (!completed.includes("operaciones-matematicas")) {
        completed.push("operaciones-matematicas")
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Operaciones matemáticas</h1>
            <p className="text-base md:text-lg text-muted-foreground">Resuelve con lógica</p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="space-y-6">
              <p className="text-lg text-center mb-8">Observa el problema visual y selecciona el resultado correcto</p>

              <div className="bg-secondary/30 p-8 rounded-lg mb-8">
                <div className="flex justify-center items-center gap-6 text-4xl">
                  <div className="flex gap-2">
                    <span>🍎</span>
                    <span>🍎</span>
                    <span>🍎</span>
                  </div>
                  <span className="text-3xl font-bold">+</span>
                  <div className="flex gap-2">
                    <span>🍎</span>
                    <span>🍎</span>
                    <span>🍎</span>
                    <span>🍎</span>
                  </div>
                  <span className="text-3xl font-bold">=</span>
                  <span className="text-3xl font-bold">?</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-center mb-4">¿Cuántas manzanas hay en total?</p>

                <div className="grid grid-cols-3 gap-3">
                  {[5, 6, 7, 8, 9, 10].map((num) => (
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
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  )
}
