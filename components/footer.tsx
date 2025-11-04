export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cognicom
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Innovación y excelencia digital para transformar el futuro
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
              <li>contacto@cognicom.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Tech City, TC 12345</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Cognicom. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
