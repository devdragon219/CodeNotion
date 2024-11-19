import { CloseDialog, Dialog, Step, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractFragment } from '../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { useContract } from '../../../hooks/useContract';
import { getEmptyContractFormInput } from '../../../utils/contract/initialValues';
import { getContractSchema } from '../../../utils/contract/schemas/contract';
import { ContractLocatedUnitsDialog } from '../../dialogs/Contract/LocatedUnits/LocatedUnits';
import { ContractBillingStep } from './Billing/Billing';
import { ContractCreateDialogProps } from './Contract.types';
import { ContractCounterpartsStep } from './Counterparts/Counterparts';
import { ContractDocumentsStep } from './Documents/Documents';
import { ContractGeneralDataStep } from './GeneralData/GeneralData';
import { ContractLocatedUnitsStep } from './LocatedUnits/LocatedUnits';
import { ContractRecapStep } from './Recap/Recap';
import { ContractRegistrationTaxStep } from './RegistrationTax/RegistrationTax';
import { ContractRevaluationStep } from './Revaluation/Revaluation';
import { ContractSecurityDepositsStep } from './SecurityDeposits/SecurityDeposits';
import { ContractSublocatedDataStep } from './SublocatedData/SublocatedData';
import { ContractTransactorsStep } from './Transactors/Transactors';

export const ContractCreateDialog = ({
  isActive,
  isSublocated,
  sublocatedContract,
  onClose,
  onSave,
}: ContractCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useContract();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [contractLocatedUnitsDialogProps, setContractLocatedUnitsDialogProps] = useState<ContractFragment | null>(null);
  const [contract, setContract] = useState(getEmptyContractFormInput(sublocatedContract));
  const debouncedContract = useDebounce(contract);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(debouncedContract.internalCode, debouncedContract.contractId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedContract.internalCode, debouncedContract.contractId]);

  const canSave = useMemo(
    () => getContractSchema(canUseInternalCode, isActive, isSublocated, language, t).isValidSync(contract),
    [canUseInternalCode, isActive, isSublocated, language, t, contract],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(contract);
  }, [contract, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCloseContractLocatedUnitsDialog = useCallback(() => {
    setContractLocatedUnitsDialogProps(null);
  }, []);

  return (
    <TableProvider
      key="contract"
      initialState={{
        sorting: [
          {
            desc: false,
            id: 'internalCode',
          },
        ],
      }}
    >
      {contractLocatedUnitsDialogProps ? (
        <ContractLocatedUnitsDialog
          contract={contractLocatedUnitsDialogProps}
          onClose={handleCloseContractLocatedUnitsDialog}
        />
      ) : isCloseConfirmationDialogOpen ? (
        <CloseDialog
          canSave={canSave}
          onCancel={closeCloseConfirmationDialog}
          onSave={handleWorkingClose}
          onClose={handleDestructiveClose}
        />
      ) : (
        <Dialog
          fullScreen
          open
          title={`contract.dialog.create.title.${isActive ? (isSublocated ? 'sublocated' : 'active') : 'passive'}`}
          onClose={openCloseConfirmationDialog}
        >
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'contract.tab.general_data',
                children: (
                  <ContractGeneralDataStep
                    canUseInternalCode={canUseInternalCode}
                    contract={contract}
                    isContractActive={isActive}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              ...(isSublocated
                ? ([
                    {
                      label: 'contract.tab.sublocated_data',
                      children: (
                        <ContractSublocatedDataStep
                          contract={contract}
                          hasSublocatedContract={!!sublocatedContract}
                          onBack={handleBack}
                          onChange={setContract}
                          onError={handleError}
                          onNext={handleNext}
                          onShowAllLocatedUnits={setContractLocatedUnitsDialogProps}
                        />
                      ),
                    },
                  ] as Step[])
                : []),
              {
                label: 'contract.tab.billing',
                children: (
                  <ContractBillingStep
                    contract={contract}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: `contract.tab.${isActive ? 'estate_sub_units' : 'estate_units'}`,
                children: (
                  <ContractLocatedUnitsStep
                    contract={contract}
                    isContractActive={isActive}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: `contract.tab.counterparts_${isActive ? 'tenant' : 'landlord'}`,
                children: (
                  <ContractCounterpartsStep
                    contract={contract}
                    isContractActive={isActive}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: `contract.tab.transactors_${isActive ? 'notices' : 'warrants'}`,
                children: (
                  <ContractTransactorsStep
                    contract={contract}
                    isContractActive={isActive}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'contract.tab.security_deposits',
                children: (
                  <ContractSecurityDepositsStep
                    contract={contract}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'contract.tab.registration_tax',
                children: (
                  <ContractRegistrationTaxStep
                    contract={contract}
                    isContractActive={isActive}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'contract.tab.revaluation',
                children: (
                  <ContractRevaluationStep
                    contract={contract}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'contract.tab.documents',
                children: (
                  <ContractDocumentsStep
                    contract={contract}
                    onBack={handleBack}
                    onChange={setContract}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'contract.tab.recap',
                children: (
                  <ContractRecapStep
                    contract={contract}
                    isContractActive={isActive}
                    isContractSublocated={isSublocated}
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
