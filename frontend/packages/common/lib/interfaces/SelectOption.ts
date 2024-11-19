export interface SelectGroupOption<Value> {
  options: SelectOption<Value>[];
  selectable?: boolean;
  value: Value;
}

export interface SelectLabelValueOption<Value> {
  disabled?: boolean;
  label: string;
  value: Value;
}

export type SelectOption<Value> = Value | SelectLabelValueOption<Value> | SelectGroupOption<Value>;
