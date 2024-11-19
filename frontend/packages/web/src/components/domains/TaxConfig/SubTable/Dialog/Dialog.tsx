import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TaxConfigFormInput, TaxConfigValueFormInput } from '../../../../../interfaces/FormInputs/TaxConfig';
import { getEmptyTaxConfigValueFormInput } from '../../../../../utils/components/taxConfig/initialValues';
import { getTaxConfigSubTableSchema } from '../../../../../utils/components/taxConfig/schemas/taxConfigSubTable';
import {
  getTaxConfigAddValueActionLabel,
  getTaxConfigDialogTitle,
} from '../../../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigValueField } from '../../../../core/Fields/TaxConfigValue/TaxConfigValue';
import { TaxConfigValueFieldAccordion } from '../Accordion/Accordion';
import { TaxConfigSubTableDialogProps } from './Dialog.types';

export const TaxConfigSubTableDialog = ({
  calculator,
  input,
  subTable,
  onClose,
  onSave,
}: TaxConfigSubTableDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TaxConfigFormInput>({
    defaultValues: {
      subTables: {
        [subTable.code]: [input ? input.value : getEmptyTaxConfigValueFormInput(subTable)],
      },
    },
    resolver: yupResolver(getTaxConfigSubTableSchema(subTable.code, t)),
  });
  const { fields, replace, remove } = useFieldArray({
    control,
    name: `subTables.${subTable.code}`,
  });

  const handleAddTaxConfigValue = useCallback(() => {
    replace([...fields, getEmptyTaxConfigValueFormInput(subTable)]);
  }, [fields, replace, subTable]);

  const onSubmit = useCallback(
    (formValues: { subTables: { [code: string]: TaxConfigValueFormInput[] } }) => {
      onSave(
        input
          ? {
              ...input,
              value: formValues.subTables[subTable.code][0],
            }
          : formValues.subTables[subTable.code],
      );
    },
    [input, onSave, subTable.code],
  );

  return (
    <Dialog open title={getTaxConfigDialogTitle(calculator, subTable.code, !!input)} onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            {input ? (
              <Grid2 size={12}>
                <Controller
                  name={`subTables.${subTable.code}.0`}
                  control={control}
                  render={({ field }) => (
                    <TaxConfigValueField
                      {...field}
                      errors={errors.subTables?.[subTable.code]?.[0]}
                      mode={FormMode.Edit}
                    />
                  )}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <Controller
                            name={`subTables.${subTable.code}.${index}`}
                            control={control}
                            render={({ field }) => (
                              <TaxConfigValueFieldAccordion
                                {...field}
                                errors={errors.subTables?.[subTable.code]?.[index]}
                                fields={fields}
                                index={index}
                                mode={FormMode.Create}
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
                    onClick={handleAddTaxConfigValue}
                  >
                    {t(getTaxConfigAddValueActionLabel(calculator, subTable.code))}
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
