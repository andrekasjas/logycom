"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Map } from "lucide-react"
import Image from "next/image"

interface RouteMapModalProps {
  title: string
  imageSrc: string
  imageAlt: string
}

export function RouteMapModal({ title, imageSrc, imageAlt }: RouteMapModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
          <Map className="w-5 h-5" />
          Ver Ruta de Atención
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Guía paso a paso del proceso de aprendizaje</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={1400}
            height={700}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
