import { Grid2 } from '@mui/material';
import {
  RecapSection,
  RecapSectionItem,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { ParseKeys } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { getCountryName } from '../../../../../utils/countryUtils';
import {
  getSubjectLegalResidentialAddress,
  getSubjectTaxId,
  getSubjectTaxIdOrVatNumber,
  getSubjectVatNumber,
} from '../../../../../utils/subject/subjectUtils';
import { RecapStepProps } from './Recap.types';

export const RecapStep = ({ counterpartTransfer, isContractActive, onBack, onEdit, onSave }: RecapStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(counterpartTransfer);
  }, [counterpartTransfer, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="contract.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.transfer_data"
              items={[
                {
                  label: 'contract.field.takeover_date',
                  value: counterpartTransfer.takeoverDate,
                },
                ...(!isContractActive
                  ? ([
                      {
                        label: 'contract.field.takeover_legal_representative',
                        value: counterpartTransfer.takeoverLegalRepresentativeSubject?.name,
                      },
                    ] as RecapSectionItem[])
                  : []),
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.takeover_transfer_counterparts"
              items={[
                {
                  value: {
                    columns: [
                      'contract.field.subject_code',
                      'contract.field.subject_name',
                      'contract.field.subject_vat_number',
                      'contract.field.subject_tax_id_code',
                      'contract.field.subject_address_country',
                      'contract.field.subject_address_county',
                    ],
                    rows: counterpartTransfer.takeoverCounterparts.map((counterpart) => [
                      counterpart.subject?.internalCode,
                      counterpart.subject?.name,
                      getSubjectVatNumber(counterpart.subject),
                      getSubjectTaxId(counterpart.subject),
                      getCountryName(
                        getSubjectLegalResidentialAddress(counterpart.subject)?.countryISO ?? '',
                        language,
                      ),
                      getSubjectLegalResidentialAddress(counterpart.subject)?.countyName,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.original_transfer_counterparts"
              items={[
                {
                  value: {
                    columns: [
                      'contract.field.subject_code',
                      'contract.field.subject_name',
                      'contract.field.subject_vat_number',
                      'contract.field.subject_tax_id_code',
                      'contract.field.subject_address_country',
                      'contract.field.subject_address_county',
                    ],
                    rows: counterpartTransfer.originalCounterparts.map((counterpart) => [
                      counterpart.subject?.internalCode,
                      counterpart.subject?.name,
                      getSubjectVatNumber(counterpart.subject),
                      getSubjectTaxId(counterpart.subject),
                      getCountryName(
                        getSubjectLegalResidentialAddress(counterpart.subject)?.countryISO ?? '',
                        language,
                      ),
                      getSubjectLegalResidentialAddress(counterpart.subject)?.countyName,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title={`contract.tab.counterparts_${isContractActive ? 'tenant' : 'landlord'}`}
              items={[
                {
                  value: {
                    columns: [
                      'contract.field.subject_code',
                      'contract.field.subject_name',
                      'contract.field.subject_tax_id_or_vat_number',
                      'contract.field.counterpart_since',
                      'contract.field.counterpart_percent',
                      'contract.field.counterpart_main',
                      ...(isContractActive ? (['contract.field.counterpart_type'] as ParseKeys[]) : []),
                    ],
                    rows: counterpartTransfer.counterparts.map((counterpart) => [
                      counterpart.subject?.internalCode,
                      counterpart.subject?.name,
                      getSubjectTaxIdOrVatNumber(counterpart.subject),
                      counterpart.since,
                      counterpart.contractSharePercent,
                      counterpart.isMainCounterpart,
                      ...(isContractActive
                        ? ([
                            counterpart.counterpartType
                              ? t(`common.enum.counterpart_type.${counterpart.counterpartType}`)
                              : null,
                          ] as (ParseKeys | null)[])
                        : []),
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(4)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions
        completeLabel="contract.dialog.counterpart_variation.action.transfer"
        onBack={onBack}
        onComplete={handleComplete}
      />
    </>
  );
};
