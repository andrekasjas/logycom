"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  BookOpen,
  Mic,
  PenTool,
} from "lucide-react"
import Link from "next/link"

type TestArea = "oral" | "lectura" | "escritura" | null
type TestLevel = "basico" | "intermedio" | "avanzado" | null

export default function PruebaDiagnosticaPage() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [selectedArea, setSelectedArea] = useState<TestArea>(null)
  const [currentLevel, setCurrentLevel] = useState<TestLevel>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Oral answers
  const [userAnswer, setUserAnswer] = useState("")
  const [userAnswerRicardo, setUserAnswerRicardo] = useState("")
  const [userAnswerJulia, setUserAnswerJulia] = useState("")
  const [droppedOnBook, setDroppedOnBook] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  // Lectura answers
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0)
  const [selectedSignalAnswer, setSelectedSignalAnswer] = useState<string | null>(null)
  const [lecturaQuien, setLecturaQuien] = useState("")
  const [lecturaQue, setLecturaQue] = useState("")
  const [lecturaDonde, setLecturaDonde] = useState("")
  const [lecturaCuando, setLecturaCuando] = useState("")
  const [lecturaAvanzada1, setLecturaAvanzada1] = useState("")
  const [lecturaAvanzada2, setLecturaAvanzada2] = useState("")

  // Escritura answers
  const [escrituraBasico, setEscrituraBasico] = useState("")
  const [escrituraIntermedio, setEscrituraIntermedio] = useState("")
  const [escrituraAvanzado, setEscrituraAvanzado] = useState("")

  const [showExpectedAnswers, setShowExpectedAnswers] = useState(false)
  const [isPlayingDialogue, setIsPlayingDialogue] = useState(false)
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    setIsPageLoading(false)

    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        if (voices.length > 0) {
          setVoicesLoaded(true)
        }
      }

      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const signals = [
    {
      image: "/warning-sign-danger-triangle-exclamation.jpg",
      options: ["Peligro o precaución", "Prohibido el paso", "Salida de emergencia"],
      correct: "Peligro o precaución",
    },
    {
      image: "/no-smoking-sign-cigarette-crossed.jpg",
      options: ["Prohibido fumar", "Zona de fumadores", "Venta de cigarrillos"],
      correct: "Prohibido fumar",
    },
    {
      image: "/emergency-exit-sign-green-running-person.jpg",
      options: ["Entrada principal", "Salida de emergencia", "Baño"],
      correct: "Salida de emergencia",
    },
  ]

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  const playDialogue = () => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta síntesis de voz")
      return
    }

    setIsPlayingDialogue(true)
    window.speechSynthesis.cancel()

    const voices = window.speechSynthesis.getVoices()

    const femaleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("es") &&
          (v.name.includes("Monica") ||
            v.name.includes("Paulina") ||
            v.name.includes("female") ||
            v.name.includes("mujer") ||
            v.name.toLowerCase().includes("woman")),
      ) || voices.find((v) => v.lang.startsWith("es"))

    const maleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("es") &&
          (v.name.includes("Diego") ||
            v.name.includes("Jorge") ||
            v.name.includes("male") ||
            v.name.includes("hombre") ||
            v.name.toLowerCase().includes("man")),
      ) || voices.find((v) => v.lang.startsWith("es") && v !== femaleVoice)

    const dialogue = [
      {
        text: "Oficina de suministros, habla Julia, Dígame...",
        voice: femaleVoice,
        rate: 0.7,
        pitch: 0.9,
        volume: 0.7,
      },
      {
        text: "Hola, Julia soy Ricardo. Del área de ventas. Mira, necesito con urgencia las cajas grandes para el pedido de hoy, ¿ya las tienen listas? El camión sale en media hora.",
        voice: maleVoice,
        rate: 1.3,
        pitch: 1.1,
        volume: 1.0,
      },
      {
        text: "Oh, Ricardo. Pensé que ya las habías recogido. Faltan solo 5 de las 50 pero están casi. Vengan en 10 minutos y ya las tienen. ¿Hay algún problema?",
        voice: femaleVoice,
        rate: 1.0,
        pitch: 1.0,
        volume: 0.9,
      },
      {
        text: "Perfecto, Julia ¡diez minutos! Le diré a Pedro que baja ya mismo ¡muchas gracias! Buen día.",
        voice: maleVoice,
        rate: 1.2,
        pitch: 1.1,
        volume: 1.0,
      },
    ]

    let currentIndex = 0

    const speakNext = () => {
      if (currentIndex < dialogue.length) {
        const current = dialogue[currentIndex]
        const utterance = new SpeechSynthesisUtterance(current.text)
        utterance.lang = "es-ES"
        utterance.voice = current.voice || null
        utterance.rate = current.rate
        utterance.pitch = current.pitch
        utterance.volume = current.volume

        utterance.onend = () => {
          currentIndex++
          setTimeout(speakNext, 800)
        }

        window.speechSynthesis.speak(utterance)
      } else {
        setIsPlayingDialogue(false)
      }
    }

    speakNext()
  }

  const startVoiceRecognition = (setter: (value: string) => void) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Tu navegador no soporta reconocimiento de voz")
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "es-ES"
    recognition.continuous = false
    recognition.interimResults = false

    setIsRecording(true)

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setter(transcript)
      setIsRecording(false)
    }

    recognition.onerror = () => {
      setIsRecording(false)
      alert("Error al reconocer la voz. Intenta nuevamente.")
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  const handleBasicoComplete = () => {
    const correct = droppedOnBook
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      localStorage.setItem("cognicom_oral_basico", "completed")
    }
  }

  const handleIntermedioSubmit = () => {
    const answer = userAnswer.toLowerCase().trim()
    const correct =
      (answer.includes("comprar") && answer.includes("fruta")) ||
      (answer.includes("lista") && answer.includes("compra")) ||
      answer.includes("tarea principal")

    const incorrect = answer.includes("manzana") && !answer.includes("fruta")

    setIsCorrect(correct && !incorrect)
    setShowResult(true)

    if (correct && !incorrect) {
      localStorage.setItem("cognicom_oral_intermedio", "completed")
    }
  }

  const handleAvanzadoSubmit = () => {
    const answerRicardo = userAnswerRicardo.toLowerCase().trim()
    const answerJulia = userAnswerJulia.toLowerCase().trim()

    const correctRicardo =
      answerRicardo.includes("apresura") ||
      answerRicardo.includes("prisa") ||
      answerRicardo.includes("urgencia") ||
      answerRicardo.includes("rápido")

    const correctJulia =
      (answerJulia.includes("preocupa") || answerJulia.includes("tranquil") || answerJulia.includes("alivi")) &&
      (answerJulia.includes("cambio") || answerJulia.includes("mejor") || answerJulia.includes("más"))

    const correct = correctRicardo && correctJulia
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      localStorage.setItem("cognicom_oral_avanzado", "completed")
    }
  }

  const handleSignalAnswer = () => {
    const currentSignal = signals[currentSignalIndex]
    const correct = selectedSignalAnswer === currentSignal.correct
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      if (currentSignalIndex < signals.length - 1) {
        setTimeout(() => {
          setCurrentSignalIndex(currentSignalIndex + 1)
          setSelectedSignalAnswer(null)
          setShowResult(false)
        }, 2000)
      } else {
        localStorage.setItem("cognicom_lectura_basico", "completed")
      }
    }
  }

  const handleLecturaIntermedioSubmit = () => {
    const quienCorrect = lecturaQuien.toLowerCase().includes("ara") || lecturaQuien.toLowerCase().includes("tienda")
    const queCorrect =
      lecturaQue.toLowerCase().includes("ayudante") ||
      lecturaQue.toLowerCase().includes("trabajo") ||
      lecturaQue.toLowerCase().includes("empleo")
    const dondeCorrect =
      lecturaDonde.toLowerCase().includes("calle 4") ||
      lecturaDonde.toLowerCase().includes("avenida 7") ||
      lecturaDonde.toLowerCase().includes("centro")
    const cuandoCorrect =
      lecturaCuando.toLowerCase().includes("lunes") || lecturaCuando.toLowerCase().includes("martes")

    const correct = quienCorrect && queCorrect && dondeCorrect && cuandoCorrect
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      localStorage.setItem("cognicom_lectura_intermedio", "completed")
    }
  }

  const handleLecturaAvanzadoSubmit = () => {
    const answer1 = lecturaAvanzada1.toLowerCase().trim()
    const answer2 = lecturaAvanzada2.toLowerCase().trim()

    const correct1 =
      (answer1.includes("puntual") || answer1.includes("tiempo")) &&
      (answer1.includes("respeto") || answer1.includes("responsab") || answer1.includes("compromiso"))

    const correct2 =
      answer2.includes("planif") ||
      answer2.includes("organiz") ||
      answer2.includes("alarm") ||
      answer2.includes("anticip") ||
      answer2.includes("tiempo")

    const correct = correct1 && correct2
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      localStorage.setItem("cognicom_lectura_avanzado", "completed")
    }
  }

  const handleEscrituraBasicoSubmit = () => {
    const text = escrituraBasico.trim()
    const lines = text.split("\n").filter((line) => line.trim())

    const hasHyphens = lines.filter((line) => line.trim().startsWith("-")).length >= 3
    const hasEnoughItems = lines.length >= 3 && lines.length <= 4
    const hasContent = lines.every((line) => line.replace("-", "").trim().split(" ").length >= 3)

    const correct = hasHyphens && hasEnoughItems && hasContent
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      localStorage.setItem("cognicom_escritura_basico", "completed")
    }
  }

  const handleEscrituraIntermedioSubmit = () => {
    const text = escrituraIntermedio.toLowerCase().trim()
    const sentences = text.split(/[.!?]/).filter((s) => s.trim())

    const hasCortesia =
      text.includes("por favor") || text.includes("podrías") || text.includes("podría") || text.includes("ayuda")
    const hasEnoughSentences = sentences.length >= 2 && sentences.length <= 3
    const hasRequest = text.includes("necesito") || text.includes("ayuda") || text.includes("puedes")

    const correct = hasCortesia && hasEnoughSentences && hasRequest
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      localStorage.setItem("cognicom_escritura_intermedio", "completed")
    }
  }

  const handleEscrituraAvanzadoSubmit = () => {
    const text = escrituraAvanzado.toLowerCase().trim()
    const sentences = text.split(/[.!?]/).filter((s) => s.trim())

    const hasConnectors =
      text.includes("primero") ||
      text.includes("segundo") ||
      text.includes("además") ||
      text.includes("también") ||
      text.includes("resumen") ||
      text.includes("conclusión")

    const hasEnoughSentences = sentences.length >= 4 && sentences.length <= 6
    const hasWorkTopic = text.includes("trabajo") || text.includes("empleo") || text.includes("laboral")

    const correct = hasConnectors && hasEnoughSentences && hasWorkTopic
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      localStorage.setItem("cognicom_escritura_avanzado", "completed")
    }
  }

  const nextLevel = () => {
    setShowResult(false)
    setShowExpectedAnswers(false)
    setUserAnswer("")
    setUserAnswerRicardo("")
    setUserAnswerJulia("")
    setDroppedOnBook(false)
    setDraggedItem(null)
    setSelectedSignalAnswer(null)
    setLecturaQuien("")
    setLecturaQue("")
    setLecturaDonde("")
    setLecturaCuando("")
    setLecturaAvanzada1("")
    setLecturaAvanzada2("")
    setEscrituraBasico("")
    setEscrituraIntermedio("")
    setEscrituraAvanzado("")

    if (currentLevel === "basico") {
      setCurrentLevel("intermedio")
    } else if (currentLevel === "intermedio") {
      setCurrentLevel("avanzado")
    }
  }

  const retry = () => {
    setShowResult(false)
    setShowExpectedAnswers(false)
    setUserAnswer("")
    setUserAnswerRicardo("")
    setUserAnswerJulia("")
    setDroppedOnBook(false)
    setDraggedItem(null)
    setSelectedSignalAnswer(null)
    setLecturaQuien("")
    setLecturaQue("")
    setLecturaDonde("")
    setLecturaCuando("")
    setLecturaAvanzada1("")
    setLecturaAvanzada2("")
    setEscrituraBasico("")
    setEscrituraIntermedio("")
    setEscrituraAvanzado("")
  }

  if (isPageLoading) {
    return <LoadingScreen />
  }

  // Area selection screen
  if (!selectedArea) {
    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Brain className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">Prueba Diagnóstica</h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                Evaluación basada en competencia comunicativa que evalúa tres áreas clave
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card
                className="p-8 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => {
                  setSelectedArea("oral")
                  setCurrentLevel("basico")
                }}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Volume2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Comprensión Oral</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Evalúa tu capacidad de escuchar y comprender instrucciones
                  </p>
                  <Button className="w-full">Comenzar</Button>
                </div>
              </Card>

              <Card
                className="p-8 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => {
                  setSelectedArea("lectura")
                  setCurrentLevel("basico")
                }}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Lectura</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Evalúa tu comprensión de textos y señales
                  </p>
                  <Button className="w-full">Comenzar</Button>
                </div>
              </Card>

              <Card
                className="p-8 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                onClick={() => {
                  setSelectedArea("escritura")
                  setCurrentLevel("basico")
                }}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <PenTool className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Escritura</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Evalúa tu capacidad de expresión escrita
                  </p>
                  <Button className="w-full">Comenzar</Button>
                </div>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/dominios/cognicom">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="w-4 h-4" />
                  Volver a COGNICOM
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Comprensión Oral - Básico
  if (selectedArea === "oral" && currentLevel === "basico") {
    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprensión Oral - Nivel Básico</h2>
                <p className="text-muted-foreground">Escucha la instrucción y completa la tarea</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="text-center mb-8">
                  <Button
                    size="lg"
                    onClick={() => playAudio("Selecciona el lápiz rojo y arrástralo sobre el libro")}
                    className="gap-2"
                  >
                    <Volume2 className="w-5 h-5" />
                    Escuchar Instrucción
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-center mb-4">Lápices</h3>
                    <div className="flex flex-col gap-4">
                      <div
                        draggable
                        onDragStart={() => setDraggedItem("red-pencil")}
                        className="w-full p-4 bg-card border-2 border-red-500 rounded-lg cursor-move hover:scale-105 transition-transform"
                      >
                        <img
                          src="/red-pencil-crayon-rojo.jpg"
                          alt="Lápiz Rojo"
                          className="w-full h-24 object-contain"
                        />
                        <p className="text-center font-semibold mt-2 text-red-600">Lápiz Rojo</p>
                      </div>
                      <div
                        draggable
                        onDragStart={() => setDraggedItem("blue-pencil")}
                        className="w-full p-4 bg-card border-2 border-blue-500 rounded-lg cursor-move hover:scale-105 transition-transform"
                      >
                        <img
                          src="/blue-pencil-crayon-azul.jpg"
                          alt="Lápiz Azul"
                          className="w-full h-24 object-contain"
                        />
                        <p className="text-center font-semibold mt-2 text-blue-600">Lápiz Azul</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-center mb-4">Libro</h3>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault()
                        if (draggedItem === "red-pencil") {
                          setDroppedOnBook(true)
                        }
                      }}
                      className={`w-full p-6 border-4 border-dashed rounded-lg transition-colors ${
                        droppedOnBook ? "border-green-500 bg-green-500/10" : "border-muted-foreground/30"
                      }`}
                    >
                      <img src="/open-book-libro-abierto.jpg" alt="Libro" className="w-full h-48 object-contain mb-4" />
                      {droppedOnBook ? (
                        <div className="text-center">
                          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
                          <p className="text-green-600 font-bold">¡Lápiz Rojo sobre el Libro!</p>
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground">Arrastra el lápiz correcto aquí</p>
                      )}
                    </div>
                  </div>
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button size="lg" onClick={handleBasicoComplete} className="gap-2 bg-green-600 hover:bg-green-700">
                      Verificar Respuesta
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">{isCorrect ? "Siguiente nivel" : "Intenta nuevamente"}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Button onClick={nextLevel} className="gap-2">
                          Siguiente Nivel
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Comprensión Oral - Intermedio
  if (selectedArea === "oral" && currentLevel === "intermedio") {
    const audioText =
      "¡Atención, equipo! Necesito ayuda para una tarea principal: comprar frutas para la semana. Les voy a leer una lista de tres frutas para la compra, pero solo tenemos que recordar el propósito principal de la lista. La lista que debemos comprar incluye: 1. 3 Manzanas rojas 2. 4 Plátanos o bananas 3. 1 kilo de Naranjas"

    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprensión Oral - Nivel Intermedio</h2>
                <p className="text-muted-foreground">Escucha el mensaje y responde la pregunta</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="text-center mb-8">
                  <Button size="lg" onClick={() => playAudio(audioText)} className="gap-2">
                    <Volume2 className="w-5 h-5" />
                    Escuchar Mensaje
                  </Button>
                </div>

                <div className="bg-secondary/30 p-6 rounded-lg mb-8">
                  <p className="text-sm leading-relaxed">{audioText}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold">¿Cuál era la idea principal del mensaje?</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                      className="gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      {showExpectedAnswers ? "Ocultar" : "Ver ayuda"}
                    </Button>
                  </div>

                  {showExpectedAnswers && (
                    <Card className="p-4 bg-blue-500/10 border-blue-500">
                      <p className="text-sm font-semibold mb-2">Respuestas esperadas:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Comprar frutas para la semana</li>
                        <li>Hacer una lista de compras de frutas</li>
                        <li>La tarea principal es comprar frutas</li>
                      </ul>
                      <p className="text-xs text-amber-600 mt-3">
                        ⚠️ Nota: Respuestas como "comprar manzanas" son incorrectas porque se centran solo en una fruta
                        específica, no en la idea general.
                      </p>
                    </Card>
                  )}

                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="w-full min-h-[120px] p-4 rounded-lg border bg-background"
                    disabled={showResult}
                  />
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button size="lg" onClick={handleIntermedioSubmit} disabled={!userAnswer.trim()} className="gap-2">
                      Enviar Respuesta
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">{isCorrect ? "Siguiente nivel" : "Intenta nuevamente"}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Button onClick={nextLevel} className="gap-2">
                          Siguiente Nivel
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Comprensión Oral - Avanzado
  if (selectedArea === "oral" && currentLevel === "avanzado") {
    const dialogoTexto = `Julia (preocupada, voz baja): Oficina de suministros, habla Julia, Dígame...

Ricardo (apresurado, voz rápida): Hola, Julia soy Ricardo. Del área de ventas. Mira, necesito con urgencia las cajas grandes para el pedido de hoy, ¿ya las tienen listas? El camión sale en media hora.

Julia (más animada pero estresada): Oh, Ricardo. Pensé que ya las habías recogido. Faltan solo 5 de las 50 pero están casi. Vengan en 10 minutos y ya las tienen. ¿Hay algún problema?

Ricardo (aliviado): Perfecto, Julia ¡diez minutos! Le diré a Pedro que baja ya mismo ¡muchas gracias! Buen día.

[Conversación con ruido de fondo tipo oficina]`

    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprensión Oral - Nivel Avanzado</h2>
                <p className="text-muted-foreground">Escucha el diálogo telefónico y responde las preguntas</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="text-center mb-8">
                  <Button size="lg" onClick={playDialogue} className="gap-2" disabled={isPlayingDialogue}>
                    <Volume2 className="w-5 h-5" />
                    {isPlayingDialogue ? "Reproduciendo..." : "Escuchar Diálogo Telefónico"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Conversación entre Julia y Ricardo con tonos de voz diferenciados
                  </p>
                  {!voicesLoaded && (
                    <p className="text-xs text-amber-600 mt-2">
                      Nota: Las voces se están cargando. Si no escuchas diferentes tonos, intenta recargar la página.
                    </p>
                  )}
                </div>

                <div className="bg-secondary/30 p-6 rounded-lg mb-8">
                  <p className="text-sm leading-relaxed whitespace-pre-line">{dialogoTexto}</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">
                        1. ¿Cómo se sentía Ricardo al principio de la conversación?
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pista: Escucha el tono de voz y la velocidad al hablar
                    </p>

                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm font-semibold mb-1">Respuesta esperada:</p>
                        <p className="text-sm">
                          Ricardo se sentía apresurado, con prisa y urgencia por conseguir las cajas.
                        </p>
                      </Card>
                    )}

                    <div className="flex gap-2">
                      <textarea
                        value={userAnswerRicardo}
                        onChange={(e) => setUserAnswerRicardo(e.target.value)}
                        placeholder="Escribe tu respuesta sobre Ricardo aquí..."
                        className="flex-1 min-h-[100px] p-4 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setUserAnswerRicardo)}
                        disabled={showResult || isRecording}
                        className="h-auto"
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">2. ¿Cómo se sentía Julia durante la conversación?</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pista: Nota cómo cambia su tono desde el inicio hasta el final
                    </p>

                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm font-semibold mb-1">Respuesta esperada:</p>
                        <p className="text-sm">
                          Julia estaba preocupada al inicio, pero luego se sintió más tranquila y aliviada al poder
                          resolver el problema.
                        </p>
                      </Card>
                    )}

                    <div className="flex gap-2">
                      <textarea
                        value={userAnswerJulia}
                        onChange={(e) => setUserAnswerJulia(e.target.value)}
                        placeholder="Escribe tu respuesta sobre Julia aquí..."
                        className="flex-1 min-h-[100px] p-4 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setUserAnswerJulia)}
                        disabled={showResult || isRecording}
                        className="h-auto"
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleAvanzadoSubmit}
                      disabled={!userAnswerRicardo.trim() || !userAnswerJulia.trim()}
                      className="gap-2"
                    >
                      Enviar Respuestas
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">
                          {isCorrect ? "Has completado la prueba de Comprensión Oral" : "Intenta nuevamente"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Link href="/dominios/cognicom">
                          <Button className="gap-2">
                            Volver a COGNICOM
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Lectura - Básico
  if (selectedArea === "lectura" && currentLevel === "basico") {
    const currentSignal = signals[currentSignalIndex]

    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Lectura - Nivel Básico</h2>
                <p className="text-muted-foreground">Observa la señal e indica su significado</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Señal {currentSignalIndex + 1} de {signals.length}
                </p>
              </div>

              <Card className="p-8 mb-8">
                <div className="text-center mb-8">
                  <div className="w-64 h-64 mx-auto mb-6 bg-secondary/20 rounded-lg flex items-center justify-center p-4">
                    <img
                      src={currentSignal.image || "/placeholder.svg"}
                      alt="Señal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-6">¿Qué significa esta señal?</h3>
                </div>

                <div className="space-y-4 mb-8">
                  {currentSignal.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedSignalAnswer === option ? "default" : "outline"}
                      className="w-full h-auto py-4 text-lg justify-start"
                      onClick={() => {
                        setSelectedSignalAnswer(option)
                        playAudio(option)
                      }}
                      disabled={showResult}
                    >
                      <Volume2 className="w-5 h-5 mr-3 flex-shrink-0" />
                      {option}
                    </Button>
                  ))}
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button size="lg" onClick={handleSignalAnswer} disabled={!selectedSignalAnswer} className="gap-2">
                      Verificar Respuesta
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">
                          {isCorrect
                            ? currentSignalIndex < signals.length - 1
                              ? "Siguiente señal"
                              : "Siguiente nivel"
                            : "Intenta nuevamente"}
                        </p>
                      </div>
                    </div>
                    {isCorrect && currentSignalIndex === signals.length - 1 && (
                      <div className="flex gap-4">
                        <Button onClick={nextLevel} className="gap-2">
                          Siguiente Nivel
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {!isCorrect && (
                      <div className="flex gap-4">
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      </div>
                    )}
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Lectura - Intermedio
  if (selectedArea === "lectura" && currentLevel === "intermedio") {
    const avisoTexto = `TIENDAS ARA
¡BUSCA AYUDANTE DE TIENDA!

¿Qué harás?
Ordenar los productos y mantener limpia la sala.

El horario es de lunes a viernes.

Para más información, acércate a la dirección calle 4 con avenida 7, #15, barrio Centro, el día lunes o martes.

Te esperamos.`

    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Lectura - Nivel Intermedio</h2>
                <p className="text-muted-foreground">Lee el aviso y responde las preguntas</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 p-8 rounded-lg mb-8 border-2 border-yellow-400">
                  <p className="text-base leading-relaxed whitespace-pre-line font-medium">{avisoTexto}</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">1. ¿Quién anuncia?</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm">Tiendas ARA</p>
                      </Card>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lecturaQuien}
                        onChange={(e) => setLecturaQuien(e.target.value)}
                        placeholder="Tu respuesta..."
                        className="flex-1 p-3 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setLecturaQuien)}
                        disabled={showResult || isRecording}
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">2. ¿Qué anuncia?</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm">Busca ayudante de tienda / Oferta de trabajo</p>
                      </Card>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lecturaQue}
                        onChange={(e) => setLecturaQue(e.target.value)}
                        placeholder="Tu respuesta..."
                        className="flex-1 p-3 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setLecturaQue)}
                        disabled={showResult || isRecording}
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">3. ¿Dónde es?</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm">Calle 4 con avenida 7, #15, barrio Centro</p>
                      </Card>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lecturaDonde}
                        onChange={(e) => setLecturaDonde(e.target.value)}
                        placeholder="Tu respuesta..."
                        className="flex-1 p-3 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setLecturaDonde)}
                        disabled={showResult || isRecording}
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">4. ¿Cuándo?</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm">Lunes o martes</p>
                      </Card>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lecturaCuando}
                        onChange={(e) => setLecturaCuando(e.target.value)}
                        placeholder="Tu respuesta..."
                        className="flex-1 p-3 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setLecturaCuando)}
                        disabled={showResult || isRecording}
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleLecturaIntermedioSubmit}
                      disabled={
                        !lecturaQuien.trim() || !lecturaQue.trim() || !lecturaDonde.trim() || !lecturaCuando.trim()
                      }
                      className="gap-2"
                    >
                      Enviar Respuestas
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">{isCorrect ? "Siguiente nivel" : "Intenta nuevamente"}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Button onClick={nextLevel} className="gap-2">
                          Siguiente Nivel
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Lectura - Avanzado
  if (selectedArea === "lectura" && currentLevel === "avanzado") {
    const articuloTexto = `La puntualidad: Un valor que abre puertas

Llegar a tiempo no es solo una cuestión de buenos modales, es una forma de mostrar respeto por los demás y por uno mismo. Cuando somos puntuales, demostramos que valoramos el tiempo de las otras personas tanto como el nuestro. En el trabajo, la puntualidad es especialmente importante porque muestra compromiso y responsabilidad.

Ser puntual también nos ayuda a sentirnos mejor con nosotros mismos. Cuando llegamos tarde, nos sentimos estresados y preocupados. En cambio, cuando llegamos a tiempo, nos sentimos tranquilos y preparados para hacer nuestras tareas. La puntualidad es un hábito que se puede aprender con práctica y organización.

Para ser más puntuales, podemos usar alarmas, preparar nuestras cosas la noche anterior, y salir de casa con tiempo suficiente. Estos pequeños cambios pueden hacer una gran diferencia en nuestra vida diaria y en cómo nos ven los demás.`

    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Lectura - Nivel Avanzado</h2>
                <p className="text-muted-foreground">Lee el artículo y responde las preguntas</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="bg-secondary/30 p-8 rounded-lg mb-8">
                  <h3 className="text-xl font-bold mb-4 text-center">La puntualidad: Un valor que abre puertas</h3>
                  <p className="text-base leading-relaxed whitespace-pre-line">{articuloTexto}</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">
                        1. Según el texto, ¿por qué es importante ser puntual en el trabajo?
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm">
                          Porque muestra respeto, compromiso y responsabilidad. Demuestra que valoramos el tiempo de los
                          demás.
                        </p>
                      </Card>
                    )}
                    <div className="flex gap-2">
                      <textarea
                        value={lecturaAvanzada1}
                        onChange={(e) => setLecturaAvanzada1(e.target.value)}
                        placeholder="Tu respuesta..."
                        className="flex-1 min-h-[100px] p-4 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setLecturaAvanzada1)}
                        disabled={showResult || isRecording}
                        className="h-auto"
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold">2. ¿Qué consejos da el texto para ser más puntual?</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                        className="gap-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    {showExpectedAnswers && (
                      <Card className="p-3 bg-blue-500/10 border-blue-500">
                        <p className="text-sm">
                          Usar alarmas, preparar las cosas la noche anterior, y salir de casa con tiempo suficiente.
                        </p>
                      </Card>
                    )}
                    <div className="flex gap-2">
                      <textarea
                        value={lecturaAvanzada2}
                        onChange={(e) => setLecturaAvanzada2(e.target.value)}
                        placeholder="Tu respuesta..."
                        className="flex-1 min-h-[100px] p-4 rounded-lg border bg-background"
                        disabled={showResult}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startVoiceRecognition(setLecturaAvanzada2)}
                        disabled={showResult || isRecording}
                        className="h-auto"
                      >
                        <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleLecturaAvanzadoSubmit}
                      disabled={!lecturaAvanzada1.trim() || !lecturaAvanzada2.trim()}
                      className="gap-2"
                    >
                      Enviar Respuestas
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">
                          {isCorrect ? "Has completado la prueba de Lectura" : "Intenta nuevamente"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Link href="/dominios/cognicom">
                          <Button className="gap-2">
                            Volver a COGNICOM
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Escritura - Básico
  if (selectedArea === "escritura" && currentLevel === "basico") {
    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Escritura - Nivel Básico</h2>
                <p className="text-muted-foreground">Escribe una lista de 3-4 ítems</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="bg-blue-500/10 border border-blue-500 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold mb-3">Instrucciones:</h3>
                  <p className="text-sm leading-relaxed mb-3">
                    Escribe una lista de 3-4 ítems sobre uno de estos temas:
                  </p>
                  <ul className="text-sm space-y-2 list-disc list-inside ml-4">
                    <li>Lo que necesitas comprar en la tienda</li>
                    <li>Tu rutina diaria</li>
                    <li>Cómo preparar una receta</li>
                  </ul>
                  <p className="text-sm mt-4 font-semibold text-amber-600">
                    Recuerda: Usa guiones (-) al inicio de cada ítem y escribe frases completas con coherencia.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold">Tu lista:</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                      className="gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      {showExpectedAnswers ? "Ocultar" : "Ver ejemplo"}
                    </Button>
                  </div>

                  {showExpectedAnswers && (
                    <Card className="p-4 bg-blue-500/10 border-blue-500">
                      <p className="text-sm font-semibold mb-2">Ejemplo de lista correcta:</p>
                      <div className="text-sm space-y-1 font-mono">
                        <p>- Comprar leche y pan en la tienda</p>
                        <p>- Llevar las llaves del carro</p>
                        <p>- Recoger la ropa de la lavandería</p>
                        <p>- Llamar a mamá por teléfono</p>
                      </div>
                    </Card>
                  )}

                  <textarea
                    value={escrituraBasico}
                    onChange={(e) => setEscrituraBasico(e.target.value)}
                    placeholder="Escribe tu lista aquí...&#10;Ejemplo:&#10;- Primer ítem de mi lista&#10;- Segundo ítem de mi lista&#10;- Tercer ítem de mi lista"
                    className="w-full min-h-[200px] p-4 rounded-lg border bg-background font-mono"
                    disabled={showResult}
                  />
                  <p className="text-xs text-muted-foreground">
                    Escribe entre 3 y 4 ítems, cada uno en una línea nueva comenzando con un guión (-)
                  </p>
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleEscrituraBasicoSubmit}
                      disabled={!escrituraBasico.trim()}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      Listo
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "Correcto" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">{isCorrect ? "Siguiente nivel" : "Intenta nuevamente"}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Button onClick={nextLevel} className="gap-2">
                          Siguiente Nivel
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Escritura - Intermedio
  if (selectedArea === "escritura" && currentLevel === "intermedio") {
    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Escritura - Nivel Intermedio</h2>
                <p className="text-muted-foreground">Escribe un mensaje pidiendo ayuda</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="bg-blue-500/10 border border-blue-500 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold mb-3">Instrucciones:</h3>
                  <p className="text-sm leading-relaxed mb-3">
                    Escribe o emite por audio un mensaje corto de 2-3 frases para pedir ayuda a un amigo o cuidador.
                  </p>
                  <p className="text-sm font-semibold text-amber-600">
                    Recuerda: Usa fórmulas de cortesía como "por favor", "podrías", y explica claramente qué necesitas.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold">Tu mensaje:</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                      className="gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      {showExpectedAnswers ? "Ocultar" : "Ver ejemplo"}
                    </Button>
                  </div>

                  {showExpectedAnswers && (
                    <Card className="p-4 bg-blue-500/10 border-blue-500">
                      <p className="text-sm font-semibold mb-2">Ejemplo de mensaje correcto:</p>
                      <p className="text-sm italic">
                        "Necesito ayuda con la nevera ahora mismo, por favor. Es una tarea pesada y no puedo hacerla
                        solo. ¿Podrías venir a echarme una mano?"
                      </p>
                    </Card>
                  )}

                  <div className="flex gap-2">
                    <textarea
                      value={escrituraIntermedio}
                      onChange={(e) => setEscrituraIntermedio(e.target.value)}
                      placeholder="Escribe tu mensaje aquí... Ejemplo: Necesito ayuda con..."
                      className="flex-1 min-h-[150px] p-4 rounded-lg border bg-background"
                      disabled={showResult}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => startVoiceRecognition(setEscrituraIntermedio)}
                      disabled={showResult || isRecording}
                      className="h-auto"
                    >
                      <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Escribe 2-3 frases con cortesía y coherencia, o usa el micrófono para dictar tu mensaje
                  </p>
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleEscrituraIntermedioSubmit}
                      disabled={!escrituraIntermedio.trim()}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      Listo
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "Correcto" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">{isCorrect ? "Siguiente nivel" : "Intenta nuevamente"}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Button onClick={nextLevel} className="gap-2">
                          Siguiente Nivel
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Escritura - Avanzado
  if (selectedArea === "escritura" && currentLevel === "avanzado") {
    return (
      <div className="min-h-screen">
        <Header />

        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Escritura - Nivel Avanzado</h2>
                <p className="text-muted-foreground">Escribe un párrafo argumentativo</p>
              </div>

              <Card className="p-8 mb-8">
                <div className="bg-blue-500/10 border border-blue-500 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold mb-3">Instrucciones:</h3>
                  <p className="text-sm leading-relaxed mb-3">
                    Escribe o emite por audio un párrafo argumentativo de 4-5 frases para justificar por qué es bueno
                    tener un trabajo.
                  </p>
                  <p className="text-sm font-semibold text-amber-600">
                    Recuerda: Usa conectores lógicos como "primero", "segundo", "además", "en resumen" y organiza tus
                    ideas claramente.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold">Tu párrafo argumentativo:</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowExpectedAnswers(!showExpectedAnswers)}
                      className="gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      {showExpectedAnswers ? "Ocultar" : "Ver ejemplo"}
                    </Button>
                  </div>

                  {showExpectedAnswers && (
                    <Card className="p-4 bg-blue-500/10 border-blue-500">
                      <p className="text-sm font-semibold mb-2">Ejemplo de párrafo correcto:</p>
                      <p className="text-sm italic">
                        "Tener un trabajo es muy importante y bueno para ti. Primero, ganas tu propio dinero para
                        comprar cosas que quieres. Segundo, el trabajo te ayuda a aprender cosas nuevas cada día.
                        Además, te permite conocer gente y hacer nuevos amigos. En resumen, trabajar te hace sentir más
                        capaz y parte de la sociedad."
                      </p>
                    </Card>
                  )}

                  <div className="flex gap-2">
                    <textarea
                      value={escrituraAvanzado}
                      onChange={(e) => setEscrituraAvanzado(e.target.value)}
                      placeholder="Escribe tu párrafo aquí... Usa conectores como 'primero', 'segundo', 'además', 'en resumen'..."
                      className="flex-1 min-h-[200px] p-4 rounded-lg border bg-background"
                      disabled={showResult}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => startVoiceRecognition(setEscrituraAvanzado)}
                      disabled={showResult || isRecording}
                      className="h-auto"
                    >
                      <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : ""}`} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Escribe 4-5 frases con conectores lógicos y estructura argumentativa, o usa el micrófono para dictar
                  </p>
                </div>

                {!showResult && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleEscrituraAvanzadoSubmit}
                      disabled={!escrituraAvanzado.trim()}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      Listo
                    </Button>
                  </div>
                )}

                {showResult && (
                  <Card
                    className={`p-6 ${isCorrect ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold">{isCorrect ? "Correcto" : "Incorrecto"}</h3>
                        <p className="text-muted-foreground">
                          {isCorrect ? "Has completado la prueba de Escritura" : "Intenta nuevamente"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {isCorrect ? (
                        <Link href="/dominios/cognicom">
                          <Button className="gap-2">
                            Volver a COGNICOM
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button onClick={retry} variant="outline">
                          Intentar Nuevamente
                        </Button>
                      )}
                    </div>
                  </Card>
                )}
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return null
}
