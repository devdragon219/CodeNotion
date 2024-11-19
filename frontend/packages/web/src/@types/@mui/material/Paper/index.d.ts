// eslint-disable-next-line
import * as Paper from '@mui/material/Paper';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    flat: true;
    select: true;
    menu: true;
  }
}
