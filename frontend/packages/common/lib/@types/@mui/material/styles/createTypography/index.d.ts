// eslint-disable-next-line
import * as createTypography from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  export type FontStyle = Required<{
    textTransform: TextTransform;
    fontSize: string | number; // added string
  }>;
  export interface FontStyleOptions extends Partial<FontStyle> {
    fontSize?: string | number; // added string
  }
  export type Variant = 'bodyLg' | 'bodyMd' | 'bodySm' | 'link';

  export interface TypographyOptions extends Partial<Record<Variant, TypographyStyleOptions> & FontStyleOptions> {
    bodyLg?: TypographyStyleOptions;
    bodyMd?: TypographyStyleOptions;
    bodySm?: TypographyStyleOptions;
    link?: TypographyStyleOptions;
  }

  export interface Typography extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils {
    bodyLg: TypographyStyleOptions;
    bodyMd: TypographyStyleOptions;
    bodySm: TypographyStyleOptions;
    link: TypographyStyleOptions;
  }
}
