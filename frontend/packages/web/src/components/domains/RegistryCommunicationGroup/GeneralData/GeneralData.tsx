import { WarningAmber } from '@mui/icons-material';
import { Avatar, Box, Grid2, Stack, Typography } from '@mui/material';
import { CurrencyField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { CommunicationType } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RegistryCommunicationGroupAnomaliesDialog } from '../../../dialogs/RegistryCommunicationGroupAnomalies/RegistryCommunicationGroupAnomalies';
import { RegistryCommunicationGroupGeneralDataProps } from './GeneralData.types';

export const RegistryCommunicationGroupGeneralData = ({
  isConfirmed,
  registryCommunicationGroup,
}: RegistryCommunicationGroupGeneralDataProps) => {
  const { t } = useTranslation();
  const [isRegistryCommunicationGroupAnomaliesDialogOpen, setRegistryCommunicationGroupAnomaliesDialogOpen] =
    useState(false);

  const handleOpenRegistryCommunicationGroupAnomaliesDialog = useCallback(() => {
    setRegistryCommunicationGroupAnomaliesDialogOpen(true);
  }, []);
  const handleCloseRegistryCommunicationGroupAnomaliesDialog = useCallback(() => {
    setRegistryCommunicationGroupAnomaliesDialogOpen(false);
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {isRegistryCommunicationGroupAnomaliesDialogOpen && (
        <RegistryCommunicationGroupAnomaliesDialog
          groupId={registryCommunicationGroup.id}
          onClose={handleCloseRegistryCommunicationGroupAnomaliesDialog}
        />
      )}
      <SectionTitle value="registry_communication.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TextField
          label={t('registry_communication.field.management_subject')}
          value={registryCommunicationGroup.managementSubject.name}
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TextField
          label={t('registry_communication.field.contract_type')}
          value={t(
            `registry_communication.text.${registryCommunicationGroup.id.isActiveContract ? 'active' : 'passive'}_contract`,
          )}
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <SelectField
          label={t('registry_communication.field.communication_type')}
          options={Object.values(CommunicationType)}
          getOptionLabel={(option) => t(`common.enum.communication_type.${option}`)}
          value={registryCommunicationGroup.id.communicationType}
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DateField
          label={t('registry_communication.field.end_date')}
          value={parseStringToDate(registryCommunicationGroup.id.endDate)}
          readonly
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CurrencyField
          label={t('registry_communication.field.debt_amount')}
          value={registryCommunicationGroup.debtAmount}
          readonly
        />
      </Grid2>
      {isConfirmed && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <DateField
              label={t('registry_communication.field.payment_date')}
              value={parseStringToDate(registryCommunicationGroup.id.date)}
              readonly
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              label={t('registry_communication.field.legal_representative')}
              value={registryCommunicationGroup.requestingSubjectLegalRepresentative?.name}
              readonly
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              label={t('registry_communication.field.bank_account')}
              value={registryCommunicationGroup.debtBankAccount?.referenceCode}
              readonly
            />
          </Grid2>
        </>
      )}
      <SectionTitle value="registry_communication.section_title.anomalies" />
      <Grid2 size={12}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.grey[50],
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            display: 'inline-flex',
            p: 1.5,
          })}
        >
          <Stack direction="row" sx={{ gap: 2 }}>
            <Avatar
              variant="rounded"
              sx={(theme) => ({
                backgroundColor: theme.palette.blue[500],
                cursor: 'pointer',
              })}
              onClick={handleOpenRegistryCommunicationGroupAnomaliesDialog}
            >
              <WarningAmber
                sx={(theme) => ({
                  color: theme.palette.background.default,
                  width: 24,
                  height: 24,
                })}
              />
            </Avatar>
            <Stack>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                {t('registry_communication.field.anomalies_counter')}
              </Typography>
              <Typography variant="h4" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                {registryCommunicationGroup.anomaliesCount}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid2>
    </Grid2>
  );
};
