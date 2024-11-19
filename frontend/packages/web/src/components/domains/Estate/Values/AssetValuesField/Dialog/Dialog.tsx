import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateFormInput } from '../../../../../../interfaces/FormInputs/Estate';
import { getEmptyEstateAssetValueFormInput } from '../../../../../../utils/estate/initialValues';
import { getEstateAssetValuesSchema } from '../../../../../../utils/estate/schemas/assetValues';
import { AssetValueField } from '../Field/Field';
import { AssetValuesDialogProps } from './Dialog.types';

export const AssetValuesDialog = ({ input, onClose, onSave }: AssetValuesDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EstateFormInput>({
    defaultValues: {
      assetValues: input ? [input.assetValue] : [getEmptyEstateAssetValueFormInput()],
    },
    resolver: yupResolver(getEstateAssetValuesSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'assetValues',
  });

  const handleAddAssetValue = useCallback(() => {
    append(getEmptyEstateAssetValueFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: EstateFormInput) => {
      onSave(
        input
          ? {
              ...input,
              assetValue: formValues.assetValues[0],
            }
          : formValues.assetValues,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title="estate.dialog.asset_values.title">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="estate.section_title.asset_values" />
            {input ? (
              <Grid2 size={12}>
                <AssetValueField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <AssetValueField control={control} errors={errors} index={index} />
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
                    onClick={handleAddAssetValue}
                  >
                    {t('estate.action.add_asset_values')}
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
