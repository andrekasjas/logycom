"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Estudiante de COGNICOM",
    image: "/professional-woman-portrait.png",
    text: "Logycom ha transformado mi manera de aprender. Los cursos son excelentes y el contenido es muy accesible.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Emprendedor",
    image: "/professional-man-portrait.png",
    text: "Gracias a los módulos de Ideas de Negocio, pude desarrollar mi proyecto y llevarlo al siguiente nivel.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Profesional en Empleo",
    image: "/professional-woman-teacher.png",
    text: "El entrenamiento en competencias laborales me ayudó a conseguir el trabajo de mis sueños. ¡Altamente recomendado!",
    rating: 5,
  },
  {
    id: 4,
    name: "Luis Fernández",
    role: "Estudiante de Comunicación",
    image: "/professional-man-portrait.png",
    text: "Los talleres de comunicación son increíbles. He mejorado mis habilidades profesionales significativamente.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonios" className="py-24 bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Testimonios</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Lo que dicen nuestros estudiantes sobre Logycom
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full -ml-12 -mb-12" />

            <div className="relative">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={currentTestimonial.image || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-1">{currentTestimonial.name}</h3>
                <p className="text-muted-foreground mb-4">{currentTestimonial.role}</p>

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg text-center leading-relaxed mb-8">"{currentTestimonial.text}"</blockquote>

              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Ver testimonio ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
