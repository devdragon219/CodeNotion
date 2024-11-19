import { ButtonProps } from '@mui/material';
import { ParseKeys } from 'i18next';
import { ReactNode } from 'react';

export interface CardActionsProps {
  editProps?: {
    color?: ButtonProps['color'];
    label?: ParseKeys;
    variant?: ButtonProps['variant'];
  };
  leftActions?: ReactNode;
  readonly?: boolean;
  rightActions?: ReactNode;
  onCancel?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onExport?: () => void;
  onSave?: () => void;
}
