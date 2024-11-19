import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { LegalSubjectInput, ManagementSubjectInput, PhysicalSubjectInput } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { SubjectAccountingData } from '../../../../components/domains/Subject/AccountingData/AccountingData';
import { SubjectAddressesAndContacts } from '../../../../components/domains/Subject/AddressesAndContacts/AddressesAndContacts';
import { SubjectDocuments } from '../../../../components/domains/Subject/Documents/Documents';
import { SubjectGeneralData } from '../../../../components/domains/Subject/GeneralData/GeneralData';
import { SubjectPersonalData } from '../../../../components/domains/Subject/PersonalData/PersonalData';
import { LegalNature } from '../../../../enums/LegalNature';
import { RawFeature } from '../../../../enums/RawFeature';
import { SubjectType } from '../../../../enums/SubjectType';
import {
  DeleteSubjectDocument,
  ExportSubjectsDocument,
  GetSubjectDocument,
  GetSubjectQuery,
  useUpdateLegalSubjectMutation,
  useUpdateManagementSubjectMutation,
  useUpdatePhysicalSubjectMutation,
} from '../../../../gql/RealGimm.Web.Subject.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useSubject } from '../../../../hooks/useSubject';
import { SubjectFormInput } from '../../../../interfaces/FormInputs/Subject';
import { parseSubjectFormInputToSubjectInput } from '../../../../utils/subject/parseSubjectFormInput';
import { parseSubjectToSubjectFormInput } from '../../../../utils/subject/parseSubjectFragment';
import { getSubjectAccountingDataSchema } from '../../../../utils/subject/schemas/accountingData';
import { getSubjectAddressesAndContactsSchema } from '../../../../utils/subject/schemas/addressesAndContacts';
import { getSubjectDocumentsSchema } from '../../../../utils/subject/schemas/documents';
import { getSubjectGeneralDataSchema } from '../../../../utils/subject/schemas/generalData';
import { getSubjectPersonalDataSchema } from '../../../../utils/subject/schemas/personalData';
import { getSubjectSchema } from '../../../../utils/subject/schemas/subject';

