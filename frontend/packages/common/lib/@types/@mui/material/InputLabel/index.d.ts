// eslint-disable-next-line
import * as InputLabel from '@mui/material/InputLabel';

declare module '@mui/material/InputLabel' {
  interface InputLabelPropsSizeOverrides {
    large: true;
    medium: true;
  }
}
