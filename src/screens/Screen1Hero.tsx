import { motion } from 'framer-motion'
import { ArrowRight, Phone, Send, MapPin } from 'lucide-react'
import type { AppConfig } from '../types'

interface Props {
  config: AppConfig
  onStart: () => void
}

export default function Screen1Hero({ config, onStart }: Props) {
  const yandexMapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(config.address)}`

  return (
    <div className="relative w-full h-full bg-ink overflow-hidden" style={{ minHeight: '100dvh' }}>
      
      {/* Картинка Audi */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.hero_image}
          alt={config.business_name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-transparent" />
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col justify-end px-6 pb-8 safe-bottom h-full" style={{ minHeight: '100dvh' }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-auto pt-8 safe-top">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center font-display font-black text-lg shadow-glow text-ink">
              B
            </div>
            <div>
              <div className="font-display font-extrabold tracking-[0.18em] text-sm uppercase">{config.logo_text}</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-zincsoft">Detailing Studio</div>
            </div>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="font-display font-black text-[34px] leading-[1.05] tracking-tight uppercase">
          {config.hero_title}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-3 text-zincsoft text-[15px] leading-relaxed max-w-sm">
          {config.hero_subtitle}
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 24 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }} 
          whileTap={{ scale: 0.96 }} 
          onClick={onStart} 
          style={{ WebkitTapHighlightColor: 'transparent' }}
          className="mt-8 group relative w-full h-14 rounded-full bg-accent text-ink font-semibold text-[15px] flex items-center justify-center gap-2 shadow-glow active:shadow-glowlg transition-shadow"
        >
          <span>Записаться</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
        </motion.button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }} className="mt-6 flex flex-col items-center gap-2.5 text-[12px] text-zincsoft">
          <div className="flex items-center justify-center gap-4">
            <a href={`tel:${config.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              {config.phone}
            </a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href={`https://t.me/${config.telegram_username}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Send className="w-3.5 h-3.5" />
              Telegram
            </a>
          </div>
          <a href={yandexMapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5" />
            {config.address}
          </a>
        </motion.div>
      </div>
    </div>
  )
}
