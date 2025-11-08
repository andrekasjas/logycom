import { Instagram, Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LOGyCOM
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformamos ideas en soluciones tecnológicas que impulsan la inclusión social y laboral de personas con
              discapacidad
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#sobre-nosotros" className="hover:text-primary transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#dominios" className="hover:text-primary transition-colors">
                  Dominios
                </a>
              </li>
              <li>
                <a href="#educacion" className="hover:text-primary transition-colors">
                  Educación
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>logycomsas@gmail.com</li>
              <li>Bucaramanga, Colombia</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/logycoms.a.s?igsh=dTFnaXZ5cm1mbHBz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@logycoms.a.s?_r=1&_t=ZS-9195kXU5azYI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Music className="w-4 h-4" />
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 LOGyCOM. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
