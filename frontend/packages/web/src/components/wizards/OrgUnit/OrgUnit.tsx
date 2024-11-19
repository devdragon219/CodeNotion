import { CloseDialog, Dialog, Step, Stepper } from '@realgimm5/frontend-common/components';
import { OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useOrgUnit } from '../../../hooks/useOrgUnit';
import { getEmptyOrgUnitFormInput } from '../../../utils/orgUnit/initialValues';
import { getOrgUnitSchema } from '../../../utils/orgUnit/schemas/orgUnit';
import { OrgUnitContactsStep } from './Contacts/Contacts';
import { OrgUnitGeneralDataStep } from './GeneralData/GeneralData';
import { OrgUnitGeographicalDataStep } from './GeographicalData/GeographicalData';
import { OrgUnitCreateDialogProps } from './OrgUnit.types';
import { OrgUnitRecapStep } from './Recap/Recap';

export const OrgUnitCreateDialog = ({ orgUnitType, onClose, onSave }: OrgUnitCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useOrgUnit();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [orgUnit, setOrgUnit] = useState(getEmptyOrgUnitFormInput(orgUnitType));
  const debouncedOrgUnit = useDebounce(orgUnit);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(debouncedOrgUnit.internalCode, debouncedOrgUnit.orgUnitId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedOrgUnit.internalCode, debouncedOrgUnit.orgUnitId]);

  const canSave = useMemo(
    () => getOrgUnitSchema(canUseInternalCode, orgUnit.entryStatus, language, t).isValidSync(orgUnit),
    [canUseInternalCode, orgUnit, language, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(orgUnit);
  }, [orgUnit, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog fullScreen open title={`org_unit.dialog.create.title.${orgUnitType}`} onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'org_unit.step.general_data',
            children: (
              <OrgUnitGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                orgUnit={orgUnit}
                onChange={setOrgUnit}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          ...(orgUnitType === OrgUnitType.GeographicalHierarchy
            ? [
                {
                  label: 'org_unit.step.geographical_data',
                  children: (
                    <OrgUnitGeographicalDataStep
                      orgUnit={orgUnit}
                      onBack={handleBack}
                      onChange={setOrgUnit}
                      onError={handleError}
                      onNext={handleNext}
                    />
                  ),
                } as Step,
              ]
            : []),
          {
            label: 'org_unit.step.contacts',
            children: (
              <OrgUnitContactsStep
                orgUnit={orgUnit}
                onBack={handleBack}
                onChange={setOrgUnit}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'org_unit.step.recap',
            children: <OrgUnitRecapStep orgUnit={orgUnit} onBack={handleBack} onEdit={handleEdit} onSave={onSave} />,
          },
        ]}
      />
    </Dialog>
  );
};
