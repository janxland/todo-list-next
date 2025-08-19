import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TodoStats, Priority } from '@/types/todo'

interface PriorityDistributionChartProps {
  stats: TodoStats
}

export const PriorityDistributionChart = ({ stats }: PriorityDistributionChartProps) => {
  const priorityLabels = {
    [Priority.LOW]: '低',
    [Priority.MEDIUM]: '中',
    [Priority.HIGH]: '高',
    [Priority.URGENT]: '紧急'
  }

  const colors = {
    [Priority.LOW]: '#10B981',
    [Priority.MEDIUM]: '#F59E0B',
    [Priority.HIGH]: '#EF4444',
    [Priority.URGENT]: '#8B5CF6'
  }

  const data = Object.entries(stats.byPriority).map(([priority, count]) => ({
    priority: priorityLabels[priority as Priority],
    count,
    color: colors[priority as Priority]
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="text-gray-800 font-medium">{label}</p>
          <p className="text-gray-600">{payload[0].value} 个任务</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="priority" 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            fill="#667eea"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
