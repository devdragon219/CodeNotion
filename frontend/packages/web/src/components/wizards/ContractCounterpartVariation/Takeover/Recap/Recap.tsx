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

export const RecapStep = ({ counterpartTakeover, isContractActive, onBack, onEdit, onSave }: RecapStepProps) => {
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
    onSave(counterpartTakeover);
  }, [counterpartTakeover, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="contract.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.takeover_data"
              items={[
                {
                  label: 'contract.field.takeover_date',
                  value: counterpartTakeover.takeoverDate,
                },
                {
                  label: 'contract.field.takeover_type',
                  value: counterpartTakeover.takeoverType
                    ? t(`common.enum.takeover_type.${counterpartTakeover.takeoverType}`)
                    : null,
                },
                ...(!isContractActive
                  ? ([
                      {
                        label: 'contract.field.takeover_legal_representative',
                        value: counterpartTakeover.takeoverLegalRepresentativeSubject?.name,
                      },
                    ] as RecapSectionItem[])
                  : []),
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.takeover_counterparts"
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
                    rows: counterpartTakeover.takeoverCounterparts.map((counterpart) => [
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
              title="contract.tab.original_counterparts"
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
                    rows: counterpartTakeover.originalCounterparts.map((counterpart) => [
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
                    rows: counterpartTakeover.counterparts.map((counterpart) => [
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
        completeLabel="contract.dialog.counterpart_variation.action.takeover"
        onBack={onBack}
        onComplete={handleComplete}
      />
    </>
  );
};
