import { useState } from "react"
import api from "../api/api"

export function usePump(deviceId = "esp32-001") {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pumpOn, setPumpOn] = useState(false)

  const setPump = async (accion: "apagar" | "encender") => {
    setLoading(true)
    setError(null)
    try {
      // Invertir la acción: si en el front es "encender", mandar "apagar" y viceversa
      const accionInvertida = accion === "encender" ? "apagar" : "encender"
      await api.post(`/pump/${deviceId}/${accionInvertida}`)
      setPumpOn(accion === "encender")
    } catch {
      setError("Error al controlar la bomba")
    } finally {
      setLoading(false)
    }
  }

  return { pumpOn, setPump, loading, error }
}