import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  DocumentFieldAccordion,
  DocumentsTable,
  RepeatableField,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { useAuth } from '@realgimm5/frontend-common/contexts';
import { ContentCategoryGroup, FormMode } from '@realgimm5/frontend-common/enums';
import { ContentCategory } from '@realgimm5/frontend-common/gql/types';
import { useDocumentsCount, useFieldArray } from '@realgimm5/frontend-common/hooks';
import { getEmptyDocumentFormInput } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  DeleteSubjectDocumentsDocument,
  GetSubjectDocumentsDocument,
  GetSubjectDocumentsQueryVariables,
} from '../../../../gql/RealGimm.Web.Subject.operation';
import { useSubject } from '../../../../hooks/useSubject';
import {
  getSubjectIdentityDocumentFieldsConfig,
  getSubjectOtherDocumentFieldsConfig,
} from '../../../../utils/subject/getSubjectDocumentFieldsConfig';
import {
  getSubjectIdentityDocumentsColumns,
  getSubjectOtherDocumentsColumns,
} from '../../../../utils/subject/getSubjectDocumentsColumns';
import { SubjectDocumentsProps } from './Documents.types';

export const SubjectDocuments = ({ control, errors, mode, readonly }: SubjectDocumentsProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { addDocumentsSync, updateDocumentSync } = useSubject();
  const subjectId = useWatch({ control, name: 'subjectId' });
  const entryStatus = useWatch({ control, name: 'entryStatus' });

  const {
    fields: identityDocuments,
    append: appendIdentityDocument,
    remove: removeIdentityDocument,
  } = useFieldArray({ control, name: 'documents.identities' });
  const {
    fields: otherDocuments,
    append: appendOtherDocument,
    remove: removeOtherDocument,
  } = useFieldArray({ control, name: 'documents.others' });

  const { canAddMoreDocuments, remainingUploads } = useDocumentsCount([...identityDocuments, ...otherDocuments]);

  const handleAddIdentityDocument = useCallback(() => {
    appendIdentityDocument(getEmptyDocumentFormInput(user?.username, ContentCategoryGroup.SbjIdentity));
  }, [appendIdentityDocument, user]);

  const handleAddOtherDocument = useCallback(() => {
    appendOtherDocument(getEmptyDocumentFormInput(user?.username));
  }, [appendOtherDocument, user]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="subject.section_title.identity_document" />
      {mode === FormMode.Create ? (
        <>
          {identityDocuments.length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {identityDocuments.map(({ key }, index) => (
                  <RepeatableField key={key} index={index} onDelete={removeIdentityDocument}>
                    <Controller
                      name={`documents.identities.${index}`}
                      control={control}
                      render={({ field }) => (
                        <DocumentFieldAccordion
                          {...field}
                          documents={identityDocuments}
                          index={index}
                          errors={errors.documents?.identities}
                          label="subject.field.identity_document_upload"
                          description="subject.field.identity_document_upload_description"
                          contentCategoryGroupOptions={[ContentCategoryGroup.SbjIdentity]}
                          fieldsConfig={getSubjectIdentityDocumentFieldsConfig()}
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
                onClick={handleAddIdentityDocument}
              >
                {t('subject.action.add_identity_document')}
              </Button>
            </Grid2>
          )}
        </>
      ) : (
        <Grid2 size={12}>
          <DocumentsTable<GetSubjectDocumentsQueryVariables>
            addLabel="subject.action.add_identity_document"
            color="secondary"
            columns={getSubjectIdentityDocumentsColumns(t)}
            contentCategoryGroupOptions={[ContentCategoryGroup.SbjIdentity]}
            deleteProps={
              readonly
                ? undefined
                : {
                    document: DeleteSubjectDocumentsDocument,
                    variables: Number(subjectId),
                  }
            }
            entryStatus={entryStatus}
            fieldsConfig={getSubjectIdentityDocumentFieldsConfig()}
            query={GetSubjectDocumentsDocument}
            useRowExpandCollapse={false}
            defaultVariables={(variables) => ({
              ...variables,
              subjectId: Number(subjectId),
              where: {
                ...(variables.where ?? {}),
                contentCategoryGroupIn: [ContentCategoryGroup.SbjIdentity],
              },
            })}
            onAdd={readonly ? undefined : (documents) => addDocumentsSync(subjectId!, documents, [])}
            onEdit={
              readonly
                ? undefined
                : (document) => updateDocumentSync(subjectId!, document, ContentCategory.SbjIdentityNational)
            }
          />
        </Grid2>
      )}
      <SectionTitle value="subject.section_title.other_documents" />
      {mode === FormMode.Create ? (
        <>
          {otherDocuments.length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {otherDocuments.map(({ key }, index) => (
                  <RepeatableField key={key} index={index} onDelete={removeOtherDocument}>
                    <Controller
                      name={`documents.others.${index}`}
                      control={control}
                      render={({ field }) => (
                        <DocumentFieldAccordion
                          {...field}
                          documents={otherDocuments}
                          index={index}
                          errors={errors.documents?.others}
                          label="subject.field.other_document_upload"
                          contentCategoryGroupOptions={[ContentCategoryGroup.SbjOther]}
                          fieldsConfig={getSubjectOtherDocumentFieldsConfig()}
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
                onClick={handleAddOtherDocument}
              >
                {t('subject.action.add_other_document')}
              </Button>
            </Grid2>
          )}
        </>
      ) : (
        <Grid2 size={12}>
          <DocumentsTable<GetSubjectDocumentsQueryVariables>
            addLabel="subject.action.add_other_document"
            color="secondary"
            columns={getSubjectOtherDocumentsColumns(t)}
            contentCategoryGroupOptions={[ContentCategoryGroup.SbjOther]}
            deleteProps={
              readonly
                ? undefined
                : {
                    document: DeleteSubjectDocumentsDocument,
                    variables: Number(subjectId),
                  }
            }
            entryStatus={entryStatus}
            fieldsConfig={getSubjectOtherDocumentFieldsConfig()}
            query={GetSubjectDocumentsDocument}
            useRowExpandCollapse={false}
            defaultVariables={(variables) => ({
              ...variables,
              subjectId: Number(subjectId),
              where: {
                ...(variables.where ?? {}),
                contentCategoryGroupIn: [ContentCategoryGroup.SbjOther],
              },
            })}
            onAdd={readonly ? undefined : (documents) => addDocumentsSync(subjectId!, [], documents)}
            onEdit={
              readonly ? undefined : (document) => updateDocumentSync(subjectId!, document, ContentCategory.SbjOther)
            }
          />
        </Grid2>
      )}
    </Grid2>
  );
};
