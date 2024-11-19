import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UtilityServiceEstateUnitsDialog } from '../../../../components/domains/UtilityService/EstateUnitsDialog/EstateUnitsDialog';
import { UtilityServiceEstatesDialog } from '../../../../components/domains/UtilityService/EstatesDialog/EstatesDialog';
import { UtilityServiceCreateDialog } from '../../../../components/wizards/UtilityService/UtilityService';
import { RawFeature } from '../../../../enums/RawFeature';
import { UtilityServiceFragment } from '../../../../gql/RealGimm.Web.UtilityService.fragment';
import {
  DeleteUtilityServicesDocument,
  ExportUtilityServicesDocument,
  GetUtilityServicesQueryVariables,
  useCreateUtilityServiceMutation,
  useGetUtilityServicesQuery,
} from '../../../../gql/RealGimm.Web.UtilityService.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';
import { getUtilityServicesColumns } from '../../../../utils/utilityService/getUtilityServicesColumns';
import { getUtilityServicesFilterInput } from '../../../../utils/utilityService/getUtilityServicesFilterInput';
import { getUtilityServicesSortInput } from '../../../../utils/utilityService/getUtilityServicesSortInput';
import { parseUtilityServiceFormInputToUtilityServiceInput } from '../../../../utils/utilityService/parseUtilityServiceFormInput';

export default function UtilityServices() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.NRGY_SERVICE_BASE);
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
  } = useTable<GetUtilityServicesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetUtilityServicesQuery({ pause, variables });
  const [, createUtilityServiceMutation] = useCreateUtilityServiceMutation();
  const [loading, setLoading] = useState(false);
  const [utilityServiceEstatesDialogProps, setUtilityServiceEstatesDialogProps] = useState<
    UtilityServiceFragment['estates'] | null
  >(null);
  const [utilityServiceEstateUnitsDialogProps, setUtilityServiceEstateUnitsDialogProps] = useState<
    UtilityServiceFragment['estateUnits'] | null
  >(null);
  const [isCreateUtilityServiceDialogOpen, setCreateUtilityServiceDialogOpen] = useState(false);
  const utilityServices = useMemo(() => queryState.data?.utilityService.listUtilityServices, [queryState.data]);

  const handleOpenCreateUtilityServiceDialog = useCallback(() => {
    setCreateUtilityServiceDialogOpen(true);
  }, []);

  const handleCloseCreateUtilityServiceDialog = useCallback(() => {
    setCreateUtilityServiceDialogOpen(false);
  }, []);
  const handleSaveCreateUtilityService = useCallback(
    async (utilityService: UtilityServiceFormInput) => {
      setLoading(true);
      const result = await createUtilityServiceMutation({
        utilityServiceInput: parseUtilityServiceFormInputToUtilityServiceInput(utilityService),
      });
      setLoading(false);
      if (result.data?.utilityService.add.isSuccess) {
        showSnackbar(t('utility_service.feedback.create'), 'success');
        handleCloseCreateUtilityServiceDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.utilityService.add.validationErrors);
      }
    },
    [createUtilityServiceMutation, showSnackbar, t, handleCloseCreateUtilityServiceDialog, reexecuteQuery, showError],
  );

  const showAllEstatesButton = useCallback(
    (row: UtilityServiceFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setUtilityServiceEstatesDialogProps(row.estates);
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
    (row: UtilityServiceFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setUtilityServiceEstateUnitsDialogProps(row.estateUnits);
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
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('utility_service.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getUtilityServicesColumns(t, showAllEstatesButton, showAllEstateUnitsButton)}
          empty="utility_service.text.no_utility_services"
          initialState={initialState}
          rows={utilityServices?.nodes ?? []}
          totalCount={utilityServices?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateUtilityServiceDialog : undefined}
          onDelete={
            canDelete ? handleDelete('utility_service', DeleteUtilityServicesDocument, reexecuteQuery) : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/energy-management/utility-services/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportUtilityServicesDocument) : undefined}
          onFilter={handleFilter(getUtilityServicesFilterInput)}
          onPageChange={handlePageChange(utilityServices?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getUtilityServicesSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/energy-management/utility-services/${row.id}`);
                }
              : undefined
          }
        />
      </CardContent>
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
      {isCreateUtilityServiceDialogOpen && (
        <UtilityServiceCreateDialog
          onClose={handleCloseCreateUtilityServiceDialog}
          onSave={handleSaveCreateUtilityService}
        />
      )}
    </Card>
  );
}
