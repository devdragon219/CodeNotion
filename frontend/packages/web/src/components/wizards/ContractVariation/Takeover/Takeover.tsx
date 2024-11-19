import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline, ChevronLeft } from '@mui/icons-material';
import { Box, Button, Grid2 } from '@mui/material';
import { DateField, DialogContent, Form, SelectField } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractVariationTakeoverFormInput } from '../../../../interfaces/FormInputs/ContractActions';
import { getContractTakeoverVariationSchema } from '../../../../utils/contractActions/schemas/contractTakeover';
import { ContractCounterpartsTransferList } from '../../../domains/Contract/Counterparts/TransferList/TransferList';
import { ContractTakeoverProps } from './Takeover.types';

export const ContractTakeover = ({
  contract,
  contractTakeover,
  isActive,
  onBack,
  onChange,
  onSave,
}: ContractTakeoverProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractVariationTakeoverFormInput>({
    defaultValues: contractTakeover,
    resolver: yupResolver(getContractTakeoverVariationSchema(language, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractVariationTakeoverFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Form noValidate onSubmit={handleSubmit(onSave)}>
      <DialogContent
        fixedHeight
        action={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={onBack}>
              {t('common.button.back')}
            </Button>
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('contract.dialog.contract_variation.action.takeover')}
            </Button>
          </Box>
        }
      >
        <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="paymentDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.payment_date')}
                  error={!!errors.paymentDate}
                  helperText={errors.paymentDate?.message}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="takeoverLegalRepresentativeSubject"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.takeover_legal_representative')}
                  options={contract.managementSubject!.officers ?? []}
                  getOptionKey={(option) => String(option.id)}
                  getOptionLabel={(option) => option.name}
                  error={!!errors.takeoverLegalRepresentativeSubject}
                  helperText={errors.takeoverLegalRepresentativeSubject?.message}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={12} sx={{ height: 'calc(100% - 76px)' }}>
            <Controller
              name="counterparts"
              control={control}
              render={({ field }) => (
                <ContractCounterpartsTransferList
                  {...field}
                  isContractActive={!isActive}
                  titles={{
                    left: 'contract.section_title.takeover_counterparts',
                    right: 'contract.section_title.selected_takeover_counterparts',
                  }}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </DialogContent>
    </Form>
  );
};
