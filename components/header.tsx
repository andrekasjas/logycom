"use client"

import { useState } from "react"
import { Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const isCognicom = pathname?.includes("/cognicom")
  const isSmartlogy = pathname?.includes("/smartlogy")

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {isCognicom ? (
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-29%20at%209.59.37%20AM-cpDtn3mTMvUZF55FK2nisRp9yTh6vA.jpeg"
                alt="COGNICOM"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : isSmartlogy ? (
              <Image src="/smartlogy-logo.png" alt="Smartlogy" width={40} height={40} className="rounded-full" />
            ) : (
              <Image src="/logo-logycom.png" alt="LOGyCOM" width={40} height={40} className="rounded-full" />
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isCognicom ? "COGNICOM" : isSmartlogy ? "$MAR+L🪙GY" : "LOGyCOM"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!isHomePage && (
              <Link href="/" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Home className="w-4 h-4" />
                INICIO
              </Link>
            )}
            {isHomePage && (
              <>
                <button
                  onClick={() => scrollToSection("sobre-nosotros")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  SOBRE NOSOTROS
                </button>
                <button
                  onClick={() => scrollToSection("dominios")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  DOMINIOS
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  CONTÁCTENOS
                </button>
                <button
                  onClick={() => scrollToSection("testimonios")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  TESTIMONIOS
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {!isHomePage && (
              <Link
                href="/"
                className="text-left text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                INICIO
              </Link>
            )}
            {isHomePage && (
              <>
                <button
                  onClick={() => scrollToSection("sobre-nosotros")}
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  SOBRE NOSOTROS
                </button>
                <button
                  onClick={() => scrollToSection("dominios")}
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  DOMINIOS
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  CONTÁCTENOS
                </button>
                <button
                  onClick={() => scrollToSection("testimonios")}
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  TESTIMONIOS
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
