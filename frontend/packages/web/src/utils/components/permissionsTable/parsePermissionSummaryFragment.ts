import { PermissionSummary } from '@realgimm5/frontend-common/gql/types';

import { FEATURE_GROUP_NAMES, FEATURE_NAMES } from '../../../configs/features';
import { PermissionFormInput } from '../../../interfaces/FormInputs/Permissions';
import { findGroupFeatures, isFeatureGroup } from '../../featureUtils';

export const parsePermissionSummaryToPermissionsFormInput = (
  permissionSummary?: PermissionSummary[],
): PermissionFormInput[] =>
  permissionSummary?.reduce<PermissionFormInput[]>((acc, curr) => {
    if (!(curr.feature in FEATURE_NAMES) && !(curr.feature in FEATURE_GROUP_NAMES)) return [...acc];

    const permissions: Pick<PermissionFormInput[][number], 'canCreate' | 'canRead' | 'canUpdate' | 'canDelete'> = {
      canCreate: curr.canCreate,
      canRead: curr.canRead,
      canUpdate: curr.canUpdate,
      canDelete: curr.canDelete,
    };

    if (isFeatureGroup(curr.feature)) {
      const groupFeatureCodes = findGroupFeatures(curr.feature);
      const newRows = groupFeatureCodes.map<PermissionFormInput>((featureCode) => ({
        feature: featureCode,
        ...permissions,
      }));

      return [...acc, ...newRows];
    }

    return [...acc, { feature: curr.feature, ...permissions }];
  }, []) ?? [];
