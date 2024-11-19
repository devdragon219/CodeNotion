// eslint-disable-next-line
import * as Autocomplete from '@mui/material/Autocomplete';

declare module '@mui/material/Autocomplete' {
  interface AutocompletePropsSizeOverrides {
    large: true;
  }
}
