import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { PrimaryTable, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractCounterpartVariationDeceaseFormInput } from '../../../../../interfaces/FormInputs/ContractActions';
import { getContractCounterpartDeceaseVariationOriginalCounterpartSchema } from '../../../../../utils/contractActions/schemas/counterpartDecease';
import {
  getSubjectLegalResidentialAddress,
  getSubjectTaxId,
  getSubjectVatNumber,
} from '../../../../../utils/subject/subjectUtils';
import { OriginalCounterpartStepProps } from './OriginalCounterpart.types';

export const OriginalCounterpartStep = ({
  counterpartDecease,
  currentCounterparts,
  isContractActive,
  onBack,
  onChange,
  onError,
  onNext,
}: OriginalCounterpartStepProps) => {
  const { t } = useTranslation();
  const originalCounterparts = useMemo(
    () => currentCounterparts.filter(({ subject }) => subject?.entryStatus === EntryStatus.FrozenClosed),
    [currentCounterparts],
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ContractCounterpartVariationDeceaseFormInput>({
    defaultValues: counterpartDecease,
    resolver: yupResolver(getContractCounterpartDeceaseVariationOriginalCounterpartSchema(isContractActive, t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as ContractCounterpartVariationDeceaseFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.originalCounterpart) {
      onError(errors.originalCounterpart.message);
    }
    // eslint-disable-next-line
  }, [errors.originalCounterpart]);

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle
          value={`contract.section_title.select_deceased_counterpart_${isContractActive ? 'tenant' : 'landlord'}`}
        />
        <Grid2 size={12}>
          <Controller
            name="originalCounterpart"
            control={control}
            render={({ field }) => (
              <PrimaryTable
                color="secondary"
                columns={[
                  {
                    id: 'internalCode',
                    label: 'contract.field.subject_code',
                    getRowValue: ({ subject }) => subject?.internalCode,
                  },
                  {
                    id: 'name',
                    label: 'contract.field.subject_name',
                    getRowValue: ({ subject }) => subject?.name,
                  },
                  {
                    id: 'taxIdCode',
                    label: 'contract.field.subject_tax_id_code',

                    getRowValue: ({ subject }) => getSubjectTaxId(subject),
                  },
                  {
                    id: 'vatNumber',
                    label: 'contract.field.subject_vat_number',
                    getRowValue: ({ subject }) => getSubjectVatNumber(subject),
                  },
                  {
                    id: 'address',
                    label: 'contract.field.subject_address_county',
                    getRowValue: ({ subject }) => getSubjectLegalResidentialAddress(subject)?.countyName,
                  },
                ]}
                empty="contract.text.no_subjects"
                initialState={
                  field.value
                    ? {
                        rowSelection: {
                          [String(field.value.counterpartId)]: true,
                        },
                      }
                    : undefined
                }
                rows={originalCounterparts}
                useColumnVisibility={false}
                usePagination={false}
                useRowSelection={false}
                useSelectedRows={false}
                getRowId={({ counterpartId }) => String(counterpartId)}
                onRowSelected={field.onChange}
              />
            )}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
