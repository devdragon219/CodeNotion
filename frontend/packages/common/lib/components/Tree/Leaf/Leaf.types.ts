import { SvgIconComponent } from '@mui/icons-material';

import { TreeItem, TreeLeafItem } from '../../../interfaces/Tree';

export interface TreeLeafProps {
  isClickable: boolean;
  item: TreeLeafItem;
  level: number;
  path: string[];
  selectedItems: string[];
  treeLeafIcon?: SvgIconComponent;
  onItemClick?: (item: TreeItem) => void;
}
