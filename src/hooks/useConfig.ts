import { useEffect, useState } from 'react'
import type { AppConfig } from '../types'

const CONFIG: AppConfig = {
  business_name: "BLAQCAR Detailing",
  logo_text: "BLAQCAR",
  accent_color: "#E5E5E5",
  telegram_username: "blaqcar_vrn",
  phone: "+7 (473) 249-56-86",
  address: "г. Воронеж, ул. Циолковского, 19Б",
  hero_image: "/images/blaqcar/hero.jpg",
  hero_title: "Идеальный блеск вашего авто",
  hero_subtitle: "Онлайн-запись за 30 секунд. Без звонков и ожиданий.",
  services: [
    { "id": "1", "name": "Детейлинг-мойка", "price": 5000, "duration": "3 часа", "image": "/images/blaqcar/srv1.jpg" },
    { "id": "2", "name": "Мойка (комплекс)", "price": 1600, "duration": "1.5 часа", "image": "/images/blaqcar/srv2.jpg" },
    { "id": "3", "name": "Полировка кузова", "price": 20000, "duration": "1 день", "image": "/images/blaqcar/srv3.jpg" },
    { "id": "4", "name": "Керамика", "price": 10000, "duration": "1 день", "image": "/images/blaqcar/srv4.jpg" },
    { "id": "5", "name": "Химчистка под ключ", "price": 15000, "duration": "1 день", "image": "/images/blaqcar/srv5.jpg" },
    { "id": "6", "name": "Полировка фар", "price": 1000, "duration": "1 час", "image": "/images/blaqcar/srv6.jpg" },
    { "id": "7", "name": "Полировка стекол", "price": 5000, "duration": "2 часа", "image": "/images/blaqcar/srv7.jpg" },
    { "id": "8", "name": "Нанесение воска", "price": 3000, "duration": "1 час", "image": "/images/blaqcar/srv8.jpg" },
    { "id": "9", "name": "Антидождь", "price": 3000, "duration": "1 час", "image": "/images/blaqcar/srv9.jpg" },
    { "id": "10", "name": "Химчистка двигателя", "price": 5000, "duration": "2 часа", "image": "/images/blaqcar/srv10.jpg" }
  ],
  working_hours: { start: "10:00", "end": "20:00", slot_minutes: 60 }
}

export function useConfig() {
  const [config, setConfig] = useState<AppConfig | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setConfig(CONFIG)
      const rgb = hexToRgb(CONFIG.accent_color)
      if (rgb) document.documentElement.style.setProperty('--accent', `${rgb.r} ${rgb.g} ${rgb.b}`)
    } catch (e: any) {
      setError(e.message)
    }
  }, [])

  return { config, error }
}

function hexToRgb(hex: string) {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}
