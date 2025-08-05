// @ts-nocheck
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}
