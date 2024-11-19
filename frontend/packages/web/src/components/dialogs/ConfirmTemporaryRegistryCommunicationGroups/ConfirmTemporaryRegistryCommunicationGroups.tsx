import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2, Stack } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form, Loader } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OperationResult, useClient } from 'urql';

import {
  GetRegistryCommunicationManagementSubjectsDocument,
  GetRegistryCommunicationManagementSubjectsQuery,
} from '../../../gql/RealGimm.Web.RegistryCommunication.operation';
import { RegistryCommunicationManagementSubjectFragment } from '../../../gql/RealGimm.Web.Subject.fragment';
import { ConfirmTemporaryRegistryCommunicationGroupFieldValues } from '../../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';
import { parseRegistryCommunicationManagementSubjectsToConfirmTemporaryRegistryCommunicationGroupFieldValues } from '../../../utils/registryCommunication/parseRegistryCommunicationManagementSubjects';
import { getConfirmTemporaryRegistryCommunicationGroupsSchema } from '../../../utils/registryCommunication/schemas/confirmTemporaryRegistryCommunicationGroups';
import { InputFieldAccordion } from './Accordion/Accordion';
import { ConfirmTemporaryRegistryCommunicationGroupsDialogProps } from './ConfirmTemporaryRegistryCommunicationGroups.types';

export const ConfirmTemporaryRegistryCommunicationGroupsDialog = ({
  registryCommunicationGroups,
  onClose,
  onSave,
}: ConfirmTemporaryRegistryCommunicationGroupsDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const client = useClient();
  const [loading, setLoading] = useState(false);
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);

  const fetchManagementSubjects = useCallback(async () => {
    if (registryCommunicationGroups) {
      return parseRegistryCommunicationManagementSubjectsToConfirmTemporaryRegistryCommunicationGroupFieldValues(
        registryCommunicationGroups.reduce<RegistryCommunicationManagementSubjectFragment[]>(
          (acc, { managementSubject }) => {
            if (acc.some((it) => it.id === managementSubject.id)) return acc;
            return [...acc, managementSubject];
          },
          [],
        ),
      );
    }

    setLoading(true);
    const result: OperationResult<GetRegistryCommunicationManagementSubjectsQuery> = await client.query(
      GetRegistryCommunicationManagementSubjectsDocument,
      {},
    );
    setLoading(false);
    if (!result.data?.registryCommunication.listManagementSubjects) return Promise.reject();
    return parseRegistryCommunicationManagementSubjectsToConfirmTemporaryRegistryCommunicationGroupFieldValues(
      result.data.registryCommunication.listManagementSubjects,
    );
  }, [client, registryCommunicationGroups]);

  const {
    control,
    formState: { isValid: canSave, errors },
    getValues,
    handleSubmit,
  } = useForm<ConfirmTemporaryRegistryCommunicationGroupFieldValues>({
    defaultValues: fetchManagementSubjects,
    resolver: yupResolver(getConfirmTemporaryRegistryCommunicationGroupsSchema(language, t)),
  });
  const { fields } = useFieldArray({ control, name: 'inputs' });

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    ({ inputs }: ConfirmTemporaryRegistryCommunicationGroupFieldValues) => {
      onSave(inputs, registryCommunicationGroups);
    },
    [onSave, registryCommunicationGroups],
  );

  const handleWorkingClose = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {loading && <Loader />}
      {isCloseConfirmationDialogOpen ? (
        <CloseDialog
          canSave={canSave}
          onCancel={closeCloseConfirmationDialog}
          onSave={handleWorkingClose}
          onClose={handleDestructiveClose}
        />
      ) : (
        <Dialog
          open
          title="registry_communication.dialog.confirm_temporary_registry_communications.title"
          onClose={openCloseConfirmationDialog}
        >
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <DialogContent
              action={
                <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
                  {t('registry_communication.dialog.confirm_temporary_registry_communications.action')}
                </Button>
              }
            >
              <Stack spacing={{ xs: 2, sm: 3 }}>
                {fields.map(({ key }, index) => (
                  <Grid2 size={12} key={key}>
                    <InputFieldAccordion control={control} errors={errors} index={index} />
                  </Grid2>
                ))}
              </Stack>
            </DialogContent>
          </Form>
        </Dialog>
      )}
    </>
  );
};
