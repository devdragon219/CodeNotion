import { ParseKeys } from 'i18next';

import { FeatureGroup } from '../enums/FeatureGroup';
import { RawFeature } from '../enums/RawFeature';
import { Feature } from '../interfaces/Feature';

export const RAW_FEATURES = Object.values(RawFeature);

export const UNSUPPORTED_RAW_FEATURES = import.meta.env.VITE_UNSUPPORTED_RAW_FEATURES?.split(',') ?? [];
export const UNUSED_RAW_FEATURES = [
  RawFeature.ANAG_SUBJECT_CATEGORY,
  RawFeature.PROP_REGISTRATION_OFFICES,
  RawFeature.COMMON_CITIES,
  RawFeature.ADMIN_SETTINGS,
  RawFeature.ECON_TAX_CREDIT_BASE,
  RawFeature.FCLT_SERVICE,
] as const;

export const FEATURES = RAW_FEATURES.filter((feature) => !(feature in UNUSED_RAW_FEATURES));

export const FEATURE_GROUP_NAMES: Record<FeatureGroup, ParseKeys> = {
  [FeatureGroup.Registry]: 'core.feature.registry.title',
  [FeatureGroup.RealEstate]: 'core.feature.real_estate.title',
  [FeatureGroup.Common]: 'core.feature.common.title',
  [FeatureGroup.AssetManagement]: 'core.feature.asset_management.title',
  [FeatureGroup.Repository]: 'core.feature.repository.title',
  [FeatureGroup.EnergyManagement]: 'core.feature.energy_management.title',
  [FeatureGroup.Maintenance]: 'core.feature.maintenance.title',
  [FeatureGroup.System]: 'core.feature.system.title',
} as const;

export const FEATURE_NAMES: Record<Feature, ParseKeys> = {
  [RawFeature.ANAG_SUBJECT_BASE]: 'core.feature.registry.subjects',
  [RawFeature.ANAG_SUBJECT_ORGUNIT]: 'core.feature.registry.org_units',
  [RawFeature.ASST_ESTATE_BASE]: 'core.feature.real_estate.estates',
  [RawFeature.ASST_ESTATE_CATALOGUE]: 'core.feature.real_estate.estates_catalogue',
  [RawFeature.ASST_ESTATEUNIT_BASE]: 'core.feature.real_estate.estate_units',
  [RawFeature.ASST_ESTATEUNIT_VARIATION]: 'core.feature.real_estate.estate_units_variations',
  [RawFeature.ASST_CADASTRALUNIT_BASE]: 'core.feature.real_estate.cadastral_units',
  [RawFeature.ASST_CATALOGUE_CONFIG]: 'core.feature.real_estate.catalogue_config',
  [RawFeature.ASST_CADASTRAL_LAND_CATEGORY]: 'core.feature.real_estate.cadastral_land_categories',
  [RawFeature.ASST_ASSET_TAX_BASE]: 'core.feature.real_estate.asset_taxes',
  [RawFeature.COMMON_VATRATES]: 'core.feature.common.vat_rates',
  [RawFeature.COMMON_INTERESTRATES]: 'core.feature.common.interest_rates',
  [RawFeature.COMMON_ACCOUNTINGITEMS]: 'core.feature.common.accounting_items',
  [RawFeature.COMMON_BILLITEMTYPES]: 'core.feature.common.bill_item_types',
  [RawFeature.COMMON_REVALUATIONDATA]: 'core.feature.common.revaluation_data',
  [RawFeature.COMMON_TAX_RATES]: 'core.feature.common.tax_rates',
  [RawFeature.COMMON_REPORT_GENERATORS]: 'core.feature.common.report_generators',
  [RawFeature.DOCUMENTS_BASE]: 'core.feature.repository.documents',
  [RawFeature.PROP_CONTRACT_BASE]: 'core.feature.asset_management.contracts',
  [RawFeature.PROP_CONTRACT_TYPES]: 'core.feature.asset_management.contract_types',
  [RawFeature.PROP_BILL_BASE]: 'core.feature.asset_management.bills',
  [RawFeature.PROP_ADMINISTRATION_BASE]: 'core.feature.asset_management.administration',
  [RawFeature.PROP_REGISTRY_COMMUNICATION]: 'core.feature.asset_management.registry_communications',
  [RawFeature.PROP_REGISTRATION_PAYMENT]: 'core.feature.asset_management.registration_payments',
  [RawFeature.NRGY_TYPE_BASE]: 'core.feature.energy_management.utility_types',
  [RawFeature.NRGY_SERVICE_BASE]: 'core.feature.energy_management.utility_services',
  [RawFeature.NRGY_COSTCHARGE_BASE]: 'core.feature.energy_management.cost_charges',
  [RawFeature.ADMIN_USERS_AND_GROUPS]: 'core.feature.system.permissions',
  [RawFeature.FCLT_ESTATE_UNIT_GROUP_BASE]: 'core.feature.maintenance.estate_unit_groups',
  [RawFeature.FCLT_CONTRACT_BASE]: 'core.feature.maintenance.facility_contracts',
  [RawFeature.FCLT_CONTRACT_TEMPLATES]: 'core.feature.maintenance.facility_contract_templates',
  [RawFeature.FCLT_CONTRACT_TYPES]: 'core.feature.maintenance.facility_contract_types',
  [RawFeature.FCLT_SLA_BASE]: 'core.feature.maintenance.slas',
  [RawFeature.FCLT_CONFIG]: 'core.feature.maintenance.config',
  [RawFeature.FCLT_PENALTY_BASE]: 'core.feature.maintenance.penalties',
  [RawFeature.FCLT_PRICE_LIST_BASE]: 'core.feature.maintenance.price_lists',
  [RawFeature.FCLT_PRICE_LIST_ARTICLES]: 'core.feature.maintenance.price_list_articles',
  [RawFeature.FCLT_TICKET]: 'core.feature.maintenance.tickets',
  [RawFeature.FCLT_SERVICE_CATEGORY]: 'core.feature.maintenance.service_categories',
  [RawFeature.ADMIN_AUDIT_LOG]: 'core.feature.system.audit_events',
  [RawFeature.ADMIN_CONFIG]: 'core.feature.system.configs',
} as const;
