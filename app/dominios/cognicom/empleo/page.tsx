"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, Mic, MicOff } from 'lucide-react'
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

export default function EmpleoPage() {
  const [currentActivity, setCurrentActivity] = useState<1 | 2>(1)
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [showHelp, setShowHelp] = useState(false)

  // Activity 1: Redactar para Vender
  const [salesParagraph, setSalesParagraph] = useState("")
  const [selectedSalesObject, setSelectedSalesObject] = useState("Teléfono móvil")
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Activity 2: La Entrevista
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>(["", "", "", "", ""])

  const salesObjects = ["Teléfono móvil", "Bicicleta", "Libro", "Reloj", "Zapatos"]
  const interviewQuestions = [
    "¿Cuál es tu destino de vacaciones favorito?",
    "¿Qué actividades te gusta hacer en vacaciones?",
    "¿Prefieres la playa o la montaña?",
    "¿Con quién te gusta viajar?",
    "¿Cuál ha sido tu mejor experiencia de vacaciones?",
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "es-ES"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSalesParagraph(transcript)
        setIsRecording(false)
      }

      recognitionRef.current.onerror = () => {
        setIsRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
      }
    }
  }, [])

  const startRecording = () => {
    if (recognitionRef.current) {
      setSalesParagraph("")
      setIsRecording(true)
      recognitionRef.current.start()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const verifyActivity1 = () => {
    if (salesParagraph.length > 20) {
      setResult("correct")
      const progress = safeGetItem("cognicom-progress", {})
      progress.empleo = progress.empleo || {}
      progress.empleo.redactar = true
      safeSetItem("cognicom-progress", progress)

      setTimeout(() => {
        setCurrentActivity(2)
        setResult(null)
        setSalesParagraph("")
      }, 2000)
    } else {
      setResult("incorrect")
    }
  }

  const verifyActivity2 = () => {
    const answeredCount = interviewAnswers.filter((a) => a.trim().length > 10).length
    if (answeredCount >= 5) {
      setResult("correct")
      const progress = safeGetItem("cognicom-progress", {})
      progress.empleo = progress.empleo || {}
      progress.empleo.entrevista = true
      safeSetItem("cognicom-progress", progress)

      setTimeout(() => {
        window.history.back()
      }, 2000)
    } else {
      setResult("incorrect")
    }
  }

  const updateInterviewAnswer = (index: number, value: string) => {
    const newAnswers = [...interviewAnswers]
    newAnswers[index] = value
    setInterviewAnswers(newAnswers)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <section className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" className="mb-6 md:mb-8 gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Empleo</h1>
            <p className="text-base md:text-lg text-muted-foreground">Actividad {currentActivity} de 2</p>
          </div>

          {currentActivity === 1 && (
            <Card className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Redactar para Vender</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowHelp(!showHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Escribe un párrafo persuasivo que describa las características y beneficios
                    del producto. Puedes usar el micrófono para dictar tu texto.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Selecciona un producto para vender:</label>
                  <div className="flex flex-wrap gap-2">
                    {salesObjects.map((obj) => (
                      <Button
                        key={obj}
                        variant={selectedSalesObject === obj ? "default" : "outline"}
                        onClick={() => setSelectedSalesObject(obj)}
                      >
                        {obj}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Escribe un párrafo para vender "{selectedSalesObject}":
                  </label>
                  <div className="flex gap-2 mb-2">
                    {recognitionRef.current && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={isRecording ? stopRecording : startRecording}
                        className="gap-2"
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        {isRecording ? "Detener" : "Grabar"}
                      </Button>
                    )}
                  </div>
                  <textarea
                    value={salesParagraph}
                    onChange={(e) => setSalesParagraph(e.target.value)}
                    className="w-full p-3 border rounded-lg min-h-[150px]"
                    placeholder="Ejemplo: Este teléfono móvil es perfecto para..."
                  />
                </div>

                <Button className="w-full" size="lg" onClick={verifyActivity1}>
                  Listo
                </Button>

                {result && (
                  <div className="flex justify-center">
                    <div
                      className={`w-auto inline-flex items-center gap-3 px-6 py-4 rounded-lg ${
                        result === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {result === "correct" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">¡Excelente! Pasando a la siguiente actividad...</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Escribe más detalles sobre el producto</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentActivity === 2 && (
            <Card className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">La Entrevista</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowHelp(!showHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Responde a todas las preguntas de la entrevista con respuestas completas y
                    detalladas.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">Responde las siguientes preguntas sobre vacaciones:</p>

                {interviewQuestions.map((question, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2">
                      {index + 1}. {question}
                    </label>
                    <textarea
                      value={interviewAnswers[index]}
                      onChange={(e) => updateInterviewAnswer(index, e.target.value)}
                      className="w-full p-3 border rounded-lg min-h-[100px]"
                      placeholder="Escribe tu respuesta aquí..."
                    />
                  </div>
                ))}

                <Button className="w-full" size="lg" onClick={verifyActivity2}>
                  Completar Entrevista
                </Button>

                {result && (
                  <div className="flex justify-center">
                    <div
                      className={`w-auto inline-flex items-center gap-3 px-6 py-4 rounded-lg ${
                        result === "correct" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {result === "correct" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">¡Completado! Regresando...</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">Responde todas las preguntas con detalle</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}
