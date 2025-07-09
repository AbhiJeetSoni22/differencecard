import { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard'
import Timer from './components/Timer'

function App() {
  const [gameConfig, setGameConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/config.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load game configuration')
        }
        return response.json()
      })
      .then(data => {
        setGameConfig(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading game...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {gameConfig.gameTitle}
        </h1>
        
        <div className="flex justify-between items-center mb-6">
          <Timer />
          <div className="text-lg font-medium text-gray-700">
            Find {gameConfig.differences.length} differences
          </div>
        </div>
        
        <GameBoard config={gameConfig} />
      </div>
    </div>
  )
}

export default App