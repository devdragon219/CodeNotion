import { createUseContext } from '../../utils/contextHelper';
import { AuthContext } from './context';

export const useAuth = createUseContext(AuthContext);
