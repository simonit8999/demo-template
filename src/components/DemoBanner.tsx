interface Props {
  businessName: string;
  onOpenOwnerCabinet: () => void;
}

export default function DemoBanner({ businessName, onOpenOwnerCabinet }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-4 pt-safe pointer-events-none">
      <div className="mt-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 flex items-center justify-between gap-3 pointer-events-auto shadow-lg">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-accent font-bold">
            Демо-версия
          </div>
          <div className="text-[13px] font-medium truncate text-white">
            Так будут видеть сайт клиенты «{businessName}»
          </div>
        </div>
        <button
          onClick={onOpenOwnerCabinet}
          className="shrink-0 h-9 px-4 rounded-full bg-accent text-ink text-[13px] font-bold active:scale-95 transition-transform"
        >
          Кабинет
        </button>
      </div>
    </div>
  );
}
