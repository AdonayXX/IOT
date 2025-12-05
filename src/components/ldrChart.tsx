import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

const chartData = [
  { sensor: "ldr", nivelLuz: 650, fill: "#4ade80" },
]

export function LDRChart() {
  const nivelLuz = chartData[0].nivelLuz
  const porcentajeLuz = (nivelLuz / 1000) * 100 // Asumiendo max 1000 lux

  return (
    <div className="flex flex-col bg-[#262626] rounded-lg shadow-lg p-3 sm:p-6 h-full">
      <div className="pb-2">
        <h3 className="text-base sm:text-xl font-bold text-white">LDR (Fotorresistencia)</h3>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={250}
          innerRadius={100}
          outerRadius={75}
          width={180} 
          height={180}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-[#3a3a3a] last:fill-[#1f1f1f]"
            polarRadius={[85, 65]}
          />
          <RadialBar 
            dataKey="nivelLuz" 
            background 
            cornerRadius={8}
            fill="#4ade80"
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                        {porcentajeLuz.toFixed(1)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 18}
                        className="fill-gray-400 text-xs"
                      >
                        {nivelLuz} Lux
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </div>
      
      <div className="pt-2 border-t border-gray-700">
        <p className="text-xs text-gray-500">Fuente: LDR analógica</p>
      </div>
    </div>
  )
}