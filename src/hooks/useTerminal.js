import { useState, useCallback } from 'react'
import { getCommand, isClearCommand } from '../utils/commands.js'

export function useTerminal({ cycleTheme } = {}) {
  const [lines, setLines] = useState(() => [
    { type: 'output', content: 'Type \'help\' to see available commands' },
  ])
  const [isAiMode, setIsAiMode] = useState(false)
  const [isAiLoading, setAiLoading] = useState(false)

  const executeCommand = useCallback((input) => {
    if (!input.trim()) return

    const cmdInfo = getCommand(input)
    if (!cmdInfo) {
      setLines((prev) => [
        ...prev,
        { type: 'input', content: input },
        { type: 'output', content: `Command not found: '${input.trim().split(/\s+/)[0]}'. Type 'help' for available commands.` },
      ])
      return
    }

    if (cmdInfo.cmd === 'ai') {
      setLines((prev) => [
        ...prev,
        { type: 'input', content: input },
        { type: 'ai-start' },
      ])
      setIsAiMode(true)
      return
    }

    if (cmdInfo.cmd === 'theme' && cycleTheme) {
      const themeName = cycleTheme()
      setLines((prev) => [
        ...prev,
        { type: 'input', content: input },
        { type: 'output', content: `  Theme set to: ${themeName}` },
      ])
      return
    }

    if (isClearCommand(input)) {
      setLines([])
      return
    }

    const result = cmdInfo.handler.fn(cmdInfo.args)
    if (result !== undefined && result !== null) {
      setLines((prev) => [
        ...prev,
        { type: 'input', content: input },
        { type: 'output', content: result },
      ])
    }
  }, [cycleTheme])

  const addLine = useCallback((line) => {
    setLines((prev) => [...prev, line])
  }, [])

  const exitAiMode = useCallback(() => {
    setIsAiMode(false)
    setLines((prev) => [
      ...prev,
      { type: 'output', content: 'Exited AI chat mode. Type \'help\' for commands.' },
    ])
  }, [])

  const clear = useCallback(() => {
    setLines([])
  }, [])

  return {
    lines,
    isAiMode,
    isAiLoading,
    setAiLoading,
    executeCommand,
    addLine,
    exitAiMode,
    clear,
  }
}
