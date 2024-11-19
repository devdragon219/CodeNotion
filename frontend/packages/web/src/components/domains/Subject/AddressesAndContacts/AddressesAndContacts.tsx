import { Grid2 } from '@mui/material';
import { ContactsField } from '@realgimm5/frontend-common/components';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { ContactsFieldValues } from '@realgimm5/frontend-common/interfaces';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

import { LegalNature } from '../../../../enums/LegalNature';
import { AddressesFieldValues } from '../../../../interfaces/FormInputs/Addresses';
import { AddressesField } from '../../../core/Fields/Addresses/Addresses';
import { SubjectAddressesAndContactsProps } from './AddressesAndContacts.types';

export const SubjectAddressesAndContacts = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
}: SubjectAddressesAndContactsProps) => {
  const entryStatus = useWatch({ control, name: 'entryStatus' });
  const legalNature = useWatch({ control, name: 'legalNature' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <AddressesField
          buttonTitle="subject.action.add_address"
          control={control as unknown as Control<AddressesFieldValues>}
          dialogTitles={{
            add: 'subject.dialog.address.add',
            edit: 'subject.dialog.address.edit',
          }}
          emptyText="subject.text.no_other_addresses"
          errors={errors}
          mode={mode}
          readonly={readonly}
          required={entryStatus !== EntryStatus.IncompleteDraft}
          sectionTitles={{
            primary: `subject.section_title.${
              legalNature === LegalNature.PhysicalPerson ? 'residential_address' : 'legal_address'
            }`,
            secondary: 'subject.section_title.other_addresses',
          }}
          useAddressType
          setValue={setValue as unknown as UseFormSetValue<AddressesFieldValues>}
        />
      </Grid2>
      <Grid2 size={12}>
        <ContactsField
          control={control as unknown as Control<ContactsFieldValues>}
          errors={errors}
          mode={mode}
          readonly={readonly}
        />
      </Grid2>
    </Grid2>
  );
};
