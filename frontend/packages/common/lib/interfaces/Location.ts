import { Location } from 'react-router-dom';

export type StateLocation = Location<
  | {
      readonly?: boolean;
    }
  | undefined
>;
