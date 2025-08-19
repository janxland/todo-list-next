'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Download, Upload, FileText, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DataImportExport() {
  const [importing, setImporting] = useState(false)
  const [exporting, setExporting] = useState(false)

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    if (!file.name.endsWith('.csv')) {
      toast.error('请选择CSV文件')
      return
    }

    setImporting(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/todos/import', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(`导入成功: ${result.success} 条记录，失败: ${result.failed} 条`)
        if (result.errors.length > 0) {
          console.error('Import errors:', result.errors)
        }
        // 刷新页面以显示新数据
        window.location.reload()
      } else {
        toast.error(result.error || '导入失败')
      }
    } catch (error) {
      toast.error('导入失败')
      console.error('Import error:', error)
    } finally {
      setImporting(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  })

  const handleExport = async () => {
    setExporting(true)
    try {
      const response = await fetch('/api/todos/export')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `todos-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('导出成功')
      } else {
        toast.error('导出失败')
      }
    } catch (error) {
      toast.error('导出失败')
      console.error('Export error:', error)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        数据导入导出
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 导入区域 */}
        <div>
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            导入CSV文件
          </h4>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            {isDragActive ? (
              <p className="text-blue-600 dark:text-blue-400">将文件拖放到这里...</p>
            ) : (
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  拖放CSV文件到这里，或点击选择文件
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  支持格式：Title,Description,Status,Priority,Category
                </p>
              </div>
            )}
          </div>
          {importing && (
            <div className="mt-3 flex items-center text-blue-600 dark:text-blue-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              正在导入...
            </div>
          )}
        </div>

        {/* 导出区域 */}
        <div>
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
            导出数据
          </h4>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {exporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                正在导出...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                导出为CSV
              </>
            )}
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            导出所有任务数据为CSV格式
          </p>
        </div>
      </div>

      {/* 说明 */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              导入说明
            </h5>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• CSV文件应包含标题行：Title,Description,Status,Priority,Category</li>
              <li>• Status字段：Completed 或 Pending</li>
              <li>• Priority字段：LOW, MEDIUM, HIGH, URGENT</li>
              <li>• 如果分类不存在，系统会自动创建</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
