import { Accordion } from '@realgimm5/frontend-common/components';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { ArticleField } from '../Field/Field';
import { ArticleFieldAccordionProps } from './Accordion.types';

export const ArticleFieldAccordion = ({ control, index, ...props }: ArticleFieldAccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  const articles = useWatch({ control, name: 'articles' });
  const name = useWatch({ control, name: `articles.${index}.name` });

  useEffect(() => {
    setExpanded(index === articles.length - 1);
  }, [articles.length, index]);

  return (
    <Accordion expanded={expanded} title={name}>
      <ArticleField {...props} control={control} index={index} />
    </Accordion>
  );
};
