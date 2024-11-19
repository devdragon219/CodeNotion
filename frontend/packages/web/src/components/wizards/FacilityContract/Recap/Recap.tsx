import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { FacilityContractCatalogueTypesTable } from '../../../domains/FacilityContract/CatalogueTypes/Table/Table';
import { FacilityContractRecapStepProps } from './Recap.types';

export const FacilityContractRecapStep = ({
  facilityContract,
  onBack,
  onEdit,
  onSave,
}: FacilityContractRecapStepProps) => {
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
    onSave(facilityContract);
  }, [facilityContract, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="facility_contract.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract.tab.general_data"
              items={[
                {
                  grid: 4,
                  label: 'facility_contract.field.internal_code',
                  value: facilityContract.internalCode,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.external_code',
                  value: facilityContract.externalCode,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.description',
                  value: facilityContract.description,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.contract_type',
                  value: facilityContract.facilityContractType?.name,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.contract_template',
                  value: facilityContract.originalTemplate?.description,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.contract_status',
                  value: facilityContract.entryStatus
                    ? t(`common.enum.entry_status.${facilityContract.entryStatus}`)
                    : null,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.provider_subject',
                  value: facilityContract.providerSubject?.name,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.agreement_date',
                  value: facilityContract.agreementDate,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.effective_date',
                  value: facilityContract.effectiveDate,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.expiration_date',
                  value: facilityContract.expirationDate,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.cancellation_notice',
                  value: facilityContract.cancellationNoticeDaysCount,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.renewal_notice',
                  value: facilityContract.renewalNoticeDaysCount,
                },
                {
                  grid: 4,
                  label: 'facility_contract.field.maximum_renewal',
                  value: facilityContract.maximumRenewalDaysCount,
                },
                {
                  label: 'facility_contract.section_title.framework_agreements',
                  value:
                    facilityContract.frameworkAgreements.length === 0
                      ? {
                          label: 'facility_contract.text.no_framework_agreements',
                        }
                      : {
                          columns: [
                            'facility_contract.field.framework_agreement_code',
                            'facility_contract.field.framework_agreement_notes',
                          ],
                          rows: facilityContract.frameworkAgreements.map((entry) => [entry.externalCode, entry.notes]),
                        },
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract.tab.estate_units"
              items={[
                {
                  value: {
                    columns: [
                      'facility_contract.field.estate_unit_code',
                      'facility_contract.field.estate_unit_name',
                      'facility_contract.field.estate_unit_address',
                      'facility_contract.field.estate_unit_type',
                    ],
                    rows: facilityContract.estateUnits.map((entry) => [
                      entry.internalCode,
                      entry.name,
                      parseAddressToString(entry.address, language, 'short'),
                      t(`common.enum.estate_unit_type.${entry.type}`),
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract.tab.catalogue_types"
              items={
                <FacilityContractCatalogueTypesTable
                  catalogueTypes={facilityContract.catalogueTypes}
                  useRowExpandCollapse={false}
                />
              }
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract.tab.slas"
              items={[
                {
                  value: {
                    columns: ['sla.field.internal_code', 'sla.field.description'],
                    rows: facilityContract.slas.map((entry) => [entry.internalCode, entry.description]),
                  },
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract.tab.penalties"
              items={[
                {
                  value: {
                    columns: ['penalty.field.internal_code', 'penalty.field.description'],
                    rows: facilityContract.penalties.map((entry) => [entry.internalCode, entry.description]),
                  },
                },
              ]}
              onEdit={handleEdit(4)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="facility_contract.tab.price_lists"
              items={[
                {
                  value: {
                    columns: ['price_list.field.internal_code', 'price_list.field.name'],
                    rows: facilityContract.priceLists.map((entry) => [entry.internalCode, entry.name]),
                  },
                },
              ]}
              onEdit={handleEdit(5)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="facility_contract.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
