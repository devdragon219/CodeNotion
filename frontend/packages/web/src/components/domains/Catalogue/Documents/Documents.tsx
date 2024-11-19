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
  DeleteCatalogueDocumentsDocument,
  GetCatalogueDocumentsDocument,
  GetCatalogueDocumentsQueryVariables,
} from '../../../../gql/RealGimm.Web.Catalogue.operation';
import { useCatalogue } from '../../../../hooks/useCatalogue';
import { getCatalogueDocumentsColumns } from '../../../../utils/catalogue/getCatalogueDocumentsColumns';
import { CatalogueDocumentsProps } from './Documents.types';

export const CatalogueDocuments = ({ control, mode, errors, readonly }: CatalogueDocumentsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { addDocumentsSync, updateDocumentSync } = useCatalogue();
  const catalogueType = useWatch({ control, name: 'catalogueType' })!;
  const estate = useWatch({ control, name: 'estate' })!;

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
      <SectionTitle value="catalogue.section_title.documents" />
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
                          label="estate_unit.field.document_upload"
                          contentCategoryGroupOptions={[
                            ContentCategoryGroup.CatAdmin,
                            ContentCategoryGroup.CatMgmt,
                            ContentCategoryGroup.CatTech,
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
                {t('catalogue.action.add_document')}
              </Button>
            </Grid2>
          )}
        </>
      ) : (
        <Grid2 size={12}>
          <DocumentsTable<GetCatalogueDocumentsQueryVariables>
            color="secondary"
            columns={getCatalogueDocumentsColumns(t)}
            contentCategoryGroupOptions={[
              ContentCategoryGroup.CatAdmin,
              ContentCategoryGroup.CatMgmt,
              ContentCategoryGroup.CatTech,
            ]}
            deleteProps={
              readonly
                ? undefined
                : {
                    document: DeleteCatalogueDocumentsDocument,
                    variables: {
                      catalogueTypeId: Number(catalogueType.catalogueTypeId),
                      estateId: Number(estate.id),
                    },
                  }
            }
            documentsKey="listDocuments"
            fieldsConfig={getDefaultDocumentFieldsConfig()}
            query={GetCatalogueDocumentsDocument}
            defaultVariables={(variables) => ({
              ...variables,
              catalogueTypeId: Number(catalogueType.catalogueTypeId),
              estateId: Number(estate.id),
            })}
            onAdd={
              readonly
                ? undefined
                : (documents) => addDocumentsSync(catalogueType.catalogueTypeId!, estate.id, documents)
            }
            onEdit={
              readonly
                ? undefined
                : (document) => updateDocumentSync(catalogueType.catalogueTypeId!, estate.id, document)
            }
          />
        </Grid2>
      )}
    </Grid2>
  );
};
