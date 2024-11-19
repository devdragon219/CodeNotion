import { CloseDialog, Dialog, Loader, Stepper } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FloorTemplateFragment } from '../../../gql/RealGimm.Web.FloorTemplate.fragment';
import { useAddFloorTemplatesMutation } from '../../../gql/RealGimm.Web.FloorTemplate.operation';
import { useEstate } from '../../../hooks/useEstate';
import { FloorTemplateFormInput } from '../../../interfaces/FormInputs/Floor';
import { getEmptyEstateFormInput } from '../../../utils/estate/initialValues';
import { getEstateSchema } from '../../../utils/estate/schemas/estate';
import { parseFloorTemplateFormInputToFloorTemplateInput } from '../../../utils/floorTemplate/parseFloorTemplateFormInput';
import { FloorTemplateDialog } from '../../dialogs/FloorTemplate/FloorTemplate';
import { FloorTemplateDialogInput } from '../../dialogs/FloorTemplate/FloorTemplate.types';
import { EstateAddressesStep } from './Addresses/Addresses';
import { EstateDocumentsStep } from './Documents/Documents';
import { EstateCreateDialogProps } from './Estate.types';
import { EstateGeneralDataStep } from './GeneralData/GeneralData';
import { EstateRecapStep } from './Recap/Recap';

export const EstateCreateDialog = ({ onClose, onSave }: EstateCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useEstate();
  const [loading, setLoading] = useState(false);
  const [, addFloorTemplatesMutation] = useAddFloorTemplatesMutation();
  const [addFloorTemplateDialogProps, setFloorTemplateDialogProps] = useState<{
    open: boolean;
    onComplete?: () => void;
  }>({
    open: false,
  });
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [estate, setEstate] = useState(getEmptyEstateFormInput());
  const debouncedEstate = useDebounce(estate);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(debouncedEstate.internalCode, debouncedEstate.estateId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedEstate.internalCode, debouncedEstate.estateId]);

  const canSave = useMemo(
    () => getEstateSchema(canUseInternalCode, language, t).isValidSync(estate),
    [canUseInternalCode, estate, language, t],
  );

  const openAddFloorTemplateDialog = useCallback((onComplete: () => void) => {
    setFloorTemplateDialogProps({
      open: true,
      onComplete,
    });
  }, []);
  const closeAddFloorTemplateDialog = useCallback(() => {
    setFloorTemplateDialogProps({
      open: false,
    });
  }, []);
  const handleSaveFloorTemplate = useCallback(
    async (value: FloorTemplateFormInput[] | FloorTemplateDialogInput) => {
      if (Array.isArray(value) && value.length > 0) {
        setLoading(true);
        const result = await addFloorTemplatesMutation({
          input: value.map(parseFloorTemplateFormInputToFloorTemplateInput),
        });
        setLoading(false);
        if (result.data?.floorTemplate.addFloorTemplates.isSuccess) {
          const floorTemplates = (result.data.floorTemplate.addFloorTemplates.value ?? []) as FloorTemplateFragment[];
          showSnackbar(t(`floor.feedback.create.${value.length === 1 ? 'single' : 'multiple'}`), 'success');
          setEstate((estate) => ({
            ...estate,
            floors: [
              ...estate.floors,
              ...floorTemplates.map(({ guid, name, position }) => ({
                floorId: null,
                guid,
                name,
                position,
              })),
            ],
          }));
          addFloorTemplateDialogProps.onComplete?.();
          closeAddFloorTemplateDialog();
        } else {
          showError(result.data?.floorTemplate.addFloorTemplates.validationErrors);
        }
      } else {
        closeAddFloorTemplateDialog();
      }
    },
    [addFloorTemplateDialogProps, t, addFloorTemplatesMutation, showSnackbar, closeAddFloorTemplateDialog, showError],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(estate);
  }, [estate, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return addFloorTemplateDialogProps.open ? (
    <>
      {loading && <Loader />}
      <FloorTemplateDialog onClose={closeAddFloorTemplateDialog} onSave={handleSaveFloorTemplate} />
    </>
  ) : isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog fullScreen open title="estate.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'estate.tab.general_data',
            children: (
              <EstateGeneralDataStep
                canUseInternalCode={canUseInternalCode}
                estate={estate}
                onAddFloor={openAddFloorTemplateDialog}
                onChange={setEstate}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate.tab.addresses',
            children: (
              <EstateAddressesStep
                estate={estate}
                onBack={handleBack}
                onChange={setEstate}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate.tab.documents',
            children: (
              <EstateDocumentsStep
                estate={estate}
                onBack={handleBack}
                onChange={setEstate}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'estate.tab.recap',
            children: <EstateRecapStep estate={estate} onBack={handleBack} onEdit={handleEdit} onSave={onSave} />,
          },
        ]}
      />
    </Dialog>
  );
};
