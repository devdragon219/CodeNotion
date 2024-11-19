import { TextFieldProps } from '../Text/Text.types';

export type DurationFieldProps = Omit<TextFieldProps<number | null>, 'type'>;
