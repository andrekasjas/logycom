"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from "next/link"

export function DomainsSection() {
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
          <Link href="/dominios/cognicom" className="flex">
            <Card className="relative overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50 opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="absolute inset-0 opacity-10">
                <img
                  src="/cognitive-communication-brain-networks-neural-path.jpg"
                  alt="COGNICOM"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative p-8 md:p-12 flex-1 flex flex-col">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="/LOGO_COGNICOM-removebg-preview.png"
                    alt="COGNICOM"
                    className="w-14 h-14 object-contain"
                  />
                </div>

                <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  COGNICOM
                  <Sparkles className="w-6 h-6 text-accent" />
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                  COGNICOM ofrece servicios a través de módulos de formación para incrementar las competencias y
                  habilidades comunicativas dirigidas hacia la inclusión y/o emprendimientos para la autonomía de
                  personas en condición de discapacidad.
                </p>

                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all mb-6">
                  Explorar COGNICOM
                  <ArrowRight className="w-5 h-5" />
                </div>

                <div className="pt-6 border-t border-border">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Habilidades Comunicativas</li>
                    <li>• Competencias Comunicativas</li>
                    <li>• Empleo</li>
                    <li>• Ideas de Negocio</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Link>

          {/* $MAR+L🪙GY Domain */}
          <Link href="/dominios/smartlogy" className="flex">
            <Card className="relative overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-primary/50 opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="absolute inset-0 opacity-10">
                <img
                  src="/mathematics-money-coins-learning-education-numbers.jpg"
                  alt="$MAR+L🪙GY"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative p-8 md:p-12 flex-1 flex flex-col">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src="/smartlogy-logo.png" alt="Smartlogy" className="w-14 h-14 object-contain" />
                </div>

                <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  {"$MAR+L🪙GY"}
                  <Sparkles className="w-6 h-6 text-primary" />
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                  "$MAR+L🪙GY" trata de una herramienta digital educativa diseñada especialmente para personas con
                  discapacidad cognitiva leve, implementando procesos lógico-matemáticos, manejo del dinero y educación
                  financiera de manera práctica, accesible y adaptada a sus capacidades.
                </p>

                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all mb-6">
                  {"Explorar $MAR+L🪙GY"}
                  <ArrowRight className="w-5 h-5" />
                </div>

                <div className="pt-6 border-t border-border">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Evaluación</li>
                    <li>• Procesos lógicos-matemáticos</li>
                    <li>• Manejo del dinero</li>
                    <li>• Educación financiera</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
