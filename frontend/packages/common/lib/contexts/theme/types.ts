import { PaletteMode, Theme } from '@mui/material';

export interface ThemeContextProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  theme: Theme;
}
