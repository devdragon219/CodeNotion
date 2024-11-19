import { yupResolver } from '@hookform/resolvers/yup';
import { StepForm } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketQuoteArticleFormInput, TicketQuoteFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getTicketArticlesSchema } from '../../../../utils/ticket/schemas/quote';
import { ArticlesTable } from './Field/Field';
import { TicketArticlesTableStepProps } from './Table.types';

export const TicketArticlesTableStep = ({
  articles,
  onBack,
  onChange,
  onError,
  onSave,
}: TicketArticlesTableStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TicketQuoteFormInput>({
    defaultValues: {
      articles,
    },
    resolver: yupResolver(getTicketArticlesSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch(({ articles }) => {
      onChange(articles as TicketQuoteArticleFormInput[]);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.articles?.root) {
      onError(errors.articles.root.message);
    }
    // eslint-disable-next-line
  }, [errors.articles?.root]);

  const handleSave = useCallback(
    ({ articles }: TicketQuoteFormInput) => {
      onSave(articles);
    },
    [onSave],
  );

  return (
    <StepForm onBack={onBack} onComplete={onError} onSubmit={handleSubmit(handleSave)}>
      <ArticlesTable control={control} errors={errors} />
    </StepForm>
  );
};
