import React, { useState } from 'react';
import { X, Palette, Check, Copy, Sliders, RefreshCw, Sparkles, Code2 } from 'lucide-react';
import { ThemePreset } from '../types';
import { themes, applyTheme } from '../theme/themeConfig';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemePreset;
  onSelectTheme: (theme: ThemePreset) => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  const [copied, setCopied] = useState(false);
  const [customPrimary, setCustomPrimary] = useState('#c84b26');
  const [customSecondary, setCustomSecondary] = useState('#e08a1e');
  const [customTertiary, setCustomTertiary] = useState('#3d7053');
  const [customCanvas, setCustomCanvas] = useState('#fff8f5');
  const [cornerRadius, setCornerRadius] = useState('1rem');

  if (!isOpen) return null;

  const currentThemeData = themes[currentTheme];

  const handleApplyCustomColors = () => {
    applyTheme(currentTheme, {
      '--primary': customPrimary,
      '--primary-container': customPrimary,
      '--secondary': customSecondary,
      '--tertiary': customTertiary,
      '--surface': customCanvas,
      '--surface-bright': customCanvas,
      '--radius-lg': cornerRadius,
    });
  };

  const handleResetToTheme = (themeKey: ThemePreset) => {
    onSelectTheme(themeKey);
    const def = themes[themeKey];
    setCustomPrimary(def.variables['--primary']);
    setCustomSecondary(def.variables['--secondary']);
    setCustomTertiary(def.variables['--tertiary']);
    setCustomCanvas(def.variables['--surface']);
    applyTheme(themeKey);
  };

  const generateCSSCode = () => {
    return `:root {
  /* Surfaces */
  --surface: ${customCanvas};
  --surface-dim: #e4d8d1;
  --surface-bright: ${customCanvas};
  --surface-container-lowest: #ffffff;
  --surface-container-low: #fef1ea;
  --surface-container: #f8ebe5;
  --surface-container-high: #f2e6df;
  --surface-container-highest: #ece0d9;

  /* Typography Colors */
  --on-surface: #201a16;
  --on-surface-variant: #58413b;

  /* Borders & Outlines */
  --outline: #8c716a;
  --outline-variant: #e0bfb7;
  --border-tone: #e6ddd3;

  /* Accents */
  --primary: ${customPrimary};
  --on-primary: #ffffff;
  --primary-container: ${customPrimary};
  --secondary: ${customSecondary};
  --on-secondary: #ffffff;
  --tertiary: ${customTertiary};
  --on-tertiary: #ffffff;

  /* Geometry & Elevation */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: ${cornerRadius};
  --radius-xl: 1.5rem;
  --radius-full: 9999px;
  --shadow-level-1: 0 2px 8px -2px rgba(36, 30, 26, 0.05), 0 1px 3px 0 rgba(200, 75, 38, 0.03);
  --shadow-level-2: 0 8px 20px -4px rgba(36, 30, 26, 0.08), 0 4px 6px -2px rgba(200, 75, 38, 0.06);
  --shadow-level-3: 0 16px 36px -6px rgba(36, 30, 26, 0.16);
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
}`;
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(generateCSSCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
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
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight" style={{ color: 'var(--on-surface)' }}>
                CSS Variables & Theme Tokens
              </h3>
              <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                Customize colors & variables live for your project
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Preset Palettes */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--on-surface-variant)' }}>
              1. Curated Color Presets
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(themes) as ThemePreset[]).map((themeKey) => {
                const theme = themes[themeKey];
                const isSelected = currentTheme === themeKey;
                return (
                  <div
                    key={themeKey}
                    onClick={() => handleResetToTheme(themeKey)}
                    className="p-3.5 rounded-xl border cursor-pointer transition-all hover:shadow-xs group"
                    style={{
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border-tone)',
                      borderWidth: isSelected ? '2px' : '1px',
                      backgroundColor: isSelected ? 'var(--surface-container-low)' : 'var(--surface-container-lowest)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold leading-tight" style={{ color: 'var(--on-surface)' }}>
                        {theme.name.split(' (')[0]}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-5 h-5 rounded-md shadow-2xs"
                        style={{ backgroundColor: theme.variables['--primary'] }}
                        title="Primary"
                      />
                      <div
                        className="w-5 h-5 rounded-md shadow-2xs"
                        style={{ backgroundColor: theme.variables['--secondary'] }}
                        title="Secondary"
                      />
                      <div
                        className="w-5 h-5 rounded-md shadow-2xs"
                        style={{ backgroundColor: theme.variables['--tertiary'] }}
                        title="Tertiary"
                      />
                      <div
                        className="w-5 h-5 rounded-md border shadow-2xs"
                        style={{ backgroundColor: theme.variables['--surface'] }}
                        title="Surface"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive CSS Variables Tweaker */}
          <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--border-tone)' }}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--on-surface-variant)' }}>
                2. Live Variable Overrides
              </label>
              <button
                type="button"
                onClick={() => handleResetToTheme('terracotta')}
                className="text-[11px] font-semibold flex items-center gap-1 text-stone-500 hover:text-stone-800"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Primary Color Picker */}
              <div className="p-3 rounded-xl border space-y-1.5" style={{ borderColor: 'var(--border-tone)' }}>
                <span className="font-semibold block" style={{ color: 'var(--on-surface)' }}>
                  --primary (Brand Accent)
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPrimary}
                    onChange={(e) => {
                      setCustomPrimary(e.target.value);
                      applyTheme(currentTheme, { '--primary': e.target.value, '--primary-container': e.target.value });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={customPrimary}
                    onChange={(e) => {
                      setCustomPrimary(e.target.value);
                      applyTheme(currentTheme, { '--primary': e.target.value, '--primary-container': e.target.value });
                    }}
                    className="w-20 px-2 py-1 font-mono uppercase text-xs border rounded bg-white"
                  />
                </div>
              </div>

              {/* Secondary Color Picker */}
              <div className="p-3 rounded-xl border space-y-1.5" style={{ borderColor: 'var(--border-tone)' }}>
                <span className="font-semibold block" style={{ color: 'var(--on-surface)' }}>
                  --secondary (Turmeric/Warmth)
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customSecondary}
                    onChange={(e) => {
                      setCustomSecondary(e.target.value);
                      applyTheme(currentTheme, { '--secondary': e.target.value });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={customSecondary}
                    onChange={(e) => {
                      setCustomSecondary(e.target.value);
                      applyTheme(currentTheme, { '--secondary': e.target.value });
                    }}
                    className="w-20 px-2 py-1 font-mono uppercase text-xs border rounded bg-white"
                  />
                </div>
              </div>

              {/* Tertiary Color Picker */}
              <div className="p-3 rounded-xl border space-y-1.5" style={{ borderColor: 'var(--border-tone)' }}>
                <span className="font-semibold block" style={{ color: 'var(--on-surface)' }}>
                  --tertiary (Fresh Sage)
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customTertiary}
                    onChange={(e) => {
                      setCustomTertiary(e.target.value);
                      applyTheme(currentTheme, { '--tertiary': e.target.value });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={customTertiary}
                    onChange={(e) => {
                      setCustomTertiary(e.target.value);
                      applyTheme(currentTheme, { '--tertiary': e.target.value });
                    }}
                    className="w-20 px-2 py-1 font-mono uppercase text-xs border rounded bg-white"
                  />
                </div>
              </div>

              {/* Canvas Color Picker */}
              <div className="p-3 rounded-xl border space-y-1.5" style={{ borderColor: 'var(--border-tone)' }}>
                <span className="font-semibold block" style={{ color: 'var(--on-surface)' }}>
                  --surface (Warm Canvas)
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customCanvas}
                    onChange={(e) => {
                      setCustomCanvas(e.target.value);
                      applyTheme(currentTheme, { '--surface': e.target.value, '--surface-bright': e.target.value });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={customCanvas}
                    onChange={(e) => {
                      setCustomCanvas(e.target.value);
                      applyTheme(currentTheme, { '--surface': e.target.value, '--surface-bright': e.target.value });
                    }}
                    className="w-20 px-2 py-1 font-mono uppercase text-xs border rounded bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Corner Radius Slider */}
            <div className="p-3.5 rounded-xl border space-y-2" style={{ borderColor: 'var(--border-tone)' }}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>--radius-lg (Component Corner Radius)</span>
                <span className="font-mono text-stone-600">{cornerRadius}</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="1.5"
                step="0.125"
                value={parseFloat(cornerRadius)}
                onChange={(e) => {
                  const val = `${e.target.value}rem`;
                  setCornerRadius(val);
                  applyTheme(currentTheme, { '--radius-lg': val });
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Quick Copy CSS snippet */}
          <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--border-tone)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--on-surface-variant)' }}>
                <Code2 className="w-3.5 h-3.5" />
                Copy CSS Tokens for your project
              </span>
              <button
                type="button"
                onClick={handleCopyCSS}
                className="px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1 transition-transform active:scale-95"
                style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy :root CSS'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-stone-900 text-stone-100 text-[11px] font-mono overflow-x-auto max-h-36">
              {generateCSSCode()}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 border-t text-xs flex justify-between items-center"
          style={{ borderColor: 'var(--border-tone)', backgroundColor: 'var(--surface-container-low)' }}
        >
          <span className="text-[11px]" style={{ color: 'var(--on-surface-variant)' }}>
            CSS variables apply instantaneously across all screens
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold rounded-lg"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
