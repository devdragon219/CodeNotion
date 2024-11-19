import { Grid2 } from '@mui/material';
import {
  DocumentFieldTable,
  RecapSection,
  RecapSectionItem,
  RecapSectionSimpleItem,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { AddressType, CompanyGroup } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { LegalNature } from '../../../../enums/LegalNature';
import { SubjectType } from '../../../../enums/SubjectType';
import { getCountryName } from '../../../../utils/countryUtils';
import {
  getSubjectIdentityDocumentFieldsConfig,
  getSubjectOtherDocumentFieldsConfig,
} from '../../../../utils/subject/getSubjectDocumentFieldsConfig';
import { SubjectRecapStepProps } from './Recap.types';

export const SubjectRecapStep = ({ subject, subjectType, onBack, onEdit, onSave }: SubjectRecapStepProps) => {
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
    onSave(subject, subjectType);
  }, [subject, subjectType, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="subject.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="subject.tab.general_data"
              items={[
                {
                  label: 'subject.field.legal_nature',
                  value: subject.legalNature ? t(`core.enum.legal_nature.${subject.legalNature}`) : null,
                },
                subjectType === SubjectType.ManagementSubject
                  ? {
                      label: 'subject.field.management_code',
                      value: subject.managementCode,
                    }
                  : {
                      label: 'subject.field.category',
                      value: subject.categories.map(({ name }) => name).join(', '),
                    },
                {
                  label: 'subject.field.subject_code',
                  value: subject.internalCode,
                },
                {
                  label: 'subject.field.external_subject_code',
                  value: subject.externalSourceCode,
                },
                {
                  label: 'subject.field.subject_status',
                  value: subject.entryStatus ? t(`common.enum.entry_status.${subject.entryStatus}`) : null,
                },
                ...(subjectType !== SubjectType.ManagementSubject
                  ? ([
                      {
                        label: 'subject.field.owning_management_subjects',
                        value: subject.owningManagementSubjects.map(({ name }) => name).join(', '),
                      },
                    ] as RecapSectionItem[])
                  : []),
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="subject.tab.personal_data"
              items={[
                ...(subject.legalNature === LegalNature.PhysicalPerson
                  ? ([
                      {
                        label: 'subject.field.first_name',
                        value: subject.firstName,
                      },
                      {
                        label: 'subject.field.last_name',
                        value: subject.lastName,
                      },
                      {
                        label: 'subject.field.birth_sex',
                        value: subject.birthSex ? t(`common.enum.birth_sex.${subject.birthSex}`) : null,
                      },
                      {
                        label: 'subject.field.birth_date',
                        value: subject.birthDate,
                      },
                      {
                        label: 'subject.field.birth_address_country',
                        value: getCountryName(subject.birthLocation.countryISO!, language),
                      },
                      {
                        label: 'subject.field.birth_address_city',
                        value: subject.birthLocation.city.name,
                      },
                      {
                        label: 'subject.field.birth_address_county',
                        value: subject.birthLocation.countyName,
                      },
                      {
                        label: 'subject.field.tax_id_code',
                        value: subject.birthCountryTaxIdCode,
                      },
                      {
                        label: 'subject.field.vat_number',
                        value: subject.professionalTaxIdCode,
                      },
                    ] as RecapSectionItem[])
                  : ([
                      {
                        label: 'subject.field.business_name',
                        value: subject.fullName,
                      },
                      {
                        label: 'subject.field.subject_name',
                        value: subject.shorthandDescription,
                      },
                      {
                        label: 'subject.field.establishment_date',
                        value: subject.businessStart,
                      },
                      {
                        label: 'subject.field.share_capital',
                        value: subject.shareCapital,
                      },
                      {
                        label: 'subject.field.vat_number',
                        value: subject.baseCountryTaxIdCode,
                      },
                      {
                        label: 'subject.field.tax_id_code',
                        value: subject.additionalTaxIdCode,
                      },
                      {
                        label: 'subject.field.cciaa_number',
                        value: subject.companiesHouseIdCode,
                      },
                      {
                        label: 'subject.field.cciaa_county',
                        value: subject.companiesHouseIdCountyName,
                      },
                      {
                        label: 'subject.field.rea_number',
                        value: subject.additionalGovIdCode,
                      },
                      {
                        label: 'subject.field.rea_county',
                        value: subject.additionalGovIdCountyName,
                      },
                      {
                        label: 'subject.section_title.corporate_data',
                        value: [
                          ...(subjectType === SubjectType.ManagementSubject
                            ? ([
                                {
                                  label: 'subject.field.group_leader',
                                  value: subject.companyGroup.relation === CompanyGroup.Leader,
                                },
                                {
                                  label: 'subject.field.tax_status_landlord_vat',
                                  value: subject.taxStatusLandlordVat !== null,
                                },
                                {
                                  label: 'subject.field.tax_status_tenant_vat',
                                  value: subject.taxStatusTenantVat !== null,
                                },
                              ] as RecapSectionSimpleItem[])
                            : ([
                                {
                                  label: 'subject.field.company_group_parent',
                                  value: subject.companyGroup.name,
                                },
                                {
                                  label: 'subject.field.group_leader',
                                  value: subject.companyGroup.relation === CompanyGroup.Leader,
                                },
                              ] as RecapSectionSimpleItem[])),
                          {
                            label: 'subject.field.signature',
                            value: subject.interGroupSignature,
                          },
                          {
                            label: 'subject.field.sia_code',
                            value: subject.bankingId1,
                          },
                        ],
                      },
                    ] as RecapSectionItem[])),
                {
                  label: `subject.section_title.${
                    subject.legalNature === LegalNature.PhysicalPerson
                      ? 'legal_representative_or_other'
                      : 'legal_representative'
                  }`,
                  value:
                    subject.officers.length === 0
                      ? {
                          label: `subject.text.${
                            subject.legalNature === LegalNature.PhysicalPerson
                              ? 'no_legal_representatives_or_other'
                              : 'no_legal_representatives'
                          }`,
                        }
                      : {
                          columns: [
                            'subject.field.officer_type',
                            'subject.field.officer_name',
                            'subject.field.officer_since',
                            'subject.field.officer_until',
                          ],
                          rows: subject.officers.map((entry) => [
                            entry.officerType ? t(`common.enum.officer_type.${entry.officerType}`) : null,
                            entry.officer?.name,
                            entry.since,
                            entry.until,
                          ]),
                        },
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="subject.tab.addresses_and_contacts"
              items={[
                {
                  label: `subject.section_title.${
                    subject.legalNature === LegalNature.PhysicalPerson ? 'residential_address' : 'legal_address'
                  }`,
                  value: [
                    {
                      label: 'subject.field.address_country',
                      value: getCountryName(subject.addresses[0].countryISO!, language),
                    },
                    {
                      label: 'subject.field.address_city',
                      value: subject.addresses[0].city.name,
                    },
                    {
                      label: 'subject.field.address_county',
                      value: subject.addresses[0].countyName,
                    },
                    {
                      label: 'subject.field.address_toponymy',
                      value: [subject.addresses[0].toponymy, subject.addresses[0].numbering].join(', '),
                    },
                    {
                      label: 'subject.field.address_postal_code',
                      value: subject.addresses[0].localPostCode,
                    },
                    {
                      label: 'subject.field.address_notes',
                      value: subject.addresses[0].notes,
                    },
                  ],
                },
                {
                  label: 'subject.section_title.other_addresses',
                  value:
                    subject.addresses.slice(1).length === 0
                      ? {
                          label: 'subject.text.no_other_addresses',
                        }
                      : {
                          columns: [
                            'subject.field.address_type',
                            'subject.field.address_country',
                            'subject.field.address_city',
                            'subject.field.address_county',
                            'subject.field.address_toponymy',
                            'subject.field.address_postal_code',
                            'subject.field.address_notes',
                          ],
                          rows: subject.addresses
                            .slice(1)
                            .map((entry) => [
                              entry.addressType
                                ? t(`common.enum.address_type.${entry.addressType as AddressType}`)
                                : null,
                              entry.countryISO && getCountryName(entry.countryISO, language),
                              entry.city.name,
                              entry.countyName,
                              [entry.toponymy, entry.numbering].join(', '),
                              entry.localPostCode,
                              entry.notes,
                            ]),
                        },
                },
                {
                  label: 'subject.section_title.contacts',
                  value: {
                    columns: ['subject.field.contact_phone_type', 'subject.field.contact_phone_number'],
                    rows: subject.contacts.phones.map((entry) => [
                      entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
                      entry.contactInfo,
                    ]),
                  },
                },
                {
                  value: {
                    columns: ['subject.field.contact_email_type', 'subject.field.contact_email'],
                    rows: subject.contacts.emails.map((entry) => [
                      entry.contactInfoType ? t(`common.enum.contact_info_type.${entry.contactInfoType}`) : null,
                      entry.contactInfo,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="subject.tab.accounting_data"
              items={[
                {
                  label: 'subject.section_title.bank_account',
                  value:
                    subject.bankAccounts.length === 0
                      ? {
                          label: 'subject.text.no_bank_accounts',
                        }
                      : {
                          columns: [
                            'subject.field.bank_account_number',
                            'subject.field.bank_account_holder',
                            'subject.field.bank_account_notes',
                          ],
                          rows: subject.bankAccounts.map((entry) => [
                            entry.referenceCode,
                            entry.accountHolder,
                            entry.notes,
                          ]),
                        },
                },
                {
                  label: 'subject.section_title.split_payment',
                  value: [
                    {
                      label: 'subject.field.tax_status_split_payment',
                      value: !!subject.taxStatusSplitPayment,
                    },
                    {
                      label: 'subject.field.tax_status_split_payment_since',
                      value: subject.taxStatusSplitPayment?.since,
                    },
                    {
                      label: 'subject.field.tax_status_split_payment_until',
                      value: subject.taxStatusSplitPayment?.until,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(3)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="subject.tab.documents"
              items={[
                {
                  label: 'subject.section_title.identity_document',
                  value:
                    subject.documents.identities.length === 0 ? (
                      {
                        label: 'subject.text.no_identity_documents',
                      }
                    ) : (
                      <DocumentFieldTable
                        fieldsConfig={getSubjectIdentityDocumentFieldsConfig()}
                        rows={subject.documents.identities}
                      />
                    ),
                },
                {
                  label: 'subject.section_title.other_documents',
                  value:
                    subject.documents.others.length === 0 ? (
                      {
                        label: 'subject.text.no_other_documents',
                      }
                    ) : (
                      <DocumentFieldTable
                        fieldsConfig={getSubjectOtherDocumentFieldsConfig()}
                        rows={subject.documents.others}
                      />
                    ),
                },
              ]}
              onEdit={handleEdit(4)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="subject.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
