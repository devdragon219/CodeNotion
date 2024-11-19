import { createUseContext } from '../../utils/contextHelper';
import { OperationContext } from './context';

export const useOperation = createUseContext(OperationContext);
