"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

interface SubscriptionSectionProps {
  userData: any
  onSaveData: (data: any) => void
}

const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "$29",
    period: "/mes",
    features: ["Acceso a cursos básicos", "Certificados digitales", "Soporte por email", "Comunidad online"],
  },
  {
    id: "pro",
    name: "Profesional",
    price: "$79",
    period: "/mes",
    popular: true,
    features: [
      "Acceso a todos los cursos",
      "Certificados premium",
      "Soporte prioritario 24/7",
      "Mentoría personalizada",
      "Proyectos prácticos",
      "Networking exclusivo",
    ],
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: "$199",
    period: "/mes",
    features: [
      "Todo lo de Profesional",
      "Cursos personalizados",
      "Consultoría dedicada",
      "API de integración",
      "Reportes avanzados",
      "Gestión de equipos",
    ],
  },
]

export function SubscriptionSection({ userData, onSaveData }: SubscriptionSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(userData?.subscription || null)

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId)
    onSaveData({
      ...userData,
      subscription: planId,
      subscriptionDate: new Date().toISOString(),
    })
  }

  return (
    <section id="subscripciones" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Subscripciones</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Elige el plan perfecto para alcanzar tus objetivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            const isPro = plan.popular

            return (
              <Card
                key={plan.id}
                className={`relative p-8 hover:shadow-xl transition-all ${
                  isPro ? "border-primary border-2 scale-105" : ""
                } ${isSelected ? "ring-2 ring-accent" : ""}`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full"
                  variant={isSelected ? "secondary" : isPro ? "default" : "outline"}
                >
                  {isSelected ? "Plan Actual" : "Seleccionar Plan"}
                </Button>
              </Card>
            )
          })}
        </div>

        {selectedPlan && (
          <div className="mt-12 text-center">
            <Card className="inline-block p-6 bg-accent/10 border-accent">
              <p className="text-lg">
                <span className="font-semibold">Plan activo:</span> {plans.find((p) => p.id === selectedPlan)?.name}
              </p>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
