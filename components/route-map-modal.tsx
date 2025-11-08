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
import { Map, Download } from "lucide-react"
import Image from "next/image"

interface RouteMapModalProps {
  title: string
  imageSrc: string
  imageAlt: string
}

export function RouteMapModal({ title, imageSrc, imageAlt }: RouteMapModalProps) {
  const [open, setOpen] = useState(false)

  const handleDownload = async () => {
    console.log("[v0] Starting download for:", imageSrc)
    try {
      const response = await fetch(imageSrc)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = imageSrc.split("/").pop() || "ruta-atencion.png"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      console.log("[v0] Download completed successfully")
    } catch (error) {
      console.error("[v0] Error downloading image:", error)
      alert("No se pudo descargar la imagen. Por favor intenta de nuevo.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
          <Map className="w-5 h-5" />
          Ver Ruta de Atención
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Guía paso a paso del proceso de aprendizaje</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={1600}
            height={900}
            className="w-full h-auto rounded-lg"
          />
          <Button onClick={handleDownload} className="w-full gap-2">
            <Download className="w-5 h-5" />
            Descargar Ruta de Atención
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
