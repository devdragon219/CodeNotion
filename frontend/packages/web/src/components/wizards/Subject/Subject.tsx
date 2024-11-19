import { Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ConfirmationDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSubject } from '../../../hooks/useSubject';
import { getEmptySubjectFormInput } from '../../../utils/subject/initialValues';
import { getSubjectSchema } from '../../../utils/subject/schemas/subject';
import { SubjectAccountingDataStep } from './AccountingData/AccountingData';
import { SubjectAddressesAndContactsStep } from './AddressesAndContacts/AddressesAndContacts';
import { SubjectDocumentsStep } from './Documents/Documents';
import { SubjectGeneralDataStep } from './GeneralData/GeneralData';
import { SubjectPersonalDataStep } from './PersonalData/PersonalData';
import { SubjectRecapStep } from './Recap/Recap';
import { SubjectCreateDialogProps } from './Subject.types';

export const SubjectCreateDialog = ({ subjectType, onClose, onSave }: SubjectCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanBeGroupLeader, checkCanUseInterGroupSignature, checkCanUseInternalCode, checkItalianTaxId } =
    useSubject();
  const [isLegalNatureDisabled, setLegalNatureDisabled] = useState(false);
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [subject, setSubject] = useState(getEmptySubjectFormInput(subjectType));
  const debouncedSubject = useDebounce(subject);
  const [canBeGroupLeader, setCanBeGroupLeader] = useState(false);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [canUseInterGroupSignature, setCanUseInterGroupSignature] = useState(true);
  const [isBirthTaxIdCodeValid, setBirthTaxIdCodeValid] = useState(true);

  useEffect(() => {
    checkCanBeGroupLeader(debouncedSubject.companyGroup.companyGroupId, null, setCanBeGroupLeader);
    // eslint-disable-next-line
  }, [debouncedSubject.companyGroup.companyGroupId]);

  useEffect(() => {
    checkCanUseInternalCode(debouncedSubject.internalCode, debouncedSubject.subjectId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedSubject.internalCode, debouncedSubject.subjectId]);

  useEffect(() => {
    checkCanUseInterGroupSignature(
      debouncedSubject.interGroupSignature,
      debouncedSubject.companyGroup.companyGroupId,
      debouncedSubject.subjectId,
      setCanUseInterGroupSignature,
    );
    // eslint-disable-next-line
  }, [debouncedSubject.interGroupSignature, debouncedSubject.companyGroup.companyGroupId, debouncedSubject.subjectId]);

  useEffect(() => {
    checkItalianTaxId(
      debouncedSubject.birthCountryTaxIdCode,
      debouncedSubject.firstName,
      debouncedSubject.lastName,
      debouncedSubject.birthSex,
      debouncedSubject.birthDate,
      debouncedSubject.birthLocation.city.cadastralCode,
      setBirthTaxIdCodeValid,
    );
    // eslint-disable-next-line
  }, [
    debouncedSubject.birthCountryTaxIdCode,
    debouncedSubject.firstName,
    debouncedSubject.lastName,
    debouncedSubject.birthSex,
    debouncedSubject.birthDate,
    debouncedSubject.birthLocation.city.cadastralCode,
  ]);

  const canSave = useMemo(
    () =>
      subject.entryStatus === EntryStatus.Working &&
      getSubjectSchema(
        canBeGroupLeader,
        canUseInterGroupSignature,
        canUseInternalCode,
        EntryStatus.Working,
        isBirthTaxIdCodeValid,
        language,
        subject.legalNature,
        subjectType,
        t,
      ).isValidSync(subject),
    [
      canUseInterGroupSignature,
      canUseInternalCode,
      canBeGroupLeader,
      isBirthTaxIdCodeValid,
      subject,
      language,
      subjectType,
      t,
    ],
  );
  const canSaveAsDraft = useMemo(
    () =>
      getSubjectSchema(
        canBeGroupLeader,
        canUseInterGroupSignature,
        canUseInternalCode,
        EntryStatus.IncompleteDraft,
        isBirthTaxIdCodeValid,
        language,
        subject.legalNature,
        subjectType,
        t,
      ).isValidSync(subject),
    [
      canUseInterGroupSignature,
      canUseInternalCode,
      canBeGroupLeader,
      isBirthTaxIdCodeValid,
      subject,
      language,
      subjectType,
      t,
    ],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  useEffect(() => {
    if (activeStep !== 0) {
      setLegalNatureDisabled(true);
    }
  }, [activeStep]);

  const handleWorkingClose = useCallback(() => {
    onSave(subject, subjectType);
  }, [subject, subjectType, onSave]);
  const handleDraftClose = useCallback(() => {
    onSave({ ...subject, entryStatus: EntryStatus.IncompleteDraft }, subjectType);
  }, [subject, subjectType, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <ConfirmationDialog
      open
      onClose={closeCloseConfirmationDialog}
      type="alert"
      icon={Warning}
      title={`common.dialog.close.title.${canSave ? 'working' : canSaveAsDraft ? 'draft' : 'destructive'}`}
      description={`common.dialog.close.description.${canSave ? 'working' : canSaveAsDraft ? 'draft' : 'destructive'}`}
      actions={
        <>
          <Button color="secondary" onClick={closeCloseConfirmationDialog}>
            {t('common.button.cancel')}
          </Button>
          <Button color="destructive" onClick={handleDestructiveClose}>
            {t('common.button.delete')}
          </Button>
          {canSave ? (
            <Button color="primary" onClick={handleWorkingClose}>
              {t('common.dialog.close.action.working')}
            </Button>
          ) : canSaveAsDraft ? (
            <Button color="primary" onClick={handleDraftClose}>
              {t('common.dialog.close.action.draft')}
            </Button>
          ) : (
            <></>
          )}
        </>
      }
    />
  ) : (
    <Dialog fullScreen open title={`subject.dialog.create.title.${subjectType}`} onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'subject.tab.general_data',
            children: (
              <SubjectGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                isLegalNatureDisabled={isLegalNatureDisabled}
                subject={subject}
                subjectType={subjectType}
                onChange={setSubject}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'subject.tab.personal_data',
            children: (
              <SubjectPersonalDataStep
                canBeGroupLeader={canBeGroupLeader}
                canUseInterGroupSignature={canUseInterGroupSignature}
                isBirthTaxIdCodeValid={isBirthTaxIdCodeValid}
                subject={subject}
                subjectType={subjectType}
                onBack={handleBack}
                onChange={setSubject}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'subject.tab.addresses_and_contacts',
            children: (
              <SubjectAddressesAndContactsStep
                subject={subject}
                onBack={handleBack}
                onChange={setSubject}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'subject.tab.accounting_data',
            children: (
              <SubjectAccountingDataStep
                subject={subject}
                onBack={handleBack}
                onChange={setSubject}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'subject.tab.documents',
            children: (
              <SubjectDocumentsStep
                subject={subject}
                onBack={handleBack}
                onChange={setSubject}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'subject.tab.recap',
            children: (
              <SubjectRecapStep
                subject={subject}
                subjectType={subjectType}
                onBack={handleBack}
                onEdit={handleEdit}
                onSave={onSave}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
