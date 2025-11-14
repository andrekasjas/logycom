import { Card } from "@/components/ui/card"
import { Users, Target, Lightbulb, Heart, Award, UserCheck, Scale, Sparkles } from 'lucide-react'

const teamMembers = [
  {
    description:
      "LOGyCOM nace del compromiso y la visión de las fonoaudiólogas Ángela Patricia Ayala Nieto, Ana María Collantes González, Isis Bayona Mojica, Andrea Stefanía Enríquez Oviedo, Jennifer Lizeth Mariño Archila y el ingeniero Richard Monrroy Sepúlveda, quienes dieron origen a este proyecto inclusivo orientado al aprendizaje funcional.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1%20card-leAOlko4IFEnhMV1nLuelqyYhA8rBH.jpeg",
  },
  {
    description:
      "El prototipo inicial fue desarrollado por los fonoaudiólogos Ángela Patricia Ayala Nieto, Ubaldo Andrés Hernández Orjuela, Kimberly Jhoana Valencia Carrillo, Juan José Ruiz Dita, Lisneidy Zhairith Barrera Hincapié y el ingeniero Richard Monrroy Sepúlveda encargados de la parte organizacional y estructural de la plataforma.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%20card-l029K2lCfqW6jsc7SOlcEm3HcogZGr.jpeg",
  },
  {
    description:
      "La consolidación de la página, sus dominios, actividades e inversión económica estuvo a cargo de las fonoaudiólogas Ángela Patricia Ayala Nieto, Luisa Fernanda García Rodríguez, Stefany Carolina Duarte Parra, Yuliana del Pilar Méndez Pimiento, Gislanny Yurladi Canencio Claros y Gloribeth Quijano Berbersí, quienes fortalecieron el enfoque inclusivo y funcional del proyecto.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20card-XMegOCc3Aymzc2duHJr9RdXbmyIjwO.jpg",
  },
]

const valores = [
  {
    title: "Respeto",
    icon: Heart,
    image: "/respect-icon-heart-hands-together.jpg",
  },
  {
    title: "Compromiso",
    icon: Award,
    image: "/commitment-icon-handshake-promise.jpg",
  },
  {
    title: "Autonomía",
    icon: UserCheck,
    image: "/autonomy-icon-independent-person.jpg",
  },
  {
    title: "Equidad",
    icon: Scale,
    image: "/equity-icon-balance-equality.jpg",
  },
  {
    title: "Excelencia",
    icon: Sparkles,
    image: "/excellence-icon-star-quality.jpg",
  },
]

export function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Sobre Nosotros</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            En LOGyCOM, somos un equipo de profesionales en fonoaudiología, comprometidos con la creación de soluciones
            digitales inclusivas que promuevan el desarrollo integral de las personas con discapacidad cognitiva leve.
            Nuestra labor se centra en fortalecer las habilidades comunicativas y el razonamiento lógico-matemático,
            fomentando la autonomía, la participación activa y la inclusión social y laboral de nuestros usuarios. En
            LOGyCOM, trabajamos cada día para que la comunicación y el conocimiento sean herramientas al servicio de la
            inclusión y la igualdad de oportunidades.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Misión</h3>
            <p className="text-muted-foreground leading-relaxed text-justify">
              LOGyCOM se dedica a ofrecer un servicio innovador y personalizado que potencie el desarrollo integral de
              la comunicación y procesos lógico matemáticos para usuarios con discapacidad cognitiva leve dirigido a
              mejorar su autonomía y calidad de vida.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visión</h3>
            <p className="text-muted-foreground leading-relaxed text-justify">
              LOGyCOM para el año 2030 se habrá consolidado como la mejor plataforma de referencia en comunicación y
              procesos lógico matemáticos para usuarios con discapacidad cognitiva leve.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nuestros Valores</h3>
            <p className="text-muted-foreground leading-relaxed text-justify">
              En LOGyCOM guiamos nuestro trabajo por principios que reflejan compromiso, innovación y respeto por la
              diversidad.
            </p>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Valores</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {valores.map((valor, index) => {
              const IconComponent = valor.icon
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold">{valor.title}</h4>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={`Team ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