export default function Subject() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.ANAG_SUBJECT_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/registry/subjects');
  const { checkCanBeGroupLeader, checkCanUseInterGroupSignature, checkCanUseInternalCode, checkItalianTaxId } =
    useSubject();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateLegalSubjectMutation] = useUpdateLegalSubjectMutation();
  const [, updateManagementSubjectMutation] = useUpdateManagementSubjectMutation();
  const [, updatePhysicalSubjectMutation] = useUpdatePhysicalSubjectMutation();
  const [subject, setSubject] = useState<SubjectFormInput>();
  const debouncedSubject = useDebounce(subject);
  const [subjectType, setSubjectType] = useState(SubjectType.ManagementSubject);
  const [canBeGroupLeader, setCanBeGroupLeader] = useState(false);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [canUseInterGroupSignature, setCanUseInterGroupSignature] = useState(true);
  const [isBirthTaxIdCodeValid, setBirthTaxIdCodeValid] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchSubject = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetSubjectQuery> = await client.query(GetSubjectDocument, {
      subjectId: Number(id),
    });
    setLoading(false);
    if (!result.data?.subject.subject) return Promise.reject();
    setSubjectType(
      result.data.subject.subject.__typename === 'ManagementSubject'
        ? SubjectType.ManagementSubject
        : SubjectType.Other,
    );
    return parseSubjectToSubjectFormInput(result.data.subject.subject);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<SubjectFormInput>({
    defaultValues: fetchSubject,
    resolver: subject
      ? yupResolver(
          getSubjectSchema(
            canBeGroupLeader,
            canUseInterGroupSignature,
            canUseInternalCode,
            subject.entryStatus,
            isBirthTaxIdCodeValid,
            language,
            subject.legalNature,
            subjectType,
            t,
          ),
        )
      : undefined,
  });

  useEffect(() => {
    if (debouncedSubject) {
      checkCanBeGroupLeader(
        debouncedSubject.companyGroup.companyGroupId,
        debouncedSubject.subjectId,
        setCanBeGroupLeader,
      );
    }
    // eslint-disable-next-line
  }, [debouncedSubject?.companyGroup.companyGroupId]);

  useEffect(() => {
    if (debouncedSubject) {
      checkCanUseInternalCode(debouncedSubject.internalCode, debouncedSubject.subjectId, setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedSubject?.internalCode, debouncedSubject?.subjectId]);

  useEffect(() => {
    if (debouncedSubject) {
      checkCanUseInterGroupSignature(
        debouncedSubject.interGroupSignature,
        debouncedSubject.companyGroup.companyGroupId,
        debouncedSubject.subjectId,
        setCanUseInterGroupSignature,
      );
    }
    // eslint-disable-next-line
  }, [
    debouncedSubject?.interGroupSignature,
    debouncedSubject?.companyGroup.companyGroupId,
    debouncedSubject?.subjectId,
  ]);

  useEffect(() => {
    if (debouncedSubject) {
      checkItalianTaxId(
        debouncedSubject.birthCountryTaxIdCode,
        debouncedSubject.firstName,
        debouncedSubject.lastName,
        debouncedSubject.birthSex,
        debouncedSubject.birthDate,
        debouncedSubject.birthLocation.city.cadastralCode,
        setBirthTaxIdCodeValid,
      );
    }
    // eslint-disable-next-line
  }, [
    debouncedSubject?.birthCountryTaxIdCode,
    debouncedSubject?.firstName,
    debouncedSubject?.lastName,
    debouncedSubject?.birthSex,
    debouncedSubject?.birthDate,
    debouncedSubject?.birthLocation.city.cadastralCode,
  ]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setSubject(formValues as SubjectFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(subject);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (subject: SubjectFormInput) => {
      const updateSubject = async () => {
        const subjectInput = parseSubjectFormInputToSubjectInput(subject, subjectType);
        if (subjectType === SubjectType.ManagementSubject) {
          const result = await updateManagementSubjectMutation({
            subjectInput: subjectInput as ManagementSubjectInput,
          });
          return result.data?.subject.updateManagementSubject;
        } else if (subject.legalNature === LegalNature.PhysicalPerson) {
          const result = await updatePhysicalSubjectMutation({
            subjectInput: subjectInput as PhysicalSubjectInput,
          });
          return result.data?.subject.updatePhysicalSubject;
        } else {
          const result = await updateLegalSubjectMutation({
            subjectInput: subjectInput as LegalSubjectInput,
          });
          return result.data?.subject.updateLegalSubject;
        }
      };

      setLoading(true);
      const result = await updateSubject();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t('subject.feedback.update'), 'success');
        setReadonly(true);
        const updatedSubject = await fetchSubject();
        setSubject(updatedSubject);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result?.validationErrors);
      }
      return Promise.reject();
    },
    [
      subjectType,
      updateManagementSubjectMutation,
      updatePhysicalSubjectMutation,
      updateLegalSubjectMutation,
      showSnackbar,
      t,
      fetchSubject,
      showError,
    ],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={subject?.name}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('subject', DeleteSubjectDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportSubjectsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'subject.tab.general_data',
                children: subject && (
                  <SubjectGeneralData
                    control={control}
                    errors={errors}
                    isLegalNatureDisabled
                    mode={FormMode.Edit}
                    readonly={readonly}
                    subjectType={subjectType}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  subject &&
                  !getSubjectGeneralDataSchema(
                    canUseInternalCode,
                    subject.entryStatus,
                    language,
                    subjectType,
                    t,
                  ).isValidSync(subject),
              },
              {
                label: 'subject.tab.personal_data',
                children: subject && (
                  <SubjectPersonalData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    subjectType={subjectType}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  subject &&
                  !getSubjectPersonalDataSchema(
                    canBeGroupLeader,
                    canUseInterGroupSignature,
                    subject.entryStatus,
                    isBirthTaxIdCodeValid,
                    language,
                    subject.legalNature,
                    subjectType,
                    t,
                  ).isValidSync(subject),
              },
              {
                label: 'subject.tab.addresses_and_contacts',
                children: subject && (
                  <SubjectAddressesAndContacts
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  subject &&
                  !getSubjectAddressesAndContactsSchema(subject.entryStatus, t).isValidSync(subject),
              },
              {
                label: 'subject.tab.accounting_data',
                children: subject && (
                  <SubjectAccountingData control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  subject &&
                  !getSubjectAccountingDataSchema(subject.entryStatus, language, t).isValidSync(subject),
              },
              {
                label: 'subject.tab.documents',
                children: subject && (
                  <SubjectDocuments control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  subject &&
                  !getSubjectDocumentsSchema(subject.entryStatus, language, t).isValidSync(subject),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
