import { PaletteMode, Theme, createTheme } from '@mui/material';

import colors from '../../../assets/scss/_variables.module.scss';

export const getThemePalette = (mode: PaletteMode): Theme =>
  createTheme({
    palette: {
      mode,
      tertiary: {
        light: colors.blue50,
        main: colors.blue100,
        dark: colors.blue200,
        contrastText: colors.blue500,
      },
      destructive: {
        light: colors.danger100,
        main: colors.danger200,
        dark: colors.danger300,
        contrastText: colors.danger500,
      },
      blue: {
        10: colors.blue10,
        50: colors.blue50,
        100: colors.blue100,
        200: colors.blue200,
        500: colors.blue500,
      },
      yellow: {
        50: colors.yellow50,
        100: colors.yellow100,
        500: colors.yellow500,
        600: colors.yellow600,
      },
      danger: {
        100: colors.danger100,
        200: colors.danger200,
        300: colors.danger300,
        500: colors.danger500,
      },
      green: {
        100: colors.green100,
        200: colors.green200,
        700: colors.green700,
      },
      grey: {
        50: colors.grey50,
        100: colors.grey100,
        200: colors.grey200,
        300: colors.grey300,
        400: colors.grey400,
        500: colors.grey500,
        600: colors.grey600,
        700: colors.grey700,
        800: colors.grey800,
      },
      divider: colors.grey300,
      common: {
        white: colors.white,
      },
      background: {
        default: colors.white,
        paper: colors.white,
      },
    },
  });
