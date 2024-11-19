import { FormViewerFieldFormInput } from '@realgimm5/frontend-common/interfaces';

import { ReportGeneratorFilterFieldFragment } from '../../gql/RealGimm.Web.ReportGeneratorFilterField.fragment';

export const parseReportGeneratorFilterFieldFragmentsToFormViewerFieldFormInputs = (
  filterFields: ReportGeneratorFilterFieldFragment[][],
): FormViewerFieldFormInput[][] =>
  filterFields.map((fields) =>
    fields.map((field) => ({
      fieldType: field.type,
      isMandatory: field.isMandatory,
      label: field.label,
      name: field.name,
      templateTypeId: crypto.randomUUID(),
      validValues:
        field.validValues?.map((validValue) => ({
          // This mapping is intended, backend is returning key:value as value:label
          label: validValue.value,
          value: validValue.key,
        })) ?? [],
      value: '',
    })),
  );
