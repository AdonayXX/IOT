import { useEffect, useState } from "react"
import api from "../api/api"

export interface LatestIotData {
  tempC: number
  soilPct: number
  lightRaw: number
  createdAt: string
}

export function useLatestIotData(deviceId = "esp32-001") {
  const [data, setData] = useState<LatestIotData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/latest/${deviceId}`)
      .then(res => setData(res.data))
      .catch(() => setError("Error al obtener datos"))
      .finally(() => setLoading(false))
  }, [deviceId])

  return { data, loading, error }
}