import {
  DoneOutline,
  HandymanOutlined,
  PauseCircleOutline,
  PlayCircleOutline,
  StopCircleOutlined,
} from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TicketsStatusCountStatusItemProps } from './StatusItem.types';

export const TicketsStatusCountStatusItem = ({ status, value }: TicketsStatusCountStatusItemProps) => {
  const { t } = useTranslation();

  const icon = useMemo(() => {
    switch (status) {
      case TicketMasterStatus.Assigned:
        return <PauseCircleOutline />;
      case TicketMasterStatus.Completed:
        return <DoneOutline />;
      case TicketMasterStatus.InProgress:
        return <PlayCircleOutline />;
      case TicketMasterStatus.New:
        return <HandymanOutlined />;
      case TicketMasterStatus.Resolved:
        return <StopCircleOutlined />;
    }
  }, [status]);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={(theme) => ({
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.blue[100]}`,
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        color: theme.palette.grey[700],
        justifyContent: 'space-between',
        p: 2,
      })}
    >
      <Stack direction="column" spacing={0.5}>
        <Typography variant="h2">{value}</Typography>
        <Typography variant="bodyMd">{t(`common.enum.ticket_master_status.${status}`)}</Typography>
      </Stack>
      {icon}
    </Stack>
  );
};
