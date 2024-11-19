import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { isOfType, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractRatePlanFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getRatePlanStatus } from '../../../../utils/contract/getRatePlanStatus';
import { RatePlanDialog } from './Dialog/Dialog';
import { RatePlanDialogInput } from './Dialog/Dialog.types';
import { ContractRatePlansProps } from './RatePlans.types';

export const ContractRatePlans = ({ control, readonly }: ContractRatePlansProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'ratePlans' });

  const [ratePlanDialogProps, setRatePlanDialogProps] = useState<{
    input?: RatePlanDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseRatePlanDialog = useCallback(() => {
    setRatePlanDialogProps({ open: false });
  }, []);
  const handleEditRatePlan = useCallback(
    (index: number) => {
      setRatePlanDialogProps({
        input: { ratePlan: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveRatePlan = useCallback(
    (value: ContractRatePlanFormInput | RatePlanDialogInput) => {
      if (isOfType<RatePlanDialogInput>(value, ['index'])) {
        update(value.index, value.ratePlan);
      } else {
        append(value);
      }
      handleCloseRatePlanDialog();
    },
    [append, update, handleCloseRatePlanDialog],
  );

  const handleAddRatePlan = useCallback(() => {
    setRatePlanDialogProps({ open: true });
  }, []);
  const handleRemoveRatePlan = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {fields.length === 0 && readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="contract.text.no_rate_plans" />
      ) : (
        <>
          <SectionTitle
            actions={
              !readonly ? (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddRatePlan}
                >
                  {t('contract.action.add_rate_plan')}
                </Button>
              ) : undefined
            }
            value="contract.section_title.rate_plans"
          />
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'contract.field.rate_plan_since',
                'contract.field.rate_plan_yearly_rate',
                'contract.field.rate_plan_declaration_expected',
                'contract.field.rate_plan_status',
              ]}
              rows={fields.map((entry) => [
                entry.since,
                parseNumberToCurrency(entry.newYearlyRate, language),
                entry.isDeclarationExpected,
                t(`core.enum.rate_plan_status.${getRatePlanStatus(entry.isDeclarationExpected, entry.isDeclared)}`),
              ])}
              onRowDelete={readonly ? undefined : handleRemoveRatePlan}
              onRowEdit={readonly ? undefined : handleEditRatePlan}
            />
          </Grid2>
        </>
      )}
      {ratePlanDialogProps.open && (
        <RatePlanDialog
          input={ratePlanDialogProps.input}
          onClose={handleCloseRatePlanDialog}
          onSave={handleSaveRatePlan}
        />
      )}
    </Grid2>
  );
};
