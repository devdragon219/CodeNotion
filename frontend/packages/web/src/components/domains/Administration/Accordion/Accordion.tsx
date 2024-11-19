import { Accordion } from '@realgimm5/frontend-common/components';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AdministrationField } from '../Field/Field';
import { AdministrationFieldAccordionProps } from './Accordion.types';

const AdministrationFieldAccordion = forwardRef<HTMLDivElement, AdministrationFieldAccordionProps>(
  ({ administrations, value, index, ...otherProps }, ref) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      setExpanded(index === administrations.length - 1);
    }, [administrations.length, index]);

    const accordionTitle = useMemo(() => {
      if (!value.administrationType || !value.administratorSubject?.name) return '';

      const formattedAdministrationType = t('administration.detail_title', {
        type: t(`common.enum.administration_type.${value.administrationType}`),
      });
      const administratorSubject = value.administratorSubject.name;

      return `${formattedAdministrationType} - ${administratorSubject}`;
    }, [value, t]);

    return (
      <Accordion expanded={expanded} title={accordionTitle}>
        <AdministrationField ref={ref} value={value} {...otherProps} />
      </Accordion>
    );
  },
);

AdministrationFieldAccordion.displayName = 'AdministrationFieldAccordion';
export { AdministrationFieldAccordion };
