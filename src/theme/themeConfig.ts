import { ThemePreset } from '../types';

export interface ThemeDefinition {
  id: ThemePreset;
  name: string;
  description: string;
  variables: Record<string, string>;
}

export const themes: Record<ThemePreset, ThemeDefinition> = {
  terracotta: {
    id: 'terracotta',
    name: 'Terracotta Hearth (Default)',
    description: 'Earthy fired clay with golden turmeric and fresh coriander',
    variables: {
      '--surface': '#fff8f5',
      '--surface-dim': '#e4d8d1',
      '--surface-bright': '#fff8f5',
      '--surface-container-lowest': '#ffffff',
      '--surface-container-low': '#fef1ea',
      '--surface-container': '#f8ebe5',
      '--surface-container-high': '#f2e6df',
      '--surface-container-highest': '#ece0d9',
      '--surface-variant': '#ece0d9',
      '--on-surface': '#201a16',
      '--on-surface-variant': '#58413b',
      '--inverse-surface': '#362f2b',
      '--inverse-on-surface': '#fbeee7',
      '--outline': '#8c716a',
      '--outline-variant': '#e0bfb7',
      '--border-tone': '#e6ddd3',
      '--primary': '#c84b26',
      '--primary-dark': '#a6330f',
      '--primary-hover': '#b03f1e',
      '--on-primary': '#ffffff',
      '--primary-container': '#c84b26',
      '--primary-fixed': '#ffdbd1',
      '--secondary': '#e08a1e',
      '--secondary-dark': '#8a5100',
      '--secondary-container': '#fda137',
      '--secondary-fixed': '#ffdcbe',
      '--tertiary': '#3d7053',
      '--tertiary-dark': '#336649',
      '--tertiary-fixed': '#b8efcb',
    },
  },
  turmeric: {
    id: 'turmeric',
    name: 'Turmeric Amber & Saffron',
    description: 'Vibrant golden turmeric glow with warm terracotta accents',
    variables: {
      '--surface': '#fffcf5',
      '--surface-dim': '#e8ded0',
      '--surface-bright': '#fffcf5',
      '--surface-container-lowest': '#ffffff',
      '--surface-container-low': '#fef7e7',
      '--surface-container': '#faeed4',
      '--surface-container-high': '#f2e2c2',
      '--surface-container-highest': '#ebd7b2',
      '--surface-variant': '#ebd7b2',
      '--on-surface': '#281c0b',
      '--on-surface-variant': '#5a4628',
      '--inverse-surface': '#3a2d1d',
      '--inverse-on-surface': '#fbf4ea',
      '--outline': '#967c52',
      '--outline-variant': '#e4cfad',
      '--border-tone': '#ebd9be',
      '--primary': '#d97706',
      '--primary-dark': '#b45309',
      '--primary-hover': '#f59e0b',
      '--on-primary': '#ffffff',
      '--primary-container': '#d97706',
      '--primary-fixed': '#fed7aa',
      '--secondary': '#c84b26',
      '--secondary-dark': '#9c3414',
      '--secondary-container': '#ea580c',
      '--secondary-fixed': '#ffedd5',
      '--tertiary': '#2e7d32',
      '--tertiary-dark': '#1b5e20',
      '--tertiary-fixed': '#c8e6c9',
    },
  },
  sage: {
    id: 'sage',
    name: 'Fresh Coriander Sage',
    description: 'Wholesome garden herbs, satvik clarity and nourishing greens',
    variables: {
      '--surface': '#f7fbf8',
      '--surface-dim': '#d8e5dc',
      '--surface-bright': '#f7fbf8',
      '--surface-container-lowest': '#ffffff',
      '--surface-container-low': '#eff6f1',
      '--surface-container': '#e3efe6',
      '--surface-container-high': '#d6e6da',
      '--surface-container-highest': '#cadbcc',
      '--surface-variant': '#cadbcc',
      '--on-surface': '#16231a',
      '--on-surface-variant': '#384d3e',
      '--inverse-surface': '#26382b',
      '--inverse-on-surface': '#ecf6ee',
      '--outline': '#65826e',
      '--outline-variant': '#b9d2c1',
      '--border-tone': '#cfdfd4',
      '--primary': '#2d6a4f',
      '--primary-dark': '#1b4332',
      '--primary-hover': '#40916c',
      '--on-primary': '#ffffff',
      '--primary-container': '#2d6a4f',
      '--primary-fixed': '#b7e4c7',
      '--secondary': '#d97706',
      '--secondary-dark': '#92400e',
      '--secondary-container': '#f59e0b',
      '--secondary-fixed': '#fef3c7',
      '--tertiary': '#c84b26',
      '--tertiary-dark': '#9c3414',
      '--tertiary-fixed': '#ffdbd1',
    },
  },
  umber: {
    id: 'umber',
    name: 'Roasted Peppercorn Umber',
    description: 'Traditional woodfire brass cookware and toasted aromatic spices',
    variables: {
      '--surface': '#faf8f5',
      '--surface-dim': '#e0dad3',
      '--surface-bright': '#faf8f5',
      '--surface-container-lowest': '#ffffff',
      '--surface-container-low': '#f3eee7',
      '--surface-container': '#eae3d9',
      '--surface-container-high': '#ded5c9',
      '--surface-container-highest': '#d2c7b9',
      '--surface-variant': '#d2c7b9',
      '--on-surface': '#251e18',
      '--on-surface-variant': '#54463d',
      '--inverse-surface': '#352c24',
      '--inverse-on-surface': '#f6f1ea',
      '--outline': '#83746a',
      '--outline-variant': '#d0c3b8',
      '--border-tone': '#ded5ca',
      '--primary': '#854d0e',
      '--primary-dark': '#713f12',
      '--primary-hover': '#a16207',
      '--on-primary': '#ffffff',
      '--primary-container': '#854d0e',
      '--primary-fixed': '#fef08a',
      '--secondary': '#c84b26',
      '--secondary-dark': '#9c3414',
      '--secondary-container': '#ea580c',
      '--secondary-fixed': '#ffedd5',
      '--tertiary': '#3d7053',
      '--tertiary-dark': '#2d533e',
      '--tertiary-fixed': '#bbf7d0',
    },
  },
};

export function applyTheme(themeKey: ThemePreset, customOverrides?: Record<string, string>) {
  const root = document.documentElement;
  const theme = themes[themeKey] || themes.terracotta;

  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  if (customOverrides) {
    Object.entries(customOverrides).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }
}
