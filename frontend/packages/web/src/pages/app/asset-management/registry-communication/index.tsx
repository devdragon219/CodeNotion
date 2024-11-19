import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2 } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { CommunicationType, RegistryCommunicationGroupIdFilterInput } from '@realgimm5/frontend-common/gql/types';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { downloadFile } from '@realgimm5/frontend-common/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { ConfirmTemporaryRegistryCommunicationGroupsDialog } from '../../../../components/dialogs/ConfirmTemporaryRegistryCommunicationGroups/ConfirmTemporaryRegistryCommunicationGroups';
import { RegistryCommunicationGroupGeneralData } from '../../../../components/domains/RegistryCommunicationGroup/GeneralData/GeneralData';
import { RegistryCommunicationGroupItems } from '../../../../components/domains/RegistryCommunicationGroup/Items/Items';
import { RegistryCommunicationGroupActions } from '../../../../components/domains/RegistryCommunicationGroupActions/RegistryCommunicationGroupActions';
import { RawFeature } from '../../../../enums/RawFeature';
import { useCancelConfirmedRegistryCommunicationGroupMutation } from '../../../../gql/RealGimm.Web.ConfirmedRegistryCommunication.operation';
import {
  ExportConfirmedRegistryCommunicationGroupDocument,
  ExportConfirmedRegistryCommunicationGroupQuery,
  ExportRegistryCommunicationGroupsDocument,
  GetRegistryCommunicationGroupDocument,
  GetRegistryCommunicationGroupQuery,
} from '../../../../gql/RealGimm.Web.RegistryCommunication.operation';
import { RegistryCommunicationGroupFragment } from '../../../../gql/RealGimm.Web.RegistryCommunicationGroup.fragment';
import { useConfirmTemporaryRegistryCommunicationGroupMutation } from '../../../../gql/RealGimm.Web.TemporaryRegistryCommunication.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { ConfirmTemporaryRegistryCommunicationGroupFormInput } from '../../../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';
import { parseConfirmTemporaryRegistryCommunicationGroupFormInputToConfirmTemporaryRegistryCommunicationGroupInput } from '../../../../utils/registryCommunication/parseConfirmTemporaryRegistryCommunicationGroupFormInput';
import { parseRegistryCommunicationGroupIdFragmentToConfirmedRegistryCommunicationGroupIdInput } from '../../../../utils/registryCommunication/parseRegistryCommunicationGroupIdFragment';

