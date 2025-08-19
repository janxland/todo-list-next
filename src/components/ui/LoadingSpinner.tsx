export const LoadingSpinner = () => {
  return (
    <div className="instagram-card rounded-2xl p-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-800 text-lg font-medium mb-2">加载中</p>
          <p className="text-gray-500 text-sm loading-dots">请稍候</p>
        </div>
        
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-slow" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-slow" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-slow" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
