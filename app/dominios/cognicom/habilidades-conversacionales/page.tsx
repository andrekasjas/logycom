"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, HelpCircle, ArrowLeft } from "lucide-react"

export default function HabilidadesConversacionalesPage() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])

  const [selectedIslandObjects, setSelectedIslandObjects] = useState<string[]>([])
  const [showConversacionalHelp, setShowConversacionalHelp] = useState(false)
  const [conversacionalResult, setConversacionalResult] = useState<"correct" | "incorrect" | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("conversacionalCompletedLevels")
    if (saved) {
      setCompletedLevels(JSON.parse(saved))
    }
  }, [])

  const saveProgress = (level: number) => {
    const updated = [...completedLevels, level]
    setCompletedLevels(updated)
    localStorage.setItem("conversacionalCompletedLevels", JSON.stringify(updated))
  }

  // Nivel 1: Isla Desierta
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
      saveProgress(1)
      setTimeout(() => {
        window.history.back()
      }, 2000)
    } else {
      setConversacionalResult("incorrect")
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

        <h1 className="text-4xl font-bold mb-8 text-center">Habilidades Conversacionales - Nivel {currentLevel}</h1>

        {currentLevel === 1 && (
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Isla Desierta</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowConversacionalHelp(!showConversacionalHelp)}>
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>

            {showConversacionalHelp && (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ayuda:</strong> Imagina que estás en una isla desierta. Selecciona los 5 objetos más
                  importantes que te llevarías para sobrevivir. Piensa bien tu elección y prepárate para explicar por
                  qué elegiste esos objetos.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <p className="text-muted-foreground">
                Vas a estar en una isla desierta. Selecciona 5 objetos que te llevarías y prepárate para explicar por
                qué los elegiste.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {islandObjects.map((obj) => (
                  <Button
                    key={obj}
                    variant={selectedIslandObjects.includes(obj) ? "default" : "outline"}
                    onClick={() => toggleIslandObject(obj)}
                    className="h-auto py-4 text-left justify-start"
                    disabled={!selectedIslandObjects.includes(obj) && selectedIslandObjects.length >= 5}
                  >
                    {obj}
                  </Button>
                ))}
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Objetos seleccionados ({selectedIslandObjects.length}/5):</p>
                {selectedIslandObjects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Selecciona 5 objetos</p>
                ) : (
                  <ul className="text-sm space-y-1">
                    {selectedIslandObjects.map((obj, index) => (
                      <li key={index}>
                        {index + 1}. {obj}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-medium mb-2">Ahora explica:</p>
                <p className="text-sm text-muted-foreground">
                  ¿Por qué elegiste estos objetos? ¿Cuál es el más importante y por qué?
                </p>
              </div>

              <Button onClick={checkIslaDesierta} className="w-full">
                Completar Actividad
              </Button>

              {conversacionalResult === "correct" && (
                <div className="flex items-center gap-2 text-green-600 justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>¡Excelente! Has completado Habilidades Conversacionales</span>
                </div>
              )}

              {conversacionalResult === "incorrect" && (
                <div className="flex items-center gap-2 text-red-600 justify-center">
                  <XCircle className="w-5 h-5" />
                  <span>Debes seleccionar exactamente 5 objetos</span>
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
