import React, { useState } from 'react'
import { Grid, Check } from 'lucide-react'
import MultiplicationTable from './components/MultiplicationTable'
import QuizMode from './components/QuizMode'

function App() {
  const [mode, setMode] = useState<'table' | 'quiz'>('table')
  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(10)

  const handleRangeChange = (newStart: number, newEnd: number) => {
    setStart(newStart)
    setEnd(newEnd)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Math Mastery: Multiplication</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div className="flex justify-center mb-4">
          <button
            className={`flex items-center px-4 py-2 rounded-l-lg ${
              mode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setMode('table')}
          >
            <Grid className="mr-2" size={20} />
            Table Mode
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-r-lg ${
              mode === 'quiz' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setMode('quiz')}
          >
            <Check className="mr-2" size={20} />
            Quiz Mode
          </button>
        </div>
        {mode === 'table' ? (
          <MultiplicationTable start={start} end={end} onRangeChange={handleRangeChange} />
        ) : (
          <QuizMode start={start} end={end} />
        )}
      </div>
    </div>
  )
}

export default App