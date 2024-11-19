import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractFragment } from '../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { getEmptyRegistrationPaymentFormInput } from '../../../utils/registrationPayment/initialValues';
import { getRegistrationPaymentSchema } from '../../../utils/registrationPayment/schemas/registrationPayment';
import { ContractLocatedUnitsDialog } from '../../dialogs/Contract/LocatedUnits/LocatedUnits';
import { RegistrationPaymentContractsStep } from './Contracts/Contracts';
import { RegistrationPaymentGeneralDataStep } from './GeneralData/GeneralData';
import { RegistrationPaymentRecapStep } from './Recap/Recap';
import { RegistrationPaymentCreateDialogProps } from './RegistrationPayment.types';
import { RegistrationPaymentRowsStep } from './Rows/Rows';

export const RegistrationPaymentCreateDialog = ({ onClose, onSave }: RegistrationPaymentCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [contractLocatedUnitsDialogProps, setContractLocatedUnitsDialogProps] = useState<ContractFragment | null>(null);
  const [registrationPayment, setRegistrationPayment] = useState(getEmptyRegistrationPaymentFormInput());
  const canSave = useMemo(
    () => getRegistrationPaymentSchema(language, t).isValidSync(registrationPayment),
    [registrationPayment, language, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(registrationPayment);
  }, [registrationPayment, onSave]);
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
        <Dialog fullScreen open title="registration_payment.dialog.create.title" onClose={openCloseConfirmationDialog}>
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'registration_payment.tab.contract',
                children: (
                  <RegistrationPaymentContractsStep
                    registrationPayment={registrationPayment}
                    onChange={setRegistrationPayment}
                    onError={handleError}
                    onNext={handleNext}
                    onShowAllLocatedUnits={setContractLocatedUnitsDialogProps}
                  />
                ),
              },
              {
                label: 'registration_payment.tab.general_data',
                children: (
                  <RegistrationPaymentGeneralDataStep
                    registrationPayment={registrationPayment}
                    onBack={handleBack}
                    onChange={setRegistrationPayment}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'registration_payment.tab.rows',
                children: (
                  <RegistrationPaymentRowsStep
                    registrationPayment={registrationPayment}
                    onBack={handleBack}
                    onChange={setRegistrationPayment}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'registration_payment.tab.recap',
                children: (
                  <RegistrationPaymentRecapStep
                    registrationPayment={registrationPayment}
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
