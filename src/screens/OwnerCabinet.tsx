import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, Calendar, MessageSquare, Lock } from 'lucide-react';
import type { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  onBack: () => void;
}

export default function OwnerCabinet({ config, onBack }: Props) {
  // Фейковые данные для демонстрации
  const stats = { todayBookings: 7, todayRevenue: 28400, conversion: 18, weekBookings: 41 };
  const recent = [
    { name: 'Александр', service: 'Комплексная мойка', time: '12 мин назад' },
    { name: 'Мария', service: 'Химчистка салона', time: '34 мин назад' },
    { name: 'Дмитрий', service: 'Полировка', time: '1 ч назад' },
    { name: 'Елена', service: 'Комплексная мойка', time: '2 ч назад' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute inset-0 z-50 flex flex-col bg-ink"
    >
      <div className="pt-safe px-5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 pt-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[13px] text-white/50">Демо-кабинет</div>
            <div className="font-display font-bold text-lg">{config.business_name}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-20">
        <div>
          <h2 className="font-display font-bold text-lg mb-3">Сегодня</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<Calendar className="w-4 h-4" />} label="Записей" value={stats.todayBookings} />
            <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Выручка" value={`${stats.todayRevenue.toLocaleString('ru-RU')} ₽`} />
            <StatCard icon={<Users className="w-4 h-4" />} label="Конверсия" value={`${stats.conversion}%`} />
            <StatCard icon={<MessageSquare className="w-4 h-4" />} label="За неделю" value={stats.weekBookings} />
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-lg mb-3">Последние заявки</h2>
          <div className="space-y-2">
            {recent.map((item, i) => (
              <div key={i} className="rounded-2xl bg-surface/50 border border-white/10 px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-[12px] text-white/50">{item.service}</div>
                </div>
                <div className="text-[11px] text-white/40">{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-accent/10 border border-accent/20 p-4">
          <div className="flex items-center gap-2 text-accent font-bold text-sm mb-2">
            <Lock className="w-4 h-4" /> Тариф Business
          </div>
          <p className="text-[13px] text-white/70 leading-relaxed">
            В реальной версии здесь будет полноценная CRM: аналитика, история клиентов, напоминания и интеграция с WhatsApp.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-surface/50 border border-white/10 p-4">
      <div className="flex items-center gap-2 text-white/50 text-[12px] mb-2">{icon}{label}</div>
      <div className="font-display font-bold text-xl tracking-tight">{value}</div>
    </div>
  );
}
