import { ReportGeneratorFormInput } from '../../../../interfaces/FormInputs/ReportGenerator';

export interface ReportGeneratorGeneralDataStepProps {
  reportGenerator: ReportGeneratorFormInput;
  onChange: (reportGenerator: ReportGeneratorFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
