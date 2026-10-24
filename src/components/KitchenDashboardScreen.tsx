import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Truck,
  Flame,
  Search,
  Filter,
  ArrowUpRight,
  Sparkles,
  ChefHat,
  Timer,
  ShoppingBag,
} from 'lucide-react';
import { DailyMenuData, Subscriber } from '../types';
import { sampleSubscribers } from '../data/initialData';

interface KitchenDashboardScreenProps {
  menuData: DailyMenuData;
  onPostNewMenu: () => void;
}

export const KitchenDashboardScreen: React.FC<KitchenDashboardScreenProps> = ({
  menuData,
  onPostNewMenu,
}) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(sampleSubscribers);
  const [filterType, setFilterType] = useState<'all' | 'confirmed' | 'skipped'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSubscriberMeal = (id: string) => {
    setSubscribers((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          return {
            ...sub,
            isLunchConfirmed: !sub.isLunchConfirmed,
          };
        }
        return sub;
      })
    );
  };

  const confirmedCount = subscribers.filter((s) => s.isLunchConfirmed).length;
  const skippedCount = subscribers.filter((s) => !s.isLunchConfirmed).length;
  const totalCount = subscribers.length;

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesFilter =
      filterType === 'all'
        ? true
        : filterType === 'confirmed'
        ? sub.isLunchConfirmed
        : !sub.isLunchConfirmed;
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.tiffinId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.dietaryNote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Header & Shift Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-tone)' }}>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'var(--primary-fixed)', color: 'var(--primary)' }}
            >
              Annapurna Rasoi · Operations
            </span>

            {/* Lunch Live Badge with 6px status dot */}
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border"
              style={{
                backgroundColor: menuData.shift === 'lunch' ? '#FEF6E9' : '#FAECE8',
                borderColor: menuData.shift === 'lunch' ? 'var(--secondary)' : 'var(--primary)',
                color: menuData.shift === 'lunch' ? 'var(--secondary-dark)' : 'var(--primary-dark)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
              <span>Active {menuData.shift === 'lunch' ? 'Lunch Shift' : 'Dinner Shift'}</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1" style={{ color: 'var(--on-surface)' }}>
            Kitchen Dispatch & Tiffin Roster
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <div
            className="px-4 py-2 rounded-xl border flex items-center gap-2 text-xs"
            style={{ backgroundColor: 'var(--surface-container-low)', borderColor: 'var(--border-tone)' }}
          >
            <Timer className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
            <div>
              <span className="block text-[10px] uppercase font-bold" style={{ color: 'var(--on-surface-variant)' }}>
                Cutoff Deadline
              </span>
              <span className="font-extrabold text-xs" style={{ color: 'var(--primary)' }}>
                {menuData.cutoffTime} (Prep Locked)
              </span>
            </div>
          </div>

          <button
            onClick={onPostNewMenu}
            className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-105 active:scale-95 transition-all"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
          >
            <ChefHat className="w-4 h-4" />
            <span>Update Menu</span>
          </button>
        </div>
      </div>

      {/* Operational Metric Cards (36px, 800 weight as specified in design system) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Confirmed Meals */}
        <div
          className="p-4 sm:p-5 rounded-2xl border transition-all"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--tertiary)' }}
            >
              {confirmedCount}
            </span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"
              style={{ backgroundColor: 'var(--tertiary-fixed)', color: 'var(--tertiary-dark)' }}
            >
              <ArrowUpRight className="w-3 h-3" />
              +12% vs y&apos;day
            </span>
          </div>
          <p className="text-xs font-bold mt-2" style={{ color: 'var(--on-surface)' }}>
            Confirmed Tiffins
          </p>
          <span className="text-[11px]" style={{ color: 'var(--on-surface-variant)' }}>
            Cooking in progress
          </span>
        </div>

        {/* Metric 2: Opted Out / Skipped */}
        <div
          className="p-4 sm:p-5 rounded-2xl border transition-all"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--error-muted)' }}
            >
              {skippedCount}
            </span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'var(--error-container)', color: 'var(--on-error-container)' }}
            >
              Saved Food
            </span>
          </div>
          <p className="text-xs font-bold mt-2" style={{ color: 'var(--on-surface)' }}>
            Skipped / Opted Out
          </p>
          <span className="text-[11px]" style={{ color: 'var(--on-surface-variant)' }}>
            Zero food wastage
          </span>
        </div>

        {/* Metric 3: Active Subscribers */}
        <div
          className="p-4 sm:p-5 rounded-2xl border transition-all"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--secondary)' }}
            >
              {totalCount}
            </span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'var(--secondary-fixed)', color: 'var(--secondary-dark)' }}
            >
              45 Regulars
            </span>
          </div>
          <p className="text-xs font-bold mt-2" style={{ color: 'var(--on-surface)' }}>
            Total Registered
          </p>
          <span className="text-[11px]" style={{ color: 'var(--on-surface-variant)' }}>
            94% confirmation rate
          </span>
        </div>

        {/* Metric 4: Dispatch Target */}
        <div
          className="p-4 sm:p-5 rounded-2xl border transition-all"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: 'var(--primary)' }}
            >
              {menuData.dispatchTime}
            </span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'var(--primary-fixed)', color: 'var(--primary)' }}
            >
              In 1h 45m
            </span>
          </div>
          <p className="text-xs font-bold mt-2" style={{ color: 'var(--on-surface)' }}>
            Dabba Delivery Departure
          </p>
          <span className="text-[11px]" style={{ color: 'var(--on-surface-variant)' }}>
            Dabbawala / Dunzo pickup
          </span>
        </div>
      </div>

      {/* Live Today's Cooking Summary Box */}
      <div
        className="p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          borderColor: 'var(--secondary)',
          backgroundColor: '#FFFDF9',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--secondary-fixed)', color: 'var(--secondary-dark)' }}
          >
            <Flame className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider block" style={{ color: 'var(--primary)' }}>
              On The Stove Right Now ({menuData.shift.toUpperCase()})
            </span>
            <h4 className="font-bold text-sm sm:text-base" style={{ color: 'var(--on-surface)' }}>
              {menuData.mainCurries}
            </h4>
            <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
              Accompaniments: {menuData.breadsGrains} · {menuData.specialNote}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
            Plate Batch Count:
          </span>
          <span
            className="px-3 py-1 rounded-lg text-sm font-extrabold"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
          >
            {confirmedCount} Handis
          </span>
        </div>
      </div>

      {/* Search and Filters for Subscribers */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold" style={{ color: 'var(--on-surface)' }}>
              Tiffin Box Dispatch Sheet
            </h3>
            <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
              ({filteredSubscribers.length} shown)
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div
              className="px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs bg-white shadow-2xs"
              style={{ borderColor: 'var(--border-tone)' }}
            >
              <Search className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search tiffin # or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-36 sm:w-48 text-xs font-medium"
                style={{ color: 'var(--on-surface)' }}
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 rounded-xl border bg-white shadow-2xs" style={{ borderColor: 'var(--border-tone)' }}>
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'all' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('confirmed')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'confirmed' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Confirmed ({confirmedCount})
              </button>
              <button
                onClick={() => setFilterType('skipped')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'skipped' ? 'bg-rose-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Skipped ({skippedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Subscriber Rows List */}
        <div
          className="rounded-2xl border overflow-hidden shadow-xs"
          style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-lowest)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-[11px] font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface-variant)' }}>
                  <th className="py-3 px-4">Tiffin Box #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Dietary Customization</th>
                  <th className="py-3 px-4">Delivery Address</th>
                  <th className="py-3 px-4 text-center">Affirmative Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs" style={{ borderColor: 'var(--border-tone)' }}>
                {filteredSubscribers.map((sub, idx) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-black/1 transition-colors"
                    style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'var(--surface-container-low)' }}
                  >
                    {/* Tiffin ID */}
                    <td className="py-3 px-4 font-mono font-extrabold" style={{ color: 'var(--primary)' }}>
                      #{sub.tiffinId}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-sm" style={{ color: 'var(--on-surface)' }}>
                        {sub.name}
                      </div>
                      <div className="text-[11px] flex items-center gap-1" style={{ color: 'var(--on-surface-variant)' }}>
                        <span>{sub.phone}</span>
                        <span>·</span>
                        <span className="text-amber-700 font-semibold flex items-center gap-0.5">
                          🔥 {sub.streakDays}d
                        </span>
                      </div>
                    </td>

                    {/* Dietary Note */}
                    <td className="py-3 px-4">
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold inline-block"
                        style={{
                          backgroundColor: sub.dietaryNote.includes('Jain')
                            ? '#FEF3C7'
                            : 'var(--surface-container)',
                          color: sub.dietaryNote.includes('Jain') ? '#92400E' : 'var(--on-surface)',
                        }}
                      >
                        {sub.dietaryNote}
                      </span>
                    </td>

                    {/* Address */}
                    <td className="py-3 px-4 max-w-xs truncate" style={{ color: 'var(--on-surface-variant)' }}>
                      {sub.address}
                    </td>

                    {/* Affirmative Toggle Button (Yes/No) from Design Spec */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center rounded-xl p-0.5 border" style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)' }}>
                        <button
                          type="button"
                          onClick={() => !sub.isLunchConfirmed && toggleSubscriberMeal(sub.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            sub.isLunchConfirmed
                              ? 'shadow-xs'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                          style={{
                            backgroundColor: sub.isLunchConfirmed ? 'var(--tertiary)' : 'transparent',
                            color: sub.isLunchConfirmed ? 'var(--on-tertiary)' : 'var(--on-surface-variant)',
                          }}
                        >
                          Yes · Prep
                        </button>
                        <button
                          type="button"
                          onClick={() => sub.isLunchConfirmed && toggleSubscriberMeal(sub.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            !sub.isLunchConfirmed
                              ? 'shadow-xs'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                          style={{
                            backgroundColor: !sub.isLunchConfirmed ? 'var(--error-muted)' : 'transparent',
                            color: !sub.isLunchConfirmed ? '#ffffff' : 'var(--on-surface-variant)',
                          }}
                        >
                          Skip
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
