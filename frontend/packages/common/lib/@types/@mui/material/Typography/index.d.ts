// eslint-disable-next-line
import * as Typography from '@mui/material/Typography';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodyLg: true;
    bodyMd: true;
    bodySm: true;
    link: true;
  }
}
