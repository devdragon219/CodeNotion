import { Accordion } from '@realgimm5/frontend-common/components';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AdministrationTermPaymentField } from '../Field/Field';
import { AdministrationTermPaymentFieldAccordionProps } from './Accordion.types';

const AdministrationTermPaymentFieldAccordion = forwardRef<
  HTMLDivElement,
  AdministrationTermPaymentFieldAccordionProps
>(({ installments, existingPayments, payments, value, index, ...otherProps }, ref) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(index === payments.length - 1);
  }, [payments.length, index]);

  const accordionTitle = useMemo(() => {
    const installmentNumbers = value.installments.map(
      (installment) => installments.find(({ guid }) => guid === installment)?.installmentNumber,
    );
    return `${t(`administration_term.text.installment${installmentNumbers.length > 1 ? 's' : ''}_payment`)} ${installmentNumbers.join(', ')}`;
  }, [value.installments, t, installments]);

  return (
    <Accordion expanded={expanded} title={accordionTitle}>
      <AdministrationTermPaymentField
        ref={ref}
        value={value}
        installments={installments}
        existingPayments={existingPayments}
        {...otherProps}
      />
    </Accordion>
  );
});

AdministrationTermPaymentFieldAccordion.displayName = 'AdministrationTermPaymentFieldAccordion';
export { AdministrationTermPaymentFieldAccordion };
