import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import type { ProjectItem } from '../data/content'

type ProjectBoardProps = {
  projects: ProjectItem[]
  onOpenProject: (project: ProjectItem) => void
}

export function ProjectBoard({ projects, onOpenProject }: ProjectBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})

  return (
    <div
      ref={boardRef}
      className="relative grid min-h-[26rem] gap-6 rounded-3xl border border-cyan-400/25 bg-slate-900/40 p-6 md:grid-cols-3"
    >
      {projects.map((project) => {
        const isFlipped = flipped[project.title]
        return (
          <motion.div
            key={project.title}
            drag
            dragConstraints={boardRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.03, zIndex: 40 }}
            className="h-72 cursor-grab"
            style={{ perspective: 1300 }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-full rounded-2xl border border-cyan-300/20 bg-slate-950/80"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 flex h-full flex-col justify-between rounded-2xl p-4"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div>
                  <p className="font-['Orbitron'] text-xs uppercase tracking-[0.2em] text-cyan-300/75">
                    Project Node
                  </p>
                  <h3 className="mt-3 font-['Space_Grotesk'] text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300">{project.summary}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-300/30 px-3 py-1 text-xs text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="absolute inset-0 flex h-full flex-col justify-between rounded-2xl p-4"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <p className="text-sm text-slate-200">{project.details}</p>
                <button
                  onClick={() => onOpenProject(project)}
                  className="rounded-xl bg-cyan-400/20 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/25"
                >
                  Open Modal
                </button>
              </div>
            </motion.div>

            <div className="mt-3 flex justify-between text-xs">
              <button
                onClick={() =>
                  setFlipped((prev) => ({
                    ...prev,
                    [project.title]: !prev[project.title],
                  }))
                }
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-200 transition hover:border-cyan-300/60"
              >
                Flip Card
              </button>
              <a
                href={project.link}
                className="rounded-lg border border-cyan-500/40 px-3 py-1.5 text-cyan-200"
              >
                Visit
              </a>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
