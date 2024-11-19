import { Accordion } from '@realgimm5/frontend-common/components';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { InputField } from '../Field/Field';
import { InputFieldAccordionProps } from './Accordion.types';

export const InputFieldAccordion = ({ control, index, ...props }: InputFieldAccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const inputs = useWatch({ control, name: 'inputs' });
  const managementSubject = useWatch({ control, name: `inputs.${index}.managementSubject` });

  useEffect(() => {
    setExpanded(index === inputs.length - 1);
    // eslint-disable-next-line
  }, [inputs.length]);

  return (
    <Accordion expanded={expanded} title={managementSubject.name}>
      <InputField {...props} control={control} index={index} />
    </Accordion>
  );
};
