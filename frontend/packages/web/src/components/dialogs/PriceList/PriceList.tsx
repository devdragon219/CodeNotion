import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { usePriceList } from '../../../hooks/usePriceList';
import { PriceListFormInput } from '../../../interfaces/FormInputs/PriceList';
import { getEmptyPriceListFormInput } from '../../../utils/priceList/initialValues';
import { getPriceListSchema } from '../../../utils/priceList/schemas/priceList';
import { PriceListGeneralData } from '../../domains/PriceList/GeneralData/GeneralData';
import { PriceListCreateDialogProps } from './PriceList.types';

export const PriceListCreateDialog = ({ onClose, onSave }: PriceListCreateDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const { getInternalCode, checkCanUseInternalCode } = usePriceList();
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<PriceListFormInput>({
    defaultValues: getEmptyPriceListFormInput(),
    resolver: yupResolver(getPriceListSchema(canUseInternalCode, t)),
  });
  const internalCode = useWatch({ control, name: 'internalCode' });
  const priceListId = useWatch({ control, name: 'priceListId' });
  const debouncedInternalCode = useDebounce(internalCode);
  const debouncedPriceListId = useDebounce(priceListId);

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, debouncedPriceListId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedPriceListId]);

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
    (formValues: PriceListFormInput) => {
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
    <Dialog open title="price_list.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <PriceListGeneralData control={control} errors={errors} />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
