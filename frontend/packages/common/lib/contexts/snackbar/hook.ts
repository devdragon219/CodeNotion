import { createUseContext } from '../../utils/contextHelper';
import { SnackbarContext } from './context';

export const useSnackbar = createUseContext(SnackbarContext);
