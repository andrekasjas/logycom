import { Card } from "@/components/ui/card"
import { Users, Target, Lightbulb } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. María González",
    role: "Directora de Innovación",
    description: "Experta en inteligencia artificial y transformación digital con más de 15 años de experiencia.",
    image: "/professional-woman-portrait.png",
  },
  {
    name: "Ing. Carlos Rodríguez",
    role: "Director Técnico",
    description: "Especialista en arquitectura de software y soluciones empresariales escalables.",
    image: "/professional-man-portrait.png",
  },
]

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Sobre Nosotros</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Somos un equipo multidisciplinario dedicado a la innovación tecnológica y educativa. Nuestra misión es crear
            soluciones que transformen la manera en que las personas aprenden, trabajan y se conectan con la tecnología
            del futuro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nuestra Misión</h3>
            <p className="text-muted-foreground leading-relaxed">
              Democratizar el acceso a la tecnología y educación de calidad
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nuestra Visión</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ser líderes en innovación tecnológica y educativa a nivel global
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nuestros Valores</h3>
            <p className="text-muted-foreground leading-relaxed">
              Excelencia, innovación, colaboración y compromiso social
            </p>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
