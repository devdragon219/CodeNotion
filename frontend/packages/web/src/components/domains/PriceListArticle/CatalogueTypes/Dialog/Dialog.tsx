import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PriceListArticleFormInput } from '../../../../../interfaces/FormInputs/PriceListArticle';
import { getPriceListArticleCatalogueTypesSchema } from '../../../../../utils/priceListArticle/schemas/catalogueTypes';
import { PriceListArticleCatalogueTypesTransferList } from '../TransferList/TransferList';
import { CatalogueTypesDialogProps } from './Dialog.types';

export const CatalogueTypesDialog = ({ catalogueTypes, onClose, onSave }: CatalogueTypesDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PriceListArticleFormInput>({
    defaultValues: {
      catalogueTypes: [],
    },
    resolver: yupResolver(getPriceListArticleCatalogueTypesSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: PriceListArticleFormInput) => {
      onSave(formValues.catalogueTypes);
    },
    [onSave],
  );

  return (
    <Dialog fullScreen open onClose={onClose} title="price_list_article.dialog.add_catalogue_types">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <PriceListArticleCatalogueTypesTransferList
            control={control}
            errors={errors}
            mode={FormMode.Edit}
            where={{
              id: {
                nin: catalogueTypes.map(({ catalogueTypeId }) => catalogueTypeId),
              },
            }}
          />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
