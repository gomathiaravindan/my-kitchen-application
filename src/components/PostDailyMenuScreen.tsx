import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  X,
  Calendar,
  Sun,
  Moon,
  Clock,
  Utensils,
  Wand2,
  Banknote,
  Camera,
  MessageSquare,
  Send,
  Mail,
  Share2,
  Heart,
  Check,
  Bell,
  Trash2,
  Upload,
  Sparkles,
} from 'lucide-react';
import { DailyMenuData, DishPreset } from '../types';
import { sampleFoodPhotos } from '../data/initialData';

interface PostDailyMenuScreenProps {
  menuData: DailyMenuData;
  onUpdateMenu: (updated: Partial<DailyMenuData>) => void;
  onOpenFavorites: () => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  onScheduleLater: () => void;
  onBack?: () => void;
}

export const PostDailyMenuScreen: React.FC<PostDailyMenuScreenProps> = ({
  menuData,
  onUpdateMenu,
  onOpenFavorites,
  onPublish,
  onSaveDraft,
  onScheduleLater,
  onBack,
}) => {
  const [showCustomCutoffInput, setShowCustomCutoffInput] = useState(false);
  const [customTime, setCustomTime] = useState(menuData.customCutoff || '11:15 AM');
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [rateInput, setRateInput] = useState(menuData.standardMealRate.toString());
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateMenu({ photoUrl: reader.result as string });
        setShowPhotoPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAlertTime = (cutoff: string) => {
    // If "11:00 AM", 30 min before is "10:30 AM"
    if (cutoff.includes('11:00')) return '10:30 AM';
    if (cutoff.includes('10:30')) return '10:00 AM';
    if (cutoff.includes('11:30')) return '11:00 AM';
    if (cutoff.includes('06:00')) return '05:30 PM';
    return `30 minutes before ${cutoff}`;
  };

  return (
    <div
      className="w-full max-w-md mx-auto min-h-screen pb-12 flex flex-col theme-transition shadow-xl relative"
      style={{
        backgroundColor: 'var(--surface)',
        color: 'var(--on-surface)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Top Header Bar */}
      <header
        className="sticky top-0 z-20 px-4 pt-4 pb-3 flex items-center justify-between border-b backdrop-blur-md"
        style={{
          borderColor: 'var(--border-tone)',
          backgroundColor: 'var(--surface)',
        }}
      >
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
          style={{ color: 'var(--on-surface)' }}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <span
            className="text-[11px] font-extrabold tracking-widest uppercase leading-none"
            style={{ color: 'var(--primary)' }}
          >
            ANNAPURNA RASOI
          </span>
          <h1
            className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5 leading-tight"
            style={{ color: 'var(--on-surface)' }}
          >
            Post Daily Menu
          </h1>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
          style={{ color: 'var(--on-surface)' }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Main Form Body */}
      <main className="px-4 py-4 space-y-4 flex-1">
        {/* Choose Day Section */}
        <section className="space-y-2">
          <label className="block text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
            Choose Day
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onUpdateMenu({ day: 'today', dateLabel: 'Oct 24' })}
              className="py-3 px-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
              style={{
                borderColor: menuData.day === 'today' ? 'var(--primary)' : 'var(--border-tone)',
                borderWidth: menuData.day === 'today' ? '1.5px' : '1px',
                backgroundColor:
                  menuData.day === 'today' ? 'var(--surface-container-lowest)' : 'var(--surface-container-low)',
                color: menuData.day === 'today' ? 'var(--primary)' : 'var(--on-surface-variant)',
              }}
            >
              <Calendar
                className="w-4 h-4"
                style={{ color: menuData.day === 'today' ? 'var(--primary)' : 'var(--outline)' }}
              />
              <span>Today – Oct 24</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateMenu({ day: 'tomorrow', dateLabel: 'Oct 25' })}
              className="py-3 px-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
              style={{
                borderColor: menuData.day === 'tomorrow' ? 'var(--primary)' : 'var(--border-tone)',
                borderWidth: menuData.day === 'tomorrow' ? '1.5px' : '1px',
                backgroundColor:
                  menuData.day === 'tomorrow' ? 'var(--surface-container-lowest)' : 'var(--surface-container-low)',
                color: menuData.day === 'tomorrow' ? 'var(--primary)' : 'var(--on-surface-variant)',
              }}
            >
              <Calendar
                className="w-4 h-4"
                style={{ color: menuData.day === 'tomorrow' ? 'var(--primary)' : 'var(--outline)' }}
              />
              <span>Tomorrow – Oct 25</span>
            </button>
          </div>
        </section>

        {/* Meal Shift Section */}
        <section
          className="p-3.5 rounded-2xl border transition-all"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
              Meal Shift
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1"
              style={{
                backgroundColor: 'var(--tertiary-fixed)',
                color: 'var(--tertiary-dark)',
              }}
            >
              Slot Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Lunch Card */}
            <button
              type="button"
              onClick={() => onUpdateMenu({ shift: 'lunch', dispatchTime: '12:30 PM' })}
              className="p-3 rounded-xl border text-center transition-all cursor-pointer relative"
              style={{
                borderColor: menuData.shift === 'lunch' ? 'var(--primary)' : 'var(--border-tone)',
                borderWidth: menuData.shift === 'lunch' ? '1.5px' : '1px',
                backgroundColor:
                  menuData.shift === 'lunch' ? 'var(--surface-container-low)' : 'var(--surface-container-lowest)',
              }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span
                  className="font-bold text-sm"
                  style={{ color: menuData.shift === 'lunch' ? 'var(--primary)' : 'var(--on-surface)' }}
                >
                  Lunch
                </span>
              </div>
              <p className="text-[11px] font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                Dispatch: 12:30 PM
              </p>
            </button>

            {/* Dinner Card */}
            <button
              type="button"
              onClick={() => onUpdateMenu({ shift: 'dinner', dispatchTime: '07:30 PM' })}
              className="p-3 rounded-xl border text-center transition-all cursor-pointer relative"
              style={{
                borderColor: menuData.shift === 'dinner' ? 'var(--primary)' : 'var(--border-tone)',
                borderWidth: menuData.shift === 'dinner' ? '1.5px' : '1px',
                backgroundColor:
                  menuData.shift === 'dinner' ? 'var(--surface-container-low)' : 'var(--surface-container-lowest)',
              }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Moon className="w-4 h-4 text-indigo-500" />
                <span
                  className="font-bold text-sm"
                  style={{ color: menuData.shift === 'dinner' ? 'var(--primary)' : 'var(--on-surface)' }}
                >
                  Dinner
                </span>
              </div>
              <p className="text-[11px] font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                Dispatch: 07:30 PM
              </p>
            </button>
          </div>
        </section>

        {/* Cutoff Confirmation Time */}
        <section
          className="p-3.5 rounded-2xl border transition-all"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
                Cutoff Confirmation Time
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
              Customer deadline
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-2.5">
            {['10:30 AM', '11:00 AM'].map((time) => {
              const isSelected = menuData.cutoffTime === time && !showCustomCutoffInput;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    setShowCustomCutoffInput(false);
                    onUpdateMenu({ cutoffTime: time });
                  }}
                  className="py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border"
                  style={{
                    backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-container-lowest)',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border-tone)',
                    color: isSelected ? 'var(--on-primary)' : 'var(--on-surface)',
                  }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{time}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setShowCustomCutoffInput(!showCustomCutoffInput)}
              className="py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer border"
              style={{
                backgroundColor: showCustomCutoffInput
                  ? 'var(--surface-container-high)'
                  : 'var(--surface-container-lowest)',
                borderColor: showCustomCutoffInput ? 'var(--primary)' : 'var(--border-tone)',
                color: showCustomCutoffInput ? 'var(--primary)' : 'var(--on-surface)',
              }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{showCustomCutoffInput ? 'Editing...' : 'Custom'}</span>
            </button>
          </div>

          {showCustomCutoffInput && (
            <div
              className="p-2.5 rounded-xl border mb-2 flex items-center gap-2"
              style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--surface-container-low)' }}
            >
              <Clock className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <input
                type="text"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                placeholder="e.g. 11:15 AM or 05:00 PM"
                className="flex-1 text-xs bg-transparent border-none outline-none font-medium"
                style={{ color: 'var(--on-surface)' }}
              />
              <button
                type="button"
                onClick={() => {
                  if (customTime.trim()) {
                    onUpdateMenu({ cutoffTime: customTime.trim(), customCutoff: customTime.trim() });
                    setShowCustomCutoffInput(false);
                  }
                }}
                className="px-2.5 py-1 text-xs font-bold rounded-lg"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
              >
                Set
              </button>
            </div>
          )}

          <div className="flex items-start gap-1.5 text-[11px] leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>
            <Bell className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--secondary)' }} />
            <span>
              Auto-cutoff alerts will trigger {calculateAlertTime(menuData.cutoffTime)}.
            </span>
          </div>
        </section>

        {/* Today's Special Dishes Card */}
        <section
          className="p-4 rounded-2xl border transition-all space-y-3.5"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          {/* Section Header with Load Favorites */}
          <div className="flex items-center justify-between pb-1 border-b" style={{ borderColor: 'var(--border-tone)' }}>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <h2 className="text-base font-bold" style={{ color: 'var(--on-surface)' }}>
                Today&apos;s Special Dishes
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenFavorites}
              className="text-xs font-bold flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              style={{ color: 'var(--primary)' }}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Load Favorites</span>
            </button>
          </div>

          {/* Main Curries & Dal */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block" style={{ color: 'var(--on-surface-variant)' }}>
              Main Curries & Dal
            </label>
            <input
              type="text"
              value={menuData.mainCurries}
              onChange={(e) => onUpdateMenu({ mainCurries: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 transition-all"
              style={{
                borderColor: 'var(--border-tone)',
                backgroundColor: 'var(--surface-container-low)',
                color: 'var(--on-surface)',
              }}
              placeholder="e.g. Shahi Paneer Bhurji + Homestyle Dal Tadka"
            />
          </div>

          {/* Breads, Grains & Accompaniments */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block" style={{ color: 'var(--on-surface-variant)' }}>
              Breads, Grains & Accompaniments
            </label>
            <input
              type="text"
              value={menuData.breadsGrains}
              onChange={(e) => onUpdateMenu({ breadsGrains: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 transition-all"
              style={{
                borderColor: 'var(--border-tone)',
                backgroundColor: 'var(--surface-container-low)',
                color: 'var(--on-surface)',
              }}
              placeholder="e.g. 4 Phulkas with Gir Cow Ghee + Steamed Jeera"
            />
          </div>

          {/* Special Note, Sweet or Salad */}
          <div className="space-y-1">
            <label className="text-xs font-semibold block" style={{ color: 'var(--on-surface-variant)' }}>
              Special Note, Sweet or Salad
            </label>
            <input
              type="text"
              value={menuData.specialNote}
              onChange={(e) => onUpdateMenu({ specialNote: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 transition-all"
              style={{
                borderColor: 'var(--border-tone)',
                backgroundColor: 'var(--surface-container-low)',
                color: 'var(--on-surface)',
              }}
              placeholder="e.g. Cucumber Raita + Aam Papad Chutney"
            />
          </div>

          {/* Standard Meal Rate Pill Row */}
          <div
            className="p-3 rounded-xl border flex items-center justify-between transition-colors"
            style={{
              borderColor: 'var(--border-tone)',
              backgroundColor: 'var(--surface-container-low)',
            }}
          >
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--on-surface)' }}>
                Standard Meal Rate:
              </span>
            </div>

            {isEditingRate ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>₹</span>
                <input
                  type="number"
                  value={rateInput}
                  onChange={(e) => setRateInput(e.target.value)}
                  className="w-16 px-2 py-0.5 text-xs font-bold rounded border bg-white outline-none"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const parsed = parseInt(rateInput, 10);
                    if (!isNaN(parsed) && parsed > 0) {
                      onUpdateMenu({ standardMealRate: parsed });
                    }
                    setIsEditingRate(false);
                  }}
                  className="px-2 py-0.5 text-[11px] font-bold rounded"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingRate(true)}
                className="group flex items-center gap-1 hover:opacity-80 transition-opacity"
                title="Click to edit meal rate"
              >
                <span
                  className="text-base font-extrabold tracking-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  ₹{menuData.standardMealRate}
                </span>
                <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                  / tiffin
                </span>
              </button>
            )}
          </div>

          {/* Photo of Today's Cooking (Optional) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold block" style={{ color: 'var(--on-surface-variant)' }}>
                Photo of Today&apos;s Cooking (Optional)
              </label>
              {menuData.photoUrl && (
                <button
                  type="button"
                  onClick={() => onUpdateMenu({ photoUrl: null })}
                  className="text-[11px] font-medium flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>

            {menuData.photoUrl ? (
              <div
                className="relative rounded-xl overflow-hidden border group"
                style={{ borderColor: 'var(--border-tone)' }}
              >
                <img
                  src={menuData.photoUrl}
                  alt="Today's Meal"
                  className="w-full h-40 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPhotoPicker(true)}
                    className="px-3 py-1.5 text-xs font-semibold bg-white text-stone-900 rounded-lg shadow-md hover:bg-stone-100"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setShowPhotoPicker(true)}
                className="p-5 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/2 transition-colors group"
                style={{
                  borderColor: 'var(--outline-variant)',
                  backgroundColor: 'var(--surface-container-lowest)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-2 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--primary)' }}
                >
                  <Camera className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight" style={{ color: 'var(--on-surface)' }}>
                  Add appetizing photo
                </span>
                <span className="text-[11px] mt-0.5" style={{ color: 'var(--on-surface-variant)' }}>
                  Snap straight from the stove or gallery
                </span>
              </div>
            )}

            {/* Photo Selection Drawer / Popover */}
            {showPhotoPicker && (
              <div
                className="p-3 rounded-xl border mt-2 space-y-3"
                style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: 'var(--on-surface)' }}>
                    Choose an appetizing photo
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPhotoPicker(false)}
                    className="text-xs p-1"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {sampleFoodPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onUpdateMenu({ photoUrl: photo.url });
                        setShowPhotoPicker(false);
                      }}
                      className="cursor-pointer group relative rounded-lg overflow-hidden border hover:border-amber-600 transition-all"
                      style={{ borderColor: 'var(--border-tone)' }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-16 object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute inset-x-0 bottom-0 text-[10px] p-1 font-semibold text-white bg-black/60 truncate">
                        {photo.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-1 border-t flex justify-center" style={{ borderColor: 'var(--border-tone)' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 hover:bg-white transition-colors"
                    style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload from your device
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Notify Active Subscribers Card */}
        <section
          className="p-3.5 rounded-2xl border transition-all space-y-2.5"
          style={{
            borderColor: 'var(--border-tone)',
            backgroundColor: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-level-1)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--tertiary-fixed)', color: 'var(--tertiary-dark)' }}
              >
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight" style={{ color: 'var(--on-surface)' }}>
                  Notify Active Subscribers
                </h3>
                <p className="text-[11px]" style={{ color: 'var(--on-surface-variant)' }}>
                  Send automated WhatsApp & app push
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={menuData.notifySubscribers}
              onClick={() => onUpdateMenu({ notifySubscribers: !menuData.notifySubscribers })}
              className="w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative"
              style={{
                backgroundColor: menuData.notifySubscribers ? 'var(--primary)' : 'var(--outline-variant)',
              }}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  menuData.notifySubscribers ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div
            className="p-2.5 rounded-xl border flex items-center justify-between text-xs"
            style={{
              borderColor: 'var(--border-tone)',
              backgroundColor: 'var(--surface-container-low)',
            }}
          >
            <span style={{ color: 'var(--on-surface-variant)' }}>Recipients count:</span>
            <span className="font-extrabold" style={{ color: 'var(--primary)' }}>
              {menuData.activeRegularsCount} Active Regulars
            </span>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={onPublish}
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-105 active:scale-98"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
              boxShadow: 'var(--shadow-level-2)',
            }}
          >
            <Send className="w-4 h-4 rotate-45" />
            <span>Publish Menu & Send Reminders</span>
          </button>

          {/* Secondary Action Row */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onSaveDraft}
              className="py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:bg-black/2 active:scale-98"
              style={{
                borderColor: 'var(--border-tone)',
                backgroundColor: 'var(--surface-container-low)',
                color: 'var(--on-surface)',
              }}
            >
              <Mail className="w-3.5 h-3.5" style={{ color: 'var(--outline)' }} />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={onScheduleLater}
              className="py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:bg-black/2 active:scale-98"
              style={{
                borderColor: 'var(--border-tone)',
                backgroundColor: 'var(--surface-container-low)',
                color: 'var(--on-surface)',
              }}
            >
              <Share2 className="w-3.5 h-3.5" style={{ color: 'var(--outline)' }} />
              <span>Schedule Later</span>
            </button>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="pt-4 pb-2 flex items-center justify-center gap-1.5 text-xs text-center" style={{ color: 'var(--outline)' }}>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
          <span className="font-medium italic">
            Handcrafted with pure ghee, hygiene & maternal warmth.
          </span>
        </div>
      </main>
    </div>
  );
};
