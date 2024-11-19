import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Loader, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetAllTaxConfigSubTableValuesQuery } from '../../../../../gql/RealGimm.Web.TaxConfiguration.operation';
import { parseTaxConfigTableRowToTaxConfigValueFormInput } from '../../../../../utils/components/taxConfig/parseTaxConfigTableRowFragment';
import {
  getTaxConfigFieldLabel,
  getTaxConfigTableEmptyLabel,
  getTaxConfigTableName,
  getTaxConfigTableRowValue,
} from '../../../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigValueField } from '../../../../core/Fields/TaxConfigValue/TaxConfigValue';
import { TaxConfigSubTableDialogProps } from './Dialog.types';

export const TaxConfigSubTableDialog = ({
  calculator,
  row,
  subTable,
  table,
  onClose,
}: TaxConfigSubTableDialogProps) => {
  const { t } = useTranslation();
  const [queryState] = useGetAllTaxConfigSubTableValuesQuery({
    variables: {
      calculatorId: calculator.id,
      subTable: subTable.code,
      tableCode: table.code,
      year: row.year,
      groupReference: 'groupingReference' in row ? row.groupingReference : undefined,
    },
  });
  const rows = useMemo(
    () =>
      queryState.data?.taxConfiguration.listSubTableValueFull.map((row) =>
        subTable.columns.map((column) => getTaxConfigTableRowValue(column, row)),
      ) ?? [],
    [queryState.data?.taxConfiguration.listSubTableValueFull, subTable.columns],
  );

  return (
    <Dialog fullScreen open title={getTaxConfigTableName(calculator.description, table.code)} onClose={onClose}>
      {queryState.fetching && <Loader />}
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value={getTaxConfigFieldLabel(subTable.code)} />
          <Grid2 size={12}>
            <TaxConfigValueField
              mode={FormMode.Edit}
              readonly
              value={parseTaxConfigTableRowToTaxConfigValueFormInput(row, table)}
            />
          </Grid2>
          <Grid2 size={12}>
            <SecondaryTable
              columns={subTable.columns.map(({ code }) => getTaxConfigFieldLabel(code))}
              empty={getTaxConfigTableEmptyLabel(calculator.description, table.code)}
              rows={rows}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};
