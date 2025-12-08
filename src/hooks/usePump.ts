import { useState } from "react"
import api from "../api/api"

export function usePump(deviceId = "esp32-001") {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pumpOn, setPumpOn] = useState(false)

  const setPump = async (accion: "encender" | "apagar") => {
    setLoading(true)
    setError(null)
    try {
      await api.post(`/pump/${deviceId}/${accion}`)
      setPumpOn(accion === "encender")
    } catch {
      setError("Error al controlar la bomba")
    } finally {
      setLoading(false)
    }
  }

  return { pumpOn, setPump, loading, error }
}