import { Box, styled } from '@mui/material';

import loader from '../../assets/images/loader.png';

const Image = styled('img')({
  animation: 'spin 750ms linear infinite',
  height: '100px',
  width: '100px',
});

export const Loader = () => (
  <Box
    sx={(theme) => ({
      backgroundColor: theme.palette.grey[200],
      opacity: 0.5,
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 0,
      left: 0,
      zIndex: 1301,
      width: '100%',
      height: '100%',
    })}
  >
    <Image src={loader} />
  </Box>
);
