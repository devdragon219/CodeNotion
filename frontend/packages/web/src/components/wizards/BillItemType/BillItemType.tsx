import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useBillItemType } from '../../../hooks/useBillItemType';
import { getEmptyBillItemTypeFormInput } from '../../../utils/billItemType/initialValues';
import { getBillItemTypeSchema } from '../../../utils/billItemType/schemas/billItemType';
import { BillItemTypeCreateDialogProps } from './BillItemType.types';
import { BillItemTypeContractsStep } from './Contracts/Contracts';
import { BillItemTypeGeneralDataStep } from './GeneralData/GeneralData';
import { BillItemTypeRecapStep } from './Recap/Recap';

export const BillItemTypeCreateDialog = ({ onClose, onSave }: BillItemTypeCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [billItemType, setCatalogueType] = useState(getEmptyBillItemTypeFormInput());
  const { checkCanUseInternalCode } = useBillItemType();
  const debouncedBillItemType = useDebounce(billItemType);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedBillItemType.internalCode,
      debouncedBillItemType.billItemTypeId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedBillItemType.internalCode, debouncedBillItemType.billItemTypeId]);

  const canSave = useMemo(
    () => getBillItemTypeSchema(canUseInternalCode, t).isValidSync(billItemType),
    [billItemType, canUseInternalCode, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(billItemType);
  }, [billItemType, onSave]);
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
    <Dialog fullScreen open title="bill_item_type.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'bill_item_type.tab.general_data',
            children: (
              <BillItemTypeGeneralDataStep
                billItemType={billItemType}
                canUseInternalCode={canUseInternalCode}
                onChange={setCatalogueType}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'bill_item_type.tab.rates',
            children: (
              <BillItemTypeContractsStep
                billItemType={billItemType}
                onBack={handleBack}
                onChange={setCatalogueType}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'bill_item_type.tab.recap',
            children: (
              <BillItemTypeRecapStep
                billItemType={billItemType}
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
