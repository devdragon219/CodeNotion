import { HomeTwoTone } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Grid2, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import imageBackground from '../../assets/images/maintenance/errorBg.svg';
import imageDarkBackground from '../../assets/images/maintenance/errorBgDark.svg';
import imageBlue from '../../assets/images/maintenance/errorBlue.svg';
import imagePurple from '../../assets/images/maintenance/errorPurple.svg';
import imageText from '../../assets/images/maintenance/errorText.svg';
import { useTheme } from '../../contexts/theme/hook';

const CardMediaBlock = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '3s bounce ease-in-out infinite',
});

const CardMediaBlue = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '15s wings ease-in-out infinite',
});

const CardMediaPurple = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '12s wings ease-in-out infinite',
});

// ==============================|| ERROR PAGE ||============================== //

export const Error = () => {
  const { mode } = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CardContent>
        <Grid2 container sx={{ justifyContent: 'center' }} spacing={3}>
          <Grid2 size={12}>
            <Box
              sx={{
                maxWidth: 720,
                margin: '0 auto',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                image={mode === 'dark' ? imageDarkBackground : imageBackground}
                title="Slider5 image"
              />
              <CardMediaBlock src={imageText} title="Slider 1 image" />
              <CardMediaBlue src={imageBlue} title="Slider 2 image" />
              <CardMediaPurple src={imagePurple} title="Slider 3 image" />
            </Box>
          </Grid2>
          <Grid2 size={12}>
            <Box
              sx={{
                maxWidth: 350,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <Grid2 container spacing={3}>
                <Grid2 size={12}>
                  <Typography variant="h1" component="div">
                    {t('common.component.error.title')}
                  </Typography>
                </Grid2>
                <Grid2 size={12}>
                  <Typography variant="body2">{t('common.component.error.description')}</Typography>
                </Grid2>
                <Grid2 size={12}>
                  <Button variant="contained" size="large" component={Link} to="/" reloadDocument>
                    <HomeTwoTone sx={{ fontSize: '1.3rem', mr: 0.75 }} /> {t('common.component.error.button')}
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
