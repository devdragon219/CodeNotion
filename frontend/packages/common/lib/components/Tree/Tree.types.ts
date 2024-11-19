import { SvgIconComponent } from '@mui/icons-material';
import { ParseKeys } from 'i18next';

import { TreeItem } from '../../interfaces/Tree';

export interface TreeProps {
  items: TreeItem[];
  selectedItems: string[];
  tooltipTextCollapse?: ParseKeys;
  tooltipTextExpand?: ParseKeys;
  treeLeafIcon?: SvgIconComponent;
  treeNodeIcon?: SvgIconComponent;
  onItemClick?: (item: TreeItem) => void;
}
