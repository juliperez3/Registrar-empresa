"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Building2, Users, FileText, Mail, GraduationCap, CheckCircle, Loader2 } from "lucide-react"
import type { ProyectoData } from "@/app/page"

interface ConfirmarEmisionProps {
  proyectoData: ProyectoData
  onContratosEmitidos: (numeroContratos: string[]) => void
  onVolver: () => void
}

export function ConfirmarEmision({ proyectoData, onContratosEmitidos, onVolver }: ConfirmarEmisionProps) {
  const [loading, setLoading] = useState(false)

  const handleEmitirContratos = async () => {
    setLoading(true)

    try {
      // Simular emisión de contratos
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generar números de contrato simulados
      const numeroContratos = proyectoData.estudiantesConfirmados.map(
        (_, index) => `CONT-${proyectoData.numeroProyecto}-${String(index + 1).padStart(3, "0")}`,
      )

      onContratosEmitidos(numeroContratos)
    } catch (error) {
      console.error("Error al emitir contratos:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onVolver}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Confirmar Emisión de Contratos</h1>
          <p className="text-muted-foreground">Revise la información antes de proceder con la emisión</p>
        </div>
      </div>

      {/* Información del Proyecto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Información del Proyecto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Número de Proyecto</Label>
              <p className="font-medium">{proyectoData.numeroProyecto}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Nombre del Proyecto</Label>
              <p className="font-medium">{proyectoData.nombreProyecto}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Empresa</Label>
              <p className="font-medium">{proyectoData.empresa}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                En evaluación
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estudiantes Confirmados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Estudiantes Confirmados
            <Badge variant="outline">{proyectoData.estudiantesConfirmados.length}</Badge>
          </CardTitle>
          <CardDescription>
            Los siguientes estudiantes tienen postulaciones confirmadas y recibirán contratos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proyectoData.estudiantesConfirmados.map((estudiante, index) => (
              <div key={estudiante.numeroPostulacion}>
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{estudiante.nombreCompleto}</h3>
                      <Badge variant="outline" className="text-xs">
                        {estudiante.numeroPostulacion}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        DNI: {estudiante.dni}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {estudiante.correoInstitucional}
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        {estudiante.carrera}
                      </div>
                    </div>
                  </div>
                </div>
                {index < proyectoData.estudiantesConfirmados.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmación */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Se emitirán <strong>{proyectoData.estudiantesConfirmados.length} contratos</strong> para los estudiantes
          confirmados del proyecto <strong>{proyectoData.numeroProyecto}</strong>. Esta acción no se puede deshacer.
        </AlertDescription>
      </Alert>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onVolver} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleEmitirContratos} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Emitiendo contratos...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Emitir Contratos
            </>
          )}
        </Button>
      </div>
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
