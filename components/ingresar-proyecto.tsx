"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, FileText, Loader2 } from "lucide-react"
import type { ProyectoData } from "@/app/page"

interface IngresarProyectoProps {
  onProyectoValidado: (data: ProyectoData) => void
}

export function IngresarProyecto({ onProyectoValidado }: IngresarProyectoProps) {
  const [numeroProyecto, setNumeroProyecto] = useState("")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!numeroProyecto.trim()) {
      setError("Los datos ingresados no son válidos. Intenta nuevamente.")
      return
    }

    if (!/^\d+$/.test(numeroProyecto)) {
      setError("Los datos ingresados no son válidos. Intenta nuevamente.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simular validación del proyecto
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Escenarios específicos basados en el número ingresado
      if (numeroProyecto === "999") {
        throw new Error("PROYECTO_NO_ENCONTRADO")
      } else if (numeroProyecto === "555") {
        throw new Error("ESTADO_INCORRECTO")
      } else if (numeroProyecto === "777") {
        throw new Error("PROCESO_NO_DEFINITIVO")
      } else if (numeroProyecto === "444") {
        throw new Error("SIN_POSTULACIONES_CONFIRMADAS")
      }

      // Datos simulados de proyecto válido (cualquier otro número)
      const proyectoData: ProyectoData = {
        numeroProyecto,
        nombreProyecto: "Sistema de Gestión Empresarial",
        empresa: "TechCorp S.A.",
        estudiantesConfirmados: [
          {
            numeroPostulacion: "POST-001",
            nombreCompleto: "Ana García Rodríguez",
            dni: "12345678",
            correoInstitucional: "ana.garcia@universidad.edu",
            carrera: "Ingeniería en Sistemas",
          },
          {
            numeroPostulacion: "POST-002",
            nombreCompleto: "Carlos López Martínez",
            dni: "87654321",
            correoInstitucional: "carlos.lopez@universidad.edu",
            carrera: "Ingeniería Industrial",
          },
          {
            numeroPostulacion: "POST-003",
            nombreCompleto: "María Fernández Silva",
            dni: "11223344",
            correoInstitucional: "maria.fernandez@universidad.edu",
            carrera: "Ingeniería en Sistemas",
          },
        ],
      }

      onProyectoValidado(proyectoData)
    } catch (error: any) {
      let errorMessage = "Error inesperado. Intente nuevamente."

      switch (error.message) {
        case "PROYECTO_NO_ENCONTRADO":
          errorMessage = "No se ha podido encontrar el proyecto ingresado. Intente nuevamente"
          break
        case "ESTADO_INCORRECTO":
          errorMessage = 'El proyecto no está en estado "En evaluación".'
          break
        case "PROCESO_NO_DEFINITIVO":
          errorMessage = 'El proceso de selección no está en estado "Definitivo".'
          break
        case "SIN_POSTULACIONES_CONFIRMADAS":
          errorMessage = 'En el proyecto ingresado, hay postulaciones que no se encuentran en estado "Confirmado"'
          break
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Emitir Contrato</CardTitle>
          <CardDescription>Ingrese el número del proyecto</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="numeroProyecto">
                Número de Proyecto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="numeroProyecto"
                type="text"
                placeholder="Ej: 12345"
                value={numeroProyecto}
                onChange={(e) => setNumeroProyecto(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-100 text-red-800 mb-4 animate-in fade-in-0 duration-300">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validando proyecto...
                  </>
                ) : (
                  "Buscar Proyecto"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNumeroProyecto("")
                  setError("")
                }}
                disabled={loading}
                className="px-4"
              >
                Limpiar
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-blue-700 text-sm font-bold mb-3">Ejemplos para prueba:</p>
              <ul className="text-blue-600 text-xs space-y-2">
                <li>• Ingrese cualquier número válido (ej: 12345) para ver un proyecto válido</li>
                <li>
                  • Ingrese <strong>555</strong> para simular que el proyecto no está en estado "En evaluación"
                </li>
                <li>
                  • Ingrese <strong>999</strong> para simular que el proyecto no se encuentra
                </li>
                <li>
                  • Ingrese <strong>777</strong> para simular que el proceso de selección no está en estado "Definitivo"
                </li>
                <li>
                  • Ingrese <strong>444</strong> para simular que la postulación no está en estado "Confirmado"
                </li>
                <li>• Si ingresa letras o cualquier carácter especial para simular el error de datos inconsistentes</li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
