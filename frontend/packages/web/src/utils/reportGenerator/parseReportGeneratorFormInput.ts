import { CustomFieldType, ReportGeneratorFilterInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString, parseStringToDate } from '@realgimm5/frontend-common/utils';

import { GenerateReportsMutationVariables } from '../../gql/RealGimm.Web.ReportGenerator.operation';
import { ReportGeneratorFormInput } from '../../interfaces/FormInputs/ReportGenerator';

export const parseReportGeneratorFormInputToGenerateReportVariables = (
  reportGenerator: ReportGeneratorFormInput,
): GenerateReportsMutationVariables => ({
  filters: reportGenerator.fields.flatMap((fields) =>
    fields.reduce<ReportGeneratorFilterInput[]>((acc, field) => {
      const commonProps = {
        fieldName: field.name,
      };

      switch (field.fieldType) {
        case CustomFieldType.Date: {
          const dateValue = parseDateToString(parseStringToDate(field.value));
          return dateValue
            ? [
                ...acc,
                {
                  ...commonProps,
                  dateValue,
                },
              ]
            : acc;
        }
        case CustomFieldType.SimpleNumber: {
          const numberValue = getStringOrNull(field.value);
          return numberValue
            ? [
                ...acc,
                {
                  ...commonProps,
                  numberValue: +numberValue,
                },
              ]
            : acc;
        }
        case CustomFieldType.SimpleText:
        case CustomFieldType.SingleItemFromList: {
          const stringValue = getStringOrNull(field.value);
          return stringValue
            ? [
                ...acc,
                {
                  ...commonProps,
                  stringValue,
                },
              ]
            : acc;
        }
      }
    }, []),
  ),
  reportGeneratorId: reportGenerator.report!.id,
  targetReportFormats: reportGenerator.formats,
});
