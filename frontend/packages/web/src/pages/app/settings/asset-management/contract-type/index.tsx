import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { ContractTypeGeneralData } from '../../../../../components/domains/ContractType/GeneralData/GeneralData';
import { ContractTypeParametricData } from '../../../../../components/domains/ContractType/ParametricData/ParametricData';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteContractTypeDocument,
  ExportContractTypesDocument,
  GetContractTypeDocument,
  GetContractTypeQuery,
  useUpdateContractTypeMutation,
} from '../../../../../gql/RealGimm.Web.ContractType.operation';
import { useContractType } from '../../../../../hooks/useContractType';
import { useFeature } from '../../../../../hooks/useFeature';
import { ContractTypeFormInput } from '../../../../../interfaces/FormInputs/ContractType';
import { parseContractTypeFormInputToContractTypeInput } from '../../../../../utils/contractType/parseContractTypeFormInput';
import { parseContractTypeToContractTypeFormInput } from '../../../../../utils/contractType/parseContractTypeFragment';
import { getContractTypeSchema } from '../../../../../utils/contractType/schemas/contractType';
import { getContractTypeGeneralDataSchema } from '../../../../../utils/contractType/schemas/generalData';

export default function ContractType() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.PROP_CONTRACT_TYPES);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/asset-management/contract-types');
  const { checkCanUseInternalCode } = useContractType();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateContractTypeMutation] = useUpdateContractTypeMutation();
  const [contractTypeInput, setContractTypeInput] = useState<ContractTypeFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedContractType = useDebounce(contractTypeInput);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const fetchContractType = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetContractTypeQuery> = await client.query(GetContractTypeDocument, {
      contractTypeId: Number(id),
    });
    setLoading(false);
    if (!result.data?.contractType.get) return Promise.reject();
    return parseContractTypeToContractTypeFormInput(result.data.contractType.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<ContractTypeFormInput>({
    defaultValues: fetchContractType,
    resolver: contractTypeInput ? yupResolver(getContractTypeSchema(canUseInternalCode, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedContractType) {
      checkCanUseInternalCode(
        debouncedContractType.internalCode,
        debouncedContractType.contractTypeId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedContractType?.internalCode, debouncedContractType?.contractTypeId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setContractTypeInput(formValues as ContractTypeFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(contractTypeInput);
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
    async (contractType: ContractTypeFormInput) => {
      setLoading(true);
      const result = await updateContractTypeMutation({
        contractTypeId: Number(contractType.contractTypeId),
        contractTypeInput: parseContractTypeFormInputToContractTypeInput(contractType),
      });
      setLoading(false);
      if (result.data?.contractType.update.isSuccess) {
        showSnackbar(t('contract_type.feedback.update'), 'success');
        setReadonly(true);
        const updatedContractType = await fetchContractType();
        setContractTypeInput(updatedContractType);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.contractType.update.validationErrors);
        return Promise.reject();
      }
    },
    [fetchContractType, showError, showSnackbar, t, updateContractTypeMutation],
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
          title={contractTypeInput?.description}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('contract_type', DeleteContractTypeDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportContractTypesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'contract_type.tab.general_data',
                children: contractTypeInput && (
                  <ContractTypeGeneralData control={control} errors={errors} readonly={readonly} mode={FormMode.Edit} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  contractTypeInput &&
                  !getContractTypeGeneralDataSchema(canUseInternalCode, t).isValidSync(contractTypeInput),
              },
              {
                label: 'contract_type.tab.parametric_data',
                children: contractTypeInput && (
                  <ContractTypeParametricData control={control} errors={errors} readonly={readonly} />
                ),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
