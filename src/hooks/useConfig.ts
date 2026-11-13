import { useEffect, useState } from 'react'
import type { AppConfig } from '../types'

export function useConfig() {
  const [config, setConfig] = useState<AppConfig | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const clientName = import.meta.env.VITE_CLIENT || 'demo'
    
    // Используем force-cache для скорости при повторном заходе
    fetch(`/clients/${clientName}.json`, { cache: 'force-cache' }) 
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((data: AppConfig) => {
        // ВАЛИДАЦИЯ ТЕЛЕГРАМА (защита от подмены)
        if (data.telegram_username) {
          const isValid = /^[a-zA-Z0-9_]{5,32}$/.test(data.telegram_username)
          if (!isValid) data.telegram_username = '' // Если ник битый - отключаем
        }

        setConfig(data)
        const rgb = hexToRgb(data.accent_color)
        if (rgb) document.documentElement.style.setProperty('--accent', `${rgb.r} ${rgb.g} ${rgb.b}`)
        
        let metaTheme = document.querySelector('meta[name="theme-color"]')
        if (!metaTheme) { metaTheme = document.createElement('meta'); metaTheme.setAttribute('name', 'theme-color'); document.head.appendChild(metaTheme) }
        metaTheme.setAttribute('content', data.accent_color)
        
        document.title = `${data.business_name} — Онлайн-запись`
      })
      .catch((e) => setError(e.message))
  }, [])

  return { config, error }
}
function hexToRgb(hex: string) { const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i); if (!m) return null; return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } }
