import { useState } from 'react'
import { Upload, Download } from 'lucide-react'
import { useImportExport } from '@/hooks/useImportExport'

export const ImportExport = () => {
  const { importing, exporting, exportTodos, importTodos } = useImportExport()
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      try {
        await importTodos(files[0])
        alert('导入成功！')
      } catch (error) {
        alert(`导入失败: ${error}`)
      }
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      try {
        await importTodos(files[0])
        alert('导入成功！')
      } catch (error) {
        alert(`导入失败: ${error}`)
      }
    }
  }

  const handleExport = async () => {
    try {
      await exportTodos()
      alert('导出成功！')
    } catch (error) {
      alert(`导出失败: ${error}`)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="instagram-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">数据管理</h2>
        
        <div className="space-y-6">
          {/* 导入区域 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">导入数据</h3>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto text-gray-400 mb-4" size={32} />
              <p className="text-gray-600 mb-4">拖拽 CSV 文件到此处或点击选择文件</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="instagram-button cursor-pointer inline-block"
              >
                {importing ? '导入中...' : '选择文件'}
              </label>
            </div>
          </div>

          {/* 导出区域 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">导出数据</h3>
            <div className="border border-gray-200 rounded-xl p-6 text-center">
              <Download className="mx-auto text-gray-400 mb-4" size={32} />
              <p className="text-gray-600 mb-4">将所有任务导出为 CSV 文件</p>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="instagram-button flex items-center gap-2 mx-auto"
              >
                <Download size={16} />
                {exporting ? '导出中...' : '导出 CSV'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
