import { Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import { CostChargeFragment } from '../../../gql/RealGimm.Web.CostCharge.fragment';
import {
  DeleteCostChargesDocument,
  ExportCostChargesDocument,
  GetCostChargesQueryVariables,
  useCreateCostChargeMutation,
  useGetCostChargesQuery,
  useImportCostChargesMutation,
} from '../../../gql/RealGimm.Web.CostCharge.operation';
import { useFeature } from '../../../hooks/useFeature';
import { CostChargeFormInput } from '../../../interfaces/FormInputs/CostCharge';
import { getCostChargesColumns } from '../../../utils/costCharge/getCostChargesColumns';
import { getCostChargesFilterInput } from '../../../utils/costCharge/getCostChargesFilterInput';
import { getCostChargesSortInput } from '../../../utils/costCharge/getCostChargesSortInput';
import { parseCostChargeFormInputToCostChargeInput } from '../../../utils/costCharge/parseCostChargeFormInput';
import { CostChargesCreateDialog } from '../../dialogs/CostCharges/CostCharges';
import { UtilityServiceEstateUnitsDialog } from '../../domains/UtilityService/EstateUnitsDialog/EstateUnitsDialog';
import { UtilityServiceEstatesDialog } from '../../domains/UtilityService/EstatesDialog/EstatesDialog';
import { CostChargeCreateDialog } from '../../wizards/CostCharge/CostCharge';
import { CostChargesTableProps } from './CostCharges.types';

export const CostChargesTable = ({ readonly, utilityService }: CostChargesTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.NRGY_COSTCHARGE_BASE);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setInitialState,
  } = useTable<GetCostChargesQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      ...(utilityService
        ? {
            service: {
              id: {
                eq: utilityService.id,
              },
            },
          }
        : {}),
    },
  }));
  const [queryState, reexecuteQuery] = useGetCostChargesQuery({ pause, variables });
  const [, createCostChargeMutation] = useCreateCostChargeMutation();
  const [, importCostChargesMutation] = useImportCostChargesMutation();
  const [loading, setLoading] = useState(false);
  const [utilityServiceEstatesDialogProps, setUtilityServiceEstatesDialogProps] = useState<
    CostChargeFragment['service']['estates'] | null
  >(null);
  const [utilityServiceEstateUnitsDialogProps, setUtilityServiceEstateUnitsDialogProps] = useState<
    CostChargeFragment['service']['estateUnits'] | null
  >(null);
  const [isCreateCostChargeDialogOpen, setCreateCostChargeDialogOpen] = useState(false);
  const [isCreateCostChargesDialogOpen, setCreateCostChargesDialogOpen] = useState(false);
  const costCharges = useMemo(() => queryState.data?.costCharge.listCostCharges, [queryState.data]);
  const hasNoCostCharges = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (costCharges?.totalCount ?? 0) === 0,
    [costCharges, variables],
  );

  const handleOpenCreateCostChargeDialog = useCallback(() => {
    setCreateCostChargeDialogOpen(true);
  }, []);

  const handleCloseCreateCostChargeDialog = useCallback(() => {
    setCreateCostChargeDialogOpen(false);
  }, []);
  const handleSaveCreateCostCharge = useCallback(
    async (costCharge: CostChargeFormInput) => {
      setLoading(true);
      const result = await createCostChargeMutation({
        costChargeInput: parseCostChargeFormInputToCostChargeInput(costCharge),
      });
      setLoading(false);
      if (result.data?.costCharge.add.isSuccess) {
        showSnackbar(t('cost_charge.feedback.create'), 'success');
        handleCloseCreateCostChargeDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.costCharge.add.validationErrors);
      }
    },
    [createCostChargeMutation, showSnackbar, t, handleCloseCreateCostChargeDialog, reexecuteQuery, showError],
  );

  const handleOpenCreateCostChargesDialog = useCallback(() => {
    setCreateCostChargesDialogOpen(true);
  }, []);

  const handleCloseCreateCostChargesDialog = useCallback(() => {
    setCreateCostChargesDialogOpen(false);
  }, []);
  const handleSaveCreateCostCharges = useCallback(
    async (document: DocumentFormInput) => {
      setLoading(true);
      const result = await importCostChargesMutation({
        file: document.content!,
      });
      setLoading(false);
      if (result.data?.costCharge.import.isSuccess) {
        showSnackbar(
          t('cost_charge.feedback.import', {
            amount: result.data.costCharge.import.value,
          }),
          'success',
        );
        handleCloseCreateCostChargesDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.costCharge.import.validationErrors);
      }
    },
    [importCostChargesMutation, showSnackbar, t, handleCloseCreateCostChargesDialog, reexecuteQuery, showError],
  );

  const showAllEstatesButton = useCallback(
    (row: CostChargeFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setUtilityServiceEstatesDialogProps(row.service.estates);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseUtilityServiceEstatesDialog = useCallback(() => {
    setUtilityServiceEstatesDialogProps(null);
  }, []);

  const showAllEstateUnitsButton = useCallback(
    (row: CostChargeFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setUtilityServiceEstateUnitsDialogProps(row.service.estateUnits);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseUtilityServiceEstateUnitsDialog = useCallback(() => {
    setUtilityServiceEstateUnitsDialogProps(null);
  }, []);

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoCostCharges ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="utility_service.section_title.no_cost_charges" />
      ) : (
        <PrimaryTable
          color={utilityService ? 'secondary' : 'primary'}
          columns={getCostChargesColumns(showAllEstatesButton, showAllEstateUnitsButton)}
          empty="cost_charge.text.no_cost_charges"
          initialState={initialState}
          rows={costCharges?.nodes ?? []}
          totalCount={costCharges?.totalCount ?? 0}
          useRowSelection={!readonly}
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly || !canCreate
              ? undefined
              : {
                  actions: [
                    {
                      color: 'secondary',
                      label: 'cost_charge.action.add_single_cost_charge',
                      onClick: handleOpenCreateCostChargeDialog,
                    },
                    {
                      color: 'secondary',
                      label: 'cost_charge.action.add_multiple_cost_charges',
                      onClick: handleOpenCreateCostChargesDialog,
                    },
                  ],
                  color: utilityService ? 'secondary' : 'primary',
                  label: 'common.button.add',
                }
          }
          onDelete={
            readonly || !canDelete ? undefined : handleDelete('cost_charge', DeleteCostChargesDocument, reexecuteQuery)
          }
          onEdit={
            readonly || !canUpdate
              ? undefined
              : (row) => {
                  navigate(`/app/energy-management/cost-charges/${row.id}`, { state: { readonly: false } });
                }
          }
          onExport={readonly || !canRead ? undefined : handleExport('id', ExportCostChargesDocument)}
          onFilter={handleFilter(getCostChargesFilterInput)}
          onPageChange={handlePageChange(costCharges?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getCostChargesSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/energy-management/cost-charges/${row.id}`);
                }
              : undefined
          }
        />
      )}
      {utilityServiceEstatesDialogProps && (
        <UtilityServiceEstatesDialog
          estates={utilityServiceEstatesDialogProps}
          onClose={handleCloseUtilityServiceEstatesDialog}
        />
      )}
      {utilityServiceEstateUnitsDialogProps && (
        <UtilityServiceEstateUnitsDialog
          estateUnits={utilityServiceEstateUnitsDialogProps}
          onClose={handleCloseUtilityServiceEstateUnitsDialog}
        />
      )}
      {isCreateCostChargeDialogOpen && (
        <CostChargeCreateDialog
          utilityService={utilityService}
          onClose={handleCloseCreateCostChargeDialog}
          onSave={handleSaveCreateCostCharge}
        />
      )}
      {isCreateCostChargesDialogOpen && (
        <CostChargesCreateDialog onClose={handleCloseCreateCostChargesDialog} onSave={handleSaveCreateCostCharges} />
      )}
    </>
  );
};
