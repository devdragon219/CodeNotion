import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContactInfoType } from '../../../../gql/types';
import { useFieldArray } from '../../../../hooks/useFieldArray.ts';
import { ContactsFieldValues } from '../../../../interfaces/FormInputs/Contacts';
import { getEmptyContactFormInput } from '../../../../utils/contactsField/initialValues';
import { getContactsSchema } from '../../../../utils/contactsField/schemas/contacts';
import { DialogContent } from '../../../Dialog/Content/Content';
import { Dialog } from '../../../Dialog/Dialog';
import { Form } from '../../../Form/Form';
import { SectionTitle } from '../../../SectionTitle/SectionTitle';
import { RepeatableField } from '../../Repeatable/Repeatable';
import { ContactField } from '../Field/Field';
import { ContactDialogProps } from './Dialog.types';

export const ContactDialog = ({ existingContacts, input, type, onClose, onSave }: ContactDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactsFieldValues>({
    defaultValues: {
      contacts: {
        emails: type === 'email' ? (input ? [input.contact] : [getEmptyContactFormInput()]) : [],
        phones: type === 'phone' ? (input ? [input.contact] : [getEmptyContactFormInput()]) : [],
      },
    },
    resolver: yupResolver(getContactsSchema(t, existingContacts)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: `contacts.${type === 'email' ? 'emails' : 'phones'}`,
  });

  const handleAddContact = useCallback(() => {
    append(getEmptyContactFormInput('' as ContactInfoType));
  }, [append]);

  const onSubmit = useCallback(
    (formValues: ContactsFieldValues) => {
      if (type === 'email') {
        onSave(
          input
            ? {
                ...input,
                contact: formValues.contacts.emails[0],
              }
            : formValues.contacts.emails,
        );
      } else {
        onSave(
          input
            ? {
                ...input,
                contact: formValues.contacts.phones[0],
              }
            : formValues.contacts.phones,
        );
      }
    },
    [input, type, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`common.component.contacts_field.dialog.${type}.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value={`common.component.contacts_field.section_title.${type}`} />
            {input ? (
              <Grid2 size={12}>
                <ContactField control={control} errors={errors} index={0} type={type} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <ContactField control={control} errors={errors} index={index} type={type} />
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
                    onClick={handleAddContact}
                  >
                    {t(`common.component.contacts_field.action.add_${type}`)}
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
