import './app.css'
import { SensorChart } from './components/dualChart'
import { LDRChart } from './components/ldrChart'
import { TempeChart } from './components/tempeChart'
import { HumedadChart } from './components/humedadChart'
import { Sprout } from 'lucide-react'
import React from 'react'

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
  return (
    <div className='bg-[#000] min-h-screen w-screen flex flex-col'>
      <div className='bg-[#262626] w-full flex items-center justify-between px-8 py-3'>
        <div className='flex items-center gap-3'>
          <div className='bg-[#4ade80] p-2 rounded-md'>
            <Sprout className='w-5 h-5 text-white' />
          </div>
         
        </div>
        <span className='text-sm text-gray-300'>{parsearFecha(date)}</span>
      </div>
      <div className='bg-[#262626]  w-full flex items-center justify-between px-8 py-3 border-t'>
        <div className='flex items-center gap-3'>
         
          <h1 className='text-xl font-bold text-white'>Invernadero Esp32</h1>
        </div>
        
      </div>
      
      
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 w-full mb-4">
          <div className="h-[340px]">
            <LDRChart />
          </div>
          <div className="h-[340px]">
            <TempeChart />
          </div>
          <div className="h-[340px]">
            <HumedadChart />
          </div>
          <div className="h-[340px] bg-[#262626] rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">Bomba de agua</h3>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-[#4a4a4a] rounded-full w-32 h-16 flex items-center px-2 cursor-pointer transition-all hover:bg-[#555555]">
                <div className="bg-white rounded-full w-12 h-12 shadow-lg transition-all"></div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-400 text-lg font-semibold mb-2">OFF</p>
              <p className="text-gray-500 text-xs leading-relaxed">Sugerencia: activa la bomba cuando la humedad del suelo sea menor a 35%</p>
            </div>
          </div>
        </div>
        
        <div className="w-full h-[400px]">
          <SensorChart />
        </div>
      </div>
    </div>
  )
}

export default App