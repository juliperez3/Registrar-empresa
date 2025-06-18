"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Building2, MapPin, Phone, Hash, RotateCcw } from "lucide-react"
import type { DatosEmpresa } from "@/app/page"

interface EmpresaRegistradaProps {
  datosEmpresa: DatosEmpresa
  onNuevoRegistro: () => void
}

export function EmpresaRegistrada({ datosEmpresa, onNuevoRegistro }: EmpresaRegistradaProps) {
  const formatCuit = (cuit: string) => {
    return `${cuit.slice(0, 2)}-${cuit.slice(2, 10)}-${cuit.slice(10)}`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header de Éxito */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-900">¡Empresa registrada correctamente!</h1>
              <p className="text-green-700">La empresa ha sido registrada exitosamente en el sistema</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de la Empresa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Información de la Empresa
          </CardTitle>
          <CardDescription>Datos registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label className="text-sm font-medium text-muted-foreground">Nombre de la Empresa</Label>
              <p className="font-medium text-lg">{datosEmpresa.nombreEmpresa}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">CUIT</Label>
              <p className="font-medium flex items-center gap-2">
                <Hash className="w-4 h-4" />
                {formatCuit(datosEmpresa.cuitEmpresa)}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Teléfono</Label>
              <p className="font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {datosEmpresa.nroTelefonoEmpresa}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Dirección</Label>
              <p className="font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {datosEmpresa.direccionEmpresa}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">Código Postal</Label>
              <p className="font-medium">{datosEmpresa.codigoPostalEmpresa}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <Button onClick={onNuevoRegistro}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Registrar Nueva Empresa
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
