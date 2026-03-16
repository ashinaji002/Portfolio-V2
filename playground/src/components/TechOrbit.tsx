import { motion } from 'framer-motion'
import type { TechItem } from '../data/content'

type TechOrbitProps = {
  techStack: TechItem[]
  selected: TechItem | null
  onSelect: (tech: TechItem) => void
}

export function TechOrbit({ techStack, selected, onSelect }: TechOrbitProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((tech, index) => (
          <motion.button
            key={tech.name}
            onClick={() => onSelect(tech)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -8, boxShadow: `0 0 35px ${tech.color}44` }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-2xl border border-slate-700 bg-slate-900/80 p-5 text-left"
          >
            <div
              className="mb-3 grid h-12 w-12 place-items-center rounded-xl text-sm font-semibold text-slate-950"
              style={{ backgroundColor: tech.color }}
            >
              {tech.icon}
            </div>
            <p className="font-['Space_Grotesk'] text-lg font-medium text-slate-100">{tech.name}</p>
            <p className="mt-2 text-sm text-slate-400">Click to inspect</p>
          </motion.button>
        ))}
      </div>

      {selected && (
        <motion.div
          key={selected.name}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="rounded-2xl border border-cyan-300/35 bg-slate-900/85 p-5"
        >
          <p className="font-['Orbitron'] text-xs uppercase tracking-[0.25em] text-cyan-300">
            {selected.name}
          </p>
          <p className="mt-3 text-slate-200">{selected.description}</p>
        </motion.div>
      )}
    </div>
  )
}
