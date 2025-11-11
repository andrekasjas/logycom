"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, HelpCircle, ArrowLeft, Mic, MicOff, Volume2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompetenciasComunicativasPage() {
  const router = useRouter()
  const [selectedCompetencia, setSelectedCompetencia] = useState<
    "linguistica" | "paraling" | "pragmatica" | "proxemica" | null
  >(null)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState<string[]>([])

  // Estados para Lingüística
  const [linguisticaLevel, setLinguisticaLevel] = useState(1)
  const [expositionTopic, setExpositionTopic] = useState("")
  const [expositionResult, setExpositionResult] = useState<"correct" | "incorrect" | null>(null)
  const [showLinguisticaHelp, setShowLinguisticaHelp] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [recipeTitle, setRecipeTitle] = useState("")
  const [recipeSteps, setRecipeSteps] = useState("")

  // Estados para Paralingüística
  const [paratingLevel, setParatingLevel] = useState(1)
  const [selectedWordList, setSelectedWordList] = useState(0)
  const [wordListResult, setWordListResult] = useState<"correct" | "incorrect" | null>(null)
  const [showParatingHelp, setShowParatingHelp] = useState(false)
  const [selectedTongueTwister, setSelectedTongueTwister] = useState(0)
  const [showToneInfo, setShowToneInfo] = useState(false)

  // Estados para Pragmática
  const [pragmaticLevel, setPragmaticLevel] = useState(1)
  const [phraseExplanation, setPhraseExplanation] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState<{ [key: number]: string }>({})
  const [showPragmaticHelp, setShowPragmaticHelp] = useState(false)
  const [pragmaticResult, setPragmaticResult] = useState<"correct" | "incorrect" | null>(null)
  const [selectedMeanings, setSelectedMeanings] = useState<{ [key: number]: boolean }>({})

  // Estados para Próxemica
  const [proximicaLevel, setProximicaLevel] = useState(1)
  const [draggedItems, setDraggedItems] = useState<{ [key: string]: boolean }>({})
  const [positionAnswers, setPositionAnswers] = useState<{ [key: number]: string }>({})
  const [showProximicaHelp, setShowProximicaHelp] = useState(false)
  const [proximicaResult, setProximicaResult] = useState<"correct" | "incorrect" | null>(null)
  const [animalPositions, setAnimalPositions] = useState<{ [key: string]: string }>({
    gato: "",
    rana: "",
    gusano: "",
    mariposa: "",
  })

  const recognitionRef = useRef<any>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedText, setRecordedText] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("competenciasCompletedLevels")
    if (saved) {
      setCompletedLevels(JSON.parse(saved))
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

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      window.speechSynthesis.speak(utterance)
    }
  }

  const saveProgress = (competencia: string, level: number) => {
    const key = `${competencia}_${level}`
    const updated = [...completedLevels, key]
    setCompletedLevels(updated)
    localStorage.setItem("competenciasCompletedLevels", JSON.stringify(updated))
  }

  const redirectToNextCompetencia = (current: string) => {
    const order = ["linguistica", "paraling", "pragmatica", "proxemica"]
    const currentIndex = order.indexOf(current)
    if (currentIndex < order.length - 1) {
      const next = order[currentIndex + 1]
      setTimeout(() => {
        setSelectedCompetencia(next as any)
        window.scrollTo(0, 0)
      }, 2500)
    }
  }

  const wordLists = [
    ["Paloma", "Anita", "Lola", "Esperanza", "Ramona", "Marta", "Pilar", "Isabel"],
    ["Alfredo", "Pepe", "Alberto", "Timoteo", "Felipe", "Vicente", "Pablo", "Fernando"],
    ["Lima", "Roma", "París", "Lisboa", "Venecia", "Berlín", "Londres", "Pekín", "Moscú"],
    ["Médico", "pintor", "abogado", "militar", "arquitecto", "dentista", "periodista", "torero"],
    ["Rosa", "violeta", "jazmín", "nardo", "clavel", "amapola", "tulipán", "lila"],
    ["Mirlo", "alondra", "tordo", "gorrión", "golondrina", "jilguero", "ruiseñor", "verderón"],
  ]

  const tongueTwisters = [
    "Cuando cuentes cuentos. Cuenta cuantos cuentos cuentas. Porque si no cuentas cuantos cuentos cuentas. Nunca sabrás cuantos cuentos cuentas.",
    'Parra tenía una perra y Guerra tenía una parra. La perra de Parra subió a la parra de Guerra. Guerra pegó con la porra a la perra de Parra, y Parra le dijo a Guerra, "¿por qué has pegado con la porra a la perra de Parra?" y Guerra le contestó "Si la perra de Parra no hubiera subido a la parra de Guerra, Guerra no hubiese pegado con la porra a la perra de Parra".',
    "Si tu gusto gustara del gusto que gusta mi gusto, mi gusto gustaría del gusto que gusta tu gusto. Pero como tu gusto no gusta del gusto que gusta mi gusto, mi gusto no gusta del gusto que gusta tu gusto.",
    "Quiero y no quiero querer a quien no queriendo quiero he querido sin querer y estoy sin querer queriendo. Si por mucho que te quiero quieres que te quiera más, ¿Qué más quieres? ¿Quieres más?",
  ]

  const emotions = [
    { id: "neutral", label: "Neutral", emoji: "😐" },
    { id: "sad", label: "Triste", emoji: "😢" },
    { id: "surprised", label: "Sorprendido/a", emoji: "😲" },
    { id: "angry", label: "Enojado/a", emoji: "😠" },
    { id: "happy", label: "Feliz", emoji: "😊" },
  ]

  const pragmaticPhrases = [
    {
      phrase: "«Lucas ya no tiene problemas con sus compañeros de oficina. Lo echaron del trabajo».",
      meaning: "Lucas perdió su trabajo y por eso no tiene problemas con los compañeros",
    },
    {
      phrase: "«Es verdad. No compré los libros que me pediste, compré esos y muchos más».",
      meaning: "Se compraron más libros de los solicitados",
    },
  ]

  const pragmaticQuestions = [
    {
      question: "Se quedó enredado en las sábanas.",
      options: ["Pasó frío", "Tuvo pesadillas", "Se quedó dormido"],
      correctAnswer: "Se quedó dormido",
    },
    {
      question: "Se me parte la cabeza.",
      options: ["Me rompí la cabeza", "Me duele la cabeza", "Estoy cansada"],
      correctAnswer: "Me duele la cabeza",
    },
    {
      question: "Tu abuela está peinando la muñeca.",
      options: ["Está enloqueciendo", "Le hace una trenza a la muñeca", "Se cree peluquera"],
      correctAnswer: "Está enloqueciendo",
    },
  ]

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData("item", item)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, zone: string) => {
    e.preventDefault()
    const item = e.dataTransfer.getData("item")

    // Check if item matches the zone
    const correctPlacements: { [key: string]: string } = {
      pez: "agua",
      rana: "agua", // Added frog to water zone
      ave: "aire",
      avion: "aire",
      manzana: "arbol",
    }

    if (correctPlacements[item] === zone) {
      setDraggedItems((prev) => ({ ...prev, [item]: true }))
    }
  }

  // Main view - Competencias selection
  if (!selectedCompetencia) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <section className="pt-24 pb-12 md:pb-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <Button
              variant="ghost"
              className="mb-6 md:mb-8 gap-2"
              onClick={() => (window.location.href = "/dominios/cognicom")}
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </Button>

            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance">
                Competencias Comunicativas
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                Desarrolla cuatro dimensiones fundamentales de la comunicación: lingüística, paralingüística, pragmática
                y próxemica
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  id: "linguistica",
                  title: "C. Lingüística",
                  description: "Palabras, estructura del lenguaje y expresión escrita",
                  icon: "📝",
                },
                {
                  id: "paraling",
                  title: "C. Paralingüística",
                  description: "Tono, ritmo, entonación y pronunciación",
                  icon: "🎵",
                },
                {
                  id: "pragmatica",
                  title: "C. Pragmática",
                  description: "Sentido, significado y contexto del mensaje",
                  icon: "💬",
                },
                {
                  id: "proxemica",
                  title: "C. Próxemica",
                  description: "Posicionamiento, ubicación y espacios",
                  icon: "📍",
                },
              ].map((competencia) => (
                <Card
                  key={competencia.id}
                  className="p-4 md:p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => setSelectedCompetencia(competencia.id as any)}
                >
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{competencia.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{competencia.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 md:mb-6">{competencia.description}</p>
                  <Button className="w-full" size="sm">
                    Comenzar
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  // Lingüística view
  if (selectedCompetencia === "linguistica") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <section className="pt-24 pb-8 md:pb-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
              <Button variant="ghost" className="gap-2 w-fit" onClick={() => setSelectedCompetencia(null)}>
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-balance">C. Lingüística</h1>
              <div></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {[1, 2, 3].map((level) => (
                <Card
                  key={level}
                  className={`p-4 md:p-6 cursor-pointer transition-all ${
                    linguisticaLevel === level ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setLinguisticaLevel(level)}
                >
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Nivel {level}</p>
                    <p className="font-bold text-sm md:text-lg">
                      {level === 1 ? "Exponer un tema" : level === 2 ? "Escribir mensaje" : "Explicar receta"}
                    </p>
                    {completedLevels.includes(`linguistica_${level}`) && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mt-2 md:mt-3" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {linguisticaLevel === 1 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Exponer un Tema</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowLinguisticaHelp(!showLinguisticaHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showLinguisticaHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Posible Solución:</p>
                    <p className="text-xs md:text-sm">
                      Puedes hablar sobre temas como: tecnología, deportes, historia, arte, naturaleza, ciencia, o
                      cualquier tema de tu interés. Organiza tu exposición en: introducción, desarrollo y conclusión.
                    </p>
                  </div>
                )}

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-2">Tema a exponer:</label>
                    <input
                      type="text"
                      value={expositionTopic}
                      onChange={(e) => setExpositionTopic(e.target.value)}
                      placeholder="Ej: La importancia de la inteligencia artificial"
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    />
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (expositionTopic.length > 10) {
                        setExpositionResult("correct")
                        saveProgress("linguistica", 1)
                        setTimeout(() => {
                          setLinguisticaLevel(2)
                          setExpositionTopic("")
                          setExpositionResult(null)
                        }, 2000)
                      } else {
                        setExpositionResult("incorrect")
                      }
                    }}
                  >
                    Verificar
                  </Button>

                  {expositionResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        expositionResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {expositionResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {expositionResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Intenta nuevamente."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {linguisticaLevel === 2 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Escribir un Mensaje o Carta</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowLinguisticaHelp(!showLinguisticaHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showLinguisticaHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Posible Solución:</p>
                    <p className="text-xs md:text-sm">
                      Escribe un mensaje claro y conciso. Incluye: saludo, cuerpo del mensaje con la idea principal, y
                      despedida. Ejemplo: Querido amigo, espero te encuentres bien. Te escribo para...
                    </p>
                  </div>
                )}

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-2">Tu mensaje o carta:</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Escribe aquí tu mensaje..."
                      className="w-full px-3 md:px-4 py-3 border rounded-lg bg-background min-h-32 text-sm md:text-base"
                    />
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (messageText.length > 20) {
                        setExpositionResult("correct")
                        saveProgress("linguistica", 2)
                        setTimeout(() => {
                          setLinguisticaLevel(3)
                          setMessageText("")
                          setExpositionResult(null)
                        }, 2000)
                      } else {
                        setExpositionResult("incorrect")
                      }
                    }}
                  >
                    Verificar
                  </Button>

                  {expositionResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        expositionResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {expositionResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {expositionResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Intenta nuevamente."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {linguisticaLevel === 3 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Explicar una Receta de Cocina</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowLinguisticaHelp(!showLinguisticaHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showLinguisticaHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Posible Solución:</p>
                    <p className="text-xs md:text-sm">
                      Estructura: nombre de la receta, ingredientes, pasos de preparación. Sé claro y ordenado. Ejemplo:
                      Receta de Arroz con Pollo. Ingredientes: pollo, arroz... Preparación: 1) Cocina el pollo, 2)
                      Agrega el arroz...
                    </p>
                  </div>
                )}

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-2">Nombre de la receta:</label>
                    <input
                      type="text"
                      value={recipeTitle}
                      onChange={(e) => setRecipeTitle(e.target.value)}
                      placeholder="Ej: Sopa de Verduras"
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-2">Pasos de preparación:</label>
                    <textarea
                      value={recipeSteps}
                      onChange={(e) => setRecipeSteps(e.target.value)}
                      placeholder="1) Preparar ingredientes&#10;2) Calentar agua&#10;3) Agregar verduras..."
                      className="w-full px-3 md:px-4 py-3 border rounded-lg bg-background min-h-32 text-sm md:text-base"
                    />
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (recipeTitle.length > 3 && recipeSteps.length > 20) {
                        setExpositionResult("correct")
                        saveProgress("linguistica", 3)
                        setTimeout(() => {
                          setExpositionResult(null)
                          setRecipeTitle("")
                          setRecipeSteps("")
                          redirectToNextCompetencia("linguistica")
                        }, 2000)
                      } else {
                        setExpositionResult("incorrect")
                      }
                    }}
                  >
                    Completar Nivel
                  </Button>

                  {expositionResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        expositionResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {expositionResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {expositionResult === "correct"
                          ? "¡Módulo completado! Redirigiendo a C. Paralingüística..."
                          : "Intenta nuevamente."}
                      </span>
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

  // Paralingüística view
  if (selectedCompetencia === "paraling") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <section className="pt-24 pb-8 md:pb-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
              <Button variant="ghost" className="gap-2 w-fit" onClick={() => setSelectedCompetencia(null)}>
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-balance">C. Paralingüística</h1>
              <div></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {[1, 2, 3].map((level) => (
                <Card
                  key={level}
                  className={`p-4 md:p-6 cursor-pointer transition-all ${
                    paratingLevel === level ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setParatingLevel(level)}
                >
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Nivel {level}</p>
                    <p className="font-bold text-sm md:text-lg">
                      {level === 1 ? "Lista de palabras" : level === 2 ? "Trabalenguas" : "Cambio de tono"}
                    </p>
                    {completedLevels.includes(`paraling_${level}`) && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mt-2 md:mt-3" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {paratingLevel === 1 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Repita la Lista de Palabras Rápido</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowParatingHelp(!showParatingHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showParatingHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Instrucción:</p>
                    <p className="text-xs md:text-sm">
                      Escucha la lista de palabras y repítelas lo más rápido posible, manteniendo la claridad en la
                      pronunciación.
                    </p>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-3">Selecciona una lista:</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {wordLists.map((list, idx) => (
                        <Button
                          key={idx}
                          variant={selectedWordList === idx ? "default" : "outline"}
                          onClick={() => setSelectedWordList(idx)}
                          className="justify-start text-left text-sm"
                          size="sm"
                        >
                          Lista {idx + 1}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {wordLists[selectedWordList] && (
                    <div className="bg-secondary/50 p-4 md:p-6 rounded-lg">
                      <div className="flex items-center justify-between gap-3 md:gap-4 mb-3 md:mb-4 flex-wrap">
                        <p className="font-semibold text-sm md:text-base">Palabras a repetir:</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 bg-transparent text-xs md:text-sm"
                          onClick={() => playAudio(wordLists[selectedWordList].join(", "))}
                        >
                          <Volume2 className="w-4 h-4" />
                          Escuchar
                        </Button>
                      </div>
                      <p className="text-sm md:text-base font-mono bg-background p-3 md:p-4 rounded text-balance">
                        {wordLists[selectedWordList].join(", ")}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-2">Graba tu intento:</label>
                    <div className="flex gap-2">
                      {isRecording ? (
                        <Button
                          className="flex-1 gap-2 text-sm md:text-base"
                          variant="destructive"
                          onClick={stopRecording}
                        >
                          <MicOff className="w-4 h-4" />
                          Detener Grabación
                        </Button>
                      ) : (
                        <Button className="flex-1 gap-2 text-sm md:text-base" onClick={startRecording}>
                          <Mic className="w-4 h-4" />
                          Grabar Pronunciación
                        </Button>
                      )}
                    </div>
                    {recordedText && (
                      <p className="mt-2 md:mt-3 p-2 md:p-3 bg-green-50 text-green-900 rounded text-xs md:text-sm">
                        Grabado: {recordedText}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (recordedText.length > 0) {
                        setWordListResult("correct")
                        saveProgress("paraling", 1)
                        setTimeout(() => {
                          setParatingLevel(2)
                          setRecordedText("")
                          setWordListResult(null)
                        }, 2000)
                      } else {
                        setWordListResult("incorrect")
                      }
                    }}
                  >
                    Verificar
                  </Button>

                  {wordListResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        wordListResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {wordListResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {wordListResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Intenta nuevamente."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {paratingLevel === 2 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Diga Estos Trabalenguas</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowParatingHelp(!showParatingHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showParatingHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Instrucción:</p>
                    <p className="text-xs md:text-sm">
                      Selecciona un trabalenguas y repítelo varias veces, incrementando la velocidad. Enfócate en la
                      claridad de la pronunciación.
                    </p>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-3">Selecciona un trabalenguas:</label>
                    <div className="space-y-2">
                      {tongueTwisters.map((twister, idx) => (
                        <Button
                          key={idx}
                          variant={selectedTongueTwister === idx ? "default" : "outline"}
                          onClick={() => setSelectedTongueTwister(idx)}
                          className="w-full justify-start text-left h-auto py-2 md:py-3 text-xs md:text-sm"
                        >
                          <span>{twister.substring(0, 60)}...</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-4 md:p-6 rounded-lg">
                    <div className="flex items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4 flex-wrap">
                      <p className="font-semibold text-sm md:text-base">Trabalenguas:</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 flex-shrink-0 bg-transparent text-xs md:text-sm"
                        onClick={() => playAudio(tongueTwisters[selectedTongueTwister])}
                      >
                        <Volume2 className="w-4 h-4" />
                        Escuchar
                      </Button>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed font-serif bg-background p-3 md:p-4 rounded text-balance">
                      {tongueTwisters[selectedTongueTwister]}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-2">Graba tu intento:</label>
                    <div className="flex gap-2">
                      {isRecording ? (
                        <Button
                          className="flex-1 gap-2 text-sm md:text-base"
                          variant="destructive"
                          onClick={stopRecording}
                        >
                          <MicOff className="w-4 h-4" />
                          Detener Grabación
                        </Button>
                      ) : (
                        <Button className="flex-1 gap-2 text-sm md:text-base" onClick={startRecording}>
                          <Mic className="w-4 h-4" />
                          Grabar Pronunciación
                        </Button>
                      )}
                    </div>
                    {recordedText && (
                      <p className="mt-2 md:mt-3 p-2 md:p-3 bg-green-50 text-green-900 rounded text-xs md:text-sm">
                        Grabado: {recordedText}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (recordedText.length > 0) {
                        setWordListResult("correct")
                        saveProgress("paraling", 2)
                        setTimeout(() => {
                          setParatingLevel(3)
                          setRecordedText("")
                          setWordListResult(null)
                        }, 2000)
                      } else {
                        setWordListResult("incorrect")
                      }
                    }}
                  >
                    Verificar
                  </Button>

                  {wordListResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        wordListResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {wordListResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {wordListResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Intenta nuevamente."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {paratingLevel === 3 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Cambio de Tono</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowToneInfo(!showToneInfo)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showToneInfo && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2 md:mb-3">Instrucción:</p>
                    <p className="text-xs md:text-sm mb-2 md:mb-3">
                      Escucha el texto y aprende a diferenciados los tonos:
                    </p>
                    <ul className="text-xs md:text-sm space-y-1 md:space-y-2 ml-4">
                      <li>
                        <strong>Normal (tono medio):</strong> Entonación regular
                      </li>
                      <li>
                        <strong>En negrillas (tono grave):</strong> Voz más profunda y baja
                      </li>
                      <li>
                        <u>Subrayado (tono agudo)</u>: Voz más alta y clara
                      </li>
                    </ul>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div className="bg-secondary/50 p-4 md:p-6 rounded-lg">
                    <div className="flex items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4 flex-wrap">
                      <p className="font-semibold text-sm md:text-base">Texto de referencia:</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 flex-shrink-0 bg-transparent text-xs md:text-sm"
                        onClick={() =>
                          playAudio("Las campanas siempre sonaban pobres y melancólicas cuando te sentía lejos")
                        }
                      >
                        <Volume2 className="w-4 h-4" />
                        Escuchar
                      </Button>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed font-serif bg-background p-3 md:p-4 rounded space-y-2">
                      <p>
                        Las campanas siempre sonaban pobres y melancólicas <strong>cuando te sentía lejos</strong>, pero
                      </p>
                      <p>
                        repicaban pizpiretas y divertidas, <u>sonoras y alegres</u> cuanto más cerca te mostrabas.
                      </p>
                      <p>
                        Ahora ya no importa cómo suenen, <strong>dinámicas</strong> y <u>sombrías</u>, porque sé que no
                        volverán.
                      </p>
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 md:p-6 rounded-lg border border-blue-200">
                    <p className="text-xs md:text-sm font-semibold mb-2 text-blue-900">Guía de tonos:</p>
                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-blue-900">
                      <p className="flex items-center gap-2">
                        <span className="font-bold">Normal:</span> Tono medio
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-bold">En negrillas:</span> Tono grave (más profundo)
                      </p>
                      <p className="flex items-center gap-2">
                        <u>Subrayado</u>: Tono agudo (más alto)
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-2">Graba tu interpretación:</label>
                    <div className="flex gap-2">
                      {isRecording ? (
                        <Button
                          className="flex-1 gap-2 text-sm md:text-base"
                          variant="destructive"
                          onClick={stopRecording}
                        >
                          <MicOff className="w-4 h-4" />
                          Detener Grabación
                        </Button>
                      ) : (
                        <Button className="flex-1 gap-2 text-sm md:text-base" onClick={startRecording}>
                          <Mic className="w-4 h-4" />
                          Grabar Lectura
                        </Button>
                      )}
                    </div>
                    {recordedText && (
                      <p className="mt-2 md:mt-3 p-2 md:p-3 bg-green-50 text-green-900 rounded text-xs md:text-sm">
                        Grabado: {recordedText}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (recordedText.length > 0) {
                        setWordListResult("correct")
                        saveProgress("paraling", 3)
                        setTimeout(() => {
                          setRecordedText("")
                          setWordListResult(null)
                          redirectToNextCompetencia("paraling")
                        }, 2000)
                      } else {
                        setWordListResult("incorrect")
                      }
                    }}
                  >
                    Completar Nivel
                  </Button>

                  {wordListResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        wordListResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {wordListResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {wordListResult === "correct"
                          ? "¡Módulo Paralingüística completado! Redirigiendo a C. Pragmática..."
                          : "Intenta nuevamente."}
                      </span>
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

  // Pragmática view
  if (selectedCompetencia === "pragmatica") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <section className="pt-24 pb-8 md:pb-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
              <Button variant="ghost" className="gap-2 w-fit" onClick={() => setSelectedCompetencia(null)}>
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-balance">C. Pragmática</h1>
              <div></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {[1, 2, 3].map((level) => (
                <Card
                  key={level}
                  className={`p-4 md:p-6 cursor-pointer transition-all ${
                    pragmaticLevel === level ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setPragmaticLevel(level)}
                >
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Nivel {level}</p>
                    <p className="font-bold text-sm md:text-lg">
                      {level === 1 ? "Explicar frase" : level === 2 ? "Reconocer emoción" : "Interpretar sentido"}
                    </p>
                    {completedLevels.includes(`pragmatica_${level}`) && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mt-2 md:mt-3" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {pragmaticLevel === 1 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Explica la Frase</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowPragmaticHelp(!showPragmaticHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showPragmaticHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Posible Solución:</p>
                    <p className="text-xs md:text-sm">
                      Busca el sentido oculto o figurado de la frase. No es lo que dice literalmente, sino lo que
                      significa en contexto. Por ejemplo, "Se quedó con la boca abierta" no significa que la boca se
                      quede abierta, sino que quedó sorprendido.
                    </p>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  {pragmaticPhrases.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-3 md:pl-4">
                      <p className="font-semibold mb-2 md:mb-3 text-sm md:text-base italic text-primary text-balance">
                        {item.phrase}
                      </p>
                      <div>
                        <label className="block text-xs md:text-sm font-semibold mb-2">¿Qué significa?</label>
                        <textarea
                          placeholder="Escribe el significado..."
                          value={phraseExplanation}
                          onChange={(e) => setPhraseExplanation(e.target.value)}
                          className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background min-h-24 text-sm md:text-base"
                        />
                      </div>
                      <Button
                        className="mt-3 md:mt-4 text-sm md:text-base"
                        onClick={() => {
                          if (phraseExplanation.length > 10) {
                            setPragmaticResult("correct")
                            saveProgress("pragmatica", 1)
                            setTimeout(() => {
                              setPragmaticLevel(2)
                              setPhraseExplanation("")
                              setPragmaticResult(null)
                            }, 2000)
                          } else {
                            setPragmaticResult("incorrect")
                          }
                        }}
                      >
                        Verificar
                      </Button>
                    </div>
                  ))}

                  {pragmaticResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        pragmaticResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {pragmaticResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {pragmaticResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Intenta nuevamente."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {pragmaticLevel === 2 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Indica el Sentimiento que Expresan las Caras</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowPragmaticHelp(!showPragmaticHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showPragmaticHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Instrucción:</p>
                    <p className="text-xs md:text-sm">
                      Observa cada cara y selecciona el sentimiento que expresa: Neutral, Triste, Sorprendido, Enojado o
                      Feliz. Las selecciones son independientes.
                    </p>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div className="bg-secondary/50 p-6 md:p-8 rounded-lg">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7mF9OOnhzimpLe3gCH2yTxegH8Keaf.png"
                      alt="Caras con emociones"
                      className="w-full max-w-md mx-auto rounded"
                    />
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((faceNum) => (
                      <div
                        key={faceNum}
                        className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4"
                      >
                        <label className="text-sm md:text-base font-semibold min-w-20">Cara {faceNum}:</label>
                        <select
                          value={selectedEmotion[faceNum] || ""}
                          onChange={(e) => setSelectedEmotion({ ...selectedEmotion, [faceNum]: e.target.value })}
                          className="flex-1 px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                        >
                          <option value="">Selecciona una emoción...</option>
                          {emotions.map((emotion) => (
                            <option key={emotion.id} value={emotion.id}>
                              {emotion.label} {emotion.emoji}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
                    <p className="text-xs md:text-sm text-yellow-900">
                      <strong>Nota:</strong> El sistema actualmente tiene limitaciones para identificar emociones con
                      precisión. Se recomienda entrenamiendo adicional para mejores resultados.
                    </p>
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      const allAnswered = Object.keys(selectedEmotion).length === 5
                      if (allAnswered) {
                        setPragmaticResult("correct")
                        saveProgress("pragmatica", 2)
                        setTimeout(() => {
                          setPragmaticLevel(3)
                          setSelectedEmotion({})
                          setPragmaticResult(null)
                        }, 2000)
                      } else {
                        setPragmaticResult("incorrect")
                      }
                    }}
                  >
                    Verificar
                  </Button>

                  {pragmaticResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        pragmaticResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {pragmaticResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {pragmaticResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Responde todas las caras."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {pragmaticLevel === 3 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Interpreta Qué Quiso Decir</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowPragmaticHelp(!showPragmaticHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showPragmaticHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Instrucción:</p>
                    <p className="text-xs md:text-sm">
                      Lee cada situación y selecciona todas las opciones que interpreten correctamente lo que la persona
                      quiso decir. Puedes seleccionar múltiples respuestas.
                    </p>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  {pragmaticQuestions.map((question, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-3 md:pl-4">
                      <p className="font-semibold mb-3 md:mb-4 text-sm md:text-base">
                        {idx + 1}. {question.question}
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, optIdx) => (
                          <label
                            key={optIdx}
                            className="flex items-center gap-3 p-2 md:p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition"
                          >
                            <input
                              type="checkbox"
                              checked={selectedMeanings[`${idx}-${optIdx}`] || false}
                              onChange={(e) => {
                                setSelectedMeanings({
                                  ...selectedMeanings,
                                  [`${idx}-${optIdx}`]: e.target.checked,
                                })
                              }}
                              className="w-4 h-4"
                            />
                            <span className="text-sm md:text-base flex-1">
                              {String.fromCharCode(97 + optIdx)}) {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (Object.values(selectedMeanings).some((v) => v)) {
                        setPragmaticResult("correct")
                        saveProgress("pragmatica", 3)
                        setTimeout(() => {
                          setPragmaticResult(null)
                          setSelectedMeanings({})
                          redirectToNextCompetencia("pragmatica")
                        }, 2000)
                      } else {
                        setPragmaticResult("incorrect")
                      }
                    }}
                  >
                    Completar Nivel
                  </Button>

                  {pragmaticResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        pragmaticResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {pragmaticResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {pragmaticResult === "correct"
                          ? "¡Módulo Pragmática completado! Redirigiendo a C. Próxemica..."
                          : "Selecciona al menos una opción."}
                      </span>
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

  // Próxemica view
  if (selectedCompetencia === "proxemica") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />
        <section className="pt-24 pb-8 md:pb-12 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
              <Button variant="ghost" className="gap-2 w-fit" onClick={() => setSelectedCompetencia(null)}>
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-balance">C. Próxemica</h1>
              <div></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {[1, 2, 3].map((level) => (
                <Card
                  key={level}
                  className={`p-4 md:p-6 cursor-pointer transition-all ${
                    proximicaLevel === level ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setProximicaLevel(level)}
                >
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Nivel {level}</p>
                    <p className="font-bold text-sm md:text-lg">
                      {level === 1 ? "Arrastra objetos" : level === 2 ? "Ubicación" : "Posiciones de animales"}
                    </p>
                    {completedLevels.includes(`proxemica_${level}`) && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mt-2 md:mt-3" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {proximicaLevel === 1 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Arrastra los Objetos a su Lugar Correcto</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowProximicaHelp(!showProximicaHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showProximicaHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Instrucción:</p>
                    <p className="text-xs md:text-sm">
                      Arrastra cada objeto a su lugar correcto: el pez al agua, el ave al aire/nido, el avión al aire, y
                      la manzana al árbol.
                    </p>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Agua zone */}
                    <div
                      className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-6 min-h-32 flex flex-col items-center justify-center"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, "agua")}
                    >
                      <p className="text-sm font-semibold text-blue-700 mb-2">💧 Agua</p>
                      {draggedItems["pez"] && <p className="text-2xl">🐟</p>}
                      {draggedItems["rana"] && <p className="text-2xl">🐸</p>}
                    </div>

                    {/* Aire zone */}
                    <div
                      className="border-2 border-dashed border-sky-400 bg-sky-50 rounded-lg p-6 min-h-32 flex flex-col items-center justify-center"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, "aire")}
                    >
                      <p className="text-sm font-semibold text-sky-700 mb-2">☁️ Aire</p>
                      <div className="flex gap-2">
                        {draggedItems["ave"] && <p className="text-2xl">🐦</p>}
                        {draggedItems["avion"] && <p className="text-2xl">✈️</p>}
                      </div>
                    </div>

                    {/* Arbol zone */}
                    <div
                      className="border-2 border-dashed border-green-400 bg-green-50 rounded-lg p-6 min-h-32 flex flex-col items-center justify-center col-span-2"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, "arbol")}
                    >
                      <p className="text-sm font-semibold text-green-700 mb-2">🌳 Árbol</p>
                      {draggedItems["manzana"] && <p className="text-2xl">🍎</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-3">Objetos para arrastrar:</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                      {[
                        { id: "pez", emoji: "🐟", label: "Pez" },
                        { id: "rana", emoji: "🐸", label: "Rana" }, // Added frog
                        { id: "ave", emoji: "🐦", label: "Ave" },
                        { id: "manzana", emoji: "🍎", label: "Manzana" },
                        { id: "avion", emoji: "✈️", label: "Avión" },
                      ].map(
                        (item) =>
                          !draggedItems[item.id] && (
                            <div
                              key={item.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, item.id)}
                              className="p-3 md:p-4 bg-background border-2 border-dashed rounded-lg text-center cursor-move hover:border-primary transition text-sm md:text-base"
                            >
                              <p className="text-2xl mb-1">{item.emoji}</p>
                              <p className="text-xs md:text-sm font-semibold">{item.label}</p>
                            </div>
                          ),
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
                    <p className="text-xs md:text-sm text-blue-900">
                      <strong>Objetos colocados correctamente:</strong> {Object.keys(draggedItems).length}/5
                    </p>
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (Object.keys(draggedItems).length >= 5) {
                        setProximicaResult("correct")
                        saveProgress("proxemica", 1)
                        setTimeout(() => {
                          setProximicaLevel(2)
                          setDraggedItems({})
                          setProximicaResult(null)
                        }, 2000)
                      } else {
                        setProximicaResult("incorrect")
                      }
                    }}
                  >
                    Verificar
                  </Button>

                  {proximicaResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        proximicaResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {proximicaResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {proximicaResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Arrastra todos los objetos a sus lugares correctos."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {proximicaLevel === 2 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Ubicación Espacial</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowProximicaHelp(!showProximicaHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showProximicaHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Instrucción:</p>
                    <p className="text-xs md:text-sm">
                      Observa cada imagen y responde las preguntas sobre ubicación espacial.
                    </p>
                  </div>
                )}

                <div className="space-y-6 md:space-y-8">
                  {/* Pregunta 1: Izquierda */}
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-3">
                      1. ¿Hacia dónde apunta la flecha de la izquierda?
                    </p>
                    <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                      <img
                        src="/arrow-pointing-left.jpg"
                        alt="Flecha apuntando a la izquierda"
                        query="single arrow pointing to the left on white background"
                        className="w-full max-w-xs mx-auto rounded"
                      />
                    </div>
                    <select
                      value={positionAnswers[1] || ""}
                      onChange={(e) => setPositionAnswers({ ...positionAnswers, 1: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    >
                      <option value="">Selecciona...</option>
                      <option value="izquierda">Izquierda</option>
                      <option value="derecha">Derecha</option>
                      <option value="arriba">Arriba</option>
                      <option value="abajo">Abajo</option>
                      <option value="adentro">Adentro</option>
                      <option value="afuera">Afuera</option>
                    </select>
                  </div>

                  {/* Pregunta 2: Derecha */}
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-3">
                      2. ¿Hacia dónde apunta la flecha de la derecha?
                    </p>
                    <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                      <img
                        src="/arrow-pointing-right.jpg"
                        alt="Flecha apuntando a la derecha"
                        query="single arrow pointing to the right on white background"
                        className="w-full max-w-xs mx-auto rounded"
                      />
                    </div>
                    <select
                      value={positionAnswers[2] || ""}
                      onChange={(e) => setPositionAnswers({ ...positionAnswers, 2: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    >
                      <option value="">Selecciona...</option>
                      <option value="izquierda">Izquierda</option>
                      <option value="derecha">Derecha</option>
                      <option value="arriba">Arriba</option>
                      <option value="abajo">Abajo</option>
                      <option value="adentro">Adentro</option>
                      <option value="afuera">Afuera</option>
                    </select>
                  </div>

                  {/* Pregunta 3: Arriba */}
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-3">3. ¿Hacia dónde apunta la flecha?</p>
                    <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                      <img
                        src="/arrow-pointing-up.jpg"
                        alt="Flecha apuntando arriba"
                        query="single arrow pointing upward on white background"
                        className="w-full max-w-xs mx-auto rounded"
                      />
                    </div>
                    <select
                      value={positionAnswers[3] || ""}
                      onChange={(e) => setPositionAnswers({ ...positionAnswers, 3: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    >
                      <option value="">Selecciona...</option>
                      <option value="izquierda">Izquierda</option>
                      <option value="derecha">Derecha</option>
                      <option value="arriba">Arriba</option>
                      <option value="abajo">Abajo</option>
                      <option value="adentro">Adentro</option>
                      <option value="afuera">Afuera</option>
                    </select>
                  </div>

                  {/* Pregunta 4: Abajo */}
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-3">4. ¿Hacia dónde apunta la flecha?</p>
                    <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                      <img
                        src="/arrow-pointing-down.jpg"
                        alt="Flecha apuntando abajo"
                        query="single arrow pointing downward on white background"
                        className="w-full max-w-xs mx-auto rounded"
                      />
                    </div>
                    <select
                      value={positionAnswers[4] || ""}
                      onChange={(e) => setPositionAnswers({ ...positionAnswers, 4: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    >
                      <option value="">Selecciona...</option>
                      <option value="izquierda">Izquierda</option>
                      <option value="derecha">Derecha</option>
                      <option value="arriba">Arriba</option>
                      <option value="abajo">Abajo</option>
                      <option value="adentro">Adentro</option>
                      <option value="afuera">Afuera</option>
                    </select>
                  </div>

                  {/* Pregunta 5: Adentro */}
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-3">5. ¿Dónde está el círculo rojo?</p>
                    <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                      <img
                        src="/circle-inside-box.jpg"
                        alt="Círculo rojo dentro de una caja"
                        query="red circle inside a blue box on white background"
                        className="w-full max-w-xs mx-auto rounded"
                      />
                    </div>
                    <select
                      value={positionAnswers[5] || ""}
                      onChange={(e) => setPositionAnswers({ ...positionAnswers, 5: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    >
                      <option value="">Selecciona...</option>
                      <option value="izquierda">Izquierda</option>
                      <option value="derecha">Derecha</option>
                      <option value="arriba">Arriba</option>
                      <option value="abajo">Abajo</option>
                      <option value="adentro">Adentro</option>
                      <option value="afuera">Afuera</option>
                    </select>
                  </div>

                  {/* Pregunta 6: Afuera */}
                  <div>
                    <p className="text-sm md:text-base font-semibold mb-3">6. ¿Dónde está el círculo rojo?</p>
                    <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                      <img
                        src="/circle-outside-box.jpg"
                        alt="Círculo rojo fuera de una caja"
                        query="red circle outside a blue box on white background"
                        className="w-full max-w-xs mx-auto rounded"
                      />
                    </div>
                    <select
                      value={positionAnswers[6] || ""}
                      onChange={(e) => setPositionAnswers({ ...positionAnswers, 6: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                    >
                      <option value="">Selecciona...</option>
                      <option value="izquierda">Izquierda</option>
                      <option value="derecha">Derecha</option>
                      <option value="arriba">Arriba</option>
                      <option value="abajo">Abajo</option>
                      <option value="adentro">Adentro</option>
                      <option value="afuera">Afuera</option>
                    </select>
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      if (
                        positionAnswers[1] &&
                        positionAnswers[2] &&
                        positionAnswers[3] &&
                        positionAnswers[4] &&
                        positionAnswers[5] &&
                        positionAnswers[6]
                      ) {
                        setProximicaResult("correct")
                        saveProgress("proxemica", 2)
                        setTimeout(() => {
                          setProximicaLevel(3)
                          setPositionAnswers({})
                          setProximicaResult(null)
                        }, 2000)
                      } else {
                        setProximicaResult("incorrect")
                      }
                    }}
                  >
                    Verificar
                  </Button>

                  {proximicaResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        proximicaResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {proximicaResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {proximicaResult === "correct"
                          ? "¡Excelente! Procede al siguiente nivel."
                          : "Responde todas las preguntas."}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {proximicaLevel === 3 && (
              <Card className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold">Qué Posición Tienen los Animales</h2>
                  <Button variant="outline" size="icon" onClick={() => setShowProximicaHelp(!showProximicaHelp)}>
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </div>

                {showProximicaHelp && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-semibold mb-2">Instrucción:</p>
                    <p className="text-xs md:text-sm">
                      Observa la imagen del niño con animales alrededor. Selecciona la posición correcta de cada animal
                      con respecto al niño.
                    </p>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div className="bg-secondary/50 p-4 md:p-6 rounded-lg">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2bEwLAN7wbur1MBDQC5yhlHVArZPRb.png"
                      alt="Niño con animales"
                      className="w-full max-w-md mx-auto rounded"
                    />
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {[
                      { animal: "gato", label: "Gato" },
                      { animal: "rana", label: "Rana" },
                      { animal: "gusano", label: "Gusano" },
                      { animal: "mariposa", label: "Mariposa" },
                    ].map(({ animal, label }) => (
                      <div key={animal}>
                        <label className="block text-xs md:text-sm font-semibold mb-2">Posición del {label}:</label>
                        <select
                          value={animalPositions[animal] || ""}
                          onChange={(e) => setAnimalPositions({ ...animalPositions, [animal]: e.target.value })}
                          className="w-full px-3 md:px-4 py-2 border rounded-lg bg-background text-sm md:text-base"
                        >
                          <option value="">Selecciona una posición...</option>
                          <option value="derecha">Derecha</option>
                          <option value="izquierda">Izquierda</option>
                          <option value="arriba">Arriba</option>
                          <option value="arriba-izquierda">Arriba a la Izquierda</option>
                          <option value="arriba-derecha">Arriba a la Derecha</option>
                          <option value="abajo">Abajo</option>
                          <option value="abajo-izquierda">Abajo a la Izquierda</option>
                          <option value="abajo-derecha">Abajo a la Derecha</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full text-sm md:text-base"
                    onClick={() => {
                      const allAnswered = Object.values(animalPositions).every((p) => p.length > 0)
                      if (allAnswered) {
                        setProximicaResult("correct")
                        saveProgress("proxemica", 3)
                        setTimeout(() => {
                          setProximicaResult(null)
                          setAnimalPositions({
                            gato: "",
                            rana: "",
                            gusano: "",
                            mariposa: "",
                          })
                        }, 2000)
                      } else {
                        setProximicaResult("incorrect")
                      }
                    }}
                  >
                    Completar Nivel
                  </Button>

                  {proximicaResult && (
                    <div
                      className={`p-3 md:p-4 rounded-lg flex items-center gap-3 text-sm md:text-base w-auto max-w-md mx-auto ${
                        proximicaResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                      }`}
                    >
                      {proximicaResult === "correct" ? (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>
                        {proximicaResult === "correct"
                          ? "¡Módulo Próxemica completado! ¡Felicitaciones por completar todas las competencias!"
                          : "Selecciona todas las posiciones."}
                      </span>
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

  return null
}
