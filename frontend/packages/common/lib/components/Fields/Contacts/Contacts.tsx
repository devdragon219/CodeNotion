import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormMode } from '../../../enums/FormMode';
import { useFieldArray } from '../../../hooks/useFieldArray';
import { ContactFormInput } from '../../../interfaces/FormInputs/Contacts';
import { getEmptyContactFormInput } from '../../../utils/contactsField/initialValues';
import { EmptyText } from '../../EmptyText/EmptyText';
import { SectionTitle } from '../../SectionTitle/SectionTitle';
import { SecondaryTable } from '../../Tables/Secondary/Secondary';
import { RepeatableField } from '../Repeatable/Repeatable';
import { TextField } from '../Text/Text';
import { ContactsFieldProps } from './Contacts.types';
import { ContactDialog } from './Dialog/Dialog';
import { ContactDialogInput } from './Dialog/Dialog.types';
import { ContactField } from './Field/Field';

const FIXED_CONTACT_FIELDS = 2;
export const ContactsField = ({ control, errors, mode, readonly }: ContactsFieldProps) => {
  const { t } = useTranslation();
  const {
    fields: emails,
    append: appendEmail,
    remove: removeEmail,
    update: updateEmail,
  } = useFieldArray({ control, name: 'contacts.emails' });
  const {
    fields: phones,
    append: appendPhone,
    remove: removePhone,
    update: updatePhone,
  } = useFieldArray({ control, name: 'contacts.phones' });

  const [emailDialogProps, setEmailDialogProps] = useState<{
    input?: ContactDialogInput;
    open: boolean;
  }>({ open: false });
  const [phoneDialogProps, setPhoneDialogProps] = useState<{
    input?: ContactDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseEmailDialog = useCallback(() => {
    setEmailDialogProps({ open: false });
  }, []);
  const handleEditEmail = useCallback(
    (index: number) => {
      setEmailDialogProps({
        input: { contact: emails[index], index },
        open: true,
      });
    },
    [emails],
  );
  const handleSaveEmail = useCallback(
    (value: ContactFormInput[] | ContactDialogInput) => {
      if (Array.isArray(value)) {
        appendEmail(value);
      } else {
        updateEmail(value.index, value.contact);
      }
      handleCloseEmailDialog();
    },
    [appendEmail, updateEmail, handleCloseEmailDialog],
  );

  const handleClosePhoneDialog = useCallback(() => {
    setPhoneDialogProps({ open: false });
  }, []);
  const handleEditPhone = useCallback(
    (index: number) => {
      setPhoneDialogProps({
        input: { contact: phones[index], index },
        open: true,
      });
    },
    [phones],
  );
  const handleSavePhone = useCallback(
    (value: ContactFormInput[] | ContactDialogInput) => {
      if (Array.isArray(value)) {
        appendPhone(value);
      } else {
        updatePhone(value.index, value.contact);
      }
      handleClosePhoneDialog();
    },
    [appendPhone, updatePhone, handleClosePhoneDialog],
  );

  const handleAddPhone = useCallback(() => {
    if (mode === FormMode.Create) {
      appendPhone(getEmptyContactFormInput());
    } else {
      setPhoneDialogProps({ open: true });
    }
  }, [mode, appendPhone]);

  const handleAddEmail = useCallback(() => {
    if (mode === FormMode.Create) {
      appendEmail(getEmptyContactFormInput());
    } else {
      setEmailDialogProps({ open: true });
    }
  }, [mode, appendEmail]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="common.component.contacts_field.section_title.contacts" />
      {mode === FormMode.Create ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="contacts.phones.0.contactInfo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('common.component.contacts_field.field.mobile_phone')}
                  error={!!errors.contacts?.phones?.[0]?.contactInfo}
                  helperText={errors.contacts?.phones?.[0]?.contactInfo?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="contacts.phones.1.contactInfo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('common.component.contacts_field.field.landline_phone')}
                  error={!!errors.contacts?.phones?.[1]?.contactInfo}
                  helperText={errors.contacts?.phones?.[1]?.contactInfo?.message}
                />
              )}
            />
          </Grid2>
          {phones.slice(FIXED_CONTACT_FIELDS).length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {phones.slice(FIXED_CONTACT_FIELDS).map(({ key }, index) => (
                  <RepeatableField key={key} index={index + FIXED_CONTACT_FIELDS} onDelete={removePhone}>
                    <ContactField control={control} errors={errors} index={index + FIXED_CONTACT_FIELDS} type="phone" />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
          )}
        </>
      ) : phones.length !== 0 ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'common.component.contacts_field.field.phone_type',
              'common.component.contacts_field.field.phone_number',
            ]}
            rows={phones.map((entry) => [
              entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
              entry.contactInfo,
            ])}
            onRowDelete={readonly ? undefined : removePhone}
            onRowEdit={readonly ? undefined : handleEditPhone}
          />
        </Grid2>
      ) : emails.length === 0 ? (
        <EmptyText value="common.component.contacts_field.text.no_contacts" />
      ) : (
        <></>
      )}
      {phoneDialogProps.open && (
        <ContactDialog
          existingContacts={{
            emails: [],
            phones: phones.filter((_, index) => index !== phoneDialogProps.input?.index),
          }}
          input={phoneDialogProps.input}
          type="phone"
          onClose={handleClosePhoneDialog}
          onSave={handleSavePhone}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddPhone}>
            {t('common.component.contacts_field.action.add_phone')}
          </Button>
        </Grid2>
      )}
      {mode === FormMode.Create ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="contacts.emails.0.contactInfo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('common.component.contacts_field.field.email')}
                  error={!!errors.contacts?.emails?.[0]?.contactInfo}
                  helperText={errors.contacts?.emails?.[0]?.contactInfo?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="contacts.emails.1.contactInfo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('common.component.contacts_field.field.registered_email')}
                  error={!!errors.contacts?.emails?.[1]?.contactInfo}
                  helperText={errors.contacts?.emails?.[1]?.contactInfo?.message}
                />
              )}
            />
          </Grid2>
          {emails.slice(FIXED_CONTACT_FIELDS).length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {emails.slice(FIXED_CONTACT_FIELDS).map(({ key }, index) => (
                  <RepeatableField key={key} index={index + FIXED_CONTACT_FIELDS} onDelete={removeEmail}>
                    <ContactField control={control} errors={errors} index={index + FIXED_CONTACT_FIELDS} type="email" />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
          )}
        </>
      ) : emails.length !== 0 ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'common.component.contacts_field.field.email_type',
              'common.component.contacts_field.field.email',
            ]}
            rows={emails.map((entry) => [
              entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
              entry.contactInfo,
            ])}
            onRowDelete={readonly ? undefined : removeEmail}
            onRowEdit={readonly ? undefined : handleEditEmail}
          />
        </Grid2>
      ) : (
        <></>
      )}
      {emailDialogProps.open && (
        <ContactDialog
          existingContacts={{
            emails: emails.filter((_, index) => index !== emailDialogProps.input?.index),
            phones: [],
          }}
          input={emailDialogProps.input}
          type="email"
          onClose={handleCloseEmailDialog}
          onSave={handleSaveEmail}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleAddEmail}
            sx={(theme) => ({ marginTop: emails.length === 0 ? theme.spacing(2) : 0 })}
          >
            {t('common.component.contacts_field.action.add_email')}
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
