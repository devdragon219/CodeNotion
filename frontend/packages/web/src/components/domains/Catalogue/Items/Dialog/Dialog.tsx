import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueFormInput } from '../../../../../interfaces/FormInputs/Catalogue';
import { getCatalogueItemsSchema } from '../../../../../utils/catalogue/schemas/items';
import { getEmptyCatalogueItemFormInput } from '../../../../../utils/catalogueItem/initialValues';
import { ItemFieldAccordion } from '../Accordion/Accordion';
import { ItemField } from '../Field/Field';
import { ItemDialogProps } from './Dialog.types';

export const ItemDialog = ({
  canUseInternalCodes,
  catalogueType,
  estate,
  existingInternalCodes,
  input,
  onClose,
  onSave,
  setCanUseInternalCodes,
}: ItemDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CatalogueFormInput>({
    defaultValues: {
      items: input ? [input.item] : [getEmptyCatalogueItemFormInput(catalogueType, estate)],
    },
    resolver: yupResolver(getCatalogueItemsSchema(canUseInternalCodes, language, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAddItem = useCallback(() => {
    append(getEmptyCatalogueItemFormInput(catalogueType, estate));
  }, [catalogueType, estate, append]);

  const internalCodes = useMemo(() => fields.map(({ internalCode }) => internalCode), [fields]);

  const onSubmit = useCallback(
    (formValues: CatalogueFormInput) => {
      onSave(
        input
          ? {
              ...input,
              item: formValues.items[0],
            }
          : formValues.items,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`catalogue.dialog.item.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="catalogue.section_title.item" />
            {input ? (
              <Grid2 size={12}>
                <ItemField
                  control={control}
                  errors={errors}
                  existingInternalCodes={existingInternalCodes}
                  index={0}
                  internalCodes={internalCodes}
                  mode={FormMode.Edit}
                  useGetInternalCode={false}
                  setCanUseInternalCodes={setCanUseInternalCodes}
                  setValue={setValue}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <ItemFieldAccordion
                            control={control}
                            errors={errors}
                            existingInternalCodes={existingInternalCodes}
                            index={index}
                            internalCodes={internalCodes}
                            mode={FormMode.Edit}
                            useGetInternalCode
                            setCanUseInternalCodes={setCanUseInternalCodes}
                            setValue={setValue}
                          />
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
                    onClick={handleAddItem}
                  >
                    {t('catalogue.action.add_catalogue_item')}
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
