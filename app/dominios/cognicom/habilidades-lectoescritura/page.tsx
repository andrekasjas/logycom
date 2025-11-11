"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, HelpCircle, ArrowLeft } from "lucide-react"

export default function HabilidadesLectoEscrituraPage() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])

  const [orderedPhrase, setOrderedPhrase] = useState<string[]>([])
  const [shuffledWords, setShuffledWords] = useState<string[]>([])
  const [showLectoHelp, setShowLectoHelp] = useState(false)
  const [lectoResult, setLectoResult] = useState<"correct" | "incorrect" | null>(null)

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

  const [shuffledPhraseWords, setShuffledPhraseWords] = useState<string[]>([])
  const [orderedPhraseWords, setOrderedPhraseWords] = useState<string[]>([])

  const [clozeInputs, setClozeInputs] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("lectoescrituraCompletedLevels")
    if (saved) {
      setCompletedLevels(JSON.parse(saved))
    }
  }, [])

  const saveProgress = (level: number) => {
    const updated = [...completedLevels, level]
    setCompletedLevels(updated)
    localStorage.setItem("lectoescrituraCompletedLevels", JSON.stringify(updated))
  }

  // Nivel 1: Ordenar Texto
  const sentences = [
    { scrambled: ["mamá", "Mi", "sopa", "come"], correct: "Mi mamá come sopa" },
    { scrambled: ["perro", "El", "es", "negro", "color"], correct: "El perro es color negro" },
    { scrambled: ["El", "es", "azul", "vaso"], correct: "El vaso es azul" },
    { scrambled: ["La", "está", "flor", "en", "maceta", "la"], correct: "La flor está en la maceta" },
  ]

  useEffect(() => {
    if (currentLevel === 1) {
      const words = [...sentences[currentSentenceIndex].scrambled]
      setShuffledWords(words.sort(() => Math.random() - 0.5))
      setOrderedPhrase([])
    }
  }, [currentLevel, currentSentenceIndex])

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
        saveProgress(1)
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

  // Nivel 2: Ordenar Frases
  const phrases = [
    { scrambled: ["gato", "El", "duerme", "sofá", "en", "el"], correct: "El gato duerme en el sofá" },
    { scrambled: ["niños", "Los", "juegan", "parque", "en", "el"], correct: "Los niños juegan en el parque" },
    { scrambled: ["libro", "El", "está", "mesa", "sobre", "la"], correct: "El libro está sobre la mesa" },
  ]

  useEffect(() => {
    if (currentLevel === 2) {
      const words = [...phrases[currentPhraseIndex].scrambled]
      setShuffledPhraseWords(words.sort(() => Math.random() - 0.5))
      setOrderedPhraseWords([])
    }
  }, [currentLevel, currentPhraseIndex])

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
        saveProgress(2)
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

  // Nivel 3: Completar Texto
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

  const checkCompletarTexto = () => {
    const filledCount = Object.keys(clozeInputs).filter((key) => clozeInputs[key].trim().length > 0).length
    if (filledCount >= 15) {
      setLectoResult("correct")
      saveProgress(3)
      setTimeout(() => {
        window.history.back()
      }, 2000)
    } else {
      setLectoResult("incorrect")
    }
  }

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

        <h1 className="text-4xl font-bold mb-8 text-center">Habilidades Lecto Escritura - Nivel {currentLevel}</h1>

        {currentLevel === 1 && (
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Ordenar Texto ({currentSentenceIndex + 1}/{sentences.length})
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowLectoHelp(!showLectoHelp)}>
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>

            {showLectoHelp && (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ayuda:</strong> Haz clic en las palabras en el orden correcto para formar una oración con
                  sentido.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-2">Palabras disponibles:</p>
                <div className="flex flex-wrap gap-2 p-4 bg-secondary/30 rounded-lg min-h-[60px]">
                  {shuffledWords.map((word, index) => (
                    <Button
                      key={`${word}-${index}`}
                      variant="outline"
                      onClick={() => addWordToPhrase(word)}
                      className="h-10"
                    >
                      {word}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Tu oración:</p>
                <div className="flex flex-wrap gap-2 p-4 bg-primary/10 rounded-lg min-h-[60px]">
                  {orderedPhrase.map((word, index) => (
                    <Button key={index} onClick={() => removeWordFromPhrase(index)} className="h-10">
                      {word}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={checkOrdenarTexto} className="w-full">
                Verificar Respuesta
              </Button>

              {lectoResult === "correct" && (
                <div className="flex items-center gap-2 text-green-600 justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {currentSentenceIndex < sentences.length - 1
                      ? "¡Correcto! Siguiente oración..."
                      : "¡Nivel completado!"}
                  </span>
                </div>
              )}

              {lectoResult === "incorrect" && (
                <div className="flex items-center gap-2 text-red-600 justify-center">
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
              <h2 className="text-2xl font-bold">
                Ordenar Frases ({currentPhraseIndex + 1}/{phrases.length})
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowLectoHelp(!showLectoHelp)}>
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>

            {showLectoHelp && (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ayuda:</strong> Ordena las palabras para formar una frase completa y coherente.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-2">Palabras disponibles:</p>
                <div className="flex flex-wrap gap-2 p-4 bg-secondary/30 rounded-lg min-h-[60px]">
                  {shuffledPhraseWords.map((word, index) => (
                    <Button
                      key={`${word}-${index}`}
                      variant="outline"
                      onClick={() => addWordToPhraseLevel2(word)}
                      className="h-10"
                    >
                      {word}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Tu frase:</p>
                <div className="flex flex-wrap gap-2 p-4 bg-primary/10 rounded-lg min-h-[60px]">
                  {orderedPhraseWords.map((word, index) => (
                    <Button key={index} onClick={() => removeWordFromPhraseLevel2(index)} className="h-10">
                      {word}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={checkOrdenarFrases} className="w-full">
                Verificar Respuesta
              </Button>

              {lectoResult === "correct" && (
                <div className="flex items-center gap-2 text-green-600 justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {currentPhraseIndex < phrases.length - 1 ? "¡Correcto! Siguiente frase..." : "¡Nivel completado!"}
                  </span>
                </div>
              )}

              {lectoResult === "incorrect" && (
                <div className="flex items-center gap-2 text-red-600 justify-center">
                  <XCircle className="w-5 h-5" />
                  <span>Intenta de nuevo</span>
                </div>
              )}
            </div>
          </Card>
        )}

        {currentLevel === 3 && (
          <Card className="p-8 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Completar Texto</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowLectoHelp(!showLectoHelp)}>
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>

            {showLectoHelp && (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ayuda:</strong> Completa los espacios en blanco con palabras apropiadas según la categoría
                  indicada (personas, lugares, verbos, adjetivos).
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-sm font-medium mb-2">Banco de palabras:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {clozeText.categories.map((category) => (
                    <div key={category}>
                      <p className="text-xs font-bold mb-1 capitalize">{category}:</p>
                      <p className="text-xs">{clozeText.words[category as keyof typeof clozeText.words].join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {clozeText.story.map((paragraph, pIndex) => {
                  const parts = paragraph.split("_____")
                  return (
                    <div key={pIndex} className="text-base leading-relaxed">
                      {parts.map((part, index) => (
                        <span key={index}>
                          {part}
                          {index < parts.length - 1 && (
                            <input
                              type="text"
                              value={clozeInputs[`${pIndex}-${index}`] || ""}
                              onChange={(e) =>
                                setClozeInputs({ ...clozeInputs, [`${pIndex}-${index}`]: e.target.value })
                              }
                              className="inline-block w-24 px-2 py-1 border-b-2 border-primary mx-1 text-center"
                              placeholder="..."
                            />
                          )}
                        </span>
                      ))}
                    </div>
                  )
                })}
              </div>

              <Button onClick={checkCompletarTexto} className="w-full">
                Verificar Respuesta
              </Button>

              {lectoResult === "correct" && (
                <div className="flex items-center gap-2 text-green-600 justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Excelente! Has completado Habilidades Lecto Escritura</span>
                </div>
              )}

              {lectoResult === "incorrect" && (
                <div className="flex items-center gap-2 text-red-600 justify-center">
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
