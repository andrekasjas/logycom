"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  Music,
  BookOpen,
  MessageCircle,
  Mic,
  MicOff,
} from "lucide-react"

export default function HabilidadesComunicativasPage() {
  const [selectedActivity, setSelectedActivity] = useState<
    "escucha" | "habla" | "lectoescritura" | "conversacional" | null
  >(null)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])

  // Estados para Escucha Activa
  const [escuchaAnswer, setEscuchaAnswer] = useState("")
  const [escuchaResult, setEscuchaResult] = useState<"correct" | "incorrect" | null>(null)
  const [showEscuchaHelp, setShowEscuchaHelp] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [keywordGesture, setKeywordGesture] = useState("")
  const [songAnswer, setSongAnswer] = useState("")

  // Estados para Habla
  const [hablaWords, setHablaWords] = useState("")
  const [hablaResult, setHablaResult] = useState<"correct" | "incorrect" | null>(null)
  const [showHablaHelp, setShowHablaHelp] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState("M")
  const [selectedObjects, setSelectedObjects] = useState<string[]>([])
  const [orderedSteps, setOrderedSteps] = useState<string[]>([])
  const [clickedPositions, setClickedPositions] = useState<{ x: number; y: number }[]>([])

  const [draggedWords, setDraggedWords] = useState<{ [key: string]: string }>({})
  const [orderedPhrase, setOrderedPhrase] = useState<string[]>([])
  const [clozeAnswers, setClozeAnswers] = useState<{ [key: string]: string }>({})
  const [showLectoHelp, setShowLectoHelp] = useState(false)
  const [lectoResult, setLectoResult] = useState<"correct" | "incorrect" | null>(null)

  const [selectedIslandObjects, setSelectedIslandObjects] = useState<string[]>([])
  const [salesParagraph, setSalesParagraph] = useState("")
  const [repeatCount, setRepeatCount] = useState(0)
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>(["", "", "", "", ""])
  const [showConversacionalHelp, setShowConversacionalHelp] = useState(false)
  const [conversacionalResult, setConversacionalResult] = useState<"correct" | "incorrect" | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedText, setRecordedText] = useState("")
  const [enableBotRepeat, setEnableBotRepeat] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("habilidadesCompletedLevels")
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

  const saveProgress = (level: number) => {
    const updated = [...completedLevels, level]
    setCompletedLevels(updated)
    localStorage.setItem("habilidadesCompletedLevels", JSON.stringify(updated))
  }

  const playAudio = (text: string, rate = 1, pitch = 1) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.onstart = () => setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utterance)
    }
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

  // Nivel 1 Escucha: El Autobús
  const checkAutobusAnswer = () => {
    const answer = escuchaAnswer.toLowerCase().trim()
    const hasCorrectKeyword =
      answer.includes("mi") || answer.includes("mio") || answer.includes("conductor") || answer.includes("yo")
    const hasNumber = /\d+/.test(answer)

    if (hasCorrectKeyword || hasNumber) {
      setEscuchaResult("correct")
      saveProgress(1)
      setTimeout(() => {
        setCurrentLevel(2)
        setEscuchaAnswer("")
        setEscuchaResult(null)
        setShowEscuchaHelp(false)
      }, 2000)
    } else {
      setEscuchaResult("incorrect")
    }
  }

  const autobusStory =
    "Imagina que conduces un autobús. Al principio el autobús está vacío. Al llegar la primera parada se suben cinco personas. En la siguiente parada se bajan tres personas del autobús y dos suben. Más tarde, se suben diez personas y se bajan cuatro. Por último, al final de la línea se bajan otros cinco pasajeros."

  // Nivel 2 Escucha: La Palabra Clave
  const checkPalabraClaveAnswer = () => {
    const answer = keywordGesture.toLowerCase().trim()
    if (
      answer.includes("levantar") ||
      answer.includes("mano") ||
      answer.includes("gesto") ||
      answer.includes("chasquear") ||
      answer.includes("aplaudir") ||
      answer.includes("señalar") ||
      answer.length > 5
    ) {
      setEscuchaResult("correct")
      saveProgress(2)
      setTimeout(() => {
        setCurrentLevel(3)
        setKeywordGesture("")
        setEscuchaResult(null)
        setShowEscuchaHelp(false)
      }, 2000)
    } else {
      setEscuchaResult("incorrect")
    }
  }

  const palabraClaveStory =
    "Había una vez un pequeño pueblo en las montañas. Los habitantes del pueblo eran muy amables y siempre se ayudaban entre sí. Un día, llegó un viajero al pueblo buscando un lugar donde descansar. Los habitantes le dieron la bienvenida y le ofrecieron comida y refugio."

  // Nivel 3 Escucha: ¿Cómo iba la canción?
  const checkCancionAnswer = () => {
    if (songAnswer.trim().length >= 10) {
      setEscuchaResult("correct")
      saveProgress(3)
      setTimeout(() => {
        setSelectedActivity(null)
        setCurrentLevel(1)
        setSongAnswer("")
        setEscuchaResult(null)
        setShowEscuchaHelp(false)
      }, 2000)
    } else {
      setEscuchaResult("incorrect")
    }
  }

  const cancionLyrics = "Estrellita dónde estás, me pregunto qué serás. En el cielo o en el mar, un diamante de verdad."

  // Nivel 1 Habla: Palabras con Letra
  const checkPalabrasLetra = () => {
    const words = hablaWords
      .split(",")
      .map((w) => w.trim())
      .filter((w) => w.length > 0)
    const letterCounts: { [key: string]: number } = { M: 5, P: 5, C: 5, A: 5, S: 5, T: 5 }
    const requiredCount = letterCounts[selectedLetter] || 5

    if (words.length >= requiredCount) {
      setHablaResult("correct")
      saveProgress(11)
      setTimeout(() => {
        setCurrentLevel(2)
        setHablaWords("")
        setHablaResult(null)
        setShowHablaHelp(false)
      }, 2000)
    } else {
      setHablaResult("incorrect")
    }
  }

  // Nivel 2 Habla: Describir Posiciones (Interactive)
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setClickedPositions([...clickedPositions, { x, y }])
  }

  const checkDescribirPosiciones = () => {
    if (clickedPositions.length >= 3) {
      setHablaResult("correct")
      saveProgress(12)
      setTimeout(() => {
        setCurrentLevel(3)
        setClickedPositions([])
        setHablaResult(null)
        setShowHablaHelp(false)
      }, 2000)
    } else {
      setHablaResult("incorrect")
    }
  }

  // Nivel 3 Habla: Pasito a Pasito
  const steps = [
    "Va a ser el cumpleaños de mi madre",
    "Pienso qué le puedo regalar",
    "Se me ocurre una idea: ¡voy a hacer un dibujo!",
    "Busco todo lo que necesito para hacer un dibujo",
    "Hago el dibujo",
    "Le doy mi regalo el día de su cumpleaños",
  ]

  const toggleStep = (step: string) => {
    if (orderedSteps.includes(step)) {
      setOrderedSteps(orderedSteps.filter((s) => s !== step))
    } else {
      setOrderedSteps([...orderedSteps, step])
    }
  }

  const checkPasitoAPasito = () => {
    const correctOrder = steps
    const isCorrect = orderedSteps.length === correctOrder.length && orderedSteps.every((s, i) => s === correctOrder[i])

    if (isCorrect) {
      setHablaResult("correct")
      saveProgress(13)
      setTimeout(() => {
        setSelectedActivity(null)
        setCurrentLevel(1)
        setOrderedSteps([])
        setHablaResult(null)
        setShowHablaHelp(false)
      }, 2000)
    } else {
      setHablaResult("incorrect")
    }
  }

  const sentences = [
    { scrambled: ["mamá", "Mi", "sopa", "come"], correct: "Mi mamá come sopa" },
    { scrambled: ["perro", "El", "es", "negro", "color"], correct: "El perro es color negro" },
    { scrambled: ["El", "es", "azul", "vaso"], correct: "El vaso es azul" },
    { scrambled: ["La", "está", "flor", "en", "maceta", "la"], correct: "La flor está en la maceta" },
  ]

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [shuffledWords, setShuffledWords] = useState<string[]>([])

  useEffect(() => {
    if (selectedActivity === "lectoescritura" && currentLevel === 1) {
      const words = [...sentences[currentSentenceIndex].scrambled]
      setShuffledWords(words.sort(() => Math.random() - 0.5))
      setOrderedPhrase([])
    }
  }, [selectedActivity, currentLevel, currentSentenceIndex])

  const addWordToPhrase = (word: string) => {
    setOrderedPhrase([...orderedPhrase, word])
    setShuffledWords(shuffledWords.filter((w) => w !== word))
  }

  const removeWordFromPhrase = (index: number) => {
    const word = orderedPhrase[index]
    setShuffledWords([...shuffledWords, word])
    setOrderedPhrase(orderedPhrase.filter((_, i) => i !== index))
  }

  const checkOrdenarTexto = () => {
    const userAnswer = orderedPhrase.join(" ")
    const correctAnswer = sentences[currentSentenceIndex].correct

    if (userAnswer === correctAnswer) {
      setLectoResult("correct")
      if (currentSentenceIndex < sentences.length - 1) {
        setTimeout(() => {
          setCurrentSentenceIndex(currentSentenceIndex + 1)
          setLectoResult(null)
          setShowLectoHelp(false)
        }, 2000)
      } else {
        saveProgress(21)
        setTimeout(() => {
          setCurrentLevel(2)
          setCurrentSentenceIndex(0)
          setLectoResult(null)
          setShowLectoHelp(false)
        }, 2000)
      }
    } else {
      setLectoResult("incorrect")
    }
  }

  const phrases = [
    { scrambled: ["gato", "El", "duerme", "sofá", "en", "el"], correct: "El gato duerme en el sofá" },
    { scrambled: ["niños", "Los", "juegan", "parque", "en", "el"], correct: "Los niños juegan en el parque" },
    { scrambled: ["libro", "El", "está", "mesa", "sobre", "la"], correct: "El libro está sobre la mesa" },
  ]

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [shuffledPhraseWords, setShuffledPhraseWords] = useState<string[]>([])
  const [orderedPhraseWords, setOrderedPhraseWords] = useState<string[]>([])

  useEffect(() => {
    if (selectedActivity === "lectoescritura" && currentLevel === 2) {
      const words = [...phrases[currentPhraseIndex].scrambled]
      setShuffledPhraseWords(words.sort(() => Math.random() - 0.5))
      setOrderedPhraseWords([])
    }
  }, [selectedActivity, currentLevel, currentPhraseIndex])

  const addWordToPhraseLevel2 = (word: string) => {
    setOrderedPhraseWords([...orderedPhraseWords, word])
    setShuffledPhraseWords(shuffledPhraseWords.filter((w) => w !== word))
  }

  const removeWordFromPhraseLevel2 = (index: number) => {
    const word = orderedPhraseWords[index]
    setShuffledPhraseWords([...shuffledPhraseWords, word])
    setOrderedPhraseWords(orderedPhraseWords.filter((_, i) => i !== index))
  }

  const checkOrdenarFrases = () => {
    const userAnswer = orderedPhraseWords.join(" ")
    const correctAnswer = phrases[currentPhraseIndex].correct

    if (userAnswer === correctAnswer) {
      setLectoResult("correct")
      if (currentPhraseIndex < phrases.length - 1) {
        setTimeout(() => {
          setCurrentPhraseIndex(currentPhraseIndex + 1)
          setLectoResult(null)
          setShowLectoHelp(false)
        }, 2000)
      } else {
        saveProgress(22)
        setTimeout(() => {
          setCurrentLevel(3)
          setCurrentPhraseIndex(0)
          setLectoResult(null)
          setShowLectoHelp(false)
        }, 2000)
      }
    } else {
      setLectoResult("incorrect")
    }
  }

  const clozeText = {
    categories: ["lugares", "verbos", "adjetivos", "personas"],
    words: {
      lugares: ["pueblo", "cielo", "lugar", "viaje"],
      verbos: ["llamaba", "fueron", "tenían", "empezaron", "sintieron", "gritaba", "era"],
      adjetivos: ["geniales", "rosadas", "dorada", "claro", "increíble"],
      personas: ["niños", "Jorge", "Ellos", "Felipe"],
    },
    story: [
      "Había una vez dos _____ (personas) que se llamaba _____ (personas) y sus ojos eran _____ (adjetivos) como el _____ (lugares).",
      "_____ (personas) se _____ (verbos) de _____ (lugares) a un _____ (lugares) cuando _____ (adjetivos). Las _____ (adjetivos) _____ (verbos) arenas _____ (adjetivos) y el _____ (lugares) _____ (verbos) _____ (adjetivos) hasta el borde del agua y el pie _____ (verbos) _____ (adjetivos) y se _____ (verbos) a _____ (verbos) como _____ (adjetivos).",
      "Se _____ (verbos) por la _____ (adjetivos) que _____ (verbos) y _____ (verbos) en una casa al pie de la _____ (lugares). Es _____ (adjetivos) esto _____ (verbos) _____ (personas).",
      "¡Mañana el agua la _____ (verbos) _____ (personas)! Al hacerlo se _____ (verbos) otra magia: A _____ (personas) les _____ (verbos) dos _____ (adjetivos) y _____ (adjetivos) _____ (verbos) _____ (adjetivos) de paz.",
    ],
  }

  const [clozeInputs, setClozeInputs] = useState<{ [key: string]: string }>({})

  const checkCompletarTexto = () => {
    const filledCount = Object.keys(clozeInputs).filter((key) => clozeInputs[key].trim().length > 0).length
    if (filledCount >= 15) {
      setLectoResult("correct")
      saveProgress(23)
      setTimeout(() => {
        setSelectedActivity(null)
        setCurrentLevel(1)
        setClozeInputs({})
        setLectoResult(null)
        setShowLectoHelp(false)
      }, 2000)
    } else {
      setLectoResult("incorrect")
    }
  }

  const islandObjects = [
    "Agua potable",
    "Cuchillo",
    "Fósforos",
    "Linterna",
    "Cuerda",
    "Manta",
    "Botiquín",
    "Brújula",
    "Espejo",
    "Silbato",
  ]

  const toggleIslandObject = (obj: string) => {
    if (selectedIslandObjects.includes(obj)) {
      setSelectedIslandObjects(selectedIslandObjects.filter((o) => o !== obj))
    } else if (selectedIslandObjects.length < 5) {
      setSelectedIslandObjects([...selectedIslandObjects, obj])
    }
  }

  const checkIslaDesierta = () => {
    if (selectedIslandObjects.length === 5) {
      setConversacionalResult("correct")
      saveProgress(31)
      setTimeout(() => {
        setCurrentLevel(2)
        setSelectedIslandObjects([])
        setConversacionalResult(null)
        setShowConversacionalHelp(false)
      }, 2000)
    } else {
      setConversacionalResult("incorrect")
    }
  }

  const salesObjects = ["Teléfono móvil", "Bicicleta", "Libro", "Reloj", "Zapatos"]
  const [selectedSalesObject, setSelectedSalesObject] = useState(salesObjects[0])

  const checkRedactarParaVender = () => {
    if (salesParagraph.length > 10) {
      setConversacionalResult("correct")
      saveProgress(32)
      setTimeout(() => {
        setCurrentLevel(3)
        setSalesParagraph("")
        setConversacionalResult(null)
        setEnableBotRepeat(false)
      }, 2000)
    } else {
      setConversacionalResult("incorrect")
    }
  }

  const calculateSimilarity = (text1: string, text2: string) => {
    const words1 = text1.split(" ")
    const words2 = text2.split(" ")
    const commonWords = words1.filter((word) => words2.includes(word))
    return commonWords.length / Math.max(words1.length, words2.length)
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
      setConversacionalResult("correct")
      saveProgress(33)
      setTimeout(() => {
        setSelectedActivity(null)
        setCurrentLevel(1)
        setInterviewAnswers(["", "", "", "", ""])
        setConversacionalResult(null)
        setShowConversacionalHelp(false)
      }, 2000)
    } else {
      setConversacionalResult("incorrect")
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

          <h1 className="text-4xl font-bold mb-8 text-center">Habilidades Comunicativas</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">Selecciona una actividad para comenzar</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedActivity("escucha")}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Escucha Activa</h2>
              </div>
              <p className="text-muted-foreground">Desarrolla tu capacidad de escuchar y comprender</p>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedActivity("habla")}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Habla</h2>
              </div>
              <p className="text-muted-foreground">Mejora tu expresión oral y comunicación</p>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedActivity("lectoescritura")}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Lecto Escritura</h2>
              </div>
              <p className="text-muted-foreground">Practica lectura y escritura de forma interactiva</p>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedActivity("conversacional")}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Conversacional</h2>
              </div>
              <p className="text-muted-foreground">Desarrolla habilidades de conversación práctica</p>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Escucha Activa Levels
  if (selectedActivity === "escucha") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedActivity(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-center">Escucha Activa - Nivel {currentLevel}</h1>

          {currentLevel === 1 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">El Autobús</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowEscuchaHelp(!showEscuchaHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showEscuchaHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> La respuesta correcta es cualquier número o palabras como "el mío", "mi",
                    "yo", "conductor".
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <Button onClick={() => playAudio(autobusStory)} className="w-full gap-2" disabled={isPlayingAudio}>
                  <Volume2 className="w-5 h-5" />
                  {isPlayingAudio ? "Reproduciendo..." : "Escuchar Historia"}
                </Button>

                <div>
                  <label className="block text-sm font-medium mb-2">¿De qué color son los ojos del conductor?</label>
                  <input
                    type="text"
                    value={escuchaAnswer}
                    onChange={(e) => setEscuchaAnswer(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Escribe tu respuesta..."
                  />
                </div>

                <Button onClick={checkAutobusAnswer} className="w-full">
                  Verificar Respuesta
                </Button>

                {escuchaResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Correcto! Pasando al siguiente nivel...</span>
                  </div>
                )}

                {escuchaResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Intenta de nuevo</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 2 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">La Palabra Clave</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowEscuchaHelp(!showEscuchaHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showEscuchaHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Describe un gesto que harías cada vez que escuches la palabra "pueblo" (por
                    ejemplo: levantar la mano, aplaudir, chasquear los dedos).
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Escucha la historia y cada vez que escuches la palabra "pueblo", realiza un gesto específico.
                </p>

                <Button onClick={() => playAudio(palabraClaveStory)} className="w-full gap-2" disabled={isPlayingAudio}>
                  <Volume2 className="w-5 h-5" />
                  {isPlayingAudio ? "Reproduciendo..." : "Escuchar Historia"}
                </Button>

                <div>
                  <label className="block text-sm font-medium mb-2">¿Qué gesto realizaste?</label>
                  <input
                    type="text"
                    value={keywordGesture}
                    onChange={(e) => setKeywordGesture(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Describe el gesto..."
                  />
                </div>

                <Button onClick={checkPalabraClaveAnswer} className="w-full">
                  Verificar Respuesta
                </Button>

                {escuchaResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Correcto! Pasando al siguiente nivel...</span>
                  </div>
                )}

                {escuchaResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Intenta de nuevo</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 3 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">¿Cómo iba la canción?</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowEscuchaHelp(!showEscuchaHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showEscuchaHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Escucha atentamente la canción y trata de recordar la letra. Puedes escribir
                    palabras clave o frases que recuerdes.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <Button
                  onClick={() => playAudio(cancionLyrics, 1, 1.2)}
                  className="w-full gap-2"
                  disabled={isPlayingAudio}
                >
                  <Music className="w-5 h-5" />
                  {isPlayingAudio ? "Reproduciendo..." : "Escuchar Canción"}
                </Button>

                <div>
                  <label className="block text-sm font-medium mb-2">Escribe lo que recuerdas de la canción:</label>
                  <textarea
                    value={songAnswer}
                    onChange={(e) => setSongAnswer(e.target.value)}
                    className="w-full p-3 border rounded-lg min-h-[100px]"
                    placeholder="Escribe lo que recuerdas..."
                  />
                </div>

                <Button onClick={checkCancionAnswer} className="w-full">
                  Verificar Respuesta
                </Button>

                {escuchaResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Excelente! Has completado Escucha Activa</span>
                  </div>
                )}

                {escuchaResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Intenta escribir más detalles</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  // Habla Levels
  if (selectedActivity === "habla") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedActivity(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-center">Habla - Nivel {currentLevel}</h1>

          {currentLevel === 1 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Palabras con Letra</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowHablaHelp(!showHablaHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showHablaHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Piensa en objetos, animales, lugares o nombres que comiencen con la letra
                    seleccionada. Separa cada palabra con una coma.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Selecciona una letra:</label>
                  <div className="flex flex-wrap gap-2">
                    {["M", "P", "C", "A", "S", "T"].map((letter) => (
                      <Button
                        key={letter}
                        variant={selectedLetter === letter ? "default" : "outline"}
                        onClick={() => setSelectedLetter(letter)}
                      >
                        {letter}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Escribe 5 palabras que empiecen con "{selectedLetter}" (separadas por comas):
                  </label>
                  <textarea
                    value={hablaWords}
                    onChange={(e) => setHablaWords(e.target.value)}
                    className="w-full p-3 border rounded-lg min-h-[100px]"
                    placeholder="Ejemplo: Mesa, Manzana, Mono, Montaña, Música"
                  />
                </div>

                <Button onClick={checkPalabrasLetra} className="w-full">
                  Verificar Respuesta
                </Button>

                {hablaResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Correcto! Pasando al siguiente nivel...</span>
                  </div>
                )}

                {hablaResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Necesitas al menos 5 palabras</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 2 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Describir Posiciones</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowHablaHelp(!showHablaHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showHablaHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Haz clic en al menos 3 objetos que estén dentro del círculo verde en la
                    imagen.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">Haz clic en los objetos que están dentro del círculo verde:</p>

                <div
                  className="relative cursor-pointer border-4 border-primary/20 rounded-lg overflow-hidden"
                  onClick={handleImageClick}
                >
                  <img src="/classroom-objects-with-green-circle.jpg" alt="Objetos en el aula" className="w-full" />
                  {clickedPositions.map((pos, index) => (
                    <div
                      key={index}
                      className="absolute w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">Objetos seleccionados: {clickedPositions.length}</p>

                <Button onClick={checkDescribirPosiciones} className="w-full">
                  Verificar Respuesta
                </Button>

                {hablaResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Correcto! Pasando al siguiente nivel...</span>
                  </div>
                )}

                {hablaResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Necesitas seleccionar al menos 3 objetos</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 3 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Pasito a Pasito</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowHablaHelp(!showHablaHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showHablaHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Lee todas las frases y ordénalas cronológicamente desde el principio hasta
                    el final de la historia.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">Ordena los pasos de la historia haciendo clic en ellos:</p>

                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <Button
                      key={index}
                      variant={orderedSteps.includes(step) ? "default" : "outline"}
                      className="w-full text-left justify-start h-auto py-4"
                      onClick={() => toggleStep(step)}
                    >
                      {orderedSteps.includes(step) && (
                        <span className="mr-2 font-bold">{orderedSteps.indexOf(step) + 1}.</span>
                      )}
                      {step}
                    </Button>
                  ))}
                </div>

                <div className="p-4 bg-secondary/30 rounded-lg">
                  <p className="text-sm font-medium mb-2">Orden seleccionado:</p>
                  {orderedSteps.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Haz clic en los pasos para ordenarlos</p>
                  ) : (
                    <ol className="text-sm space-y-1">
                      {orderedSteps.map((step, index) => (
                        <li key={index}>
                          {index + 1}. {step}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                <Button onClick={checkPasitoAPasito} className="w-full">
                  Verificar Orden
                </Button>

                {hablaResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Excelente! Has completado Habla</span>
                  </div>
                )}

                {hablaResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>El orden no es correcto, intenta de nuevo</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  if (selectedActivity === "lectoescritura") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedActivity(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-center">Lecto Escritura - Nivel {currentLevel}</h1>

          {currentLevel === 1 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Ordenar el Texto</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowLectoHelp(!showLectoHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showLectoHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> La respuesta correcta es: "{sentences[currentSentenceIndex].correct}"
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Oración {currentSentenceIndex + 1} de {sentences.length}
                </p>

                <div>
                  <p className="text-sm font-medium mb-2">Palabras disponibles:</p>
                  <div className="flex flex-wrap gap-2 p-4 bg-secondary/30 rounded-lg min-h-[60px]">
                    {shuffledWords.map((word, index) => (
                      <Button key={index} variant="outline" onClick={() => addWordToPhrase(word)}>
                        {word}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tu oración:</p>
                  <div className="flex flex-wrap gap-2 p-4 bg-primary/10 rounded-lg min-h-[60px]">
                    {orderedPhrase.map((word, index) => (
                      <Button key={index} variant="default" onClick={() => removeWordFromPhrase(index)}>
                        {word}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button onClick={checkOrdenarTexto} className="w-full">
                  Verificar Oración
                </Button>

                {lectoResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      {currentSentenceIndex < sentences.length - 1
                        ? "¡Correcto! Siguiente oración..."
                        : "¡Excelente! Pasando al siguiente nivel..."}
                    </span>
                  </div>
                )}

                {lectoResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>El orden no es correcto, intenta de nuevo</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 2 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Ordenar Frases Desordenadas</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowLectoHelp(!showLectoHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showLectoHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> La respuesta correcta es: "{phrases[currentPhraseIndex].correct}"
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Frase {currentPhraseIndex + 1} de {phrases.length}
                </p>

                <div>
                  <p className="text-sm font-medium mb-2">Palabras disponibles:</p>
                  <div className="flex flex-wrap gap-2 p-4 bg-secondary/30 rounded-lg min-h-[60px]">
                    {shuffledPhraseWords.map((word, index) => (
                      <Button key={index} variant="outline" onClick={() => addWordToPhraseLevel2(word)}>
                        {word}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tu frase:</p>
                  <div className="flex flex-wrap gap-2 p-4 bg-primary/10 rounded-lg min-h-[60px]">
                    {orderedPhraseWords.map((word, index) => (
                      <Button key={index} variant="default" onClick={() => removeWordFromPhraseLevel2(index)}>
                        {word}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button onClick={checkOrdenarFrases} className="w-full">
                  Verificar Frase
                </Button>

                {lectoResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      {currentPhraseIndex < phrases.length - 1
                        ? "¡Correcto! Siguiente frase..."
                        : "¡Excelente! Pasando al siguiente nivel..."}
                    </span>
                  </div>
                )}

                {lectoResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>El orden no es correcto, intenta de nuevo</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 3 && (
            <Card className="p-8 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Completar el Texto</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowLectoHelp(!showLectoHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showLectoHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Usa las palabras de las categorías de arriba para completar los espacios en
                    blanco. Cada categoría tiene palabras específicas que encajan en el contexto.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-3">Categorías de palabras:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {clozeText.categories.map((category) => (
                      <div key={category} className="p-3 bg-secondary/30 rounded-lg">
                        <p className="text-xs font-bold mb-2 capitalize">{category}</p>
                        <div className="flex flex-wrap gap-1">
                          {clozeText.words[category as keyof typeof clozeText.words].map((word, index) => (
                            <span key={index} className="text-xs bg-primary/10 px-2 py-1 rounded">
                              {word}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {clozeText.story.map((paragraph, pIndex) => {
                    const parts = paragraph.split(/(_____)/g)
                    let blankIndex = 0
                    return (
                      <div key={pIndex} className="p-4 bg-secondary/10 rounded-lg">
                        <p className="text-sm leading-relaxed">
                          {parts.map((part, partIndex) => {
                            if (part === "_____") {
                              const currentBlankIndex = blankIndex++
                              const inputKey = `${pIndex}-${currentBlankIndex}`
                              return (
                                <input
                                  key={partIndex}
                                  type="text"
                                  value={clozeInputs[inputKey] || ""}
                                  onChange={(e) => setClozeInputs({ ...clozeInputs, [inputKey]: e.target.value })}
                                  className="inline-block w-24 px-2 py-1 mx-1 border-b-2 border-primary bg-transparent text-center"
                                  placeholder="..."
                                />
                              )
                            }
                            return <span key={partIndex}>{part}</span>
                          })}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <Button onClick={checkCompletarTexto} className="w-full">
                  Verificar Texto
                </Button>

                {lectoResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Excelente! Has completado Lecto Escritura</span>
                  </div>
                )}

                {lectoResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Completa al menos 15 espacios en blanco</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  if (selectedActivity === "conversacional") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <Button variant="ghost" className="mb-6" onClick={() => setSelectedActivity(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <h1 className="text-4xl font-bold mb-8 text-center">Conversacional - Nivel {currentLevel}</h1>

          {currentLevel === 1 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Dinámica de la Isla Desierta</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowConversacionalHelp(!showConversacionalHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showConversacionalHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Piensa en qué objetos serían más útiles para sobrevivir en una isla
                    desierta. Considera necesidades básicas como agua, refugio, señalización y protección.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Imagina que vas a una isla desierta. Selecciona 5 objetos que llevarías contigo:
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {islandObjects.map((obj) => (
                    <Button
                      key={obj}
                      variant={selectedIslandObjects.includes(obj) ? "default" : "outline"}
                      className="h-auto py-4"
                      onClick={() => toggleIslandObject(obj)}
                      disabled={!selectedIslandObjects.includes(obj) && selectedIslandObjects.length >= 5}
                    >
                      {obj}
                    </Button>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  Objetos seleccionados: {selectedIslandObjects.length} / 5
                </p>

                <Button onClick={checkIslaDesierta} className="w-full">
                  Confirmar Selección
                </Button>

                {conversacionalResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Excelente selección! Pasando al siguiente nivel...</span>
                  </div>
                )}

                {conversacionalResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Debes seleccionar exactamente 5 objetos</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 2 && (
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Redactar para Vender</h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowConversacionalHelp(!showConversacionalHelp)}
                >
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showConversacionalHelp && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold mb-2">Instrucción:</p>
                  <p className="text-sm mb-3">
                    Graba tu voz diciendo una frase persuasiva para vender un producto. El texto grabado aparecerá
                    automáticamente en el área de texto. Puedes editar el texto si es necesario. El bot puede repetir
                    opcionalmente.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold">Controles de Grabación:</label>
                  <div className="flex gap-2">
                    {isRecording ? (
                      <Button className="flex-1 gap-2" variant="destructive" onClick={stopRecording}>
                        <MicOff className="w-4 h-4" />
                        Detener Grabación
                      </Button>
                    ) : (
                      <Button className="flex-1 gap-2" onClick={startRecording}>
                        <Mic className="w-4 h-4" />
                        Iniciar Grabación
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Edita tu texto (opcional):</label>
                  <textarea
                    value={salesParagraph}
                    onChange={(e) => setSalesParagraph(e.target.value)}
                    placeholder="Tu texto de venta aparecerá aquí automáticamente después de grabar. Puedes editarlo si lo deseas..."
                    className="w-full px-4 py-3 border rounded-lg bg-background min-h-24"
                  />
                </div>

                <div className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg">
                  <input
                    type="checkbox"
                    id="botRepeat"
                    checked={enableBotRepeat}
                    onChange={(e) => setEnableBotRepeat(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="botRepeat" className="text-sm font-semibold cursor-pointer flex-1">
                    Deseo que el bot repita mi texto
                  </label>
                </div>

                {enableBotRepeat && salesParagraph && (
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                    onClick={() => playAudio(salesParagraph)}
                  >
                    <Volume2 className="w-4 h-4" />
                    Escuchar mi texto (Bot)
                  </Button>
                )}

                <Button
                  className="w-full"
                  onClick={() => {
                    if (salesParagraph.length > 10) {
                      setConversacionalResult("correct")
                      saveProgress(32)
                      setTimeout(() => {
                        setCurrentLevel(3)
                        setSalesParagraph("")
                        setConversacionalResult(null)
                        setEnableBotRepeat(false)
                      }, 2000)
                    } else {
                      setConversacionalResult("incorrect")
                    }
                  }}
                >
                  Continuar
                </Button>

                {conversacionalResult && (
                  <div
                    className={`p-4 rounded-lg flex items-center gap-3 ${
                      conversacionalResult === "correct" ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
                    }`}
                  >
                    {conversacionalResult === "correct" ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span>
                      {conversacionalResult === "correct"
                        ? "¡Excelente! Procede al siguiente nivel."
                        : "Por favor, escribe o graba un texto más largo."}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {currentLevel === 3 && (
            <Card className="p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">La Entrevista</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowConversacionalHelp(!showConversacionalHelp)}>
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>

              {showConversacionalHelp && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Ayuda:</strong> Imagina que estás entrevistando a un familiar sobre sus preferencias de
                    vacaciones. Escribe respuestas detalladas (al menos 10 caracteres cada una) para cada pregunta.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Entrevista a un familiar sobre sus preferencias de vacaciones. Responde las siguientes preguntas:
                </p>

                {interviewQuestions.map((question, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2">
                      {index + 1}. {question}
                    </label>
                    <textarea
                      value={interviewAnswers[index]}
                      onChange={(e) => {
                        const updated = [...interviewAnswers]
                        updated[index] = e.target.value
                        setInterviewAnswers(updated)
                      }}
                      className="w-full p-3 border rounded-lg min-h-[80px]"
                      placeholder="Escribe la respuesta..."
                    />
                  </div>
                ))}

                <Button onClick={checkEntrevista} className="w-full">
                  Completar Entrevista
                </Button>

                {conversacionalResult === "correct" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>¡Excelente! Has completado Conversacional</span>
                  </div>
                )}

                {conversacionalResult === "incorrect" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span>Debes responder las 5 preguntas con al menos 10 caracteres cada una</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  return null
}
