"use client"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background">
      <div className="absolute inset-0 bg-[url('/abstract-digital-network.png')] opacity-5 bg-cover bg-center" />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in text-balance">
            Logycom - Innovación y Excelencia Digital
          </h1>
          {/* </CHANGE> */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up leading-relaxed">
            Transformamos ideas en soluciones tecnológicas que impulsan el futuro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <button
              onClick={() => document.getElementById("dominios")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105"
            >
              Explorar Dominios
            </button>
            <button
              onClick={() => document.getElementById("sobre-nosotros")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-all hover:scale-105"
            >
              Conocer Más
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
