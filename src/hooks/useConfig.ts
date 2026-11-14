import { useEffect, useState } from 'react'
import type { AppConfig } from '../types'

export function useConfig() {
  const [config, setConfig] = useState<AppConfig | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const clientName = import.meta.env.VITE_CLIENT || 'demo'
    
    // ВАЖНО: используем BASE_URL для правильной работы на GitHub Pages
    const jsonPath = `${import.meta.env.BASE_URL}clients/${clientName}.json`
    
    fetch(jsonPath, { cache: 'force-cache' }) 
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((data: AppConfig) => {
        // ВАЛИДАЦИЯ ТЕЛЕГРАМА (защита от подмены)
        if (data.telegram_username) {
          const isValid = /^[a-zA-Z0-9_]{5,32}$/.test(data.telegram_username)
          if (!isValid) data.telegram_username = '' 
        }

        setConfig(data)
        
        // Цвета
        const rgb = hexToRgb(data.accent_color)
        if (rgb) document.documentElement.style.setProperty('--accent', `${rgb.r} ${rgb.g} ${rgb.b}`)
        
        let metaTheme = document.querySelector('meta[name="theme-color"]')
        if (!metaTheme) { metaTheme = document.createElement('meta'); metaTheme.setAttribute('name', 'theme-color'); document.head.appendChild(metaTheme) }
        metaTheme.setAttribute('content', data.accent_color)
        
        // Заголовок
        document.title = `${data.business_name} — Онлайн-запись`

        // ДИНАМИЧЕСКИЕ OG-ТЕГИ (для Telegram)
        const setMeta = (property: string, content: string) => {
          let el = document.querySelector(`meta[property="${property}"]`)
          if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
          el.setAttribute('content', content)
        }
        
        setMeta('og:title', `${data.business_name} — Онлайн-запись`)
        setMeta('og:description', data.hero_subtitle)
        
        // Абсолютный путь для картинки
        const baseUrl = window.location.origin + import.meta.env.BASE_URL
        const imgPath = data.hero_image.replace(/^\//, '') // убираем первый слеш, если есть
        setMeta('og:image', baseUrl + imgPath)
        setMeta('og:url', window.location.href)
        
      })
      .catch((e) => setError(e.message))
  }, [])

  return { config, error }
}

function hexToRgb(hex: string) { 
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i); 
  if (!m) return null; 
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } 
}
