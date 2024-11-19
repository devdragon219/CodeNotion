import { LoginFormInput } from '../../interfaces/FormInputs/Login';

export const getEmptyLoginFormInput = (): LoginFormInput => ({
  username: '',
  password: '',
});
