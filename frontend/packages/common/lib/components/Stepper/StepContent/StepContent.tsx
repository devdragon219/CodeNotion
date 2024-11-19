import { Box } from '@mui/material';

import { parseSxPropsToArray } from '../../../utils/muiUtils';
import { StepContentProps } from './StepContent.types';

export const StepContent = ({ children, sx }: StepContentProps) => (
  <Box sx={[{ flex: 1, px: { md: 2 } }, ...parseSxPropsToArray(sx)]}>{children}</Box>
);
