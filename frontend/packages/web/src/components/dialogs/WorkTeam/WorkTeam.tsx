import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Control, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useWorkTeam } from '../../../hooks/useWorkTeam';
import { WorkTeamFormInput } from '../../../interfaces/FormInputs/WorkTeam';
import { WorkersFieldValues } from '../../../interfaces/FormInputs/Worker';
import { getEmptyWorkTeamFormInput } from '../../../utils/workTeam/initialValues';
import { getWorkTeamSchema } from '../../../utils/workTeam/schemas/workTeam';
import { WorkTeamGeneralData } from '../../domains/WorkTeam/GeneralData/GeneralData';
import { Workers } from '../../domains/Worker/Workers';
import { WorkTeamCreateDialogProps } from './WorkTeam.types';

export const WorkTeamCreateDialog = ({ onClose, onSave }: WorkTeamCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const { getInternalCode, checkCanUseInternalCode } = useWorkTeam();
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<WorkTeamFormInput>({
    defaultValues: getEmptyWorkTeamFormInput(),
    resolver: yupResolver(getWorkTeamSchema(canUseInternalCode, language, t)),
  });
  const internalCode = useWatch({ control, name: 'internalCode' });
  const workTeamId = useWatch({ control, name: 'workTeamId' });
  const debouncedInternalCode = useDebounce(internalCode);
  const debouncedWorkTeamId = useDebounce(workTeamId);

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, debouncedWorkTeamId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedWorkTeamId]);

  useEffect(() => {
    getInternalCode((internalCode) => {
      setValue('internalCode', internalCode);
    });
    // eslint-disable-next-line
  }, []);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    (formValues: WorkTeamFormInput) => {
      onSave(formValues);
    },
    [onSave],
  );

  const handleWorkingClose = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog open title="work_team.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ pr: 1 }}>
            <Grid2 size={12}>
              <WorkTeamGeneralData control={control} errors={errors} setValue={setValue} />
            </Grid2>
            <Grid2 size={12}>
              <Workers
                control={control as unknown as Control<WorkersFieldValues>}
                errors={errors}
                mode={FormMode.Create}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
