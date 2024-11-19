import { ReportGeneratorFormInput } from '../../interfaces/FormInputs/ReportGenerator';

export const getEmptyReportGeneratorFormInput = (): ReportGeneratorFormInput => ({
  fields: [],
  formats: [],
  report: null,
});
