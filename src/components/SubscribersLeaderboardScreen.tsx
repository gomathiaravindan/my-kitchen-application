import React from 'react';
import {
  Trophy,
  Flame,
  Award,
  Medal,
  Calendar,
  Sparkles,
  Phone,
  MapPin,
  Heart,
  CheckCircle,
} from 'lucide-react';
import { Subscriber } from '../types';
import { sampleSubscribers } from '../data/initialData';

export const SubscribersLeaderboardScreen: React.FC = () => {
  // Sort by streak days descending
  const sortedSubscribers = [...sampleSubscribers].sort((a, b) => b.streakDays - a.streakDays);

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shadow-xs"
          style={{ backgroundColor: '#FEF3C7', color: '#B45309', border: '1.5px solid #F59E0B' }}
          title="Rank #1 Gold Champion"
        >
          🥇
        </div>
      );
    }
    if (index === 1) {
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shadow-xs"
          style={{ backgroundColor: '#F1F5F9', color: '#475569', border: '1.5px solid #94A3B8' }}
          title="Rank #2 Silver"
        >
          🥈
        </div>
      );
    }
    if (index === 2) {
      return (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shadow-xs"
          style={{ backgroundColor: '#FEF2F2', color: '#991B1B', border: '1.5px solid #F87171' }}
          title="Rank #3 Bronze"
        >
          🥉
        </div>
      );
    }
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
        style={{ backgroundColor: 'var(--surface-container)', color: 'var(--on-surface-variant)' }}
      >
        #{index + 1}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-tone)' }}>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'var(--secondary-fixed)', color: 'var(--secondary-dark)' }}
            >
              Loyalty & Habit Community
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
              · Wholesome Meals Streak
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1" style={{ color: 'var(--on-surface)' }}>
            Customer Tiffin Streaks & Leaderboard
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>
            Celebrating regulars who choose clean, homestyle cooking over greasy takeout every single day.
          </p>
        </div>

        <div
          className="p-3 rounded-xl border flex items-center gap-3 shrink-0"
          style={{ backgroundColor: '#FFFDF9', borderColor: 'var(--secondary)' }}
        >
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold block" style={{ color: 'var(--on-surface-variant)' }}>
              Collective Streak
            </span>
            <span className="text-xl font-extrabold" style={{ color: 'var(--primary)' }}>
              1,420+ Meals
            </span>
          </div>
        </div>
      </div>

      {/* Podium Highlight for Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedSubscribers.slice(0, 3).map((sub, idx) => {
          const rankTitles = ['Champion Diner', 'Runner Up', 'Third Star'];
          return (
            <div
              key={sub.id}
              className="p-4 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all hover:shadow-md"
              style={{
                backgroundColor: idx === 0 ? '#FFFDF9' : 'var(--surface-container-lowest)',
                borderColor: idx === 0 ? 'var(--secondary)' : 'var(--border-tone)',
                boxShadow: 'var(--shadow-level-1)',
              }}
            >
              {idx === 0 && (
                <div
                  className="absolute top-0 right-0 px-3 py-0.5 rounded-bl-xl text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ backgroundColor: 'var(--secondary)', color: '#ffffff' }}
                >
                  Leader
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {getRankBadge(idx)}
                  <div>
                    <h4 className="font-extrabold text-base leading-tight" style={{ color: 'var(--on-surface)' }}>
                      {sub.name}
                    </h4>
                    <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--primary)' }}>
                      #{sub.tiffinId}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t space-y-1 text-xs" style={{ borderColor: 'var(--border-tone)' }}>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'var(--on-surface-variant)' }}>Habit Streak:</span>
                    <span className="font-extrabold text-sm text-amber-600 flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-amber-500" />
                      {sub.streakDays} Days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: 'var(--on-surface-variant)' }}>Plan:</span>
                    <span className="font-semibold" style={{ color: 'var(--on-surface)' }}>
                      {sub.plan}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="mt-3 p-2 rounded-xl text-[11px] font-medium flex items-center gap-1.5"
                style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface-variant)' }}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                <span>Unlocked: Ghee Phulka & Sweet box bonus</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Leaderboard List */}
      <div
        className="rounded-2xl border overflow-hidden shadow-xs"
        style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-lowest)' }}
      >
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)' }}>
          <h3 className="font-bold text-sm" style={{ color: 'var(--on-surface)' }}>
            All Active Regulars Roster
          </h3>
          <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
            Showing 8 of 45 regular tiffins
          </span>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--border-tone)' }}>
          {sortedSubscribers.map((sub, index) => (
            <div
              key={sub.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-black/1 transition-colors"
              style={{
                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAF6F0',
              }}
            >
              <div className="flex items-center gap-3">
                {getRankBadge(index)}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: 'var(--on-surface)' }}>
                      {sub.name}
                    </span>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md" style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--primary)' }}>
                      #{sub.tiffinId}
                    </span>
                  </div>
                  <div className="text-xs flex items-center gap-2 mt-0.5" style={{ color: 'var(--on-surface-variant)' }}>
                    <span>{sub.dietaryNote}</span>
                    <span>·</span>
                    <span>{sub.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <div className="text-xs font-extrabold text-amber-600 flex items-center justify-end gap-1">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    {sub.streakDays} Consecutive Days
                  </div>
                  <div className="text-[11px]" style={{ color: 'var(--on-surface-variant)' }}>
                    {sub.plan}
                  </div>
                </div>

                <div
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: sub.isLunchConfirmed ? 'var(--tertiary-fixed)' : 'var(--error-container)',
                    color: sub.isLunchConfirmed ? 'var(--tertiary-dark)' : 'var(--on-error-container)',
                  }}
                >
                  {sub.isLunchConfirmed ? 'Active Today' : 'Skipped Today'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
