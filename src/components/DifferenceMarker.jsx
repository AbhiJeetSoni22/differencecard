export default function DifferenceMarker({ x, y, width, height }) {
  return (
    <div
      className="absolute border-4 border-red-500 rounded-full pointer-events-none animate-pulse"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  )
}