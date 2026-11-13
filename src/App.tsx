import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConfig } from './hooks/useConfig'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import DemoBanner from './components/DemoBanner'
import OwnerCabinet from './screens/OwnerCabinet'
import Screen1Hero from './screens/Screen1Hero'
import Screen2Service from './screens/Screen2Service'
import Screen3Details from './screens/Screen3Details'
import Screen4Time from './screens/Screen4Time'
import Screen5Confirm from './screens/Screen5Confirm'
import type { BookingData, Service } from './types'

type Step = 0 | 1 | 2 | 3 | 4
type ViewMode = 'booking' | 'owner'

const initialBooking: BookingData = { service: null, carModel: '', plate: '', name: '', phone: '', comment: '', date: null, time: null }
const HEADER_TITLES: Record<number, string> = { 0: '', 1: 'Услуга', 2: 'Данные', 3: 'Время', 4: 'Подтверждение' }

const screenVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-30%', opacity: direction > 0 ? 1 : 0 }),
  center: { x: 0, opacity: 1, zIndex: 1, transition: { type: 'spring', stiffness: 400, damping: 35 } },
  exit: (direction: number) => ({ x: direction > 0 ? '-30%' : '100%', opacity: direction > 0 ? 0 : 1, zIndex: 0, transition: { type: 'spring', stiffness: 400, damping: 35 } }),
}

export default function App() {
  const { config, error } = useConfig()
  const [step, setStep] = useState<Step>(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [booking, setBooking] = useState<BookingData>(initialBooking)
  const [viewMode, setViewMode] = useState<ViewMode>('booking') // Состояние для кабинета

  if (error) return <div className="text-white p-5 bg-ink min-h-screen">Ошибка загрузки конфига: {error}</div>
  if (!config) return <div className="text-white p-5 bg-ink min-h-screen">Загрузка...</div>

  const go = (next: Step) => { setDirection(next > step ? 1 : -1); setStep(next) }
  const update = (patch: Partial<BookingData>) => setBooking((b) => ({ ...b, ...patch }))
  const selectService = (s: Service) => update({ service: s })

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-ink text-white">
      {/* Показываем баннер только в демо и только в режиме записи */}
      {config.isDemo && viewMode === 'booking' && (
        <DemoBanner 
          businessName={config.business_name} 
          onOpenOwnerCabinet={() => setViewMode('owner')} 
        />
      )}

      <AnimatePresence mode="wait">
        {viewMode === 'owner' ? (
          <OwnerCabinet key="owner" config={config} onBack={() => setViewMode('booking')} />
        ) : (
          <motion.div key="booking-flow" className="w-full h-full">
            <AnimatePresence initial={false} custom={direction}>
              {step === 0 && (
                <motion.div key="hero" custom={direction} variants={screenVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 bg-ink" style={{ willChange: 'transform, opacity' }}>
                  <Screen1Hero config={config} onStart={() => go(1)} />
                </motion.div>
              )}
              {step !== 0 && (
                <motion.div key={step} custom={direction} variants={screenVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 w-full h-full flex flex-col bg-ink origin-left" style={{ willChange: 'transform, opacity' }}>
                  <Header title={HEADER_TITLES[step]} onBack={() => go((step - 1) as Step)} />
                  <ProgressBar step={step} total={4} />
                  <div className="relative flex-1 overflow-hidden">
                    {step === 1 && <Screen2Service config={config} selected={booking.service} onSelect={selectService} onNext={() => go(2)} />}
                    {step === 2 && <Screen3Details data={booking} onChange={update} onNext={() => go(3)} />}
                    {step === 3 && <Screen4Time config={config} date={booking.date} time={booking.time} onDate={(d) => update({ date: d })} onTime={(t) => update({ time: t })} onNext={() => go(4)} />}
                    {step === 4 && <Screen5Confirm config={config} data={booking} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
