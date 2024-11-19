import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFacilityContract } from '../../../hooks/useFacilityContract';
import { PenaltyFormInput } from '../../../interfaces/FormInputs/Penalty';
import { SlaFormInput } from '../../../interfaces/FormInputs/SLA';
import { getEmptyFacilityContractFormInput } from '../../../utils/facilityContract/initialValues';
import { getFacilityContractSchema } from '../../../utils/facilityContract/schemas/facilityContract';
import { CalendarsDialog } from '../../dialogs/Calendars/Calendars';
import { PenaltyCreateDialog } from '../../dialogs/Penalty/Penalty';
import { SlaCreateDialog } from '../../dialogs/SLA/SLA';
import { FacilityContractCatalogueTypesStep } from './CatalogueTypes/CatalogueTypes';
import { FacilityContractEstateUnitsStep } from './EstateUnits/EstateUnits';
import { FacilityContractCreateDialogProps } from './FacilityContract.types';
import { FacilityContractGeneralDataStep } from './GeneralData/GeneralData';
import { FacilityContractPenaltiesStep } from './Penalties/Penalties';
import { FacilityContractPriceListsStep } from './PriceLists/PriceLists';
import { FacilityContractRecapStep } from './Recap/Recap';
import { FacilityContractSlasStep } from './Slas/Slas';

export const FacilityContractCreateDialog = ({ onClose, onSave }: FacilityContractCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useFacilityContract();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [isCreatePenaltyDialogOpen, setCreatePenaltyDialogOpen] = useState(false);
  const [isCreateSlaDialogOpen, setCreateSlaDialogOpen] = useState(false);
  const [facilityContract, setFacilityContract] = useState(getEmptyFacilityContractFormInput());
  const debouncedFacilityContract = useDebounce(facilityContract);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const openCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(true);
  }, []);
  const closeCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(false);
  }, []);

  const handleOpenPenaltyCreateDialog = useCallback(() => {
    setCreatePenaltyDialogOpen(true);
  }, []);

  const handleClosePenaltyCreateDialog = useCallback(() => {
    setCreatePenaltyDialogOpen(false);
  }, []);
  const handleSaveCreatePenalty = useCallback(
    (penalties: PenaltyFormInput[]) => {
      setFacilityContract((facilityContract) => ({
        ...facilityContract,
        penalties: [...facilityContract.penalties, ...penalties],
      }));
      handleClosePenaltyCreateDialog();
    },
    [handleClosePenaltyCreateDialog],
  );

  const handleOpenSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(true);
  }, []);

  const handleCloseSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(false);
  }, []);
  const handleSaveCreateSla = useCallback(
    (slas: SlaFormInput[]) => {
      setFacilityContract((facilityContract) => ({
        ...facilityContract,
        slas: [...facilityContract.slas, ...slas],
      }));
      handleCloseSlaCreateDialog();
    },
    [handleCloseSlaCreateDialog],
  );

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedFacilityContract.internalCode,
      debouncedFacilityContract.facilityContractId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedFacilityContract.internalCode, debouncedFacilityContract.facilityContractId]);

  const canSave = useMemo(
    () => getFacilityContractSchema(canUseInternalCode, language, t).isValidSync(facilityContract),
    [canUseInternalCode, language, t, facilityContract],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(facilityContract);
  }, [facilityContract, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <TableProvider key="catalogue-types">
      {isCalendarsDialogOpen || isCreatePenaltyDialogOpen || isCreateSlaDialogOpen ? (
        <>
          {isCalendarsDialogOpen && <CalendarsDialog onClose={closeCalendarsDialog} />}
          {isCreatePenaltyDialogOpen && (
            <PenaltyCreateDialog
              contractInternalCode={facilityContract.internalCode}
              onClose={handleClosePenaltyCreateDialog}
              onSave={handleSaveCreatePenalty}
            />
          )}
          {isCreateSlaDialogOpen && (
            <SlaCreateDialog
              contractInternalCode={facilityContract.internalCode}
              onClose={handleCloseSlaCreateDialog}
              onSave={handleSaveCreateSla}
            />
          )}
        </>
      ) : isCloseConfirmationDialogOpen ? (
        <CloseDialog
          canSave={canSave}
          onCancel={closeCloseConfirmationDialog}
          onSave={handleWorkingClose}
          onClose={handleDestructiveClose}
        />
      ) : (
        <Dialog fullScreen open title="facility_contract.dialog.create.title" onClose={openCloseConfirmationDialog}>
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'facility_contract.tab.general_data',
                children: (
                  <FacilityContractGeneralDataStep
                    canUseInternalCode={canUseInternalCode}
                    facilityContract={facilityContract}
                    onChange={setFacilityContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'facility_contract.tab.estate_units',
                children: (
                  <FacilityContractEstateUnitsStep
                    facilityContract={facilityContract}
                    onBack={handleBack}
                    onChange={setFacilityContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'facility_contract.tab.catalogue_types',
                children: (
                  <FacilityContractCatalogueTypesStep
                    facilityContract={facilityContract}
                    onBack={handleBack}
                    onChange={setFacilityContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'facility_contract.tab.slas',
                children: (
                  <FacilityContractSlasStep
                    facilityContract={facilityContract}
                    onAddSlas={handleOpenSlaCreateDialog}
                    onBack={handleBack}
                    onChange={setFacilityContract}
                    onError={handleError}
                    onNext={handleNext}
                    onOpenCalendar={openCalendarsDialog}
                  />
                ),
              },
              {
                label: 'facility_contract.tab.penalties',
                children: (
                  <FacilityContractPenaltiesStep
                    facilityContract={facilityContract}
                    onAddPenalties={handleOpenPenaltyCreateDialog}
                    onBack={handleBack}
                    onChange={setFacilityContract}
                    onError={handleError}
                    onNext={handleNext}
                    onOpenCalendar={openCalendarsDialog}
                  />
                ),
              },
              {
                label: 'facility_contract.tab.price_lists',
                children: (
                  <FacilityContractPriceListsStep
                    facilityContract={facilityContract}
                    onBack={handleBack}
                    onChange={setFacilityContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'facility_contract.tab.recap',
                children: (
                  <FacilityContractRecapStep
                    facilityContract={facilityContract}
                    onBack={handleBack}
                    onEdit={handleEdit}
                    onSave={onSave}
                  />
                ),
              },
            ]}
          />
        </Dialog>
      )}
    </TableProvider>
  );
};
