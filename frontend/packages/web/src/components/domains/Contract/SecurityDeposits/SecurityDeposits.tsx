import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SecurityDepositInterestRowFragment } from '../../../../gql/RealGimm.Web.SecurityDepositInterestRow.fragment';
import { ContractSecurityDepositFormInput } from '../../../../interfaces/FormInputs/Contract';
import { getEmptyContractSecurityDepositFormInput } from '../../../../utils/contract/initialValues';
import { ContractSecurityDepositInterestRowsDialog } from '../../../dialogs/Contract/SecurityDepositInterestRows/SecurityDepositInterestRows';
import { SecurityDepositFieldAccordion } from './Accordion/Accordion';
import { SecurityDepositDialog } from './Dialog/Dialog';
import { SecurityDepositDialogInput } from './Dialog/Dialog.types';
import { ContractSecurityDepositsProps } from './SecurityDeposits.types';

export const ContractSecurityDeposits = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
}: ContractSecurityDepositsProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [securityDepositInterestRowsDialogProps, setSecurityDepositInterestRowsDialogProps] = useState<
    SecurityDepositInterestRowFragment[] | null
  >(null);
  const { fields, append, remove, update } = useFieldArray({ control, name: 'securityDeposits' });

  const [securityDepositDialogProps, setSecurityDepositDialogProps] = useState<{
    input?: SecurityDepositDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseSecurityDepositDialog = useCallback(() => {
    setSecurityDepositDialogProps({ open: false });
  }, []);
  const handleEditSecurityDeposit = useCallback(
    (index: number) => {
      setSecurityDepositDialogProps({
        input: { securityDeposit: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveSecurityDeposit = useCallback(
    (value: ContractSecurityDepositFormInput[] | SecurityDepositDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.securityDeposit);
      }
      handleCloseSecurityDepositDialog();
    },
    [append, update, handleCloseSecurityDepositDialog],
  );

  const handleAddSecurityDeposit = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyContractSecurityDepositFormInput());
    } else {
      setSecurityDepositDialogProps({ open: true });
    }
  }, [mode, append]);

  const handleOpenSecurityDepositInterestRowsDialog = useCallback(
    (interestRows: SecurityDepositInterestRowFragment[]) => () => {
      setSecurityDepositInterestRowsDialogProps(interestRows);
    },
    [],
  );
  const handleCloseSecurityDepositInterestRowsDialog = useCallback(() => {
    setSecurityDepositInterestRowsDialogProps(null);
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create ? (
        <>
          <SectionTitle value="contract.section_title.security_deposits" />
          {fields.length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {fields.map(({ key }, index) => (
                  <RepeatableField key={key} index={index} onDelete={remove}>
                    <SecurityDepositFieldAccordion
                      control={control}
                      errors={errors}
                      index={index}
                      setValue={setValue}
                    />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
          )}
          <Grid2 size={12}>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={handleAddSecurityDeposit}
            >
              {t('contract.action.add_security_deposit')}
            </Button>
          </Grid2>
        </>
      ) : fields.length === 0 && readonly ? (
        <SectionTitle value="contract.text.no_security_deposits" sx={{ justifyContent: 'center' }} />
      ) : (
        <>
          <SectionTitle
            actions={
              !readonly ? (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddSecurityDeposit}
                >
                  {t('contract.action.add_security_deposit')}
                </Button>
              ) : undefined
            }
            value="contract.section_title.security_deposits"
          />
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'contract.field.security_deposit_type',
                'contract.field.security_deposit_takeover_date',
                'contract.field.security_deposit_amount',
                'contract.field.security_deposit_until',
                'contract.field.security_deposit_surety_subject',
                'contract.field.security_deposit_surety_renewable',
                'contract.field.security_deposit_interest_rows',
              ]}
              rows={fields.map((entry) => [
                entry.securityDepositType ? t(`common.enum.security_deposit_type.${entry.securityDepositType}`) : null,
                entry.takeoverDate,
                parseNumberToCurrency(entry.baseAmount, language),
                entry.until,
                entry.suretySubject?.name,
                entry.isSuretyRenewable,
                <Button
                  key={entry.key}
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={handleOpenSecurityDepositInterestRowsDialog(entry.interestRows)}
                >
                  {t('core.button.show')}
                </Button>,
              ])}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditSecurityDeposit}
            />
          </Grid2>
        </>
      )}
      {securityDepositDialogProps.open && (
        <SecurityDepositDialog
          input={securityDepositDialogProps.input}
          onClose={handleCloseSecurityDepositDialog}
          onSave={handleSaveSecurityDeposit}
        />
      )}
      {securityDepositInterestRowsDialogProps && (
        <ContractSecurityDepositInterestRowsDialog
          interestRows={securityDepositInterestRowsDialogProps}
          onClose={handleCloseSecurityDepositInterestRowsDialog}
        />
      )}
    </Grid2>
  );
};
