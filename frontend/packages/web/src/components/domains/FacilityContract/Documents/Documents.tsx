import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  Alert,
  DocumentFieldAccordion,
  DocumentsTable,
  RepeatableField,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { DEFAULT_MAX_UPLOADABLE_FILES } from '@realgimm5/frontend-common/configs';
import { useAuth } from '@realgimm5/frontend-common/contexts';
import { ContentCategoryGroup, FormMode } from '@realgimm5/frontend-common/enums';
import { useDocumentsCount, useFieldArray } from '@realgimm5/frontend-common/hooks';
import { getDefaultDocumentFieldsConfig, getEmptyDocumentFormInput } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  DeleteFacilityContractDocumentsDocument,
  GetFacilityContractDocumentsDocument,
  GetFacilityContractDocumentsQueryVariables,
} from '../../../../gql/RealGimm.Web.FacilityContract.operation';
import { useFacilityContract } from '../../../../hooks/useFacilityContract';
import { getFacilityContractDocumentsColumns } from '../../../../utils/facilityContract/getFacilityContractDocumentsColumns';
import { FacilityContractDocumentsProps } from './Documents.types';

export const FacilityContractDocuments = ({ control, errors, mode, readonly }: FacilityContractDocumentsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { addDocumentsSync, updateDocumentSync } = useFacilityContract();
  const facilityContractId = useWatch({ control, name: 'facilityContractId' });

  const { fields, append, remove } = useFieldArray({ control, name: 'documents' });

  const { canAddMoreDocuments, canUploadMoreFiles, remainingUploads } = useDocumentsCount(fields);
  const handleAddDocument = useCallback(() => {
    append(getEmptyDocumentFormInput(user?.username));
  }, [append, user]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && !canUploadMoreFiles && (
        <Grid2 size={12}>
          <Alert
            severity="warning"
            message={`${t('common.component.document_upload.no_uploads_remaining', {
              maxUploads: DEFAULT_MAX_UPLOADABLE_FILES,
            })}. ${t('common.component.document_upload.further_uploads')}`}
          />
        </Grid2>
      )}
      <SectionTitle value="facility_contract.section_title.documents" />
      {mode === FormMode.Create ? (
        <>
          {fields.length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {fields.map(({ key }, index) => (
                  <RepeatableField key={key} index={index} onDelete={remove}>
                    <Controller
                      name={`documents.${index}`}
                      control={control}
                      render={({ field }) => (
                        <DocumentFieldAccordion
                          {...field}
                          documents={fields}
                          index={index}
                          errors={errors.documents}
                          label="facility_contract.field.document_upload"
                          contentCategoryGroupOptions={[
                            ContentCategoryGroup.BldAdmin,
                            ContentCategoryGroup.BldMgmt,
                            ContentCategoryGroup.BldPlan,
                            ContentCategoryGroup.BldTech,
                          ]}
                          fieldsConfig={getDefaultDocumentFieldsConfig()}
                          availableUploads={remainingUploads}
                        />
                      )}
                    />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
          )}
          {canAddMoreDocuments && (
            <Grid2 size={12}>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleAddDocument}
              >
                {t('facility_contract.action.add_document')}
              </Button>
            </Grid2>
          )}
        </>
      ) : (
        <Grid2 size={12}>
          <DocumentsTable<GetFacilityContractDocumentsQueryVariables>
            color="secondary"
            columns={getFacilityContractDocumentsColumns(t)}
            contentCategoryGroupOptions={[
              ContentCategoryGroup.BldAdmin,
              ContentCategoryGroup.BldMgmt,
              ContentCategoryGroup.BldPlan,
              ContentCategoryGroup.BldTech,
            ]}
            deleteProps={
              readonly
                ? undefined
                : {
                    document: DeleteFacilityContractDocumentsDocument,
                    variables: Number(facilityContractId),
                  }
            }
            fieldsConfig={getDefaultDocumentFieldsConfig()}
            query={GetFacilityContractDocumentsDocument}
            defaultVariables={(variables) => ({
              ...variables,
              facilityContractId: Number(facilityContractId),
            })}
            onAdd={readonly ? undefined : (documents) => addDocumentsSync(facilityContractId!, documents)}
            onEdit={readonly ? undefined : (document) => updateDocumentSync(facilityContractId!, document)}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
