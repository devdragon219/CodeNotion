import { Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ConfirmationDialog, DateField } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitUpdateConfirmationDialogProps } from './CadastralUnitUpdate.types';

export const CadastralUnitUpdateConfirmationDialog = ({
  control,
  errors,
  isVariation,
  open,
  onChange,
  onClose,
  onSave,
}: CadastralUnitUpdateConfirmationDialogProps) => {
  const { t } = useTranslation();

  const handleChange = useCallback(() => {
    onChange((isVariation) => !isVariation);
  }, [onChange]);

  return (
    <ConfirmationDialog
      open={open}
      onClose={onClose}
      type="alert"
      icon={Warning}
      title={`cadastral_unit.dialog.update.title.${isVariation ? 'saving_as_variation' : 'save_as_variation'}`}
      description={`cadastral_unit.dialog.update.description.${
        isVariation ? 'saving_as_variation' : 'save_as_variation'
      }`}
      actions={
        isVariation ? (
          <>
            <Button color="secondary" onClick={handleChange}>
              {t('common.button.back')}
            </Button>
            <Button color="primary" variant="outlined" onClick={onSave}>
              {t('cadastral_unit.dialog.update.save')}
            </Button>
          </>
        ) : (
          <>
            <Button color="secondary" onClick={onClose}>
              {t('common.button.cancel')}
            </Button>
            <Button color="primary" onClick={onSave}>
              {t('common.button.save')}
            </Button>
            <Button color="primary" variant="outlined" onClick={handleChange}>
              {t('cadastral_unit.dialog.update.save')}
            </Button>
          </>
        )
      }
    >
      {isVariation && (
        <Controller
          name="changed"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cadastral_unit.field.since')}
              error={!!errors.changed}
              helperText={errors.changed?.message}
              required
            />
          )}
        />
      )}
    </ConfirmationDialog>
  );
};
