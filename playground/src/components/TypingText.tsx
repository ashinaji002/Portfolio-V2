import { useEffect, useState } from 'react'

type TypingTextProps = {
  text: string
  speed?: number
}

export function TypingText({ text, speed = 45 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(timer)
      }
    }, speed)

    return () => window.clearInterval(timer)
  }, [text, speed])

  return (
    <p className="min-h-[3rem] font-['Space_Grotesk'] text-lg text-slate-200 md:text-xl">
      {displayed}
      <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-cyan-300 align-middle" />
    </p>
  )
}