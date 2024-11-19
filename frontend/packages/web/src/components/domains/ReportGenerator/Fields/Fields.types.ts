import { ReportGeneratorFormInput } from '../../../../interfaces/FormInputs/ReportGenerator';

export interface ReportGeneratorFieldsStepProps {
  reportGenerator: ReportGeneratorFormInput;
  onBack: () => void;
  onChange: (reportGenerator: ReportGeneratorFormInput) => void;
  onSave: (reportGenerator: ReportGeneratorFormInput) => void;
}
