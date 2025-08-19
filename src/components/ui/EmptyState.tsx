import { ClipboardList, Sparkles, Plus } from 'lucide-react'

export const EmptyState = () => {
  return (
    <div className="instagram-card rounded-2xl p-8 text-center animate-fade-in-up">
      <div className="relative mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          <ClipboardList className="text-purple-500" size={40} />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles className="text-yellow-400" size={24} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        开始您的第一个任务
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        点击上方的输入框，添加您的第一个待办事项，开始高效管理您的任务吧！
      </p>
      
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse-slow"></div>
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="mt-6 flex items-center justify-center text-gray-400">
        <Plus size={16} className="mr-2" />
        <span className="text-sm">点击上方添加任务</span>
      </div>
    </div>
  )
}
