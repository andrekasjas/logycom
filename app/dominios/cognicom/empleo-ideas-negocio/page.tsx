"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, HelpCircle, ArrowLeft, Mic, MicOff } from "lucide-react"

export default function EmpleoIdeasNegocioPage() {
  const [selectedActivity, setSelectedActivity] = useState<"redactar" | "entrevista" | null>(null)
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  // Redactar para Vender
  const [selectedSalesObject, setSelectedSalesObject] = useState("Teléfono móvil")
  const [salesParagraph, setSalesParagraph] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordedText, setRecordedText] = useState("")
  const [showRedactarHelp, setShowRedactarHelp] = useState(false)
  const [redactarResult, setRedactarResult] = useState<"correct" | "incorrect" | null>(null)
  const recognitionRef = useRef<any>(null)

  // Entrevista
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>(["", "", "", "", ""])
  const [showEntrevistaHelp, setShowEntrevistaHelp] = useState(false)
  const [entrevistaResult, setEntrevistaResult] = useState<"correct" | "incorrect" | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("empleoIdeasNegocioCompleted")
    if (saved) {
      setCompletedActivities(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "es-ES"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setRecordedText(transcript)
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

  const saveProgress = (activity: string) => {
    const updated = [...completedActivities, activity]
    setCompletedActivities(updated)
    localStorage.setItem("empleoIdeasNegocioCompleted", JSON.stringify(updated))
  }

  const startRecording = () => {
    if (recognitionRef.current) {
      setRecordedText("")
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

  const salesObjects = ["Teléfono móvil", "Bicicleta", "Libro", "Reloj", "Zapatos"]

  const checkRedactarParaVender = () => {
    if (salesParagraph.length > 50) {
      setRedactarResult("correct")
      saveProgress("redactar")
      setTimeout(() => {
        setSelectedActivity(null)
        setSalesParagraph("")
        setRedactarResult(null)
      }, 2000)
    } else {
      setRedactarResult("incorrect")
    }
  }

  const interviewQuestions = [
    "¿Cuál es tu destino de vacaciones favorito?",
    "¿Qué actividades te gusta hacer en vacaciones?",
    "¿Prefieres la playa o la montaña?",
    "¿Con quién te gusta viajar?",
    "¿Cuál ha sido tu mejor experiencia de vacaciones?",
  ]

  const checkEntrevista = () => {
    const answeredCount = interviewAnswers.filter((a) => a.trim().length > 10).length
    if (answeredCount >= 5) {
      setEntrevistaResult("correct")
      saveProgress("entrevista")
      setTimeout(() => {
        setSelectedActivity(null)
        setInterviewAnswers(["", "", "", "", ""])
        setEntrevistaResult(null)
      }, 2000)
    } else {
      setEntrevistaResult("incorrect")
    }
  }

  if (!selectedActivity) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <Button variant="outline" className="mb-6 ml-2 bg-transparent" onClick={() => (window.location.href = "/")}>
            Volver a inicio
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-center">Empleo e Ideas de Negocio</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Desarrolla habilidades de comunicación para el mundo laboral
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedActivity("redactar")}
            >
              <h2 className="text-2xl font-bold mb-4">Redactar para Vender</h2>
              <p className="text-muted-foreground">
                Aprende a escribir textos persuasivos para vender productos de manera efectiva
              </p>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedActivity("entrevista")}
            >
              <h2 className="text-2xl font-bold mb-4">La Entrevista</h2>
              <p className="text-muted-foreground">
                Practica realizar entrevistas efectivas haciendo preguntas sobre vacaciones
              </p>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (selectedActivity === "redactar") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedActivity(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <Button variant="outline" className="mb-6 ml-2 bg-transparent" onClick={() => (window.location.href = "/")}>
            Volver a inicio
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-center">Redactar para Vender</h1>

          <Card className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Escribe un Anuncio</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowRedactarHelp(!showRedactarHelp)}>
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>

            {showRedactarHelp && (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ayuda:</strong> Escribe un párrafo persuasivo que convenza a alguien de comprar el objeto
                  seleccionado. Describe sus ventajas, características y por qué es una buena compra. Puedes escribir o
                  usar el micrófono para dictar.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Selecciona un objeto para vender:</label>
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Escribe tu anuncio de venta:</label>
                  {typeof window !== "undefined" && "webkitSpeechRecognition" in window && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isRecording ? stopRecording : startRecording}
                      className="gap-2 bg-transparent"
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="w-4 h-4" />
                          Detener
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          Dictar
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <textarea
                  value={salesParagraph}
                  onChange={(e) => setSalesParagraph(e.target.value)}
                  className="w-full p-3 border rounded-lg min-h-[150px]"
                  placeholder={`Escribe un párrafo persuasivo para vender ${selectedSalesObject.toLowerCase()}...`}
                />
                <p className="text-xs text-muted-foreground mt-1">{salesParagraph.length} caracteres</p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-medium mb-2">Consejos:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Menciona las características principales del producto</li>
                  <li>Explica los beneficios para el comprador</li>
                  <li>Usa palabras positivas y persuasivas</li>
                  <li>Destaca lo que hace especial a este producto</li>
                </ul>
              </div>

              <Button onClick={checkRedactarParaVender} className="w-full">
                Completar Actividad
              </Button>

              {redactarResult === "correct" && (
                <div className="flex items-center gap-2 text-green-600 justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Excelente anuncio! Actividad completada</span>
                </div>
              )}

              {redactarResult === "incorrect" && (
                <div className="flex items-center gap-2 text-red-600 justify-center">
                  <XCircle className="w-5 h-5" />
                  <span>Escribe al menos 50 caracteres para tu anuncio</span>
                </div>
              )}
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (selectedActivity === "entrevista") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedActivity(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <Button variant="outline" className="mb-6 ml-2 bg-transparent" onClick={() => (window.location.href = "/")}>
            Volver a inicio
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-center">La Entrevista</h1>

          <Card className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Entrevista sobre Vacaciones</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowEntrevistaHelp(!showEntrevistaHelp)}>
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>

            {showEntrevistaHelp && (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ayuda:</strong> Realiza una entrevista a un familiar sobre sus preferencias de vacaciones.
                  Escribe las respuestas que te dé para cada pregunta. Las respuestas deben ser completas y detalladas.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <p className="text-muted-foreground">
                Haz estas 5 preguntas a un familiar sobre el lugar donde le gustaría ir de vacaciones y registra sus
                respuestas:
              </p>

              {interviewQuestions.map((question, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2">
                    {index + 1}. {question}
                  </label>
                  <textarea
                    value={interviewAnswers[index]}
                    onChange={(e) => {
                      const newAnswers = [...interviewAnswers]
                      newAnswers[index] = e.target.value
                      setInterviewAnswers(newAnswers)
                    }}
                    className="w-full p-3 border rounded-lg min-h-[80px]"
                    placeholder="Escribe la respuesta del entrevistado..."
                  />
                </div>
              ))}

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-medium mb-2">Recuerda:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Escucha atentamente las respuestas</li>
                  <li>Anota detalles específicos</li>
                  <li>Puedes hacer preguntas de seguimiento para obtener más información</li>
                  <li>Sé respetuoso y muestra interés en las respuestas</li>
                </ul>
              </div>

              <Button onClick={checkEntrevista} className="w-full">
                Completar Entrevista
              </Button>

              {entrevistaResult === "correct" && (
                <div className="flex items-center gap-2 text-green-600 justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Excelente! Has completado la entrevista</span>
                </div>
              )}

              {entrevistaResult === "incorrect" && (
                <div className="flex items-center gap-2 text-red-600 justify-center">
                  <XCircle className="w-5 h-5" />
                  <span>Completa las 5 respuestas con al menos 10 caracteres cada una</span>
                </div>
              )}
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return null
}
