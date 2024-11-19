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
  DeleteContractDocumentsDocument,
  GetContractDocumentsDocument,
  GetContractDocumentsQueryVariables,
} from '../../../../gql/RealGimm.Web.Contract.operation';
import { useContract } from '../../../../hooks/useContract';
import { getContractDocumentsColumns } from '../../../../utils/contract/getContractDocumentsColumns';
import { ContractDocumentsProps } from './Documents.types';

export const ContractDocuments = ({ control, errors, mode, readonly }: ContractDocumentsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { addDocumentsSync, updateDocumentSync } = useContract();
  const contractId = useWatch({ control, name: 'contractId' });

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
      <SectionTitle value="contract.section_title.documents" />
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
                          label="contract.field.document_upload"
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
                {t('contract.action.add_document')}
              </Button>
            </Grid2>
          )}
        </>
      ) : (
        <Grid2 size={12}>
          <DocumentsTable<GetContractDocumentsQueryVariables>
            color="secondary"
            columns={getContractDocumentsColumns(t)}
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
                    document: DeleteContractDocumentsDocument,
                    variables: Number(contractId),
                  }
            }
            fieldsConfig={getDefaultDocumentFieldsConfig()}
            query={GetContractDocumentsDocument}
            defaultVariables={(variables) => ({
              ...variables,
              contractId: Number(contractId),
            })}
            onAdd={readonly ? undefined : (documents) => addDocumentsSync(contractId!, documents)}
            onEdit={readonly ? undefined : (document) => updateDocumentSync(contractId!, document)}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
