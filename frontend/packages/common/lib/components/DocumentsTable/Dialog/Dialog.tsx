import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DEFAULT_MAX_UPLOADABLE_FILES } from '../../../configs/defaults';
import { useAuth } from '../../../contexts/auth/hook';
import { useDocumentsCount } from '../../../hooks/useDocumentsCount';
import { useFieldArray } from '../../../hooks/useFieldArray';
import { DocumentFormInput, DocumentsFieldValues } from '../../../interfaces/FormInputs/Document';
import { getEmptyDocumentFormInput } from '../../../utils/documentField/initialValues';
import { getDocumentsSchema } from '../../../utils/documentField/schemas/document';
import { Alert } from '../../Alert/Alert';
import { DialogContent } from '../../Dialog/Content/Content';
import { Dialog } from '../../Dialog/Dialog';
import { DocumentFieldAccordion } from '../../Fields/Document/Accordion/Accordion';
import { DocumentField } from '../../Fields/Document/Document';
import { RepeatableField } from '../../Fields/Repeatable/Repeatable';
import { Form } from '../../Form/Form';
import { SectionTitle } from '../../SectionTitle/SectionTitle';
import { DocumentDialogProps } from './Dialog.types';

export const DocumentDialog = ({
  contentCategoryGroupOptions,
  entryStatus,
  existingDocumentNames,
  fieldsConfig,
  fileTypes,
  input,
  onClose,
  onSave,
}: DocumentDialogProps) => {
  const { user } = useAuth();
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<DocumentsFieldValues>({
    defaultValues: {
      documents: [input ? input : getEmptyDocumentFormInput(user?.username)],
    },
    resolver: yupResolver(getDocumentsSchema(language, t, { entryStatus, existingDocumentNames, fieldsConfig })),
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'documents' });

  const { canAddMoreDocuments, canUploadMoreFiles, remainingUploads } = useDocumentsCount(fields);

  const handleAddDocument = useCallback(() => {
    append(getEmptyDocumentFormInput(user?.username));
  }, [append, user]);

  const onSubmit = useCallback(
    (formValues: { documents: DocumentFormInput[] }) => {
      onSave(input ? formValues.documents[0] : formValues.documents);
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`common.component.documents_table.dialog.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            {!canUploadMoreFiles && (
              <Grid2 size={12}>
                <Alert
                  severity="warning"
                  message={`${t('common.component.document_upload.no_uploads_remaining', {
                    maxUploads: DEFAULT_MAX_UPLOADABLE_FILES,
                  })}. ${t('common.component.document_upload.further_uploads')}`}
                />
              </Grid2>
            )}
            {input ? (
              <Grid2 size={12}>
                <Controller
                  name="documents.0"
                  control={control}
                  render={({ field }) => (
                    <DocumentField
                      {...field}
                      contentCategoryGroupOptions={contentCategoryGroupOptions}
                      errors={errors.documents}
                      fieldsConfig={fieldsConfig}
                      fileTypes={fileTypes}
                      index={0}
                      label="common.component.documents_table.field.document_upload"
                    />
                  )}
                />
              </Grid2>
            ) : (
              <>
                <SectionTitle value="common.component.documents_table.section_title.documents" />
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
                                availableUploads={remainingUploads}
                                contentCategoryGroupOptions={contentCategoryGroupOptions}
                                documents={fields}
                                errors={errors.documents}
                                fieldsConfig={fieldsConfig}
                                fileTypes={fileTypes}
                                index={index}
                                label="common.component.documents_table.field.document_upload"
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
                      {t('common.component.documents_table.action.add_document')}
                    </Button>
                  </Grid2>
                )}
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
