import { useState, useEffect } from 'react'

export default function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const remainingSeconds = time % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return (
    <div className="text-lg font-medium text-gray-700">
      Time: <span className="font-bold">{formatTime(seconds)}</span>
    </div>
  )
}