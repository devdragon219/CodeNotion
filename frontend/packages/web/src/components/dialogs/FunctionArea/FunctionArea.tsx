import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form, RepeatableField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FunctionAreaFormInput, FunctionAreasFieldValues } from '../../../interfaces/FormInputs/FunctionArea';
import { getEmptyFunctionAreaFormInput } from '../../../utils/functionArea/initialValues';
import { getFunctionAreasSchema } from '../../../utils/functionArea/schemas/functionAreas';
import { FunctionAreaField } from './Field/Field';
import { FunctionAreaDialogProps } from './FunctionArea.types';

export const FunctionAreaDialog = ({ input, readonly, onClose, onSave }: FunctionAreaDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<FunctionAreasFieldValues>({
    defaultValues: {
      functionAreas: input ? [input.functionArea] : [getEmptyFunctionAreaFormInput()],
    },
    resolver: yupResolver(getFunctionAreasSchema(canUseInternalCodes, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'functionAreas',
  });

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const internalCodes = useMemo(() => fields.map(({ internalCode }) => internalCode), [fields]);

  const handleAddFunctionArea = useCallback(() => {
    append(getEmptyFunctionAreaFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: { functionAreas: FunctionAreaFormInput[] }) => {
      onSave(
        input
          ? {
              ...input,
              functionArea: formValues.functionAreas[0],
            }
          : formValues.functionAreas,
      );
    },
    [input, onSave],
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
    <Dialog
      open
      title={`function_area.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
      onClose={readonly ? onClose : openCloseConfirmationDialog}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckCircleOutline />}
              {...(readonly ? { onClick: onClose } : { type: 'submit' })}
            >
              {t(readonly ? 'core.button.close' : 'common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            {input ? (
              <Grid2 size={12}>
                <FunctionAreaField
                  control={control}
                  errors={errors}
                  index={0}
                  internalCodes={[]}
                  mode={FormMode.Edit}
                  readonly={readonly}
                  setCanUseInternalCodes={setCanUseInternalCodes}
                  setValue={setValue}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <FunctionAreaField
                            control={control}
                            errors={errors}
                            index={index}
                            internalCodes={internalCodes}
                            mode={FormMode.Create}
                            readonly={readonly}
                            setCanUseInternalCodes={setCanUseInternalCodes}
                            setValue={setValue}
                          />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                {!readonly && (
                  <Grid2 size={12}>
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={<AddCircleOutline />}
                      onClick={handleAddFunctionArea}
                    >
                      {t('function_area.action.add_function_area')}
                    </Button>
                  </Grid2>
                )}
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
