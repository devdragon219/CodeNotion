import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getEmptyTicketQuoteArticleFormInput } from '../../../../../utils/ticket/initialValues';
import { getTicketArticlesSchema } from '../../../../../utils/ticket/schemas/quote';
import { ArticleFieldAccordion } from './Accordion/Accordion';
import { ArticleDialogProps, ArticlesFieldValues } from './Article.types';
import { ArticleField } from './Field/Field';

export const ArticleDialog = ({ input, onClose, onSave }: ArticleDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ArticlesFieldValues>({
    defaultValues: {
      articles: input ? [input.article] : [getEmptyTicketQuoteArticleFormInput()],
    },
    resolver: yupResolver(getTicketArticlesSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'articles',
  });

  const handleAddArticle = useCallback(() => {
    append(getEmptyTicketQuoteArticleFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: ArticlesFieldValues) => {
      onSave(
        input
          ? {
              ...input,
              article: formValues.articles[0],
            }
          : formValues.articles,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`ticket.dialog.${input ? 'edit_article' : 'add_new_articles'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="ticket.section_title.quote_articles" />
            {input ? (
              <Grid2 size={12}>
                <ArticleField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <ArticleFieldAccordion control={control} errors={errors} index={index} />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                <Grid2 size={12}>
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddArticle}
                  >
                    {t('ticket.action.add_articles')}
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
