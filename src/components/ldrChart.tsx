import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { useLatestIotData } from "../hooks/useLatestIotData"
import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

const MAX_LUX = 1000 // Ajusta este valor según el máximo real de tu sensor

export function LDRChart() {
  const { data, loading, error } = useLatestIotData()
  const nivelLuz = data?.lightRaw ?? 0
  const porcentajeLuz = Math.max(0, Math.min((nivelLuz / MAX_LUX) * 100, 100)) // 0-100%

  const springPorcentaje = useSpring(0, { stiffness: 100, damping: 30 })
  const springLux = useSpring(0, { stiffness: 100, damping: 30 })
  const displayPorcentaje = useTransform(springPorcentaje, (current) => current.toFixed(1))
  const displayLux = useTransform(springLux, (current) => Math.round(current))

  useEffect(() => {
    springPorcentaje.set(porcentajeLuz)
    springLux.set(nivelLuz)
  }, [porcentajeLuz, nivelLuz, springPorcentaje, springLux])

  // Calcula el ángulo final basado en el porcentaje
  const startAngle = 90
  const endAngle = startAngle + (360 * porcentajeLuz / 100)

  return (
    <div className="flex flex-col bg-[#262626] rounded-lg shadow-lg p-3 sm:p-6 h-full">
      <div className="pb-2">
        <h3 className="text-base sm:text-xl font-bold text-white">LDR (Fotorresistencia)</h3>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <RadialBarChart
          data={[{ porcentajeLuz }]}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={70}
          outerRadius={85}
          width={180}
          height={180}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            polarRadius={[85, 70]}
          />
          <RadialBar
            dataKey="porcentajeLuz"
            background={{ fill: "#3a3a3a" }}
            cornerRadius={10}
            fill="#4ade80"
            isAnimationActive={true}
            animationDuration={800}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            tickLine={false}
            axisLine={false}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 8}
                        className="fill-white text-3xl font-bold"
                      >
                        {loading ? "--" : displayPorcentaje + "%"}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 18}
                        className="fill-gray-400 text-xs"
                      >
                        {loading ? "--" : displayLux + " Lux"}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-xs sm:text-sm text-gray-400">
          {loading ? "Cargando..." : (data?.createdAt ? new Date(data.createdAt).toLocaleString() : "")}
        </p>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
      <div className="pt-2 border-t border-gray-700">
        <p className="text-xs text-gray-500">Fuente: LDR analógica</p>
      </div>
    </div>
  )
}