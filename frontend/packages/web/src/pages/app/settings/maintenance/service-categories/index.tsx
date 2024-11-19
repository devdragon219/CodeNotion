import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ServiceSubCategorieDialog } from '../../../../../components/dialogs/ServiceSubCategories/ServiceSubCategories';
import { ServiceCategoryCreateDialog } from '../../../../../components/wizards/ServiceCategory/ServiceCategory';
import { RawFeature } from '../../../../../enums/RawFeature';
import { ServiceCategoryFragment } from '../../../../../gql/RealGimm.Web.ServiceCategory.fragment';
import {
  DeleteServiceCategoriesDocument,
  ExportServiceCategoriesDocument,
  GetServiceCategoriesQueryVariables,
  useAddServiceCategoryMutation,
  useGetServiceCategoriesQuery,
} from '../../../../../gql/RealGimm.Web.ServiceCategory.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { ServiceCategoryFormInput } from '../../../../../interfaces/FormInputs/ServiceCategory';
import { getQualificationLevelsSortInput } from '../../../../../utils/qualificationLevel/getQualificationLevelsSortInput';
import { getServiceCategoriesColumns } from '../../../../../utils/serviceCategory/getServiceCategoriesColumns';
import { getServiceCategoriesFilterInput } from '../../../../../utils/serviceCategory/getServiceCategoriesFilterInput';
import { parseServiceCategoryFormInputToServiceCategoryInput } from '../../../../../utils/serviceCategory/parseServiceCategoryFormInput';

export default function ServiceCategories() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_SERVICE_CATEGORY);
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
  } = useTable<GetServiceCategoriesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetServiceCategoriesQuery({ pause, variables });
  const [, createServiceCategoryMutation] = useAddServiceCategoryMutation();
  const [loading, setLoading] = useState(false);
  const [serviceSubCategoriesDialogProps, setServiceSubCategoriesDialogProps] =
    useState<ServiceCategoryFragment | null>(null);
  const [isCreateServiceCategoryDialogOpen, setCreateServiceCategoryDialogOpen] = useState(false);
  const serviceCategories = useMemo(() => queryState.data?.serviceCategory.listServiceCategories, [queryState.data]);

  const handleOpenCreateServiceCategoryDialog = useCallback(() => {
    setCreateServiceCategoryDialogOpen(true);
  }, []);

  const handleCloseCreateServiceCategoryDialog = useCallback(() => {
    setCreateServiceCategoryDialogOpen(false);
  }, []);
  const handleSaveCreateServiceCategory = useCallback(
    async (serviceCategory: ServiceCategoryFormInput) => {
      setLoading(true);
      const result = await createServiceCategoryMutation({
        input: parseServiceCategoryFormInputToServiceCategoryInput(serviceCategory),
      });
      setLoading(false);
      if (result.data?.serviceCategory.add.isSuccess) {
        showSnackbar(t('service_category.feedback.create'), 'success');
        handleCloseCreateServiceCategoryDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.serviceCategory.add.validationErrors);
      }
    },
    [createServiceCategoryMutation, showSnackbar, t, handleCloseCreateServiceCategoryDialog, reexecuteQuery, showError],
  );

  const showAllButton = useCallback(
    (row: ServiceCategoryFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setServiceSubCategoriesDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseServiceSubCategoriesDialog = useCallback(() => {
    setServiceSubCategoriesDialogProps(null);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('service_category.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getServiceCategoriesColumns(showAllButton)}
          empty="service_category.text.no_service_categories"
          initialState={initialState}
          rows={serviceCategories?.nodes ?? []}
          totalCount={serviceCategories?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateServiceCategoryDialog : undefined}
          onDelete={
            canDelete ? handleDelete('service_category', DeleteServiceCategoriesDocument, reexecuteQuery) : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/maintenance/service-categories/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportServiceCategoriesDocument) : undefined}
          onFilter={handleFilter(getServiceCategoriesFilterInput)}
          onPageChange={handlePageChange(serviceCategories?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getQualificationLevelsSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/maintenance/service-categories/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {serviceSubCategoriesDialogProps && (
        <ServiceSubCategorieDialog
          subCategories={serviceSubCategoriesDialogProps.subCategories}
          onClose={handleCloseServiceSubCategoriesDialog}
        />
      )}
      {isCreateServiceCategoryDialogOpen && (
        <ServiceCategoryCreateDialog
          onClose={handleCloseCreateServiceCategoryDialog}
          onSave={handleSaveCreateServiceCategory}
        />
      )}
    </Card>
  );
}
