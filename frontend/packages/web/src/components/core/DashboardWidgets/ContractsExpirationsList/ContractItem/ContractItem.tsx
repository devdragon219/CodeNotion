import { Box, Typography } from '@mui/material';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ContractItemProps } from './ContractItem.types';

export const ContractItem = ({ contract, isActive, useMockData }: ContractItemProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (contractId: number) => () => {
      if (useMockData) return;
      navigate(`/app/asset-management/contracts/${isActive ? 'active' : 'passive'}/${contractId}`);
    },
    [isActive, navigate, useMockData],
  );

  return (
    <Box
      sx={(theme) => ({
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
        p: '12px',
        color: theme.palette.grey[700],
        ...(contract.daysToExpiration >= 0 && {
          border: `1px solid ${isActive ? theme.palette.danger[500] : theme.palette.blue[500]}`,
          color: isActive ? theme.palette.danger[500] : theme.palette.blue[500],
        }),
      })}
      onClick={handleClick(contract.contractId)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="bodyMd">{`${contract.internalCode} - ${contract.contractType}`}</Typography>
        <Typography variant="bodyMd">
          {`${contract.subject} - `}
          <Typography variant="bodyMd" fontWeight={400} noWrap>
            {parseNumberToCurrency(contract.amount, language)}
          </Typography>
        </Typography>
      </Box>
      <Typography
        variant="bodyMd"
        sx={(theme) => ({
          color: isActive ? theme.palette.danger[500] : theme.palette.blue[500],
          minWidth: '60px',
          textAlign: 'right',
        })}
      >
        {contract.daysToExpiration > 0 ? '+' : ''}
        {contract.daysToExpiration} {t('core.text.days')}
      </Typography>
    </Box>
  );
};
