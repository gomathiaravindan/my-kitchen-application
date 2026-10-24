import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
  ChefHat,
  BellRing,
  Smartphone,
  ShieldCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { DailyMenuData } from '../types';

interface BroadcastPreviewScreenProps {
  menuData: DailyMenuData;
  onBackToEdit: () => void;
}

export const BroadcastPreviewScreen: React.FC<BroadcastPreviewScreenProps> = ({
  menuData,
  onBackToEdit,
}) => {
  const [copied, setCopied] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<'none' | 'confirmed' | 'skipped'>('none');

  const formattedWhatsAppText = `*🍛 ANNAPURNA RASOI · TODAY'S ${menuData.shift.toUpperCase()} MENU (${menuData.dateLabel})*
_Handcrafted with pure ghee & motherly warmth_

🥘 *Main Curries & Dal:*
${menuData.mainCurries}

🫓 *Breads & Grains:*
${menuData.breadsGrains}

🥗 *Salad & Accompaniments:*
${menuData.specialNote}

⏰ *Cutoff Deadline:* ${menuData.cutoffTime} (Confirmation required for dispatch)
🚚 *Dispatch Time:* ${menuData.dispatchTime}
💰 *Standard Rate:* ₹${menuData.standardMealRate}/tiffin

👉 *Reply 1 to CONFIRM your tiffin*
👉 *Reply 0 to SKIP today*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedWhatsAppText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-tone)' }}>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'var(--primary-fixed)', color: 'var(--primary)' }}
            >
              Subscriber Broadcast Hub
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
              · 45 Recipients Queued
            </span>
          </div>
          <h2 className="text-2xl font-bold mt-1" style={{ color: 'var(--on-surface)' }}>
            Live Menu Broadcast Preview
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToEdit}
            className="px-4 py-2 rounded-xl text-xs font-bold border transition-colors hover:bg-black/5"
            style={{ borderColor: 'var(--border-tone)', color: 'var(--on-surface)' }}
          >
            ← Edit Menu
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied WhatsApp Text!' : 'Copy WhatsApp Text'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Menu Broadcast Card (Styled per design specification) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--on-surface)' }}>
              <ChefHat className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
              Menu Broadcast Card (Customer Web View)
            </h3>
            <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
              Parchment elevated card
            </span>
          </div>

          <div
            className="rounded-2xl p-5 border-2 transition-all space-y-4 shadow-sm"
            style={{
              backgroundColor: '#FFFDF9',
              borderColor: 'var(--secondary)',
              boxShadow: 'var(--shadow-level-2)',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-tone)' }}>
              <div>
                <span
                  className="text-[11px] font-extrabold uppercase tracking-widest block"
                  style={{ color: 'var(--primary)' }}
                >
                  ANNAPURNA RASOI · {menuData.shift.toUpperCase()}
                </span>
                <h4 className="text-xl font-extrabold mt-0.5" style={{ color: 'var(--on-surface)' }}>
                  Today&apos;s Tiffin Feast
                </h4>
                <p className="text-xs italic mt-0.5" style={{ color: 'var(--outline)' }}>
                  &ldquo;Nourishing, slow-simmered homestyle cooking made with fresh stone-ground spices.&rdquo;
                </p>
              </div>

              <div
                className="px-3 py-1 rounded-xl text-center shrink-0 border"
                style={{ backgroundColor: 'var(--surface-container-low)', borderColor: 'var(--border-tone)' }}
              >
                <span className="text-[10px] block font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
                  Dispatch
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
                  {menuData.dispatchTime}
                </span>
              </div>
            </div>

            {/* Photo if available */}
            {menuData.photoUrl && (
              <div className="rounded-xl overflow-hidden relative shadow-xs">
                <img
                  src={menuData.photoUrl}
                  alt="Today's Meal"
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Freshly Prepared Today
                </div>
              </div>
            )}

            {/* Segregated Content Rows */}
            <div className="space-y-3 pt-1">
              {/* Dal & Gravy */}
              <div
                className="p-3 rounded-xl border flex items-start gap-3"
                style={{ backgroundColor: '#ffffff', borderColor: 'var(--border-tone)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--primary)' }}
                >
                  🥘
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
                    Main Curries & Dal
                  </span>
                  <p className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
                    {menuData.mainCurries}
                  </p>
                </div>
              </div>

              {/* Breads & Grains */}
              <div
                className="p-3 rounded-xl border flex items-start gap-3"
                style={{ backgroundColor: '#ffffff', borderColor: 'var(--border-tone)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--secondary-fixed)', color: 'var(--secondary-dark)' }}
                >
                  🫓
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--secondary)' }}>
                    Breads, Grains & Accompaniments
                  </span>
                  <p className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
                    {menuData.breadsGrains}
                  </p>
                </div>
              </div>

              {/* Dessert / Salad */}
              <div
                className="p-3 rounded-xl border flex items-start gap-3"
                style={{ backgroundColor: '#ffffff', borderColor: 'var(--border-tone)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--tertiary-fixed)', color: 'var(--tertiary-dark)' }}
                >
                  🥗
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--tertiary)' }}>
                    Special Note, Sweet or Salad
                  </span>
                  <p className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
                    {menuData.specialNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Cutoff Warning Strip */}
            <div
              className="p-3 rounded-xl border flex items-center justify-between text-xs"
              style={{ backgroundColor: 'var(--surface-container-low)', borderColor: 'var(--border-tone)' }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
                <span>
                  Confirm by <strong>{menuData.cutoffTime}</strong> for kitchen prep.
                </span>
              </div>
              <span className="font-extrabold text-sm" style={{ color: 'var(--primary)' }}>
                ₹{menuData.standardMealRate}
              </span>
            </div>

            {/* Interactive Simulation for Diner Action */}
            <div className="pt-2 border-t space-y-2" style={{ borderColor: 'var(--border-tone)' }}>
              <div className="text-xs font-semibold text-center" style={{ color: 'var(--on-surface-variant)' }}>
                Customer Response Simulator
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSimulatedResponse('confirmed')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    simulatedResponse === 'confirmed'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-300'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  Confirm My Tiffin
                </button>
                <button
                  onClick={() => setSimulatedResponse('skipped')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    simulatedResponse === 'skipped'
                      ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                      : 'bg-white hover:bg-rose-50 text-rose-800 border-rose-300'
                  }`}
                >
                  Skip Today
                </button>
              </div>

              {simulatedResponse === 'confirmed' && (
                <p className="text-[11px] text-center text-emerald-700 font-semibold animate-in fade-in">
                  ✓ Tiffin confirmed! Your hot meal will dispatch at {menuData.dispatchTime}.
                </p>
              )}
              {simulatedResponse === 'skipped' && (
                <p className="text-[11px] text-center text-rose-700 font-semibold animate-in fade-in">
                  ✓ Recorded as skipped. No charges deducted for today.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: WhatsApp Chat Bubble Simulation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--on-surface)' }}>
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Automated WhatsApp Group & DM Push
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Ready to Send
            </span>
          </div>

          <div className="rounded-2xl border p-4 bg-[#e5ddd5] shadow-inner space-y-3">
            <div className="text-center">
              <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-md text-stone-600 font-medium shadow-2xs">
                TODAY · 09:30 AM
              </span>
            </div>

            {/* WhatsApp Message Bubble */}
            <div className="max-w-[92%] bg-[#dcf8c6] p-3.5 rounded-2xl rounded-tl-xs shadow-sm space-y-2 text-stone-900 text-xs">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1">
                  🍛 Annapurna Rasoi Kitchen
                </span>
                <span className="text-[10px] text-stone-500">09:30 AM</span>
              </div>

              <p className="font-extrabold text-sm text-stone-900">
                Today&apos;s {menuData.shift === 'lunch' ? 'Lunch' : 'Dinner'} Menu is Live! 🌿
              </p>

              <div className="space-y-1 bg-white/60 p-2.5 rounded-xl border border-emerald-900/10">
                <p className="font-semibold text-stone-800">
                  <span className="text-amber-800 font-bold">Curry:</span> {menuData.mainCurries}
                </p>
                <p className="font-semibold text-stone-800">
                  <span className="text-amber-800 font-bold">Roti & Rice:</span> {menuData.breadsGrains}
                </p>
                <p className="font-semibold text-stone-800">
                  <span className="text-amber-800 font-bold">Sides:</span> {menuData.specialNote}
                </p>
              </div>

              <div className="pt-1 text-[11px] text-stone-700 space-y-0.5">
                <p>⏰ <strong>Deadline:</strong> Confirm by <strong>{menuData.cutoffTime}</strong></p>
                <p>🚚 <strong>Dispatch:</strong> {menuData.dispatchTime}</p>
                <p>💰 <strong>Rate:</strong> ₹{menuData.standardMealRate} per tiffin box</p>
              </div>

              <div className="pt-1 border-t border-emerald-900/10 flex items-center justify-between text-[11px] text-emerald-900 font-semibold">
                <span>Reply 1 for YES · Reply 0 to SKIP</span>
                <span className="text-stone-400">✓✓</span>
              </div>
            </div>

            {/* Broadcast Metrics Card */}
            <div className="bg-white/95 backdrop-blur-xs rounded-xl p-3 border border-stone-300 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Instant Broadcast Status
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">100% Delivery Queue</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="font-extrabold text-stone-800 text-sm">45</div>
                  <div className="text-[10px] text-stone-500">Recipients</div>
                </div>
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="font-extrabold text-emerald-700 text-sm">WhatsApp</div>
                  <div className="text-[10px] text-stone-500">API Gateway</div>
                </div>
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="font-extrabold text-amber-700 text-sm">30 min</div>
                  <div className="text-[10px] text-stone-500">Alert Buffer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
