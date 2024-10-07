import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

interface QuizModeProps {
  start: number
  end: number
}

const QuizMode: React.FC<QuizModeProps> = ({ start, end }) => {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [options, setOptions] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * (end - start + 1)) + start
    const n2 = Math.floor(Math.random() * (end - start + 1)) + start
    setNum1(n1)
    setNum2(n2)
    
    const correctAnswer = n1 * n2
    const wrongAnswer1 = correctAnswer + Math.floor(Math.random() * 5) + 1
    const wrongAnswer2 = correctAnswer - Math.floor(Math.random() * 5) - 1
    
    const allOptions = [correctAnswer, wrongAnswer1, wrongAnswer2]
    setOptions(shuffleArray(allOptions))
    
    setSelectedAnswer(null)
    setFeedback('')
  }

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    generateQuestion()
  }, [start, end])

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer)
    const correctAnswer = num1 * num2

    if (answer === correctAnswer) {
      setFeedback('Correct! Great job!')
      setScore(score + 1)
    } else {
      setFeedback(`Oops! The correct answer is ${correctAnswer}. Keep practicing!`)
    }

    setTotalQuestions(totalQuestions + 1)
    setTimeout(generateQuestion, 2000)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Multiplication Quiz</h2>
      <div className="text-xl mb-4">
        What is {num1} × {num2}?
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`px-6 py-3 rounded text-lg font-semibold transition-colors duration-300 ${
              selectedAnswer === option
                ? selectedAnswer === num1 * num2
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div
          className={`text-lg mb-4 ${
            feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </div>
      )}
      <div className="text-lg mb-4">
        Score: {score} / {totalQuestions}
      </div>
      <button
        onClick={generateQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition-colors duration-300"
      >
        <RefreshCw className="mr-2" size={20} />
        New Question
      </button>
    </div>
  )
}

export default QuizMode