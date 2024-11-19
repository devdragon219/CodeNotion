import { ReportFormat } from '@realgimm5/frontend-common/gql/types';
import { FormViewerFieldFormInput } from '@realgimm5/frontend-common/interfaces';

import { ReportGeneratorOutputFragment } from '../../gql/RealGimm.Web.ReportGeneratorOutput.fragment';

export interface ReportGeneratorFormInput {
  fields: FormViewerFieldFormInput[][];
  formats: ReportFormat[];
  report: ReportGeneratorOutputFragment | null;
}
