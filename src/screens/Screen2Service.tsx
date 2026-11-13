import { useEffect } from 'react'
import { Clock, Check, ArrowRight } from 'lucide-react'
import type { AppConfig, Service } from '../types'

interface Props {
  config: AppConfig
  selected: Service | null
  onSelect: (s: Service) => void
  onNext: () => void
}

const fmt = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽'

export default function Screen2Service({ config, selected, onSelect, onNext }: Props) {
  useEffect(() => {
    const imgs = config.services.map((s) => {
      const img = new Image()
      img.src = s.image
      return img
    })
    ;(window as any).__serviceImages = imgs
  }, [config.services])

  // Берем картинку для фона (например, третью услугу с BMW)
  const bgImage = config.services[2]?.image || config.hero_image

  return (
    <div className="flex flex-col h-full overflow-hidden relative bg-ink">
      
      {/* ФОН (BMW) */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/95 to-ink" />
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="pt-2 pb-4 px-5 shrink-0">
          <h1 className="font-display font-black text-[28px] leading-tight tracking-tight uppercase">Выберите услугу</h1>
          <p className="mt-1.5 text-white/50 text-sm">Всё, что нужно вашему авто — в одном месте</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="flex flex-col gap-4">
            {config.services.map((s) => {
              const active = selected?.id === s.id
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => onSelect(s)}
                  className="relative overflow-hidden rounded-2xl border text-left cursor-pointer bg-ink/40 transition-colors duration-200"
                  style={{
                    minHeight: 120,
                    borderColor: active ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                    boxShadow: active ? '0 0 20px rgba(229,229,229,0.2)' : 'none',
                  }}
                >
                  <div className="absolute inset-0">
                    <img 
                      src={s.image} 
                      alt="" 
                      className="w-full h-full object-cover opacity-50" 
                      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }} 
                      draggable={false}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
                  </div>

                  <div className="relative p-4 flex flex-col justify-between min-h-[120px] z-10">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display font-bold text-lg uppercase tracking-tight leading-tight">{s.name}</h3>
                      <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          active ? 'bg-accent text-ink shadow-glow' : 'bg-white/10 border border-white/15 text-transparent'
                        }`}>
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-[12px] text-zincsoft">
                        <Clock className="w-3.5 h-3.5" />
                        {s.duration}
                      </div>
                      <div className="font-display font-extrabold text-xl tracking-tight text-white">{fmt(s.price)}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="shrink-0 p-5 pb-safe bg-ink/80 backdrop-blur-md border-t border-white/5">
          <button
            type="button"
            disabled={!selected}
            onClick={onNext}
            className={`w-full h-14 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selected ? 'bg-accent text-ink shadow-glow' : 'bg-white/[0.06] text-white/30 cursor-not-allowed'
            }`}
          >
            Далее <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
