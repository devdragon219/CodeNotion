import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { BillItemTypeGeneralData } from '../../../../../components/domains/BillItemType/GeneralData/GeneralData';
import { BillItemTypeRates } from '../../../../../components/domains/BillItemType/Rates/Rates';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteBillItemTypeDocument,
  ExportBillItemTypesDocument,
  GetBillItemTypeDocument,
  GetBillItemTypeQuery,
  useUpdateBillItemTypeMutation,
} from '../../../../../gql/RealGimm.Web.BillItemType.operation';
import { useBillItemType } from '../../../../../hooks/useBillItemType';
import { useFeature } from '../../../../../hooks/useFeature';
import { BillItemTypeFormInput } from '../../../../../interfaces/FormInputs/BillItemType';
import { parseBillItemTypeFormInputToBillItemTypeInput } from '../../../../../utils/billItemType/parseBillItemTypeFormInput';
import { parseBillItemTypeToBillItemTypeFormInput } from '../../../../../utils/billItemType/parseBillItemTypeFragment';
import { getBillItemTypeSchema } from '../../../../../utils/billItemType/schemas/billItemType';
import { getBillItemTypeContractSchema } from '../../../../../utils/billItemType/schemas/contracts';
import { getBillItemTypeGeneralDataSchema } from '../../../../../utils/billItemType/schemas/generalData';

export default function BillItemType() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.COMMON_BILLITEMTYPES);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/asset-management/bill-item-types');
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateBillItemTypeMutation] = useUpdateBillItemTypeMutation();
  const [billItemTypeInput, setBillItemTypeInput] = useState<BillItemTypeFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const { checkCanUseInternalCode } = useBillItemType();
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const debouncedBillItemType = useDebounce(billItemTypeInput);

  const fetchBillItemType = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetBillItemTypeQuery> = await client.query(GetBillItemTypeDocument, {
      billItemTypeId: Number(id),
    });
    setLoading(false);
    if (!result.data?.billItemType.get) return Promise.reject();
    return parseBillItemTypeToBillItemTypeFormInput(result.data.billItemType.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<BillItemTypeFormInput>({
    defaultValues: fetchBillItemType,
    resolver: billItemTypeInput ? yupResolver(getBillItemTypeSchema(canUseInternalCode, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedBillItemType) {
      checkCanUseInternalCode(
        debouncedBillItemType.internalCode,
        debouncedBillItemType.billItemTypeId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedBillItemType?.internalCode, debouncedBillItemType?.billItemTypeId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setBillItemTypeInput(formValues as BillItemTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(billItemTypeInput);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (billItemType: BillItemTypeFormInput) => {
      setLoading(true);
      const result = await updateBillItemTypeMutation({
        billItemTypeId: Number(billItemType.billItemTypeId),
        input: parseBillItemTypeFormInputToBillItemTypeInput(billItemType),
      });
      setLoading(false);
      if (result.data?.billItemType.update.isSuccess) {
        showSnackbar(t('bill_item_type.feedback.update'), 'success');
        setReadonly(true);
        const updatedBillItemType = await fetchBillItemType();
        setBillItemTypeInput(updatedBillItemType);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.billItemType.update.validationErrors);
        return Promise.reject();
      }
    },
    [fetchBillItemType, showError, showSnackbar, t, updateBillItemTypeMutation],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={billItemTypeInput?.description}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('bill_item_type', DeleteBillItemTypeDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportBillItemTypesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'bill_item_type.tab.general_data',
                children: billItemTypeInput && (
                  <BillItemTypeGeneralData control={control} errors={errors} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  billItemTypeInput &&
                  !getBillItemTypeGeneralDataSchema(canUseInternalCode, t).isValidSync(billItemTypeInput),
              },
              {
                label: 'bill_item_type.tab.rates',
                children: billItemTypeInput && (
                  <BillItemTypeRates control={control} errors={errors} readonly={readonly} setValue={setValue} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  billItemTypeInput &&
                  !getBillItemTypeContractSchema(t).isValidSync(billItemTypeInput),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
