/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Share2,
  ChefHat,
  Trophy,
  Sliders,
  Smartphone,
  Monitor,
  CheckCircle2,
  Sparkles,
  Info,
  Calendar,
  Send,
  MessageCircle,
} from 'lucide-react';
import { DailyMenuData, DishPreset, ThemePreset } from './types';
import { initialMenuData } from './data/initialData';
import { PostDailyMenuScreen } from './components/PostDailyMenuScreen';
import { BroadcastPreviewScreen } from './components/BroadcastPreviewScreen';
import { KitchenDashboardScreen } from './components/KitchenDashboardScreen';
import { SubscribersLeaderboardScreen } from './components/SubscribersLeaderboardScreen';
import { FavoritesModal } from './components/FavoritesModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { applyTheme } from './theme/themeConfig';

type ActiveTab = 'post-menu' | 'broadcast' | 'kitchen' | 'subscribers';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('post-menu');
  const [menuData, setMenuData] = useState<DailyMenuData>(initialMenuData);
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>('terracotta');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateMenu = (updated: Partial<DailyMenuData>) => {
    setMenuData((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectPreset = (preset: DishPreset) => {
    setMenuData((prev) => ({
      ...prev,
      mainCurries: preset.mainCurries,
      breadsGrains: preset.breadsGrains,
      specialNote: preset.specialNote,
      standardMealRate: preset.rate,
      photoUrl: preset.imageUrl || prev.photoUrl,
    }));
    showToast(`Loaded "${preset.name}" preset!`);
  };

  const handlePublish = () => {
    setShowPublishSuccess(true);
  };

  const handleSaveDraft = () => {
    showToast('Menu draft saved securely to local cache.');
  };

  const handleScheduleLater = () => {
    showToast('Menu scheduled for automatic publish at 08:30 AM.');
  };

  return (
    <div
      className="min-h-screen theme-transition flex flex-col"
      style={{
        backgroundColor: 'var(--surface)',
        color: 'var(--on-surface)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Top Application Workspace Navigation Bar */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md px-4 sm:px-6 py-3 transition-colors"
        style={{
          borderColor: 'var(--border-tone)',
          backgroundColor: 'rgba(255, 248, 245, 0.92)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand & Kicker */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-xs"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
              >
                🍲
              </div>
              <div>
                <span
                  className="text-[10px] font-extrabold uppercase tracking-widest block leading-none"
                  style={{ color: 'var(--primary)' }}
                >
                  Homely Bites Design System
                </span>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-tight block">
                  Annapurna Rasoi
                </span>
              </div>
            </div>

            {/* Mobile quick actions for small viewports */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                onClick={() => setIsThemeCustomizerOpen(true)}
                className="p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 shadow-2xs"
                style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)' }}
                title="Customize CSS Variables"
              >
                <Sliders className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              </button>
            </div>
          </div>

          {/* Navigation Screen Switcher Tabs */}
          <nav
            className="flex items-center p-1 rounded-xl border overflow-x-auto scrollbar-none shadow-2xs self-center"
            style={{
              borderColor: 'var(--border-tone)',
              backgroundColor: 'var(--surface-container-low)',
            }}
          >
            <button
              onClick={() => setCurrentTab('post-menu')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'post-menu'
                  ? 'shadow-xs'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: currentTab === 'post-menu' ? 'var(--primary)' : 'transparent',
                color: currentTab === 'post-menu' ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              }}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Post Daily Menu</span>
            </button>

            <button
              onClick={() => setCurrentTab('broadcast')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'broadcast'
                  ? 'shadow-xs'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: currentTab === 'broadcast' ? 'var(--primary)' : 'transparent',
                color: currentTab === 'broadcast' ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              }}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Broadcast & WhatsApp</span>
            </button>

            <button
              onClick={() => setCurrentTab('kitchen')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'kitchen'
                  ? 'shadow-xs'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: currentTab === 'kitchen' ? 'var(--primary)' : 'transparent',
                color: currentTab === 'kitchen' ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              }}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Kitchen Dispatch</span>
            </button>

            <button
              onClick={() => setCurrentTab('subscribers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'subscribers'
                  ? 'shadow-xs'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: currentTab === 'subscribers' ? 'var(--primary)' : 'transparent',
                color: currentTab === 'subscribers' ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              }}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Streaks Leaderboard</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="hidden md:flex items-center gap-2">
            {/* Viewport Frame Toggle (Mobile App Container vs Responsive) */}
            <div
              className="flex items-center p-1 rounded-xl border text-xs bg-white shadow-2xs"
              style={{ borderColor: 'var(--border-tone)' }}
            >
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 font-semibold ${
                  viewMode === 'mobile' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Mobile App Frame (Exact screenshot view)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[11px]">Mobile View</span>
              </button>
              <button
                onClick={() => setViewMode('responsive')}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 font-semibold ${
                  viewMode === 'responsive' ? 'bg-stone-900 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Expanded Responsive View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-[11px]">Desktop</span>
              </button>
            </div>

            {/* CSS Variables / Theme Customizer Button */}
            <button
              onClick={() => setIsThemeCustomizerOpen(true)}
              className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-black/2 active:scale-95 transition-all"
              style={{
                borderColor: 'var(--border-tone)',
                backgroundColor: 'var(--surface-container-low)',
                color: 'var(--on-surface)',
              }}
            >
              <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
              <span>CSS Variables</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Screen Container */}
      <div className="flex-1 py-4 sm:py-6 px-2 sm:px-4">
        {currentTab === 'post-menu' ? (
          viewMode === 'mobile' ? (
            /* Smartphone device frame for exact fidelity with user screenshot */
            <div className="flex flex-col items-center justify-center">
              <div
                className="w-full max-w-[420px] rounded-3xl overflow-hidden border-4 shadow-2xl relative transition-all"
                style={{
                  borderColor: 'var(--border-tone)',
                  backgroundColor: 'var(--surface)',
                  boxShadow: 'var(--shadow-level-3)',
                }}
              >
                {/* Simulated mobile status notch */}
                <div
                  className="h-5 px-6 flex items-center justify-between text-[10px] font-bold select-none border-b"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border-tone)',
                    color: 'var(--outline)',
                  }}
                >
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                <PostDailyMenuScreen
                  menuData={menuData}
                  onUpdateMenu={handleUpdateMenu}
                  onOpenFavorites={() => setIsFavoritesOpen(true)}
                  onPublish={handlePublish}
                  onSaveDraft={handleSaveDraft}
                  onScheduleLater={handleScheduleLater}
                  onBack={() => showToast('Returned to main dashboard')}
                />
              </div>
            </div>
          ) : (
            /* Responsive layout */
            <div className="max-w-2xl mx-auto rounded-3xl border shadow-lg overflow-hidden" style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface)' }}>
              <PostDailyMenuScreen
                menuData={menuData}
                onUpdateMenu={handleUpdateMenu}
                onOpenFavorites={() => setIsFavoritesOpen(true)}
                onPublish={handlePublish}
                onSaveDraft={handleSaveDraft}
                onScheduleLater={handleScheduleLater}
                onBack={() => showToast('Returned to main dashboard')}
              />
            </div>
          )
        ) : currentTab === 'broadcast' ? (
          <BroadcastPreviewScreen
            menuData={menuData}
            onBackToEdit={() => setCurrentTab('post-menu')}
          />
        ) : currentTab === 'kitchen' ? (
          <KitchenDashboardScreen
            menuData={menuData}
            onPostNewMenu={() => setCurrentTab('post-menu')}
          />
        ) : (
          <SubscribersLeaderboardScreen />
        )}
      </div>

      {/* Floating Quick Action Drawer / Tokens Banner */}
      <div
        className="border-t py-2.5 px-4 text-xs"
        style={{
          borderColor: 'var(--border-tone)',
          backgroundColor: 'var(--surface-container-low)',
          color: 'var(--on-surface-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: 'var(--primary)' }}
            />
            <span>
              <strong>Reusability Note:</strong> All styling references native CSS variables (<code>--primary</code>, <code>--surface</code>, <code>--radius-lg</code>). Easily pluggable into any Next.js, Vite, or React application.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsThemeCustomizerOpen(true)}
              className="font-bold underline hover:opacity-80 cursor-pointer"
              style={{ color: 'var(--primary)' }}
            >
              Open CSS Token Inspector
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="font-bold underline hover:opacity-80 cursor-pointer"
              style={{ color: 'var(--secondary)' }}
            >
              Recipe Presets
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Theme & CSS Variables Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(t) => setCurrentTheme(t)}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className="px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-xs font-bold"
            style={{
              backgroundColor: 'var(--inverse-surface)',
              color: 'var(--inverse-on-surface)',
              borderColor: 'var(--outline)',
            }}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Publish Menu Success Dialog */}
      {showPublishSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="w-full max-w-md p-6 rounded-3xl border shadow-2xl text-center space-y-4"
            style={{ backgroundColor: 'var(--surface-container-lowest)', borderColor: 'var(--border-tone)' }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm"
              style={{ backgroundColor: 'var(--primary-fixed)', color: 'var(--primary)' }}
            >
              ✨
            </div>

            <div className="space-y-1">
              <span
                className="text-[11px] font-extrabold uppercase tracking-widest block"
                style={{ color: 'var(--primary)' }}
              >
                Dispatched Successfully
              </span>
              <h3 className="text-xl font-extrabold" style={{ color: 'var(--on-surface)' }}>
                Menu Broadcasted!
              </h3>
              <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                Today&apos;s special menu has been sent to all <strong>{menuData.activeRegularsCount} Active Regulars</strong> via WhatsApp & push alerts.
              </p>
            </div>

            <div
              className="p-3.5 rounded-2xl border text-left space-y-1.5 text-xs"
              style={{ backgroundColor: 'var(--surface-container-low)', borderColor: 'var(--border-tone)' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-600">Cutoff Confirmation:</span>
                <span className="font-bold text-stone-900">{menuData.cutoffTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-600">Kitchen Dispatch:</span>
                <span className="font-bold text-stone-900">{menuData.dispatchTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-600">Standard Rate:</span>
                <span className="font-bold text-stone-900">₹{menuData.standardMealRate} / tiffin</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowPublishSuccess(false);
                  setCurrentTab('broadcast');
                }}
                className="py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5"
                style={{ borderColor: 'var(--border-tone)', color: 'var(--on-surface)' }}
              >
                <Share2 className="w-3.5 h-3.5" />
                View Broadcast
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPublishSuccess(false);
                  setCurrentTab('kitchen');
                }}
                className="py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
              >
                <ChefHat className="w-3.5 h-3.5" />
                Kitchen Monitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
