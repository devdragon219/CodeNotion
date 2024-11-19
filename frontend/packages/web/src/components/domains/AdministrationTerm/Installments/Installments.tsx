import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationTermInstallmentFormInput } from '../../../../interfaces/FormInputs/AdministrationTermInstallment';
import { getEmptyAdministrationTermInstallmentFormInput } from '../../../../utils/administrationTerm/initialValues';
import { AdministrationTermInstallmentsTable } from '../InstallmentsTable/InstallmentsTable';
import { AdministrationTermInstallmentFieldAccordion } from './Accordion/Accordion';
import { AdministrationTermInstallmentsDialog } from './Dialog/Dialog';
import { AdministrationTermInstallmentsDialogInput } from './Dialog/Dialog.types';
import { AdministrationTermInstallmentsProps } from './Installments.types';

export const AdministrationTermInstallments = ({
  control,
  errors,
  mode,
  readonly,
}: AdministrationTermInstallmentsProps) => {
  const { t } = useTranslation();
  const [administrationTermInstallmentsDialogProps, setAdministrationTermInstallmentsDialogProps] = useState<{
    input?: AdministrationTermInstallmentsDialogInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });

  const termSince = useWatch({ control, name: 'since' });
  const termUntil = useWatch({ control, name: 'until' });
  const termExpectedAmount = useWatch({ control, name: 'expectedAmount' });
  const payments = useWatch({ control, name: 'payments' });

  const { fields, append, replace, update } = useFieldArray({
    control,
    name: 'installments',
  });
  const handleAddInstallment = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyAdministrationTermInstallmentFormInput(fields.length + 1));
    } else {
      setAdministrationTermInstallmentsDialogProps({ open: true });
    }
  }, [append, fields.length, mode]);

  const handleRemoveInstallment = useCallback(
    (index: number) => {
      replace(
        fields
          .filter((_, idx) => idx !== index)
          .map((installment, index) => ({
            ...installment,
            installmentNumber: index + 1,
          })),
      );
    },
    [fields, replace],
  );

  const handleCloseAdministrationTermInstallmentsDialog = useCallback(() => {
    setAdministrationTermInstallmentsDialogProps({ open: false });
  }, []);

  const handleEditInstallment = useCallback(
    (index: number) => {
      setAdministrationTermInstallmentsDialogProps({
        input: {
          installment: fields[index],
          index,
        },
        open: true,
      });
    },
    [fields],
  );

  const handleSaveInstallments = useCallback(
    (value: AdministrationTermInstallmentFormInput[] | AdministrationTermInstallmentsDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.installment);
      }
      handleCloseAdministrationTermInstallmentsDialog();
    },
    [append, handleCloseAdministrationTermInstallmentsDialog, update],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          mode === FormMode.Edit && !readonly ? (
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={handleAddInstallment}
            >
              {t('administration_term.action.add_installment')}
            </Button>
          ) : undefined
        }
        value="administration_term.section_title.installments"
      />
      {mode === FormMode.Create ? (
        <>
          {fields.length !== 0 && (
            <Grid2 size={12} sx={{ mt: 2 }}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {fields.map(({ key }, index) => (
                  <RepeatableField key={key} index={index} onDelete={handleRemoveInstallment}>
                    <Controller
                      name={`installments.${index}`}
                      control={control}
                      render={({ field }) => (
                        <AdministrationTermInstallmentFieldAccordion
                          {...field}
                          installments={fields}
                          index={index}
                          errors={errors.installments?.[index]}
                        />
                      )}
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
              onClick={handleAddInstallment}
            >
              {t('administration_term.action.add_installment')}
            </Button>
          </Grid2>
        </>
      ) : (
        <Grid2 size={12}>
          <AdministrationTermInstallmentsTable
            installments={fields}
            payments={payments}
            onEdit={readonly ? undefined : handleEditInstallment}
            onDelete={readonly ? undefined : handleRemoveInstallment}
          />
        </Grid2>
      )}
      {administrationTermInstallmentsDialogProps.open && (
        <AdministrationTermInstallmentsDialog
          input={administrationTermInstallmentsDialogProps.input}
          readonly={administrationTermInstallmentsDialogProps.readonly}
          onClose={handleCloseAdministrationTermInstallmentsDialog}
          onSave={handleSaveInstallments}
          existingInstallments={fields}
          termSince={termSince}
          termUntil={termUntil}
          termExpectedAmount={termExpectedAmount ?? 0}
        />
      )}
    </Grid2>
  );
};
