import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { UserType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { UserRecapStepProps } from './Recap.types';

export const UserRecapStep = ({ user, onBack, onEdit, onSave }: UserRecapStepProps) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(user);
  }, [user, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="user.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="user.section_title.general_data"
              items={[
                {
                  label: 'user.field.first_name',
                  value: user.firstName,
                },
                {
                  label: 'user.field.last_name',
                  value: user.lastName,
                },
                {
                  label: 'user.field.user_name',
                  value: user.userName,
                },
                {
                  label: 'user.field.status',
                  value: t(`common.enum.user_status.${user.status}`),
                },
                {
                  label: 'user.field.management_subjects',
                  value: user.managementSubjects.map((subject) => subject.name).join(' '),
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="user.section_title.config"
              items={[
                {
                  label: 'user.field.status',
                  value: t(`common.enum.user_type.${user.userType}`),
                },
                {
                  label: 'user.field.groups',
                  value: user.groups.map((group) => group.name).join(' '),
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          {user.userType === UserType.Internal && (
            <Grid2 size={12}>
              <RecapSection
                title="user.section_title.org_unit"
                items={[
                  {
                    value:
                      user.orgUnits.length === 0
                        ? {
                            label: 'user.text.no_associated_org_units',
                          }
                        : {
                            columns: [
                              'user.field.org_unit_code',
                              'user.field.org_unit_description',
                              'user.field.org_unit_type',
                              'user.field.org_unit_management_subject',
                              'user.field.org_unit_group_society',
                              'user.field.org_unit_parent_org_unit',
                            ],
                            rows: user.orgUnits.map((entry) => [
                              entry.internalCode,
                              entry.name,
                              t(`common.enum.org_unit_type.${entry.orgUnitType}`),
                              entry.managementSubjectName,
                              entry.groupSocietyName,
                              entry.parentOrgUnitName,
                            ]),
                          },
                  },
                ]}
                onEdit={handleEdit(2)}
              />
            </Grid2>
          )}
          <Grid2 size={12}>
            <RecapSection
              title="user.section_title.contacts"
              items={[
                {
                  value: {
                    columns: ['subject.field.contact_phone_type', 'subject.field.contact_phone_number'],
                    rows: user.contacts.phones.map((entry) => [
                      entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
                      entry.contactInfo,
                    ]),
                  },
                },
                {
                  value: {
                    columns: ['subject.field.contact_email_type', 'subject.field.contact_email'],
                    rows: user.contacts.emails.map((entry) => [
                      entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
                      entry.contactInfo,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="user.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
