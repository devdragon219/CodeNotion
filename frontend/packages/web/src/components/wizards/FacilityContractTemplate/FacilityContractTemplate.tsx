import { CloseDialog, Dialog, Loader, Stepper } from '@realgimm5/frontend-common/components';
import { TableProvider, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAddPenaltiesMutation } from '../../../gql/RealGimm.Web.Penalty.operation';
import { useAddSlasMutation } from '../../../gql/RealGimm.Web.SLA.operation';
import { useFacilityContractTemplate } from '../../../hooks/useFacilityContractTemplate';
import { PenaltyFormInput } from '../../../interfaces/FormInputs/Penalty';
import { SlaFormInput } from '../../../interfaces/FormInputs/SLA';
import { getEmptyFacilityContractTemplateFormInput } from '../../../utils/facilityContractTemplate/initialValues';
import { getFacilityContractTemplateSchema } from '../../../utils/facilityContractTemplate/schemas/facilityContractTemplate';
import { parsePenaltyFormInputToPenaltyInput } from '../../../utils/penalty/parsePenaltyFormInput';
import { parsePenaltyToPenaltyFormInput } from '../../../utils/penalty/parsePenaltyFragment';
import { parseSlaFormInputToSlaInput } from '../../../utils/sla/parseSLAFormInput';
import { parseSlaToSlaFormInput } from '../../../utils/sla/parseSLAFragment';
import { CalendarsDialog } from '../../dialogs/Calendars/Calendars';
import { PenaltyCreateDialog } from '../../dialogs/Penalty/Penalty';
import { SlaCreateDialog } from '../../dialogs/SLA/SLA';
import { FacilityContractTemplateCatalogueTypesStep } from './CatalogueTypes/CatalogueTypes';
import { FacilityContractTemplateCreateDialogProps } from './FacilityContractTemplate.types';
import { FacilityContractTemplateGeneralDataStep } from './GeneralData/GeneralData';
import { FacilityContractTemplatePenaltiesStep } from './Penalties/Penalties';
import { FacilityContractTemplateRecapStep } from './Recap/Recap';
import { FacilityContractTemplateSlasStep } from './Slas/Slas';

