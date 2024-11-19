import { SxProps, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

export const parseSxPropsToArray = (sx?: SxProps<Theme>) => {
  if (Array.isArray(sx)) {
    return sx as Array<boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)>;
  }

  return [sx] as Array<SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)>;
};
