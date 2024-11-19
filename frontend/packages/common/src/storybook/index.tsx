import { ParseKeys } from 'i18next';

import { Tabs } from '../../lib/components/Tabs/Tabs';
import { useTabsLocation } from '../../lib/hooks/useTabsLocation';
import { ButtonStories } from './Stories/Buttons';
import { CalendarStories } from './Stories/Calendar';
import { DashboardStories } from './Stories/Dashboard';
import { FieldStories } from './Stories/Fields';
import { FormBuilderStories } from './Stories/FormBuilder';
import { LayoutStories } from './Stories/Layout';
import { TableStories } from './Stories/Tables';
import { TypographyStories } from './Stories/Typography';

export default function Storybook() {
  const { initialTab, onChange } = useTabsLocation();

  return (
    <Tabs
      initialTab={initialTab}
      tabs={[
        {
          label: 'Buttons' as ParseKeys,
          children: <ButtonStories />,
        },
        {
          label: 'Calendar' as ParseKeys,
          children: <CalendarStories />,
        },
        {
          label: 'Dashboard' as ParseKeys,
          children: <DashboardStories />,
        },
        {
          label: 'Fields' as ParseKeys,
          children: <FieldStories />,
        },
        {
          label: 'Form' as ParseKeys,
          children: <FormBuilderStories />,
        },
        {
          label: 'Layout' as ParseKeys,
          children: <LayoutStories />,
        },
        {
          label: 'Tables' as ParseKeys,
          children: <TableStories />,
        },
        {
          label: 'Typography' as ParseKeys,
          children: <TypographyStories />,
        },
      ]}
      onChange={onChange}
    />
  );
}
