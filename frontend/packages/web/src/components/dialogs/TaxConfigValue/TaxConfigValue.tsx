import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TaxConfigFormInput, TaxConfigValueFormInput } from '../../../interfaces/FormInputs/TaxConfig';
import { getEmptyTaxConfigValueFormInput } from '../../../utils/components/taxConfig/initialValues';
import { parseTaxConfigTableRowToTaxConfigValueFormInput } from '../../../utils/components/taxConfig/parseTaxConfigTableRowFragment';
import { getTaxConfigValueSchema } from '../../../utils/components/taxConfig/schemas/taxConfigValue';
import { getTaxConfigDialogTitle } from '../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigValueField } from '../../core/Fields/TaxConfigValue/TaxConfigValue';
import { TaxConfigValueDialogProps } from './TaxConfigValue.types';

export const TaxConfigValueDialog = ({
  calculator,
  readonly,
  row,
  table,
  onClose,
  onSave,
}: TaxConfigValueDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);

  const {
    control,
    formState: { errors, isValid: canSave },
    getValues,
    handleSubmit,
  } = useForm<TaxConfigFormInput>({
    defaultValues: {
      table: row ? parseTaxConfigTableRowToTaxConfigValueFormInput(row, table) : getEmptyTaxConfigValueFormInput(table),
    },
    resolver: yupResolver(getTaxConfigValueSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: { table: TaxConfigValueFormInput }) => {
      onSave(formValues.table);
    },
    [onSave],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

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
    <Dialog
      fullScreen
      open
      title={getTaxConfigDialogTitle(calculator, table.code, !!row, readonly)}
      onClose={readonly ? onClose : openCloseConfirmationDialog}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckCircleOutline />}
              {...(readonly ? { onClick: onClose } : { type: 'submit' })}
            >
              {t(readonly ? 'core.button.close' : 'common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="tax_config.section_title.general_data" />
            <Grid2 size={12}>
              <Controller
                control={control}
                name="table"
                render={({ field }) => (
                  <TaxConfigValueField
                    {...field}
                    errors={errors}
                    mode={row ? FormMode.Edit : FormMode.Create}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
