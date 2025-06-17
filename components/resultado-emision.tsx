"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, FileText, Download, Mail, RotateCcw, Calendar } from "lucide-react"

interface ResultadoEmisionProps {
  contratosEmitidos: string[]
  onNuevaEmision: () => void
}

export function ResultadoEmision({ contratosEmitidos, onNuevaEmision }: ResultadoEmisionProps) {
  const fechaActual = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleDescargarContrato = (numeroContrato: string) => {
    // Simular descarga de contrato
    console.log(`Descargando contrato: ${numeroContrato}`)
  }

  const handleEnviarPorEmail = (numeroContrato: string) => {
    // Simular envío por email
    console.log(`Enviando por email contrato: ${numeroContrato}`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header de Éxito */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-900">¡Contratos Emitidos Exitosamente!</h1>
              <p className="text-green-700">Se han emitido {contratosEmitidos.length} contratos correctamente</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de la Emisión */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Detalles de la Emisión
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Fecha de Emisión</Label>
              <p className="font-medium">{fechaActual}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Contratos Emitidos</Label>
              <p className="font-medium">{contratosEmitidos.length}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Emitidos
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Fecha de Inicio</Label>
              <p className="font-medium">{fechaActual}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contratos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contratos Generados
          </CardTitle>
          <CardDescription>Puede descargar o enviar por email cada contrato individualmente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contratosEmitidos.map((numeroContrato, index) => (
              <div key={numeroContrato}>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{numeroContrato}</p>
                      <p className="text-sm text-muted-foreground">Contrato de Prácticas Profesionales</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEnviarPorEmail(numeroContrato)}>
                      <Mail className="w-4 h-4 mr-1" />
                      Enviar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDescargarContrato(numeroContrato)}>
                      <Download className="w-4 h-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </div>
                {index < contratosEmitidos.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acciones Adicionales */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={onNuevaEmision}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Emitir Nuevos Contratos
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Descargar Todos los Contratos
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Todos por Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm font-medium ${className || ""}`} {...props}>
      {children}
    </label>
  )
}
