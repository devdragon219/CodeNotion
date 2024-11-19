import { Color } from '@mui/material';
// eslint-disable-next-line
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface ExtendedColor extends Color {
    10?: string;
  }

  type ExtendedPaletteColorOptions = SimplePaletteColorOptions | Partial<ExtendedColor>;

  interface PaletteOptions {
    tertiary?: ExtendedPaletteColorOptions;
    destructive?: ExtendedPaletteColorOptions;
    danger?: ExtendedPaletteColorOptions;
    green?: ExtendedPaletteColorOptions;
    blue?: ExtendedPaletteColorOptions;
    yellow?: ExtendedPaletteColorOptions;
  }

  interface Palette {
    tertiary: ExtendedColor;
    destructive: ExtendedColor;
    danger: ExtendedColor;
    green: ExtendedColor;
    blue: ExtendedColor;
    yellow: ExtendedColor;
  }
}
