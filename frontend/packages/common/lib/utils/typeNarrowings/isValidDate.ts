import { isDate, isValid } from 'date-fns';

import { isOfType } from './isOfType';

export const isValidDate = (object: unknown): object is Date => isOfType<Date>(object, [], [isDate, isValid]);
