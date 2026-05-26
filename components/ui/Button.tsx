'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export default function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseClass = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    ghost: 'button-ghost',
  }[variant]

  const sizeClass = {
    sm: 'button-sm',
    md: '',
    lg: 'py-4 px-8 text-lg',
  }[size]

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClass}
        ${sizeClass}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
