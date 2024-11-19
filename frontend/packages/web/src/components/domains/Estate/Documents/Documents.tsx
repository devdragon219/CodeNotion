import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  Alert,
  DocumentField,
  DocumentFieldAccordion,
  DocumentsTable,
  RepeatableField,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { DEFAULT_MAX_UPLOADABLE_FILES } from '@realgimm5/frontend-common/configs';
import { useAuth } from '@realgimm5/frontend-common/contexts';
import { ContentCategoryGroup, FileType, FormMode } from '@realgimm5/frontend-common/enums';
import { useDocumentsCount, useFieldArray } from '@realgimm5/frontend-common/hooks';
import {
  getDefaultDocumentFieldsConfig,
  getDocumentsTableColumns,
  getEmptyDocumentFormInput,
} from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  DeleteEstateDocumentsDocument,
  GetEstateDocumentsDocument,
  GetEstateDocumentsQueryVariables,
  GetEstateImagesDocument,
  GetEstateImagesQueryVariables,
} from '../../../../gql/RealGimm.Web.Estate.operation';
import { useEstate } from '../../../../hooks/useEstate';
import { getEstateDocumentsColumns } from '../../../../utils/estate/getEstateDocumentsColumns';
import { EstateDocumentsProps } from './Documents.types';

export const EstateDocuments = ({ control, errors, mode, readonly }: EstateDocumentsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { addDocumentsSync, updateDocumentSync } = useEstate();
  const navigate = useNavigate();
  const estateId = useWatch({ control, name: 'estateId' });

  const images = useWatch({ control, name: 'images' });
  const { fields, append, remove } = useFieldArray({ control, name: 'documents' });

  const { canAddMoreDocuments, canUploadMoreFiles, remainingUploads } = useDocumentsCount([...images, ...fields]);
  const handleAddDocument = useCallback(() => {
    append(getEmptyDocumentFormInput(user?.username));
  }, [append, user]);

  const handleViewPortfolioClick = useCallback(() => {
    navigate(`/app/real-estate/estates/${estateId}/portfolio`);
  }, [estateId, navigate]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && readonly && (
        <Grid2
          size={12}
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button color="tertiary" variant="outlined" onClick={handleViewPortfolioClick}>
            {t('estate.action.view_portfolio')}
          </Button>
        </Grid2>
      )}
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
      <SectionTitle value="estate.section_title.images" />
      <Grid2 size={12}>
        {mode === FormMode.Create ? (
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <DocumentField
                {...field}
                errors={errors.images}
                label="estate.field.image_upload"
                fileTypes={[
                  FileType.ImageGif,
                  FileType.ImageJpeg,
                  FileType.ImagePng,
                  FileType.ImageSvg,
                  FileType.ImageTiff,
                ]}
                multiple
                readonly={readonly}
                availableUploads={remainingUploads}
              />
            )}
          />
        ) : (
          <DocumentsTable<GetEstateImagesQueryVariables>
            color="secondary"
            columns={getDocumentsTableColumns(t, { useFilter: false })}
            deleteProps={
              readonly
                ? undefined
                : {
                    document: DeleteEstateDocumentsDocument,
                    variables: Number(estateId),
                  }
            }
            documentsKey="images"
            fileTypes={[
              FileType.ImageGif,
              FileType.ImageJpeg,
              FileType.ImagePng,
              FileType.ImageSvg,
              FileType.ImageTiff,
            ]}
            multiple
            query={GetEstateImagesDocument}
            useRowExpandCollapse={false}
            defaultVariables={(variables) => ({
              ...variables,
              estateId: Number(estateId),
            })}
            onAdd={readonly ? undefined : (photos) => addDocumentsSync(estateId!, [], photos)}
          />
        )}
      </Grid2>
      <SectionTitle value="estate.section_title.documents" />
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
                          label="estate.field.document_upload"
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
                {t('estate.action.add_document')}
              </Button>
            </Grid2>
          )}
        </>
      ) : (
        <Grid2 size={12}>
          <DocumentsTable<GetEstateDocumentsQueryVariables>
            color="secondary"
            columns={getEstateDocumentsColumns(t)}
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
                    document: DeleteEstateDocumentsDocument,
                    variables: Number(estateId),
                  }
            }
            fieldsConfig={getDefaultDocumentFieldsConfig()}
            query={GetEstateDocumentsDocument}
            defaultVariables={(variables) => ({
              ...variables,
              estateId: Number(estateId),
            })}
            onAdd={readonly ? undefined : (documents) => addDocumentsSync(estateId!, documents, [])}
            onEdit={readonly ? undefined : (document) => updateDocumentSync(estateId!, document)}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
