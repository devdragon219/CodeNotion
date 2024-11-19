import { CheckboxTable, CheckboxTableRow } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FEATURE_GROUP_NAMES, FEATURE_NAMES, UNSUPPORTED_RAW_FEATURES } from '../../../../configs/features';
import { FeatureGroup } from '../../../../enums/FeatureGroup';
import { Feature } from '../../../../interfaces/Feature';
import { PermissionFormInput } from '../../../../interfaces/FormInputs/Permissions';
import { getFeatureGroup, isFeature, isFeatureGroup } from '../../../../utils/featureUtils';
import { GroupPermissionsFieldProps } from './Field.types';

export const PermissionsField = ({ control, setValue }: GroupPermissionsFieldProps) => {
  const { t } = useTranslation();
  const groupPermissions = useWatch({ control });

  const options = useMemo(() => ['canCreate', 'canRead', 'canUpdate', 'canDelete'] as const, []);

  const rows = useMemo(
    () =>
      Object.keys(FEATURE_NAMES)
        .filter((featureCode) => !UNSUPPORTED_RAW_FEATURES.includes(featureCode))
        .map((featureCode) => {
          const featureGroupCode = getFeatureGroup(featureCode);
          const currentOptions = groupPermissions.permissions?.find(
            (permission) => permission.feature === featureGroupCode || permission.feature === featureCode,
          ) ?? { canCreate: false, canRead: false, canUpdate: false, canDelete: false };

          const row: CheckboxTableRow<FeatureGroup, (typeof options)[number], keyof typeof FEATURE_NAMES> = {
            rowName: featureCode as Feature,
            groupName: featureGroupCode as FeatureGroup,
            optionValues: {
              canCreate: currentOptions.canCreate ?? false,
              canRead: currentOptions.canRead ?? false,
              canUpdate: currentOptions.canUpdate ?? false,
              canDelete: currentOptions.canDelete ?? false,
            },
          };

          return { ...row };
        }),
    [groupPermissions],
  );

  const handleOnChange = useCallback(
    (updatedRows: CheckboxTableRow<FeatureGroup, (typeof options)[number], keyof typeof FEATURE_NAMES>[]) => {
      const permissionInput = updatedRows.reduce<PermissionFormInput[]>((acc, curr) => {
        const options = { ...curr.optionValues };

        return [...acc, { feature: curr.rowName, ...options }];
      }, []);

      setValue('permissions', [...permissionInput]);
    },
    [setValue],
  );

  const getRowLabel = useCallback(
    (rowName: string) => {
      if (isFeature(rowName)) return t(FEATURE_NAMES[rowName]);

      return rowName;
    },
    [t],
  );

  const getGroupLabel = useCallback(
    (groupName: FeatureGroup) => {
      if (isFeatureGroup(groupName)) return t(FEATURE_GROUP_NAMES[groupName]);
      return groupName;
    },
    [t],
  );

  const isOption = useCallback(
    (optionName: string): optionName is (typeof options)[number] =>
      options.includes(optionName as (typeof options)[number]),
    [options],
  );

  const getOptionLabel = useCallback(
    (optionName: string) => {
      if (isOption(optionName)) {
        switch (optionName) {
          case 'canCreate':
            return t('component.permissions_table.add');
          case 'canRead':
            return t('component.permissions_table.read');
          case 'canUpdate':
            return t('component.permissions_table.edit');
          case 'canDelete':
            return t('component.permissions_table.delete');
        }
      }

      return optionName;
    },
    [isOption, t],
  );

  return (
    <CheckboxTable
      columns={['component.permissions_table.module_and_block', 'component.permissions_table.permissions']}
      options={[...options]}
      rows={rows}
      onChange={handleOnChange}
      getRowLabel={getRowLabel}
      getGroupLabel={getGroupLabel}
      getOptionLabel={getOptionLabel}
    />
  );
};
