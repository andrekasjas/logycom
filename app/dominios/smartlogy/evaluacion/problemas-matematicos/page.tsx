"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProblemasMatematicosPage() {
  const router = useRouter()
  const [currentProblem, setCurrentProblem] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)

  const problems = [
    {
      id: 1,
      title: "Escenario 1 – Suma contextual",
      scenario: "Camila tenía 3 manzanas 🍎 y su amigo le dio 2 más.",
      question: "¿Cuántas manzanas tiene ahora?",
      options: [
        { value: "4", label: "a) 4" },
        { value: "5", label: "b) 5" },
        { value: "6", label: "c) 6" },
      ],
      correct: "5",
      feedback: "¡Muy bien! Sumaste las cantidades correctamente al razonar sobre la situación.",
    },
    {
      id: 2,
      title: "Escenario 2 – Resta y reversibilidad",
      scenario: "Juan tenía 6 dulces 🍬 y se comió 2.",
      question: "¿Cuántos dulces le quedan?",
      options: [
        { value: "2", label: "a) 2" },
        { value: "3", label: "b) 3" },
        { value: "4", label: "c) 4" },
      ],
      correct: "4",
      feedback: "¡Excelente! Restaste correctamente y comprendiste la acción de quitar como inversa a sumar.",
    },
  ]

  const currentProblemData = problems[currentProblem - 1]

  const handleVerify = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === currentProblemData.correct
    setResult(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      setTimeout(() => {
        if (currentProblem < problems.length) {
          setCurrentProblem(currentProblem + 1)
          setSelectedAnswer(null)
          setResult(null)
        } else {
          const completed = JSON.parse(localStorage.getItem("smartlogyCompletedActivities") || "[]")
          if (!completed.includes("problemas-matematicos")) {
            completed.push("problemas-matematicos")
            localStorage.setItem("smartlogyCompletedActivities", JSON.stringify(completed))
          }
          router.push("/dominios/smartlogy/evaluacion")
        }
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Problemas matemáticos</h1>
            <p className="text-base md:text-lg text-muted-foreground">Resuelve pensando</p>
            <p className="text-sm text-muted-foreground mt-2">
              Problema {currentProblem} de {problems.length}
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center mb-4">{currentProblemData.title}</h3>

              <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                <p className="text-lg text-center mb-4">{currentProblemData.scenario}</p>
                <p className="text-lg font-semibold text-center">{currentProblemData.question}</p>
              </div>

              <div className="space-y-3">
                {currentProblemData.options.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedAnswer === option.value ? "default" : "outline"}
                    className="w-full h-auto py-4 text-left justify-start"
                    onClick={() => setSelectedAnswer(option.value)}
                    disabled={result !== null}
                  >
                    {option.label}
                  </Button>
                ))}
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
                    className={`inline-flex flex-col items-center gap-3 px-6 py-4 rounded-lg ${
                      result === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
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
                    {result === "correct" && <p className="text-sm text-center">{currentProblemData.feedback}</p>}
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
