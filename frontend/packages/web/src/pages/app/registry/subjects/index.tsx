import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { LegalSubjectInput, ManagementSubjectInput, PhysicalSubjectInput } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SubjectCreateDialog } from '../../../../components/wizards/Subject/Subject';
import { LegalNature } from '../../../../enums/LegalNature';
import { RawFeature } from '../../../../enums/RawFeature';
import { SubjectType } from '../../../../enums/SubjectType';
import {
  DeleteSubjectsDocument,
  ExportSubjectsDocument,
  GetSubjectsQueryVariables,
  useCreateLegalSubjectMutation,
  useCreateManagementSubjectMutation,
  useCreatePhysicalSubjectMutation,
  useGetSubjectsQuery,
} from '../../../../gql/RealGimm.Web.Subject.operation';
import { useGetAllSubjectCategoriesQuery } from '../../../../gql/RealGimm.Web.SubjectCategory.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useSubject } from '../../../../hooks/useSubject';
import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';
import { getSubjectsColumns } from '../../../../utils/subject/getSubjectsColumns';
import { getSubjectsFilterInput } from '../../../../utils/subject/getSubjectsFilterInput';
import { getSubjectsSortInput } from '../../../../utils/subject/getSubjectsSortInput';
import { parseSubjectFormInputToSubjectInput } from '../../../../utils/subject/parseSubjectFormInput';

export default function Subjects() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ANAG_SUBJECT_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
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
  } = useTable<GetSubjectsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetSubjectsQuery({ pause, variables });
  const [, createLegalSubjectMutation] = useCreateLegalSubjectMutation();
  const [, createManagementSubjectMutation] = useCreateManagementSubjectMutation();
  const [, createPhysicalSubjectMutation] = useCreatePhysicalSubjectMutation();
  const { addDocumentsAsync } = useSubject();
  const [loading, setLoading] = useState(false);
  const [createSubjectDialogProps, setCreateSubjectDialogProps] = useState<SubjectType | null>(null);
  const [getSubjectCategoriesState] = useGetAllSubjectCategoriesQuery({
    variables: {
      where: {
        function: {
          neq: {
            isCompanyGroup: true,
          },
        },
      },
    },
  });
  const categories = useMemo(
    () => getSubjectCategoriesState.data?.subjectCategory.allSubjectCategories ?? [],
    [getSubjectCategoriesState.data?.subjectCategory.allSubjectCategories],
  );
  const subjects = useMemo(() => queryState.data?.subject.listSubjects, [queryState.data]);

  const handleOpenCreateManagementSubjectDialog = useCallback(() => {
    setCreateSubjectDialogProps(SubjectType.ManagementSubject);
  }, []);
  const handleOpenCreateOtherSubjectDialog = useCallback(() => {
    setCreateSubjectDialogProps(SubjectType.Other);
  }, []);

  const handleCloseCreateSubjectDialog = useCallback(() => {
    setCreateSubjectDialogProps(null);
  }, []);
  const handleSaveCreateSubject = useCallback(
    async (subject: SubjectFormInput, subjectType: SubjectType) => {
      const createSubject = async () => {
        const subjectInput = parseSubjectFormInputToSubjectInput(subject, subjectType);
        if (subjectType === SubjectType.ManagementSubject) {
          const result = await createManagementSubjectMutation({
            subjectInput: subjectInput as ManagementSubjectInput,
          });
          return result.data?.subject.addManagementSubject;
        } else if (subject.legalNature === LegalNature.PhysicalPerson) {
          const result = await createPhysicalSubjectMutation({
            subjectInput: subjectInput as PhysicalSubjectInput,
          });
          return result.data?.subject.addPhysicalSubject;
        } else {
          const result = await createLegalSubjectMutation({
            subjectInput: subjectInput as LegalSubjectInput,
          });
          return result.data?.subject.addLegalSubject;
        }
      };

      setLoading(true);
      const result = await createSubject();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t('subject.feedback.create'), 'success');
        addDocumentsAsync(result.value!.id, subject.documents.identities, subject.documents.others);
        handleCloseCreateSubjectDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      t,
      createManagementSubjectMutation,
      createPhysicalSubjectMutation,
      createLegalSubjectMutation,
      addDocumentsAsync,
      showSnackbar,
      handleCloseCreateSubjectDialog,
      reexecuteQuery,
      showError,
    ],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('subject.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getSubjectsColumns(categories, language, t)}
          empty="subject.text.no_subjects"
          initialState={initialState}
          rows={subjects?.nodes ?? []}
          totalCount={subjects?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={
            canCreate
              ? [
                  {
                    label: 'subject.action.add_management_subject',
                    onClick: handleOpenCreateManagementSubjectDialog,
                  },
                  {
                    label: 'subject.action.add_other_subject',
                    onClick: handleOpenCreateOtherSubjectDialog,
                  },
                ]
              : undefined
          }
          onDelete={canDelete ? handleDelete('subject', DeleteSubjectsDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/registry/subjects/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportSubjectsDocument) : undefined}
          onFilter={handleFilter(getSubjectsFilterInput)}
          onPageChange={handlePageChange(subjects?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getSubjectsSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/registry/subjects/${row.id}`);
                }
              : undefined
          }
        />
      </CardContent>
      {createSubjectDialogProps && (
        <SubjectCreateDialog
          subjectType={createSubjectDialogProps}
          onClose={handleCloseCreateSubjectDialog}
          onSave={handleSaveCreateSubject}
        />
      )}
    </Card>
  );
}
