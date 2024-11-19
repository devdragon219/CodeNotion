import { TaxConfigValueBundleFragment } from '../../../gql/RealGimm.Web.TaxConfigValueBundle.fragment';
import { TaxConfigFormInput } from '../../../interfaces/FormInputs/TaxConfig';
import { parseTaxConfigTableRowToTaxConfigValueFormInput } from './parseTaxConfigTableRowFragment';

export const parseTaxConfigValueToTaxConfigValueFormInput = (
  { calculator, mainValue, allSubTableValues }: TaxConfigValueBundleFragment,
  tableCode: string,
): TaxConfigFormInput => {
  const table = calculator.configuration.availableMainTables.find(({ code }) => code === tableCode)!;
  const subTables = calculator.configuration.availableSubTables.find(({ key }) => key === tableCode)!.value;

  return {
    subTables: subTables.reduce(
      (acc, subTable) => ({
        ...acc,
        [subTable.code]:
          allSubTableValues
            .find(({ key }) => key === subTable.code)
            ?.value.map((row) => parseTaxConfigTableRowToTaxConfigValueFormInput(row, subTable)) ?? [],
      }),
      {},
    ),
    table: parseTaxConfigTableRowToTaxConfigValueFormInput(mainValue, table),
  };
};
