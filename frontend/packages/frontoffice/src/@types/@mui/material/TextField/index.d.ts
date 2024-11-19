// eslint-disable-next-line
import * as TextField from '@mui/material/TextField';

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}
