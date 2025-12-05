import { themeToCssVars } from './to-css';

export const colors = {
  primary: '22 89% 54%', // GTSE Orange
  accent: '212 67% 12%', // Dark Navy
  background: '0 0% 100%',
  foreground: '212 67% 12%', // Dark Navy
  success: '116 78% 65%',
  error: '0 100% 60%',
  warning: '40 100% 60%',
  info: '220 70% 45%',
  contrast: {
    100: '210 8% 96%',
    200: '210 2% 85%',
    300: '210 2% 66%',
    400: '216 6% 52%',
    500: '212 67% 12%',
  },
  primaryMix: {
    white: {
      75: '22 89% 88%', // Approx mix
    },
    black: {
      75: '22 89% 13%', // Approx mix
    },
  },
};

export const BaseColors = () => (
  <style data-makeswift="theme-base-colors">{`:root {
      ${themeToCssVars(colors).join('\n')}
    }
  `}</style>
);
