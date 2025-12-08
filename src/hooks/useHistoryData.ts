import { useEffect, useState } from "react"
import api from "../api/api"

export interface HistoryIotData {
  tempC: number
  soilPct: number
  createdAt: string
}

export function useHistoryData(deviceId = "esp32-001", hours = 24) {
  const [data, setData] = useState<HistoryIotData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetchData = () => {
      setLoading(true)
      api.get(`/history/${deviceId}?hours=${hours}`)
        .then(res => isMounted && setData(res.data))
        .catch(() => isMounted && setError("Error al obtener historial"))
        .finally(() => isMounted && setLoading(false))
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [deviceId, hours])

  return { data, loading, error }
}