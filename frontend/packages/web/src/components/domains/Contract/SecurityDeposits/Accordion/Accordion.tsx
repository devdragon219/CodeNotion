import { Accordion } from '@realgimm5/frontend-common/components';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SecurityDepositField } from '../Field/Field';
import { SecurityDepositFieldAccordionProps } from './Accordion.types';

export const SecurityDepositFieldAccordion = ({ control, index, ...props }: SecurityDepositFieldAccordionProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const securityDeposits = useWatch({ control, name: 'securityDeposits' });
  const securityDepositType = useWatch({ control, name: `securityDeposits.${index}.securityDepositType` });

  useEffect(() => {
    setExpanded(index === securityDeposits.length - 1);
    // eslint-disable-next-line
  }, [securityDeposits.length]);

  return (
    <Accordion
      expanded={expanded}
      title={securityDepositType ? t(`common.enum.security_deposit_type.${securityDepositType}`) : ''}
    >
      <SecurityDepositField {...props} control={control} index={index} />
    </Accordion>
  );
};