export const FacilityContractTemplateCreateDialog = ({
  onClose,
  onSave,
}: FacilityContractTemplateCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useFacilityContractTemplate();
  const { showError, showSnackbar } = useSnackbar();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);
  const [, createPenaltiesMutation] = useAddPenaltiesMutation();
  const [isCreatePenaltyDialogOpen, setCreatePenaltyDialogOpen] = useState(false);
  const [, createSlasMutation] = useAddSlasMutation();
  const [isCreateSlaDialogOpen, setCreateSlaDialogOpen] = useState(false);
  const [facilityContractTemplate, setFacilityContractTemplate] = useState(getEmptyFacilityContractTemplateFormInput());
  const debouncedFacilityContractTemplate = useDebounce(facilityContractTemplate);
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
    async (penalties: PenaltyFormInput[]) => {
      setLoading(true);
      const result = await createPenaltiesMutation({
        inputs: penalties.map((penalty) => parsePenaltyFormInputToPenaltyInput(penalty, FormMode.Create)),
      });
      setLoading(false);
      if (result.data?.penalty.addRange.isSuccess) {
        showSnackbar(t('penalty.feedback.create'), 'success');
        const value = (result.data.penalty.addRange.value ?? []).reduce<PenaltyFormInput[]>(
          (acc, penalty) => (penalty ? [...acc, parsePenaltyToPenaltyFormInput(penalty)] : acc),
          [],
        );
        setFacilityContractTemplate((facilityContractTemplate) => ({
          ...facilityContractTemplate,
          penalties: [...facilityContractTemplate.penalties, ...value],
        }));
        handleClosePenaltyCreateDialog();
      } else {
        showError(result.data?.penalty.addRange.validationErrors);
      }
    },
    [createPenaltiesMutation, showSnackbar, t, handleClosePenaltyCreateDialog, showError],
  );

  const handleOpenSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(true);
  }, []);

  const handleCloseSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(false);
  }, []);
  const handleSaveCreateSla = useCallback(
    async (slas: SlaFormInput[]) => {
      setLoading(true);
      const result = await createSlasMutation({
        inputs: slas.map((sla) => parseSlaFormInputToSlaInput(sla, FormMode.Create)),
      });
      setLoading(false);
      if (result.data?.sla.addRange.isSuccess) {
        showSnackbar(t('sla.feedback.create'), 'success');
        const value = (result.data.sla.addRange.value ?? []).reduce<SlaFormInput[]>(
          (acc, sla) => (sla ? [...acc, parseSlaToSlaFormInput(sla)] : acc),
          [],
        );
        setFacilityContractTemplate((facilityContractTemplate) => ({
          ...facilityContractTemplate,
          slas: [...facilityContractTemplate.slas, ...value],
        }));
        handleCloseSlaCreateDialog();
      } else {
        showError(result.data?.sla.addRange.validationErrors);
      }
    },
    [createSlasMutation, showSnackbar, t, handleCloseSlaCreateDialog, showError],
  );

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedFacilityContractTemplate.internalCode,
      debouncedFacilityContractTemplate.facilityContractTemplateId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedFacilityContractTemplate.internalCode, debouncedFacilityContractTemplate.facilityContractTemplateId]);

  const canSave = useMemo(
    () => getFacilityContractTemplateSchema(canUseInternalCode, t).isValidSync(facilityContractTemplate),
    [canUseInternalCode, t, facilityContractTemplate],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(facilityContractTemplate);
  }, [facilityContractTemplate, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <TableProvider key="catalogue-types">
      {isCalendarsDialogOpen || isCreatePenaltyDialogOpen || isCreateSlaDialogOpen ? (
        <>
          {loading && <Loader />}
          {isCalendarsDialogOpen && <CalendarsDialog onClose={closeCalendarsDialog} />}
          {isCreatePenaltyDialogOpen && (
            <PenaltyCreateDialog onClose={handleClosePenaltyCreateDialog} onSave={handleSaveCreatePenalty} />
          )}
          {isCreateSlaDialogOpen && (
            <SlaCreateDialog onClose={handleCloseSlaCreateDialog} onSave={handleSaveCreateSla} />
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
        <Dialog
          fullScreen
          open
          title="facility_contract_template.dialog.create.title"
          onClose={openCloseConfirmationDialog}
        >
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'facility_contract_template.tab.general_data',
                children: (
                  <FacilityContractTemplateGeneralDataStep
                    canUseInternalCode={canUseInternalCode}
                    facilityContractTemplate={facilityContractTemplate}
                    onChange={setFacilityContractTemplate}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'facility_contract_template.tab.catalogue_types',
                children: (
                  <FacilityContractTemplateCatalogueTypesStep
                    facilityContractTemplate={facilityContractTemplate}
                    onBack={handleBack}
                    onChange={setFacilityContractTemplate}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'facility_contract_template.tab.slas',
                children: (
                  <FacilityContractTemplateSlasStep
                    facilityContractTemplate={facilityContractTemplate}
                    onAddSlas={handleOpenSlaCreateDialog}
                    onBack={handleBack}
                    onChange={setFacilityContractTemplate}
                    onError={handleError}
                    onNext={handleNext}
                    onOpenCalendar={openCalendarsDialog}
                  />
                ),
              },
              {
                label: 'facility_contract_template.tab.penalties',
                children: (
                  <FacilityContractTemplatePenaltiesStep
                    facilityContractTemplate={facilityContractTemplate}
                    onAddPenalties={handleOpenPenaltyCreateDialog}
                    onBack={handleBack}
                    onChange={setFacilityContractTemplate}
                    onError={handleError}
                    onNext={handleNext}
                    onOpenCalendar={openCalendarsDialog}
                  />
                ),
              },
              {
                label: 'facility_contract_template.tab.recap',
                children: (
                  <FacilityContractTemplateRecapStep
                    facilityContractTemplate={facilityContractTemplate}
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
