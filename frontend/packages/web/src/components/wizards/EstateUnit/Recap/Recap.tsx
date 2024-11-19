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

import { parseAddressToString } from '../../../../utils/addressUtils';
import { EstateUnitRecapStepProps } from './Recap.types';

export const EstateUnitRecapStep = ({ estateUnit, onBack, onEdit, onSave }: EstateUnitRecapStepProps) => {
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
    onSave(estateUnit);
  }, [estateUnit, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="estate_unit.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit.tab.estate"
              items={[
                {
                  label: 'estate_unit.field.estate_code',
                  value: estateUnit.estate?.internalCode,
                },
                {
                  label: 'estate_unit.field.estate_type',
                  value: estateUnit.estate?.type ? t(`common.enum.estate_type.${estateUnit.estate.type}`) : null,
                },
                {
                  label: 'estate_unit.field.estate_name',
                  value: estateUnit.estate?.name,
                },
                {
                  label: 'estate_unit.field.external_estate_code',
                  value: estateUnit.estate?.externalCode,
                },
                {
                  label: 'estate_unit.field.estate_status',
                  value: estateUnit.estate?.status ? t(`common.enum.estate_status.${estateUnit.estate.status}`) : null,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit.tab.general_data"
              items={[
                {
                  label: 'estate_unit.field.estate_unit_code',
                  value: estateUnit.internalCode,
                },
                {
                  label: 'estate_unit.field.external_estate_unit_code',
                  value: estateUnit.externalCode,
                },
                {
                  label: 'estate_unit.field.estate_unit_name',
                  value: estateUnit.name,
                },
                {
                  label: 'estate_unit.field.address_toponymy',
                  value: parseAddressToString(estateUnit.address, language),
                },
                {
                  label: 'estate_unit.field.address_indoor_number',
                  value: estateUnit.subNumbering,
                },
                {
                  label: 'estate_unit.field.stair',
                  value: estateUnit.stair?.description,
                },
                {
                  label: 'estate_unit.field.floors',
                  value: estateUnit.floors.map((floor) => `(${floor.position}) ${floor.name}`).join(', '),
                },
                {
                  label: 'estate_unit.field.management_subject',
                  value: estateUnit.estate?.managementSubject.name,
                },
                {
                  label: 'estate_unit.field.estate_unit_type',
                  value: estateUnit.estateUnitType
                    ? t(`common.enum.estate_unit_type.${estateUnit.estateUnitType}`)
                    : null,
                },
                {
                  label: 'estate_unit.field.estate_unit_status',
                  value: estateUnit.status ? t(`common.enum.estate_unit_status.${estateUnit.status}`) : null,
                },
                {
                  label: 'estate_unit.field.ownership_start_date',
                  value: estateUnit.ownershipStartDate,
                },
                {
                  label: 'estate_unit.field.ownership_type',
                  value: estateUnit.ownershipType
                    ? t(`common.enum.estate_unit_ownership_type.${estateUnit.ownershipType}`)
                    : null,
                },
                {
                  label: 'estate_unit.field.ownership_percentage',
                  value: estateUnit.ownershipPercent,
                },
                {
                  label: 'estate_unit.field.usage_type',
                  value: estateUnit.usageType?.name,
                },
                {
                  label: 'estate_unit.field.shared_area',
                  value: estateUnit.sharedArea,
                },
                {
                  label: 'estate_unit.field.notes',
                  value: estateUnit.notes,
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit.tab.official_act"
              items={
                estateUnit.officialAct
                  ? [
                      {
                        label: 'estate_unit.field.official_act_protocol_number',
                        value: estateUnit.officialAct.protocolNumber,
                      },
                      {
                        label: 'estate_unit.field.official_act_repertoire_number',
                        value: estateUnit.officialAct.repertoireNumber,
                      },
                      {
                        label: 'estate_unit.field.official_act_registration_number',
                        value: estateUnit.officialAct.registrationNumber,
                      },
                      {
                        label: 'estate_unit.field.official_act_registration_date',
                        value: estateUnit.officialAct.registrationDate,
                      },
                      {
                        label: 'estate_unit.field.official_act_written_at_city',
                        value: estateUnit.officialAct.writtenAtCity,
                      },
                      {
                        label: 'estate_unit.field.official_act_transcription_number',
                        value: estateUnit.officialAct.transcriptionNumber,
                      },
                      {
                        label: 'estate_unit.field.official_act_transcription_date',
                        value: estateUnit.officialAct.transcriptionDate,
                      },
                      {
                        label: 'estate_unit.field.official_act_transcription_city',
                        value: estateUnit.officialAct.transcriptionCity,
                      },
                      {
                        label: 'estate_unit.field.official_act_notary_act_date',
                        value: estateUnit.officialAct.notaryActDate,
                      },
                      {
                        label: 'estate_unit.field.official_act_collection_number',
                        value: estateUnit.officialAct.collectionNumber,
                      },
                      {
                        label: 'estate_unit.field.official_act_notary_name',
                        value: estateUnit.officialAct.notaryName,
                      },
                    ]
                  : [
                      {
                        label: 'estate_unit.text.no_official_act',
                        value: null,
                      },
                    ]
              }
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit.tab.documents"
              items={[
                {
                  value:
                    estateUnit.documents.length === 0 ? (
                      {
                        label: 'estate_unit.text.no_documents',
                      }
                    ) : (
                      <DocumentFieldTable fieldsConfig={getDefaultDocumentFieldsConfig()} rows={estateUnit.documents} />
                    ),
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="estate_unit.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
