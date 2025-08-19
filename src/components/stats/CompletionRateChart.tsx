import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { TodoStats } from '@/types/todo'

interface CompletionRateChartProps {
  stats: TodoStats
}

export const CompletionRateChart = ({ stats }: CompletionRateChartProps) => {
  const data = [
    { name: '已完成', value: stats.completed, color: '#10B981' },
    { name: '待完成', value: stats.pending, color: '#F59E0B' }
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="text-gray-800 font-medium">{payload[0].name}</p>
          <p className="text-gray-600">{payload[0].value} 个任务</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="text-center mt-4">
        <div className="text-3xl font-bold text-purple-600">{stats.completionRate}%</div>
        <div className="text-gray-600">总体完成率</div>
      </div>
    </div>
  )
}
