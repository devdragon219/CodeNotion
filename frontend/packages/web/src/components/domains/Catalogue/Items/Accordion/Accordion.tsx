import { Accordion } from '@realgimm5/frontend-common/components';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { ItemField } from '../Field/Field';
import { ItemFieldAccordionProps } from './Accordion.types';

export const ItemFieldAccordion = ({ control, index, ...props }: ItemFieldAccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const items = useWatch({ control, name: 'items' });
  const internalCode = useWatch({ control, name: `items.${index}.internalCode` });

  useEffect(() => {
    setExpanded(index === items.length - 1);
    // eslint-disable-next-line
  }, [items.length]);

  return (
    <Accordion expanded={expanded} title={internalCode}>
      <ItemField {...props} control={control} index={index} />
    </Accordion>
  );
};
