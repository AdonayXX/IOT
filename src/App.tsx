import './App.css'
import { SensorChart } from './components/dualChart'
import { LDRChart } from './components/ldrChart'
import { TempeChart } from './components/tempeChart'
import { HumedadChart } from './components/humedadChart'
import { Sprout } from 'lucide-react'
import React from 'react'
import { usePump } from './hooks/usePump'

function App() {
    const [date, setDate] = React.useState(new Date());
    React.useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);
    const parsearFecha = (fecha: Date) => {
        const opciones: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return fecha.toLocaleDateString('en-ES', opciones);
    }
    const { pumpOn, setPump, loading: pumpLoading, error: pumpError } = usePump("esp32-001")

return (
  <div className='bg-[#000] min-h-screen w-screen flex flex-col'>
     <div className='bg-[#262626] w-full flex items-center justify-between px-4 sm:px-8 py-3'>
          <div className='flex items-center gap-3'>
            <div className='bg-[#4ade80] p-2 rounded-md'>
              <Sprout className='w-5 h-5 text-white' />
            </div>
           
          </div>
          <span className='text-xs sm:text-sm text-gray-300'>{parsearFecha(date)}</span>
        </div>
        <div className='bg-[#262626] w-full flex items-center justify-between px-4 sm:px-8 py-3 border-t'>
          <div className='flex items-center gap-3'>
           
            <h1 className='text-lg sm:text-xl font-bold text-white'>Invernadero Esp32</h1>
          </div>
          
        </div>
    <div className="p-2 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mb-3 sm:mb-4">
        <div className="h-[220px] sm:h-[340px]">
          <LDRChart />
        </div>
        <div className="h-[220px] sm:h-[340px]">
          <TempeChart />
        </div>
        <div className="h-[220px] sm:h-[340px]">
          <HumedadChart />
        </div>
        <div className="h-[220px] sm:h-[340px] bg-[#262626] rounded-lg shadow-lg p-3 sm:p-6 flex flex-col">
          <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-6">Bomba de agua</h3>
          <div className="flex-1 flex items-center justify-center">
            <div
              className={`bg-[#4a4a4a] rounded-full w-20 h-10 sm:w-32 sm:h-16 flex items-center px-2 cursor-pointer transition-all hover:bg-[#555555] ${pumpOn ? 'justify-end' : 'justify-start'}`}
              onClick={() => setPump(pumpOn ? "apagar" : "encender")}
              aria-disabled={pumpLoading}
              style={{ opacity: pumpLoading ? 0.6 : 1 }}
            >
              <div className={`rounded-full w-8 h-8 sm:w-12 sm:h-12 shadow-lg transition-all ${pumpOn ? 'bg-[#4ade80]' : 'bg-white'}`}></div>
            </div>
          </div>
          <div className="text-center mt-2 sm:mt-4">
            <p className={`text-sm sm:text-lg font-semibold mb-1 sm:mb-2 ${pumpOn ? 'text-green-400' : 'text-gray-400'}`}>
              {pumpOn ? "ON" : "OFF"}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">Sugerencia: activa la bomba cuando la humedad del suelo sea menor a 35%</p>
            {pumpError && <p className="text-xs text-red-400 mt-1">{pumpError}</p>}
          </div>
        </div>
      </div>
      <div className="w-full h-[180px] sm:h-[400px]">
        <SensorChart />
      </div>
    </div>
  </div>
)
}
export default App