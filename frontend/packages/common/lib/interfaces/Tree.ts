interface BaseTreeItem {
  id: number;
  title: string;
  hasClickAction?: boolean;
}

export interface TreeNodeItem extends BaseTreeItem {
  type: 'node';
  children: TreeItem[];
}

export interface TreeLeafItem extends BaseTreeItem {
  type: 'leaf';
}

export type TreeItem = TreeNodeItem | TreeLeafItem;
