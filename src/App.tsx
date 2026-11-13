import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConfig } from './hooks/useConfig'
import { usePwaTheme } from './hooks/usePwa'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'

import Screen1Hero from './screens/Screen1Hero'
import Screen2Service from './screens/Screen2Service'
import Screen3Details from './screens/Screen3Details'
import Screen4Time from './screens/Screen4Time'
import Screen5Confirm from './screens/Screen5Confirm'

import type { BookingData, Service } from './types'

type Step = 0 | 1 | 2 | 3 | 4

const initialBooking: BookingData = {
  service: null,
  carModel: '',
  plate: '',
  name: '',
  phone: '',
  comment: '',
  date: null,
  time: null,
}

const HEADER_TITLES: Record<number, string> = { 0: '', 1: 'Услуга', 2: 'Данные', 3: 'Время', 4: 'Подтверждение' }

// 🔥 НОВЫЕ ВАРИАНТЫ АНИМАЦИИ (Spring + Parallax)
const screenVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-50%',
    opacity: direction > 0 ? 1 : 0.5,
    scale: direction > 0 ? 1 : 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-30%' : '100%',
    opacity: direction > 0 ? 0.5 : 1,
    scale: direction > 0 ? 0.95 : 1,
    zIndex: 0,
  }),
}

// 🔥 SPRING ТРАНЗИЦИЯ (Плавная и быстрая)
const transition = { 
  type: 'spring', 
  stiffness: 300, 
  damping: 30, 
  mass: 0.8 
}

export default function App() {
  const { config, error } = useConfig()
  const [step, setStep] = useState<Step>(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [booking, setBooking] = useState<BookingData>(initialBooking)

  usePwaTheme('#050505')

  if (error) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 text-center">
        <div>
          <div className="font-display font-bold text-xl mb-2">Не удалось загрузить конфигурацию</div>
          <div className="text-zincsoft text-sm">{error}</div>
        </div>
      </div>
    )
  }
  if (!config) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
      </div>
    )
  }

  const go = (next: Step) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const update = (patch: Partial<BookingData>) => setBooking((b) => ({ ...b, ...patch }))
  const selectService = (s: Service) => update({ service: s })

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-ink text-white">
      
      <AnimatePresence initial={false} custom={direction}>
        
        {/* ЭКРАН 0 (Hero) */}
        {step === 0 && (
          <motion.div
            key="hero"
            custom={direction}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 bg-ink"
          >
            <Screen1Hero config={config} onStart={() => go(1)} />
          </motion.div>
        )}

        {/* ЭКРАНЫ 1-4 (Услуги) */}
        {step !== 0 && (
          <motion.div
            key={step}
            custom={direction}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 w-full h-full flex flex-col bg-ink origin-left"
          >
            <Header title={HEADER_TITLES[step]} onBack={() => go((step - 1) as Step)} />
            <ProgressBar step={step} total={4} />

            <div className="relative flex-1 overflow-hidden">
              {step === 1 && (
                <Screen2Service config={config} selected={booking.service} onSelect={selectService} onNext={() => go(2)} />
              )}
              {step === 2 && (
                <Screen3Details data={booking} onChange={update} onNext={() => go(3)} />
              )}
              {step === 3 && (
                <Screen4Time config={config} date={booking.date} time={booking.time} onDate={(d) => update({ date: d })} onTime={(t) => update({ time: t })} onNext={() => go(4)} />
              )}
              {step === 4 && <Screen5Confirm config={config} data={booking} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
