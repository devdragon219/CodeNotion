import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TaxConfigValueFormInput } from '../../../../interfaces/FormInputs/TaxConfig';
import { getEmptyTaxConfigValueFormInput } from '../../../../utils/components/taxConfig/initialValues';
import {
  getTaxConfigAddValueActionLabel,
  getTaxConfigFieldLabel,
  getTaxConfigFieldValue,
  getTaxConfigTableEmptyLabel,
} from '../../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigValueFieldAccordion } from './Accordion/Accordion';
import { TaxConfigSubTableDialog } from './Dialog/Dialog';
import { TaxConfigSubTableDialogInput } from './Dialog/Dialog.types';
import { TaxConfigSubTableProps } from './SubTable.types';

export const TaxConfigSubTable = ({
  calculator,
  control,
  errors,
  mode,
  readonly,
  subTable,
}: TaxConfigSubTableProps) => {
  const { t } = useTranslation();
  const { fields, append, remove, replace, update } = useFieldArray({ control, name: `subTables.${subTable.code}` });

  const [subTableDialogProps, setSubTableDialogProps] = useState<{
    input?: TaxConfigSubTableDialogInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });

  const handleAddTaxConfigSubTableValue = useCallback(() => {
    if (mode === FormMode.Create) {
      replace([...fields, getEmptyTaxConfigValueFormInput(subTable)]);
    } else {
      setSubTableDialogProps({ open: true });
    }
  }, [fields, mode, replace, subTable]);

  const handleCloseSubTableDialog = useCallback(() => {
    setSubTableDialogProps({ open: false });
  }, []);

  const handleEditTaxConfigSubTableValue = useCallback(
    (index: number) => {
      setSubTableDialogProps({
        input: {
          index,
          value: fields[index],
        },
        open: true,
      });
    },
    [fields],
  );

  const handleSaveTaxConfigSubTableValue = useCallback(
    (value: TaxConfigValueFormInput[] | TaxConfigSubTableDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.value);
      }
      handleCloseSubTableDialog();
    },
    [append, handleCloseSubTableDialog, update],
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
              onClick={handleAddTaxConfigSubTableValue}
            >
              {t(getTaxConfigAddValueActionLabel(calculator, subTable.code))}
            </Button>
          ) : undefined
        }
        value={getTaxConfigFieldLabel(subTable.code)}
      />
      {mode === FormMode.Create ? (
        <>
          {fields.length !== 0 && (
            <Grid2 size={12} sx={{ mt: 2 }}>
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
                          mode={mode}
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
              onClick={handleAddTaxConfigSubTableValue}
            >
              {t(getTaxConfigAddValueActionLabel(calculator, subTable.code))}
            </Button>
          </Grid2>
        </>
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={subTable.columns.map(({ code }) => getTaxConfigFieldLabel(code))}
            empty={getTaxConfigTableEmptyLabel(calculator, subTable.code)}
            rows={fields.map((row) => row.fields.map(getTaxConfigFieldValue))}
            onRowDelete={readonly ? undefined : remove}
            onRowEdit={readonly ? undefined : handleEditTaxConfigSubTableValue}
          />
        </Grid2>
      )}
      {subTableDialogProps.open && (
        <TaxConfigSubTableDialog
          calculator={calculator}
          input={subTableDialogProps.input}
          subTable={subTable}
          onClose={handleCloseSubTableDialog}
          onSave={handleSaveTaxConfigSubTableValue}
        />
      )}
    </Grid2>
  );
};
