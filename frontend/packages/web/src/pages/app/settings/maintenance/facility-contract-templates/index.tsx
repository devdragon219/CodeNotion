import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FacilityContractTemplateCatalogueTypesDialog } from '../../../../../components/domains/FacilityContractTemplate/CatalogueTypes/Dialog/Dialog';
import { FacilityContractTemplateCreateDialog } from '../../../../../components/wizards/FacilityContractTemplate/FacilityContractTemplate';
import { RawFeature } from '../../../../../enums/RawFeature';
import { FacilityContractTemplateFragment } from '../../../../../gql/RealGimm.Web.FacilityContractTemplate.fragment';
import {
  DeleteFacilityContractTemplatesDocument,
  ExportFacilityContractTemplatesDocument,
  GetFacilityContractTemplatesQueryVariables,
  useAddFacilityContractTemplateMutation,
  useGetFacilityContractTemplatesQuery,
} from '../../../../../gql/RealGimm.Web.FacilityContractTemplate.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';
import { getFacilityContractTemplatesColumns } from '../../../../../utils/facilityContractTemplate/getFacilityContractTemplatesColumns';
import { parseFacilityContractTemplateFormInputToFacilityContractTemplateInput } from '../../../../../utils/facilityContractTemplate/parseFacilityContractTemplateFormInput';

export default function FacilityContractTemplates() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONTRACT_TEMPLATES);
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
  } = useTable<GetFacilityContractTemplatesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetFacilityContractTemplatesQuery({ pause, variables });
  const [, createFacilityContractTemplateMutation] = useAddFacilityContractTemplateMutation();
  const [loading, setLoading] = useState(false);
  const [catalogueTypesDialogProps, setCatalogueTypesDialogProps] = useState<FacilityContractTemplateFragment | null>(
    null,
  );
  const [isCreateFacilityContractTemplateDialogOpen, setCreateFacilityContractTemplateDialogOpen] = useState(false);
  const facilityContractTemplates = useMemo(
    () => queryState.data?.contractTemplate.listContractTemplates,
    [queryState.data],
  );

  const handleOpenCreateFacilityContractTemplateDialog = useCallback(() => {
    setCreateFacilityContractTemplateDialogOpen(true);
  }, []);

  const handleCloseCreateFacilityContractTemplateDialog = useCallback(() => {
    setCreateFacilityContractTemplateDialogOpen(false);
  }, []);
  const handleSaveCreateFacilityContractTemplate = useCallback(
    async (facilityContractTemplate: FacilityContractTemplateFormInput) => {
      setLoading(true);
      const result = await createFacilityContractTemplateMutation({
        input: parseFacilityContractTemplateFormInputToFacilityContractTemplateInput(facilityContractTemplate),
      });
      setLoading(false);
      if (result.data?.contractTemplate.add.isSuccess) {
        showSnackbar(t('facility_contract_template.feedback.create'), 'success');
        handleCloseCreateFacilityContractTemplateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.contractTemplate.add.validationErrors);
      }
    },
    [
      createFacilityContractTemplateMutation,
      showSnackbar,
      t,
      handleCloseCreateFacilityContractTemplateDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const showAllButton = useCallback(
    (row: FacilityContractTemplateFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setCatalogueTypesDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseCatalogueTypesDialog = useCallback(() => {
    setCatalogueTypesDialogProps(null);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('facility_contract_template.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getFacilityContractTemplatesColumns(showAllButton)}
          empty="facility_contract_template.text.no_facility_contract_templates"
          initialState={initialState}
          rows={facilityContractTemplates?.nodes ?? []}
          totalCount={facilityContractTemplates?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateFacilityContractTemplateDialog : undefined}
          onDelete={
            canDelete
              ? handleDelete('facility_contract_template', DeleteFacilityContractTemplatesDocument, reexecuteQuery)
              : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/maintenance/facility-contract-templates/${row.id}`, {
                    state: { readonly: false },
                  });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportFacilityContractTemplatesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(facilityContractTemplates?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/maintenance/facility-contract-templates/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {catalogueTypesDialogProps && (
        <FacilityContractTemplateCatalogueTypesDialog
          catalogueTypes={catalogueTypesDialogProps.catalogueTypes}
          onClose={handleCloseCatalogueTypesDialog}
        />
      )}
      {isCreateFacilityContractTemplateDialogOpen && (
        <FacilityContractTemplateCreateDialog
          onClose={handleCloseCreateFacilityContractTemplateDialog}
          onSave={handleSaveCreateFacilityContractTemplate}
        />
      )}
    </Card>
  );
}
