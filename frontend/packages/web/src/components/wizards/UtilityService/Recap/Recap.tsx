import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { UtilityServiceRecapStepProps } from './Recap.types';

export const UtilityServiceRecapStep = ({ utilityService, onBack, onEdit, onSave }: UtilityServiceRecapStepProps) => {
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
    onSave(utilityService);
  }, [utilityService, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="utility_service.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="utility_service.tab.general_data"
              items={[
                {
                  grid: 4,
                  label: 'utility_service.field.reference_subject',
                  value: utilityService.referenceSubject?.name,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.org_unit',
                  value: utilityService.orgUnit?.name,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.utility_type',
                  value: `${utilityService.utilityType?.internalCode} - ${utilityService.utilityType?.description}`,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.provider_subject',
                  value: utilityService.providerSubject?.name,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.provider_subject_internal_code',
                  value: utilityService.providerSubject?.internalCode,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.provider_subject_vat_number',
                  value: utilityService.providerSubject?.vatNumber,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.accounting_item',
                  value: utilityService.accountingItem?.description,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.description',
                  value: utilityService.description,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.utility_contract_code',
                  value: utilityService.utilityContractCode,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.utility_user_code',
                  value: utilityService.utilityUserCode,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.utility_type_metering_type',
                  value: utilityService.utilityType?.meteringType
                    ? t(`common.enum.metering_type.${utilityService.utilityType.meteringType}`)
                    : null,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.free_market',
                  value: utilityService.isFreeMarket,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.deposit',
                  value: parseNumberToCurrency(utilityService.deposit, language),
                },
                {
                  grid: 4,
                  label: 'utility_service.field.status',
                  value: utilityService.status ? t(`common.enum.entry_status.${utilityService.status}`) : null,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.activation_date',
                  value: utilityService.activationDate,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.utility_meter_serial',
                  value: utilityService.utilityMeterSerial,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.utility_delivery_point_code',
                  value: utilityService.utilityDeliveryPointCode,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.contract_power_nominal',
                  value: utilityService.contractPowerNominal,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.contract_power_maximum',
                  value: utilityService.contractPowerMaximum,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.contract_nominal_tension',
                  value: utilityService.contractNominalTension,
                },
                {
                  grid: 4,
                  label: 'utility_service.field.notes',
                  value: utilityService.notes,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="utility_service.tab.estates"
              items={[
                {
                  value: {
                    columns: [
                      'utility_service.field.estate_code',
                      'utility_service.field.estate_name',
                      'utility_service.field.estate_type',
                      'utility_service.field.address_toponymy',
                      'utility_service.field.estate_status',
                      'utility_service.field.estate_usage_type',
                      'utility_service.field.estate_management_subject',
                    ],
                    rows: utilityService.estates.map((entry) => [
                      entry.internalCode,
                      entry.name,
                      t(`common.enum.estate_type.${entry.type}`),
                      parseAddressToString(
                        entry.addresses.find(({ addressType }) => addressType === AsstAddressType.Primary),
                        language,
                      ),
                      t(`common.enum.estate_status.${entry.status}`),
                      entry.usageTypeName,
                      entry.managementSubjectName,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="utility_service.tab.estate_units"
              items={[
                {
                  value: {
                    columns: [
                      'utility_service.field.estate_unit_code',
                      'utility_service.field.estate_unit_name',
                      'utility_service.field.estate_unit_type',
                      'utility_service.field.address_toponymy',
                      'utility_service.field.address_indoor_number',
                      'utility_service.field.estate_unit_usage_type',
                      'utility_service.field.estate_unit_cadastral_coordinates',
                    ],
                    rows: utilityService.estateUnits.map((entry) => [
                      entry.internalCode,
                      entry.name,
                      t(`common.enum.estate_unit_type.${entry.type}`),
                      parseAddressToString(entry.address, language),
                      entry.subNumbering,
                      entry.usageTypeName,
                      entry.cadastralUnitCoordinates,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="utility_service.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