export default function RegistryCommunicationGroup() {
  const { canRead, canUpdate } = useFeature(RawFeature.PROP_REGISTRY_COMMUNICATION);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const {
    type,
    managementSubjectId,
    isActiveContract,
    communicationType,
    endDate,
    date,
    requestingSubjectLegalRepresentativeId,
    debtBankAccountId,
  } = useParams();
  const id = useMemo(
    () => ({
      managementSubjectId: Number(managementSubjectId),
      isActiveContract: isActiveContract === 'true' ? true : false,
      communicationType: communicationType as CommunicationType,
      endDate,
      date,
      requestingSubjectLegalRepresentativeId: requestingSubjectLegalRepresentativeId
        ? Number(requestingSubjectLegalRepresentativeId)
        : undefined,
      debtBankAccountId: debtBankAccountId ? Number(debtBankAccountId) : undefined,
    }),
    [
      communicationType,
      date,
      debtBankAccountId,
      endDate,
      isActiveContract,
      managementSubjectId,
      requestingSubjectLegalRepresentativeId,
    ],
  );
  const { handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const client = useClient();
  const isConfirmed = useMemo(() => type === 'confirmed', [type]);
  const goBack = useNavigateBack(`/app/asset-management/registry-communications/${type}`);
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [registryCommunicationGroup, setRegistryCommunicationGroup] = useState<RegistryCommunicationGroupFragment>();
  const [, cancelConfirmedRegistryCommunicationGroupMutation] = useCancelConfirmedRegistryCommunicationGroupMutation();
  const [, confirmTemporaryRegistryCommunicationGroupMutation] =
    useConfirmTemporaryRegistryCommunicationGroupMutation();
  const [
    isConfirmTemporaryRegistryCommunicationGroupDialogOpen,
    setConfirmTemporaryRegistryCommunicationGroupDialogOpen,
  ] = useState(false);

  const fetchRegistryCommunicationGroup = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetRegistryCommunicationGroupQuery> = await client.query(
      GetRegistryCommunicationGroupDocument,
      {
        id,
      },
    );
    setLoading(false);
    if (!result.data?.registryCommunication.group) {
      goBack();
      return Promise.reject();
    }
    return result.data.registryCommunication.group;
  }, [client, id, goBack]);

  const { reset, watch } = useForm<RegistryCommunicationGroupFragment>({
    defaultValues: fetchRegistryCommunicationGroup,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setRegistryCommunicationGroup(formValues as RegistryCommunicationGroupFragment);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const handleOpenConfirmTemporaryRegistryCommunicationGroupsDialog = useCallback(() => {
    setConfirmTemporaryRegistryCommunicationGroupDialogOpen(true);
  }, []);

  const handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog = useCallback(() => {
    setConfirmTemporaryRegistryCommunicationGroupDialogOpen(false);
  }, []);
  const handleSaveConfirmTemporaryRegistryCommunicationGroups = useCallback(
    async (
      inputs: ConfirmTemporaryRegistryCommunicationGroupFormInput[],
      rows?: RegistryCommunicationGroupFragment[],
    ) => {
      if (!rows || rows.length === 0 || inputs.length === 0) return;

      const groupId = rows[0].id;
      const input =
        parseConfirmTemporaryRegistryCommunicationGroupFormInputToConfirmTemporaryRegistryCommunicationGroupInput(
          inputs,
        )[0];

      setLoading(true);
      const result = await confirmTemporaryRegistryCommunicationGroupMutation({
        groupId,
        date: input.date,
        debtBankAccountId: input.debtBankAccountId,
        requestingSubjectLegalRepresentativeId: input.requestingSubjectLegalRepresentativeId,
      });
      setLoading(false);
      if (result.data?.temporaryRegistryCommunication.confirm.isSuccess) {
        showSnackbar(t('registry_communication.feedback.confirm.single'), {
          severity: 'success',
        });
        handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog();
        goBack();
      } else {
        showError(result.data?.temporaryRegistryCommunication.confirm.validationErrors);
      }
    },
    [
      confirmTemporaryRegistryCommunicationGroupMutation,
      goBack,
      handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog,
      showError,
      showSnackbar,
      t,
    ],
  );

  const handleCancelConfirmedRegistryCommunicationGroups = useCallback(async () => {
    setLoading(true);
    const result = await cancelConfirmedRegistryCommunicationGroupMutation({
      groupId: parseRegistryCommunicationGroupIdFragmentToConfirmedRegistryCommunicationGroupIdInput(id),
    });
    setLoading(false);
    if (result.data?.confirmedRegistryCommunication.cancelConfirmation.isSuccess) {
      showSnackbar(t('registry_communication.feedback.cancel.single'), { severity: 'success' });
      goBack();
    } else {
      showError(result.data?.confirmedRegistryCommunication.cancelConfirmation.validationErrors);
    }
  }, [cancelConfirmedRegistryCommunicationGroupMutation, goBack, id, showError, showSnackbar, t]);

  const handleExportConfirmedRegistryCommunicationGroup = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<ExportConfirmedRegistryCommunicationGroupQuery> = await client.query(
      ExportConfirmedRegistryCommunicationGroupDocument,
      {
        groupId: parseRegistryCommunicationGroupIdFragmentToConfirmedRegistryCommunicationGroupIdInput(id),
      },
    );
    setLoading(false);
    if (result.data?.registryCommunication.exportGroupXmlRli.resourceUrl) {
      downloadFile(result.data.registryCommunication.exportGroupXmlRli.resourceUrl);
    }
  }, [client, id]);

  return (
    <Form noValidate>
      {loading && <Loader />}
      {registryCommunicationGroup && isConfirmTemporaryRegistryCommunicationGroupDialogOpen && (
        <ConfirmTemporaryRegistryCommunicationGroupsDialog
          registryCommunicationGroups={[registryCommunicationGroup]}
          onClose={handleCloseConfirmTemporaryRegistryCommunicationGroupsDialog}
          onSave={handleSaveConfirmTemporaryRegistryCommunicationGroups}
        />
      )}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={
            registryCommunicationGroup
              ? `${registryCommunicationGroup.managementSubject.name} - ${t(`common.enum.communication_type.${registryCommunicationGroup.id.communicationType}`)}`
              : undefined
          }
          titleTypographyProps={{ variant: 'h2' }}
          subheader={
            registryCommunicationGroup
              ? t(
                  `registry_communication.text.${registryCommunicationGroup.id.isActiveContract ? 'active' : 'passive'}_contract`,
                )
              : undefined
          }
          subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.blue[500] }), variant: 'bodyMd' }}
          action={
            <CardActions
              leftActions={
                <RegistryCommunicationGroupActions
                  isConfirmed={isConfirmed}
                  onCancel={handleCancelConfirmedRegistryCommunicationGroups}
                  onConfirm={handleOpenConfirmTemporaryRegistryCommunicationGroupsDialog}
                  onExport={handleExportConfirmedRegistryCommunicationGroup}
                />
              }
              readonly={readonly}
              onCancel={handleCancel}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={
                canRead && registryCommunicationGroup
                  ? handleExport(ExportRegistryCommunicationGroupsDocument, {
                      isConfirmed,
                      where: {
                        id: Object.keys(registryCommunicationGroup.id)
                          .filter(
                            (it) =>
                              it !== '__typename' &&
                              registryCommunicationGroup.id[it as keyof typeof registryCommunicationGroup.id] !==
                                null &&
                              registryCommunicationGroup.id[it as keyof typeof registryCommunicationGroup.id] !==
                                undefined,
                          )
                          .reduce<RegistryCommunicationGroupIdFilterInput>(
                            (acc, key) => ({
                              ...acc,
                              [key]: {
                                eq: registryCommunicationGroup.id[key as keyof typeof registryCommunicationGroup.id],
                              },
                            }),
                            {},
                          ),
                      },
                    })
                  : undefined
              }
            />
          }
        />
        <CardContent>
          {registryCommunicationGroup && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <Grid2 size={12}>
                <RegistryCommunicationGroupGeneralData
                  isConfirmed={isConfirmed}
                  registryCommunicationGroup={registryCommunicationGroup}
                />
              </Grid2>
              <Grid2 size={12}>
                <TableProvider key="registry-communications">
                  <RegistryCommunicationGroupItems groupId={id} isConfirmed={isConfirmed} readonly={readonly} />
                </TableProvider>
              </Grid2>
            </Grid2>
          )}
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} />
    </Form>
  );
}
