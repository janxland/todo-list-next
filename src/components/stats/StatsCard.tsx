import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  color: string
}

export const StatsCard = ({ icon: Icon, title, value, color }: StatsCardProps) => (
  <div className="instagram-card rounded-2xl p-6 text-center hover-lift">
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-2">{value}</div>
    <div className="text-gray-600 text-sm">{title}</div>
  </div>
)
