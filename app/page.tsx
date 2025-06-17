"use client"

import { useState } from "react"
import { IngresarCuit } from "@/components/ingresar-cuit"
import { DatosAdicionales } from "@/components/datos-adicionales"
import { EmpresaRegistrada } from "@/components/empresa-registrada"

export type DatosEmpresa = {
  cuitEmpresa: string
  nombreEmpresa: string
  direccionEmpresa: string
  codigoPostalEmpresa: string
  nroTelefonoEmpresa: string
}

export default function RegistrarEmpresaPage() {
  const [paso, setPaso] = useState<"cuit" | "datos" | "exito">("cuit")
  const [cuitValidado, setCuitValidado] = useState("")
  const [empresaRegistrada, setEmpresaRegistrada] = useState<DatosEmpresa | null>(null)

  const handleCuitValidado = (cuit: string) => {
    setCuitValidado(cuit)
    setPaso("datos")
  }

  const handleEmpresaRegistrada = (datos: DatosEmpresa) => {
    setEmpresaRegistrada(datos)
    setPaso("exito")
  }

  const handleNuevoRegistro = () => {
    setPaso("cuit")
    setCuitValidado("")
    setEmpresaRegistrada(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Sistema de Prácticas Profesionales</h1>

        {paso === "cuit" && <IngresarCuit onCuitValidado={handleCuitValidado} />}

        {paso === "datos" && (
          <DatosAdicionales
            cuitEmpresa={cuitValidado}
            onEmpresaRegistrada={handleEmpresaRegistrada}
            onVolver={() => setPaso("cuit")}
          />
        )}

        {paso === "exito" && empresaRegistrada && (
          <EmpresaRegistrada datosEmpresa={empresaRegistrada} onNuevoRegistro={handleNuevoRegistro} />
        )}
      </div>
    </div>
  )
}
