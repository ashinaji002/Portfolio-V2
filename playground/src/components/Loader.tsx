import { motion } from 'framer-motion'

export function Loader() {
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-[#05070c]">
      <div className="w-[min(520px,85vw)] space-y-4">
        <motion.p
          className="font-['Orbitron'] text-xs uppercase tracking-[0.35em] text-cyan-300/90"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Booting Playground
        </motion.p>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-300 to-sky-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}