import React, { useState } from 'react'

interface MultiplicationTableProps {
  start: number
  end: number
  onRangeChange: (start: number, end: number) => void
}

const MultiplicationTable: React.FC<MultiplicationTableProps> = ({ start, end, onRangeChange }) => {
  const [highlightedCell, setHighlightedCell] = useState<[number, number] | null>(null)
  const [hint, setHint] = useState('')

  const getMultiplicationHint = (num: number): string => {
    switch (num) {
      case 1: return "Anything times 1 is itself."
      case 2: return "Double the number."
      case 3: return "Triple the number."
      case 4: return "Double the double."
      case 5: return "Half of 10 times the number."
      case 6: return "Half of 10 times the other factor plus the other factor."
      case 9: return "10 times the number minus the number."
      case 10: return "Just add a zero at the end."
      case 11: return "For 11 x n (where n is 1-9), the result is n repeated twice (e.g., 11 x 3 = 33)."
      default: return "Try breaking it down into smaller multiplications."
    }
  }

  const handleCellHover = (row: number, col: number) => {
    setHighlightedCell([row, col])
    setHint(getMultiplicationHint(row) || getMultiplicationHint(col))
  }

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= 20) {
      if (isStart) {
        onRangeChange(value, Math.max(end, value))
      } else {
        onRangeChange(Math.min(start, value), value)
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Multiplication Table</h2>
      <div className="flex items-center mb-4">
        <input
          type="number"
          value={start}
          onChange={(e) => handleRangeChange(e, true)}
          className="w-16 px-2 py-1 border rounded mr-2"
          min="1"
          max="20"
        />
        <input
          type="range"
          value={start}
          onChange={(e) => handleRangeChange(e, true)}
          className="mr-2"
          min="1"
          max="20"
        />
        <span className="mx-2">to</span>
        <input
          type="range"
          value={end}
          onChange={(e) => handleRangeChange(e, false)}
          className="mr-2"
          min="1"
          max="20"
        />
        <input
          type="number"
          value={end}
          onChange={(e) => handleRangeChange(e, false)}
          className="w-16 px-2 py-1 border rounded"
          min="1"
          max="20"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-200"></th>
              {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((num) => (
                <th
                  key={num}
                  className={`border p-2 ${highlightedCell && (highlightedCell[0] === num || highlightedCell[1] === num) ? 'bg-yellow-200' : 'bg-gray-200'}`}
                  onMouseEnter={() => handleCellHover(num, num)}
                  onMouseLeave={() => setHighlightedCell(null)}
                >
                  {num}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((row) => (
              <tr key={row}>
                <th
                  className={`border p-2 ${highlightedCell && (highlightedCell[0] === row || highlightedCell[1] === row) ? 'bg-yellow-200' : 'bg-gray-200'}`}
                  onMouseEnter={() => handleCellHover(row, row)}
                  onMouseLeave={() => setHighlightedCell(null)}
                >
                  {row}
                </th>
                {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((col) => (
                  <td
                    key={col}
                    className={`border p-2 ${highlightedCell && (highlightedCell[0] === row || highlightedCell[1] === col) ? 'bg-yellow-200' : ''}`}
                    onMouseEnter={() => handleCellHover(row, col)}
                    onMouseLeave={() => setHighlightedCell(null)}
                  >
                    {row * col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hint && (
        <div className="mt-4 text-lg text-blue-600">
          <strong>Hint:</strong> {hint}
        </div>
      )}
    </div>
  )
}

export default MultiplicationTable