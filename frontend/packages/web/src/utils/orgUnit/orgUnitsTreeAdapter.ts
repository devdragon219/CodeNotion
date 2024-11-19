import { TreeItem, TreeLeafItem, TreeNodeItem } from '@realgimm5/frontend-common/interfaces';

import { OrgUnitTreeNodeFragment } from '../../gql/RealGimm.Web.OrgUnitTreeNode.fragment';

export const orgUnitsTreeAdapter = (orgUnits: OrgUnitTreeNodeFragment[] | undefined): TreeItem[] => {
  if (!orgUnits?.length) return [];

  return orgUnits.map((unit) => {
    if (unit.children?.length)
      return {
        id: unit.id,
        title: unit.name ?? '',
        type: 'node',
        children: orgUnitsTreeAdapter(unit.children),
        hasClickAction: !unit.isSubject,
      } as TreeNodeItem;

    return {
      id: unit.id,
      title: unit.name ?? '',
      type: 'leaf',
      hasClickAction: !unit.isSubject,
    } as TreeLeafItem;
  });
};
