import { Divider, Stack } from '@mui/material';

import { DEFAULT_BORDER_RADIUS } from '../../configs/defaults';
import { ChatProps } from './Chat.types';
import { Input } from './Input/Input';
import { Message } from './Message/Message';

export const Chat = ({ disabled, messages, onSend }: ChatProps) => (
  <Stack
    divider={<Divider flexItem sx={(theme) => ({ borderColor: theme.palette.blue[50] })} />}
    spacing={{ xs: 2, sm: 3 }}
    sx={(theme) => ({
      backgroundColor: theme.palette.grey[50],
      borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
      px: 2,
      py: 1.5,
    })}
  >
    {messages.length !== 0 && (
      <Stack spacing={{ xs: 2, sm: 3 }}>
        {messages.map((message) => (
          <Message key={message.messageId} message={message} />
        ))}
      </Stack>
    )}
    <Input disabled={disabled} onSend={onSend} />
  </Stack>
);
