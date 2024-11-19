import { Abc, ArrowDropDownCircleOutlined, CalendarMonthOutlined } from '@mui/icons-material';

import Icon123 from '../../../assets/images/123.svg?react';
import { CustomFieldType } from '../../../gql/types';
import { FormBuilderFieldIconProps } from './FieldIcon.types';

export const FormBuilderFieldIcon = ({ type }: FormBuilderFieldIconProps) => {
  switch (type) {
    case CustomFieldType.Date:
      return <CalendarMonthOutlined />;
    case CustomFieldType.SimpleNumber:
      return <Icon123 />;
    case CustomFieldType.SimpleText:
      return <Abc />;
    case CustomFieldType.SingleItemFromList:
      return <ArrowDropDownCircleOutlined />;
  }
};
