import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { getCountryName } from '../../../../utils/countryUtils';
import { OrgUnitRecapStepProps } from './Recap.types';

export const OrgUnitRecapStep = ({ orgUnit, onBack, onEdit, onSave }: OrgUnitRecapStepProps) => {
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
    onSave(orgUnit);
  }, [orgUnit, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="org_unit.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="org_unit.step.general_data"
              items={[
                {
                  label: 'org_unit.field.management_subject',
                  value: orgUnit.managementSubject?.name,
                },
                {
                  label: 'org_unit.field.group_society',
                  value: orgUnit.groupSociety?.name,
                },
                {
                  label: 'org_unit.field.internal_code',
                  value: orgUnit.internalCode,
                },
                {
                  label: 'org_unit.field.additional_code',
                  value: orgUnit.externalCode,
                },
                {
                  label: 'org_unit.field.entry_description',
                  value: orgUnit.entryDescription,
                },
                {
                  label: 'org_unit.field.entry_status',
                  value: orgUnit.entryStatus ? t(`common.enum.entry_status.${orgUnit.entryStatus}`) : null,
                },
                {
                  label: 'org_unit.field.parent_org_unit',
                  value: orgUnit.parentOrgUnit?.name,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          {orgUnit.orgUnitType === OrgUnitType.GeographicalHierarchy && (
            <Grid2 size={12}>
              <RecapSection
                title="org_unit.step.geographical_data"
                items={[
                  {
                    value: {
                      columns: ['org_unit.field.associated_city', 'org_unit.field.county', 'org_unit.field.country'],
                      rows: orgUnit.cities.map((entry) => [
                        entry.name,
                        entry.countyName,
                        getCountryName(entry.countryISO, language),
                      ]),
                    },
                  },
                ]}
                onEdit={handleEdit(1)}
              />
            </Grid2>
          )}
          <Grid2 size={12}>
            <RecapSection
              title="org_unit.step.contacts"
              items={[
                {
                  value: {
                    columns: ['org_unit.field.contact_phone_type', 'org_unit.field.contact_phone_number'],
                    rows: orgUnit.contacts.phones.map((entry) => [
                      entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
                      entry.contactInfo,
                    ]),
                  },
                },
                {
                  value: {
                    columns: ['org_unit.field.contact_email_type', 'org_unit.field.contact_email'],
                    rows: orgUnit.contacts.emails.map((entry) => [
                      entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
                      entry.contactInfo,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(orgUnit.orgUnitType === OrgUnitType.GeographicalHierarchy ? 2 : 1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="org_unit.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
