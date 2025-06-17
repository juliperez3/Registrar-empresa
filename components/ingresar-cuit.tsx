"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Building2, AlertCircle } from "lucide-react"

interface IngresarCuitProps {
  onCuitValidado: (cuit: string) => void
}

export function IngresarCuit({ onCuitValidado }: IngresarCuitProps) {
  const [cuitEmpresa, setCuitEmpresa] = useState("")
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

  const validarCuit = (cuit: string): boolean => {
    // Validación básica de CUIT (11 dígitos)
    const cuitLimpio = cuit.replace(/[-\s]/g, "")
    return /^\d{11}$/.test(cuitLimpio)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cuitEmpresa.trim()) {
      setError("Los datos ingresados no son válidos. Intenta nuevamente.")
      return
    }

    if (!validarCuit(cuitEmpresa)) {
      setError("Los datos ingresados no son válidos. Intenta nuevamente.")
      // Limpiar el campo automáticamente cuando hay error de datos no válidos
      setCuitEmpresa("")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simular verificación del CUIT
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const cuitLimpio = cuitEmpresa.replace(/[-\s]/g, "")

      // Simular empresa ya registrada
      if (cuitLimpio === "11111111111") {
        throw new Error("EMPRESA_EXISTENTE")
      }

      onCuitValidado(cuitLimpio)
    } catch (error: any) {
      let errorMessage = "Error inesperado. Intente nuevamente."

      switch (error.message) {
        case "EMPRESA_EXISTENTE":
          errorMessage = "La empresa ya se encuentra registrada en el sistema"
          break
      }

      setError(errorMessage)
      // Limpiar el campo automáticamente cuando hay error de empresa ya registrada
      setCuitEmpresa("")
    } finally {
      setLoading(false)
    }
  }

  const formatCuit = (value: string) => {
    // Remover caracteres no numéricos
    const numbers = value.replace(/\D/g, "")

    // Limitar a 11 dígitos
    const limited = numbers.slice(0, 11)

    // Formatear como XX-XXXXXXXX-X
    if (limited.length >= 3 && limited.length <= 10) {
      return `${limited.slice(0, 2)}-${limited.slice(2)}`
    } else if (limited.length === 11) {
      return `${limited.slice(0, 2)}-${limited.slice(2, 10)}-${limited.slice(10)}`
    }

    return limited
  }

  const handleCuitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Si contiene solo números, formatear automáticamente
    if (/^\d*$/.test(value.replace(/[-]/g, ""))) {
      const formatted = formatCuit(value)
      setCuitEmpresa(formatted)
    } else {
      // Si contiene letras u otros caracteres, permitir cualquier entrada
      setCuitEmpresa(value)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Registrar Empresa</CardTitle>
          <CardDescription>Ingrese el CUIT de la empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cuitEmpresa">
                CUIT de la Empresa <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cuitEmpresa"
                type="text"
                placeholder="Ej: 20-12345678-9"
                value={cuitEmpresa}
                onChange={handleCuitChange}
                disabled={loading}
                maxLength={13}
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-100 text-red-800 mb-4 animate-in fade-in-0 duration-300">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando CUIT...
                </>
              ) : (
                "Continuar"
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-blue-700 text-sm font-bold mb-3">Ejemplos para prueba:</p>
              <ul className="text-blue-600 text-xs space-y-2">
                <li>• Ingrese cualquier CUIT válido para continuar.</li>
                <li>• Ingrese texto o números incompletos para simular datos no válidos.</li>
                <li>• Ingrese "11-11111111-1" para simular empresa ya registrada.</li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
