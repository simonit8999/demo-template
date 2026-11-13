import { ArrowRight, Car, Hash, User, MessageSquare, Phone } from 'lucide-react'
import type { BookingData } from '../types'

interface Props {
  data: BookingData
  onChange: (patch: Partial<BookingData>) => void
  onNext: () => void
}

export default function Screen3Details({ data, onChange, onNext }: Props) {
  const valid = data.carModel.trim().length > 0 && data.name.trim().length > 0 && data.phone.replace(/\D/g, '').length >= 11

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 11) val = val.slice(0, 11)
    
    let formatted = ''
    if (val.length > 0) {
      formatted = '+7'
      if (val.length > 1) formatted += ` (${val.slice(1, 4)}`
      if (val.length > 4) formatted += `) ${val.slice(4, 7)}`
      if (val.length > 7) formatted += `-${val.slice(7, 9)}`
      if (val.length > 9) formatted += `-${val.slice(9, 11)}`
    }
    onChange({ phone: formatted })
  }

  return (
    <div className="flex flex-col h-full bg-ink overflow-hidden">
      <div className="pt-2 pb-5 px-5 shrink-0">
        <h1 className="font-display font-black text-[28px] leading-tight tracking-tight uppercase">Детали вашего авто</h1>
        <p className="mt-1.5 text-zincsoft text-sm">Так мы подготовимся к вашему визиту</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Убрали staggerChildren, форма появляется целиком */}
        <form 
          className="flex flex-col gap-3.5" 
          onSubmit={(e) => { e.preventDefault(); if (valid) onNext() }}
        >
          <Field icon={<User className="w-4 h-4" />} label="Ваше имя *">
            <input value={data.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Александр" className="w-full bg-transparent outline-none text-[15px] placeholder:text-white/25" />
          </Field>

          <Field icon={<Phone className="w-4 h-4" />} label="Номер телефона *">
            <input 
              type="tel"
              value={data.phone} 
              onChange={handlePhoneChange} 
              placeholder="+7 (999) 000-00-00" 
              className="w-full bg-transparent outline-none text-[15px] placeholder:text-white/25" 
            />
          </Field>

          <Field icon={<Car className="w-4 h-4" />} label="Марка и модель *">
            <input value={data.carModel} onChange={(e) => onChange({ carModel: e.target.value })} placeholder="BMW M5" className="w-full bg-transparent outline-none text-[15px] placeholder:text-white/25" />
          </Field>

          <Field icon={<Hash className="w-4 h-4" />} label="Номер авто (опционально)">
            <input value={data.plate} onChange={(e) => onChange({ plate: e.target.value })} placeholder="А123ВС 77" className="w-full bg-transparent outline-none text-[15px] uppercase placeholder:text-white/25" />
          </Field>

          <div className="rounded-2xl bg-surface/60 border border-white/10 p-4 glow-focus transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-[11px] uppercase tracking-[0.16em] text-zincsoft font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              Комментарий (опционально)
            </div>
            <textarea value={data.comment} onChange={(e) => onChange({ comment: e.target.value })} placeholder="Царапина на двери, нужна химчистка" rows={3} className="w-full bg-transparent outline-none text-[15px] resize-none placeholder:text-white/25" />
          </div>
        </form>
      </div>

      <div className="shrink-0 p-5 pb-safe bg-ink border-t border-white/5">
        <button 
          type="button"
          disabled={!valid} 
          onClick={onNext} 
          className={`w-full h-14 rounded-full font-semibold text-[15px] flex items-center justify-center gap-2 transition-all ${
            valid ? 'bg-accent text-ink shadow-glow' : 'bg-white/[0.06] text-white/30 cursor-not-allowed'
          }`}
        >
          Выбрать время <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

function Field({ children, icon, label }: { children: React.ReactNode; icon: React.ReactNode; label: string }) {
  return (
    <label className="rounded-2xl bg-surface/60 border border-white/10 p-4 glow-focus transition-shadow block">
      <div className="flex items-center gap-2 mb-2 text-[11px] uppercase tracking-[0.16em] text-zincsoft font-medium">
        {icon}
        {label}
      </div>
      {children}
    </label>
  )
}
