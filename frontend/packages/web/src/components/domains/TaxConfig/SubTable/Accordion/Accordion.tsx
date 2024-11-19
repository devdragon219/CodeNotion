import { Accordion } from '@realgimm5/frontend-common/components';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { getTaxConfigValueTitle } from '../../../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigValueField } from '../../../../core/Fields/TaxConfigValue/TaxConfigValue';
import { TaxConfigValueFieldAccordionProps } from './Accordion.types';

const TaxConfigValueFieldAccordion = forwardRef<HTMLDivElement, TaxConfigValueFieldAccordionProps>(
  ({ fields, value, index, ...otherProps }, ref) => {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      setExpanded(index === fields.length - 1);
    }, [fields.length, index]);

    const accordionTitle = useMemo(() => getTaxConfigValueTitle(value), [value]);

    return (
      <Accordion expanded={expanded} title={accordionTitle}>
        <TaxConfigValueField ref={ref} value={value} {...otherProps} />
      </Accordion>
    );
  },
);

TaxConfigValueFieldAccordion.displayName = 'TaxConfigValueFieldAccordion';
export { TaxConfigValueFieldAccordion };
