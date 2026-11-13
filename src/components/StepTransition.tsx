import type { ReactNode } from 'react'

interface Props {
  stepKey: number | string
  direction?: 1 | -1
  children: ReactNode
}

export default function StepTransition({ children }: Props) {
  return (
    <div className="flex-1 flex flex-col w-full h-full">
      {children}
    </div>
  )
}
