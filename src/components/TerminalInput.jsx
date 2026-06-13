import { useState, useRef, useEffect, useCallback } from 'react'
import { getAllCommandNames } from '../utils/commands.js'

function TerminalInput({ onCommand, onAiMessage, isAiMode, onExitAi }) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [suggestionIndex, setSuggestionIndex] = useState(-1)
  const inputRef = useRef(null)
  const commandsRef = useRef(getAllCommandNames())

  useEffect(() => {
    inputRef.current?.focus()
  }, [isAiMode])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = input.trim()
      if (!trimmed) return

      if (isAiMode) {
        if (trimmed.toLowerCase() === 'exit') {
          setInput('')
          onExitAi()
          return
        }
        onAiMessage(trimmed)
        setInput('')
        return
      }

      onCommand(trimmed)
      setInput('')
      setSuggestions([])
      setSuggestionIndex(-1)
      return
    }

    if (isAiMode) return

    if (e.key === 'Tab') {
      e.preventDefault()
      const parts = input.split(/\s+/)
      if (parts.length <= 1) {
        if (suggestions.length > 0 && suggestionIndex >= 0) {
          setInput(suggestions[suggestionIndex])
          setSuggestions([])
          setSuggestionIndex(-1)
        } else {
          const partial = parts[0].toLowerCase()
          const matches = commandsRef.current.filter((c) => c.startsWith(partial))
          if (matches.length === 1) {
            setInput(matches[0])
          } else if (matches.length > 1) {
            setSuggestions(matches)
            setSuggestionIndex(0)
          }
        }
      }
      return
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
    }

    setSuggestions([])
    setSuggestionIndex(-1)
  }, [input, isAiMode, onCommand, onAiMessage, onExitAi, suggestions, suggestionIndex])

  const promptText = isAiMode
    ? 'You:'
    : 'soul@portfolio:~$'

  const promptColor = isAiMode ? 'text-terminal-blue' : ''
  const promptStyle = isAiMode ? {} : { color: 'var(--accent)' }

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`${promptColor} shrink-0`} style={promptStyle}>{promptText}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-terminal-text font-mono text-sm"
          style={{ caretColor: 'var(--accent)' }}
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {suggestions.map((s, i) => (
            <span
              key={s}
              className={`text-xs px-2 py-0.5 rounded cursor-pointer ${
                i === suggestionIndex
                  ? 'text-terminal-bg'
                  : 'bg-terminal-surface text-terminal-dim'
              }`}
              style={i === suggestionIndex ? { backgroundColor: 'var(--accent)' } : {}}
              onClick={() => {
                setInput(s)
                setSuggestions([])
                setSuggestionIndex(-1)
                inputRef.current?.focus()
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default TerminalInput
