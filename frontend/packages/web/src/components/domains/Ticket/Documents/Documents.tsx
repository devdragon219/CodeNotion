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
import { FileType, FormMode } from '@realgimm5/frontend-common/enums';
import { useDocumentsCount, useFieldArray } from '@realgimm5/frontend-common/hooks';
import { getDocumentsTableColumns, getEmptyDocumentFormInput } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  DeleteTicketDocumentsDocument,
  GetTicketDocumentsDocument,
  GetTicketDocumentsQueryVariables,
  GetTicketImagesDocument,
  GetTicketImagesQueryVariables,
} from '../../../../gql/RealGimm.Web.Ticket.operation';
import { useTicket } from '../../../../hooks/useTicket';
import { getTicketDocumentFieldsConfig } from '../../../../utils/ticket/getTicketDocumentFieldsConfig';
import { getTicketDocumentsColumns } from '../../../../utils/ticket/getTicketDocumentsColumns';
import { TicketDocumentsProps } from './Documents.types';

export const TicketDocuments = ({ control, errors, mode, readonly }: TicketDocumentsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { addDocumentsSync, updateDocumentSync } = useTicket();
  const ticketId = useWatch({ control, name: 'ticketId' });

  const images = useWatch({ control, name: 'images' });
  const { fields, append, remove } = useFieldArray({ control, name: 'documents' });

  const { canAddMoreDocuments, canUploadMoreFiles, remainingUploads } = useDocumentsCount([...images, ...fields]);
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
      <SectionTitle value="ticket.section_title.images" />
      <Grid2 size={12}>
        {mode === FormMode.Create ? (
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <DocumentField
                {...field}
                errors={errors.images}
                label="ticket.field.image_upload"
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
          <DocumentsTable<GetTicketImagesQueryVariables>
            color="secondary"
            columns={getDocumentsTableColumns(t, { useFilter: false })}
            deleteProps={
              readonly
                ? undefined
                : {
                    document: DeleteTicketDocumentsDocument,
                    variables: Number(ticketId),
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
            query={GetTicketImagesDocument}
            useRowExpandCollapse={false}
            useSlider
            defaultVariables={(variables) => ({
              ...variables,
              ticketId: Number(ticketId),
            })}
            onAdd={readonly ? undefined : (photos) => addDocumentsSync(ticketId!, [], photos)}
          />
        )}
      </Grid2>
      <SectionTitle value="ticket.section_title.documents" />
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
                          label="ticket.field.document_upload"
                          fieldsConfig={getTicketDocumentFieldsConfig()}
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
                {t('ticket.action.add_document')}
              </Button>
            </Grid2>
          )}
        </>
      ) : (
        <Grid2 size={12}>
          <DocumentsTable<GetTicketDocumentsQueryVariables>
            color="secondary"
            columns={getTicketDocumentsColumns(t)}
            deleteProps={
              readonly
                ? undefined
                : {
                    document: DeleteTicketDocumentsDocument,
                    variables: Number(ticketId),
                  }
            }
            fieldsConfig={getTicketDocumentFieldsConfig()}
            query={GetTicketDocumentsDocument}
            useRowExpandCollapse={false}
            defaultVariables={(variables) => ({
              ...variables,
              ticketId: Number(ticketId),
            })}
            onAdd={readonly ? undefined : (documents) => addDocumentsSync(ticketId!, documents, [])}
            onEdit={readonly ? undefined : (document) => updateDocumentSync(ticketId!, document)}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
