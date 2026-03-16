import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { DebugConsole } from './components/DebugConsole'
import { Loader } from './components/Loader'
import { PlaygroundBackground } from './components/PlaygroundBackground'
import { ProjectBoard } from './components/ProjectBoard'
import { TechOrbit } from './components/TechOrbit'
import { TypingText } from './components/TypingText'
import {
  projects,
  socialLinks,
  techStack,
  timeline,
  type ProjectItem,
  type TechItem,
} from './data/content'

function App() {
  const [loading, setLoading] = useState(true)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)
  const [chaos, setChaos] = useState(false)
  const [consoleLines, setConsoleLines] = useState<string[]>([
    '> Welcome to MathewOS',
    '> Type help to list commands',
  ])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * -2
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
      setPointer({ x, y })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const heroText = useMemo(
    () => "Hi, I'm Mathew - I build interactive web experiences.",
    [],
  )

  const runChaos = () => {
    setChaos(true)
    window.setTimeout(() => setChaos(false), 900)
  }

  const handleCommand = (command: string) => {
    const input = command.toLowerCase()
    let response = '> Unknown command. Try: help'

    if (input === 'help') response = '> Available: help | projects | contact'
    if (input === 'projects') response = `> Loaded projects: ${projects.map((p) => p.title).join(', ')}`
    if (input === 'contact') response = '> Reach me at: mathew@playground.dev'

    setConsoleLines((prev) => [...prev, `$ ${command}`, response])
    return response
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConsoleLines((prev) => [...prev, '> Contact signal transmitted successfully'])
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className={`relative min-h-screen overflow-x-clip bg-[#05070c] text-slate-100 ${chaos ? 'chaos' : ''}`}>
      <PlaygroundBackground pointer={pointer} />
      <div className="pointer-events-none fixed left-[var(--cursor-x)] top-[var(--cursor-y)] z-[120] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80 mix-blend-screen md:block" />
      <div className="pointer-events-none fixed left-[var(--cursor-x)] top-[var(--cursor-y)] z-[119] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-lg md:block" />

      <motion.div
        drag
        dragElastic={0.25}
        className="fixed bottom-8 right-8 z-50 hidden h-20 w-20 cursor-grab place-items-center rounded-2xl border border-cyan-300/30 bg-slate-900/75 text-3xl shadow-lg md:grid"
        whileDrag={{ scale: 1.08 }}
      >
        <span role="img" aria-label="avatar">
          {`</>`}
        </span>
      </motion.div>

      <main className="relative z-20 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <motion.section
          className="flex min-h-[92vh] flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-['Orbitron'] text-xs uppercase tracking-[0.35em] text-cyan-300/90">
            Developer Playground
          </p>
          <h1 className="mt-5 font-['Space_Grotesk'] text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Where interfaces become experiments.
          </h1>
          <div className="mt-5 max-w-2xl">
            <TypingText text={heroText} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-300/20"
            >
              Enter Project Lab
            </a>
            <button
              onClick={runChaos}
              className="rounded-xl border border-pink-300/35 bg-pink-400/10 px-4 py-2 text-sm text-pink-200 transition hover:bg-pink-400/25"
            >
              Break UI (Easter Egg)
            </button>
          </div>
        </motion.section>

        <motion.section
          id="tech"
          className="space-y-6 py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl text-white">Clickable Tech Stack</h2>
          <TechOrbit techStack={techStack} selected={selectedTech} onSelect={setSelectedTech} />
        </motion.section>

        <motion.section
          id="projects"
          className="space-y-6 py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl text-white">Project Explorer Board</h2>
          <ProjectBoard projects={projects} onOpenProject={setActiveProject} />
        </motion.section>

        <section className="grid gap-6 py-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5"
          >
            <h2 className="font-['Space_Grotesk'] text-2xl text-white">Interactive Timeline</h2>
            <div className="mt-6 space-y-4">
              {timeline.map((item, index) => (
                <motion.article
                  key={item.year}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-xl border border-cyan-400/20 bg-slate-950/65 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{item.year}</p>
                  <p className="mt-1 text-lg text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <DebugConsole lines={consoleLines} onCommand={handleCommand} />
          </motion.div>
        </section>

        <motion.section
          id="contact"
          className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl text-white">Contact Control Room</h2>
          <p className="mt-2 text-sm text-slate-300">Drop a message and let us build something unusual.</p>
          <form className="mt-6 grid gap-3 sm:grid-cols-2" onSubmit={handleContactSubmit}>
            <input
              required
              placeholder="Your name"
              className="rounded-xl border border-slate-600 bg-slate-950/70 px-3 py-2 outline-none transition focus:border-cyan-300"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              className="rounded-xl border border-slate-600 bg-slate-950/70 px-3 py-2 outline-none transition focus:border-cyan-300"
            />
            <textarea
              required
              rows={4}
              placeholder="Tell me about your project"
              className="sm:col-span-2 rounded-xl border border-slate-600 bg-slate-950/70 px-3 py-2 outline-none transition focus:border-cyan-300"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="sm:col-span-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 font-semibold text-slate-950"
            >
              Send Signal
            </motion.button>
          </form>
          <div className="mt-5 flex gap-3 text-sm">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-slate-200 transition hover:border-cyan-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[140] grid place-items-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              onClick={(event) => event.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl border border-cyan-300/35 bg-slate-950/95 p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Project Detail</p>
              <h3 className="mt-2 font-['Space_Grotesk'] text-3xl text-white">{activeProject.title}</h3>
              <p className="mt-3 text-slate-200">{activeProject.details}</p>
              <button
                onClick={() => setActiveProject(null)}
                className="mt-5 rounded-lg border border-cyan-300/40 px-3 py-1.5 text-cyan-100"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

