import { DownloadForOfflineTwoTone } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useId } from 'react';
import { useTranslation } from 'react-i18next';
import QR from 'react-qr-code';

import { QRCodeProps } from './QRCode.types';

export const QRCode = ({ value, size = 100, title, isDownloadable }: QRCodeProps) => {
  const { t } = useTranslation();
  const qrCodeId = `QRCode_${useId()}`;

  const handleDownload = useCallback(() => {
    const svg = document.getElementById(qrCodeId);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'QRCode';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }, [qrCodeId]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {title && (
        <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700], display: 'block', mb: 4 })}>
          {t(title)}
        </Typography>
      )}
      <QR id={qrCodeId} value={value} size={size} />
      {isDownloadable && (
        <Button
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<DownloadForOfflineTwoTone />}
          onClick={handleDownload}
          sx={{ marginTop: 4 }}
        >
          {t('common.button.download')}
        </Button>
      )}
    </Box>
  );
};
