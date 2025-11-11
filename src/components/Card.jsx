import React from 'react'
import { motion } from 'framer-motion'
export default function Card({children}){
  return (
    <motion.div whileHover={{y:-6, scale:1.02}} className="card-glass rounded-xl p-4 shadow">
      {children}
    </motion.div>
  )
}
