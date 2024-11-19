import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
  StyledEngineProvider,
  createTheme,
} from '@mui/material';
import { PropsWithChildren, useMemo, useState } from 'react';

import { DEFAULT_DIRECTION, DEFAULT_MODE } from '../../configs/defaults';
import { getThemeComponents } from './configs/components';
import { getThemePalette } from './configs/palette';
import { getThemeTypography } from './configs/typography';
import { ThemeContext } from './context';
import { ThemeContextProps } from './types';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<PaletteMode>(DEFAULT_MODE);

  const theme = useMemo(() => {
    const { breakpoints, palette } = getThemePalette(mode);
    const typography = getThemeTypography(palette);
    const components = getThemeComponents(breakpoints, palette, typography);

    return createTheme({
      components,
      direction: DEFAULT_DIRECTION,
      palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      typography,
    });
  }, [mode]);

  const contextValue: ThemeContextProps = {
    mode,
    setMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};
