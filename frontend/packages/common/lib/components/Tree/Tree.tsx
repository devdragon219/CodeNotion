import { List } from '@mui/material';

import { TreeNode } from './Node/Node';
import { TreeProps } from './Tree.types';

export const Tree = ({
  items,
  selectedItems,
  tooltipTextExpand,
  tooltipTextCollapse,
  treeNodeIcon,
  treeLeafIcon,
  onItemClick,
}: TreeProps) => {
  return (
    <List component="div" disablePadding>
      {items.map((item, index) => (
        <TreeNode
          key={index}
          item={item}
          level={0}
          path={[`${index}`]}
          selectedItems={selectedItems}
          onItemClick={onItemClick}
          tooltipTextExpand={tooltipTextExpand}
          tooltipTextCollapse={tooltipTextCollapse}
          treeNodeIcon={treeNodeIcon}
          treeLeafIcon={treeLeafIcon}
        />
      ))}
    </List>
  );
};
