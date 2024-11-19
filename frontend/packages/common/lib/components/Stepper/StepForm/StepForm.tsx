import { Form } from '../../Form/Form';
import { StepActions } from '../StepActions/StepActions';
import { StepContent } from '../StepContent/StepContent';
import { StepFormProps } from './StepForm.types';

export const StepForm = ({ children, sx, onSubmit, ...props }: StepFormProps) => (
  <Form noValidate onSubmit={onSubmit}>
    <StepContent sx={sx}>{children}</StepContent>
    <StepActions {...props} />
  </Form>
);
