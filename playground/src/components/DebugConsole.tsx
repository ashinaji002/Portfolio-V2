import { useState } from 'react'
import type { FormEvent } from 'react'

type DebugConsoleProps = {
  lines: string[]
  onCommand: (command: string) => string
}

export function DebugConsole({ lines, onCommand }: DebugConsoleProps) {
  const [command, setCommand] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!command.trim()) return
    onCommand(command.trim())
    setCommand('')
  }

  return (
    <div className="rounded-2xl border border-emerald-300/30 bg-[#061013]/80 p-4">
      <p className="font-['Orbitron'] text-xs uppercase tracking-[0.22em] text-emerald-300">Debug Console</p>
      <div className="mt-3 h-52 overflow-y-auto rounded-xl border border-emerald-300/20 bg-black/60 p-3 font-mono text-sm text-emerald-200">
        {lines.map((line, index) => (
          <p key={`${line}-${index}`} className="leading-6">
            {line}
          </p>
        ))}
      </div>
      <form className="mt-3 flex gap-2" onSubmit={handleSubmit}>
        <input
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          placeholder="Type: help | projects | contact"
          className="flex-1 rounded-xl border border-emerald-300/30 bg-black/60 px-3 py-2 font-mono text-sm text-emerald-100 outline-none placeholder:text-emerald-300/45 focus:border-emerald-200"
        />
        <button
          type="submit"
          className="rounded-xl border border-emerald-300/50 px-3 py-2 text-xs uppercase tracking-[0.12em] text-emerald-200"
        >
          Run
        </button>
      </form>
    </div>
  )
}

