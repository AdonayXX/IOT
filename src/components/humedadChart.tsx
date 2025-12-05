import { Droplets } from "lucide-react"

const sensorData = {
  humedad: 62,
  ultimaActualizacion: "Hace 10 min"
}

export function HumedadChart() {
  return (
    <div className="flex flex-col bg-[#262626] rounded-lg shadow-lg p-6 h-full">
      <div className="pb-6">
        <h3 className="text-xl font-bold text-white">Humedad</h3>
      </div>
      
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-400 mb-3">Último Valor:</p>
          <div className="flex items-baseline justify-center">
            <span className="text-7xl font-bold text-[#4ade80]">{sensorData.humedad}</span>
            <span className="text-4xl text-[#4ade80] ml-2">%</span>
          </div>
        </div>
        
        <Droplets className="w-10 h-8 text-gray-600 mb-6" />
        
        <p className="text-sm text-gray-400">{sensorData.ultimaActualizacion}</p>
      </div>
      
      <div className="pt-4 mt-2 border-t border-gray-700">
        <p className="text-xs text-gray-500">Fuente: FC-28</p>
      </div>
    </div>
  )
}