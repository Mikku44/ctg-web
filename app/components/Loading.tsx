

export default function Loading({className}: {className?: string}) {
  return (
      <div className={`inline-block ${className || "h-8 w-8"} animate-spin rounded-full border-4 border-solid border-slate-300 border-r-transparent`}></div>
  )
}
