import { ReactNode } from 'react';

import { CustomTableAction, TableAdd } from '../../Primary.types';

export interface ToolbarActionsProps {
  customTableActions?: CustomTableAction[] | ReactNode;
  editing: boolean;
  onAdd?: TableAdd;
  onCancel: () => void;
  onEdit?: () => void;
  onExport?: () => void;
  onSave: () => void;
}
