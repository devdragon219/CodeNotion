import { ChevronRight } from '@mui/icons-material';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { DashboardWidgetContainer } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetLastContractExpiriesQuery } from '../../../../gql/RealGimm.Web.Contract.operation';
import { ContractItem } from './ContractItem/ContractItem';
import { ContractsExpirationsListWidgetProps } from './ContractsExpirationsList.types';

const mockData = [
  {
    contractId: 1,
    internalCode: '1234',
    contractType: 'Locazione',
    subject: 'Mario Rossi',
    daysToExpiration: -2,
    amount: 9600,
  },
  {
    contractId: 2,
    internalCode: '1234',
    contractType: 'Locazione',
    subject: 'Mario Rossi',
    daysToExpiration: -2,
    amount: 9600,
  },
  {
    contractId: 3,
    internalCode: '1234',
    contractType: 'Locazione',
    subject: 'Mario Rossi',
    daysToExpiration: 20,
    amount: 9600,
  },
  {
    contractId: 4,
    internalCode: '1234',
    contractType: 'Locazione',
    subject: 'Mario Rossi',
    daysToExpiration: 22,
    amount: 9600,
  },
  {
    contractId: 5,
    internalCode: '1234',
    contractType: 'Locazione',
    subject: 'Mario Rossi',
    daysToExpiration: 32,
    amount: 9600,
  },
];

export const ContractsExpirationsListWidget = ({
  isActive,
  useBoxShadow,
  useMockData,
}: ContractsExpirationsListWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryState] = useGetLastContractExpiriesQuery({ pause: useMockData, variables: { isActive } });

  const data = useMemo(
    () =>
      useMockData
        ? mockData
        : (queryState.data?.contract.lastContractExpiries.map((contract) => ({
            contractId: contract.contractId,
            internalCode: contract.internalCode,
            contractType: contract.typeDescription ?? '',
            subject: contract.managementSubjectName ?? '',
            daysToExpiration: contract.daysToExpiration,
            amount: contract.billingBaseFee ?? 0,
          })) ?? []),
    [queryState.data?.contract.lastContractExpiries, useMockData],
  );

  const handleViewAll = useCallback(() => {
    if (useMockData) return;
    navigate(`/app/asset-management/contracts/${isActive ? 'active' : 'passive'}`);
  }, [isActive, navigate, useMockData]);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={useBoxShadow}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', px: 2 }}>
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t(`component.dashboard_widget.contracts_expirations_list.title.${isActive ? 'active' : 'passive'}`)}
        </Typography>
        <Stack divider={<Divider flexItem />} spacing={1}>
          {data.map((contract) => (
            <ContractItem key={contract.contractId} contract={contract} isActive={isActive} useMockData={useMockData} />
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
        <Typography
          variant="link"
          sx={{ textAlign: 'center', alignItems: 'flex-end', display: 'flex' }}
          onClick={handleViewAll}
        >
          {t('component.dashboard_widget.contracts_expirations_list.view_all')}
          <ChevronRight
            sx={{
              width: '16px',
            }}
          />
        </Typography>
      </Box>
    </DashboardWidgetContainer>
  );
};
