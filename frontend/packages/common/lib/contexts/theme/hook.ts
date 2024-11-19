import { createUseContext } from '../../utils/contextHelper';
import { ThemeContext } from './context';

export const useTheme = createUseContext(ThemeContext);
