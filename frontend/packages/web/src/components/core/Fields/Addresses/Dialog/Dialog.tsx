import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddressesFieldValues } from '../../../../../interfaces/FormInputs/Addresses';
import { getEmptyAddressFormInput } from '../../../../../utils/components/addressesField/initialValues';
import { getAddressesSchema } from '../../../../../utils/components/addressesField/schemas/addresses';
import { AddressField } from '../Field/Field';
import { AddressDialogProps } from './Dialog.types';

export const AddressDialog = ({
  buttonTitle,
  input,
  required,
  sectionTitle,
  title,
  useAddressType,
  onClose,
  onSave,
}: AddressDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<AddressesFieldValues>({
    defaultValues: {
      addresses: input
        ? [input.address]
        : [getEmptyAddressFormInput(useAddressType ? null : AsstAddressType.OtherAddress)],
    },
    resolver: yupResolver(getAddressesSchema(required ?? false, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  const handleAddAddress = useCallback(() => {
    append(getEmptyAddressFormInput(useAddressType ? null : AsstAddressType.OtherAddress));
  }, [useAddressType, append]);

  const onSubmit = useCallback(
    (formValues: AddressesFieldValues) => {
      onSave(
        input
          ? {
              ...input,
              address: formValues.addresses[0],
            }
          : formValues.addresses,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={title}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value={sectionTitle} />
            {input ? (
              <Grid2 size={12}>
                <AddressField
                  control={control}
                  errors={errors}
                  index={0}
                  required={required}
                  useAddressType={useAddressType}
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
                          <AddressField
                            control={control}
                            errors={errors}
                            index={index}
                            required={required}
                            useAddressType={useAddressType}
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
                    onClick={handleAddAddress}
                  >
                    {t(buttonTitle)}
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
