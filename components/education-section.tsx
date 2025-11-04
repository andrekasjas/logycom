"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, Award, CheckCircle2 } from "lucide-react"

interface EducationSectionProps {
  userData: any
  onSaveData: (data: any) => void
}

const courses = [
  {
    id: "cognicom-1",
    title: "Detección de Emociones en Audio",
    description: "Aprende a detectar y analizar emociones a través del audio y expresiones faciales",
    module: "COGNICOM",
  },
  {
    id: "cognicom-2",
    title: "Comunicación Efectiva",
    description: "Desarrolla habilidades de comunicación para mejorar tus interacciones",
    module: "COGNICOM",
  },
  {
    id: "empleo-1",
    title: "Entrenamiento en Competencias Laborales",
    description: "Desarrolla las habilidades necesarias para el mundo laboral",
    module: "EMPLEO",
  },
  {
    id: "empleo-2",
    title: "Taller Comunicación",
    description: "Mejora tu comunicación en el entorno profesional",
    module: "EMPLEO",
  },
  {
    id: "negocio-1",
    title: "Desarrollo de Idea de Negocio",
    description: "Aprende a crear y desarrollar tu propia idea de negocio",
    module: "IDEAS DE NEGOCIO",
  },
  {
    id: "negocio-2",
    title: "Comunicación para Ventas",
    description: "Domina las técnicas de comunicación para impulsar tus ventas",
    module: "IDEAS DE NEGOCIO",
  },
]

export function EducationSection({ userData, onSaveData }: EducationSectionProps) {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(userData?.enrolledCourses || [])

  const handleEnroll = (courseId: string) => {
    const newEnrolledCourses = enrolledCourses.includes(courseId)
      ? enrolledCourses.filter((id) => id !== courseId)
      : [...enrolledCourses, courseId]

    setEnrolledCourses(newEnrolledCourses)
    onSaveData({
      ...userData,
      enrolledCourses: newEnrolledCourses,
    })
  }

  return (
    <section id="educacion" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Educación</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">50+</h3>
            <p className="text-muted-foreground">Cursos Disponibles</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-2">10,000+</h3>
            <p className="text-muted-foreground">Estudiantes Activos</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">95%</h3>
            <p className="text-muted-foreground">Tasa de Satisfacción</p>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* COGNICOM Module */}
          <div>
            <h3 className="text-3xl font-bold mb-6">COGNICOM</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {courses
                .filter((course) => course.module === "COGNICOM")
                .map((course) => {
                  const isEnrolled = enrolledCourses.includes(course.id)

                  return (
                    <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                      <h4 className="text-xl font-semibold mb-3">{course.title}</h4>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

                      <Button
                        onClick={() => handleEnroll(course.id)}
                        className="w-full"
                        variant={isEnrolled ? "secondary" : "default"}
                      >
                        {isEnrolled ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Continuar
                          </>
                        ) : (
                          "Comenzar"
                        )}
                      </Button>
                    </Card>
                  )
                })}
            </div>
          </div>

          {/* EMPLEO Module */}
          <div>
            <h3 className="text-3xl font-bold mb-6">EMPLEO</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {courses
                .filter((course) => course.module === "EMPLEO")
                .map((course) => {
                  const isEnrolled = enrolledCourses.includes(course.id)

                  return (
                    <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                      <h4 className="text-xl font-semibold mb-3">{course.title}</h4>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

                      <Button
                        onClick={() => handleEnroll(course.id)}
                        className="w-full"
                        variant={isEnrolled ? "secondary" : "default"}
                      >
                        {isEnrolled ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Continuar
                          </>
                        ) : (
                          "Comenzar"
                        )}
                      </Button>
                    </Card>
                  )
                })}
            </div>
          </div>

          {/* IDEAS DE NEGOCIO Module */}
          <div>
            <h3 className="text-3xl font-bold mb-6">IDEAS DE NEGOCIO</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {courses
                .filter((course) => course.module === "IDEAS DE NEGOCIO")
                .map((course) => {
                  const isEnrolled = enrolledCourses.includes(course.id)

                  return (
                    <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                      <h4 className="text-xl font-semibold mb-3">{course.title}</h4>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>

                      <Button
                        onClick={() => handleEnroll(course.id)}
                        className="w-full"
                        variant={isEnrolled ? "secondary" : "default"}
                      >
                        {isEnrolled ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Continuar
                          </>
                        ) : (
                          "Comenzar"
                        )}
                      </Button>
                    </Card>
                  )
                })}
            </div>
          </div>
        </div>
        {/* </CHANGE> */}
      </div>
    </section>
  )
}
