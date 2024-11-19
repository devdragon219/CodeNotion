import { Grid2 } from '@mui/material';
import {
  DocumentFieldTable,
  RecapSection,
  RecapSectionItem,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { getDefaultDocumentFieldsConfig, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { calcContractBillingInstallment } from '../../../../utils/contract/calcContractBillingInstallment';
import { calcRegistrationTaxStampAmount } from '../../../../utils/contract/calcRegistrationTaxStampAmount';
import { getRegistrationTaxAppliedRate } from '../../../../utils/contract/getRegistrationTaxAppliedRate';
import { getSubjectTaxIdOrVatNumber } from '../../../../utils/subject/subjectUtils';
import { ContractRecapStepProps } from './Recap.types';

export const ContractRecapStep = ({
  contract,
  isContractActive,
  isContractSublocated,
  onBack,
  onEdit,
  onSave,
}: ContractRecapStepProps) => {
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
    onSave(contract);
  }, [contract, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="contract.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.general_data"
              items={[
                {
                  grid: 4,
                  label: 'contract.field.contract_code',
                  value: contract.internalCode,
                },
                {
                  grid: 4,
                  label: 'contract.field.external_code',
                  value: contract.externalCode,
                },
                {
                  grid: 4,
                  label: 'contract.field.contract_status',
                  value: contract.status ? t(`common.enum.entry_status.${contract.status}`) : null,
                },
                {
                  grid: 4,
                  label: 'contract.field.management_subject',
                  value: contract.managementSubject?.name,
                },
                {
                  grid: 4,
                  label: 'contract.field.contract_type',
                  value: contract.contractType?.description,
                },
                {
                  grid: 4,
                  label: 'contract.field.contract_reason',
                  value: contract.reason ? t(`common.enum.reason.${contract.reason}`) : null,
                },
                {
                  grid: 4,
                  label: 'contract.field.agreement_date',
                  value: contract.agreementDate,
                },
                {
                  grid: 4,
                  label: 'contract.field.effect_date',
                  value: contract.effectStartDate,
                },
                {
                  grid: 4,
                  label: 'contract.field.last_renewal_date',
                  value: contract.lastRenewalStartDate,
                },
                {
                  label: 'contract.section_title.expirations',
                  value: [
                    {
                      grid: 4,
                      label: 'contract.field.first_term_duration',
                      value: contract.firstTermDurationMonths,
                    },
                    {
                      grid: 4,
                      label: 'contract.field.second_term_duration',
                      value: contract.secondTermDurationMonths,
                    },
                    {
                      grid: 4,
                      label: 'contract.field.first_term_expiration',
                      value: contract.firstTermExpirationDate,
                    },
                    {
                      grid: 4,
                      label: 'contract.field.second_term_expiration',
                      value: contract.secondTermExpirationDate,
                    },
                    {
                      grid: 4,
                      label: 'contract.field.anytime_termination_months',
                      value: contract.anytimeTerminationWarningMonths,
                    },
                    {
                      grid: 4,
                      label: 'contract.field.non_renewal_months',
                      value: contract.nonRenewalWarningMonths,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          {isContractSublocated && (
            <Grid2 size={12}>
              <RecapSection
                title="contract.tab.sublocated_data"
                items={[
                  {
                    grid: 4,
                    label: 'contract.field.contract_code',
                    value: contract.sublocatedContract?.internalCode,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.external_code',
                    value: contract.sublocatedContract?.externalCode,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.contract_status',
                    value: contract.sublocatedContract?.status
                      ? t(`common.enum.entry_status.${contract.sublocatedContract.status}`)
                      : null,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.management_subject',
                    value: contract.sublocatedContract?.managementSubjectName,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.contract_type',
                    value: contract.sublocatedContract?.contractTypeDescription,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.contract_reason',
                    value: contract.sublocatedContract?.reason
                      ? t(`common.enum.reason.${contract.sublocatedContract.reason}`)
                      : null,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.agreement_date',
                    value: contract.sublocatedContract?.agreementDate,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.effect_date',
                    value: contract.sublocatedContract?.effectStartDate,
                  },
                  {
                    grid: 4,
                    label: 'contract.field.last_renewal_date',
                    value: contract.sublocatedContract?.lastRenewalStartDate,
                  },
                  {
                    label: 'contract.section_title.expirations',
                    value: [
                      {
                        grid: 4,
                        label: 'contract.field.first_term_duration',
                        value: contract.sublocatedContract?.firstTermDurationMonths,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.second_term_duration',
                        value: contract.sublocatedContract?.secondTermDurationMonths,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.first_term_expiration',
                        value: contract.sublocatedContract?.firstTermExpirationDate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.second_term_expiration',
                        value: contract.sublocatedContract?.secondTermExpirationDate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.anytime_termination_months',
                        value: contract.sublocatedContract?.anytimeTerminationWarningMonths,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.non_renewal_months',
                        value: contract.sublocatedContract?.nonRenewalWarningMonths,
                      },
                    ],
                  },
                ]}
                onEdit={handleEdit(1)}
              />
            </Grid2>
          )}
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.billing"
              items={[
                {
                  grid: 4,
                  label: 'contract.field.billing_start_date',
                  value: contract.billing.startDate,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_after_term',
                  value: contract.billing.afterTerm,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_recover_after_suspension',
                  value: contract.recoverBillsAfterSuspension,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_align_to_calendar_year',
                  value: contract.billing.alignedToCalendarYear,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_applies_base_fee',
                  value: contract.billing.appliesBaseFee,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_base_fee',
                  value: parseNumberToCurrency(contract.billing.baseFee, language),
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_period',
                  value: contract.billing.period ? t(`common.enum.billing_period.${contract.billing.period}`) : null,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_installment',
                  value: calcContractBillingInstallment(contract.billing.baseFee, contract.billing.period),
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_with_stamp_tax',
                  value: contract.billing.withStampTax
                    ? t(`common.enum.automatic_boolean.${contract.billing.withStampTax}`)
                    : null,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_vat_rate_type',
                  value: contract.billing.vatRateType
                    ? t(`common.enum.vat_rate_type.${contract.billing.vatRateType}`)
                    : null,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_vat_rate',
                  value: contract.billing.vatRateType
                    ? t(`common.enum.vat_rate.${contract.billing.vatRateType}`)
                    : null,
                },
                {
                  grid: 4,
                  label: 'contract.field.billing_with_split_payment',
                  value: contract.billing.withSplitPayment,
                },
                {
                  grid: 4,
                  label: 'contract.field.notes',
                  value: contract.notes,
                },
                {
                  grid: 8,
                  label: 'contract.field.billing_notes',
                  value: contract.billing.notes,
                },
              ]}
              onEdit={handleEdit(isContractSublocated ? 2 : 1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title={`contract.tab.estate${isContractActive ? '_sub_' : '_'}units`}
              items={[
                {
                  value: {
                    columns: [
                      `contract.field.located_unit_estate${isContractActive ? '_sub_' : '_'}unit_code`,
                      'contract.field.located_unit_estate_unit_name',
                      'contract.field.located_unit_estate_unit_address',
                      'contract.field.located_unit_main_unit',
                      'contract.field.located_unit_registry_update',
                      'contract.field.located_unit_partial_location',
                      'contract.field.located_unit_surface',
                    ],
                    rows: contract.locatedUnits.map((locatedUnit) => [
                      isContractActive ? locatedUnit.estateSubUnit?.internalCode : locatedUnit.estateUnit?.internalCode,
                      isContractActive ? locatedUnit.estateSubUnit?.estateUnit.name : locatedUnit.estateUnit?.name,
                      isContractActive
                        ? parseAddressToString(locatedUnit.estateSubUnit?.estateUnit.address, language)
                        : parseAddressToString(locatedUnit.estateUnit?.address, language),
                      locatedUnit.isMainUnit,
                      locatedUnit.isRegistryUpdateEnabled,
                      locatedUnit.isPartialLocation,
                      locatedUnit.surfaceSqM,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(isContractSublocated ? 3 : 2)}
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
                    rows: contract.counterparts.map((counterpart) => [
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
              onEdit={handleEdit(isContractSublocated ? 4 : 3)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title={`contract.tab.transactors_${isContractActive ? 'notices' : 'warrants'}`}
              items={[
                {
                  value: {
                    columns: [
                      'contract.field.subject_code',
                      'contract.field.subject_name',
                      'contract.field.subject_tax_id_or_vat_number',
                      'contract.field.transactor_percent',
                      'contract.field.transactor_since',
                      'contract.field.transactor_type',
                      'contract.field.transactor_address',
                      'contract.field.transactor_invoice_address',
                      `contract.field.transactor_subject_${isContractActive ? 'invoiced' : 'invoicing'}`,
                    ],
                    rows: contract.transactors.map((transactor) => [
                      transactor.subject?.internalCode,
                      transactor.subject?.name,
                      getSubjectTaxIdOrVatNumber(transactor.subject),
                      transactor.transactionSharePercent,
                      transactor.since,
                      transactor.transactorType ? t(`common.enum.payment_type.${transactor.transactorType}`) : null,
                      parseAddressToString(transactor.address, language),
                      parseAddressToString(transactor.invoiceAddress, language),
                      transactor.isInvoiced,
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(isContractSublocated ? 5 : 4)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.security_deposits"
              items={[
                {
                  label: 'contract.field.security_deposit_available',
                  value: contract.securityDeposits.length !== 0,
                },
                ...(contract.securityDeposits.length !== 0
                  ? [
                      {
                        value: {
                          columns: [
                            'contract.field.security_deposit_type',
                            'contract.field.security_deposit_since',
                            'contract.field.security_deposit_amount',
                            'contract.field.security_deposit_until',
                            'contract.field.security_deposit_surety_subject',
                            'contract.field.security_deposit_surety_renewable',
                          ],
                          rows: contract.securityDeposits.map((securityDeposit) => [
                            securityDeposit.securityDepositType
                              ? t(`common.enum.security_deposit_type.${securityDeposit.securityDepositType}`)
                              : null,
                            securityDeposit.since,
                            parseNumberToCurrency(securityDeposit.baseAmount, language),
                            securityDeposit.until,
                            securityDeposit.suretySubject?.name,
                            securityDeposit.isSuretyRenewable,
                          ]),
                        },
                      } as RecapSectionItem,
                    ]
                  : []),
              ]}
              onEdit={handleEdit(isContractSublocated ? 6 : 5)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.registration_tax"
              items={[
                {
                  grid: isContractActive ? 4 : 12,
                  label: 'contract.field.registration_tax_applied',
                  value: contract.registrationTax.isRegistrationTaxApplied,
                },
                ...(isContractActive
                  ? ([
                      {
                        grid: 8,
                        label: 'contract.field.registration_tax_takeover_subject',
                        value: contract.registrationTax.isTakeoverFromPreviousSubject,
                      },
                    ] as RecapSectionItem[])
                  : []),
                ...(contract.registrationTax.isRegistrationTaxApplied
                  ? ([
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_payment_type',
                        value: contract.registrationTax.paymentType
                          ? t(`common.enum.registration_tax_payment_type.${contract.registrationTax.paymentType}`)
                          : null,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_rli_mode',
                        value: contract.registrationTax.isRliModeEnabled,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_accounting_managed',
                        value: contract.registrationTax.isAccountingManaged,
                      },
                      ...(contract.registrationTax.isRliModeEnabled
                        ? [
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_rli_mode',
                              value: contract.registrationTax.incomeTypeRli
                                ? t(
                                    `common.enum.registration_tax_income_type_rli.${contract.registrationTax.incomeTypeRli}`,
                                  )
                                : null,
                            },
                          ]
                        : [
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_income_type',
                              value: contract.registrationTax.incomeType
                                ? t(`common.enum.registration_tax_income_type.${contract.registrationTax.incomeType}`)
                                : null,
                            },
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_serial_number',
                              value: contract.registrationTax.registrationSerialNumber,
                            },
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_number',
                              value: contract.registrationTax.registrationNumber,
                            },
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_year',
                              value: contract.registrationTax.registrationYear,
                            },
                          ]),
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_applied_rate_rli',
                        value: getRegistrationTaxAppliedRate(
                          contract.registrationTax.isRliModeEnabled,
                          contract.registrationTax.incomeType,
                          contract.registrationTax.incomeTypeRli,
                        ),
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_contract_code',
                        value: contract.registrationTax.contractRegistrationCode,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_office_city',
                        value: contract.registrationTax.registrationOffice?.description,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_office_county',
                        value: contract.registrationTax.registrationOffice?.countyName,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_office_code',
                        value: contract.registrationTax.registrationOffice?.externalCode,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_taxable_percent',
                        value: contract.registrationTax.taxableRateRatioPercent,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_tenant_percent',
                        value: contract.registrationTax.tenantTaxSharePercent,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_first_registration_period',
                        value: contract.registrationTax.firstRegistrationPeriod
                          ? t(`common.enum.registration_tax_period.${contract.registrationTax.firstRegistrationPeriod}`)
                          : null,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_first_registration_date',
                        value: contract.registrationTax.firstRegistrationDate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_first_online_registration_date',
                        value: contract.registrationTax.firstOnlineRegistrationDate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_last_payment_date',
                        value: contract.registrationTax.lastPaymentDate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_last_online_payment_date',
                        value: contract.registrationTax.lastOnlinePaymentDate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_exemption',
                        value: contract.registrationTax.exemption
                          ? t(`common.enum.registration_tax_exemption.${contract.registrationTax.exemption}`)
                          : null,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_resolution_amount',
                        value: parseNumberToCurrency(contract.registrationTax.transferResolutionAmount, language),
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_special_case',
                        value: contract.registrationTax.specialCase
                          ? t(`common.enum.registration_tax_special_case.${contract.registrationTax.specialCase}`)
                          : null,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_number_of_pages',
                        value: contract.registrationTax.numberOfPages,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_number_of_copies',
                        value: contract.registrationTax.numberOfCopies,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_stamp_amount',
                        value: parseNumberToCurrency(
                          calcRegistrationTaxStampAmount(
                            contract.registrationTax.numberOfPages,
                            contract.registrationTax.numberOfCopies,
                          ),
                          language,
                        ),
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_stamp_percent',
                        value: contract.registrationTax.tenantShareOfStampTaxPercent,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.registration_tax_voluntary_sanction_applied',
                        value: contract.registrationTax.isVoluntarySanctionApplied,
                      },
                      ...(contract.registrationTax.isTakeoverFromPreviousSubject
                        ? [
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_takeover_date',
                              value: contract.registrationTax.takeoverDate,
                            },
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_takeover_type',
                              value: contract.registrationTax.takeoverType
                                ? t(`common.enum.takeover_type.${contract.registrationTax.takeoverType}`)
                                : null,
                            },
                            {
                              grid: 4,
                              label: 'contract.field.registration_tax_takeover_subject',
                              value: contract.registrationTax.takeoverLegalRepresentativeSubject?.name,
                            },
                            {
                              value: {
                                columns: [
                                  'contract.field.subject_code',
                                  'contract.field.subject_name',
                                  'contract.field.subject_tax_id_or_vat_number',
                                ],
                                rows: contract.registrationTax.takeoverSubjects.map((takeoverSubject) => [
                                  takeoverSubject.internalCode,
                                  takeoverSubject.name,
                                  getSubjectTaxIdOrVatNumber(takeoverSubject),
                                ]),
                              },
                            },
                          ]
                        : []),
                    ] as RecapSectionItem[])
                  : []),
              ]}
              onEdit={handleEdit(isContractSublocated ? 7 : 6)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.revaluation"
              items={[
                {
                  grid: 12,
                  label: 'contract.field.revaluation_applied',
                  value: contract.revaluation.isRevaluationApplied,
                },
                ...(contract.revaluation.isRevaluationApplied
                  ? ([
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_period_months',
                        value: contract.revaluation.revaluationPeriodMonths,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_absolute',
                        value: contract.revaluation.isAbsoluteRevaluationApplied,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_calculated',
                        value: contract.revaluation.isRevaluationCalculated,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_period_start',
                        value: contract.revaluation.referencePeriodStart,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_period_end',
                        value: contract.revaluation.referencePeriodEnd,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_share_percent',
                        value: contract.revaluation.revaluationSharePercent,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_rate_type',
                        value: contract.revaluation.rateType
                          ? t(`common.enum.revaluation_rate_type.${contract.revaluation.rateType}`)
                          : null,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_base_rate',
                        value: contract.revaluation.baseRevaluationRate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_next_application_date',
                        value: contract.revaluation.nextApplicationDate,
                      },
                      {
                        grid: 4,
                        label: 'contract.field.revaluation_back_history',
                        value: contract.revaluation.isBackHistoryEnabled,
                      },
                    ] as RecapSectionItem[])
                  : []),
              ]}
              onEdit={handleEdit(isContractSublocated ? 8 : 7)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract.tab.documents"
              items={[
                {
                  value:
                    contract.documents.length === 0 ? (
                      {
                        label: 'contract.text.no_documents',
                      }
                    ) : (
                      <DocumentFieldTable fieldsConfig={getDefaultDocumentFieldsConfig()} rows={contract.documents} />
                    ),
                },
              ]}
              onEdit={handleEdit(isContractSublocated ? 8 : 7)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="contract.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
