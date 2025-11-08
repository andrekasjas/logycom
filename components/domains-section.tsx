"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Brain, Coins, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function DomainsSection() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null)

  return (
    <section id="dominios" className="py-24 bg-gradient-to-br from-secondary via-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Nuestros Dominios</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explora nuestras áreas de especialización y descubre cómo podemos ayudarte
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* COGNICOM Domain */}
          <Link href="/dominios/cognicom">
            <Card
              className="relative overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredDomain("cognicom")}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50 opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="absolute inset-0 opacity-10">
                <img
                  src="/cognitive-communication-brain-networks-neural-path.jpg"
                  alt="COGNICOM"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative p-8 md:p-12">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-10 h-10 text-primary" />
                </div>

                <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  COGNICOM
                  <Sparkles className="w-6 h-6 text-accent" />
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  COGNICOM ofrece servicios a través de módulos de formación para incrementar las competencias y
                  habilidades comunicativas dirigidas hacia la inclusión y/o emprendimientos para la autonomía de
                  personas en condición de discapacidad.
                </p>

                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                  Explorar COGNICOM
                  <ArrowRight className="w-5 h-5" />
                </div>

                {hoveredDomain === "cognicom" && (
                  <div className="mt-6 pt-6 border-t border-border animate-fade-in-up">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• MÓDULO DE HABILIDADES COMUNICATIVAS</li>
                      <li>• MÓDULO DE COMPETENCIAS COMUNICATIVAS</li>
                      <li>• MÓDULO DE EMPLEO</li>
                      <li>• MÓDULO DE IDEAS DE NEGOCIO</li>
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </Link>

          {/* $MAR+L🪙GY Domain */}
          <Link href="/dominios/smartlogy">
            <Card
              className="relative overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredDomain("smartlogy")}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-primary/50 opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="absolute inset-0 opacity-10">
                <img
                  src="/mathematics-money-coins-learning-education-numbers.jpg"
                  alt="$MAR+L🪙GY"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative p-8 md:p-12">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Coins className="w-10 h-10 text-accent" />
                </div>

                <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  {"$MAR+L🪙GY"}
                  <Sparkles className="w-6 h-6 text-primary" />
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "$MAR+L🪙GY" trata de una herramienta digital educativa diseñada especialmente para personas con
                  discapacidad cognitiva leve, implementando procesos lógico-matemáticos, manejo del dinero y educación
                  financiera de manera práctica, accesible y adaptada a sus capacidades.
                </p>

                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                  {"Explorar $MAR+L🪙GY"}
                  <ArrowRight className="w-5 h-5" />
                </div>

                {hoveredDomain === "smartlogy" && (
                  <div className="mt-6 pt-6 border-t border-border animate-fade-in-up">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• procesos lógico-matemáticos</li>
                      <li>• manejo del dinero</li>
                      <li>• educación financiera</li>
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
