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
    let isMounted = true
    const fetchData = () => {
      setLoading(true)
      api.get(`/latest/${deviceId}`)
        .then(res => isMounted && setData(res.data))
        .catch(() => isMounted && setError("Error al obtener datos"))
        .finally(() => isMounted && setLoading(false))
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [deviceId])

  return { data, loading, error }
}