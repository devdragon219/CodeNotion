import { PermissionSummary } from '@realgimm5/frontend-common/gql/types';
import { TFunction } from 'i18next';

import { FEATURE_GROUP_NAMES, FEATURE_NAMES, UNSUPPORTED_RAW_FEATURES } from '../../../configs/features';
import { FeatureGroup } from '../../../enums/FeatureGroup';
import { findGroupFeatures, isFeature, isFeatureGroup } from '../../featureUtils';

export const getPermissionsTableRows = (permissions: PermissionSummary[] | undefined, t: TFunction): string[][] =>
  permissions?.reduce<string[][]>((acc, curr, _, permissionsArray) => {
    const { feature, canRead, canUpdate, canCreate, canDelete } = curr;

    if (UNSUPPORTED_RAW_FEATURES.includes(feature)) return acc;
    if ([canCreate, canRead, canUpdate, canDelete].every((el) => !el)) return [...acc];

    const groupCode = `${feature.slice(0, -2)}00`;
    const module = isFeatureGroup(groupCode) ? t(FEATURE_GROUP_NAMES[groupCode as FeatureGroup]) : null;

    if (acc.some(([moduleName, blockName]) => moduleName === module && blockName === t('common.text.all')))
      return [...acc];

    const groupFeatures = findGroupFeatures(groupCode);
    const groupPermissions = permissionsArray.filter((el) => groupFeatures.includes(el.feature));
    const shouldSummarizeBlock = groupPermissions.every(
      (el) =>
        el.canCreate === canCreate &&
        el.canRead === canRead &&
        el.canUpdate === canUpdate &&
        el.canDelete === canDelete,
    );

    const block = shouldSummarizeBlock ? t('common.text.all') : isFeature(feature) ? t(FEATURE_NAMES[feature]) : null;

    if (!module || !block) return [...acc];

    const permissions =
      canCreate && canRead && canUpdate && canDelete
        ? t('common.text.all')
        : [
            { text: t('user.permission.read'), isAllowed: canRead },
            { text: t('user.permission.update'), isAllowed: canUpdate },
            { text: t('user.permission.create'), isAllowed: canCreate },
            { text: t('user.permission.delete'), isAllowed: canDelete },
          ]
            .filter((e) => e.isAllowed)
            .map((e) => e.text)
            .join('; ');

    const newRow = [module, block, permissions];

    return [...acc, newRow];
  }, []) ?? [];
