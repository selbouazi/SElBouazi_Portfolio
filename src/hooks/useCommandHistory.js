import { useState, useCallback, useRef } from 'react'

export function useCommandHistory() {
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const tempRef = useRef('')

  const addToHistory = useCallback((cmd) => {
    setHistory((prev) => {
      if (prev[prev.length - 1] === cmd) return prev
      return [...prev, cmd]
    })
    setHistoryIndex(-1)
  }, [])

  const navigateUp = useCallback((currentInput) => {
    if (history.length === 0) return currentInput
    const newIndex = historyIndex === -1
      ? history.length - 1
      : Math.max(0, historyIndex - 1)
    if (historyIndex === -1) tempRef.current = currentInput
    setHistoryIndex(newIndex)
    return history[newIndex]
  }, [history, historyIndex])

  const navigateDown = useCallback(() => {
    if (historyIndex === -1) return tempRef.current
    const newIndex = historyIndex + 1
    if (newIndex >= history.length) {
      setHistoryIndex(-1)
      return tempRef.current
    }
    setHistoryIndex(newIndex)
    return history[newIndex]
  }, [history, historyIndex])

  return { history, addToHistory, navigateUp, navigateDown }
}
