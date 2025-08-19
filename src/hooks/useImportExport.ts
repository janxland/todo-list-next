import { useState } from 'react'
import { Todo } from '@/types/todo'

export const useImportExport = () => {
  const [importing, setImporting] = useState(false)
  const [exporting, setExporting] = useState(false)

  const exportTodos = async () => {
    try {
      setExporting(true)
      const response = await fetch('/api/todos/export')
      if (!response.ok) throw new Error('导出失败')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `todos-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '导出失败')
    } finally {
      setExporting(false)
    }
  }

  const importTodos = async (file: File) => {
    try {
      setImporting(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/todos/import', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) throw new Error('导入失败')
      const result = await response.json()
      return result
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : '导入失败')
    } finally {
      setImporting(false)
    }
  }

  return {
    importing,
    exporting,
    exportTodos,
    importTodos
  }
}
