import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UtilityServiceFragment } from '../../../gql/RealGimm.Web.UtilityService.fragment';
import { getEmptyCostChargeFormInput } from '../../../utils/costCharge/initialValues';
import { getCostChargeSchema } from '../../../utils/costCharge/schemas/costCharge';
import { UtilityServiceEstateUnitsDialog } from '../../domains/UtilityService/EstateUnitsDialog/EstateUnitsDialog';
import { UtilityServiceEstatesDialog } from '../../domains/UtilityService/EstatesDialog/EstatesDialog';
import { CostChargeCreateDialogProps } from './CostCharge.types';
import { CostChargeGeneralDataStep } from './GeneralData/GeneralData';
import { CostChargeRecapStep } from './Recap/Recap';
import { CostChargeUtilityServiceStep } from './UtilityService/UtilityService';

export const CostChargeCreateDialog = ({ utilityService, onClose, onSave }: CostChargeCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const [utilityServiceEstatesDialogProps, setUtilityServiceEstatesDialogProps] = useState<
    UtilityServiceFragment['estates'] | null
  >(null);
  const [utilityServiceEstateUnitsDialogProps, setUtilityServiceEstateUnitsDialogProps] = useState<
    UtilityServiceFragment['estateUnits'] | null
  >(null);
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [costCharge, setCostCharge] = useState(getEmptyCostChargeFormInput(utilityService));

  const canSave = useMemo(
    () =>
      getCostChargeSchema(parseStringToDate(costCharge.utilityService?.activationDate), language, t).isValidSync(
        costCharge,
      ),
    [costCharge, language, t],
  );

  const handleOpenUtilityServiceEstatesDialog = useCallback((row: UtilityServiceFragment) => {
    setUtilityServiceEstatesDialogProps(row.estates);
  }, []);
  const handleCloseUtilityServiceEstatesDialog = useCallback(() => {
    setUtilityServiceEstatesDialogProps(null);
  }, []);

  const handleOpenUtilityServiceEstateUnitsDialog = useCallback((row: UtilityServiceFragment) => {
    setUtilityServiceEstateUnitsDialogProps(row.estateUnits);
  }, []);
  const handleCloseUtilityServiceEstateUnitsDialog = useCallback(() => {
    setUtilityServiceEstateUnitsDialogProps(null);
  }, []);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(costCharge);
  }, [costCharge, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <TableProvider
      key="utility-service"
      initialState={{
        sorting: [
          {
            desc: false,
            id: 'referenceSubjectName',
          },
        ],
      }}
    >
      {utilityServiceEstatesDialogProps ? (
        <UtilityServiceEstatesDialog
          estates={utilityServiceEstatesDialogProps}
          onClose={handleCloseUtilityServiceEstatesDialog}
        />
      ) : utilityServiceEstateUnitsDialogProps ? (
        <UtilityServiceEstateUnitsDialog
          estateUnits={utilityServiceEstateUnitsDialogProps}
          onClose={handleCloseUtilityServiceEstateUnitsDialog}
        />
      ) : isCloseConfirmationDialogOpen ? (
        <CloseDialog
          canSave={canSave}
          onCancel={closeCloseConfirmationDialog}
          onSave={handleWorkingClose}
          onClose={handleDestructiveClose}
        />
      ) : (
        <Dialog fullScreen open title="cost_charge.dialog.create.single.title" onClose={openCloseConfirmationDialog}>
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'cost_charge.tab.utility_service',
                children: (
                  <CostChargeUtilityServiceStep
                    costCharge={costCharge}
                    utilityService={utilityService}
                    onChange={setCostCharge}
                    onError={handleError}
                    onNext={handleNext}
                    onShowAllUtilityServiceEstateUnits={handleOpenUtilityServiceEstateUnitsDialog}
                    onShowAllUtilityServiceEstates={handleOpenUtilityServiceEstatesDialog}
                  />
                ),
              },
              {
                label: 'cost_charge.tab.general_data',
                children: (
                  <CostChargeGeneralDataStep
                    costCharge={costCharge}
                    onBack={handleBack}
                    onChange={setCostCharge}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'cost_charge.tab.recap',
                children: (
                  <CostChargeRecapStep
                    costCharge={costCharge}
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
