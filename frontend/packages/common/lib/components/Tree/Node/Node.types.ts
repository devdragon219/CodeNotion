import { SvgIconComponent } from '@mui/icons-material';
import { ParseKeys } from 'i18next';

import { TreeItem } from '../../../interfaces/Tree';

export interface TreeNodeProps {
  item: TreeItem;
  level: number;
  path: string[];
  selectedItems: string[];
  tooltipTextCollapse?: ParseKeys;
  tooltipTextExpand?: ParseKeys;
  treeLeafIcon?: SvgIconComponent;
  treeNodeIcon?: SvgIconComponent;
  onItemClick?: (item: TreeItem) => void;
}
