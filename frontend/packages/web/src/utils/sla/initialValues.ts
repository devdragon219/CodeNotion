import { SlaFormInput } from '../../interfaces/FormInputs/SLA';
import { getEmptyConditionsBuilderFormInput } from '../components/conditionsBuilder/initialValues';

export const getEmptySlaFormInput = (): SlaFormInput => ({
  conditions: getEmptyConditionsBuilderFormInput(),
  description: '',
  guid: crypto.randomUUID(),
  internalCode: '',
  slaId: null,
});
