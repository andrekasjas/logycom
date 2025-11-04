"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { DomainsSection } from "@/components/domains-section"
import { ContactSection } from "@/components/contact-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

export default function Home() {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const savedData = safeGetItem("userData", null)
    if (savedData) {
      setUserData(savedData)
    }
  }, [])

  const saveUserData = (data: any) => {
    setUserData(data)
    safeSetItem("userData", data)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <DomainsSection />
      <ContactSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
