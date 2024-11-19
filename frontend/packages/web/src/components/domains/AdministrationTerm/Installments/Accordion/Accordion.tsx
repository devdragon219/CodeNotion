import { Accordion } from '@realgimm5/frontend-common/components';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AdministrationTermInstallmentField } from '../Field/Field';
import { AdministrationTermInstallmentFieldAccordionProps } from './Accordion.types';

const AdministrationTermInstallmentFieldAccordion = forwardRef<
  HTMLDivElement,
  AdministrationTermInstallmentFieldAccordionProps
>(({ installments, value, index, ...otherProps }, ref) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(index === installments.length - 1);
  }, [installments.length, index]);

  const accordionTitle = useMemo(() => {
    return `${t('administration_term.text.installment')} ${value.installmentNumber}`;
  }, [t, value.installmentNumber]);

  return (
    <Accordion expanded={expanded} title={accordionTitle}>
      <AdministrationTermInstallmentField ref={ref} value={value} {...otherProps} />
    </Accordion>
  );
});

AdministrationTermInstallmentFieldAccordion.displayName = 'AdministrationTermInstallmentFieldAccordion';
export { AdministrationTermInstallmentFieldAccordion };
