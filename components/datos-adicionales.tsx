"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Building2, Loader2, TriangleAlert } from "lucide-react"
import type { DatosEmpresa } from "@/app/page"

interface DatosAdicionalesProps {
  cuitEmpresa: string
  onEmpresaRegistrada: (datos: DatosEmpresa) => void
  onVolver: () => void
}

export function DatosAdicionales({ cuitEmpresa, onEmpresaRegistrada, onVolver }: DatosAdicionalesProps) {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    direccionEmpresa: "",
    codigoPostalEmpresa: "",
    nroTelefonoEmpresa: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validarDatos = (): string | null => {
    if (!formData.nombreEmpresa.trim()) {
      return "El nombre de la empresa es obligatorio"
    }
    if (!formData.direccionEmpresa.trim()) {
      return "La dirección es obligatoria"
    }
    if (!formData.codigoPostalEmpresa.trim()) {
      return "El código postal es obligatorio"
    }
    if (!/^\d{4}$/.test(formData.codigoPostalEmpresa)) {
      return "El código postal debe tener 4 dígitos"
    }
    if (!formData.nroTelefonoEmpresa.trim()) {
      return "El número de teléfono es obligatorio"
    }
    if (!/^\d{8,15}$/.test(formData.nroTelefonoEmpresa.replace(/[-\s]/g, ""))) {
      return "El teléfono debe tener entre 8 y 15 dígitos"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validarDatos()
    if (validationError) {
      setError("Los datos ingresados no son válidos. Intenta nuevamente.")
      // Clear all form fields when validation fails
      setFormData({
        nombreEmpresa: "",
        direccionEmpresa: "",
        codigoPostalEmpresa: "",
        nroTelefonoEmpresa: "",
      })
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simular registro de empresa
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const empresaCompleta: DatosEmpresa = {
        cuitEmpresa,
        ...formData,
      }

      onEmpresaRegistrada(empresaCompleta)
    } catch (error) {
      setError("Error al registrar la empresa. Intente nuevamente.")
      // Clear all form fields when there's an error
      setFormData({
        nombreEmpresa: "",
        direccionEmpresa: "",
        codigoPostalEmpresa: "",
        nroTelefonoEmpresa: "",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCuit = (cuit: string) => {
    return `${cuit.slice(0, 2)}-${cuit.slice(2, 10)}-${cuit.slice(10)}`
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={onVolver}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Datos Adicionales de la Empresa</CardTitle>
                <CardDescription>CUIT: {formatCuit(cuitEmpresa)}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombreEmpresa">
                  Nombre de la Empresa <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nombreEmpresa"
                  type="text"
                  placeholder="Ej: TechCorp S.A."
                  value={formData.nombreEmpresa}
                  onChange={(e) => handleInputChange("nombreEmpresa", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="direccionEmpresa">
                  Dirección <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="direccionEmpresa"
                  type="text"
                  placeholder="Ej: Av. Corrientes"
                  value={formData.direccionEmpresa}
                  onChange={(e) => handleInputChange("direccionEmpresa", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="codigoPostalEmpresa">
                    Código Postal <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="codigoPostalEmpresa"
                    type="text"
                    placeholder="Ej: 1043"
                    value={formData.codigoPostalEmpresa}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                      handleInputChange("codigoPostalEmpresa", value)
                    }}
                    disabled={loading}
                    maxLength={4}
                  />
                </div>

                <div>
                  <Label htmlFor="nroTelefonoEmpresa">
                    Número de Teléfono <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nroTelefonoEmpresa"
                    type="text"
                    placeholder="Ej: 11-1234-5678"
                    value={formData.nroTelefonoEmpresa}
                    onChange={(e) => handleInputChange("nroTelefonoEmpresa", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-100 text-red-800 mb-4 animate-in fade-in-0 duration-300">
                <TriangleAlert className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onVolver} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando empresa...
                  </>
                ) : (
                  "Registrar Empresa"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
