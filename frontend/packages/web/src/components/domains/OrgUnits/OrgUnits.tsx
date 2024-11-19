import { AddCircleOutline, Groups2Outlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Loader, Tree } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import {
  useCreateGeographicalOrgUnitMutation,
  useCreateManagementOrgUnitMutation,
  useGetOrgUnitsTreeQuery,
} from '../../../gql/RealGimm.Web.OrgUnit.operation';
import { OrgUnitTreeNodeFragment } from '../../../gql/RealGimm.Web.OrgUnitTreeNode.fragment';
import { useFeature } from '../../../hooks/useFeature';
import { OrgUnitFormInput } from '../../../interfaces/FormInputs/OrgUnit';
import { orgUnitsTreeAdapter } from '../../../utils/orgUnit/orgUnitsTreeAdapter';
import { parseOrgUnitFormInputToOrgUnitInput } from '../../../utils/orgUnit/parseOrgUnitFormInput';
import { OrgUnitCreateDialog } from '../../wizards/OrgUnit/OrgUnit';
import { OrgUnitsProps } from './OrgUnits.types';

const MIN_DETAIL_HEIGHT = 512;
export const OrgUnits = ({ orgUnitType }: OrgUnitsProps) => {
  const { canCreate, canRead } = useFeature(RawFeature.ANAG_SUBJECT_ORGUNIT);
  const { t } = useTranslation();
  const { id } = useParams();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [getOrgUnitsState, reexecuteQuery] = useGetOrgUnitsTreeQuery({
    variables: { orgUnitType },
  });
  const [, createManagementOrgUnitMutation] = useCreateManagementOrgUnitMutation();
  const [, createGeographicalOrgUnitMutation] = useCreateGeographicalOrgUnitMutation();
  const [loading, setLoading] = useState(false);
  const [treeHeight, setTreeHeight] = useState(MIN_DETAIL_HEIGHT);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const trigger = () => {
      if (cardRef.current) {
        setTreeHeight(Math.max(cardRef.current.clientHeight, MIN_DETAIL_HEIGHT));
      }
    };

    if (cardRef.current) {
      if ('ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(cardRef.current);
      }
      trigger();
    }
  }, [cardRef]);

  const handleOpenCreateDialog = useCallback(() => {
    setCreateDialogOpen(true);
  }, []);

  const handleCloseCreateDialog = useCallback(() => {
    setCreateDialogOpen(false);
  }, []);

  const handleCreateOrgUnit = useCallback(
    async (orgUnit: OrgUnitFormInput) => {
      const createOrgUnit = async () => {
        const orgUnitInput = parseOrgUnitFormInputToOrgUnitInput(orgUnit);

        if (orgUnit.orgUnitType === OrgUnitType.GeographicalHierarchy) {
          const result = await createGeographicalOrgUnitMutation({
            orgUnitInput,
          });
          return result.data?.orgUnit.addGeographicalOrgUnit;
        } else {
          const result = await createManagementOrgUnitMutation({
            orgUnitInput,
          });
          return result.data?.orgUnit.addManagementOrgUnit;
        }
      };

      setLoading(true);
      const result = await createOrgUnit();
      setLoading(false);

      if (result?.isSuccess) {
        showSnackbar(t('org_unit.feedback.create'), 'success');
        handleCloseCreateDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      t,
      createGeographicalOrgUnitMutation,
      createManagementOrgUnitMutation,
      handleCloseCreateDialog,
      reexecuteQuery,
      showSnackbar,
      showError,
    ],
  );

  const listOrgUnits = useMemo(
    () => getOrgUnitsState.data?.orgUnit.listOrgUnitsTree,
    [getOrgUnitsState.data?.orgUnit.listOrgUnitsTree],
  );

  const orgUnits = useMemo(() => orgUnitsTreeAdapter(listOrgUnits), [listOrgUnits]);
  const selectedTreeItems = useMemo(() => {
    if (!id || !listOrgUnits) return [];

    const containsId = (orgUnit: OrgUnitTreeNodeFragment) =>
      (!orgUnit.isSubject && orgUnit.id === Number(id)) || (orgUnit.children && orgUnit.children.some(containsId));
    const getPath = (orgUnits: OrgUnitTreeNodeFragment[]): string[] =>
      orgUnits.reduce<string[]>((acc, orgUnit, index) => {
        if (!orgUnit.isSubject && orgUnit.id === Number(id)) {
          return [...acc, String(index)];
        }
        if (orgUnit.children && containsId(orgUnit)) {
          return [...acc, String(index), ...getPath(orgUnit.children)];
        }
        return acc;
      }, []);

    return getPath(listOrgUnits);
  }, [id, listOrgUnits]);

  return (
    <Box sx={{ display: 'flex', gap: '24px' }}>
      <Box sx={{ height: treeHeight, overflowY: 'auto' }}>
        {(getOrgUnitsState.fetching || loading) && <Loader />}
        {orgUnits.length !== 0 && (
          <Tree
            items={orgUnits}
            selectedItems={selectedTreeItems}
            tooltipTextCollapse="org_unit.tree.tooltip.collapse"
            tooltipTextExpand="org_unit.tree.tooltip.expand"
            treeLeafIcon={Groups2Outlined}
            onItemClick={
              canRead
                ? (item) => {
                    navigate(
                      `/app/registry/organizational-units/${orgUnitType === OrgUnitType.ManagementHierarchy ? 'management' : 'geographical'}/${item.id}`,
                      { replace: true },
                    );
                  }
                : undefined
            }
          />
        )}
      </Box>
      <Box ref={cardRef} sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', gap: 1, ml: 'auto', mb: 4, justifyContent: 'flex-end' }}>
          {canCreate && (
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutline />}
              onClick={handleOpenCreateDialog}
            >
              {t('common.button.add')}
            </Button>
          )}
        </Box>

        {isCreateDialogOpen && (
          <OrgUnitCreateDialog
            orgUnitType={orgUnitType}
            onClose={handleCloseCreateDialog}
            onSave={handleCreateOrgUnit}
          />
        )}
        <Outlet context={{ reexecuteQuery }} />
      </Box>
    </Box>
  );
};
