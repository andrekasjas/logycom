"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, Lightbulb } from 'lucide-react'
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

export default function IdeasNegocioPage() {
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [businessIdea, setBusinessIdea] = useState("")
  const [materials, setMaterials] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const verifyActivity = () => {
    if (businessIdea.length > 20 && materials.length > 10 && price.length > 0) {
      setResult("correct")
      const progress = safeGetItem("cognicom-progress", {})
      progress.ideasNegocio = progress.ideasNegocio || {}
      progress.ideasNegocio.desarrollo = true
      safeSetItem("cognicom-progress", progress)

      setTimeout(() => {
        window.history.back()
      }, 2000)
    } else {
      setResult("incorrect")
    }
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Ideas de Negocio</h1>
            <p className="text-base md:text-lg text-muted-foreground">Desarrollo de Idea de Negocio</p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Desarrollo de Idea de Negocio</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowHelp(!showHelp)}>
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div>

            {showHelp && (
              <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm">
                  <strong>Ayuda:</strong> Describe tu idea de emprendimiento de manera clara. Incluye los materiales que
                  necesitarías y establece un precio justo para tu producto o servicio.
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Escribe una idea con la que te gustaría emprender:
                </label>
                <textarea
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  className="w-full p-3 border rounded-lg min-h-[150px]"
                  placeholder="Ejemplo: Me gustaría abrir una pequeña panadería que venda pan artesanal fresco cada mañana..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  ¿Qué materiales necesitarías para tu negocio?
                </label>
                <textarea
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full p-3 border rounded-lg min-h-[120px]"
                  placeholder="Ejemplo: Horno industrial, ingredientes (harina, levadura, sal), bandejas, empaques, mostrador..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  ¿Cuál sería el precio de tu producto o servicio?
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Ejemplo: $5,000 por pan artesanal, $15,000 por torta..."
                />
              </div>

              <Button className="w-full" size="lg" onClick={verifyActivity}>
                Completar
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
                        <span className="font-semibold">¡Excelente idea de negocio! Completado.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="font-semibold">Completa todos los campos con información detallada</span>
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
