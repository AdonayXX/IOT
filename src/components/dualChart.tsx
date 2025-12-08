import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useHistoryData } from "../hooks/useHistoryData"

export function SensorChart() {
  const { data, loading, error } = useHistoryData("esp32-001", 1)


  const chartData = data.map(d => ({
    time: new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperatura: d.tempC,
    humedad: d.soilPct
  })).reverse() 

  return (
    <div className="bg-[#262626] rounded-lg shadow-lg p-3 sm:p-6 h-full">
      <div className="mb-3 sm:mb-6">
        <h3 className="text-base sm:text-xl font-bold text-white">Temperatura & Humedad</h3>
      </div>
      <div className="h-[160px] sm:h-[calc(100%-70px)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#3a3a3a' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickLine={false}
              axisLine={{ stroke: '#3a3a3a' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f1f1f', 
                border: '1px solid #3a3a3a',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px'
              }}
              iconType="circle"
            />
            <Line
              dataKey="temperatura"
              type="monotone"
              stroke="#4ade80"
              strokeWidth={3}
              dot={false}
              name="Temperatura"
            />
            <Line
              dataKey="humedad"
              type="monotone"
              stroke="#ffffff"
              strokeWidth={3}
              dot={false}
              name="Humedad"
            />
          </LineChart>
        </ResponsiveContainer>
        {loading && <p className="text-xs text-gray-400 mt-2">Cargando...</p>}
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  )
}