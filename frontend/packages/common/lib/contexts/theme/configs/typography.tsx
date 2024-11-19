import { Palette, TypographyVariantsOptions } from '@mui/material';

import { DEFAULT_FONT } from '../../../configs/defaults';

export const getThemeTypography = (palette: Palette): TypographyVariantsOptions => ({
  fontFamily: DEFAULT_FONT,
  h1: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '44px',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '32px',
  },
  h3: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '28px',
  },
  h4: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
  },
  h5: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '22px',
  },
  bodyLg: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
  },
  bodyMd: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
  },
  bodySm: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '20px',
  },
  link: {
    color: palette.blue[500],
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
    textDecoration: 'underline',
  },
  caption: {
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '16px',
  },
  button: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
  },
});
