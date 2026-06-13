import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import TerminalInput from './TerminalInput.jsx'
import { useTerminal } from '../hooks/useTerminal.js'
import { getAiResponse } from '../ai/api.js'

function OutputLine({ line }) {
  const isPre = line.content?.length > 50 || line.content?.includes('\n')
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="whitespace-pre-wrap break-words"
    >
      {isPre ? (
        <pre className="text-terminal-text text-sm leading-relaxed font-mono m-0 whitespace-pre-wrap">
          {line.content}
        </pre>
      ) : (
        <p className="text-terminal-text text-sm leading-relaxed font-mono m-0">
          {line.content}
        </p>
      )}
    </motion.div>
  )
}

function InputLine({ line }) {
  const promptSymbol = line.isAi ? 'You:' : 'soul@portfolio:~$'
  const isDefault = !line.isAi
  return (
    <div className="flex items-start gap-2">
      <span
        className={`shrink-0 ${line.isAi ? 'text-terminal-blue' : ''}`}
        style={isDefault ? { color: 'var(--accent)' } : {}}
      >
        {promptSymbol}
      </span>
      <span className="text-terminal-text text-sm">{line.content}</span>
    </div>
  )
}

function AiTypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-terminal-dim text-sm"
    >
      <span>🤖 thinking</span>
      <span className="flex gap-0.5">
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }}>.</motion.span>
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>.</motion.span>
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>.</motion.span>
      </span>
    </motion.div>
  )
}

function Terminal({ cycleTheme }) {
  const { lines, isAiMode, isAiLoading, executeCommand, addLine, setAiLoading, exitAiMode } = useTerminal({ cycleTheme })
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, isAiLoading])

  const handleCommand = useCallback((input) => {
    executeCommand(input)
  }, [executeCommand])

  const handleAiMessage = useCallback(async (message) => {
    addLine({ type: 'input', content: message, isAi: true })
    setAiLoading(true)
    try {
      const response = await getAiResponse(message)
      addLine({ type: 'output', content: `🤖 ${response}`, isAi: true })
    } catch {
      addLine({ type: 'output', content: '🤖 Sorry, I had trouble answering that. Try asking in a different way!', isAi: true })
    } finally {
      setAiLoading(false)
    }
  }, [addLine, setAiLoading])

  return (
    <div className="flex flex-col min-h-screen bg-terminal-bg font-mono">
      <div
        ref={scrollRef}
        className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 overflow-y-auto"
        onClick={() => {
          const input = document.querySelector('input')
          input?.focus()
        }}
      >
        <pre className="text-xs sm:text-sm leading-tight mb-6 select-none" style={{ color: 'var(--accent)' }}>
{`╔══════════════════════════════════════════════════════╗
║   ███████╗██████╗     ██████╗ ██████╗ ██╗   ██╗    ║
║   ██╔════╝██╔══██╗   ██╔═══██╗██╔══██╗╚██╗ ██╔╝    ║
║   ███████╗██████╔╝   ██║   ██║██████╔╝ ╚████╔╝     ║
║   ╚════██║██╔══██╗   ██║   ██║██╔═══╝   ╚██╔╝      ║
║   ███████║██║  ██║   ╚██████╔╝██║        ██║       ║
║   ╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝        ╚═╝       ║
╚══════════════════════════════════════════════════════╝`}
        </pre>

        {lines.map((line, i) => {
          if (line.type === 'input') return <InputLine key={i} line={line} />
          if (line.type === 'output') return <OutputLine key={i} line={line} />
          if (line.type === 'ai-start') {
            return (
              <OutputLine
                key={i}
                line={{
                  content: '🤖 AI Chat mode activated. Ask me anything about Soulaimane!\nType \'exit\' to return to terminal.',
                }}
              />
            )
          }
          return null
        })}
        {isAiLoading && <AiTypingIndicator />}

        <div className="mt-4 pb-4">
          <TerminalInput
            onCommand={handleCommand}
            onAiMessage={handleAiMessage}
            isAiMode={isAiMode}
            onExitAi={exitAiMode}
          />
        </div>
      </div>
    </div>
  )
}

export default Terminal
