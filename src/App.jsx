import { ThemeProvider, useTheme } from './hooks/useTheme.jsx'
import Terminal from './components/Terminal.jsx'

function AppInner() {
  const { cycleTheme } = useTheme()
  return <Terminal cycleTheme={cycleTheme} />
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}

export default App
