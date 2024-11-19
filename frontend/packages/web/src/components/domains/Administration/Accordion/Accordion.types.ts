import { AdministrationFormInput } from '../../../../interfaces/FormInputs/Administration';
import { AdministrationFieldProps } from '../Field/Field.types';

export interface AdministrationFieldAccordionProps extends AdministrationFieldProps {
  administrations: AdministrationFormInput[];
  index: number;
}
