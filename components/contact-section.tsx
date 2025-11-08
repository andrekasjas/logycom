"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Instagram, Music } from "lucide-react"
import { safeGetItem, safeSetItem } from "@/lib/storage-utils"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const contacts = safeGetItem<any[]>("contacts", [])
    contacts.push({
      ...formData,
      date: new Date().toISOString(),
    })
    safeSetItem("contacts", contacts)

    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Contáctenos</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Estamos aquí para responder tus preguntas y ayudarte en tu camino
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">logycomsas@gmail.com</p>
              </div>
            </Card>

            <a
              href="https://www.instagram.com/logycoms.a.s?igsh=dTFnaXZ5cm1mbHBz"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Instagram</h3>
                  <p className="text-muted-foreground">@logycoms.a.s</p>
                </div>
              </Card>
            </a>

            <a
              href="https://www.tiktok.com/@logycoms.a.s?_r=1&_t=ZS-9195kXU5azYI"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="p-6 flex items-start gap-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">TikTok</h3>
                  <p className="text-muted-foreground">@logycoms.a.s</p>
                </div>
              </Card>
            </a>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitted}>
                {submitted ? (
                  "Mensaje Enviado ✓"
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
