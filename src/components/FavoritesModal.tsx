import React from 'react';
import { X, Sparkles, Check, ChefHat } from 'lucide-react';
import { DishPreset } from '../types';
import { dishPresets } from '../data/initialData';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: DishPreset) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity">
      <div 
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        style={{ backgroundColor: 'var(--surface-container-lowest)' }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)' }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary-fixed)', color: 'var(--primary)' }}
            >
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight" style={{ color: 'var(--on-surface)' }}>
                Saved Daily Combinations
              </h3>
              <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                Select a tried-and-tested recipe set for today&apos;s meal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: 'var(--on-surface-variant)' }}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Presets */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {dishPresets.map((preset) => (
            <div
              key={preset.id}
              className="p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer group"
              style={{
                borderColor: 'var(--border-tone)',
                backgroundColor: 'var(--surface-container-lowest)',
              }}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--surface-container)', color: 'var(--primary)' }}
                    >
                      {preset.category}
                    </span>
                    <span className="font-bold text-sm" style={{ color: 'var(--primary)' }}>
                      ₹{preset.rate} / tiffin
                    </span>
                  </div>
                  <h4 className="font-bold text-base mt-1" style={{ color: 'var(--on-surface)' }}>
                    {preset.name}
                  </h4>
                </div>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                  Apply
                </button>
              </div>

              <div className="space-y-1.5 text-xs pt-1 border-t" style={{ borderColor: 'var(--border-tone)' }}>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold shrink-0" style={{ color: 'var(--primary)' }}>Curries:</span>
                  <span style={{ color: 'var(--on-surface)' }}>{preset.mainCurries}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold shrink-0" style={{ color: 'var(--secondary)' }}>Breads & Grains:</span>
                  <span style={{ color: 'var(--on-surface-variant)' }}>{preset.breadsGrains}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-semibold shrink-0" style={{ color: 'var(--tertiary)' }}>Sides:</span>
                  <span style={{ color: 'var(--on-surface-variant)' }}>{preset.specialNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div 
          className="px-6 py-3 border-t text-xs flex justify-between items-center"
          style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)' }}
        >
          <span className="flex items-center gap-1" style={{ color: 'var(--on-surface-variant)' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--secondary)' }} />
            Clicking apply instantly populates the form
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold rounded-md border"
            style={{ borderColor: 'var(--border-tone)', color: 'var(--on-surface)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
