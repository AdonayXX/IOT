import { Thermometer } from "lucide-react"
import { useLatestIotData } from "../hooks/useLatestIotData"
import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

export function TempeChart() {
  const { data, loading, error } = useLatestIotData()
  const temperatura = data?.tempC ?? 0
  
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (current) => current.toFixed(1))

  useEffect(() => {
    spring.set(temperatura)
  }, [temperatura, spring])

  return (
    <div className="flex flex-col bg-[#262626] rounded-lg shadow-lg p-3 sm:p-6 h-full">
      <div className="pb-3 sm:pb-6">
        <h3 className="text-base sm:text-xl font-bold text-white">Temperatura</h3>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="text-center mb-3 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-3">Último Valor:</p>
          <div className="flex items-baseline justify-center">
            <motion.span className="text-5xl sm:text-7xl font-bold text-[#4ade80]">
              {loading ? "--" : display}
            </motion.span>
            <span className="text-2xl sm:text-4xl text-[#4ade80] ml-2">°C</span>
          </div>
        </div>
        <Thermometer className="w-8 h-6 sm:w-10 sm:h-8 text-gray-600 mb-3 sm:mb-6" />
        <p className="text-xs sm:text-sm text-gray-400">
          {loading ? "Cargando..." : (data?.createdAt ? new Date(data.createdAt).toLocaleString() : "")}
        </p>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
      <div className="pt-2 sm:pt-4 mt-2 border-t border-gray-700">
        <p className="text-xs text-gray-500">Fuente: TMP36GZ</p>
      </div>
    </div>
  )
}