import { Grid2 } from '@mui/material';
import {
  DocumentFieldTable,
  RecapSection,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { CustomFieldType } from '@realgimm5/frontend-common/gql/types';
import { getDefaultDocumentFieldsConfig, parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CatalogueRecapStepProps } from './Recap.types';

export const CatalogueRecapStep = ({ catalogue, onBack, onEdit, onSave }: CatalogueRecapStepProps) => {
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
    onSave(catalogue);
  }, [catalogue, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="catalogue.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="catalogue.tab.estate"
              items={[
                {
                  label: 'catalogue.field.estate_code',
                  value: catalogue.estate?.internalCode,
                },
                {
                  label: 'catalogue.field.estate_type',
                  value: catalogue.estate?.type ? t(`common.enum.estate_type.${catalogue.estate.type}`) : null,
                },
                {
                  label: 'catalogue.field.estate_name',
                  value: catalogue.estate?.name,
                },
                {
                  label: 'catalogue.field.external_estate_code',
                  value: catalogue.estate?.externalCode,
                },
                {
                  label: 'catalogue.field.estate_status',
                  value: catalogue.estate?.status ? t(`common.enum.estate_status.${catalogue.estate.status}`) : null,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="catalogue.tab.general_data"
              items={[
                {
                  label: 'catalogue.field.catalogue_category',
                  value: catalogue.category?.name,
                },
                {
                  label: 'catalogue.field.catalogue_subcategory',
                  value: catalogue.subCategory?.name,
                },
                {
                  label: 'catalogue.field.catalogue_type',
                  value: catalogue.catalogueType?.name,
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="catalogue.tab.items"
              items={[
                {
                  value: {
                    columns: [
                      'catalogue.field.catalogue_item_code',
                      'catalogue.field.catalogue_item_status',
                      'catalogue.field.catalogue_item_activation_date',
                      'catalogue.field.catalogue_item_last_maintenance_date',
                      ...(catalogue.catalogueType!.fields.flatMap(({ fields }) =>
                        fields.map(({ name }) => name),
                      ) as ParseKeys[]),
                    ],
                    rows: catalogue.items.map((entry) => [
                      entry.internalCode,
                      entry.status ? t(`common.enum.estate_status.${entry.status}`) : null,
                      entry.activationDate,
                      entry.lastMaintenanceDate,
                      ...entry.fields.flatMap((fields) =>
                        fields.map(({ fieldType, value }) =>
                          fieldType === CustomFieldType.Date ? parseStringToLocalizedDate(value, language) : value,
                        ),
                      ),
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="catalogue.tab.documents"
              items={[
                {
                  value:
                    catalogue.documents.length === 0 ? (
                      {
                        label: 'catalogue.text.no_documents',
                      }
                    ) : (
                      <DocumentFieldTable fieldsConfig={getDefaultDocumentFieldsConfig()} rows={catalogue.documents} />
                    ),
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="catalogue.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
