import { useState, useRef, useEffect } from 'react'
import DifferenceMarker from './DifferenceMarker'

export default function GameBoard({ config }) {
  const [foundDifferences, setFoundDifferences] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (foundDifferences.length === config.differences.length) {
      setShowSuccess(true)
    }
  }, [foundDifferences, config.differences.length])

  const handleImageLoad = () => {
    if (image1Ref.current) {
      setImageSize({
        width: image1Ref.current.offsetWidth,
        height: image1Ref.current.offsetHeight
      })
    }
  }

  const handleImageClick = (e, imageIndex) => {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is on a difference
    config.differences.forEach((diff, index) => {
      if (
        !foundDifferences.includes(index) &&
        x >= diff.x && x <= diff.x + diff.width &&
        y >= diff.y && y <= diff.y + diff.height
      ) {
        setFoundDifferences(prev => [...prev, index])
      }
    })
  }

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        {/* Left Image */}
        <div className="relative border-4 border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <img
            ref={image1Ref}
            src={config.images.image1}
            alt="Left image"
            className="max-w-full h-auto"
            onClick={(e) => handleImageClick(e, 1)}
            onLoad={handleImageLoad}
          />
          {foundDifferences.map((diffIndex) => {
            const diff = config.differences[diffIndex]
            return (
              <DifferenceMarker
                key={`left-${diffIndex}`}
                x={diff.x}
                y={diff.y}
                width={diff.width}
                height={diff.height}
              />
            )
          })}
        </div>

        {/* Right Image */}
        <div className="relative border-4 border-gray-200 rounded-lg overflow-hidden shadow-lg">
          <img
            ref={image2Ref}
            src={config.images.image2}
            alt="Right image"
            className="max-w-full h-auto"
            onClick={(e) => handleImageClick(e, 2)}
          />
          {foundDifferences.map((diffIndex) => {
            const diff = config.differences[diffIndex]
            return (
              <DifferenceMarker
                key={`right-${diffIndex}`}
                x={diff.x}
                y={diff.y}
                width={diff.width}
                height={diff.height}
              />
            )
          })}
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center animate-bounce">
            <h2 className="text-3xl font-bold text-green-500 mb-4">Congratulations!</h2>
            <p className="text-xl mb-4">You found all the differences!</p>
            <button
              onClick={() => {
                setFoundDifferences([])
                setShowSuccess(false)
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}