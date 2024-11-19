import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { EmptyText, RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { ParseKeys } from 'i18next';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AddressFormInput } from '../../../../interfaces/FormInputs/Addresses';
import { getEmptyAddressFormInput } from '../../../../utils/components/addressesField/initialValues';
import { getCountryName } from '../../../../utils/countryUtils';
import { AddressesFieldProps } from './Addresses.types';
import { AddressDialog } from './Dialog/Dialog';
import { AddressDialogInput } from './Dialog/Dialog.types';
import { AddressField } from './Field/Field';

const FIXED_ADDRESS_FIELDS = 1;
export const AddressesField = ({
  buttonTitle,
  control,
  dialogTitles,
  emptyText,
  errors,
  mode,
  readonly,
  required,
  sectionTitles,
  useAddressType,
  useMap,
  setValue,
}: AddressesFieldProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'addresses' });

  const [addressDialogProps, setAddressDialogProps] = useState<{
    input?: AddressDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseAddressDialog = useCallback(() => {
    setAddressDialogProps({ open: false });
  }, []);
  const handleEditAddress = useCallback(
    (index: number) => {
      setAddressDialogProps({
        input: { address: fields[index + FIXED_ADDRESS_FIELDS], index: index + FIXED_ADDRESS_FIELDS },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveAddress = useCallback(
    (value: AddressFormInput[] | AddressDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.address);
      }
      handleCloseAddressDialog();
    },
    [append, update, handleCloseAddressDialog],
  );

  const handleAddAddress = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyAddressFormInput(useAddressType ? null : AsstAddressType.OtherAddress));
    } else {
      setAddressDialogProps({ open: true });
    }
  }, [mode, useAddressType, append]);
  const handleRemoveAddress = useCallback(
    (index: number) => {
      remove(index + FIXED_ADDRESS_FIELDS);
    },
    [remove],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value={sectionTitles.primary} />
      <Grid2 size={12}>
        <AddressField
          control={control}
          errors={errors}
          index={0}
          readonly={readonly}
          required={required}
          setValue={setValue}
          useMap={useMap}
        />
      </Grid2>
      <SectionTitle value={sectionTitles.secondary} />
      {fields.slice(FIXED_ADDRESS_FIELDS).length !== 0 ? (
        <Grid2 size={12}>
          {mode === FormMode.Create ? (
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.slice(FIXED_ADDRESS_FIELDS).map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={handleRemoveAddress}>
                  <AddressField
                    control={control}
                    errors={errors}
                    index={index + FIXED_ADDRESS_FIELDS}
                    required={required}
                    useAddressType={useAddressType}
                    setValue={setValue}
                  />
                </RepeatableField>
              ))}
            </Stack>
          ) : (
            <SecondaryTable
              columns={[
                ...(useAddressType ? ['component.addresses_field.field.type' as ParseKeys] : []),
                'component.addresses_field.field.country',
                'component.addresses_field.field.city',
                'component.addresses_field.field.county',
                'component.addresses_field.field.toponymy',
                'component.addresses_field.field.postal_code',
                'component.addresses_field.field.notes',
              ]}
              rows={fields
                .slice(FIXED_ADDRESS_FIELDS)
                .map((entry) => [
                  ...(useAddressType
                    ? [entry.addressType ? t(`common.enum.address_type.${entry.addressType}` as ParseKeys) : null]
                    : []),
                  entry.countryISO && getCountryName(entry.countryISO, language),
                  entry.city.name,
                  entry.countyName,
                  [entry.toponymy, entry.numbering].join(', '),
                  entry.localPostCode,
                  entry.notes,
                ])}
              onRowDelete={readonly ? undefined : handleRemoveAddress}
              onRowEdit={readonly ? undefined : handleEditAddress}
            />
          )}
        </Grid2>
      ) : mode === FormMode.Edit ? (
        <EmptyText value={emptyText} />
      ) : (
        <></>
      )}
      {addressDialogProps.open && (
        <AddressDialog
          buttonTitle={buttonTitle}
          input={addressDialogProps.input}
          required={required}
          sectionTitle={sectionTitles.secondary}
          title={addressDialogProps.input ? dialogTitles.edit : dialogTitles.add}
          useAddressType={useAddressType}
          onClose={handleCloseAddressDialog}
          onSave={handleSaveAddress}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddAddress}>
            {t(buttonTitle)}
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
