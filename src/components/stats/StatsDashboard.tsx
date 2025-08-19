import { CheckCircle, Target, TrendingUp, BarChart3 } from 'lucide-react'
import { useStats } from '@/hooks/useStats'
import { StatsCard } from './StatsCard'
import { CompletionRateChart } from './CompletionRateChart'
import { PriorityDistributionChart } from './PriorityDistributionChart'
import { WeeklyTrendChart } from './WeeklyTrendChart'
import { MonthlyTrendChart } from './MonthlyTrendChart'

export const StatsDashboard = () => {
  const { stats, loading, error } = useStats()

  if (loading) {
    return (
      <div className="instagram-card rounded-2xl p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
        <p className="text-gray-600 mt-2">加载统计数据...</p>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="instagram-card rounded-2xl p-6 text-center">
        <p className="text-red-500">加载统计数据失败</p>
        <p className="text-gray-500 text-sm mt-2">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* 统计卡片 */}
      <div className="instagram-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">统计概览</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            icon={Target}
            title="总任务"
            value={stats.total}
            color="bg-blue-500"
          />
          <StatsCard
            icon={CheckCircle}
            title="已完成"
            value={stats.completed}
            color="bg-green-500"
          />
          <StatsCard
            icon={TrendingUp}
            title="完成率"
            value={`${stats.completionRate}%`}
            color="bg-purple-500"
          />
          <StatsCard
            icon={BarChart3}
            title="待完成"
            value={stats.pending}
            color="bg-orange-500"
          />
        </div>
      </div>

      {/* 完成率图表 */}
      <div className="instagram-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">任务完成率</h3>
        <CompletionRateChart stats={stats} />
      </div>

      {/* 优先级分布图表 */}
      <div className="instagram-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">优先级分布</h3>
        <PriorityDistributionChart stats={stats} />
      </div>

      {/* 本周趋势图表 */}
      <div className="instagram-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">本周任务趋势</h3>
        <WeeklyTrendChart stats={stats} />
      </div>

      {/* 本月趋势图表 */}
      <div className="instagram-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">本月任务趋势</h3>
        <MonthlyTrendChart stats={stats} />
      </div>
    </div>
  )
}
