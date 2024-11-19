import { Grid2 } from '@mui/material';
import {
  DocumentFieldTable,
  RecapSection,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { getDefaultDocumentFieldsConfig } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { getCountryName } from '../../../../utils/countryUtils';
import { EstateRecapStepProps } from './Recap.types';

export const EstateRecapStep = ({ estate, onBack, onEdit, onSave }: EstateRecapStepProps) => {
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
    onSave(estate);
  }, [estate, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="estate.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="estate.tab.general_data"
              items={[
                {
                  label: 'estate.field.estate_type',
                  value: estate.estateType ? t(`common.enum.estate_type.${estate.estateType}`) : null,
                },
                {
                  label: 'estate.field.estate_name',
                  value: estate.name,
                },
                {
                  label: 'estate.field.estate_code',
                  value: estate.internalCode,
                },
                {
                  label: 'estate.field.external_estate_code',
                  value: estate.externalCode,
                },
                {
                  label: 'estate.field.estate_status',
                  value: estate.status ? t(`common.enum.estate_status.${estate.status}`) : null,
                },
                {
                  label: 'estate.field.ownership',
                  value: estate.ownership ? t(`common.enum.estate_ownership.${estate.ownership}`) : null,
                },
                {
                  label: 'estate.field.main_usage_type',
                  value: estate.mainUsageType?.name,
                },
                {
                  label: 'estate.field.usage_type',
                  value: estate.usageType?.name,
                },
                {
                  label: 'estate.field.build_year',
                  value: estate.buildYear,
                },
                {
                  label: 'estate.field.estate_surface',
                  value: estate.surfaceAreaSqM,
                },
                {
                  label: 'estate.field.management_subject',
                  value: estate.managementSubject?.name,
                },
                {
                  label: 'estate.field.management_org_unit',
                  value: estate.managementOrgUnit?.name,
                },
                {
                  label: 'estate.field.notes',
                  value: estate.notes,
                },
                {
                  label: 'estate.section_title.stairs',
                  value: [
                    {
                      label: 'estate.field.stair',
                      value: estate.stairs.map((stair) => stair.description).join(', '),
                    },
                  ],
                },
                {
                  label: 'estate.section_title.floors',
                  value: [
                    {
                      label: 'estate.field.floors',
                      value: estate.floors.map((floor) => `(${floor.position}) ${floor.name}`).join(', '),
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate.tab.addresses"
              items={[
                {
                  label: 'estate.field.address_country',
                  value: getCountryName(estate.addresses[0].countryISO!, language),
                },
                {
                  label: 'estate.field.address_city',
                  value: estate.addresses[0].city.name,
                },
                {
                  label: 'estate.field.address_county',
                  value: estate.addresses[0].countyName,
                },
                {
                  label: 'estate.field.address_toponymy',
                  value: [estate.addresses[0].toponymy, estate.addresses[0].numbering].join(', '),
                },
                {
                  label: 'estate.field.address_postal_code',
                  value: estate.addresses[0].localPostCode,
                },
                {
                  label: 'estate.field.address_notes',
                  value: estate.addresses[0].notes,
                },
                {
                  label: 'estate.section_title.secondary_addresses',
                  value:
                    estate.addresses.slice(1).length === 0
                      ? {
                          label: 'estate.text.no_secondary_addresses',
                        }
                      : {
                          columns: [
                            'estate.field.address_country',
                            'estate.field.address_city',
                            'estate.field.address_county',
                            'estate.field.address_toponymy',
                            'estate.field.address_postal_code',
                            'estate.field.address_notes',
                          ],
                          rows: estate.addresses
                            .slice(1)
                            .map((entry) => [
                              entry.countryISO && getCountryName(entry.countryISO, language),
                              entry.city.name,
                              entry.countyName,
                              [entry.toponymy, entry.numbering].join(', '),
                              entry.localPostCode,
                              entry.notes,
                            ]),
                        },
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate.tab.documents"
              items={[
                {
                  label: 'estate.section_title.images',
                  value:
                    estate.images.length === 0 ? (
                      {
                        label: 'estate.text.no_images',
                      }
                    ) : (
                      <DocumentFieldTable rows={estate.images} />
                    ),
                },
                {
                  label: 'estate.section_title.documents',
                  value:
                    estate.documents.length === 0 ? (
                      {
                        label: 'estate.text.no_documents',
                      }
                    ) : (
                      <DocumentFieldTable fieldsConfig={getDefaultDocumentFieldsConfig()} rows={estate.documents} />
                    ),
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="estate.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
