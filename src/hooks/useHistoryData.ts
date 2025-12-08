import { useEffect, useState } from "react"
import api from "../api/api"

export interface HistoryIotData {
  tempC: number
  soilPct: number
  createdAt: string
}

export function useHistoryData(deviceId = "esp32-001", hours = 1) {
  const [data, setData] = useState<HistoryIotData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/history/${deviceId}?hours=${hours}`)
      .then(res => setData(res.data))
      .catch(() => setError("Error al obtener historial"))
      .finally(() => setLoading(false))
  }, [deviceId, hours])

  return { data, loading, error }
}