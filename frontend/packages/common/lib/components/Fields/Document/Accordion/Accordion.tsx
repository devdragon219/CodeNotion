import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Accordion } from '../../../Accordion/Accordion';
import { DocumentField } from '../Document';
import { DocumentFieldAccordionProps } from './Accordion.types';

const DocumentFieldAccordion = forwardRef<HTMLDivElement, DocumentFieldAccordionProps>(
  ({ documents, index = 0, value, ...otherProps }, ref) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      setExpanded(index === documents.length - 1);
    }, [documents.length, index]);

    const accordionTitle = useMemo(() => {
      const documentName = value.name;
      const contentCategoryGroup = value.contentCategoryGroup;
      const contentCategory = value.contentCategory;

      const documentNameString = documentName ? `${documentName} ` : '';
      const parenthesesStrings = (contentCategoryGroup ?? contentCategory) ? ['(', ')'] : ['', ''];
      const contentCategoryGroupString = contentCategoryGroup
        ? t(`common.enum.content_category_group.${contentCategoryGroup}`)
        : '';
      const separatorString = contentCategoryGroup && contentCategory ? '/' : '';
      const contentCategoryString = contentCategory ? t(`common.enum.content_category.${contentCategory}`) : '';

      return `${documentNameString}${parenthesesStrings[0]}${contentCategoryGroupString}${separatorString}${contentCategoryString}${parenthesesStrings[1]}`;
    }, [value, t]);

    return (
      <Accordion expanded={expanded} title={accordionTitle}>
        <DocumentField ref={ref} index={index} value={value} {...otherProps} />
      </Accordion>
    );
  },
);

DocumentFieldAccordion.displayName = 'DocumentFieldAccordion';
export { DocumentFieldAccordion };
