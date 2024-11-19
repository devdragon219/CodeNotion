// @ts-nocheck
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A coordinate is an array of positions. */
  Coordinates: { input: Array<Scalars['Position']['input']>; output: Array<Scalars['Position']['output']> };
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: { input: string; output: string };
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: string; output: string };
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: number; output: number };
  Geometry: { input: unknown; output: unknown };
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: number; output: number };
  /** A position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element. */
  Position: { input: Array<number>; output: Array<number> };
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: { input: string; output: string };
  UUID: { input: string; output: string };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: File; output: File };
};

export type AccountingItem = {
  __typename?: 'AccountingItem';
  description: Scalars['String']['output'];
  externalCode: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
};

export type AccountingItemFilterInput = {
  and?: InputMaybe<Array<AccountingItemFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<AccountingItemFilterInput>>;
};

export type AccountingItemInput = {
  description: Scalars['String']['input'];
  externalCode: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type AccountingItemMutations = {
  __typename?: 'AccountingItemMutations';
  add: ResultOfAccountingItem;
  delete: Result;
  deleteRange: Result;
  update: ResultOfAccountingItem;
};

export type AccountingItemMutationsAddArgs = {
  input: AccountingItemInput;
};

export type AccountingItemMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type AccountingItemMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type AccountingItemMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: AccountingItemInput;
};

export type AccountingItemQueries = {
  __typename?: 'AccountingItemQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<AccountingItem>;
  listAccountingTypes?: Maybe<ListAccountingTypesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type AccountingItemQueriesCanUseInternalCodeArgs = {
  currentAccountingItemId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type AccountingItemQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<AccountingItemSortInput>>;
  where?: InputMaybe<AccountingItemFilterInput>;
};

export type AccountingItemQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type AccountingItemQueriesListAccountingTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AccountingItemSortInput>>;
  where?: InputMaybe<AccountingItemFilterInput>;
};

export type AccountingItemSortInput = {
  description?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
};

export type ActRegistrationDate = {
  __typename?: 'ActRegistrationDate';
  dateType: RegistrationDateType;
  id: Scalars['Int']['output'];
  value: Scalars['Date']['output'];
};

export type ActRegistrationField = {
  __typename?: 'ActRegistrationField';
  fieldType: RegistrationFieldType;
  id: Scalars['Int']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type ActiveContractMutations = {
  __typename?: 'ActiveContractMutations';
  addTenants: Result;
  takeoverDeadTenant: Result;
  takeoverLandlord: Result;
  takeoverTenants: Result;
  transferTenants: Result;
};

export type ActiveContractMutationsAddTenantsArgs = {
  contractId: Scalars['Int']['input'];
  newCounterpartInputs: Array<ContractVariationNewCounterpartInput>;
  updatedCounterpartInputs: Array<ContractVariationUpdatedCounterpartInput>;
};

export type ActiveContractMutationsTakeoverDeadTenantArgs = {
  contractId: Scalars['Int']['input'];
  deadCounterpartId: Scalars['Int']['input'];
  heirInputs: Array<ContractDeathVariationNewCounterpartInput>;
  updatedCounterpartInputs: Array<ContractVariationUpdatedCounterpartInput>;
};

export type ActiveContractMutationsTakeoverLandlordArgs = {
  contractId: Scalars['Int']['input'];
  legalRepresentativeSubjectId: Scalars['Int']['input'];
  paymentDate: Scalars['Date']['input'];
  successorIds: Array<Scalars['Int']['input']>;
};

export type ActiveContractMutationsTakeoverTenantsArgs = {
  contractId: Scalars['Int']['input'];
  newCounterpartInputs: Array<ContractNoDateNewCounterpartInput>;
  takeoverDate: Scalars['Date']['input'];
  takeoverType: TakeoverType;
  updatedCounterpartInputs: Array<ContractNoDateUpdateCounterpartInput>;
};

export type ActiveContractMutationsTransferTenantsArgs = {
  contractId: Scalars['Int']['input'];
  newCounterpartInputs: Array<ContractNoDateNewCounterpartInput>;
  transferDate: Scalars['Date']['input'];
  updatedCounterpartInputs: Array<ContractNoDateUpdateCounterpartInput>;
};

export type AddOnTriggerChecklistTicketRangeInput = {
  catalogueItemIds: Array<Scalars['Int']['input']>;
  contractId: Scalars['Int']['input'];
  ticketChecklistId: Scalars['Int']['input'];
};

export type AddPriceListArticleInput = {
  catalogueTypeIds: Array<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  measurementUnitId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  priceListId: Scalars['Int']['input'];
  since: Scalars['Date']['input'];
};

export type AddTaxCreditInput = {
  amount: Scalars['Decimal']['input'];
  date: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  managementSubjectId: Scalars['Int']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  taxCode: Scalars['String']['input'];
};

export type Address = {
  __typename?: 'Address';
  addressType: AddressType;
  city?: Maybe<City>;
  cityName?: Maybe<Scalars['String']['output']>;
  cityReference?: Maybe<Scalars['UUID']['output']>;
  countryISO?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  countyName?: Maybe<Scalars['String']['output']>;
  countyReference?: Maybe<Scalars['UUID']['output']>;
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  localPostCode?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  numbering?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
  regionReference?: Maybe<Scalars['UUID']['output']>;
  toponymy?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  addressType: AddressType;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  cityName?: InputMaybe<Scalars['String']['input']>;
  countryISO?: InputMaybe<Scalars['String']['input']>;
  countyName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  localPostCode?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  numbering?: InputMaybe<Scalars['String']['input']>;
  regionName?: InputMaybe<Scalars['String']['input']>;
  toponymy?: InputMaybe<Scalars['String']['input']>;
};

export type AddressSortInput = {
  addressType?: InputMaybe<SortEnumType>;
  cityName?: InputMaybe<SortEnumType>;
  cityReference?: InputMaybe<SortEnumType>;
  countryISO?: InputMaybe<SortEnumType>;
  countryName?: InputMaybe<SortEnumType>;
  countyName?: InputMaybe<SortEnumType>;
  countyReference?: InputMaybe<SortEnumType>;
  creationDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  localPostCode?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  numbering?: InputMaybe<SortEnumType>;
  regionName?: InputMaybe<SortEnumType>;
  regionReference?: InputMaybe<SortEnumType>;
  toponymy?: InputMaybe<SortEnumType>;
};

export enum AddressType {
  BirthLocation = 'BIRTH_LOCATION',
  CareOf = 'CARE_OF',
  Fiscal = 'FISCAL',
  LegalResidential = 'LEGAL_RESIDENTIAL',
  Mailing = 'MAILING',
}

export type AddressTypeOperationFilterInput = {
  eq?: InputMaybe<AsstAddressType>;
  in?: InputMaybe<Array<AsstAddressType>>;
  neq?: InputMaybe<AsstAddressType>;
  nin?: InputMaybe<Array<AsstAddressType>>;
};

export type AdminContactInput = {
  contactId?: InputMaybe<Scalars['Int']['input']>;
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  contactInfoType: ContactInfoType;
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type AdminGroupFeatureInput = {
  canCreate: Scalars['Boolean']['input'];
  canDelete: Scalars['Boolean']['input'];
  canRead: Scalars['Boolean']['input'];
  canUpdate: Scalars['Boolean']['input'];
  feature: Scalars['String']['input'];
};

export type AdminGroupInput = {
  description: Scalars['String']['input'];
  features?: InputMaybe<Array<AdminGroupFeatureInput>>;
  name: Scalars['String']['input'];
};

export type AdminMutations = {
  __typename?: 'AdminMutations';
  addGroup: ResultOfGroup;
  addUser: ResultOfUser;
  addUserToGroup: Scalars['Boolean']['output'];
  deleteByIds: Result;
  deleteGroup: Result;
  deleteGroupsByIds: Result;
  deleteUser: Result;
  removeUserFromGroup: Scalars['Boolean']['output'];
  revokeAllSessions: Result;
  revokeSession: Result;
  setGroupFeature: Scalars['Boolean']['output'];
  setPasswordToUser: Scalars['Boolean']['output'];
  updateConfig: ResultOfConfig;
  updateGroup: ResultOfGroup;
  updateUser: ResultOfUser;
};

export type AdminMutationsAddGroupArgs = {
  groupInput: AdminGroupInput;
};

export type AdminMutationsAddUserArgs = {
  userInput: AdminUserInput;
};

export type AdminMutationsAddUserToGroupArgs = {
  groupId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type AdminMutationsDeleteByIdsArgs = {
  userIds: Array<Scalars['Int']['input']>;
};

export type AdminMutationsDeleteGroupArgs = {
  groupId: Scalars['Int']['input'];
};

export type AdminMutationsDeleteGroupsByIdsArgs = {
  groupsIds: Array<Scalars['Int']['input']>;
};

export type AdminMutationsDeleteUserArgs = {
  userId: Scalars['Int']['input'];
};

export type AdminMutationsRemoveUserFromGroupArgs = {
  groupId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type AdminMutationsRevokeAllSessionsArgs = {
  userId: Scalars['Int']['input'];
};

export type AdminMutationsRevokeSessionArgs = {
  sessionId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type AdminMutationsSetGroupFeatureArgs = {
  feature: AdminGroupFeatureInput;
  groupId: Scalars['Int']['input'];
};

export type AdminMutationsSetPasswordToUserArgs = {
  newPassword: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type AdminMutationsUpdateConfigArgs = {
  function: ConfigFunction;
  name: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AdminMutationsUpdateGroupArgs = {
  groupId: Scalars['Int']['input'];
  groupInput: AdminGroupInput;
};

export type AdminMutationsUpdateUserArgs = {
  userId: Scalars['Int']['input'];
  userInput: AdminUserInput;
};

export type AdminQueries = {
  __typename?: 'AdminQueries';
  canUseUsername: Scalars['Boolean']['output'];
  exportGroupsToExcel: FileUrlOutput;
  exportToExcel: FileUrlOutput;
  group?: Maybe<Group>;
  groupPermissions: Array<PermissionSummary>;
  listAuditEvents?: Maybe<ListAuditEventsConnection>;
  listConfigs: Array<Config>;
  listFeatures: Array<Scalars['String']['output']>;
  listGroup?: Maybe<ListGroupConnection>;
  listUsers?: Maybe<ListUsersConnection>;
  user?: Maybe<User>;
};

export type AdminQueriesCanUseUsernameArgs = {
  currentUserId?: InputMaybe<Scalars['Int']['input']>;
  userName: Scalars['String']['input'];
};

export type AdminQueriesExportGroupsToExcelArgs = {
  order?: InputMaybe<Array<GroupSortInput>>;
  where?: InputMaybe<GroupFilterInput>;
};

export type AdminQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type AdminQueriesGroupArgs = {
  groupId: Scalars['Int']['input'];
};

export type AdminQueriesGroupPermissionsArgs = {
  groupIds: Array<Scalars['Int']['input']>;
};

export type AdminQueriesListAuditEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AuditLogSortInput>>;
  where?: InputMaybe<AuditLogFilterInput>;
};

export type AdminQueriesListConfigsArgs = {
  order?: InputMaybe<Array<ConfigSortInput>>;
  where?: InputMaybe<ConfigFilterInput>;
};

export type AdminQueriesListGroupArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<GroupSortInput>>;
  where?: InputMaybe<GroupFilterInput>;
};

export type AdminQueriesListUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export type AdminQueriesUserArgs = {
  userId: Scalars['Int']['input'];
};

export type AdminUserInput = {
  ceasedDate?: InputMaybe<Scalars['DateTime']['input']>;
  contacts?: InputMaybe<Array<AdminContactInput>>;
  enabledSince?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  groups?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lockedSince?: InputMaybe<Scalars['DateTime']['input']>;
  managementOrgUnits?: InputMaybe<Array<Scalars['Int']['input']>>;
  managementSubjects?: InputMaybe<Array<Scalars['Int']['input']>>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  officeAccess: OfficeAccess;
  passwordConfirmation?: InputMaybe<Scalars['String']['input']>;
  status: UserStatus;
  supplierSubjectId?: InputMaybe<Scalars['Int']['input']>;
  suspensionReason?: InputMaybe<Scalars['String']['input']>;
  type: UserType;
  userName: Scalars['String']['input'];
};

export type Administration = {
  __typename?: 'Administration';
  administrationType: AdministrationType;
  administratorBankAccountId?: Maybe<Scalars['Int']['output']>;
  administratorSubject: ISubject;
  administratorSubjectId: Scalars['Int']['output'];
  bankAccount?: Maybe<BankAccount>;
  estate: Estate;
  estateId: Scalars['Int']['output'];
  externalCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isPaymentDataIncluded: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  paymentType: PaymentType;
  since: Scalars['Date']['output'];
  terms: Array<AdministrationTerm>;
  until?: Maybe<Scalars['Date']['output']>;
};

export type AdministrationFilterInput = {
  administrationSubjectName?: InputMaybe<CustomStringFilterInput>;
  administrationType?: InputMaybe<AdministrationTypeOperationFilterInput>;
  administratorBankAccountId?: InputMaybe<IntOperationFilterInput>;
  administratorSubjectId?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<AdministrationFilterInput>>;
  estateAddress?: InputMaybe<CustomStringFilterInput>;
  estateId?: InputMaybe<IntOperationFilterInput>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isPaymentDataIncluded?: InputMaybe<BooleanOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<AdministrationFilterInput>>;
  paymentType?: InputMaybe<PaymentTypeOperationFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  terms?: InputMaybe<ListFilterInputTypeOfAdministrationTermFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type AdministrationInput = {
  administrationType: AdministrationType;
  administratorBankAccountId?: InputMaybe<Scalars['Int']['input']>;
  administratorSubjectId: Scalars['Int']['input'];
  estateId: Scalars['Int']['input'];
  isPaymentDataIncluded: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentType: PaymentType;
  since: Scalars['Date']['input'];
  until?: InputMaybe<Scalars['Date']['input']>;
};

export type AdministrationMutations = {
  __typename?: 'AdministrationMutations';
  add: ResultOfAdministration__;
  delete: Result;
  deleteRange: Result;
  update: ResultOfAdministration;
};

export type AdministrationMutationsAddArgs = {
  estateId: Scalars['Int']['input'];
  inputs: Array<AdministrationInput>;
};

export type AdministrationMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type AdministrationMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type AdministrationMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: AdministrationInput;
};

export type AdministrationQueries = {
  __typename?: 'AdministrationQueries';
  exportToExcel: FileUrlOutput;
  get?: Maybe<Administration>;
  listAdministrationTerms?: Maybe<ListAdministrationTermsConnection>;
  listAdministrations?: Maybe<ListAdministrationsConnection>;
  listAdministrationsFull: Array<Administration>;
};

export type AdministrationQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<AdministrationSortInput>>;
  where?: InputMaybe<AdministrationFilterInput>;
};

export type AdministrationQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type AdministrationQueriesListAdministrationTermsArgs = {
  administrationId: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AdministrationTermSortInput>>;
  where?: InputMaybe<AdministrationTermFilterInput>;
};

export type AdministrationQueriesListAdministrationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AdministrationSortInput>>;
  where?: InputMaybe<AdministrationFilterInput>;
};

export type AdministrationQueriesListAdministrationsFullArgs = {
  order?: InputMaybe<Array<AdministrationSortInput>>;
  where?: InputMaybe<AdministrationFilterInput>;
};

export type AdministrationSortInput = {
  administrationSubjectName?: InputMaybe<SortEnumType>;
  administrationType?: InputMaybe<SortEnumType>;
  administratorBankAccountId?: InputMaybe<SortEnumType>;
  administratorSubjectId?: InputMaybe<SortEnumType>;
  estateAddress?: InputMaybe<SortEnumType>;
  estateId?: InputMaybe<SortEnumType>;
  estateInternalCode?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPaymentDataIncluded?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  paymentType?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
};

export type AdministrationTerm = {
  __typename?: 'AdministrationTerm';
  administration: Administration;
  expectedAmount: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  installments: Array<TermInstallment>;
  name: Scalars['String']['output'];
  payments: Array<TermGroupedInstallmentPayment>;
  since: Scalars['Date']['output'];
  termType: TermType;
  until: Scalars['Date']['output'];
};

export type AdministrationTermFilterInput = {
  administration?: InputMaybe<AdministrationFilterInput>;
  and?: InputMaybe<Array<AdministrationTermFilterInput>>;
  expectedAmount?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  installments?: InputMaybe<ListFilterInputTypeOfTermInstallmentFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<AdministrationTermFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  termType?: InputMaybe<TermTypeOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type AdministrationTermInput = {
  expectedAmount: Scalars['Decimal']['input'];
  installments: Array<TermInstallmentInput>;
  name: Scalars['String']['input'];
  payments: Array<TermGroupedInstallmentPaymentInput>;
  since: Scalars['Date']['input'];
  termType: TermType;
  until: Scalars['Date']['input'];
};

export type AdministrationTermMutations = {
  __typename?: 'AdministrationTermMutations';
  add: ResultOfAdministrationTerm;
  addInstallmentPayments: Result;
  delete: Result;
  deleteInstallmentPayment: Result;
  deleteRange: Result;
  update: ResultOfAdministrationTerm;
  updateInstallmentPayments: Result;
};

export type AdministrationTermMutationsAddArgs = {
  administrationId: Scalars['Int']['input'];
  input: AdministrationTermInput;
};

export type AdministrationTermMutationsAddInstallmentPaymentsArgs = {
  administrationTermId: Scalars['Int']['input'];
  inputs: Array<InstallmentPaymentInput>;
};

export type AdministrationTermMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type AdministrationTermMutationsDeleteInstallmentPaymentArgs = {
  administrationTermId: Scalars['Int']['input'];
  installmentPaymentId: Scalars['Int']['input'];
};

export type AdministrationTermMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type AdministrationTermMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: AdministrationTermInput;
};

export type AdministrationTermMutationsUpdateInstallmentPaymentsArgs = {
  administrationTermId: Scalars['Int']['input'];
  input: InstallmentPaymentInput;
  installmentPaymentIds: Array<Scalars['Int']['input']>;
};

export type AdministrationTermQueries = {
  __typename?: 'AdministrationTermQueries';
  get?: Maybe<AdministrationTerm>;
  groupedPayments: Array<TermGroupedInstallmentPayment>;
};

export type AdministrationTermQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type AdministrationTermQueriesGroupedPaymentsArgs = {
  administrationTermId: Scalars['Int']['input'];
};

export type AdministrationTermSortInput = {
  administration?: InputMaybe<AdministrationSortInput>;
  expectedAmount?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  termType?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
};

export enum AdministrationType {
  BuildingComplex = 'BUILDING_COMPLEX',
  Concierge = 'CONCIERGE',
  Generic = 'GENERIC',
  Heating = 'HEATING',
  HeatingProvider = 'HEATING_PROVIDER',
  Owner = 'OWNER',
  RentGeneral = 'RENT_GENERAL',
  ServiceProvider = 'SERVICE_PROVIDER',
}

export type AdministrationTypeOperationFilterInput = {
  eq?: InputMaybe<AdministrationType>;
  in?: InputMaybe<Array<AdministrationType>>;
  neq?: InputMaybe<AdministrationType>;
  nin?: InputMaybe<Array<AdministrationType>>;
};

/** A connection to a list of items. */
export type AllDocumentsConnection = {
  __typename?: 'AllDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AllDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<DocumentRow>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type AllDocumentsEdge = {
  __typename?: 'AllDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: DocumentRow;
};

export type AmountUpdatedQuoteHistoryEntry = QuoteHistoryEntry & {
  __typename?: 'AmountUpdatedQuoteHistoryEntry';
  id: Scalars['Int']['output'];
  newAmount?: Maybe<Scalars['Decimal']['output']>;
  oldAmount?: Maybe<Scalars['Decimal']['output']>;
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION',
}

export type ApprovedAmountUpdatedQuoteHistoryEntry = QuoteHistoryEntry & {
  __typename?: 'ApprovedAmountUpdatedQuoteHistoryEntry';
  id: Scalars['Int']['output'];
  newApprovedAmount?: Maybe<Scalars['Decimal']['output']>;
  oldApprovedAmount?: Maybe<Scalars['Decimal']['output']>;
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type ArticlePricePeriod = {
  __typename?: 'ArticlePricePeriod';
  id: Scalars['Int']['output'];
  price: Scalars['Decimal']['output'];
  since: Scalars['Date']['output'];
  until?: Maybe<Scalars['Date']['output']>;
};

export type ArticlePricePeriodFilterInput = {
  and?: InputMaybe<Array<ArticlePricePeriodFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ArticlePricePeriodFilterInput>>;
  price?: InputMaybe<DecimalOperationFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type ArticlePricePeriodInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  price: Scalars['Decimal']['input'];
  since: Scalars['Date']['input'];
  until?: InputMaybe<Scalars['Date']['input']>;
};

export enum AssetNature {
  Building = 'BUILDING',
  Land = 'LAND',
  Undefined = 'UNDEFINED',
}

export type AssetNatureOperationFilterInput = {
  eq?: InputMaybe<AssetNature>;
  in?: InputMaybe<Array<AssetNature>>;
  neq?: InputMaybe<AssetNature>;
  nin?: InputMaybe<Array<AssetNature>>;
};

export type AssetTaxCalculation = {
  __typename?: 'AssetTaxCalculation';
  cadastralUnit: CadastralUnit;
  expectedInstallments: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  installments: Array<AssetTaxPayment>;
  taxCalculator: Scalars['String']['output'];
  taxCalculatorId: Scalars['UUID']['output'];
  totalAmount: Scalars['Decimal']['output'];
  year: Scalars['Int']['output'];
};

export type AssetTaxCalculationFilterInput = {
  and?: InputMaybe<Array<AssetTaxCalculationFilterInput>>;
  cadastralUnit?: InputMaybe<CadastralUnitFilterInput>;
  expectedInstallments?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  installments?: InputMaybe<ListFilterInputTypeOfAssetTaxPaymentFilterInput>;
  or?: InputMaybe<Array<AssetTaxCalculationFilterInput>>;
  taxCalculator?: InputMaybe<CustomStringFilterInput>;
  taxCalculatorId?: InputMaybe<UuidOperationFilterInput>;
  totalAmount?: InputMaybe<DecimalOperationFilterInput>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type AssetTaxCalculationSortInput = {
  cadastralUnit?: InputMaybe<CadastralUnitSortInput>;
  expectedInstallments?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  taxCalculator?: InputMaybe<SortEnumType>;
  taxCalculatorId?: InputMaybe<SortEnumType>;
  totalAmount?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type AssetTaxDetailEstateItem = {
  __typename?: 'AssetTaxDetailEstateItem';
  address: AsstAddress;
  estateInternalCode?: Maybe<Scalars['String']['output']>;
  managementSubjectId: Scalars['Int']['output'];
  subRows: Array<AssetTaxDetailEstateUnitItem>;
  totalActualizedCadastralIncome: Scalars['Decimal']['output'];
  totalAmountPaid: Scalars['Decimal']['output'];
  totalBaseTaxableAmount: Scalars['Decimal']['output'];
  totalGrossCadastralIncome: Scalars['Decimal']['output'];
  year: Scalars['Int']['output'];
};

export type AssetTaxDetailEstateItemFilterInput = {
  address?: InputMaybe<IAddressFilterInput>;
  and?: InputMaybe<Array<AssetTaxDetailEstateItemFilterInput>>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<AssetTaxDetailEstateItemFilterInput>>;
  subRows?: InputMaybe<ListAssetTaxDetailEstateUnitItemFilterTypeFilterInput>;
  totalActualizedCadastralIncome?: InputMaybe<DecimalOperationFilterInput>;
  totalAmountPaid?: InputMaybe<DecimalOperationFilterInput>;
  totalBaseTaxableAmount?: InputMaybe<DecimalOperationFilterInput>;
  totalGrossCadastralIncome?: InputMaybe<DecimalOperationFilterInput>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type AssetTaxDetailEstateUnitItem = {
  __typename?: 'AssetTaxDetailEstateUnitItem';
  actualizedCadastralIncome: Scalars['Decimal']['output'];
  address: AsstAddress;
  amountPaid: Scalars['Decimal']['output'];
  baseTaxableAmount: Scalars['Decimal']['output'];
  cadastralCoordinates: Array<CadastralCoordinates>;
  cadastralUnitIncome?: Maybe<CadastralUnitIncome>;
  cadastralUnitTaxConfig?: Maybe<CadastralUnitTaxConfig>;
  estate: Estate;
  estateUnitInternalCode?: Maybe<Scalars['String']['output']>;
  estateUnitOwnershipPercent?: Maybe<Scalars['Float']['output']>;
  grossCadastralIncome: Scalars['Decimal']['output'];
  year: Scalars['Int']['output'];
};

export type AssetTaxDetailEstateUnitItemFilterInput = {
  actualizedCadastralIncome?: InputMaybe<DecimalOperationFilterInput>;
  address?: InputMaybe<IAddressFilterInput>;
  amountPaid?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<AssetTaxDetailEstateUnitItemFilterInput>>;
  baseTaxableAmount?: InputMaybe<DecimalOperationFilterInput>;
  cadastralCoordinates?: InputMaybe<ListCadastralCoordinatesFilterTypeFilterInput>;
  cadastralUnitIncome?: InputMaybe<CadastralUnitIncomeFilterInput>;
  cadastralUnitTaxConfig?: InputMaybe<CadastralUnitTaxConfigFilterInput>;
  estateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  estateUnitOwnershipPercent?: InputMaybe<FloatOperationFilterInput>;
  grossCadastralIncome?: InputMaybe<DecimalOperationFilterInput>;
  or?: InputMaybe<Array<AssetTaxDetailEstateUnitItemFilterInput>>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type AssetTaxDetailRow = {
  __typename?: 'AssetTaxDetailRow';
  address: AsstAddress;
  cityName?: Maybe<Scalars['String']['output']>;
  estateUnitsCount: Scalars['Int']['output'];
  estatesCount: Scalars['Int']['output'];
  managementSubjectName?: Maybe<Scalars['String']['output']>;
  subRows: Array<AssetTaxDetailEstateItem>;
  year: Scalars['Int']['output'];
};

export type AssetTaxDetailRowFilterInput = {
  address?: InputMaybe<IAddressFilterInput>;
  and?: InputMaybe<Array<AssetTaxDetailRowFilterInput>>;
  cityName?: InputMaybe<CustomStringFilterInput>;
  estateUnitsCount?: InputMaybe<IntOperationFilterInput>;
  estatesCount?: InputMaybe<IntOperationFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<AssetTaxDetailRowFilterInput>>;
  subRows?: InputMaybe<ListAssetTaxDetailEstateItemFilterTypeFilterInput>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type AssetTaxDetailRowSortInput = {
  cityName?: InputMaybe<SortEnumType>;
  estateUnitsCount?: InputMaybe<SortEnumType>;
  estatesCount?: InputMaybe<SortEnumType>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type AssetTaxGroupedRow = {
  __typename?: 'AssetTaxGroupedRow';
  assetTaxCalculation: AssetTaxCalculation;
  expectedDueDate?: Maybe<Scalars['Date']['output']>;
  lastUpdate?: Maybe<Scalars['Date']['output']>;
  managementSubject?: Maybe<Scalars['String']['output']>;
  managementSubjectId: Scalars['Int']['output'];
  payments?: Maybe<Array<AssetTaxPayment>>;
  totalAmount?: Maybe<Scalars['Decimal']['output']>;
  totalTaxableAmount?: Maybe<Scalars['Decimal']['output']>;
  year: Scalars['Int']['output'];
};

export type AssetTaxGroupedRowFilterInput = {
  and?: InputMaybe<Array<AssetTaxGroupedRowFilterInput>>;
  assetTaxCalculation?: InputMaybe<AssetTaxCalculationFilterInput>;
  expectedDueDate?: InputMaybe<DateOperationFilterInput>;
  lastUpdate?: InputMaybe<DateOperationFilterInput>;
  managementSubject?: InputMaybe<CustomStringFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<AssetTaxGroupedRowFilterInput>>;
  payments?: InputMaybe<ListFilterInputTypeOfAssetTaxPaymentFilterInput>;
  totalAmount?: InputMaybe<DecimalOperationFilterInput>;
  totalTaxableAmount?: InputMaybe<DecimalOperationFilterInput>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type AssetTaxGroupedRowSortInput = {
  assetTaxCalculation?: InputMaybe<AssetTaxCalculationSortInput>;
  expectedDueDate?: InputMaybe<SortEnumType>;
  lastUpdate?: InputMaybe<SortEnumType>;
  managementSubject?: InputMaybe<SortEnumType>;
  managementSubjectId?: InputMaybe<SortEnumType>;
  totalAmount?: InputMaybe<SortEnumType>;
  totalTaxableAmount?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type AssetTaxMutations = {
  __typename?: 'AssetTaxMutations';
  setDefinitive: ResultOfIEnumerableOfAssetTaxPayment;
  setIssueOverridden: ResultOfIEnumerableOfAssetTaxCalculation;
};

export type AssetTaxMutationsSetDefinitiveArgs = {
  taxCalculatorId: Scalars['UUID']['input'];
  taxPaymentIds: Array<Scalars['Int']['input']>;
};

export type AssetTaxMutationsSetIssueOverriddenArgs = {
  expectedDueDate: Scalars['Date']['input'];
  inputValues: Array<KeyValuePairOfInt32AndBooleanInput>;
  managementSubjectId: Scalars['Int']['input'];
  taxCalculatorId: Scalars['UUID']['input'];
  year: Scalars['Int']['input'];
};

export type AssetTaxPayment = {
  __typename?: 'AssetTaxPayment';
  actualizedCadastralIncome: Scalars['Decimal']['output'];
  amountPaid: Scalars['Decimal']['output'];
  assetTaxCalculation?: Maybe<AssetTaxCalculation>;
  baseTaxableAmount: Scalars['Decimal']['output'];
  creditedAmount?: Maybe<Scalars['Decimal']['output']>;
  date: Scalars['Date']['output'];
  debitedAmount: Scalars['Decimal']['output'];
  expectedDueDate: Scalars['Date']['output'];
  grossCadastralIncome: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  installmentsPaid: Array<Scalars['Int']['output']>;
  isDefinitive: Scalars['Boolean']['output'];
  isIssueOverridden: Scalars['Boolean']['output'];
  issue?: Maybe<CalculationIssue>;
  managementSubjectBankAccountId?: Maybe<Scalars['Int']['output']>;
  managementSubjectId: Scalars['Int']['output'];
  propertyMonths: Scalars['Int']['output'];
  taxName?: Maybe<Scalars['String']['output']>;
};

export type AssetTaxPaymentFilterInput = {
  actualizedCadastralIncome?: InputMaybe<DecimalOperationFilterInput>;
  amountPaid?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<AssetTaxPaymentFilterInput>>;
  assetTaxCalculation?: InputMaybe<AssetTaxCalculationFilterInput>;
  baseTaxableAmount?: InputMaybe<DecimalOperationFilterInput>;
  creditedAmount?: InputMaybe<DecimalOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  debitedAmount?: InputMaybe<DecimalOperationFilterInput>;
  expectedDueDate?: InputMaybe<DateOperationFilterInput>;
  grossCadastralIncome?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  installmentsPaid?: InputMaybe<ListIntOperationFilterInput>;
  isDefinitive?: InputMaybe<BooleanOperationFilterInput>;
  isIssueOverridden?: InputMaybe<BooleanOperationFilterInput>;
  issue?: InputMaybe<NullableOfCalculationIssueOperationFilterInput>;
  managementSubjectBankAccountId?: InputMaybe<IntOperationFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<AssetTaxPaymentFilterInput>>;
  propertyMonths?: InputMaybe<IntOperationFilterInput>;
  taxName?: InputMaybe<CustomStringFilterInput>;
};

export type AssetTaxQueries = {
  __typename?: 'AssetTaxQueries';
  detailGroupedPayments?: Maybe<DetailGroupedPaymentsConnection>;
  exportDetailGroupedPayments: FileUrlOutput;
  exportGroupedPayments: FileUrlOutput;
  fullGroupedPayments: Array<AssetTaxGroupedRow>;
  groupedPayments?: Maybe<GroupedPaymentsConnection>;
  singleGroupedPayment?: Maybe<AssetTaxGroupedRow>;
};

export type AssetTaxQueriesDetailGroupedPaymentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  expectedDueDate: Scalars['Date']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  managementSubjectId: Scalars['Int']['input'];
  order?: InputMaybe<Array<AssetTaxDetailRowSortInput>>;
  taxCalculatorId: Scalars['UUID']['input'];
  where?: InputMaybe<AssetTaxDetailRowFilterInput>;
  year: Scalars['Int']['input'];
};

export type AssetTaxQueriesExportDetailGroupedPaymentsArgs = {
  expectedDueDate: Scalars['Date']['input'];
  managementSubjectId: Scalars['Int']['input'];
  order?: InputMaybe<Array<AssetTaxDetailRowSortInput>>;
  taxCalculatorId: Scalars['UUID']['input'];
  where?: InputMaybe<AssetTaxDetailRowFilterInput>;
  year: Scalars['Int']['input'];
};

export type AssetTaxQueriesExportGroupedPaymentsArgs = {
  currentYear: Scalars['Boolean']['input'];
  order?: InputMaybe<Array<AssetTaxGroupedRowSortInput>>;
  taxCalculatorId: Scalars['UUID']['input'];
  where?: InputMaybe<AssetTaxGroupedRowFilterInput>;
};

export type AssetTaxQueriesFullGroupedPaymentsArgs = {
  currentYear: Scalars['Boolean']['input'];
  order?: InputMaybe<Array<AssetTaxGroupedRowSortInput>>;
  taxCalculatorId: Scalars['UUID']['input'];
  where?: InputMaybe<AssetTaxGroupedRowFilterInput>;
};

export type AssetTaxQueriesGroupedPaymentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  currentYear: Scalars['Boolean']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AssetTaxGroupedRowSortInput>>;
  taxCalculatorId: Scalars['UUID']['input'];
  where?: InputMaybe<AssetTaxGroupedRowFilterInput>;
};

export type AssetTaxQueriesSingleGroupedPaymentArgs = {
  expectedDueDate: Scalars['Date']['input'];
  managementSubjectId: Scalars['Int']['input'];
  taxCalculatorId: Scalars['UUID']['input'];
  year: Scalars['Int']['input'];
};

export type AsstAddress = {
  __typename?: 'AsstAddress';
  addressType: AsstAddressType;
  city?: Maybe<City>;
  cityName?: Maybe<Scalars['String']['output']>;
  cityReference?: Maybe<Scalars['UUID']['output']>;
  countryISO?: Maybe<Scalars['String']['output']>;
  countryName?: Maybe<Scalars['String']['output']>;
  countyName?: Maybe<Scalars['String']['output']>;
  countyReference?: Maybe<Scalars['UUID']['output']>;
  creationDate: Scalars['DateTime']['output'];
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  localPostCode?: Maybe<Scalars['String']['output']>;
  locationLatLon?: Maybe<GeoJsonPointType>;
  notes?: Maybe<Scalars['String']['output']>;
  numbering?: Maybe<Scalars['String']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
  regionReference?: Maybe<Scalars['UUID']['output']>;
  toponymy?: Maybe<Scalars['String']['output']>;
};

export type AsstAddressFilterInput = {
  addressType?: InputMaybe<AddressTypeOperationFilterInput>;
  and?: InputMaybe<Array<AsstAddressFilterInput>>;
  cityName?: InputMaybe<CustomStringFilterInput>;
  cityReference?: InputMaybe<UuidOperationFilterInput>;
  countryISO?: InputMaybe<CustomStringFilterInput>;
  countryName?: InputMaybe<CustomStringFilterInput>;
  countyName?: InputMaybe<CustomStringFilterInput>;
  countyReference?: InputMaybe<UuidOperationFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  localPostCode?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  numbering?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<AsstAddressFilterInput>>;
  regionName?: InputMaybe<CustomStringFilterInput>;
  regionReference?: InputMaybe<UuidOperationFilterInput>;
  toponymy?: InputMaybe<CustomStringFilterInput>;
};

export type AsstAddressInput = {
  addressType: AsstAddressType;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  cityName?: InputMaybe<Scalars['String']['input']>;
  countryISO?: InputMaybe<Scalars['String']['input']>;
  countyName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  localPostCode?: InputMaybe<Scalars['String']['input']>;
  locationLatLon?: InputMaybe<GeoJsonPointInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  numbering?: InputMaybe<Scalars['String']['input']>;
  regionName?: InputMaybe<Scalars['String']['input']>;
  subNumbering?: InputMaybe<Scalars['String']['input']>;
  toponymy?: InputMaybe<Scalars['String']['input']>;
};

export type AsstAddressSortInput = {
  addressType?: InputMaybe<SortEnumType>;
  cityName?: InputMaybe<SortEnumType>;
  cityReference?: InputMaybe<SortEnumType>;
  countryISO?: InputMaybe<SortEnumType>;
  countryName?: InputMaybe<SortEnumType>;
  countyName?: InputMaybe<SortEnumType>;
  countyReference?: InputMaybe<SortEnumType>;
  creationDate?: InputMaybe<SortEnumType>;
  deletionDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  localPostCode?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  numbering?: InputMaybe<SortEnumType>;
  regionName?: InputMaybe<SortEnumType>;
  regionReference?: InputMaybe<SortEnumType>;
  toponymy?: InputMaybe<SortEnumType>;
};

export enum AsstAddressType {
  OtherAddress = 'OTHER_ADDRESS',
  Primary = 'PRIMARY',
}

export type AuditLog = {
  __typename?: 'AuditLog';
  action: Scalars['String']['output'];
  auditData?: Maybe<Scalars['String']['output']>;
  auditDate: Scalars['DateTime']['output'];
  auditUser: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  tablePk: Scalars['String']['output'];
};

export type AuditLogFilterInput = {
  action?: InputMaybe<CustomStringFilterInput>;
  and?: InputMaybe<Array<AuditLogFilterInput>>;
  auditDate?: InputMaybe<DateTimeOperationFilterInput>;
  entityType?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<AuditLogFilterInput>>;
  tablePk?: InputMaybe<CustomStringFilterInput>;
};

export type AuditLogSortInput = {
  action?: InputMaybe<SortEnumType>;
  auditData?: InputMaybe<SortEnumType>;
  auditDate?: InputMaybe<SortEnumType>;
  auditUser?: InputMaybe<SortEnumType>;
  entityType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  tablePk?: InputMaybe<SortEnumType>;
};

export enum AutomaticBoolean {
  Automatic = 'AUTOMATIC',
  False = 'FALSE',
  True = 'TRUE',
}

export type BankAccount = {
  __typename?: 'BankAccount';
  accountHolder?: Maybe<Scalars['String']['output']>;
  bankAccountType: BankAccountType;
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  referenceCode?: Maybe<Scalars['String']['output']>;
  referenceCodeType: BankAccountCodeType;
};

export enum BankAccountCodeType {
  Iban = 'IBAN',
}

export type BankAccountCodeTypeOperationFilterInput = {
  eq?: InputMaybe<BankAccountCodeType>;
  in?: InputMaybe<Array<BankAccountCodeType>>;
  neq?: InputMaybe<BankAccountCodeType>;
  nin?: InputMaybe<Array<BankAccountCodeType>>;
};

export type BankAccountFilterInput = {
  accountHolder?: InputMaybe<CustomStringFilterInput>;
  and?: InputMaybe<Array<BankAccountFilterInput>>;
  bankAccountType?: InputMaybe<BankAccountTypeOperationFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<BankAccountFilterInput>>;
  referenceCode?: InputMaybe<CustomStringFilterInput>;
  referenceCodeType?: InputMaybe<BankAccountCodeTypeOperationFilterInput>;
};

export type BankAccountInput = {
  accountHolder?: InputMaybe<Scalars['String']['input']>;
  bankAccountType: BankAccountType;
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  referenceCode?: InputMaybe<Scalars['String']['input']>;
  referenceCodeType: BankAccountCodeType;
};

export enum BankAccountType {
  Backup = 'BACKUP',
  Main = 'MAIN',
}

export type BankAccountTypeOperationFilterInput = {
  eq?: InputMaybe<BankAccountType>;
  in?: InputMaybe<Array<BankAccountType>>;
  neq?: InputMaybe<BankAccountType>;
  nin?: InputMaybe<Array<BankAccountType>>;
};

export type Bill = {
  __typename?: 'Bill';
  billRows: Array<BillRow>;
  contract?: Maybe<Contract>;
  contractBillingPeriod: BillingPeriod;
  counterpartSubject: ISubject;
  date: Scalars['Date']['output'];
  emissionType: BillEmissionType;
  estateUnit?: Maybe<EstateUnit>;
  estateUnitId?: Maybe<Scalars['Int']['output']>;
  externalExportCode?: Maybe<Scalars['String']['output']>;
  externalSourceCode?: Maybe<Scalars['String']['output']>;
  finalDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  invoiceId?: Maybe<Scalars['Int']['output']>;
  isInvoiced: Scalars['Boolean']['output'];
  isOccupiedWithoutRight: Scalars['Boolean']['output'];
  isTemporary: Scalars['Boolean']['output'];
  mainCounterpartSubjectId: Scalars['Int']['output'];
  since?: Maybe<Scalars['Date']['output']>;
  totalAmount: Scalars['Decimal']['output'];
  transactorPaymentType: PaymentType;
  transactorSubject: ISubject;
  transactorSubjectId: Scalars['Int']['output'];
  until?: Maybe<Scalars['Date']['output']>;
  year: Scalars['Int']['output'];
};

export enum BillEmissionType {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL',
}

export type BillEmissionTypeOperationFilterInput = {
  eq?: InputMaybe<BillEmissionType>;
  in?: InputMaybe<Array<BillEmissionType>>;
  neq?: InputMaybe<BillEmissionType>;
  nin?: InputMaybe<Array<BillEmissionType>>;
};

export type BillFilterInput = {
  and?: InputMaybe<Array<BillFilterInput>>;
  billRows?: InputMaybe<ListFilterInputTypeOfBillRowFilterInput>;
  contract?: InputMaybe<ContractFilterInput>;
  contractBillingPeriod?: InputMaybe<BillingPeriodOperationFilterInput>;
  counterpartSubjectName?: InputMaybe<CustomStringFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  emissionType?: InputMaybe<BillEmissionTypeOperationFilterInput>;
  estateUnitAddress?: InputMaybe<CustomStringFilterInput>;
  estateUnitId?: InputMaybe<IntOperationFilterInput>;
  estateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  externalExportCode?: InputMaybe<CustomStringFilterInput>;
  externalSourceCode?: InputMaybe<CustomStringFilterInput>;
  finalDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  invoiceId?: InputMaybe<IntOperationFilterInput>;
  isInvoiced?: InputMaybe<BooleanOperationFilterInput>;
  isOccupiedWithoutRight?: InputMaybe<BooleanOperationFilterInput>;
  isTemporary?: InputMaybe<BooleanOperationFilterInput>;
  mainCounterpartSubjectId?: InputMaybe<IntOperationFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<BillFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  totalAmount?: InputMaybe<DecimalOperationFilterInput>;
  transactorPaymentType?: InputMaybe<PaymentTypeOperationFilterInput>;
  transactorSubjectId?: InputMaybe<IntOperationFilterInput>;
  transactorSubjectName?: InputMaybe<CustomStringFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type BillFullListOutput = {
  __typename?: 'BillFullListOutput';
  contractId: Scalars['Int']['output'];
  contractInternalCode: Scalars['String']['output'];
  contractManagementSubject: ISubject;
  contractManagementSubjectId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  mainCounterpartSubject: ISubject;
  mainCounterpartSubjectId: Scalars['Int']['output'];
  since?: Maybe<Scalars['Date']['output']>;
};

export type BillInput = {
  billRows: Array<BillRowInput>;
  contractBillingPeriod: BillingPeriod;
  emissionType: BillEmissionType;
  isInvoiced: Scalars['Boolean']['input'];
  isOccupiedWithoutRight: Scalars['Boolean']['input'];
  mainCounterpartSubjectId: Scalars['Int']['input'];
  totalAmount: Scalars['Decimal']['input'];
  transactorPaymentType: PaymentType;
  transactorSubjectId: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type BillItemType = {
  __typename?: 'BillItemType';
  activeExemptVR: VatRate;
  activeExemptVRId: Scalars['Int']['output'];
  activeNonTaxableVR: VatRate;
  activeNonTaxableVRId: Scalars['Int']['output'];
  activeSubjectVR: VatRate;
  activeSubjectVRId: Scalars['Int']['output'];
  administrationVR: VatRate;
  administrationVRId: Scalars['Int']['output'];
  defaultAccountingItem?: Maybe<AccountingItem>;
  defaultAccountingItemId?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isForAdministration: Scalars['Boolean']['output'];
  isForContractCosts: Scalars['Boolean']['output'];
  isForContractFee: Scalars['Boolean']['output'];
  isForTax: Scalars['Boolean']['output'];
  isPositive: Scalars['Boolean']['output'];
  passiveExemptVR: VatRate;
  passiveExemptVRId: Scalars['Int']['output'];
  passiveNonTaxableVR: VatRate;
  passiveNonTaxableVRId: Scalars['Int']['output'];
  passiveSubjectVR: VatRate;
  passiveSubjectVRId: Scalars['Int']['output'];
};

export type BillItemTypeFilterInput = {
  activeExemptVRId?: InputMaybe<IntOperationFilterInput>;
  activeNonTaxableVRId?: InputMaybe<IntOperationFilterInput>;
  activeSubjectVRId?: InputMaybe<IntOperationFilterInput>;
  administrationVRId?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<BillItemTypeFilterInput>>;
  defaultAccountingItemId?: InputMaybe<IntOperationFilterInput>;
  defaultAccountingItemInternalCode?: InputMaybe<CustomStringFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isForAdministration?: InputMaybe<BooleanOperationFilterInput>;
  isForContractCosts?: InputMaybe<BooleanOperationFilterInput>;
  isForContractFee?: InputMaybe<BooleanOperationFilterInput>;
  isForTax?: InputMaybe<BooleanOperationFilterInput>;
  isPositive?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<BillItemTypeFilterInput>>;
  passiveExemptVRId?: InputMaybe<IntOperationFilterInput>;
  passiveNonTaxableVRId?: InputMaybe<IntOperationFilterInput>;
  passiveSubjectVRId?: InputMaybe<IntOperationFilterInput>;
};

export type BillItemTypeInput = {
  activeExemptVRId: Scalars['Int']['input'];
  activeNonTaxableVRId: Scalars['Int']['input'];
  activeSubjectVRId: Scalars['Int']['input'];
  administrationVRId: Scalars['Int']['input'];
  defaultAccountingItemId?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  isForAdministration: Scalars['Boolean']['input'];
  isForContractCosts: Scalars['Boolean']['input'];
  isForContractFee: Scalars['Boolean']['input'];
  isForTax: Scalars['Boolean']['input'];
  isPositive: Scalars['Boolean']['input'];
  passiveExemptVRId: Scalars['Int']['input'];
  passiveNonTaxableVRId: Scalars['Int']['input'];
  passiveSubjectVRId: Scalars['Int']['input'];
};

export type BillItemTypeMutations = {
  __typename?: 'BillItemTypeMutations';
  add: ResultOfBillItemType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfBillItemType;
};

export type BillItemTypeMutationsAddArgs = {
  input: BillItemTypeInput;
};

export type BillItemTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type BillItemTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type BillItemTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: BillItemTypeInput;
};

export type BillItemTypeQueries = {
  __typename?: 'BillItemTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<BillItemType>;
  listBillItemTypes?: Maybe<ListBillItemTypesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type BillItemTypeQueriesCanUseInternalCodeArgs = {
  currentBillItemTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type BillItemTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<BillItemTypeSortInput>>;
  where?: InputMaybe<BillItemTypeFilterInput>;
};

export type BillItemTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type BillItemTypeQueriesListBillItemTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<BillItemTypeSortInput>>;
  where?: InputMaybe<BillItemTypeFilterInput>;
};

export type BillItemTypeSortInput = {
  activeExemptVRId?: InputMaybe<SortEnumType>;
  activeNonTaxableVRId?: InputMaybe<SortEnumType>;
  activeSubjectVRId?: InputMaybe<SortEnumType>;
  administrationVRId?: InputMaybe<SortEnumType>;
  defaultAccountingItemId?: InputMaybe<SortEnumType>;
  defaultAccountingItemInternalCode?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  isForAdministration?: InputMaybe<SortEnumType>;
  isForContractCosts?: InputMaybe<SortEnumType>;
  isForContractFee?: InputMaybe<SortEnumType>;
  isForTax?: InputMaybe<SortEnumType>;
  isPositive?: InputMaybe<SortEnumType>;
  passiveExemptVRId?: InputMaybe<SortEnumType>;
  passiveNonTaxableVRId?: InputMaybe<SortEnumType>;
  passiveSubjectVRId?: InputMaybe<SortEnumType>;
};

export type BillMutations = {
  __typename?: 'BillMutations';
  finalize: Result;
  update: ResultOfBill;
};

export type BillMutationsFinalizeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type BillMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: BillInput;
};

export type BillQueries = {
  __typename?: 'BillQueries';
  billStateStatisticsOutput: BillStateStatisticsOutput;
  exportActiveToExcel: FileUrlOutput;
  exportPassiveToExcel: FileUrlOutput;
  generatePdf: ResultOfFileUrlOutput;
  get?: Maybe<Bill>;
  listBills?: Maybe<ListBillsConnection>;
  listBillsFull: Array<BillFullListOutput>;
};

export type BillQueriesExportActiveToExcelArgs = {
  order?: InputMaybe<Array<BillSortInput>>;
  where?: InputMaybe<BillFilterInput>;
};

export type BillQueriesExportPassiveToExcelArgs = {
  order?: InputMaybe<Array<BillSortInput>>;
  where?: InputMaybe<BillFilterInput>;
};

export type BillQueriesGeneratePdfArgs = {
  billId: Scalars['Int']['input'];
};

export type BillQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type BillQueriesListBillsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<BillSortInput>>;
  where?: InputMaybe<BillFilterInput>;
};

export type BillQueriesListBillsFullArgs = {
  order?: InputMaybe<Array<BillSortInput>>;
  where?: InputMaybe<BillFilterInput>;
};

export type BillRow = {
  __typename?: 'BillRow';
  amount: Scalars['Decimal']['output'];
  bill: Bill;
  id: Scalars['Int']['output'];
  itemType: BillItemType;
  notes?: Maybe<Scalars['String']['output']>;
  oneshotAdditionSource?: Maybe<OneshotAddition>;
  recurringAdditionSource?: Maybe<RecurringAddition>;
  since?: Maybe<Scalars['Date']['output']>;
  termInstallmentSource?: Maybe<TermInstallment>;
  until?: Maybe<Scalars['Date']['output']>;
  vatRate: VatRate;
  vatRateId: Scalars['Int']['output'];
};

export type BillRowFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<BillRowFilterInput>>;
  bill?: InputMaybe<BillFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  itemType?: InputMaybe<BillItemTypeFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  oneshotAdditionSource?: InputMaybe<OneshotAdditionFilterInput>;
  or?: InputMaybe<Array<BillRowFilterInput>>;
  recurringAdditionSource?: InputMaybe<RecurringAdditionFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  termInstallmentSource?: InputMaybe<TermInstallmentFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
  vatRateId?: InputMaybe<IntOperationFilterInput>;
};

export type BillRowInput = {
  amount: Scalars['Decimal']['input'];
  billItemTypeId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  since?: InputMaybe<Scalars['Date']['input']>;
  until?: InputMaybe<Scalars['Date']['input']>;
  vatRateId: Scalars['Int']['input'];
};

export type BillSortInput = {
  contract?: InputMaybe<ContractSortInput>;
  contractBillingPeriod?: InputMaybe<SortEnumType>;
  counterpartSubjectName?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  emissionType?: InputMaybe<SortEnumType>;
  estateUnitAddress?: InputMaybe<SortEnumType>;
  estateUnitId?: InputMaybe<SortEnumType>;
  estateUnitInternalCode?: InputMaybe<SortEnumType>;
  externalExportCode?: InputMaybe<SortEnumType>;
  externalSourceCode?: InputMaybe<SortEnumType>;
  finalDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  invoiceId?: InputMaybe<SortEnumType>;
  isInvoiced?: InputMaybe<SortEnumType>;
  isOccupiedWithoutRight?: InputMaybe<SortEnumType>;
  isTemporary?: InputMaybe<SortEnumType>;
  mainCounterpartSubjectId?: InputMaybe<SortEnumType>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  totalAmount?: InputMaybe<SortEnumType>;
  transactorPaymentType?: InputMaybe<SortEnumType>;
  transactorSubjectId?: InputMaybe<SortEnumType>;
  transactorSubjectName?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type BillStateStatisticsOutput = {
  __typename?: 'BillStateStatisticsOutput';
  finalBillsCount: Scalars['Int']['output'];
  finalBillsPercentage: Scalars['Float']['output'];
  temporaryBillsCount: Scalars['Int']['output'];
  temporaryBillsPercentage: Scalars['Float']['output'];
};

export type BillingInfo = {
  __typename?: 'BillingInfo';
  billingPeriod?: Maybe<BillingPeriod>;
  discountPercentage?: Maybe<Scalars['Decimal']['output']>;
  fixedRateFee?: Maybe<Scalars['Decimal']['output']>;
  purchaseFeeWithoutVAT?: Maybe<Scalars['Decimal']['output']>;
  vatPercentage?: Maybe<Scalars['Decimal']['output']>;
};

export type BillingInfoFilterInput = {
  and?: InputMaybe<Array<BillingInfoFilterInput>>;
  billingPeriod?: InputMaybe<NullableOfBillingPeriodOperationFilterInput>;
  discountPercentage?: InputMaybe<DecimalOperationFilterInput>;
  fixedRateFee?: InputMaybe<DecimalOperationFilterInput>;
  or?: InputMaybe<Array<BillingInfoFilterInput>>;
  purchaseFeeWithoutVAT?: InputMaybe<DecimalOperationFilterInput>;
  vatPercentage?: InputMaybe<DecimalOperationFilterInput>;
};

export type BillingInfoInput = {
  billingPeriod?: InputMaybe<BillingPeriod>;
  discountPercentage?: InputMaybe<Scalars['Decimal']['input']>;
  fixedRateFee?: InputMaybe<Scalars['Decimal']['input']>;
  purchaseFeeWithoutVAT?: InputMaybe<Scalars['Decimal']['input']>;
  vatPercentage?: InputMaybe<Scalars['Decimal']['input']>;
};

export type BillingInfoSortInput = {
  billingPeriod?: InputMaybe<SortEnumType>;
  discountPercentage?: InputMaybe<SortEnumType>;
  fixedRateFee?: InputMaybe<SortEnumType>;
  purchaseFeeWithoutVAT?: InputMaybe<SortEnumType>;
  vatPercentage?: InputMaybe<SortEnumType>;
};

export type BillingPause = {
  __typename?: 'BillingPause';
  id: Scalars['Int']['output'];
  isRecoveryArrears?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  since: Scalars['Date']['output'];
  until?: Maybe<Scalars['Date']['output']>;
};

export type BillingPauseFilterInput = {
  and?: InputMaybe<Array<BillingPauseFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  isRecoveryArrears?: InputMaybe<BooleanOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<BillingPauseFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export enum BillingPeriod {
  Bimonthly = 'BIMONTHLY',
  Monthly = 'MONTHLY',
  PerQuadrimester = 'PER_QUADRIMESTER',
  PerQuarter = 'PER_QUARTER',
  PerSemester = 'PER_SEMESTER',
  Yearly = 'YEARLY',
}

export type BillingPeriodOperationFilterInput = {
  eq?: InputMaybe<BillingPeriod>;
  in?: InputMaybe<Array<BillingPeriod>>;
  neq?: InputMaybe<BillingPeriod>;
  nin?: InputMaybe<Array<BillingPeriod>>;
};

export enum BirthSex {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum BooleanOperator {
  And = 'AND',
  Or = 'OR',
}

export type BooleanOperatorOperationFilterInput = {
  eq?: InputMaybe<BooleanOperator>;
  in?: InputMaybe<Array<BooleanOperator>>;
  neq?: InputMaybe<BooleanOperator>;
  nin?: InputMaybe<Array<BooleanOperator>>;
};

export type CadastralCategory = {
  __typename?: 'CadastralCategory';
  cadastralValueFactor?: Maybe<Scalars['Decimal']['output']>;
  cadastralValueTaxFactor?: Maybe<Scalars['Decimal']['output']>;
  countryISO: Scalars['String']['output'];
  description: Scalars['String']['output'];
  externalCode?: Maybe<Scalars['String']['output']>;
  groupName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isInstrumental: Scalars['Boolean']['output'];
  isTaxed: Scalars['Boolean']['output'];
};

export type CadastralCategoryFilterInput = {
  and?: InputMaybe<Array<CadastralCategoryFilterInput>>;
  cadastralValueFactor?: InputMaybe<DecimalOperationFilterInput>;
  cadastralValueTaxFactor?: InputMaybe<DecimalOperationFilterInput>;
  countryISO?: InputMaybe<CustomStringFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  groupName?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isInstrumental?: InputMaybe<BooleanOperationFilterInput>;
  isTaxed?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CadastralCategoryFilterInput>>;
};

export type CadastralCategoryQueries = {
  __typename?: 'CadastralCategoryQueries';
  listCadastralCategories?: Maybe<ListCadastralCategoriesConnection>;
};

export type CadastralCategoryQueriesListCadastralCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CadastralCategorySortInput>>;
  where?: InputMaybe<CadastralCategoryFilterInput>;
};

export type CadastralCategorySortInput = {
  cadastralValueFactor?: InputMaybe<SortEnumType>;
  cadastralValueTaxFactor?: InputMaybe<SortEnumType>;
  countryISO?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  groupName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isInstrumental?: InputMaybe<SortEnumType>;
  isTaxed?: InputMaybe<SortEnumType>;
};

export type CadastralCoordinates = {
  __typename?: 'CadastralCoordinates';
  coordinateType: CoordinateType;
  hasITTavData: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  itTavCorpo?: Maybe<Scalars['String']['output']>;
  itTavPartita?: Maybe<Scalars['String']['output']>;
  itTavPorzione?: Maybe<Scalars['String']['output']>;
  level1?: Maybe<Scalars['String']['output']>;
  level2?: Maybe<Scalars['String']['output']>;
  level3?: Maybe<Scalars['String']['output']>;
  level4?: Maybe<Scalars['String']['output']>;
  level5?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  unmanagedOverride?: Maybe<Scalars['String']['output']>;
};

export type CadastralCoordinatesFilterInput = {
  and?: InputMaybe<Array<CadastralCoordinatesFilterInput>>;
  coordinateType?: InputMaybe<CoordinateTypeOperationFilterInput>;
  hasITTavData?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  itTavCorpo?: InputMaybe<CustomStringFilterInput>;
  itTavPartita?: InputMaybe<CustomStringFilterInput>;
  itTavPorzione?: InputMaybe<CustomStringFilterInput>;
  level1?: InputMaybe<CustomStringFilterInput>;
  level2?: InputMaybe<CustomStringFilterInput>;
  level3?: InputMaybe<CustomStringFilterInput>;
  level4?: InputMaybe<CustomStringFilterInput>;
  level5?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CadastralCoordinatesFilterInput>>;
  unmanagedOverride?: InputMaybe<CustomStringFilterInput>;
};

export type CadastralCoordinatesInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  itTavCorpo?: InputMaybe<Scalars['String']['input']>;
  itTavPartita?: InputMaybe<Scalars['String']['input']>;
  itTavPorzione?: InputMaybe<Scalars['String']['input']>;
  level1?: InputMaybe<Scalars['String']['input']>;
  level2?: InputMaybe<Scalars['String']['input']>;
  level3?: InputMaybe<Scalars['String']['input']>;
  level4?: InputMaybe<Scalars['String']['input']>;
  level5?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  type: CoordinateType;
  unmanagedOverride?: InputMaybe<Scalars['String']['input']>;
};

export enum CadastralExpenseType {
  BalanceIngressValue = 'BALANCE_INGRESS_VALUE',
  Increment = 'INCREMENT',
}

export type CadastralExpenseTypeOperationFilterInput = {
  eq?: InputMaybe<CadastralExpenseType>;
  in?: InputMaybe<Array<CadastralExpenseType>>;
  neq?: InputMaybe<CadastralExpenseType>;
  nin?: InputMaybe<Array<CadastralExpenseType>>;
};

export type CadastralExpenses = {
  __typename?: 'CadastralExpenses';
  amount?: Maybe<Scalars['Decimal']['output']>;
  expenseType: CadastralExpenseType;
  fiscalYear?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  referenceYear: Scalars['Int']['output'];
  revaluationFactor?: Maybe<Scalars['Float']['output']>;
};

export type CadastralExpensesFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<CadastralExpensesFilterInput>>;
  expenseType?: InputMaybe<CadastralExpenseTypeOperationFilterInput>;
  fiscalYear?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<CadastralExpensesFilterInput>>;
  referenceYear?: InputMaybe<IntOperationFilterInput>;
  revaluationFactor?: InputMaybe<FloatOperationFilterInput>;
};

export type CadastralExpensesInput = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  expenseType: CadastralExpenseType;
  fiscalYear?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  referenceYear: Scalars['Int']['input'];
  revaluationFactor?: InputMaybe<Scalars['Float']['input']>;
};

/** A connection to a list of items. */
export type CadastralLandCategoriesConnection = {
  __typename?: 'CadastralLandCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CadastralLandCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CadastralLandCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CadastralLandCategoriesEdge = {
  __typename?: 'CadastralLandCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CadastralLandCategory;
};

export type CadastralLandCategory = {
  __typename?: 'CadastralLandCategory';
  countryISO: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type CadastralLandCategoryFilterInput = {
  and?: InputMaybe<Array<CadastralLandCategoryFilterInput>>;
  countryISO?: InputMaybe<CustomStringFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CadastralLandCategoryFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type CadastralLandCategoryInput = {
  countryISO: Scalars['String']['input'];
  description: Scalars['String']['input'];
  internalCode: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type CadastralLandCategoryMutations = {
  __typename?: 'CadastralLandCategoryMutations';
  add: ResultOfCadastralLandCategory;
  delete: Result;
  deleteRange: Result;
  update: ResultOfCadastralLandCategory;
};

export type CadastralLandCategoryMutationsAddArgs = {
  input: CadastralLandCategoryInput;
};

export type CadastralLandCategoryMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CadastralLandCategoryMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CadastralLandCategoryMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: CadastralLandCategoryInput;
};

export type CadastralLandCategoryQueries = {
  __typename?: 'CadastralLandCategoryQueries';
  cadastralLandCategories?: Maybe<CadastralLandCategoriesConnection>;
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<CadastralLandCategory>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type CadastralLandCategoryQueriesCadastralLandCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CadastralLandCategorySortInput>>;
  where?: InputMaybe<CadastralLandCategoryFilterInput>;
};

export type CadastralLandCategoryQueriesCanUseInternalCodeArgs = {
  currentCadastralLandCategoryId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type CadastralLandCategoryQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CadastralLandCategorySortInput>>;
  where?: InputMaybe<CadastralLandCategoryFilterInput>;
};

export type CadastralLandCategoryQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type CadastralLandCategorySortInput = {
  countryISO?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export type CadastralUnavailability = {
  __typename?: 'CadastralUnavailability';
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  since?: Maybe<Scalars['Date']['output']>;
  until?: Maybe<Scalars['Date']['output']>;
};

export type CadastralUnavailabilityFilterInput = {
  and?: InputMaybe<Array<CadastralUnavailabilityFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CadastralUnavailabilityFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type CadastralUnavailabilityInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  since?: InputMaybe<Scalars['Date']['input']>;
  until?: InputMaybe<Scalars['Date']['input']>;
};

export type CadastralUnit = {
  __typename?: 'CadastralUnit';
  address: AsstAddress;
  addressId?: Maybe<Scalars['Int']['output']>;
  cadastralNotes?: Maybe<Scalars['String']['output']>;
  consortiumNotes?: Maybe<Scalars['String']['output']>;
  coordinates: Array<CadastralCoordinates>;
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  estateUnit: EstateUnit;
  expenses: Array<CadastralExpenses>;
  fiscalNotes?: Maybe<Scalars['String']['output']>;
  history: Array<CadastralUnit>;
  historyTags: Array<Scalars['UUID']['output']>;
  id: Scalars['Int']['output'];
  income: CadastralUnitIncome;
  inspection?: Maybe<CadastralUnitInspection>;
  internalCode: Scalars['String']['output'];
  isAncillaryUnit: Scalars['Boolean']['output'];
  isCadastralRegistrationInProgress: Scalars['Boolean']['output'];
  lastRelevantChangeDate?: Maybe<Scalars['DateTime']['output']>;
  since?: Maybe<Scalars['Date']['output']>;
  status: CadastralUnitStatus;
  taxCalculators: Array<ConfigSection>;
  taxConfig: Array<CadastralUnitTaxConfig>;
  taxPayments: Array<AssetTaxCalculation>;
  type: EstateUnitType;
  unavailabilities: Array<CadastralUnavailability>;
  until?: Maybe<Scalars['Date']['output']>;
};

export type CadastralUnitFilterInput = {
  address?: InputMaybe<IAddressFilterInput>;
  addressId?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<CadastralUnitFilterInput>>;
  cadastralNotes?: InputMaybe<CustomStringFilterInput>;
  consortiumNotes?: InputMaybe<CustomStringFilterInput>;
  coordinates?: InputMaybe<ListCadastralCoordinatesFilterTypeFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  estateUnit?: InputMaybe<EstateUnitFilterInput>;
  expenses?: InputMaybe<ListFilterInputTypeOfCadastralExpensesFilterInput>;
  fiscalNotes?: InputMaybe<CustomStringFilterInput>;
  historyTags?: InputMaybe<ListUuidOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  income?: InputMaybe<CadastralUnitIncomeFilterInput>;
  inspection?: InputMaybe<CadastralUnitInspectionFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isAncillaryUnit?: InputMaybe<BooleanOperationFilterInput>;
  isCadastralRegistrationInProgress?: InputMaybe<BooleanOperationFilterInput>;
  lastRelevantChangeDate?: InputMaybe<DateTimeOperationFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CadastralUnitFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  status?: InputMaybe<NullableOfCadastralUnitStatusOperationFilterInput>;
  taxPayments?: InputMaybe<ListFilterInputTypeOfAssetTaxCalculationFilterInput>;
  type?: InputMaybe<NullableOfEstateUnitTypeOperationFilterInput>;
  unavailabilities?: InputMaybe<ListFilterInputTypeOfCadastralUnavailabilityFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type CadastralUnitIncome = {
  __typename?: 'CadastralUnitIncome';
  cadastralAmount?: Maybe<Scalars['Decimal']['output']>;
  cadastralCategory?: Maybe<CadastralCategory>;
  cadastralLandCategory?: Maybe<CadastralLandCategory>;
  farmAmount?: Maybe<Scalars['Decimal']['output']>;
  landAmount?: Maybe<Scalars['Decimal']['output']>;
  macroCategory?: Maybe<Scalars['String']['output']>;
  marketValue?: Maybe<Scalars['Decimal']['output']>;
  metric?: Maybe<IncomeMetric>;
  metricAmount?: Maybe<Scalars['Decimal']['output']>;
  metricRentedAmount?: Maybe<Scalars['Decimal']['output']>;
  microCategory?: Maybe<Scalars['String']['output']>;
  registeredSurface?: Maybe<Scalars['Decimal']['output']>;
  type?: Maybe<IncomeType>;
};

export type CadastralUnitIncomeFilterInput = {
  and?: InputMaybe<Array<CadastralUnitIncomeFilterInput>>;
  cadastralAmount?: InputMaybe<DecimalOperationFilterInput>;
  farmAmount?: InputMaybe<DecimalOperationFilterInput>;
  landAmount?: InputMaybe<DecimalOperationFilterInput>;
  macroCategory?: InputMaybe<CustomStringFilterInput>;
  marketValue?: InputMaybe<DecimalOperationFilterInput>;
  metric?: InputMaybe<NullableOfIncomeMetricOperationFilterInput>;
  metricAmount?: InputMaybe<DecimalOperationFilterInput>;
  metricRentedAmount?: InputMaybe<DecimalOperationFilterInput>;
  microCategory?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CadastralUnitIncomeFilterInput>>;
  registeredSurface?: InputMaybe<DecimalOperationFilterInput>;
  type?: InputMaybe<NullableOfIncomeTypeOperationFilterInput>;
};

export type CadastralUnitIncomeInput = {
  cadastralAmount?: InputMaybe<Scalars['Decimal']['input']>;
  cadastralCategoryId?: InputMaybe<Scalars['Int']['input']>;
  cadastralLandCategoryId?: InputMaybe<Scalars['Int']['input']>;
  farmAmount?: InputMaybe<Scalars['Decimal']['input']>;
  landAmount?: InputMaybe<Scalars['Decimal']['input']>;
  macroCategory?: InputMaybe<Scalars['String']['input']>;
  marketValue?: InputMaybe<Scalars['Decimal']['input']>;
  metric?: InputMaybe<IncomeMetric>;
  metricAmount?: InputMaybe<Scalars['Decimal']['input']>;
  metricRentedAmount?: InputMaybe<Scalars['Decimal']['input']>;
  microCategory?: InputMaybe<Scalars['String']['input']>;
  registeredSurface?: InputMaybe<Scalars['Decimal']['input']>;
  type?: InputMaybe<IncomeType>;
};

export type CadastralUnitIncomeSortInput = {
  cadastralAmount?: InputMaybe<SortEnumType>;
  cadastralCategory?: InputMaybe<CadastralCategorySortInput>;
  cadastralLandCategory?: InputMaybe<CadastralLandCategorySortInput>;
  farmAmount?: InputMaybe<SortEnumType>;
  landAmount?: InputMaybe<SortEnumType>;
  macroCategory?: InputMaybe<SortEnumType>;
  marketValue?: InputMaybe<SortEnumType>;
  metric?: InputMaybe<SortEnumType>;
  metricAmount?: InputMaybe<SortEnumType>;
  metricRentedAmount?: InputMaybe<SortEnumType>;
  microCategory?: InputMaybe<SortEnumType>;
  registeredSurface?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export type CadastralUnitInput = {
  address: AsstAddressInput;
  cadastralNotes?: InputMaybe<Scalars['String']['input']>;
  consortiumNotes?: InputMaybe<Scalars['String']['input']>;
  coordinates?: InputMaybe<Array<CadastralCoordinatesInput>>;
  estateUnitId?: InputMaybe<Scalars['Int']['input']>;
  expenses?: InputMaybe<Array<CadastralExpensesInput>>;
  fiscalNotes?: InputMaybe<Scalars['String']['input']>;
  income: CadastralUnitIncomeInput;
  inspection?: InputMaybe<CadastralUnitInspectionInput>;
  internalCode?: InputMaybe<Scalars['String']['input']>;
  isAncillaryUnit: Scalars['Boolean']['input'];
  isCadastralRegistrationInProgress: Scalars['Boolean']['input'];
  since?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<CadastralUnitStatus>;
  taxConfig?: InputMaybe<Array<CadastralUnitTaxConfigInput>>;
  type?: InputMaybe<EstateUnitType>;
  unavailabilities?: InputMaybe<Array<CadastralUnavailabilityInput>>;
  until?: InputMaybe<Scalars['Date']['input']>;
};

export type CadastralUnitInspection = {
  __typename?: 'CadastralUnitInspection';
  date?: Maybe<Scalars['Date']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  isDirectRestriction: Scalars['Boolean']['output'];
  isHistoricalEstate: Scalars['Boolean']['output'];
  macroZone?: Maybe<Scalars['String']['output']>;
  microZone?: Maybe<Scalars['String']['output']>;
  protocolDate?: Maybe<Scalars['Date']['output']>;
  protocolNumber?: Maybe<Scalars['String']['output']>;
};

export type CadastralUnitInspectionFilterInput = {
  and?: InputMaybe<Array<CadastralUnitInspectionFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  heading?: InputMaybe<CustomStringFilterInput>;
  isDirectRestriction?: InputMaybe<BooleanOperationFilterInput>;
  isHistoricalEstate?: InputMaybe<BooleanOperationFilterInput>;
  macroZone?: InputMaybe<CustomStringFilterInput>;
  microZone?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CadastralUnitInspectionFilterInput>>;
  protocolDate?: InputMaybe<DateOperationFilterInput>;
  protocolNumber?: InputMaybe<CustomStringFilterInput>;
};

export type CadastralUnitInspectionInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  isDirectRestriction: Scalars['Boolean']['input'];
  isHistoricalEstate: Scalars['Boolean']['input'];
  macroZone?: InputMaybe<Scalars['String']['input']>;
  microZone?: InputMaybe<Scalars['String']['input']>;
  protocolDate?: InputMaybe<Scalars['Date']['input']>;
  protocolNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CadastralUnitInspectionSortInput = {
  date?: InputMaybe<SortEnumType>;
  heading?: InputMaybe<SortEnumType>;
  isDirectRestriction?: InputMaybe<SortEnumType>;
  isHistoricalEstate?: InputMaybe<SortEnumType>;
  macroZone?: InputMaybe<SortEnumType>;
  microZone?: InputMaybe<SortEnumType>;
  protocolDate?: InputMaybe<SortEnumType>;
  protocolNumber?: InputMaybe<SortEnumType>;
};

export type CadastralUnitMutations = {
  __typename?: 'CadastralUnitMutations';
  addCadastralUnit: ResultOfCadastralUnit;
  delete: Result;
  deleteRange: Result;
  updateCadastralUnit: ResultOfCadastralUnit;
};

export type CadastralUnitMutationsAddCadastralUnitArgs = {
  input: CadastralUnitInput;
};

export type CadastralUnitMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CadastralUnitMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CadastralUnitMutationsUpdateCadastralUnitArgs = {
  id: Scalars['Int']['input'];
  input: CadastralUnitInput;
  isVariation?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CadastralUnitQueries = {
  __typename?: 'CadastralUnitQueries';
  cadastralUnit?: Maybe<CadastralUnit>;
  exportToExcel: FileUrlOutput;
  listCadastralUnits?: Maybe<ListCadastralUnitsConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  proposeNewInternalCodeByParentCode: Scalars['String']['output'];
};

export type CadastralUnitQueriesCadastralUnitArgs = {
  id: Scalars['Int']['input'];
};

export type CadastralUnitQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CadastralUnitSortInput>>;
  where?: InputMaybe<CadastralUnitFilterInput>;
};

export type CadastralUnitQueriesListCadastralUnitsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CadastralUnitSortInput>>;
  where?: InputMaybe<CadastralUnitFilterInput>;
};

export type CadastralUnitQueriesProposeNewInternalCodeArgs = {
  parentId: Scalars['Int']['input'];
};

export type CadastralUnitQueriesProposeNewInternalCodeByParentCodeArgs = {
  parentCode: Scalars['String']['input'];
};

export type CadastralUnitSortInput = {
  address?: InputMaybe<IAddressSortInput>;
  addressId?: InputMaybe<SortEnumType>;
  cadastralNotes?: InputMaybe<SortEnumType>;
  consortiumNotes?: InputMaybe<SortEnumType>;
  deletionDate?: InputMaybe<SortEnumType>;
  estateUnit?: InputMaybe<EstateUnitSortInput>;
  fiscalNotes?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  income?: InputMaybe<CadastralUnitIncomeSortInput>;
  inspection?: InputMaybe<CadastralUnitInspectionSortInput>;
  internalCode?: InputMaybe<SortEnumType>;
  isAncillaryUnit?: InputMaybe<SortEnumType>;
  isCadastralRegistrationInProgress?: InputMaybe<SortEnumType>;
  lastRelevantChangeDate?: InputMaybe<SortEnumType>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
};

export enum CadastralUnitStatus {
  Cancelled = 'CANCELLED',
  Changed = 'CHANGED',
  DiscontinuedMerge = 'DISCONTINUED_MERGE',
  DiscontinuedSplit = 'DISCONTINUED_SPLIT',
  Existing = 'EXISTING',
  Transformed = 'TRANSFORMED',
}

export type CadastralUnitTaxConfig = {
  __typename?: 'CadastralUnitTaxConfig';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isMandatory: Scalars['Boolean']['output'];
  taxCalculator: Scalars['UUID']['output'];
  templateTypeId: Scalars['UUID']['output'];
  type: CustomFieldType;
  value?: Maybe<Scalars['String']['output']>;
};

export type CadastralUnitTaxConfigFilterInput = {
  and?: InputMaybe<Array<CadastralUnitTaxConfigFilterInput>>;
  code?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isMandatory?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CadastralUnitTaxConfigFilterInput>>;
  taxCalculator?: InputMaybe<UuidOperationFilterInput>;
  templateTypeId?: InputMaybe<UuidOperationFilterInput>;
  type?: InputMaybe<CustomFieldTypeOperationFilterInput>;
  value?: InputMaybe<CustomStringFilterInput>;
};

export type CadastralUnitTaxConfigInput = {
  isMandatory: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  taxCalculatorId: Scalars['UUID']['input'];
  templateTypeId: Scalars['UUID']['input'];
  type: CustomFieldType;
  value?: InputMaybe<Scalars['String']['input']>;
};

export enum CalculationIssue {
  MissingCadastralCategory = 'MISSING_CADASTRAL_CATEGORY',
  MissingCadastralIncomeData = 'MISSING_CADASTRAL_INCOME_DATA',
  MissingOrInvalidOwnershipDates = 'MISSING_OR_INVALID_OWNERSHIP_DATES',
  MissingOrZeroRate = 'MISSING_OR_ZERO_RATE',
}

export type Calendar = {
  __typename?: 'Calendar';
  friday?: Maybe<CalendarDay>;
  holidays: Array<Holiday>;
  id: Scalars['Int']['output'];
  monday?: Maybe<CalendarDay>;
  name: Scalars['String']['output'];
  saturday?: Maybe<CalendarDay>;
  sunday?: Maybe<CalendarDay>;
  thursday?: Maybe<CalendarDay>;
  timeZoneId: Scalars['String']['output'];
  tuesday?: Maybe<CalendarDay>;
  wednesday?: Maybe<CalendarDay>;
};

export type CalendarDay = {
  __typename?: 'CalendarDay';
  dayOfWeek: DayOfWeek;
  id: Scalars['Int']['output'];
  timeRanges: Array<TimeRange>;
};

export type CalendarDayFilterInput = {
  and?: InputMaybe<Array<CalendarDayFilterInput>>;
  dayOfWeek?: InputMaybe<DayOfWeekOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<CalendarDayFilterInput>>;
  timeRanges?: InputMaybe<ListFilterInputTypeOfTimeRangeFilterInput>;
};

export type CalendarDayInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  timeRanges: Array<TimeRangeInput>;
};

export type CalendarDaySortInput = {
  dayOfWeek?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
};

export type CalendarFilterInput = {
  and?: InputMaybe<Array<CalendarFilterInput>>;
  friday?: InputMaybe<CalendarDayFilterInput>;
  holidays?: InputMaybe<ListFilterInputTypeOfHolidayFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  monday?: InputMaybe<CalendarDayFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CalendarFilterInput>>;
  saturday?: InputMaybe<CalendarDayFilterInput>;
  sunday?: InputMaybe<CalendarDayFilterInput>;
  thursday?: InputMaybe<CalendarDayFilterInput>;
  timeZoneId?: InputMaybe<CustomStringFilterInput>;
  tuesday?: InputMaybe<CalendarDayFilterInput>;
  wednesday?: InputMaybe<CalendarDayFilterInput>;
};

export type CalendarInput = {
  friday?: InputMaybe<CalendarDayInput>;
  holidays: Array<HolidayInput>;
  monday?: InputMaybe<CalendarDayInput>;
  name: Scalars['String']['input'];
  saturday?: InputMaybe<CalendarDayInput>;
  sunday?: InputMaybe<CalendarDayInput>;
  thursday?: InputMaybe<CalendarDayInput>;
  timeZoneId: Scalars['String']['input'];
  tuesday?: InputMaybe<CalendarDayInput>;
  wednesday?: InputMaybe<CalendarDayInput>;
};

export type CalendarMutations = {
  __typename?: 'CalendarMutations';
  add: ResultOfCalendar;
  delete: Result;
  deleteRange: Result;
  duplicate: ResultOfCalendar;
  update: ResultOfCalendar;
};

export type CalendarMutationsAddArgs = {
  input: CalendarInput;
};

export type CalendarMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CalendarMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CalendarMutationsDuplicateArgs = {
  id: Scalars['Int']['input'];
};

export type CalendarMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: CalendarInput;
};

export type CalendarQueries = {
  __typename?: 'CalendarQueries';
  exportToExcel: FileUrlOutput;
  get?: Maybe<Calendar>;
  listCalendars?: Maybe<ListCalendarsConnection>;
  listCalendarsFull: Array<Calendar>;
};

export type CalendarQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CalendarSortInput>>;
  where?: InputMaybe<CalendarFilterInput>;
};

export type CalendarQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type CalendarQueriesListCalendarsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CalendarSortInput>>;
  where?: InputMaybe<CalendarFilterInput>;
};

export type CalendarQueriesListCalendarsFullArgs = {
  order?: InputMaybe<Array<CalendarSortInput>>;
  where?: InputMaybe<CalendarFilterInput>;
};

export type CalendarSortInput = {
  friday?: InputMaybe<CalendarDaySortInput>;
  id?: InputMaybe<SortEnumType>;
  monday?: InputMaybe<CalendarDaySortInput>;
  name?: InputMaybe<SortEnumType>;
  saturday?: InputMaybe<CalendarDaySortInput>;
  sunday?: InputMaybe<CalendarDaySortInput>;
  thursday?: InputMaybe<CalendarDaySortInput>;
  timeZoneId?: InputMaybe<SortEnumType>;
  tuesday?: InputMaybe<CalendarDaySortInput>;
  wednesday?: InputMaybe<CalendarDaySortInput>;
};

export type CalendarTicketOutput = {
  __typename?: 'CalendarTicketOutput';
  description?: Maybe<Scalars['String']['output']>;
  dueDate: Scalars['Date']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  internalCode?: Maybe<Scalars['String']['output']>;
  isExcludedFromMaintenanceContract: Scalars['Boolean']['output'];
  mainType: TicketMainType;
  masterStatus?: Maybe<TicketMasterStatus>;
  requestDateTime: Scalars['DateTime']['output'];
  requestor?: Maybe<Scalars['String']['output']>;
  supplierSubject: ISubject;
  supplierSubjectId: Scalars['Int']['output'];
  workOrderReference?: Maybe<Scalars['String']['output']>;
};

export type CalendarTicketOutputFilterInput = {
  and?: InputMaybe<Array<CalendarTicketOutputFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  dueDate?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isExcludedFromMaintenanceContract?: InputMaybe<BooleanOperationFilterInput>;
  mainType?: InputMaybe<TicketMainTypeOperationFilterInput>;
  masterStatus?: InputMaybe<NullableOfTicketMasterStatusOperationFilterInput>;
  or?: InputMaybe<Array<CalendarTicketOutputFilterInput>>;
  requestDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  requestor?: InputMaybe<CustomStringFilterInput>;
  supplierSubjectId?: InputMaybe<IntOperationFilterInput>;
  supplierSubjectName?: InputMaybe<CustomStringFilterInput>;
  workOrderReference?: InputMaybe<CustomStringFilterInput>;
};

export type CatalogueCategory = {
  __typename?: 'CatalogueCategory';
  catalogueTypes: Array<CatalogueType>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subCategories: Array<CatalogueSubCategory>;
};

export type CatalogueCategoryFilterInput = {
  and?: InputMaybe<Array<CatalogueCategoryFilterInput>>;
  catalogueTypes?: InputMaybe<ListFilterInputTypeOfCatalogueTypeFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueCategoryFilterInput>>;
  subCategories?: InputMaybe<ListFilterInputTypeOfCatalogueSubCategoryFilterInput>;
};

export type CatalogueCategoryInput = {
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subCategories: Array<CatalogueSubCategoryInput>;
};

export type CatalogueCategoryMutations = {
  __typename?: 'CatalogueCategoryMutations';
  add: ResultOfCatalogueCategory;
  delete: Result;
  deleteRange: Result;
  update: ResultOfCatalogueCategory;
};

export type CatalogueCategoryMutationsAddArgs = {
  input: CatalogueCategoryInput;
};

export type CatalogueCategoryMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CatalogueCategoryMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CatalogueCategoryMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: CatalogueCategoryInput;
};

export type CatalogueCategoryQueries = {
  __typename?: 'CatalogueCategoryQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  canUseInternalCodeSubCategory: Scalars['Boolean']['output'];
  get?: Maybe<CatalogueCategory>;
  listCatalogueCategories?: Maybe<ListCatalogueCategoriesConnection>;
  listCatalogueCategoriesFull: Array<CatalogueCategory>;
  listCatalogueSubCategories?: Maybe<ListCatalogueSubCategoriesConnection>;
  listCatalogueSubCategoriesFull: Array<CatalogueSubCategory>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  proposeNewInternalCodeSubCategory?: Maybe<Scalars['String']['output']>;
};

export type CatalogueCategoryQueriesCanUseInternalCodeArgs = {
  currentCatalogueCategoryId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type CatalogueCategoryQueriesCanUseInternalCodeSubCategoryArgs = {
  catalogueCategoryId?: InputMaybe<Scalars['Int']['input']>;
  currentCatalogueSubCategoryId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type CatalogueCategoryQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type CatalogueCategoryQueriesListCatalogueCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CatalogueCategorySortInput>>;
  where?: InputMaybe<CatalogueCategoryFilterInput>;
};

export type CatalogueCategoryQueriesListCatalogueCategoriesFullArgs = {
  order?: InputMaybe<Array<CatalogueCategorySortInput>>;
  where?: InputMaybe<CatalogueCategoryFilterInput>;
};

export type CatalogueCategoryQueriesListCatalogueSubCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  catalogueCategoryId?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CatalogueSubCategorySortInput>>;
  where?: InputMaybe<CatalogueSubCategoryFilterInput>;
};

export type CatalogueCategoryQueriesListCatalogueSubCategoriesFullArgs = {
  catalogueCategoryId: Scalars['Int']['input'];
  order?: InputMaybe<Array<CatalogueSubCategorySortInput>>;
  where?: InputMaybe<CatalogueSubCategoryFilterInput>;
};

export type CatalogueCategoryQueriesProposeNewInternalCodeSubCategoryArgs = {
  additionallyOccupiedCodes: Array<Scalars['String']['input']>;
  parentInternalCode: Scalars['String']['input'];
};

export type CatalogueCategorySortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type CatalogueDocumentMutations = {
  __typename?: 'CatalogueDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: Result;
  update: ResultOfDocument;
};

export type CatalogueDocumentMutationsAddRangeArgs = {
  catalogueTypeId: Scalars['Int']['input'];
  estateId: Scalars['Int']['input'];
  inputs: Array<DocumentInput>;
};

export type CatalogueDocumentMutationsDeleteRangeArgs = {
  catalogueTypeId: Scalars['Int']['input'];
  cmisIds: Array<Scalars['String']['input']>;
  estateId: Scalars['Int']['input'];
};

export type CatalogueDocumentMutationsUpdateArgs = {
  catalogueTypeId: Scalars['Int']['input'];
  estateId: Scalars['Int']['input'];
  input: DocumentInput;
};

export type CatalogueDocumentOutput = {
  __typename?: 'CatalogueDocumentOutput';
  catalogueItemId?: Maybe<Scalars['Int']['output']>;
  catalogueItemInternalCode?: Maybe<Scalars['String']['output']>;
  catalogueTypeId: Scalars['Int']['output'];
  cmisId: Scalars['String']['output'];
  creationDate: Scalars['DateTime']['output'];
  entityId?: Maybe<Scalars['String']['output']>;
  estateId: Scalars['Int']['output'];
  fileName?: Maybe<Scalars['String']['output']>;
  issueDate?: Maybe<Scalars['Date']['output']>;
  issuer?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  protocolNumber?: Maybe<Scalars['String']['output']>;
  since?: Maybe<Scalars['DateTime']['output']>;
  until?: Maybe<Scalars['DateTime']['output']>;
  uploaderName?: Maybe<Scalars['String']['output']>;
};

export type CatalogueDocumentQueries = {
  __typename?: 'CatalogueDocumentQueries';
  listDocuments: Array<DocumentsPerContentCategoryGroupOutput>;
};

export type CatalogueDocumentQueriesListDocumentsArgs = {
  catalogueTypeId: Scalars['Int']['input'];
  estateId: Scalars['Int']['input'];
  order?: InputMaybe<Array<DocumentsPerContentCategoryGroupOutputSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type CatalogueDocumentsCategoryOutput = {
  __typename?: 'CatalogueDocumentsCategoryOutput';
  categoryName: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<CatalogueDocumentsSubCategoryOutput>;
};

export type CatalogueDocumentsCategoryOutputSortInput = {
  categoryName?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CatalogueDocumentsConnection = {
  __typename?: 'CatalogueDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CatalogueDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CatalogueDocumentsOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CatalogueDocumentsEdge = {
  __typename?: 'CatalogueDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogueDocumentsOutput;
};

export type CatalogueDocumentsFlatOutputFilterInput = {
  and?: InputMaybe<Array<CatalogueDocumentsFlatOutputFilterInput>>;
  catalogueItemInternalCode?: InputMaybe<CustomStringFilterInput>;
  catalogueTypeName?: InputMaybe<CustomStringFilterInput>;
  categoryName?: InputMaybe<CustomStringFilterInput>;
  contentCategoryGroup?: InputMaybe<CustomStringFilterInput>;
  document?: InputMaybe<DocumentFilterInput>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueDocumentsFlatOutputFilterInput>>;
  subCategoryName?: InputMaybe<CustomStringFilterInput>;
};

export type CatalogueDocumentsOutput = {
  __typename?: 'CatalogueDocumentsOutput';
  estateInternalCode: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<CatalogueDocumentsCategoryOutput>;
};

export type CatalogueDocumentsOutputSortInput = {
  estateInternalCode?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

export type CatalogueDocumentsPerContentCategoryGroupOutput = {
  __typename?: 'CatalogueDocumentsPerContentCategoryGroupOutput';
  contentCategoryGroup: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<CatalogueDocumentsPerContentCategoryOutput>;
};

export type CatalogueDocumentsPerContentCategoryOutput = {
  __typename?: 'CatalogueDocumentsPerContentCategoryOutput';
  contentCategory: ContentCategory;
  guid: Scalars['UUID']['output'];
  subRows: Array<CatalogueDocumentOutput>;
};

export type CatalogueDocumentsSubCategoryOutput = {
  __typename?: 'CatalogueDocumentsSubCategoryOutput';
  guid: Scalars['UUID']['output'];
  subCategoryName?: Maybe<Scalars['String']['output']>;
  subRows: Array<CatalogueDocumentsTypeOutput>;
};

export type CatalogueDocumentsTypeOutput = {
  __typename?: 'CatalogueDocumentsTypeOutput';
  catalogueTypeName: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<CatalogueDocumentsPerContentCategoryGroupOutput>;
};

export type CatalogueIdInput = {
  catalogueTypeId: Scalars['Int']['input'];
  estateId: Scalars['Int']['input'];
};

export type CatalogueItem = {
  __typename?: 'CatalogueItem';
  activationDate: Scalars['Date']['output'];
  catalogueType: CatalogueType;
  decommissioningDate?: Maybe<Scalars['Date']['output']>;
  documents: Array<DocumentsPerContentCategoryGroupOutput>;
  estate: Estate;
  fields: Array<CatalogueItemField>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  lastMaintenanceDate: Scalars['Date']['output'];
  status: EstateStatus;
};

export type CatalogueItemDocumentsArgs = {
  order?: InputMaybe<Array<DocumentsPerContentCategoryGroupOutputSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type CatalogueItemDocumentExpiredNotification = DocumentExpiredNotification &
  Notification & {
    __typename?: 'CatalogueItemDocumentExpiredNotification';
    catalogueTypeId: Scalars['Int']['output'];
    documentCmisId: Scalars['String']['output'];
    entityId: Scalars['Int']['output'];
    estateId: Scalars['Int']['output'];
    id: Scalars['Int']['output'];
    status: NotificationStatus;
    timestamp: Scalars['DateTime']['output'];
    username: Scalars['String']['output'];
  };

export type CatalogueItemDocumentMutations = {
  __typename?: 'CatalogueItemDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: ResultOfDocument__;
  update: ResultOfDocument;
};

export type CatalogueItemDocumentMutationsAddRangeArgs = {
  catalogueItemId: Scalars['Int']['input'];
  inputs: Array<DocumentInput>;
};

export type CatalogueItemDocumentMutationsDeleteRangeArgs = {
  catalogueItemId: Scalars['Int']['input'];
  cmisIds: Array<Scalars['String']['input']>;
};

export type CatalogueItemDocumentMutationsUpdateArgs = {
  catalogueItemId: Scalars['Int']['input'];
  input: DocumentInput;
};

export type CatalogueItemDocumentQueries = {
  __typename?: 'CatalogueItemDocumentQueries';
  listDocuments: Array<CatalogueDocumentsCategoryOutput>;
};

export type CatalogueItemDocumentQueriesListDocumentsArgs = {
  catalogueItemIds: Array<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CatalogueDocumentsCategoryOutputSortInput>>;
  where?: InputMaybe<CatalogueDocumentsFlatOutputFilterInput>;
};

export type CatalogueItemField = {
  __typename?: 'CatalogueItemField';
  isMandatory: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  templateTypeId: Scalars['UUID']['output'];
  type: CustomFieldType;
  value?: Maybe<Scalars['String']['output']>;
};

export type CatalogueItemFieldFilterInput = {
  and?: InputMaybe<Array<CatalogueItemFieldFilterInput>>;
  isMandatory?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueItemFieldFilterInput>>;
  templateTypeId?: InputMaybe<UuidOperationFilterInput>;
  type?: InputMaybe<CustomFieldTypeOperationFilterInput>;
  value?: InputMaybe<CustomStringFilterInput>;
};

export type CatalogueItemFieldInput = {
  isMandatory: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  templateTypeId: Scalars['UUID']['input'];
  type: CustomFieldType;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueItemFilterInput = {
  activationDate?: InputMaybe<DateOperationFilterInput>;
  and?: InputMaybe<Array<CatalogueItemFilterInput>>;
  catalogueType?: InputMaybe<CatalogueTypeFilterInput>;
  decommissioningDate?: InputMaybe<DateOperationFilterInput>;
  estate?: InputMaybe<EstateFilterInput>;
  fields?: InputMaybe<ListFilterInputTypeOfCatalogueItemFieldFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  lastMaintenanceDate?: InputMaybe<DateOperationFilterInput>;
  or?: InputMaybe<Array<CatalogueItemFilterInput>>;
  status?: InputMaybe<EstateStatusOperationFilterInput>;
};

export type CatalogueItemInput = {
  activationDate: Scalars['Date']['input'];
  catalogueTypeId: Scalars['Int']['input'];
  decommissioningDate?: InputMaybe<Scalars['Date']['input']>;
  estateId: Scalars['Int']['input'];
  fields: Array<CatalogueItemFieldInput>;
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  lastMaintenanceDate: Scalars['Date']['input'];
  status: EstateStatus;
};

export type CatalogueItemMutations = {
  __typename?: 'CatalogueItemMutations';
  delete: Result;
  deleteRange: Result;
  document: CatalogueItemDocumentMutations;
  update: ResultOfCatalogueItem;
};

export type CatalogueItemMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CatalogueItemMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CatalogueItemMutationsUpdateArgs = {
  input: CatalogueItemInput;
};

export type CatalogueItemQueries = {
  __typename?: 'CatalogueItemQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  documents: CatalogueItemDocumentQueries;
  exportToExcel: FileUrlOutput;
  get?: Maybe<CatalogueItem>;
  listCatalogueItems?: Maybe<ListCatalogueItemsConnection>;
  listCatalogueItemsFull: Array<CatalogueItem>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type CatalogueItemQueriesCanUseInternalCodeArgs = {
  currentCatalogueItemId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type CatalogueItemQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CatalogueItemSortInput>>;
  where?: InputMaybe<CatalogueItemFilterInput>;
};

export type CatalogueItemQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type CatalogueItemQueriesListCatalogueItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CatalogueItemSortInput>>;
  where?: InputMaybe<CatalogueItemFilterInput>;
};

export type CatalogueItemQueriesListCatalogueItemsFullArgs = {
  order?: InputMaybe<Array<CatalogueItemSortInput>>;
  where?: InputMaybe<CatalogueItemFilterInput>;
};

export type CatalogueItemQueriesProposeNewInternalCodeArgs = {
  additionallyOccupiedCodes: Array<Scalars['String']['input']>;
};

export type CatalogueItemSortInput = {
  activationDate?: InputMaybe<SortEnumType>;
  catalogueType?: InputMaybe<CatalogueTypeSortInput>;
  decommissioningDate?: InputMaybe<SortEnumType>;
  estate?: InputMaybe<EstateSortInput>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  lastMaintenanceDate?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export type CatalogueMutations = {
  __typename?: 'CatalogueMutations';
  add: ResultOfCatalogueItem__;
  delete: Result;
  deleteRange: Result;
  document: CatalogueDocumentMutations;
  update: ResultOfCatalogueItem__;
};

export type CatalogueMutationsAddArgs = {
  inputs: Array<CatalogueItemInput>;
};

export type CatalogueMutationsDeleteArgs = {
  id: CatalogueIdInput;
};

export type CatalogueMutationsDeleteRangeArgs = {
  ids: Array<CatalogueIdInput>;
};

export type CatalogueMutationsUpdateArgs = {
  id: CatalogueIdInput;
  inputs: Array<CatalogueItemInput>;
};

export type CatalogueOutput = {
  __typename?: 'CatalogueOutput';
  catalogueCategory?: Maybe<Scalars['String']['output']>;
  catalogueSubCategory?: Maybe<Scalars['String']['output']>;
  catalogueType?: Maybe<Scalars['String']['output']>;
  catalogueTypeCount: Scalars['Int']['output'];
  catalogueTypeId: Scalars['Int']['output'];
  estateId: Scalars['Int']['output'];
  estateInternalCode?: Maybe<Scalars['String']['output']>;
};

export type CatalogueOutputFilterInput = {
  CatalogueCategory?: InputMaybe<CustomStringFilterInput>;
  CatalogueSubCategory?: InputMaybe<CustomStringFilterInput>;
  CatalogueType?: InputMaybe<CustomStringFilterInput>;
  EstateInternalCode?: InputMaybe<CustomStringFilterInput>;
  and?: InputMaybe<Array<CatalogueOutputFilterInput>>;
  catalogueCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueSubCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueType?: InputMaybe<CustomStringFilterInput>;
  catalogueTypeCount?: InputMaybe<IntOperationFilterInput>;
  catalogueTypeId?: InputMaybe<IntOperationFilterInput>;
  estateId?: InputMaybe<IntOperationFilterInput>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueOutputFilterInput>>;
};

export type CatalogueOutputSortInput = {
  catalogueCategory?: InputMaybe<SortEnumType>;
  catalogueSubCategory?: InputMaybe<SortEnumType>;
  catalogueType?: InputMaybe<SortEnumType>;
  catalogueTypeCount?: InputMaybe<SortEnumType>;
  catalogueTypeId?: InputMaybe<SortEnumType>;
  estateId?: InputMaybe<SortEnumType>;
  estateInternalCode?: InputMaybe<SortEnumType>;
};

export type CatalogueQueries = {
  __typename?: 'CatalogueQueries';
  documents: CatalogueDocumentQueries;
  exportToExcel: FileUrlOutput;
  get: Array<CatalogueItem>;
  listCatalogues?: Maybe<ListCataloguesConnection>;
};

export type CatalogueQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CatalogueOutputSortInput>>;
  where?: InputMaybe<CatalogueOutputFilterInput>;
};

export type CatalogueQueriesGetArgs = {
  catalogueTypeId: Scalars['Int']['input'];
  estateId: Scalars['Int']['input'];
};

export type CatalogueQueriesListCataloguesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CatalogueOutputSortInput>>;
  where?: InputMaybe<CatalogueOutputFilterInput>;
};

export type CatalogueSubCategory = {
  __typename?: 'CatalogueSubCategory';
  catalogueTypes: Array<CatalogueType>;
  category: CatalogueCategory;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CatalogueSubCategoryFilterInput = {
  and?: InputMaybe<Array<CatalogueSubCategoryFilterInput>>;
  catalogueTypes?: InputMaybe<ListFilterInputTypeOfCatalogueTypeFilterInput>;
  category?: InputMaybe<CatalogueCategoryFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueSubCategoryFilterInput>>;
};

export type CatalogueSubCategoryInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueSubCategorySortInput = {
  category?: InputMaybe<CatalogueCategorySortInput>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type CatalogueType = {
  __typename?: 'CatalogueType';
  activities: Array<CatalogueTypeActivity>;
  category: CatalogueCategory;
  fields?: Maybe<Array<Array<CatalogueTypeField>>>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  items: Array<CatalogueItem>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  subCategory?: Maybe<CatalogueSubCategory>;
  usageTypes: Array<EstateUsageType>;
};

export type CatalogueTypeActivity = {
  __typename?: 'CatalogueTypeActivity';
  activityType: CatalogueTypeActivityType;
  id: Scalars['Int']['output'];
  isMandatoryByLaw: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: CatalogueType;
};

export type CatalogueTypeActivityFilterInput = {
  activityType?: InputMaybe<CatalogueTypeActivityTypeOperationFilterInput>;
  and?: InputMaybe<Array<CatalogueTypeActivityFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  isMandatoryByLaw?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueTypeActivityFilterInput>>;
  type?: InputMaybe<CatalogueTypeFilterInput>;
};

export type CatalogueTypeActivityInput = {
  activityType: CatalogueTypeActivityType;
  id?: InputMaybe<Scalars['Int']['input']>;
  isMandatoryByLaw: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum CatalogueTypeActivityType {
  OnIncident = 'ON_INCIDENT',
  PlannedMaintenance = 'PLANNED_MAINTENANCE',
}

export type CatalogueTypeActivityTypeOperationFilterInput = {
  eq?: InputMaybe<CatalogueTypeActivityType>;
  in?: InputMaybe<Array<CatalogueTypeActivityType>>;
  neq?: InputMaybe<CatalogueTypeActivityType>;
  nin?: InputMaybe<Array<CatalogueTypeActivityType>>;
};

export type CatalogueTypeField = {
  __typename?: 'CatalogueTypeField';
  id: Scalars['UUID']['output'];
  isMandatory: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: CustomFieldType;
  validValues?: Maybe<Array<Scalars['String']['output']>>;
};

export type CatalogueTypeFieldFilterInput = {
  and?: InputMaybe<Array<CatalogueTypeFieldFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isMandatory?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueTypeFieldFilterInput>>;
  type?: InputMaybe<CustomFieldTypeOperationFilterInput>;
  validValues?: InputMaybe<ListCustomStringFilterInput>;
};

export type CatalogueTypeFieldInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  isMandatory: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: CustomFieldType;
  validValues?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CatalogueTypeFilterInput = {
  activities?: InputMaybe<ListFilterInputTypeOfCatalogueTypeActivityFilterInput>;
  and?: InputMaybe<Array<CatalogueTypeFilterInput>>;
  category?: InputMaybe<CatalogueCategoryFilterInput>;
  fields?: InputMaybe<ListListFilterInputTypeOfCatalogueTypeFieldFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  items?: InputMaybe<ListFilterInputTypeOfCatalogueItemFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CatalogueTypeFilterInput>>;
  subCategory?: InputMaybe<CatalogueSubCategoryFilterInput>;
  usageTypes?: InputMaybe<ListFilterInputTypeOfEstateUsageTypeFilterInput>;
};

export type CatalogueTypeInput = {
  activities: Array<CatalogueTypeActivityInput>;
  categoryId: Scalars['Int']['input'];
  fields?: InputMaybe<Array<Array<CatalogueTypeFieldInput>>>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  subCategoryId?: InputMaybe<Scalars['Int']['input']>;
  usageTypeIds: Array<Scalars['Int']['input']>;
};

export type CatalogueTypeMutations = {
  __typename?: 'CatalogueTypeMutations';
  add: ResultOfCatalogueType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfCatalogueType;
};

export type CatalogueTypeMutationsAddArgs = {
  input: CatalogueTypeInput;
};

export type CatalogueTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CatalogueTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CatalogueTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: CatalogueTypeInput;
};

export type CatalogueTypeQueries = {
  __typename?: 'CatalogueTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<CatalogueType>;
  listCatalogueTypes?: Maybe<ListCatalogueTypesConnection>;
  listCatalogueTypesFull: Array<CatalogueType>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type CatalogueTypeQueriesCanUseInternalCodeArgs = {
  currentCatalogueTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type CatalogueTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CatalogueTypeSortInput>>;
  where?: InputMaybe<CatalogueTypeFilterInput>;
};

export type CatalogueTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type CatalogueTypeQueriesListCatalogueTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keepTopIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CatalogueTypeSortInput>>;
  where?: InputMaybe<CatalogueTypeFilterInput>;
};

export type CatalogueTypeQueriesListCatalogueTypesFullArgs = {
  order?: InputMaybe<Array<CatalogueTypeSortInput>>;
  where?: InputMaybe<CatalogueTypeFilterInput>;
};

export type CatalogueTypeSortInput = {
  category?: InputMaybe<CatalogueCategorySortInput>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  subCategory?: InputMaybe<CatalogueSubCategorySortInput>;
};

export type CategoryFunctionFlags = {
  __typename?: 'CategoryFunctionFlags';
  isAgreementParty: Scalars['Boolean']['output'];
  isBuildingAdministrator: Scalars['Boolean']['output'];
  isCompanyGroup: Scalars['Boolean']['output'];
  isEmployee: Scalars['Boolean']['output'];
  isHeir: Scalars['Boolean']['output'];
  isLandlord: Scalars['Boolean']['output'];
  isNone: Scalars['Boolean']['output'];
  isOfficer: Scalars['Boolean']['output'];
  isSupplier: Scalars['Boolean']['output'];
  isTenant: Scalars['Boolean']['output'];
};

export type CategoryFunctionFlagsInput = {
  isAgreementParty?: InputMaybe<Scalars['Boolean']['input']>;
  isBuildingAdministrator?: InputMaybe<Scalars['Boolean']['input']>;
  isCompanyGroup?: InputMaybe<Scalars['Boolean']['input']>;
  isEmployee?: InputMaybe<Scalars['Boolean']['input']>;
  isHeir?: InputMaybe<Scalars['Boolean']['input']>;
  isLandlord?: InputMaybe<Scalars['Boolean']['input']>;
  isNone?: InputMaybe<Scalars['Boolean']['input']>;
  isOfficer?: InputMaybe<Scalars['Boolean']['input']>;
  isSupplier?: InputMaybe<Scalars['Boolean']['input']>;
  isTenant?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryFunctionOperationFilterInput = {
  eq?: InputMaybe<CategoryFunctionFlagsInput>;
  in?: InputMaybe<Array<CategoryFunctionFlagsInput>>;
  neq?: InputMaybe<CategoryFunctionFlagsInput>;
  nin?: InputMaybe<Array<CategoryFunctionFlagsInput>>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ChecklistTicketsCountLineChartDataPoint = {
  __typename?: 'ChecklistTicketsCountLineChartDataPoint';
  onTriggerConditionCount: Scalars['Int']['output'];
  preventiveCount: Scalars['Int']['output'];
};

export type City = {
  __typename?: 'City';
  administrativeBoundary?: Maybe<GeoJsonPolygonType>;
  cadastralCode?: Maybe<Scalars['String']['output']>;
  cityExternalCode?: Maybe<Scalars['String']['output']>;
  cityProvider: Scalars['UUID']['output'];
  climateZoneCode?: Maybe<Scalars['String']['output']>;
  countryISO: Scalars['String']['output'];
  countryName?: Maybe<Scalars['String']['output']>;
  countyExternalCode?: Maybe<Scalars['String']['output']>;
  countyGuid?: Maybe<Scalars['UUID']['output']>;
  countyName?: Maybe<Scalars['String']['output']>;
  countyShortCode?: Maybe<Scalars['String']['output']>;
  creationDate: Scalars['DateTime']['output'];
  guid: Scalars['UUID']['output'];
  id: Scalars['Int']['output'];
  isCountyMainCity: Scalars['Boolean']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  name2?: Maybe<Scalars['String']['output']>;
  name3?: Maybe<Scalars['String']['output']>;
  regionExternalCode?: Maybe<Scalars['String']['output']>;
  regionGuid?: Maybe<Scalars['UUID']['output']>;
  regionName?: Maybe<Scalars['String']['output']>;
};

export type CityFilterInput = {
  and?: InputMaybe<Array<CityFilterInput>>;
  countryISO?: InputMaybe<CustomStringFilterInput>;
  countryName?: InputMaybe<CustomStringFilterInput>;
  countyName?: InputMaybe<CustomStringFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  name2?: InputMaybe<CustomStringFilterInput>;
  name3?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CityFilterInput>>;
  regionName?: InputMaybe<CustomStringFilterInput>;
};

export type CityInput = {
  countryISO: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CityMutations = {
  __typename?: 'CityMutations';
  add?: Maybe<City>;
  delete: Scalars['Boolean']['output'];
  update: Scalars['Boolean']['output'];
};

export type CityMutationsAddArgs = {
  city: CityInput;
};

export type CityMutationsDeleteArgs = {
  cityId: Scalars['Int']['input'];
};

export type CityMutationsUpdateArgs = {
  city: CityInput;
  cityId: Scalars['Int']['input'];
};

export type CityQueries = {
  __typename?: 'CityQueries';
  city?: Maybe<City>;
  findCountyCity: ResultOfCity;
  listCities?: Maybe<ListCitiesConnection>;
  listCitiesFull: Array<City>;
};

export type CityQueriesCityArgs = {
  cityId: Scalars['Int']['input'];
};

export type CityQueriesFindCountyCityArgs = {
  countyShortCode: Scalars['String']['input'];
};

export type CityQueriesListCitiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CitySortInput>>;
  where?: InputMaybe<CityFilterInput>;
};

export type CityQueriesListCitiesFullArgs = {
  order?: InputMaybe<Array<CitySortInput>>;
  where?: InputMaybe<CityFilterInput>;
};

export type CitySortInput = {
  countryName?: InputMaybe<SortEnumType>;
  countyName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  regionName?: InputMaybe<SortEnumType>;
};

export type Column = {
  __typename?: 'Column';
  code: Scalars['String']['output'];
  filterKey?: Maybe<Scalars['String']['output']>;
  isMandatory: Scalars['Boolean']['output'];
  isReadonly: Scalars['Boolean']['output'];
  isVisibleInDetail: Scalars['Boolean']['output'];
  isVisibleInTable: Scalars['Boolean']['output'];
  sourceField?: Maybe<Scalars['String']['output']>;
  sourceKey: Scalars['String']['output'];
  valueType: SubValueType;
  writebackKey?: Maybe<Scalars['String']['output']>;
};

export type CommEstateUnit = {
  __typename?: 'CommEstateUnit';
  cadastralAddressNumbering?: Maybe<Scalars['String']['output']>;
  cadastralAddressToponymy?: Maybe<Scalars['String']['output']>;
  cadastralCategory?: Maybe<Scalars['String']['output']>;
  cadastralCoordinateLevel1?: Maybe<Scalars['String']['output']>;
  cadastralCoordinateLevel2?: Maybe<Scalars['String']['output']>;
  cadastralCoordinateLevel3?: Maybe<Scalars['String']['output']>;
  cadastralCoordinateLevel4?: Maybe<Scalars['String']['output']>;
  cadastralIncome?: Maybe<Scalars['Decimal']['output']>;
  cadastreType?: Maybe<Scalars['String']['output']>;
  cityId?: Maybe<Scalars['Int']['output']>;
  communicationIndex: Scalars['Int']['output'];
  estatePartition?: Maybe<Scalars['String']['output']>;
  estateUnit: EstateUnit;
  estateUnitId: Scalars['Int']['output'];
  estateUnitType?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

export type CommEstateUnitFilterInput = {
  and?: InputMaybe<Array<CommEstateUnitFilterInput>>;
  cadastralAddressNumbering?: InputMaybe<CustomStringFilterInput>;
  cadastralAddressToponymy?: InputMaybe<CustomStringFilterInput>;
  cadastralCategory?: InputMaybe<CustomStringFilterInput>;
  cadastralCoordinateLevel1?: InputMaybe<CustomStringFilterInput>;
  cadastralCoordinateLevel2?: InputMaybe<CustomStringFilterInput>;
  cadastralCoordinateLevel3?: InputMaybe<CustomStringFilterInput>;
  cadastralCoordinateLevel4?: InputMaybe<CustomStringFilterInput>;
  cadastralIncome?: InputMaybe<DecimalOperationFilterInput>;
  cadastreType?: InputMaybe<CustomStringFilterInput>;
  cityId?: InputMaybe<IntOperationFilterInput>;
  communicationIndex?: InputMaybe<IntOperationFilterInput>;
  estatePartition?: InputMaybe<CustomStringFilterInput>;
  estateUnitId?: InputMaybe<IntOperationFilterInput>;
  estateUnitType?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<CommEstateUnitFilterInput>>;
};

export enum CommunicationType {
  ItaRli12Death = 'ITA_RLI12_DEATH',
  ItaRli12FirstRegistration = 'ITA_RLI12_FIRST_REGISTRATION',
  ItaRli12Takeover = 'ITA_RLI12_TAKEOVER',
  ItaRli12Transfer = 'ITA_RLI12_TRANSFER',
  ItaRli12Update = 'ITA_RLI12_UPDATE',
}

export type CommunicationTypeOperationFilterInput = {
  eq?: InputMaybe<CommunicationType>;
  in?: InputMaybe<Array<CommunicationType>>;
  neq?: InputMaybe<CommunicationType>;
  nin?: InputMaybe<Array<CommunicationType>>;
};

export enum CompanyGroup {
  Leader = 'LEADER',
  Member = 'MEMBER',
}

export type CompanyGroupInput = {
  groupRelation: CompanyGroup;
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export enum ComparisonOperator {
  Between = 'BETWEEN',
  GreaterThan = 'GREATER_THAN',
  LessThan = 'LESS_THAN',
}

export type ComplexTicketCondition = TicketCondition & {
  __typename?: 'ComplexTicketCondition';
  id: Scalars['Int']['output'];
  internalConditions: Array<TicketCondition>;
  operator: BooleanOperator;
};

export type ComplexTicketConditionFilterInput = {
  and?: InputMaybe<Array<ComplexTicketConditionFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalConditions?: InputMaybe<ListFilterInputTypeOfTicketConditionFilterInput>;
  operator?: InputMaybe<BooleanOperatorOperationFilterInput>;
  or?: InputMaybe<Array<ComplexTicketConditionFilterInput>>;
};

export type ComplexTicketConditionInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  internalConditions: Array<OneOfTicketConditionInput>;
  operator: BooleanOperator;
};

export type ComplexTicketConditionSortInput = {
  id?: InputMaybe<SortEnumType>;
  operator?: InputMaybe<SortEnumType>;
};

export type Config = {
  __typename?: 'Config';
  function: ConfigFunction;
  id: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type ConfigField = {
  __typename?: 'ConfigField';
  id: Scalars['UUID']['output'];
  isMandatory: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type: CustomFieldType;
  validValues?: Maybe<Array<KeyValuePairOfStringAndString>>;
};

export type ConfigFilterInput = {
  and?: InputMaybe<Array<ConfigFilterInput>>;
  function?: InputMaybe<ConfigFunctionOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastUpdated?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ConfigFilterInput>>;
  value?: InputMaybe<CustomStringFilterInput>;
};

export enum ConfigFunction {
  CmisEndpoint = 'CMIS_ENDPOINT',
  DataImport = 'DATA_IMPORT',
  ExternalLogin = 'EXTERNAL_LOGIN',
  Geocoder = 'GEOCODER',
  PasswordLogin = 'PASSWORD_LOGIN',
  SepaXmlExport = 'SEPA_XML_EXPORT',
}

export type ConfigFunctionOperationFilterInput = {
  eq?: InputMaybe<ConfigFunction>;
  in?: InputMaybe<Array<ConfigFunction>>;
  neq?: InputMaybe<ConfigFunction>;
  nin?: InputMaybe<Array<ConfigFunction>>;
};

export type ConfigSection = {
  __typename?: 'ConfigSection';
  form: Array<Array<ConfigField>>;
  name: Scalars['String']['output'];
  taxCalculator: Scalars['UUID']['output'];
};

export type ConfigSortInput = {
  function?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastUpdated?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
};

export type ConfirmTemporaryRegistryCommunicationGroupInput = {
  date: Scalars['Date']['input'];
  debtBankAccountId: Scalars['Int']['input'];
  managementSubjectId: Scalars['Int']['input'];
  requestingSubjectLegalRepresentativeId: Scalars['Int']['input'];
};

export type ConfirmedRegistryCommunicationGroupIdInput = {
  communicationType: CommunicationType;
  date: Scalars['Date']['input'];
  debtBankAccountId: Scalars['Int']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
  isActiveContract: Scalars['Boolean']['input'];
  managementSubjectId: Scalars['Int']['input'];
  requestingSubjectLegalRepresentativeId: Scalars['Int']['input'];
};

export type ConfirmedRegistryCommunicationMutations = {
  __typename?: 'ConfirmedRegistryCommunicationMutations';
  cancelConfirmation: Result;
  cancelRangeConfirmation: Result;
};

export type ConfirmedRegistryCommunicationMutationsCancelConfirmationArgs = {
  groupId: ConfirmedRegistryCommunicationGroupIdInput;
};

export type ConfirmedRegistryCommunicationMutationsCancelRangeConfirmationArgs = {
  groupIds: Array<ConfirmedRegistryCommunicationGroupIdInput>;
};

export type Contact = {
  __typename?: 'Contact';
  contactInfo?: Maybe<Scalars['String']['output']>;
  contactInfoType: ContactInfoType;
  contactType: ContactType;
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
};

export type ContactFilterInput = {
  and?: InputMaybe<Array<ContactFilterInput>>;
  contactInfo?: InputMaybe<CustomStringFilterInput>;
  contactInfoType?: InputMaybe<ContactInfoTypeOperationFilterInput>;
  contactType?: InputMaybe<ContactTypeOperationFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ContactFilterInput>>;
};

export enum ContactInfoType {
  EMail = 'E_MAIL',
  LandlinePhone = 'LANDLINE_PHONE',
  MobilePhone = 'MOBILE_PHONE',
  RegisteredEmail = 'REGISTERED_EMAIL',
  Skype = 'SKYPE',
  Unknown = 'UNKNOWN',
}

export type ContactInfoTypeOperationFilterInput = {
  eq?: InputMaybe<ContactInfoType>;
  in?: InputMaybe<Array<ContactInfoType>>;
  neq?: InputMaybe<ContactInfoType>;
  nin?: InputMaybe<Array<ContactInfoType>>;
};

export type ContactInput = {
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  contactInfoType: ContactInfoType;
  contactType: ContactType;
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export enum ContactType {
  Backup = 'BACKUP',
  Main = 'MAIN',
}

export type ContactTypeOperationFilterInput = {
  eq?: InputMaybe<ContactType>;
  in?: InputMaybe<Array<ContactType>>;
  neq?: InputMaybe<ContactType>;
  nin?: InputMaybe<Array<ContactType>>;
};

export enum ContentCategory {
  BldAdminCadastre = 'BLD_ADMIN_CADASTRE',
  BldAdminCommunications = 'BLD_ADMIN_COMMUNICATIONS',
  BldAdminContext = 'BLD_ADMIN_CONTEXT',
  BldAdminGeneric = 'BLD_ADMIN_GENERIC',
  BldAdminGovernment = 'BLD_ADMIN_GOVERNMENT',
  BldAdminLimitations = 'BLD_ADMIN_LIMITATIONS',
  BldAdminOrigin = 'BLD_ADMIN_ORIGIN',
  BldAdminOwnership = 'BLD_ADMIN_OWNERSHIP',
  BldAdminPermitsApprovals = 'BLD_ADMIN_PERMITS_APPROVALS',
  BldMgmtCommunications = 'BLD_MGMT_COMMUNICATIONS',
  BldMgmtCondominium = 'BLD_MGMT_CONDOMINIUM',
  BldMgmtEquipmentManuals = 'BLD_MGMT_EQUIPMENT_MANUALS',
  BldMgmtEquipmentWarranties = 'BLD_MGMT_EQUIPMENT_WARRANTIES',
  BldMgmtGeneric = 'BLD_MGMT_GENERIC',
  BldMgmtIncidentsReports = 'BLD_MGMT_INCIDENTS_REPORTS',
  BldMgmtInspections = 'BLD_MGMT_INSPECTIONS',
  BldMgmtInsurance = 'BLD_MGMT_INSURANCE',
  BldMgmtLitigation = 'BLD_MGMT_LITIGATION',
  BldMgmtMaintenance = 'BLD_MGMT_MAINTENANCE',
  BldMgmtProcurement = 'BLD_MGMT_PROCUREMENT',
  BldMgmtRevamping = 'BLD_MGMT_REVAMPING',
  BldMgmtSafetyTraining = 'BLD_MGMT_SAFETY_TRAINING',
  BldMgmtSelling = 'BLD_MGMT_SELLING',
  BldMgmtUsage = 'BLD_MGMT_USAGE',
  BldMgmtUtilities = 'BLD_MGMT_UTILITIES',
  BldPhoto = 'BLD_PHOTO',
  BldPlan = 'BLD_PLAN',
  BldTechAsbestoAndMsds = 'BLD_TECH_ASBESTO_AND_MSDS',
  BldTechBuildtech = 'BLD_TECH_BUILDTECH',
  BldTechCommunications = 'BLD_TECH_COMMUNICATIONS',
  BldTechEnergyAcoustics = 'BLD_TECH_ENERGY_ACOUSTICS',
  BldTechFireproofing = 'BLD_TECH_FIREPROOFING',
  BldTechGeneric = 'BLD_TECH_GENERIC',
  BldTechObstacles = 'BLD_TECH_OBSTACLES',
  BldTechRefactoring = 'BLD_TECH_REFACTORING',
  BldTechSafetyAndEvacuation = 'BLD_TECH_SAFETY_AND_EVACUATION',
  BldTechStructure = 'BLD_TECH_STRUCTURE',
  BldTechSystems = 'BLD_TECH_SYSTEMS',
  CatAdminCommunications = 'CAT_ADMIN_COMMUNICATIONS',
  CatAdminContracts = 'CAT_ADMIN_CONTRACTS',
  CatAdminGeneric = 'CAT_ADMIN_GENERIC',
  CatAdminOwnership = 'CAT_ADMIN_OWNERSHIP',
  CatMgmtCommunications = 'CAT_MGMT_COMMUNICATIONS',
  CatMgmtEquipmentManuals = 'CAT_MGMT_EQUIPMENT_MANUALS',
  CatMgmtEquipmentWarranties = 'CAT_MGMT_EQUIPMENT_WARRANTIES',
  CatMgmtGeneric = 'CAT_MGMT_GENERIC',
  CatMgmtInspections = 'CAT_MGMT_INSPECTIONS',
  CatMgmtMaintenanceOperation = 'CAT_MGMT_MAINTENANCE_OPERATION',
  CatMgmtOperationalReports = 'CAT_MGMT_OPERATIONAL_REPORTS',
  CatMgmtSafetyTraining = 'CAT_MGMT_SAFETY_TRAINING',
  CatTechCertifications = 'CAT_TECH_CERTIFICATIONS',
  CatTechCommunications = 'CAT_TECH_COMMUNICATIONS',
  CatTechDatasheets = 'CAT_TECH_DATASHEETS',
  CatTechGeneric = 'CAT_TECH_GENERIC',
  CatTechManuals = 'CAT_TECH_MANUALS',
  Generic = 'GENERIC',
  SbjIdentityNational = 'SBJ_IDENTITY_NATIONAL',
  SbjIdentityPassport = 'SBJ_IDENTITY_PASSPORT',
  SbjOther = 'SBJ_OTHER',
}

export type ContentCategoryOperationFilterInput = {
  eq?: InputMaybe<ContentCategory>;
  in?: InputMaybe<Array<ContentCategory>>;
  neq?: InputMaybe<ContentCategory>;
  nin?: InputMaybe<Array<ContentCategory>>;
};

export enum ContentType {
  CadDrawing = 'CAD_DRAWING',
  Email = 'EMAIL',
  Generic = 'GENERIC',
  Image = 'IMAGE',
  Paper = 'PAPER',
  Pdf = 'PDF',
  Spreadsheet = 'SPREADSHEET',
  Video = 'VIDEO',
}

export type ContentTypeOperationFilterInput = {
  eq?: InputMaybe<ContentType>;
  in?: InputMaybe<Array<ContentType>>;
  neq?: InputMaybe<ContentType>;
  nin?: InputMaybe<Array<ContentType>>;
};

export type Contract = {
  __typename?: 'Contract';
  agreementDate: Scalars['Date']['output'];
  anytimeTerminationWarningMonths?: Maybe<Scalars['Int']['output']>;
  billingAfterTerm: Scalars['Boolean']['output'];
  billingAlignedToCalendarYear: Scalars['Boolean']['output'];
  billingAppliesBaseFee: Scalars['Boolean']['output'];
  billingBaseFee?: Maybe<Scalars['Decimal']['output']>;
  billingBaseFeeBillItemType?: Maybe<BillItemType>;
  billingEndDate?: Maybe<Scalars['Date']['output']>;
  billingNotes?: Maybe<Scalars['String']['output']>;
  billingPauses: Array<BillingPause>;
  billingPeriod?: Maybe<BillingPeriod>;
  billingStartDate: Scalars['Date']['output'];
  billingVATRateType?: Maybe<VatRateType>;
  billingWithSplitPayment: Scalars['Boolean']['output'];
  billingWithStampTax?: Maybe<AutomaticBoolean>;
  bills: Array<Bill>;
  canUseDocumentName: Scalars['Boolean']['output'];
  counterparts: Array<Counterpart>;
  documents: Array<DocumentsPerContentCategoryGroupOutput>;
  durationYears: Scalars['Int']['output'];
  effectStartDate: Scalars['Date']['output'];
  externalCode?: Maybe<Scalars['String']['output']>;
  firstTermDurationMonths?: Maybe<Scalars['Int']['output']>;
  firstTermExpirationDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isOccupiedWithoutRight?: Maybe<Scalars['Boolean']['output']>;
  isReleased: Scalars['Boolean']['output'];
  landlord: ISubject;
  lastRenewalStartDate: Scalars['Date']['output'];
  locatedUnits: Array<LocatedUnit>;
  managementSubject: ISubject;
  managementSubjectId: Scalars['Int']['output'];
  nonRenewalWarningMonths?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  oneshotAdditions: Array<OneshotAddition>;
  previousCode?: Maybe<Scalars['String']['output']>;
  ratePlans: Array<RatePlan>;
  reason: Reason;
  recoverBillsAfterSuspension: Scalars['Boolean']['output'];
  recurringAdditions: Array<RecurringAddition>;
  registrationPayments: Array<RegistrationPayment>;
  registrationTaxData?: Maybe<RegistrationTax>;
  registryCommunications: Array<RegistryCommunication>;
  releaseDate?: Maybe<Scalars['Date']['output']>;
  releaseReason?: Maybe<ReleaseReason>;
  revaluationData?: Maybe<Revaluation>;
  revaluationHistories: Array<RevaluationHistory>;
  secondTermDurationMonths?: Maybe<Scalars['Int']['output']>;
  secondTermExpirationDate?: Maybe<Scalars['Date']['output']>;
  securityDeposits: Array<SecurityDeposit>;
  status: EntryStatus;
  subLocations: Array<Contract>;
  sublocatedContract?: Maybe<Contract>;
  takeovers: Array<Takeover>;
  tenant: ISubject;
  terminationDate?: Maybe<Scalars['Date']['output']>;
  terminator?: Maybe<ContractTerminator>;
  transactors: Array<Transactor>;
  type: ContractType;
};

export type ContractCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type ContractDocumentsArgs = {
  order?: InputMaybe<Array<DocumentsPerContentCategoryGroupOutputSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type ContractDeathVariationNewCounterpartInput = {
  contractSharePercent: Scalars['Float']['input'];
  isMainCounterpart: Scalars['Boolean']['input'];
  subjectId: Scalars['Int']['input'];
  takeoverDate: Scalars['Date']['input'];
  type?: InputMaybe<CounterpartType>;
};

export type ContractDocumentExpiredNotification = DocumentExpiredNotification &
  Notification & {
    __typename?: 'ContractDocumentExpiredNotification';
    documentCmisId: Scalars['String']['output'];
    entityId: Scalars['Int']['output'];
    id: Scalars['Int']['output'];
    isContractActive: Scalars['Boolean']['output'];
    isContractSublocated: Scalars['Boolean']['output'];
    status: NotificationStatus;
    timestamp: Scalars['DateTime']['output'];
    username: Scalars['String']['output'];
  };

export type ContractDocumentMutations = {
  __typename?: 'ContractDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: ResultOfDocument__;
  update: ResultOfDocument;
};

export type ContractDocumentMutationsAddRangeArgs = {
  contractId: Scalars['Int']['input'];
  inputs: Array<DocumentInput>;
};

export type ContractDocumentMutationsDeleteRangeArgs = {
  cmisIds: Array<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
};

export type ContractDocumentMutationsUpdateArgs = {
  contractId: Scalars['Int']['input'];
  input: DocumentInput;
};

export type ContractDocumentOutput = {
  __typename?: 'ContractDocumentOutput';
  cmisId: Scalars['String']['output'];
  creationDate: Scalars['DateTime']['output'];
  entityId?: Maybe<Scalars['String']['output']>;
  entityIntId?: Maybe<Scalars['Int']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  isContractActive: Scalars['Boolean']['output'];
  isContractSublocated: Scalars['Boolean']['output'];
  issueDate?: Maybe<Scalars['Date']['output']>;
  issuer?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  protocolNumber?: Maybe<Scalars['String']['output']>;
  since?: Maybe<Scalars['DateTime']['output']>;
  until?: Maybe<Scalars['DateTime']['output']>;
  uploaderName?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of items. */
export type ContractDocumentsConnection = {
  __typename?: 'ContractDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ContractDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ContractDocumentsOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ContractDocumentsEdge = {
  __typename?: 'ContractDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ContractDocumentsOutput;
};

export type ContractDocumentsFlatOutputFilterInput = {
  and?: InputMaybe<Array<ContractDocumentsFlatOutputFilterInput>>;
  contentCategoryGroup?: InputMaybe<CustomStringFilterInput>;
  contractInternalCode?: InputMaybe<CustomStringFilterInput>;
  document?: InputMaybe<DocumentFilterInput>;
  or?: InputMaybe<Array<ContractDocumentsFlatOutputFilterInput>>;
};

export type ContractDocumentsOutput = {
  __typename?: 'ContractDocumentsOutput';
  contractInternalCode: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<ContractDocumentsPerContentCategoryGroupOutput>;
};

export type ContractDocumentsOutputSortInput = {
  contractInternalCode?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

export type ContractDocumentsPerContentCategoryGroupOutput = {
  __typename?: 'ContractDocumentsPerContentCategoryGroupOutput';
  contentCategoryGroup: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<ContractDocumentsPerContentCategoryOutput>;
};

export type ContractDocumentsPerContentCategoryOutput = {
  __typename?: 'ContractDocumentsPerContentCategoryOutput';
  contentCategory: ContentCategory;
  guid: Scalars['UUID']['output'];
  subRows: Array<ContractDocumentOutput>;
};

export type ContractExpiryOutput = {
  __typename?: 'ContractExpiryOutput';
  billingBaseFee?: Maybe<Scalars['Decimal']['output']>;
  contractId: Scalars['Int']['output'];
  daysToExpiration: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  managementSubjectName?: Maybe<Scalars['String']['output']>;
  typeDescription?: Maybe<Scalars['String']['output']>;
};

export type ContractFilterInput = {
  agreementDate?: InputMaybe<DateOperationFilterInput>;
  and?: InputMaybe<Array<ContractFilterInput>>;
  anyLocatedUnitInternalCodeContains?: InputMaybe<Scalars['String']['input']>;
  anytimeTerminationWarningMonths?: InputMaybe<IntOperationFilterInput>;
  billingAfterTerm?: InputMaybe<BooleanOperationFilterInput>;
  billingAlignedToCalendarYear?: InputMaybe<BooleanOperationFilterInput>;
  billingAppliesBaseFee?: InputMaybe<BooleanOperationFilterInput>;
  billingBaseFee?: InputMaybe<DecimalOperationFilterInput>;
  billingBaseFeeBillItemType?: InputMaybe<BillItemTypeFilterInput>;
  billingEndDate?: InputMaybe<DateOperationFilterInput>;
  billingNotes?: InputMaybe<CustomStringFilterInput>;
  billingPauses?: InputMaybe<ListFilterInputTypeOfBillingPauseFilterInput>;
  billingPeriod?: InputMaybe<NullableOfBillingPeriodOperationFilterInput>;
  billingStartDate?: InputMaybe<DateOperationFilterInput>;
  billingVATRateType?: InputMaybe<NullableOfVatRateTypeOperationFilterInput>;
  billingWithSplitPayment?: InputMaybe<BooleanOperationFilterInput>;
  billingWithStampTax?: InputMaybe<NullableOfAutomaticBooleanOperationFilterInput>;
  bills?: InputMaybe<ListFilterInputTypeOfBillFilterInput>;
  counterpartName?: InputMaybe<CustomStringFilterInput>;
  counterparts?: InputMaybe<ListFilterInputTypeOfCounterpartFilterInput>;
  daysToExpiration?: InputMaybe<IntOperationFilterInput>;
  durationYears?: InputMaybe<IntOperationFilterInput>;
  effectStartDate?: InputMaybe<DateOperationFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  firstTermDurationMonths?: InputMaybe<IntOperationFilterInput>;
  firstTermExpirationDate?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isOccupiedWithoutRight?: InputMaybe<BooleanOperationFilterInput>;
  isReleased?: InputMaybe<BooleanOperationFilterInput>;
  isSublocated?: InputMaybe<BooleanOperationFilterInput>;
  landlordName?: InputMaybe<CustomStringFilterInput>;
  lastRenewalStartDate?: InputMaybe<DateOperationFilterInput>;
  locatedUnits?: InputMaybe<ListFilterInputTypeOfLocatedUnitFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  nonRenewalWarningMonths?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  oneshotAdditions?: InputMaybe<ListFilterInputTypeOfOneshotAdditionFilterInput>;
  or?: InputMaybe<Array<ContractFilterInput>>;
  previousCode?: InputMaybe<CustomStringFilterInput>;
  ratePlans?: InputMaybe<ListFilterInputTypeOfRatePlanFilterInput>;
  reason?: InputMaybe<ReasonOperationFilterInput>;
  recoverBillsAfterSuspension?: InputMaybe<BooleanOperationFilterInput>;
  recurringAdditions?: InputMaybe<ListFilterInputTypeOfRecurringAdditionFilterInput>;
  registrationPayments?: InputMaybe<ListFilterInputTypeOfRegistrationPaymentFilterInput>;
  registrationTaxData?: InputMaybe<RegistrationTaxFilterInput>;
  registryCommunications?: InputMaybe<ListFilterInputTypeOfRegistryCommunicationFilterInput>;
  releaseDate?: InputMaybe<DateOperationFilterInput>;
  releaseReason?: InputMaybe<NullableOfReleaseReasonOperationFilterInput>;
  revaluationData?: InputMaybe<RevaluationFilterInput>;
  revaluationHistories?: InputMaybe<ListFilterInputTypeOfRevaluationHistoryFilterInput>;
  secondTermDurationMonths?: InputMaybe<IntOperationFilterInput>;
  secondTermExpirationDate?: InputMaybe<DateOperationFilterInput>;
  securityDeposits?: InputMaybe<ListFilterInputTypeOfSecurityDepositFilterInput>;
  status?: InputMaybe<EntryStatusOperationFilterInput>;
  subLocations?: InputMaybe<ListFilterInputTypeOfContractFilterInput>;
  sublocatedContract?: InputMaybe<ContractFilterInput>;
  takeovers?: InputMaybe<ListFilterInputTypeOfTakeoverFilterInput>;
  tenantName?: InputMaybe<CustomStringFilterInput>;
  terminationDate?: InputMaybe<DateOperationFilterInput>;
  terminator?: InputMaybe<NullableOfContractTerminatorOperationFilterInput>;
  transactors?: InputMaybe<ListFilterInputTypeOfTransactorFilterInput>;
  type?: InputMaybe<ContractTypeFilterInput>;
};

export type ContractInput = {
  agreementDate: Scalars['Date']['input'];
  anytimeTerminationWarningMonths?: InputMaybe<Scalars['Int']['input']>;
  billingAfterTerm: Scalars['Boolean']['input'];
  billingAlignedToCalendarYear: Scalars['Boolean']['input'];
  billingAppliesBaseFee: Scalars['Boolean']['input'];
  billingBaseFee?: InputMaybe<Scalars['Decimal']['input']>;
  billingBaseFeeBillItemTypeId?: InputMaybe<Scalars['Int']['input']>;
  billingEndDate?: InputMaybe<Scalars['Date']['input']>;
  billingNotes?: InputMaybe<Scalars['String']['input']>;
  billingPeriod?: InputMaybe<BillingPeriod>;
  billingStartDate: Scalars['Date']['input'];
  billingVATRateType?: InputMaybe<VatRateType>;
  billingWithSplitPayment: Scalars['Boolean']['input'];
  billingWithStampTax?: InputMaybe<AutomaticBoolean>;
  counterparts: Array<CounterpartInput>;
  effectStartDate: Scalars['Date']['input'];
  externalCode?: InputMaybe<Scalars['String']['input']>;
  firstTermDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  firstTermExpirationDate?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  lastRenewalStartDate: Scalars['Date']['input'];
  locatedUnits: Array<LocatedUnitInput>;
  managementSubjectId: Scalars['Int']['input'];
  nonRenewalWarningMonths?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  oneshotAdditions: Array<OneshotAdditionInput>;
  previousCode?: InputMaybe<Scalars['String']['input']>;
  ratePlans: Array<RatePlanInput>;
  reason: Reason;
  recoverBillsAfterSuspension: Scalars['Boolean']['input'];
  recurringAdditions: Array<RecurringAdditionInput>;
  registrationTaxData?: InputMaybe<RegistrationTaxInput>;
  revaluationData?: InputMaybe<RevaluationInput>;
  secondTermDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  secondTermExpirationDate?: InputMaybe<Scalars['Date']['input']>;
  securityDeposits: Array<SecurityDepositInput>;
  status: EntryStatus;
  sublocatedContract?: InputMaybe<SublocatedContractInput>;
  terminationDate?: InputMaybe<Scalars['Date']['input']>;
  terminator?: InputMaybe<ContractTerminator>;
  transactors: Array<TransactorInput>;
  typeId: Scalars['Int']['input'];
};

export type ContractListLocatedUnitOutput = {
  __typename?: 'ContractListLocatedUnitOutput';
  estateUnitAddress?: Maybe<AsstAddress>;
  estateUnitName?: Maybe<Scalars['String']['output']>;
  estateUnitOrSubUnitInternalCode?: Maybe<Scalars['String']['output']>;
  isMainUnit: Scalars['Boolean']['output'];
  isPartialLocation: Scalars['Boolean']['output'];
  isRegistryUpdateEnabled: Scalars['Boolean']['output'];
  surfaceSqM?: Maybe<Scalars['Int']['output']>;
};

export type ContractListOutput = {
  __typename?: 'ContractListOutput';
  agreementDate: Scalars['Date']['output'];
  anytimeTerminationWarningMonths?: Maybe<Scalars['Int']['output']>;
  counterpartName?: Maybe<Scalars['String']['output']>;
  daysToExpiration?: Maybe<Scalars['Int']['output']>;
  effectStartDate: Scalars['Date']['output'];
  expirationDate?: Maybe<Scalars['Date']['output']>;
  externalCode?: Maybe<Scalars['String']['output']>;
  firstTermDurationMonths?: Maybe<Scalars['Int']['output']>;
  firstTermExpirationDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isOccupiedWithoutRight?: Maybe<Scalars['Boolean']['output']>;
  isSublocated: Scalars['Boolean']['output'];
  lastRenewalStartDate: Scalars['Date']['output'];
  locatedUnits: Array<ContractListLocatedUnitOutput>;
  managementSubjectName?: Maybe<Scalars['String']['output']>;
  nonRenewalWarningMonths?: Maybe<Scalars['Int']['output']>;
  reason: Reason;
  releaseDate?: Maybe<Scalars['Date']['output']>;
  releaseReason?: Maybe<ReleaseReason>;
  secondTermDurationMonths?: Maybe<Scalars['Int']['output']>;
  secondTermExpirationDate?: Maybe<Scalars['Date']['output']>;
  status: EntryStatus;
  terminationDate?: Maybe<Scalars['Date']['output']>;
  terminator?: Maybe<ContractTerminator>;
  typeDescription?: Maybe<Scalars['String']['output']>;
};

export type ContractMonthlyStatisticsOutput = {
  __typename?: 'ContractMonthlyStatisticsOutput';
  date: Scalars['Date']['output'];
  totalActiveContractsCount: Scalars['Int']['output'];
  totalActiveContractsRevenue: Scalars['Decimal']['output'];
  totalPassiveContractsCount: Scalars['Int']['output'];
  totalPassiveContractsRevenue: Scalars['Decimal']['output'];
};

export type ContractMutations = {
  __typename?: 'ContractMutations';
  add: ResultOfContract;
  delete: Result;
  deleteRange: Result;
  document: ContractDocumentMutations;
  pauseBilling: ResultOfBillingPause;
  release: Result;
  resumeBilling: ResultOfBillingPause;
  transferManagementSubject: Result;
  update: ResultOfContract;
};

export type ContractMutationsAddArgs = {
  input: ContractInput;
};

export type ContractMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type ContractMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type ContractMutationsPauseBillingArgs = {
  contractId: Scalars['Int']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  since: Scalars['Date']['input'];
};

export type ContractMutationsReleaseArgs = {
  id: Scalars['Int']['input'];
  isOccupiedWithoutRight: Scalars['Boolean']['input'];
  releaseDate?: InputMaybe<Scalars['Date']['input']>;
  releaseReason?: InputMaybe<ReleaseReason>;
};

export type ContractMutationsResumeBillingArgs = {
  contractId: Scalars['Int']['input'];
  isRecoveryArrears: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  pauseEndDate: Scalars['Date']['input'];
};

export type ContractMutationsTransferManagementSubjectArgs = {
  contractIds: Array<Scalars['Int']['input']>;
  legalRepresentativeSubjectId: Scalars['Int']['input'];
  newManagementSubjectId: Scalars['Int']['input'];
  paymentDate: Scalars['Date']['input'];
  takeoverType: TakeoverType;
  terminationDate: Scalars['Date']['input'];
};

export type ContractMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ContractInput;
};

export type ContractNoDateNewCounterpartInput = {
  contractSharePercent: Scalars['Float']['input'];
  isMainCounterpart: Scalars['Boolean']['input'];
  subjectId: Scalars['Int']['input'];
  type?: InputMaybe<CounterpartType>;
};

export type ContractNoDateUpdateCounterpartInput = {
  contractSharePercent: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
  isMainCounterpart: Scalars['Boolean']['input'];
};

export type ContractQueries = {
  __typename?: 'ContractQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  contract?: Maybe<Contract>;
  exportToExcel: FileUrlOutput;
  lastContractExpiries: Array<ContractExpiryOutput>;
  listContracts?: Maybe<ListContractsConnection>;
  listContractsFull: Array<Contract>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  statistics: ContractStatisticsOutput;
};

export type ContractQueriesCanUseInternalCodeArgs = {
  currentContractId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type ContractQueriesContractArgs = {
  contractId: Scalars['Int']['input'];
};

export type ContractQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<ContractSortInput>>;
  where?: InputMaybe<ContractFilterInput>;
};

export type ContractQueriesLastContractExpiriesArgs = {
  isActive: Scalars['Boolean']['input'];
};

export type ContractQueriesListContractsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ContractSortInput>>;
  where?: InputMaybe<ContractFilterInput>;
};

export type ContractQueriesListContractsFullArgs = {
  order?: InputMaybe<Array<ContractSortInput>>;
  where?: InputMaybe<ContractFilterInput>;
};

export type ContractQueriesProposeNewInternalCodeArgs = {
  isActiveContract: Scalars['Boolean']['input'];
};

export type ContractSortInput = {
  agreementDate?: InputMaybe<SortEnumType>;
  anytimeTerminationWarningMonths?: InputMaybe<SortEnumType>;
  billingAfterTerm?: InputMaybe<SortEnumType>;
  billingAlignedToCalendarYear?: InputMaybe<SortEnumType>;
  billingAppliesBaseFee?: InputMaybe<SortEnumType>;
  billingBaseFee?: InputMaybe<SortEnumType>;
  billingBaseFeeBillItemType?: InputMaybe<BillItemTypeSortInput>;
  billingEndDate?: InputMaybe<SortEnumType>;
  billingNotes?: InputMaybe<SortEnumType>;
  billingPeriod?: InputMaybe<SortEnumType>;
  billingStartDate?: InputMaybe<SortEnumType>;
  billingVATRateType?: InputMaybe<SortEnumType>;
  billingWithSplitPayment?: InputMaybe<SortEnumType>;
  billingWithStampTax?: InputMaybe<SortEnumType>;
  counterpartName?: InputMaybe<SortEnumType>;
  daysToExpiration?: InputMaybe<SortEnumType>;
  durationYears?: InputMaybe<SortEnumType>;
  effectStartDate?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  firstTermDurationMonths?: InputMaybe<SortEnumType>;
  firstTermExpirationDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  isOccupiedWithoutRight?: InputMaybe<SortEnumType>;
  isReleased?: InputMaybe<SortEnumType>;
  isSublocated?: InputMaybe<SortEnumType>;
  landlordName?: InputMaybe<SortEnumType>;
  lastRenewalStartDate?: InputMaybe<SortEnumType>;
  managementSubjectId?: InputMaybe<SortEnumType>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  nonRenewalWarningMonths?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  previousCode?: InputMaybe<SortEnumType>;
  reason?: InputMaybe<SortEnumType>;
  recoverBillsAfterSuspension?: InputMaybe<SortEnumType>;
  registrationTaxData?: InputMaybe<RegistrationTaxSortInput>;
  releaseDate?: InputMaybe<SortEnumType>;
  releaseReason?: InputMaybe<SortEnumType>;
  revaluationData?: InputMaybe<RevaluationSortInput>;
  secondTermDurationMonths?: InputMaybe<SortEnumType>;
  secondTermExpirationDate?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  sublocatedContract?: InputMaybe<ContractSortInput>;
  tenantName?: InputMaybe<SortEnumType>;
  terminationDate?: InputMaybe<SortEnumType>;
  terminator?: InputMaybe<SortEnumType>;
  type?: InputMaybe<ContractTypeSortInput>;
};

export type ContractStatisticsOutput = {
  __typename?: 'ContractStatisticsOutput';
  monthly: Array<ContractMonthlyStatisticsOutput>;
  yearly: Array<ContractYearlyStatisticsOutput>;
};

export type ContractTemplate = {
  __typename?: 'ContractTemplate';
  catalogueTypeIds: Array<Scalars['Int']['output']>;
  catalogueTypes: Array<CatalogueType>;
  contractType: FcltContractType;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  penalties: Array<Penalty>;
  slas: Array<Sla>;
};

export type ContractTemplateFilterInput = {
  and?: InputMaybe<Array<ContractTemplateFilterInput>>;
  catalogueTypeIds?: InputMaybe<ListIntOperationFilterInput>;
  contractType?: InputMaybe<FcltContractTypeFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ContractTemplateFilterInput>>;
  penalties?: InputMaybe<ListFilterInputTypeOfPenaltyFilterInput>;
  slas?: InputMaybe<ListFilterInputTypeOfSlaFilterInput>;
};

export type ContractTemplateInput = {
  catalogueTypeIds: Array<Scalars['Int']['input']>;
  contractTypeId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  internalCode: Scalars['String']['input'];
  penaltyIds: Array<Scalars['Int']['input']>;
  slaIds: Array<Scalars['Int']['input']>;
};

export type ContractTemplateMutations = {
  __typename?: 'ContractTemplateMutations';
  add: ResultOfContractTemplate;
  delete: Result;
  deleteRange: Result;
  update: ResultOfContractTemplate;
};

export type ContractTemplateMutationsAddArgs = {
  input: ContractTemplateInput;
};

export type ContractTemplateMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type ContractTemplateMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type ContractTemplateMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ContractTemplateInput;
};

export type ContractTemplateQueries = {
  __typename?: 'ContractTemplateQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<ContractTemplate>;
  listContractTemplates?: Maybe<ListContractTemplatesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type ContractTemplateQueriesCanUseInternalCodeArgs = {
  currentContractTemplateId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type ContractTemplateQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<ContractTemplateSortInput>>;
  where?: InputMaybe<ContractTemplateFilterInput>;
};

export type ContractTemplateQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type ContractTemplateQueriesListContractTemplatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ContractTemplateSortInput>>;
  where?: InputMaybe<ContractTemplateFilterInput>;
};

export type ContractTemplateSortInput = {
  contractType?: InputMaybe<FcltContractTypeSortInput>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
};

export enum ContractTerminator {
  Landlord = 'LANDLORD',
  Tenant = 'TENANT',
}

export type ContractType = {
  __typename?: 'ContractType';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isAbsoluteRevaluation: Scalars['Boolean']['output'];
  isActive: Scalars['Boolean']['output'];
  isRegistrationTax: Scalars['Boolean']['output'];
  isRentChargeApplicable: Scalars['Boolean']['output'];
  isRevaluationApplicable: Scalars['Boolean']['output'];
  isStampTax: Scalars['Boolean']['output'];
  nature: AssetNature;
  registrationTaxIncomeType?: Maybe<RegistrationTaxIncomeTypeRli>;
  registrationTaxPercent?: Maybe<Scalars['Float']['output']>;
  registrationTaxTenantPercent?: Maybe<Scalars['Float']['output']>;
  revaluationCalculationMonth?: Maybe<Scalars['Int']['output']>;
  revaluationIndexMonth?: Maybe<Scalars['Int']['output']>;
  revaluationRatePercent?: Maybe<Scalars['Decimal']['output']>;
  usageType: EstateUsageType;
  usageTypeId: Scalars['Int']['output'];
};

export type ContractTypeFilterInput = {
  and?: InputMaybe<Array<ContractTypeFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isAbsoluteRevaluation?: InputMaybe<BooleanOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isRegistrationTax?: InputMaybe<BooleanOperationFilterInput>;
  isRentChargeApplicable?: InputMaybe<BooleanOperationFilterInput>;
  isRevaluationApplicable?: InputMaybe<BooleanOperationFilterInput>;
  isStampTax?: InputMaybe<BooleanOperationFilterInput>;
  nature?: InputMaybe<AssetNatureOperationFilterInput>;
  or?: InputMaybe<Array<ContractTypeFilterInput>>;
  registrationTaxIncomeType?: InputMaybe<NullableOfRegistrationTaxIncomeTypeRliOperationFilterInput>;
  registrationTaxPercent?: InputMaybe<FloatOperationFilterInput>;
  registrationTaxTenantPercent?: InputMaybe<FloatOperationFilterInput>;
  revaluationCalculationMonth?: InputMaybe<IntOperationFilterInput>;
  revaluationIndexMonth?: InputMaybe<IntOperationFilterInput>;
  revaluationRatePercent?: InputMaybe<DecimalOperationFilterInput>;
  usageTypeId?: InputMaybe<IntOperationFilterInput>;
  usageTypeName?: InputMaybe<CustomStringFilterInput>;
};

export type ContractTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  isAbsoluteRevaluation: Scalars['Boolean']['input'];
  isActive: Scalars['Boolean']['input'];
  isRegistrationTax: Scalars['Boolean']['input'];
  isRentChargeApplicable: Scalars['Boolean']['input'];
  isRevaluationApplicable: Scalars['Boolean']['input'];
  isStampTax: Scalars['Boolean']['input'];
  nature: AssetNature;
  registrationTaxIncomeType?: InputMaybe<RegistrationTaxIncomeTypeRli>;
  registrationTaxPercent?: InputMaybe<Scalars['Float']['input']>;
  registrationTaxTenantPercent?: InputMaybe<Scalars['Float']['input']>;
  revaluationCalculationMonth?: InputMaybe<Scalars['Int']['input']>;
  revaluationIndexMonth?: InputMaybe<Scalars['Int']['input']>;
  revaluationRatePercent?: InputMaybe<Scalars['Decimal']['input']>;
  usageTypeId: Scalars['Int']['input'];
};

export type ContractTypeMutations = {
  __typename?: 'ContractTypeMutations';
  add: ResultOfContractType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfContractType;
};

export type ContractTypeMutationsAddArgs = {
  input: ContractTypeInput;
};

export type ContractTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type ContractTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type ContractTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ContractTypeInput;
};

export type ContractTypeQueries = {
  __typename?: 'ContractTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<ContractType>;
  listContractTypes?: Maybe<ListContractTypesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type ContractTypeQueriesCanUseInternalCodeArgs = {
  currentContractTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type ContractTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<ContractTypeSortInput>>;
  where?: InputMaybe<ContractTypeFilterInput>;
};

export type ContractTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type ContractTypeQueriesListContractTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ContractTypeSortInput>>;
  where?: InputMaybe<ContractTypeFilterInput>;
};

export type ContractTypeSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  isAbsoluteRevaluation?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isRegistrationTax?: InputMaybe<SortEnumType>;
  isRentChargeApplicable?: InputMaybe<SortEnumType>;
  isRevaluationApplicable?: InputMaybe<SortEnumType>;
  isStampTax?: InputMaybe<SortEnumType>;
  nature?: InputMaybe<SortEnumType>;
  registrationTaxIncomeType?: InputMaybe<SortEnumType>;
  registrationTaxPercent?: InputMaybe<SortEnumType>;
  registrationTaxTenantPercent?: InputMaybe<SortEnumType>;
  revaluationCalculationMonth?: InputMaybe<SortEnumType>;
  revaluationIndexMonth?: InputMaybe<SortEnumType>;
  revaluationRatePercent?: InputMaybe<SortEnumType>;
  usageTypeId?: InputMaybe<SortEnumType>;
  usageTypeName?: InputMaybe<SortEnumType>;
};

export type ContractVariationNewCounterpartInput = {
  contractSharePercent: Scalars['Float']['input'];
  isMainCounterpart: Scalars['Boolean']['input'];
  since: Scalars['Date']['input'];
  subjectId: Scalars['Int']['input'];
  type?: InputMaybe<CounterpartType>;
};

export type ContractVariationUpdatedCounterpartInput = {
  contractSharePercent: Scalars['Float']['input'];
  id: Scalars['Int']['input'];
  isMainCounterpart: Scalars['Boolean']['input'];
  type?: InputMaybe<CounterpartType>;
};

export type ContractYearlyStatisticsOutput = {
  __typename?: 'ContractYearlyStatisticsOutput';
  month: Scalars['Int']['output'];
  totalActiveContractsCount: Scalars['Int']['output'];
  totalActiveContractsRevenue: Scalars['Decimal']['output'];
  totalPassiveContractsCount: Scalars['Int']['output'];
  totalPassiveContractsRevenue: Scalars['Decimal']['output'];
};

export type ContractsExpirationNotification = Notification & {
  __typename?: 'ContractsExpirationNotification';
  contractIds: Array<Scalars['Int']['output']>;
  daysToExpiration: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isActiveContracts: Scalars['Boolean']['output'];
  status: NotificationStatus;
  timestamp: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry = TicketHistoryEntry & {
  __typename?: 'ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry';
  id: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export enum CoordinateType {
  GenericOverride = 'GENERIC_OVERRIDE',
  ItalianOrdinary = 'ITALIAN_ORDINARY',
}

export type CoordinateTypeOperationFilterInput = {
  eq?: InputMaybe<CoordinateType>;
  in?: InputMaybe<Array<CoordinateType>>;
  neq?: InputMaybe<CoordinateType>;
  nin?: InputMaybe<Array<CoordinateType>>;
};

export enum CostBaseFactor {
  Forfait = 'FORFAIT',
  SqM = 'SQ_M',
}

export type CostBaseFactorOperationFilterInput = {
  eq?: InputMaybe<CostBaseFactor>;
  in?: InputMaybe<Array<CostBaseFactor>>;
  neq?: InputMaybe<CostBaseFactor>;
  nin?: InputMaybe<Array<CostBaseFactor>>;
};

export type CostCharge = {
  __typename?: 'CostCharge';
  actualConsumption?: Maybe<CostChargeConsumption>;
  dueDate: Scalars['Date']['output'];
  expectedConsumption?: Maybe<CostChargeConsumption>;
  fields: Array<CostChargeField>;
  id: Scalars['Int']['output'];
  invoiceNumber: Scalars['String']['output'];
  invoicedConsumptionAmount: Scalars['Decimal']['output'];
  periodEnd: Scalars['Date']['output'];
  periodStart: Scalars['Date']['output'];
  referenceDate: Scalars['Date']['output'];
  service: UtilityService;
  totalAmount: Scalars['Decimal']['output'];
  totalVATAmount: Scalars['Decimal']['output'];
};

export type CostChargeAnalysis = {
  __typename?: 'CostChargeAnalysis';
  consumption: CostChargeAnalysisConsumption;
  cost: CostChargeAnalysisCost;
  measurementUnit: Scalars['String']['output'];
  perYear: Array<KeyValuePairOfInt32AndCostChargeYearlyAnalysis>;
  surface: CostChargeAnalysisSurface;
};

export enum CostChargeAnalysisCategory {
  Electricity = 'ELECTRICITY',
  Gas = 'GAS',
  Other = 'OTHER',
  Water = 'WATER',
}

export type CostChargeAnalysisConsumption = {
  __typename?: 'CostChargeAnalysisConsumption';
  currentYearValue: Scalars['Decimal']['output'];
  difference: Scalars['Decimal']['output'];
  differencePercentage?: Maybe<Scalars['Decimal']['output']>;
  previousYearValue: Scalars['Decimal']['output'];
};

export type CostChargeAnalysisCost = {
  __typename?: 'CostChargeAnalysisCost';
  currentYearValue: Scalars['Decimal']['output'];
  difference: Scalars['Decimal']['output'];
  differencePercentage?: Maybe<Scalars['Decimal']['output']>;
  previousYearValue: Scalars['Decimal']['output'];
};

export type CostChargeAnalysisFiltersInput = {
  cityName?: InputMaybe<Scalars['String']['input']>;
  countyName?: InputMaybe<Scalars['String']['input']>;
  estateIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  toponymy?: InputMaybe<Scalars['String']['input']>;
  utilityContractCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  utilityTypesIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CostChargeAnalysisSurface = {
  __typename?: 'CostChargeAnalysisSurface';
  currentYear?: Maybe<CostChargeAnalysisSurfaceValue>;
  previousYear?: Maybe<CostChargeAnalysisSurfaceValue>;
};

export type CostChargeAnalysisSurfaceValue = {
  __typename?: 'CostChargeAnalysisSurfaceValue';
  area: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
};

export type CostChargeAnalysisValue = {
  __typename?: 'CostChargeAnalysisValue';
  consumptionPerGrossSurface?: Maybe<Scalars['Decimal']['output']>;
  consumptionPerHeatingCoolingSurface?: Maybe<Scalars['Decimal']['output']>;
  costPerGrossSurface?: Maybe<Scalars['Decimal']['output']>;
  costPerHeatingCoolingSurface?: Maybe<Scalars['Decimal']['output']>;
  totalConsumption: Scalars['Decimal']['output'];
  totalCost: Scalars['Decimal']['output'];
};

export type CostChargeConsumption = {
  __typename?: 'CostChargeConsumption';
  since: Scalars['Date']['output'];
  until: Scalars['Date']['output'];
  values: Array<ReadingValue>;
};

export type CostChargeConsumptionFilterInput = {
  and?: InputMaybe<Array<CostChargeConsumptionFilterInput>>;
  or?: InputMaybe<Array<CostChargeConsumptionFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
  values?: InputMaybe<ListFilterInputTypeOfReadingValueFilterInput>;
};

export type CostChargeConsumptionInput = {
  since: Scalars['Date']['input'];
  until: Scalars['Date']['input'];
  values: Array<ReadingValueInput>;
};

export type CostChargeConsumptionSortInput = {
  since?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
};

export type CostChargeField = {
  __typename?: 'CostChargeField';
  isMandatory: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  templateTypeId: Scalars['UUID']['output'];
  type: CustomFieldType;
  value?: Maybe<Scalars['String']['output']>;
};

export type CostChargeFieldFilterInput = {
  and?: InputMaybe<Array<CostChargeFieldFilterInput>>;
  isMandatory?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CostChargeFieldFilterInput>>;
  templateTypeId?: InputMaybe<UuidOperationFilterInput>;
  type?: InputMaybe<CustomFieldTypeOperationFilterInput>;
  value?: InputMaybe<CustomStringFilterInput>;
};

export type CostChargeFieldInput = {
  isMandatory: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  templateTypeId: Scalars['UUID']['input'];
  type: CustomFieldType;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CostChargeFilterInput = {
  actualConsumption?: InputMaybe<CostChargeConsumptionFilterInput>;
  and?: InputMaybe<Array<CostChargeFilterInput>>;
  dueDate?: InputMaybe<DateOperationFilterInput>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  expectedConsumption?: InputMaybe<CostChargeConsumptionFilterInput>;
  fields?: InputMaybe<ListFilterInputTypeOfCostChargeFieldFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  invoiceNumber?: InputMaybe<CustomStringFilterInput>;
  invoicedConsumptionAmount?: InputMaybe<DecimalOperationFilterInput>;
  or?: InputMaybe<Array<CostChargeFilterInput>>;
  periodEnd?: InputMaybe<DateOperationFilterInput>;
  periodStart?: InputMaybe<DateOperationFilterInput>;
  referenceDate?: InputMaybe<DateOperationFilterInput>;
  service?: InputMaybe<UtilityServiceFilterInput>;
  totalAmount?: InputMaybe<DecimalOperationFilterInput>;
  totalVATAmount?: InputMaybe<DecimalOperationFilterInput>;
};

export type CostChargeInput = {
  actualConsumption?: InputMaybe<CostChargeConsumptionInput>;
  dueDate: Scalars['Date']['input'];
  expectedConsumption?: InputMaybe<CostChargeConsumptionInput>;
  fields: Array<CostChargeFieldInput>;
  invoiceNumber: Scalars['String']['input'];
  invoicedConsumptionAmount: Scalars['Decimal']['input'];
  periodEnd: Scalars['Date']['input'];
  periodStart: Scalars['Date']['input'];
  referenceDate: Scalars['Date']['input'];
  serviceId: Scalars['Int']['input'];
  totalAmount: Scalars['Decimal']['input'];
  totalVATAmount: Scalars['Decimal']['input'];
};

export type CostChargeMutations = {
  __typename?: 'CostChargeMutations';
  add: ResultOfCostCharge;
  delete: Result;
  deleteRange: Result;
  import: ResultOfInt32;
  update: ResultOfCostCharge;
};

export type CostChargeMutationsAddArgs = {
  input: CostChargeInput;
};

export type CostChargeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CostChargeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CostChargeMutationsImportArgs = {
  file: Scalars['Upload']['input'];
};

export type CostChargeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: CostChargeInput;
};

export type CostChargeQueries = {
  __typename?: 'CostChargeQueries';
  analysis: Array<KeyValuePairOfCostChargeAnalysisCategoryAndCostChargeAnalysis>;
  exportToExcel: FileUrlOutput;
  filteredAddresses?: Maybe<FilteredAddressesConnection>;
  filteredCityNames?: Maybe<FilteredCityNamesConnection>;
  filteredCountyNames?: Maybe<FilteredCountyNamesConnection>;
  filteredEstates?: Maybe<FilteredEstatesConnection>;
  filteredUtilityServices?: Maybe<FilteredUtilityServicesConnection>;
  filteredUtilityTypes?: Maybe<FilteredUtilityTypesConnection>;
  get?: Maybe<CostCharge>;
  listCostCharges?: Maybe<ListCostChargesConnection>;
  templateOfImportFromCsv: FileUrlOutput;
  templateOfImportFromExcel: FileUrlOutput;
};

export type CostChargeQueriesAnalysisArgs = {
  filters: CostChargeAnalysisFiltersInput;
};

export type CostChargeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CostChargeSortInput>>;
  where?: InputMaybe<CostChargeFilterInput>;
};

export type CostChargeQueriesFilteredAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CostChargeAnalysisFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<AsstAddressSortInput>>;
  where?: InputMaybe<AsstAddressFilterInput>;
};

export type CostChargeQueriesFilteredCityNamesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CostChargeAnalysisFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FilteredCityNameSortInput>>;
  where?: InputMaybe<FilteredCityNameFilterInput>;
};

export type CostChargeQueriesFilteredCountyNamesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CostChargeAnalysisFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FilteredCountyNameSortInput>>;
  where?: InputMaybe<FilteredCountyNameFilterInput>;
};

export type CostChargeQueriesFilteredEstatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CostChargeAnalysisFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateSortInput>>;
  where?: InputMaybe<EstateFilterInput>;
};

export type CostChargeQueriesFilteredUtilityServicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CostChargeAnalysisFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UtilityServiceSortInput>>;
  where?: InputMaybe<UtilityServiceFilterInput>;
};

export type CostChargeQueriesFilteredUtilityTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<CostChargeAnalysisFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UtilityTypeSortInput>>;
  where?: InputMaybe<UtilityTypeFilterInput>;
};

export type CostChargeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type CostChargeQueriesListCostChargesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CostChargeSortInput>>;
  where?: InputMaybe<CostChargeFilterInput>;
};

export type CostChargeSortInput = {
  actualConsumption?: InputMaybe<CostChargeConsumptionSortInput>;
  dueDate?: InputMaybe<SortEnumType>;
  expectedConsumption?: InputMaybe<CostChargeConsumptionSortInput>;
  id?: InputMaybe<SortEnumType>;
  invoiceNumber?: InputMaybe<SortEnumType>;
  invoicedConsumptionAmount?: InputMaybe<SortEnumType>;
  periodEnd?: InputMaybe<SortEnumType>;
  periodStart?: InputMaybe<SortEnumType>;
  referenceDate?: InputMaybe<SortEnumType>;
  service?: InputMaybe<UtilityServiceSortInput>;
  totalAmount?: InputMaybe<SortEnumType>;
  totalVATAmount?: InputMaybe<SortEnumType>;
};

export type CostChargeYearlyAnalysis = {
  __typename?: 'CostChargeYearlyAnalysis';
  perMonth?: Maybe<Array<KeyValuePairOfInt32AndCostChargeAnalysisValue>>;
  value: CostChargeAnalysisValue;
};

export type CostChargesExpirationNotification = Notification & {
  __typename?: 'CostChargesExpirationNotification';
  costChargeIds: Array<Scalars['Int']['output']>;
  daysToExpiration: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status: NotificationStatus;
  timestamp: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type Counterpart = {
  __typename?: 'Counterpart';
  contractSharePercent: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  isMainCounterpart: Scalars['Boolean']['output'];
  since: Scalars['Date']['output'];
  subject: ISubject;
  subjectId: Scalars['Int']['output'];
  type: CounterpartType;
  until?: Maybe<Scalars['Date']['output']>;
};

export type CounterpartFilterInput = {
  and?: InputMaybe<Array<CounterpartFilterInput>>;
  contractSharePercent?: InputMaybe<FloatOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isMainCounterpart?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CounterpartFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  subjectId?: InputMaybe<IntOperationFilterInput>;
  type?: InputMaybe<CounterpartTypeOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type CounterpartInput = {
  contractSharePercent: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  isMainCounterpart: Scalars['Boolean']['input'];
  since: Scalars['Date']['input'];
  subjectId: Scalars['Int']['input'];
  type: CounterpartType;
  until?: InputMaybe<Scalars['Date']['input']>;
};

export enum CounterpartType {
  NonProfit = 'NON_PROFIT',
  PhysicalSubjectWithTemporaryId = 'PHYSICAL_SUBJECT_WITH_TEMPORARY_ID',
  Regular = 'REGULAR',
}

export type CounterpartTypeOperationFilterInput = {
  eq?: InputMaybe<CounterpartType>;
  in?: InputMaybe<Array<CounterpartType>>;
  neq?: InputMaybe<CounterpartType>;
  nin?: InputMaybe<Array<CounterpartType>>;
};

export type Craft = {
  __typename?: 'Craft';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type CraftFilterInput = {
  and?: InputMaybe<Array<CraftFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<CraftFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type CraftInput = {
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type CraftMutations = {
  __typename?: 'CraftMutations';
  add: ResultOfCraft;
  delete: Result;
  deleteRange: Result;
  update: ResultOfCraft;
};

export type CraftMutationsAddArgs = {
  input: CraftInput;
};

export type CraftMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type CraftMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type CraftMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: CraftInput;
};

export type CraftQueries = {
  __typename?: 'CraftQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<Craft>;
  listCrafts?: Maybe<ListCraftsConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type CraftQueriesCanUseInternalCodeArgs = {
  currentCraftId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type CraftQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<CraftSortInput>>;
  where?: InputMaybe<CraftFilterInput>;
};

export type CraftQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type CraftQueriesListCraftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CraftSortInput>>;
  where?: InputMaybe<CraftFilterInput>;
};

export type CraftSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export enum CustomFieldType {
  Date = 'DATE',
  SimpleNumber = 'SIMPLE_NUMBER',
  SimpleText = 'SIMPLE_TEXT',
  SingleItemFromList = 'SINGLE_ITEM_FROM_LIST',
}

export type CustomFieldTypeOperationFilterInput = {
  eq?: InputMaybe<CustomFieldType>;
  in?: InputMaybe<Array<CustomFieldType>>;
  neq?: InputMaybe<CustomFieldType>;
  nin?: InputMaybe<Array<CustomFieldType>>;
};

export type CustomStringFilterInput = {
  and?: InputMaybe<Array<CustomStringFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<CustomStringFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type DateOperationFilterInput = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
  ngt?: InputMaybe<Scalars['Date']['input']>;
  ngte?: InputMaybe<Scalars['Date']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  nlt?: InputMaybe<Scalars['Date']['input']>;
  nlte?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}

export type DayOfWeekOperationFilterInput = {
  eq?: InputMaybe<DayOfWeek>;
  in?: InputMaybe<Array<DayOfWeek>>;
  neq?: InputMaybe<DayOfWeek>;
  nin?: InputMaybe<Array<DayOfWeek>>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

/** A connection to a list of items. */
export type DetailGroupedPaymentsConnection = {
  __typename?: 'DetailGroupedPaymentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DetailGroupedPaymentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<AssetTaxDetailRow>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DetailGroupedPaymentsEdge = {
  __typename?: 'DetailGroupedPaymentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: AssetTaxDetailRow;
};

export type Document = {
  __typename?: 'Document';
  cmisId: Scalars['String']['output'];
  contentCategory: ContentCategory;
  contentCategoryGroup: Scalars['String']['output'];
  contentType: ContentType;
  creationDate: Scalars['DateTime']['output'];
  entityId?: Maybe<Scalars['String']['output']>;
  entityIntId?: Maybe<Scalars['Int']['output']>;
  estateId?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  folder: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  issueDate?: Maybe<Scalars['Date']['output']>;
  issuer?: Maybe<Scalars['String']['output']>;
  issuerCode?: Maybe<Scalars['String']['output']>;
  managementSubjectIds: Array<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  protocolNumber?: Maybe<Scalars['String']['output']>;
  since?: Maybe<Scalars['DateTime']['output']>;
  tenantId: Scalars['String']['output'];
  until?: Maybe<Scalars['DateTime']['output']>;
  uploaderName?: Maybe<Scalars['String']['output']>;
};

export type DocumentExpiredNotification = {
  documentCmisId: Scalars['String']['output'];
  entityId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status: NotificationStatus;
  timestamp: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type DocumentFilterInput = {
  and?: InputMaybe<Array<DocumentFilterInput>>;
  cmisId?: InputMaybe<CustomStringFilterInput>;
  contentCategory?: InputMaybe<ContentCategoryOperationFilterInput>;
  contentCategoryGroupIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentContains?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<ContentTypeOperationFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  entityId?: InputMaybe<CustomStringFilterInput>;
  estateId?: InputMaybe<CustomStringFilterInput>;
  fileName?: InputMaybe<CustomStringFilterInput>;
  folder?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  issueDate?: InputMaybe<DateOperationFilterInput>;
  issuer?: InputMaybe<CustomStringFilterInput>;
  issuerCode?: InputMaybe<CustomStringFilterInput>;
  managementSubjectIds?: InputMaybe<ListCustomStringFilterInput>;
  mimeType?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<DocumentFilterInput>>;
  protocolNumber?: InputMaybe<CustomStringFilterInput>;
  since?: InputMaybe<DateTimeOperationFilterInput>;
  tenantId?: InputMaybe<CustomStringFilterInput>;
  until?: InputMaybe<DateTimeOperationFilterInput>;
  uploaderName?: InputMaybe<CustomStringFilterInput>;
};

export type DocumentInput = {
  cmisId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['Upload']['input']>;
  contentCategory: ContentCategory;
  contentType: ContentType;
  fileName?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['Date']['input']>;
  issuer?: InputMaybe<Scalars['String']['input']>;
  issuerCode?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  protocolNumber?: InputMaybe<Scalars['String']['input']>;
  since?: InputMaybe<Scalars['DateTime']['input']>;
  until?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocumentQueries = {
  __typename?: 'DocumentQueries';
  allDocuments?: Maybe<AllDocumentsConnection>;
  catalogueDocuments?: Maybe<CatalogueDocumentsConnection>;
  contractDocuments?: Maybe<ContractDocumentsConnection>;
  estateDocuments?: Maybe<EstateDocumentsConnection>;
  estateUnitDocuments?: Maybe<EstateUnitDocumentsConnection>;
  exportCatalogueDocumentsToExcel: FileUrlOutput;
  exportContractDocumentsToExcel: FileUrlOutput;
  exportDocumentsToExcel: FileUrlOutput;
  exportEstateDocumentsToExcel: FileUrlOutput;
  exportEstateUnitDocumentsToExcel: FileUrlOutput;
  exportFcltContractDocumentsToExcel: FileUrlOutput;
  exportSubjectDocumentsToExcel: FileUrlOutput;
  exportTicketDocumentsToExcel: FileUrlOutput;
  fcltContractDocuments?: Maybe<FcltContractDocumentsConnection>;
  subjectDocuments?: Maybe<SubjectDocumentsConnection>;
  ticketDocuments?: Maybe<TicketDocumentsConnection>;
};

export type DocumentQueriesAllDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<DocumentRowSortInput>>;
  where?: InputMaybe<DocumentRowFilterInput>;
};

export type DocumentQueriesCatalogueDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CatalogueDocumentsOutputSortInput>>;
  where?: InputMaybe<CatalogueDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesContractDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ContractDocumentsOutputSortInput>>;
  where?: InputMaybe<ContractDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesEstateDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateDocumentsOutputSortInput>>;
  where?: InputMaybe<EstateDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesEstateUnitDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateUnitDocumentsOutputSortInput>>;
  where?: InputMaybe<EstateUnitDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesExportCatalogueDocumentsToExcelArgs = {
  order?: InputMaybe<Array<CatalogueDocumentsOutputSortInput>>;
  where?: InputMaybe<CatalogueDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesExportContractDocumentsToExcelArgs = {
  order?: InputMaybe<Array<ContractDocumentsOutputSortInput>>;
  where?: InputMaybe<ContractDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesExportDocumentsToExcelArgs = {
  order?: InputMaybe<Array<DocumentRowSortInput>>;
  where?: InputMaybe<DocumentRowFilterInput>;
};

export type DocumentQueriesExportEstateDocumentsToExcelArgs = {
  order?: InputMaybe<Array<EstateDocumentsOutputSortInput>>;
  where?: InputMaybe<EstateDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesExportEstateUnitDocumentsToExcelArgs = {
  order?: InputMaybe<Array<EstateUnitDocumentsOutputSortInput>>;
  where?: InputMaybe<EstateUnitDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesExportFcltContractDocumentsToExcelArgs = {
  order?: InputMaybe<Array<FcltContractDocumentsOutputSortInput>>;
  where?: InputMaybe<FcltContractDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesExportSubjectDocumentsToExcelArgs = {
  order?: InputMaybe<Array<SubjectDocumentsOutputSortInput>>;
  where?: InputMaybe<SubjectDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesExportTicketDocumentsToExcelArgs = {
  order?: InputMaybe<Array<TicketDocumentsOutputSortInput>>;
  where?: InputMaybe<TicketDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesFcltContractDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FcltContractDocumentsOutputSortInput>>;
  where?: InputMaybe<FcltContractDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesSubjectDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SubjectDocumentsOutputSortInput>>;
  where?: InputMaybe<SubjectDocumentsFlatOutputFilterInput>;
};

export type DocumentQueriesTicketDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketDocumentsOutputSortInput>>;
  where?: InputMaybe<TicketDocumentsFlatOutputFilterInput>;
};

export type DocumentRow = {
  __typename?: 'DocumentRow';
  catalogueCategory?: Maybe<Scalars['String']['output']>;
  catalogueItemInternalCode?: Maybe<Scalars['String']['output']>;
  catalogueSubCategory?: Maybe<Scalars['String']['output']>;
  catalogueTypeId?: Maybe<Scalars['Int']['output']>;
  catalogueTypeInternalCode?: Maybe<Scalars['String']['output']>;
  contractInternalCode?: Maybe<Scalars['String']['output']>;
  document: Document;
  estateId?: Maybe<Scalars['Int']['output']>;
  estateInternalCode?: Maybe<Scalars['String']['output']>;
  estateUnitInternalCode?: Maybe<Scalars['String']['output']>;
  fcltContractId?: Maybe<Scalars['Int']['output']>;
  fcltContractInternalCode?: Maybe<Scalars['String']['output']>;
  isContractActive?: Maybe<Scalars['Boolean']['output']>;
  isContractSublocated?: Maybe<Scalars['Boolean']['output']>;
  isTicketExcludedFromMaintenanceContract?: Maybe<Scalars['Boolean']['output']>;
  subjectInternalCode?: Maybe<Scalars['String']['output']>;
  ticketId?: Maybe<Scalars['Int']['output']>;
  ticketInternalCode?: Maybe<Scalars['String']['output']>;
};

export type DocumentRowFilterInput = {
  and?: InputMaybe<Array<DocumentRowFilterInput>>;
  catalogueCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueItemInternalCode?: InputMaybe<CustomStringFilterInput>;
  catalogueSubCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueTypeId?: InputMaybe<IntOperationFilterInput>;
  catalogueTypeInternalCode?: InputMaybe<CustomStringFilterInput>;
  contractInternalCode?: InputMaybe<CustomStringFilterInput>;
  document?: InputMaybe<DocumentFilterInput>;
  estateId?: InputMaybe<IntOperationFilterInput>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  estateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  fcltContractId?: InputMaybe<IntOperationFilterInput>;
  fcltContractInternalCode?: InputMaybe<CustomStringFilterInput>;
  isContractActive?: InputMaybe<BooleanOperationFilterInput>;
  isContractSublocated?: InputMaybe<BooleanOperationFilterInput>;
  isTicketExcludedFromMaintenanceContract?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DocumentRowFilterInput>>;
  subjectInternalCode?: InputMaybe<CustomStringFilterInput>;
  ticketId?: InputMaybe<IntOperationFilterInput>;
  ticketInternalCode?: InputMaybe<CustomStringFilterInput>;
};

export type DocumentRowSortInput = {
  catalogueCategory?: InputMaybe<SortEnumType>;
  catalogueItemInternalCode?: InputMaybe<SortEnumType>;
  catalogueSubCategory?: InputMaybe<SortEnumType>;
  catalogueTypeId?: InputMaybe<SortEnumType>;
  catalogueTypeInternalCode?: InputMaybe<SortEnumType>;
  contractInternalCode?: InputMaybe<SortEnumType>;
  document?: InputMaybe<DocumentSortInput>;
  estateId?: InputMaybe<SortEnumType>;
  estateInternalCode?: InputMaybe<SortEnumType>;
  estateUnitInternalCode?: InputMaybe<SortEnumType>;
  fcltContractId?: InputMaybe<SortEnumType>;
  fcltContractInternalCode?: InputMaybe<SortEnumType>;
  isContractActive?: InputMaybe<SortEnumType>;
  isContractSublocated?: InputMaybe<SortEnumType>;
  isTicketExcludedFromMaintenanceContract?: InputMaybe<SortEnumType>;
  subjectInternalCode?: InputMaybe<SortEnumType>;
  ticketId?: InputMaybe<SortEnumType>;
  ticketInternalCode?: InputMaybe<SortEnumType>;
};

export type DocumentSortInput = {
  cmisId?: InputMaybe<SortEnumType>;
  contentCategory?: InputMaybe<SortEnumType>;
  contentCategoryGroup?: InputMaybe<SortEnumType>;
  contentType?: InputMaybe<SortEnumType>;
  creationDate?: InputMaybe<SortEnumType>;
  entityId?: InputMaybe<SortEnumType>;
  entityIntId?: InputMaybe<SortEnumType>;
  estateId?: InputMaybe<SortEnumType>;
  fileName?: InputMaybe<SortEnumType>;
  folder?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  issueDate?: InputMaybe<SortEnumType>;
  issuer?: InputMaybe<SortEnumType>;
  issuerCode?: InputMaybe<SortEnumType>;
  mimeType?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  protocolNumber?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  tenantId?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
  uploaderName?: InputMaybe<SortEnumType>;
};

export type DocumentsPerContentCategoryGroupOutput = {
  __typename?: 'DocumentsPerContentCategoryGroupOutput';
  contentCategoryGroup: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<DocumentsPerContentCategoryOutput>;
};

export type DocumentsPerContentCategoryGroupOutputSortInput = {
  contentCategoryGroup?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

export type DocumentsPerContentCategoryOutput = {
  __typename?: 'DocumentsPerContentCategoryOutput';
  contentCategory: ContentCategory;
  guid: Scalars['UUID']['output'];
  subRows: Array<Document>;
};

export enum EntryStatus {
  FrozenClosed = 'FROZEN_CLOSED',
  IncompleteDraft = 'INCOMPLETE_DRAFT',
  Working = 'WORKING',
}

export type EntryStatusOperationFilterInput = {
  eq?: InputMaybe<EntryStatus>;
  in?: InputMaybe<Array<EntryStatus>>;
  neq?: InputMaybe<EntryStatus>;
  nin?: InputMaybe<Array<EntryStatus>>;
};

export enum EqualityOperator {
  Equal = 'EQUAL',
  NotEqual = 'NOT_EQUAL',
}

export type Estate = {
  __typename?: 'Estate';
  addresses: Array<AsstAddress>;
  buildYear?: Maybe<Scalars['Int']['output']>;
  canUseDocumentName: Scalars['Boolean']['output'];
  catalogueItems: Array<CatalogueItem>;
  decommissioningDate?: Maybe<Scalars['Date']['output']>;
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  documents: Array<DocumentsPerContentCategoryGroupOutput>;
  estateUnits: Array<EstateUnit>;
  externalCode?: Maybe<Scalars['String']['output']>;
  floors: Array<Floor>;
  id: Scalars['Int']['output'];
  images: Array<Document>;
  internalCode: Scalars['String']['output'];
  mainUsageType: EstateMainUsageType;
  managementOrgUnit?: Maybe<OrgUnit>;
  managementOrgUnitId?: Maybe<Scalars['Int']['output']>;
  managementSubject: ISubject;
  managementSubjectId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  ownership: EstateOwnership;
  refactorings: Array<Refactoring>;
  stairs: Array<Stair>;
  status: EstateStatus;
  surfaceAreaSqM?: Maybe<Scalars['Int']['output']>;
  totalMarketValue?: Maybe<EstateTotalMarketValue>;
  type: EstateType;
  usageType: EstateUsageType;
  valuations: Array<Valuation>;
};

export type EstateCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type EstateDocumentsArgs = {
  order?: InputMaybe<Array<DocumentsPerContentCategoryGroupOutputSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type EstateDocumentExpiredNotification = DocumentExpiredNotification &
  Notification & {
    __typename?: 'EstateDocumentExpiredNotification';
    documentCmisId: Scalars['String']['output'];
    entityId: Scalars['Int']['output'];
    id: Scalars['Int']['output'];
    status: NotificationStatus;
    timestamp: Scalars['DateTime']['output'];
    username: Scalars['String']['output'];
  };

export type EstateDocumentMutations = {
  __typename?: 'EstateDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: ResultOfDocument__;
  update: ResultOfDocument;
};

export type EstateDocumentMutationsAddRangeArgs = {
  estateId: Scalars['Int']['input'];
  inputs: Array<DocumentInput>;
};

export type EstateDocumentMutationsDeleteRangeArgs = {
  cmisIds: Array<Scalars['String']['input']>;
  estateId: Scalars['Int']['input'];
};

export type EstateDocumentMutationsUpdateArgs = {
  estateId: Scalars['Int']['input'];
  input: DocumentInput;
};

export type EstateDocumentQueries = {
  __typename?: 'EstateDocumentQueries';
  exportPortfolioToZip: Result;
};

export type EstateDocumentQueriesExportPortfolioToZipArgs = {
  cmisIds: Array<Scalars['String']['input']>;
  estateId: Scalars['Int']['input'];
};

/** A connection to a list of items. */
export type EstateDocumentsConnection = {
  __typename?: 'EstateDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<EstateDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateDocumentsOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type EstateDocumentsEdge = {
  __typename?: 'EstateDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateDocumentsOutput;
};

export type EstateDocumentsFlatOutputFilterInput = {
  and?: InputMaybe<Array<EstateDocumentsFlatOutputFilterInput>>;
  contentCategoryGroup?: InputMaybe<CustomStringFilterInput>;
  document?: InputMaybe<DocumentFilterInput>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<EstateDocumentsFlatOutputFilterInput>>;
};

export type EstateDocumentsOutput = {
  __typename?: 'EstateDocumentsOutput';
  estateInternalCode: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<DocumentsPerContentCategoryGroupOutput>;
};

export type EstateDocumentsOutputSortInput = {
  estateInternalCode?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

export type EstateFilterInput = {
  addresses?: InputMaybe<ListAddressFilterTypeFilterInput>;
  and?: InputMaybe<Array<EstateFilterInput>>;
  buildYear?: InputMaybe<IntOperationFilterInput>;
  catalogueItems?: InputMaybe<ListFilterInputTypeOfCatalogueItemFilterInput>;
  decommissioningDate?: InputMaybe<DateOperationFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  estateUnits?: InputMaybe<ListFilterInputTypeOfEstateUnitFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  floors?: InputMaybe<ListFilterInputTypeOfFloorFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  mainUsageType?: InputMaybe<EstateMainUsageTypeFilterInput>;
  managementOrgUnitId?: InputMaybe<IntOperationFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<EstateFilterInput>>;
  ownership?: InputMaybe<EstateOwnershipOperationFilterInput>;
  refactorings?: InputMaybe<ListFilterInputTypeOfRefactoringFilterInput>;
  stairs?: InputMaybe<ListStairFilterTypeFilterInput>;
  status?: InputMaybe<EstateStatusOperationFilterInput>;
  surfaceAreaSqM?: InputMaybe<IntOperationFilterInput>;
  totalMarketValue?: InputMaybe<EstateTotalMarketValueFilterInput>;
  type?: InputMaybe<EstateTypeOperationFilterInput>;
  usageType?: InputMaybe<EstateUsageTypeFilterInput>;
  valuations?: InputMaybe<ListFilterInputTypeOfValuationFilterInput>;
};

export type EstateInput = {
  addresses: Array<AsstAddressInput>;
  buildYear?: InputMaybe<Scalars['Int']['input']>;
  decommissioningDate?: InputMaybe<Scalars['Date']['input']>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  floors: Array<FloorInput>;
  internalCode: Scalars['String']['input'];
  mainUsageTypeId: Scalars['Int']['input'];
  managementOrgUnitId?: InputMaybe<Scalars['Int']['input']>;
  managementSubjectId: Scalars['Int']['input'];
  marketValue?: InputMaybe<EstateTotalMarketValueInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  ownership: EstateOwnership;
  refactorings: Array<RefactoringInput>;
  stairs: Array<StairInput>;
  status: EstateStatus;
  surfaceAreaSqM?: InputMaybe<Scalars['Int']['input']>;
  type: EstateType;
  usageTypeId: Scalars['Int']['input'];
  valuations: Array<EstateValuationInput>;
};

export type EstateLightDto = {
  __typename?: 'EstateLightDto';
  addresses: Array<AsstAddress>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  managementSubjectId: Scalars['Int']['output'];
  managementSubjectName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status: EstateStatus;
  type: EstateType;
  usageType: EstateUsageType;
};

export type EstateLocation = {
  __typename?: 'EstateLocation';
  address?: Maybe<AsstAddress>;
  estateId: Scalars['Int']['output'];
  estateInternalCode: Scalars['String']['output'];
  estateName?: Maybe<Scalars['String']['output']>;
};

export type EstateMainUsageType = {
  __typename?: 'EstateMainUsageType';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type EstateMainUsageTypeFilterInput = {
  and?: InputMaybe<Array<EstateMainUsageTypeFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<EstateMainUsageTypeFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type EstateMainUsageTypeInput = {
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type EstateMainUsageTypeMutations = {
  __typename?: 'EstateMainUsageTypeMutations';
  add: ResultOfEstateMainUsageType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfEstateMainUsageType;
};

export type EstateMainUsageTypeMutationsAddArgs = {
  input: EstateMainUsageTypeInput;
};

export type EstateMainUsageTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type EstateMainUsageTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type EstateMainUsageTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: EstateMainUsageTypeInput;
};

export type EstateMainUsageTypeQueries = {
  __typename?: 'EstateMainUsageTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<EstateMainUsageType>;
  listEstateMainUsageTypes?: Maybe<ListEstateMainUsageTypesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type EstateMainUsageTypeQueriesCanUseInternalCodeArgs = {
  currentEstateMainUsageTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type EstateMainUsageTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<EstateMainUsageTypeSortInput>>;
  where?: InputMaybe<EstateMainUsageTypeFilterInput>;
};

export type EstateMainUsageTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type EstateMainUsageTypeQueriesListEstateMainUsageTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateMainUsageTypeSortInput>>;
  where?: InputMaybe<EstateMainUsageTypeFilterInput>;
};

export type EstateMainUsageTypeSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export type EstateMarketValue = {
  __typename?: 'EstateMarketValue';
  id: Scalars['Int']['output'];
  type: EstateMarketValueType;
  value: Scalars['Decimal']['output'];
};

export type EstateMarketValueFilterInput = {
  and?: InputMaybe<Array<EstateMarketValueFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<EstateMarketValueFilterInput>>;
  type?: InputMaybe<EstateMarketValueTypeOperationFilterInput>;
  value?: InputMaybe<DecimalOperationFilterInput>;
};

export type EstateMarketValueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type: EstateMarketValueType;
  value: Scalars['Decimal']['input'];
};

export enum EstateMarketValueType {
  MaxValuePerSqM = 'MAX_VALUE_PER_SQ_M',
  MinValuePerSqM = 'MIN_VALUE_PER_SQ_M',
  MostCommonValuePerSqM = 'MOST_COMMON_VALUE_PER_SQ_M',
}

export type EstateMarketValueTypeOperationFilterInput = {
  eq?: InputMaybe<EstateMarketValueType>;
  in?: InputMaybe<Array<EstateMarketValueType>>;
  neq?: InputMaybe<EstateMarketValueType>;
  nin?: InputMaybe<Array<EstateMarketValueType>>;
};

export type EstateMutations = {
  __typename?: 'EstateMutations';
  addEstate: ResultOfEstate;
  calculateTotalMarketValue: ResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimal;
  delete: Result;
  deleteRange: Result;
  document: EstateDocumentMutations;
  updateEstate: ResultOfEstate;
};

export type EstateMutationsAddEstateArgs = {
  estateInput: EstateInput;
};

export type EstateMutationsCalculateTotalMarketValueArgs = {
  estateId: Scalars['Int']['input'];
  totalMarketValueInput: EstateTotalMarketValueInput;
};

export type EstateMutationsDeleteArgs = {
  estateId: Scalars['Int']['input'];
};

export type EstateMutationsDeleteRangeArgs = {
  estateIds: Array<Scalars['Int']['input']>;
};

export type EstateMutationsUpdateEstateArgs = {
  estateId: Scalars['Int']['input'];
  estateInput: EstateInput;
};

export type EstateOccupationMonthlyStatisticsOutput = {
  __typename?: 'EstateOccupationMonthlyStatisticsOutput';
  averageTotalOccupiedEstatesCount: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
  totalOccupiedEstatesCount: Scalars['Int']['output'];
};

export type EstateOccupationStatisticsOutput = {
  __typename?: 'EstateOccupationStatisticsOutput';
  lastMonth: Array<EstateOccupationMonthlyStatisticsOutput>;
  lastYear: Array<EstateOccupationYearlyStatisticsOutput>;
  percentageIncreaseComparedToLastYear?: Maybe<Scalars['Int']['output']>;
  percentageIncreaseComparedToTwoYears?: Maybe<Scalars['Int']['output']>;
};

export type EstateOccupationYearlyStatisticsOutput = {
  __typename?: 'EstateOccupationYearlyStatisticsOutput';
  averageTotalOccupiedEstatesCount: Scalars['Int']['output'];
  month: Scalars['Int']['output'];
  totalOccupiedEstatesCount: Scalars['Int']['output'];
};

export enum EstateOwnership {
  Easement = 'EASEMENT',
  Freehold = 'FREEHOLD',
  Leasing = 'LEASING',
  Loan = 'LOAN',
  Mixed = 'MIXED',
  OvergroundOnly = 'OVERGROUND_ONLY',
  ThirdParty = 'THIRD_PARTY',
  UndergroundOnly = 'UNDERGROUND_ONLY',
}

export type EstateOwnershipOperationFilterInput = {
  eq?: InputMaybe<EstateOwnership>;
  in?: InputMaybe<Array<EstateOwnership>>;
  neq?: InputMaybe<EstateOwnership>;
  nin?: InputMaybe<Array<EstateOwnership>>;
};

export type EstatePortfolioExportIsReadyNotification = Notification & {
  __typename?: 'EstatePortfolioExportIsReadyNotification';
  downloadGuid?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['Int']['output'];
  isSuccess: Scalars['Boolean']['output'];
  status: NotificationStatus;
  timestamp: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type EstateQueries = {
  __typename?: 'EstateQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  documents: EstateDocumentQueries;
  estate?: Maybe<Estate>;
  exportToExcel: FileUrlOutput;
  listEstates?: Maybe<ListEstatesConnection>;
  listEstatesFull: Array<EstateLightDto>;
  locations: Array<EstateLocation>;
  occupationStatistics: EstateOccupationStatisticsOutput;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  statistics: EstateStatisticsOutput;
  surfaces: Array<EstateSurfaces>;
};

export type EstateQueriesCanUseInternalCodeArgs = {
  currentEstateId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type EstateQueriesEstateArgs = {
  estateId: Scalars['Int']['input'];
};

export type EstateQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<EstateSortInput>>;
  where?: InputMaybe<EstateFilterInput>;
};

export type EstateQueriesListEstatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keepTopIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateSortInput>>;
  where?: InputMaybe<EstateFilterInput>;
};

export type EstateQueriesListEstatesFullArgs = {
  order?: InputMaybe<Array<EstateSortInput>>;
  where?: InputMaybe<EstateFilterInput>;
};

export type EstateQueriesSurfacesArgs = {
  estateId: Scalars['Int']['input'];
};

export type EstateSortInput = {
  buildYear?: InputMaybe<SortEnumType>;
  decommissioningDate?: InputMaybe<SortEnumType>;
  deletionDate?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  mainUsageType?: InputMaybe<EstateMainUsageTypeSortInput>;
  managementOrgUnitId?: InputMaybe<SortEnumType>;
  managementSubjectId?: InputMaybe<SortEnumType>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  ownership?: InputMaybe<SortEnumType>;
  primaryAddress?: InputMaybe<IAddressSortInput>;
  status?: InputMaybe<SortEnumType>;
  surfaceAreaSqM?: InputMaybe<SortEnumType>;
  totalMarketValue?: InputMaybe<EstateTotalMarketValueSortInput>;
  type?: InputMaybe<SortEnumType>;
  usageType?: InputMaybe<EstateUsageTypeSortInput>;
};

export type EstateStatisticsOutput = {
  __typename?: 'EstateStatisticsOutput';
  estateUnitsCount: Scalars['Int']['output'];
  estatesCount: Scalars['Int']['output'];
  occupiedEstatesCount: Scalars['Int']['output'];
  vacantEstatesCount: Scalars['Int']['output'];
};

export enum EstateStatus {
  Decommissioned = 'DECOMMISSIONED',
  Operational = 'OPERATIONAL',
}

export type EstateStatusOperationFilterInput = {
  eq?: InputMaybe<EstateStatus>;
  in?: InputMaybe<Array<EstateStatus>>;
  neq?: InputMaybe<EstateStatus>;
  nin?: InputMaybe<Array<EstateStatus>>;
};

export type EstateSubUnit = {
  __typename?: 'EstateSubUnit';
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  estateUnit: EstateUnit;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  occupancyPercent?: Maybe<Scalars['Int']['output']>;
  occupantId?: Maybe<Scalars['Int']['output']>;
  occupantSubject?: Maybe<ISubject>;
  occupantType?: Maybe<OccupantType>;
  orgUnit?: Maybe<OrgUnit>;
  orgUnitId?: Maybe<Scalars['Int']['output']>;
  since?: Maybe<Scalars['Date']['output']>;
  surfaceSqM?: Maybe<Scalars['Int']['output']>;
  until?: Maybe<Scalars['Date']['output']>;
  usageType?: Maybe<EstateUsageType>;
};

export type EstateSubUnitFilterInput = {
  and?: InputMaybe<Array<EstateSubUnitFilterInput>>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  estateUnit?: InputMaybe<EstateUnitFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  occupancyPercent?: InputMaybe<IntOperationFilterInput>;
  occupantId?: InputMaybe<IntOperationFilterInput>;
  occupantSubjectName?: InputMaybe<CustomStringFilterInput>;
  occupantType?: InputMaybe<NullableOfOccupantTypeOperationFilterInput>;
  or?: InputMaybe<Array<EstateSubUnitFilterInput>>;
  orgUnitId?: InputMaybe<IntOperationFilterInput>;
  orgUnitName?: InputMaybe<CustomStringFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  surfaceSqM?: InputMaybe<IntOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
  usageType?: InputMaybe<EstateUsageTypeFilterInput>;
};

export type EstateSubUnitInput = {
  estateUnitId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  occupancyPercent?: InputMaybe<Scalars['Int']['input']>;
  occupantId?: InputMaybe<Scalars['Int']['input']>;
  occupantType?: InputMaybe<OccupantType>;
  orgUnitId?: InputMaybe<Scalars['Int']['input']>;
  since?: InputMaybe<Scalars['Date']['input']>;
  surfaceSqM?: InputMaybe<Scalars['Int']['input']>;
  until?: InputMaybe<Scalars['Date']['input']>;
  usageTypeId?: InputMaybe<Scalars['Int']['input']>;
};

export type EstateSubUnitMutations = {
  __typename?: 'EstateSubUnitMutations';
  add: ResultOfEstateSubUnit;
  delete: Result;
  deleteRange: Result;
  update: ResultOfEstateSubUnit;
};

export type EstateSubUnitMutationsAddArgs = {
  subInput: EstateSubUnitInput;
};

export type EstateSubUnitMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type EstateSubUnitMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type EstateSubUnitMutationsUpdateArgs = {
  subInput: EstateSubUnitInput;
};

export type EstateSubUnitQueries = {
  __typename?: 'EstateSubUnitQueries';
  get?: Maybe<EstateSubUnit>;
  listEstateSubUnit?: Maybe<ListEstateSubUnitConnection>;
  listEstateSubUnitsFull: Array<EstateSubUnit>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type EstateSubUnitQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type EstateSubUnitQueriesListEstateSubUnitArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateSubUnitSortInput>>;
  where?: InputMaybe<EstateSubUnitFilterInput>;
};

export type EstateSubUnitQueriesListEstateSubUnitsFullArgs = {
  order?: InputMaybe<Array<EstateSubUnitSortInput>>;
  where?: InputMaybe<EstateSubUnitFilterInput>;
};

export type EstateSubUnitQueriesProposeNewInternalCodeArgs = {
  parentUnitEstateId: Scalars['Int']['input'];
};

export type EstateSubUnitSortInput = {
  deletionDate?: InputMaybe<SortEnumType>;
  estateUnit?: InputMaybe<EstateUnitSortInput>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  occupancyPercent?: InputMaybe<SortEnumType>;
  occupantId?: InputMaybe<SortEnumType>;
  occupantSubjectName?: InputMaybe<SortEnumType>;
  occupantType?: InputMaybe<SortEnumType>;
  orgUnitId?: InputMaybe<SortEnumType>;
  orgUnitName?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  surfaceSqM?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
  usageType?: InputMaybe<EstateUsageTypeSortInput>;
};

export type EstateSurfaces = {
  __typename?: 'EstateSurfaces';
  heritageType: EstateUnitHeritageType;
  metric: SurfaceMeasurementMetric;
  surfaceSqMCommonArea: Scalars['Int']['output'];
  surfaceSqMSideArea: Scalars['Int']['output'];
  surfaceSqMTotal: Scalars['Int']['output'];
};

export type EstateTotalMarketValue = {
  __typename?: 'EstateTotalMarketValue';
  calculate: Array<KeyValuePairOfEstateMarketValueTypeAndDecimal>;
  coefficients: Array<EstateTotalMarketValueCoefficient>;
  marketValues: Array<EstateMarketValue>;
  notes?: Maybe<Scalars['String']['output']>;
  totalSurfaceAreaSqM: Scalars['Int']['output'];
};

export type EstateTotalMarketValueCoefficient = {
  __typename?: 'EstateTotalMarketValueCoefficient';
  id: Scalars['Int']['output'];
  type: EstateTotalMarketValueCoefficientType;
  value: Scalars['Decimal']['output'];
};

export type EstateTotalMarketValueCoefficientFilterInput = {
  and?: InputMaybe<Array<EstateTotalMarketValueCoefficientFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<EstateTotalMarketValueCoefficientFilterInput>>;
  type?: InputMaybe<EstateTotalMarketValueCoefficientTypeOperationFilterInput>;
  value?: InputMaybe<DecimalOperationFilterInput>;
};

export type EstateTotalMarketValueCoefficientInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type: EstateTotalMarketValueCoefficientType;
  value: Scalars['Decimal']['input'];
};

export enum EstateTotalMarketValueCoefficientType {
  Age = 'AGE',
  Obsolescence = 'OBSOLESCENCE',
}

export type EstateTotalMarketValueCoefficientTypeOperationFilterInput = {
  eq?: InputMaybe<EstateTotalMarketValueCoefficientType>;
  in?: InputMaybe<Array<EstateTotalMarketValueCoefficientType>>;
  neq?: InputMaybe<EstateTotalMarketValueCoefficientType>;
  nin?: InputMaybe<Array<EstateTotalMarketValueCoefficientType>>;
};

export type EstateTotalMarketValueFilterInput = {
  and?: InputMaybe<Array<EstateTotalMarketValueFilterInput>>;
  coefficients?: InputMaybe<ListFilterInputTypeOfEstateTotalMarketValueCoefficientFilterInput>;
  marketValues?: InputMaybe<ListFilterInputTypeOfEstateMarketValueFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<EstateTotalMarketValueFilterInput>>;
  totalSurfaceAreaSqM?: InputMaybe<IntOperationFilterInput>;
};

export type EstateTotalMarketValueInput = {
  coefficients: Array<EstateTotalMarketValueCoefficientInput>;
  marketValues: Array<EstateMarketValueInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  totalSurfaceAreaSqM: Scalars['Int']['input'];
};

export type EstateTotalMarketValueSortInput = {
  notes?: InputMaybe<SortEnumType>;
  totalSurfaceAreaSqM?: InputMaybe<SortEnumType>;
};

export enum EstateType {
  Building = 'BUILDING',
  LandPlotBuildable = 'LAND_PLOT_BUILDABLE',
  LandPlotUndeveloped = 'LAND_PLOT_UNDEVELOPED',
  Mixed = 'MIXED',
  Undefined = 'UNDEFINED',
  UrbanPlot = 'URBAN_PLOT',
}

export type EstateTypeOperationFilterInput = {
  eq?: InputMaybe<EstateType>;
  in?: InputMaybe<Array<EstateType>>;
  neq?: InputMaybe<EstateType>;
  nin?: InputMaybe<Array<EstateType>>;
};

export type EstateUnit = {
  __typename?: 'EstateUnit';
  address: AsstAddress;
  cadastralUnits: Array<CadastralUnit>;
  canUseDocumentName: Scalars['Boolean']['output'];
  costCentreId?: Maybe<Scalars['Int']['output']>;
  currentCadastralUnit?: Maybe<CadastralUnit>;
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  disusedDate?: Maybe<Scalars['Date']['output']>;
  documents: Array<DocumentsPerContentCategoryGroupOutput>;
  estate: Estate;
  estateSubUnits: Array<EstateSubUnit>;
  externalCode?: Maybe<Scalars['String']['output']>;
  floors: Array<Floor>;
  grossSurface?: Maybe<Scalars['Int']['output']>;
  historyTags: Array<Scalars['UUID']['output']>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  lastRelevantChangeDate?: Maybe<Scalars['DateTime']['output']>;
  lastRepossession?: Maybe<Repossession>;
  managementSubject: ISubject;
  managementSubjectId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  netSurface?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  officialAct?: Maybe<OfficialAct>;
  officialActId?: Maybe<Scalars['Int']['output']>;
  ownershipEndDate?: Maybe<Scalars['Date']['output']>;
  ownershipPercent?: Maybe<Scalars['Float']['output']>;
  ownershipStartDate: Scalars['Date']['output'];
  ownershipType: EstateUnitOwnershipType;
  procurementActId?: Maybe<Scalars['Int']['output']>;
  repossessions: Array<Repossession>;
  sharedArea: Scalars['Boolean']['output'];
  stair?: Maybe<Stair>;
  status: EstateUnitStatus;
  subNumbering?: Maybe<Scalars['String']['output']>;
  surfaces: Array<EstateUnitSurface>;
  surfacesTree: Array<EstateUnitSurfaceSummary>;
  type: EstateUnitType;
  unitExpenses: Array<UnitExpenses>;
  usageType: EstateUsageType;
};

export type EstateUnitCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type EstateUnitDocumentsArgs = {
  order?: InputMaybe<Array<DocumentsPerContentCategoryGroupOutputSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type EstateUnitDocumentExpiredNotification = DocumentExpiredNotification &
  Notification & {
    __typename?: 'EstateUnitDocumentExpiredNotification';
    documentCmisId: Scalars['String']['output'];
    entityId: Scalars['Int']['output'];
    id: Scalars['Int']['output'];
    status: NotificationStatus;
    timestamp: Scalars['DateTime']['output'];
    username: Scalars['String']['output'];
  };

export type EstateUnitDocumentMutations = {
  __typename?: 'EstateUnitDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: ResultOfDocument__;
  update: ResultOfDocument;
};

export type EstateUnitDocumentMutationsAddRangeArgs = {
  estateUnitId: Scalars['Int']['input'];
  inputs: Array<DocumentInput>;
};

export type EstateUnitDocumentMutationsDeleteRangeArgs = {
  cmisIds: Array<Scalars['String']['input']>;
  estateUnitId: Scalars['Int']['input'];
};

export type EstateUnitDocumentMutationsUpdateArgs = {
  estateUnitId: Scalars['Int']['input'];
  input: DocumentInput;
};

export type EstateUnitDocumentQueries = {
  __typename?: 'EstateUnitDocumentQueries';
  listDocuments: Array<EstateUnitDocumentsOutput>;
};

export type EstateUnitDocumentQueriesListDocumentsArgs = {
  estateUnitIds: Array<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateUnitDocumentsOutputSortInput>>;
  where?: InputMaybe<EstateUnitDocumentsFlatOutputFilterInput>;
};

/** A connection to a list of items. */
export type EstateUnitDocumentsConnection = {
  __typename?: 'EstateUnitDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<EstateUnitDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateUnitDocumentsOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type EstateUnitDocumentsEdge = {
  __typename?: 'EstateUnitDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateUnitDocumentsOutput;
};

export type EstateUnitDocumentsFlatOutputFilterInput = {
  and?: InputMaybe<Array<EstateUnitDocumentsFlatOutputFilterInput>>;
  contentCategoryGroup?: InputMaybe<CustomStringFilterInput>;
  document?: InputMaybe<DocumentFilterInput>;
  estateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<EstateUnitDocumentsFlatOutputFilterInput>>;
};

export type EstateUnitDocumentsOutput = {
  __typename?: 'EstateUnitDocumentsOutput';
  estateUnitInternalCode: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<DocumentsPerContentCategoryGroupOutput>;
};

export type EstateUnitDocumentsOutputSortInput = {
  estateUnitInternalCode?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

export type EstateUnitFilterInput = {
  address?: InputMaybe<IAddressFilterInput>;
  and?: InputMaybe<Array<EstateUnitFilterInput>>;
  cadastralUnits?: InputMaybe<ListFilterInputTypeOfCadastralUnitFilterInput>;
  costCentreId?: InputMaybe<IntOperationFilterInput>;
  currentCadastralUnit?: InputMaybe<CadastralUnitFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  disusedDate?: InputMaybe<DateOperationFilterInput>;
  estate?: InputMaybe<EstateFilterInput>;
  estateSubUnits?: InputMaybe<ListFilterInputTypeOfEstateSubUnitFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  floors?: InputMaybe<ListFilterInputTypeOfFloorFilterInput>;
  grossSurface?: InputMaybe<IntOperationFilterInput>;
  historyTags?: InputMaybe<ListUuidOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  lastRelevantChangeDate?: InputMaybe<DateTimeOperationFilterInput>;
  lastRepossession?: InputMaybe<RepossessionFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  netSurface?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  officialActId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<EstateUnitFilterInput>>;
  ownershipEndDate?: InputMaybe<DateOperationFilterInput>;
  ownershipPercent?: InputMaybe<FloatOperationFilterInput>;
  ownershipStartDate?: InputMaybe<DateOperationFilterInput>;
  ownershipType?: InputMaybe<EstateUnitOwnershipTypeOperationFilterInput>;
  procurementActId?: InputMaybe<IntOperationFilterInput>;
  repossessions?: InputMaybe<ListFilterInputTypeOfRepossessionFilterInput>;
  sharedArea?: InputMaybe<BooleanOperationFilterInput>;
  stair?: InputMaybe<StairFilterInput>;
  status?: InputMaybe<EstateUnitStatusOperationFilterInput>;
  subNumbering?: InputMaybe<CustomStringFilterInput>;
  surfaces?: InputMaybe<ListFilterInputTypeOfEstateUnitSurfaceFilterInput>;
  type?: InputMaybe<EstateUnitTypeOperationFilterInput>;
  unitExpenses?: InputMaybe<ListFilterInputTypeOfUnitExpensesFilterInput>;
  usageType?: InputMaybe<EstateUsageTypeFilterInput>;
};

export type EstateUnitFloor = {
  __typename?: 'EstateUnitFloor';
  estateUnit: EstateUnit;
  estateUnitId: Scalars['Int']['output'];
  floor: Floor;
  floorId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type EstateUnitFloorFilterInput = {
  and?: InputMaybe<Array<EstateUnitFloorFilterInput>>;
  estateUnit?: InputMaybe<EstateUnitFilterInput>;
  estateUnitId?: InputMaybe<IntOperationFilterInput>;
  floor?: InputMaybe<FloorFilterInput>;
  floorId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<EstateUnitFloorFilterInput>>;
};

export type EstateUnitGroup = {
  __typename?: 'EstateUnitGroup';
  estateUnitIds: Array<Scalars['Int']['output']>;
  estateUnits: Array<EstateUnit>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  managementSubject: ISubject;
  managementSubjectId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type EstateUnitGroupFilterInput = {
  and?: InputMaybe<Array<EstateUnitGroupFilterInput>>;
  estateUnitIds?: InputMaybe<ListIntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<EstateUnitGroupFilterInput>>;
};

export type EstateUnitGroupInput = {
  estateUnitIds: Array<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  managementSubjectId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type EstateUnitGroupMutations = {
  __typename?: 'EstateUnitGroupMutations';
  add: ResultOfEstateUnitGroup;
  delete: Result;
  deleteRange: Result;
  update: ResultOfEstateUnitGroup;
};

export type EstateUnitGroupMutationsAddArgs = {
  input: EstateUnitGroupInput;
};

export type EstateUnitGroupMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type EstateUnitGroupMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type EstateUnitGroupMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: EstateUnitGroupInput;
};

export type EstateUnitGroupQueries = {
  __typename?: 'EstateUnitGroupQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<EstateUnitGroup>;
  listEstateUnitGroups?: Maybe<ListEstateUnitGroupsConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type EstateUnitGroupQueriesCanUseInternalCodeArgs = {
  currentEstateUnitGroupId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type EstateUnitGroupQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<EstateUnitGroupSortInput>>;
  where?: InputMaybe<EstateUnitGroupFilterInput>;
};

export type EstateUnitGroupQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type EstateUnitGroupQueriesListEstateUnitGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateUnitGroupSortInput>>;
  where?: InputMaybe<EstateUnitGroupFilterInput>;
};

export type EstateUnitGroupSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  managementSubjectId?: InputMaybe<SortEnumType>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export enum EstateUnitHeritageType {
  Building = 'BUILDING',
  Land = 'LAND',
}

export type EstateUnitInput = {
  addressId: Scalars['Int']['input'];
  cadastralUnit?: InputMaybe<CadastralUnitInput>;
  disusedDate?: InputMaybe<Scalars['Date']['input']>;
  estateId: Scalars['Int']['input'];
  externalCode?: InputMaybe<Scalars['String']['input']>;
  floorIds: Array<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  officialAct?: InputMaybe<EstateUnitOfficialActInput>;
  ownershipEndDate?: InputMaybe<Scalars['Date']['input']>;
  ownershipPercent?: InputMaybe<Scalars['Float']['input']>;
  ownershipStartDate: Scalars['Date']['input'];
  ownershipType: EstateUnitOwnershipType;
  repossession?: InputMaybe<EstateUnitRepossessionInput>;
  sharedArea: Scalars['Boolean']['input'];
  stairId?: InputMaybe<Scalars['Int']['input']>;
  status: EstateUnitStatus;
  subNumbering?: InputMaybe<Scalars['String']['input']>;
  surfaces?: InputMaybe<Array<EstateUnitSurfaceSummaryInput>>;
  type: EstateUnitType;
  usageTypeId: Scalars['Int']['input'];
};

export type EstateUnitMutations = {
  __typename?: 'EstateUnitMutations';
  add: ResultOfEstateUnit;
  delete: Result;
  deleteRange: Result;
  document: EstateUnitDocumentMutations;
  merge: ResultOfEstateUnit;
  split: ResultOfEstateUnit__;
  transform: ResultOfEstateUnit;
  update: ResultOfEstateUnit;
};

export type EstateUnitMutationsAddArgs = {
  input: EstateUnitInput;
};

export type EstateUnitMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type EstateUnitMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type EstateUnitMutationsMergeArgs = {
  ids: Array<Scalars['Int']['input']>;
  input: EstateUnitInput;
};

export type EstateUnitMutationsSplitArgs = {
  id: Scalars['Int']['input'];
  inputs: Array<EstateUnitInput>;
};

export type EstateUnitMutationsTransformArgs = {
  id: Scalars['Int']['input'];
  input: EstateUnitInput;
};

export type EstateUnitMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: EstateUnitInput;
};

export type EstateUnitOfficialActInput = {
  collectionNumber?: InputMaybe<Scalars['String']['input']>;
  notaryActDate: Scalars['Date']['input'];
  notaryName?: InputMaybe<Scalars['String']['input']>;
  protocolNumber: Scalars['String']['input'];
  registrationDate?: InputMaybe<Scalars['Date']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  repertoireNumber?: InputMaybe<Scalars['String']['input']>;
  transcriptionCity?: InputMaybe<Scalars['String']['input']>;
  transcriptionDate?: InputMaybe<Scalars['Date']['input']>;
  transcriptionNumber?: InputMaybe<Scalars['String']['input']>;
  writtenAtCity?: InputMaybe<Scalars['String']['input']>;
};

export enum EstateUnitOwnershipType {
  Leasing = 'LEASING',
  Loan = 'LOAN',
  Property = 'PROPERTY',
  RightOfUse = 'RIGHT_OF_USE',
  SubsoilRights = 'SUBSOIL_RIGHTS',
  SurfaceRights = 'SURFACE_RIGHTS',
  ThirdParties = 'THIRD_PARTIES',
}

export type EstateUnitOwnershipTypeOperationFilterInput = {
  eq?: InputMaybe<EstateUnitOwnershipType>;
  in?: InputMaybe<Array<EstateUnitOwnershipType>>;
  neq?: InputMaybe<EstateUnitOwnershipType>;
  nin?: InputMaybe<Array<EstateUnitOwnershipType>>;
};

export type EstateUnitQueries = {
  __typename?: 'EstateUnitQueries';
  documents: EstateUnitDocumentQueries;
  estateUnit?: Maybe<EstateUnit>;
  estateUnitTypeDistribution?: Maybe<EstateUnitTypeDistributionConnection>;
  exportToExcel: FileUrlOutput;
  listEstateUnits?: Maybe<ListEstateUnitsConnection>;
  listEstateUnitsFull: Array<EstateUnit>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  proposeNewInternalCodeExceptOccupied: Scalars['String']['output'];
};

export type EstateUnitQueriesEstateUnitArgs = {
  estateUnitId: Scalars['Int']['input'];
};

export type EstateUnitQueriesEstateUnitTypeDistributionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateUnitTypeDistributionSortInput>>;
  showAll: Scalars['Boolean']['input'];
  where?: InputMaybe<EstateUnitTypeDistributionFilterInput>;
};

export type EstateUnitQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<EstateUnitSortInput>>;
  where?: InputMaybe<EstateUnitFilterInput>;
};

export type EstateUnitQueriesListEstateUnitsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateUnitSortInput>>;
  where?: InputMaybe<EstateUnitFilterInput>;
};

export type EstateUnitQueriesListEstateUnitsFullArgs = {
  order?: InputMaybe<Array<EstateUnitSortInput>>;
  where?: InputMaybe<EstateUnitFilterInput>;
};

export type EstateUnitQueriesProposeNewInternalCodeArgs = {
  parentEstateId: Scalars['Int']['input'];
};

export type EstateUnitQueriesProposeNewInternalCodeExceptOccupiedArgs = {
  additionallyOccupiedCodes: Array<Scalars['String']['input']>;
  parentId: Scalars['Int']['input'];
};

export type EstateUnitRepossessionInput = {
  eventDate?: InputMaybe<Scalars['Date']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  eventReason?: InputMaybe<RepossessionReason>;
  eventType?: InputMaybe<RepossessionType>;
  isAssignable?: InputMaybe<Scalars['Boolean']['input']>;
  isKeysReturned?: InputMaybe<Scalars['Boolean']['input']>;
  isWithValuables?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  unitStatus?: InputMaybe<UnitCondition>;
};

export type EstateUnitSortInput = {
  address?: InputMaybe<IAddressSortInput>;
  costCentreId?: InputMaybe<SortEnumType>;
  currentCadastralUnit?: InputMaybe<CadastralUnitSortInput>;
  deletionDate?: InputMaybe<SortEnumType>;
  disusedDate?: InputMaybe<SortEnumType>;
  estate?: InputMaybe<EstateSortInput>;
  externalCode?: InputMaybe<SortEnumType>;
  grossSurface?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  lastRelevantChangeDate?: InputMaybe<SortEnumType>;
  lastRepossession?: InputMaybe<RepossessionSortInput>;
  managementSubjectId?: InputMaybe<SortEnumType>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  netSurface?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  officialActId?: InputMaybe<SortEnumType>;
  ownershipEndDate?: InputMaybe<SortEnumType>;
  ownershipPercent?: InputMaybe<SortEnumType>;
  ownershipStartDate?: InputMaybe<SortEnumType>;
  ownershipType?: InputMaybe<SortEnumType>;
  procurementActId?: InputMaybe<SortEnumType>;
  sharedArea?: InputMaybe<SortEnumType>;
  stair?: InputMaybe<StairSortInput>;
  status?: InputMaybe<SortEnumType>;
  subNumbering?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  usageType?: InputMaybe<EstateUsageTypeSortInput>;
};

export enum EstateUnitStatus {
  Cancelled = 'CANCELLED',
  DiscontinuedMerge = 'DISCONTINUED_MERGE',
  DiscontinuedSplit = 'DISCONTINUED_SPLIT',
  Disused = 'DISUSED',
  Existing = 'EXISTING',
  Returned = 'RETURNED',
  Sold = 'SOLD',
  Transformed = 'TRANSFORMED',
}

export type EstateUnitStatusOperationFilterInput = {
  eq?: InputMaybe<EstateUnitStatus>;
  in?: InputMaybe<Array<EstateUnitStatus>>;
  neq?: InputMaybe<EstateUnitStatus>;
  nin?: InputMaybe<Array<EstateUnitStatus>>;
};

export type EstateUnitSurface = {
  __typename?: 'EstateUnitSurface';
  estateUnit: EstateUnit;
  floor?: Maybe<Floor>;
  floorId?: Maybe<Scalars['Int']['output']>;
  functionArea?: Maybe<FunctionArea>;
  functionAreaId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  metric: SurfaceMeasurementMetric;
  surfaceSqMCommonArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMSideArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMTotal?: Maybe<Scalars['Int']['output']>;
};

export type EstateUnitSurfaceFilterInput = {
  and?: InputMaybe<Array<EstateUnitSurfaceFilterInput>>;
  estateUnit?: InputMaybe<EstateUnitFilterInput>;
  floor?: InputMaybe<FloorFilterInput>;
  floorId?: InputMaybe<IntOperationFilterInput>;
  functionArea?: InputMaybe<FunctionAreaFilterInput>;
  functionAreaId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  metric?: InputMaybe<SurfaceMeasurementMetricOperationFilterInput>;
  or?: InputMaybe<Array<EstateUnitSurfaceFilterInput>>;
  surfaceSqMCommonArea?: InputMaybe<IntOperationFilterInput>;
  surfaceSqMSideArea?: InputMaybe<IntOperationFilterInput>;
  surfaceSqMTotal?: InputMaybe<IntOperationFilterInput>;
};

export type EstateUnitSurfaceSummary = {
  __typename?: 'EstateUnitSurfaceSummary';
  floors: Array<EstateUnitSurfaceSummaryFloor>;
  metric: SurfaceMeasurementMetric;
  surfaceId?: Maybe<Scalars['Int']['output']>;
  surfaceSqMCommonArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMSideArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMTotal?: Maybe<Scalars['Int']['output']>;
};

export type EstateUnitSurfaceSummaryFloor = {
  __typename?: 'EstateUnitSurfaceSummaryFloor';
  floor: EstateUnitSurfaceSummaryFloorSummary;
  functionAreas: Array<EstateUnitSurfaceSummaryFunctionArea>;
  surfaceId?: Maybe<Scalars['Int']['output']>;
  surfaceSqMCommonArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMSideArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMTotal?: Maybe<Scalars['Int']['output']>;
};

export type EstateUnitSurfaceSummaryFloorInput = {
  floor: EstateUnitSurfaceSummaryFloorSummaryInput;
  functionAreas: Array<EstateUnitSurfaceSummaryFunctionAreaInput>;
  surfaceId?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMCommonArea?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMSideArea?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMTotal?: InputMaybe<Scalars['Int']['input']>;
};

export type EstateUnitSurfaceSummaryFloorSummary = {
  __typename?: 'EstateUnitSurfaceSummaryFloorSummary';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  position: Scalars['Float']['output'];
  templateReference?: Maybe<Scalars['UUID']['output']>;
};

export type EstateUnitSurfaceSummaryFloorSummaryInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position: Scalars['Float']['input'];
  templateReference?: InputMaybe<Scalars['UUID']['input']>;
};

export type EstateUnitSurfaceSummaryFunctionArea = {
  __typename?: 'EstateUnitSurfaceSummaryFunctionArea';
  functionArea: EstateUnitSurfaceSummaryFunctionAreaSummary;
  surfaceId?: Maybe<Scalars['Int']['output']>;
  surfaceSqMCommonArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMSideArea?: Maybe<Scalars['Int']['output']>;
  surfaceSqMTotal?: Maybe<Scalars['Int']['output']>;
};

export type EstateUnitSurfaceSummaryFunctionAreaInput = {
  functionArea: EstateUnitSurfaceSummaryFunctionAreaSummaryInput;
  surfaceId?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMCommonArea?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMSideArea?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMTotal?: InputMaybe<Scalars['Int']['input']>;
};

export type EstateUnitSurfaceSummaryFunctionAreaSummary = {
  __typename?: 'EstateUnitSurfaceSummaryFunctionAreaSummary';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  surfaceType: SurfaceType;
};

export type EstateUnitSurfaceSummaryFunctionAreaSummaryInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  surfaceType: SurfaceType;
};

export type EstateUnitSurfaceSummaryInput = {
  floors: Array<EstateUnitSurfaceSummaryFloorInput>;
  metric: SurfaceMeasurementMetric;
  surfaceId?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMCommonArea?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMSideArea?: InputMaybe<Scalars['Int']['input']>;
  surfaceSqMTotal?: InputMaybe<Scalars['Int']['input']>;
};

export enum EstateUnitType {
  Building = 'BUILDING',
  BuildingArea = 'BUILDING_AREA',
  Ground = 'GROUND',
  Other = 'OTHER',
  UrbanArea = 'URBAN_AREA',
}

export type EstateUnitTypeDistribution = {
  __typename?: 'EstateUnitTypeDistribution';
  estateUnitType: EstateUnitType;
  percentage: Scalars['Float']['output'];
};

/** A connection to a list of items. */
export type EstateUnitTypeDistributionConnection = {
  __typename?: 'EstateUnitTypeDistributionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<EstateUnitTypeDistributionEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateUnitTypeDistribution>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type EstateUnitTypeDistributionEdge = {
  __typename?: 'EstateUnitTypeDistributionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateUnitTypeDistribution;
};

export type EstateUnitTypeDistributionFilterInput = {
  and?: InputMaybe<Array<EstateUnitTypeDistributionFilterInput>>;
  estateUnitType?: InputMaybe<EstateUnitTypeOperationFilterInput>;
  or?: InputMaybe<Array<EstateUnitTypeDistributionFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
};

export type EstateUnitTypeDistributionSortInput = {
  estateUnitType?: InputMaybe<SortEnumType>;
  percentage?: InputMaybe<SortEnumType>;
};

export type EstateUnitTypeOperationFilterInput = {
  eq?: InputMaybe<EstateUnitType>;
  in?: InputMaybe<Array<EstateUnitType>>;
  neq?: InputMaybe<EstateUnitType>;
  nin?: InputMaybe<Array<EstateUnitType>>;
};

export type EstateUsageType = {
  __typename?: 'EstateUsageType';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isForContracts: Scalars['Boolean']['output'];
  isForEstate: Scalars['Boolean']['output'];
  isForEstateSubUnit: Scalars['Boolean']['output'];
  isForEstateUnit: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type EstateUsageTypeFilterInput = {
  and?: InputMaybe<Array<EstateUsageTypeFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isForContracts?: InputMaybe<BooleanOperationFilterInput>;
  isForEstate?: InputMaybe<BooleanOperationFilterInput>;
  isForEstateSubUnit?: InputMaybe<BooleanOperationFilterInput>;
  isForEstateUnit?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<EstateUsageTypeFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type EstateUsageTypeInput = {
  internalCode: Scalars['String']['input'];
  isForContracts: Scalars['Boolean']['input'];
  isForEstate: Scalars['Boolean']['input'];
  isForEstateSubUnit: Scalars['Boolean']['input'];
  isForEstateUnit: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type EstateUsageTypeMutations = {
  __typename?: 'EstateUsageTypeMutations';
  add: ResultOfEstateUsageType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfEstateUsageType;
};

export type EstateUsageTypeMutationsAddArgs = {
  input: EstateUsageTypeInput;
};

export type EstateUsageTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type EstateUsageTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type EstateUsageTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: EstateUsageTypeInput;
};

export type EstateUsageTypeQueries = {
  __typename?: 'EstateUsageTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<EstateUsageType>;
  listEstateUsageTypes?: Maybe<ListEstateUsageTypesConnection>;
  listEstateUsageTypesFull: Array<EstateUsageType>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  usageTypeDistribution?: Maybe<UsageTypeDistributionConnection>;
};

export type EstateUsageTypeQueriesCanUseInternalCodeArgs = {
  currentEstateUsageTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type EstateUsageTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<EstateUsageTypeSortInput>>;
  where?: InputMaybe<EstateUsageTypeFilterInput>;
};

export type EstateUsageTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type EstateUsageTypeQueriesListEstateUsageTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EstateUsageTypeSortInput>>;
  where?: InputMaybe<EstateUsageTypeFilterInput>;
};

export type EstateUsageTypeQueriesListEstateUsageTypesFullArgs = {
  order?: InputMaybe<Array<EstateUsageTypeSortInput>>;
  where?: InputMaybe<EstateUsageTypeFilterInput>;
};

export type EstateUsageTypeQueriesUsageTypeDistributionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UsageTypeDistributionSortInput>>;
  showAll: Scalars['Boolean']['input'];
  where?: InputMaybe<UsageTypeDistributionFilterInput>;
};

export type EstateUsageTypeSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  isForContracts?: InputMaybe<SortEnumType>;
  isForEstate?: InputMaybe<SortEnumType>;
  isForEstateSubUnit?: InputMaybe<SortEnumType>;
  isForEstateUnit?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export type EstateValuationInput = {
  ias?: InputMaybe<Scalars['Decimal']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mortgageAmount?: InputMaybe<Scalars['Decimal']['input']>;
  rba?: InputMaybe<Scalars['Decimal']['input']>;
  revampOperations?: InputMaybe<Scalars['Int']['input']>;
  transferYear?: InputMaybe<Scalars['Int']['input']>;
  year: Scalars['Int']['input'];
};

export type FcltContract = {
  __typename?: 'FcltContract';
  agreementDate?: Maybe<Scalars['Date']['output']>;
  billingInfo: BillingInfo;
  canUseDocumentName: Scalars['Boolean']['output'];
  cancellationNoticeDaysCount?: Maybe<Scalars['Int']['output']>;
  catalogueTypeIds: Array<Scalars['Int']['output']>;
  catalogueTypes: Array<CatalogueType>;
  description: Scalars['String']['output'];
  documents: Array<DocumentsPerContentCategoryGroupOutput>;
  effectiveDate: Scalars['Date']['output'];
  entryStatus: EntryStatus;
  estateUnitIds: Array<Scalars['Int']['output']>;
  estateUnits: Array<EstateUnit>;
  expirationDate: Scalars['Date']['output'];
  externalCode?: Maybe<Scalars['String']['output']>;
  frameworkAgreements: Array<FrameworkAgreement>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  maximumRenewalDaysCount?: Maybe<Scalars['Int']['output']>;
  originalEstateUnitGroup?: Maybe<EstateUnitGroup>;
  originalTemplate?: Maybe<ContractTemplate>;
  penalties: Array<Penalty>;
  priceLists: Array<PriceList>;
  providerSubject: ISubject;
  providerSubjectId: Scalars['Int']['output'];
  renewalNoticeDaysCount?: Maybe<Scalars['Int']['output']>;
  slas: Array<Sla>;
  termExtensions: Array<TermExtension>;
  ticketChecklists: Array<TicketChecklist>;
  type: FcltContractType;
};

export type FcltContractCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type FcltContractDocumentsArgs = {
  order?: InputMaybe<Array<DocumentsPerContentCategoryGroupOutputSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type FcltContractDocumentMutations = {
  __typename?: 'FcltContractDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: ResultOfDocument__;
  update: ResultOfDocument;
};

export type FcltContractDocumentMutationsAddRangeArgs = {
  contractId: Scalars['Int']['input'];
  inputs: Array<DocumentInput>;
};

export type FcltContractDocumentMutationsDeleteRangeArgs = {
  cmisIds: Array<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
};

export type FcltContractDocumentMutationsUpdateArgs = {
  contractId: Scalars['Int']['input'];
  input: DocumentInput;
};

/** A connection to a list of items. */
export type FcltContractDocumentsConnection = {
  __typename?: 'FcltContractDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FcltContractDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<FcltContractDocumentsOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FcltContractDocumentsEdge = {
  __typename?: 'FcltContractDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: FcltContractDocumentsOutput;
};

export type FcltContractDocumentsFlatOutputFilterInput = {
  and?: InputMaybe<Array<FcltContractDocumentsFlatOutputFilterInput>>;
  contentCategoryGroup?: InputMaybe<CustomStringFilterInput>;
  document?: InputMaybe<DocumentFilterInput>;
  fcltContractInternalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<FcltContractDocumentsFlatOutputFilterInput>>;
};

export type FcltContractDocumentsOutput = {
  __typename?: 'FcltContractDocumentsOutput';
  fcltContractInternalCode: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
  subRows: Array<DocumentsPerContentCategoryGroupOutput>;
};

export type FcltContractDocumentsOutputSortInput = {
  fcltContractInternalCode?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

export type FcltContractFilterInput = {
  agreementDate?: InputMaybe<DateOperationFilterInput>;
  and?: InputMaybe<Array<FcltContractFilterInput>>;
  billingInfo?: InputMaybe<BillingInfoFilterInput>;
  cancellationNoticeDaysCount?: InputMaybe<IntOperationFilterInput>;
  catalogueTypeIds?: InputMaybe<ListIntOperationFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  effectiveDate?: InputMaybe<DateOperationFilterInput>;
  entryStatus?: InputMaybe<EntryStatusOperationFilterInput>;
  estateUnitIds?: InputMaybe<ListIntOperationFilterInput>;
  expirationDate?: InputMaybe<DateOperationFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  frameworkAgreements?: InputMaybe<ListFilterInputTypeOfFrameworkAgreementFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  maximumRenewalDaysCount?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<FcltContractFilterInput>>;
  originalEstateUnitGroup?: InputMaybe<EstateUnitGroupFilterInput>;
  originalTemplate?: InputMaybe<ContractTemplateFilterInput>;
  penalties?: InputMaybe<ListFilterInputTypeOfPenaltyFilterInput>;
  priceLists?: InputMaybe<ListFilterInputTypeOfPriceListFilterInput>;
  providerSubjectId?: InputMaybe<IntOperationFilterInput>;
  providerSubjectName?: InputMaybe<CustomStringFilterInput>;
  renewalNoticeDaysCount?: InputMaybe<IntOperationFilterInput>;
  slas?: InputMaybe<ListFilterInputTypeOfSlaFilterInput>;
  termExtensions?: InputMaybe<ListFilterInputTypeOfTermExtensionFilterInput>;
  ticketChecklists?: InputMaybe<ListFilterInputTypeOfTicketChecklistFilterInput>;
  type?: InputMaybe<FcltContractTypeFilterInput>;
};

export type FcltContractInput = {
  agreementDate?: InputMaybe<Scalars['Date']['input']>;
  billingInfo: BillingInfoInput;
  cancellationNoticeDaysCount?: InputMaybe<Scalars['Int']['input']>;
  catalogueTypeIds: Array<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  effectiveDate: Scalars['Date']['input'];
  entryStatus: EntryStatus;
  estateUnitIds: Array<Scalars['Int']['input']>;
  expirationDate: Scalars['Date']['input'];
  externalCode?: InputMaybe<Scalars['String']['input']>;
  frameworkAgreements: Array<FrameworkAgreementInput>;
  internalCode: Scalars['String']['input'];
  maximumRenewalDaysCount?: InputMaybe<Scalars['Int']['input']>;
  originalEstateUnitGroupId?: InputMaybe<Scalars['Int']['input']>;
  originalTemplateId?: InputMaybe<Scalars['Int']['input']>;
  penalties: Array<PenaltyInput>;
  priceListIds: Array<Scalars['Int']['input']>;
  providerSubjectId: Scalars['Int']['input'];
  renewalNoticeDaysCount?: InputMaybe<Scalars['Int']['input']>;
  slas: Array<SlaInput>;
  termExtensions: Array<TermExtensionInput>;
  typeId: Scalars['Int']['input'];
};

export type FcltContractMutations = {
  __typename?: 'FcltContractMutations';
  add: ResultOfFcltContract;
  delete: Result;
  deleteRange: Result;
  document: FcltContractDocumentMutations;
  update: ResultOfFcltContract;
};

export type FcltContractMutationsAddArgs = {
  input: FcltContractInput;
};

export type FcltContractMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type FcltContractMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type FcltContractMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: FcltContractInput;
};

export type FcltContractQueries = {
  __typename?: 'FcltContractQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<FcltContract>;
  listFcltContracts?: Maybe<ListFcltContractsConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type FcltContractQueriesCanUseInternalCodeArgs = {
  currentContractId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type FcltContractQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<FcltContractSortInput>>;
  where?: InputMaybe<FcltContractFilterInput>;
};

export type FcltContractQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type FcltContractQueriesListFcltContractsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FcltContractSortInput>>;
  where?: InputMaybe<FcltContractFilterInput>;
};

export type FcltContractSortInput = {
  agreementDate?: InputMaybe<SortEnumType>;
  billingInfo?: InputMaybe<BillingInfoSortInput>;
  cancellationNoticeDaysCount?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  effectiveDate?: InputMaybe<SortEnumType>;
  entryStatus?: InputMaybe<SortEnumType>;
  expirationDate?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  maximumRenewalDaysCount?: InputMaybe<SortEnumType>;
  originalEstateUnitGroup?: InputMaybe<EstateUnitGroupSortInput>;
  originalTemplate?: InputMaybe<ContractTemplateSortInput>;
  providerSubjectId?: InputMaybe<SortEnumType>;
  providerSubjectName?: InputMaybe<SortEnumType>;
  renewalNoticeDaysCount?: InputMaybe<SortEnumType>;
  type?: InputMaybe<FcltContractTypeSortInput>;
};

export type FcltContractType = {
  __typename?: 'FcltContractType';
  contractTemplates: Array<ContractTemplate>;
  contracts: Array<FcltContract>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type FcltContractTypeFilterInput = {
  and?: InputMaybe<Array<FcltContractTypeFilterInput>>;
  contractTemplates?: InputMaybe<ListFilterInputTypeOfContractTemplateFilterInput>;
  contracts?: InputMaybe<ListFilterInputTypeOfFcltContractFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<FcltContractTypeFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type FcltContractTypeInput = {
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type FcltContractTypeMutations = {
  __typename?: 'FcltContractTypeMutations';
  add: ResultOfFcltContractType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfFcltContractType;
};

export type FcltContractTypeMutationsAddArgs = {
  input: FcltContractTypeInput;
};

export type FcltContractTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type FcltContractTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type FcltContractTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: FcltContractTypeInput;
};

export type FcltContractTypeQueries = {
  __typename?: 'FcltContractTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<FcltContractType>;
  listFcltContractTypes?: Maybe<ListFcltContractTypesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type FcltContractTypeQueriesCanUseInternalCodeArgs = {
  currentContractTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type FcltContractTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<FcltContractTypeSortInput>>;
  where?: InputMaybe<FcltContractTypeFilterInput>;
};

export type FcltContractTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type FcltContractTypeQueriesListFcltContractTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FcltContractTypeSortInput>>;
  where?: InputMaybe<FcltContractTypeFilterInput>;
};

export type FcltContractTypeSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export type FileUrlOutput = {
  __typename?: 'FileUrlOutput';
  resourceUrl: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type FilteredAddressesConnection = {
  __typename?: 'FilteredAddressesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FilteredAddressesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<AsstAddress>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FilteredAddressesEdge = {
  __typename?: 'FilteredAddressesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: AsstAddress;
};

export type FilteredCityName = {
  __typename?: 'FilteredCityName';
  value: Scalars['String']['output'];
};

export type FilteredCityNameFilterInput = {
  and?: InputMaybe<Array<FilteredCityNameFilterInput>>;
  or?: InputMaybe<Array<FilteredCityNameFilterInput>>;
  value?: InputMaybe<CustomStringFilterInput>;
};

export type FilteredCityNameSortInput = {
  value?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type FilteredCityNamesConnection = {
  __typename?: 'FilteredCityNamesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FilteredCityNamesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<FilteredCityName>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FilteredCityNamesEdge = {
  __typename?: 'FilteredCityNamesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: FilteredCityName;
};

export type FilteredCountyName = {
  __typename?: 'FilteredCountyName';
  value: Scalars['String']['output'];
};

export type FilteredCountyNameFilterInput = {
  and?: InputMaybe<Array<FilteredCountyNameFilterInput>>;
  or?: InputMaybe<Array<FilteredCountyNameFilterInput>>;
  value?: InputMaybe<CustomStringFilterInput>;
};

export type FilteredCountyNameSortInput = {
  value?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type FilteredCountyNamesConnection = {
  __typename?: 'FilteredCountyNamesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FilteredCountyNamesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<FilteredCountyName>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FilteredCountyNamesEdge = {
  __typename?: 'FilteredCountyNamesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: FilteredCountyName;
};

/** A connection to a list of items. */
export type FilteredEstatesConnection = {
  __typename?: 'FilteredEstatesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FilteredEstatesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Estate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FilteredEstatesEdge = {
  __typename?: 'FilteredEstatesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Estate;
};

/** A connection to a list of items. */
export type FilteredUtilityServicesConnection = {
  __typename?: 'FilteredUtilityServicesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FilteredUtilityServicesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<UtilityService>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FilteredUtilityServicesEdge = {
  __typename?: 'FilteredUtilityServicesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: UtilityService;
};

/** A connection to a list of items. */
export type FilteredUtilityTypesConnection = {
  __typename?: 'FilteredUtilityTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<FilteredUtilityTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<UtilityType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type FilteredUtilityTypesEdge = {
  __typename?: 'FilteredUtilityTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: UtilityType;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type Floor = {
  __typename?: 'Floor';
  estateUnitFloor: Array<EstateUnitFloor>;
  estateUnits: Array<EstateUnit>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Float']['output'];
  templateReference: Scalars['UUID']['output'];
};

export type FloorFilterInput = {
  and?: InputMaybe<Array<FloorFilterInput>>;
  estateUnitFloor?: InputMaybe<ListFilterInputTypeOfEstateUnitFloorFilterInput>;
  estateUnits?: InputMaybe<ListFilterInputTypeOfEstateUnitFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<FloorFilterInput>>;
  position?: InputMaybe<FloatOperationFilterInput>;
  templateReference?: InputMaybe<UuidOperationFilterInput>;
};

export type FloorInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  templateReference: Scalars['UUID']['input'];
};

export type FloorTemplate = {
  __typename?: 'FloorTemplate';
  guid: Scalars['UUID']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Float']['output'];
};

export type FloorTemplateFilterInput = {
  and?: InputMaybe<Array<FloorTemplateFilterInput>>;
  guid?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<FloorTemplateFilterInput>>;
  position?: InputMaybe<FloatOperationFilterInput>;
};

export type FloorTemplateInput = {
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
};

export type FloorTemplateMutations = {
  __typename?: 'FloorTemplateMutations';
  addFloorTemplate: ResultOfFloorTemplate;
  addFloorTemplates: ResultOfListOfFloorTemplate;
  deleteFloor: Result;
  deleteRangeFloor: Result;
  updateFloor: ResultOfFloorTemplate;
};

export type FloorTemplateMutationsAddFloorTemplateArgs = {
  input: FloorTemplateInput;
};

export type FloorTemplateMutationsAddFloorTemplatesArgs = {
  input: Array<FloorTemplateInput>;
};

export type FloorTemplateMutationsDeleteFloorArgs = {
  floorId: Scalars['Int']['input'];
};

export type FloorTemplateMutationsDeleteRangeFloorArgs = {
  floorIds: Array<Scalars['Int']['input']>;
};

export type FloorTemplateMutationsUpdateFloorArgs = {
  floorTemplateId: Scalars['Int']['input'];
  input: FloorTemplateInput;
};

export type FloorTemplateQueries = {
  __typename?: 'FloorTemplateQueries';
  floorTemplate?: Maybe<FloorTemplate>;
  listFloorTemplates: Array<FloorTemplate>;
  listFloorTemplatesPaginated?: Maybe<ListFloorTemplatesPaginatedConnection>;
};

export type FloorTemplateQueriesFloorTemplateArgs = {
  id: Scalars['Int']['input'];
};

export type FloorTemplateQueriesListFloorTemplatesArgs = {
  order?: InputMaybe<Array<FloorTemplateSortInput>>;
  where?: InputMaybe<FloorFilterInput>;
};

export type FloorTemplateQueriesListFloorTemplatesPaginatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FloorTemplateSortInput>>;
  where?: InputMaybe<FloorTemplateFilterInput>;
};

export type FloorTemplateSortInput = {
  guid?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  position?: InputMaybe<SortEnumType>;
};

export type FrameworkAgreement = {
  __typename?: 'FrameworkAgreement';
  externalCode: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
};

export type FrameworkAgreementFilterInput = {
  and?: InputMaybe<Array<FrameworkAgreementFilterInput>>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<FrameworkAgreementFilterInput>>;
};

export type FrameworkAgreementInput = {
  externalCode: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type FunctionArea = {
  __typename?: 'FunctionArea';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  surfaceType: SurfaceType;
};

export type FunctionAreaFilterInput = {
  and?: InputMaybe<Array<FunctionAreaFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<FunctionAreaFilterInput>>;
  surfaceType?: InputMaybe<SurfaceTypeOperationFilterInput>;
};

export type FunctionAreaInput = {
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surfaceType: SurfaceType;
};

export type FunctionAreaMutations = {
  __typename?: 'FunctionAreaMutations';
  add: ResultOfFunctionArea;
  addRange: ResultOfFunctionArea__;
  delete: Result;
  deleteRange: Result;
  update: ResultOfFunctionArea;
};

export type FunctionAreaMutationsAddArgs = {
  input: FunctionAreaInput;
};

export type FunctionAreaMutationsAddRangeArgs = {
  inputs: Array<FunctionAreaInput>;
};

export type FunctionAreaMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type FunctionAreaMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type FunctionAreaMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: FunctionAreaInput;
};

export type FunctionAreaQueries = {
  __typename?: 'FunctionAreaQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  listFunctionAreas?: Maybe<ListFunctionAreasConnection>;
  listFunctionAreasFull: Array<FunctionArea>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type FunctionAreaQueriesCanUseInternalCodeArgs = {
  currentFunctionAreaId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type FunctionAreaQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<FunctionAreaSortInput>>;
  where?: InputMaybe<FunctionAreaFilterInput>;
};

export type FunctionAreaQueriesListFunctionAreasArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<FunctionAreaSortInput>>;
  where?: InputMaybe<FunctionAreaFilterInput>;
};

export type FunctionAreaQueriesListFunctionAreasFullArgs = {
  order?: InputMaybe<Array<FunctionAreaSortInput>>;
  where?: InputMaybe<FunctionAreaFilterInput>;
};

export type FunctionAreaQueriesProposeNewInternalCodeArgs = {
  additionallyOccupiedCodes: Array<Scalars['String']['input']>;
};

export type FunctionAreaSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  surfaceType?: InputMaybe<SortEnumType>;
};

export enum GeoJsonGeometryType {
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon',
}

export type GeoJsonInterface = {
  /** The minimum bounding box around the geometry object */
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs?: Maybe<Scalars['Int']['output']>;
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonLineStringInput = {
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiLineStringInput = {
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPointInput = {
  /** The "coordinates" field is an array of positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPolygonInput = {
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: InputMaybe<Scalars['Coordinates']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: Maybe<Scalars['Coordinates']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPointInput = {
  /** The "coordinates" field is a single position. */
  coordinates?: InputMaybe<Scalars['Position']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is a single position. */
  coordinates?: Maybe<Scalars['Position']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPolygonInput = {
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: Maybe<Array<Maybe<Array<Maybe<Scalars['Position']['output']>>>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeocodingQueries = {
  __typename?: 'GeocodingQueries';
  position?: Maybe<GeocodingResult>;
};

export type GeocodingQueriesPositionArgs = {
  address: AsstAddressInput;
};

export type GeocodingResult = {
  __typename?: 'GeocodingResult';
  boundingBox: Array<Scalars['Float']['output']>;
  position?: Maybe<Array<Scalars['Float']['output']>>;
};

export type GeographicalOrgUnitInput = {
  closureDate?: InputMaybe<Scalars['DateTime']['input']>;
  contacts?: InputMaybe<Array<ContactInput>>;
  entryStatus?: InputMaybe<EntryStatus>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  geographicalCities?: InputMaybe<Array<Scalars['Int']['input']>>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orgUnitId?: InputMaybe<Scalars['Int']['input']>;
  parentOrgUnitId?: InputMaybe<Scalars['Int']['input']>;
  parentSubjectId: Scalars['Int']['input'];
};

export type Group = {
  __typename?: 'Group';
  creationDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  features: Array<GroupFeature>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  permissionSummary: Array<PermissionSummary>;
  users: Array<User>;
};

export type GroupFeature = {
  __typename?: 'GroupFeature';
  canCreate: Scalars['Boolean']['output'];
  canDelete: Scalars['Boolean']['output'];
  canRead: Scalars['Boolean']['output'];
  canUpdate: Scalars['Boolean']['output'];
  feature: Scalars['String']['output'];
  group: Group;
  groupId: Scalars['Int']['output'];
};

export type GroupFilterInput = {
  and?: InputMaybe<Array<GroupFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<GroupFilterInput>>;
};

export type GroupSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type GroupedPaymentsConnection = {
  __typename?: 'GroupedPaymentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GroupedPaymentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<AssetTaxGroupedRow>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type GroupedPaymentsEdge = {
  __typename?: 'GroupedPaymentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: AssetTaxGroupedRow;
};

export type HeirInput = {
  id: Scalars['Int']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  since?: InputMaybe<Scalars['Date']['input']>;
};

export type Holiday = {
  __typename?: 'Holiday';
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  periodicity: HolidayPeriodicity;
};

export type HolidayFilterInput = {
  and?: InputMaybe<Array<HolidayFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<HolidayFilterInput>>;
  periodicity?: InputMaybe<HolidayPeriodicityOperationFilterInput>;
};

export type HolidayInput = {
  date: Scalars['Date']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  periodicity: HolidayPeriodicity;
};

export enum HolidayPeriodicity {
  Once = 'ONCE',
  Yearly = 'YEARLY',
}

export type HolidayPeriodicityOperationFilterInput = {
  eq?: InputMaybe<HolidayPeriodicity>;
  in?: InputMaybe<Array<HolidayPeriodicity>>;
  neq?: InputMaybe<HolidayPeriodicity>;
  nin?: InputMaybe<Array<HolidayPeriodicity>>;
};

export type IamContact = {
  __typename?: 'IAMContact';
  contactInfo?: Maybe<Scalars['String']['output']>;
  contactInfoType: ContactInfoType;
  contactType: ContactType;
  creationDate: Scalars['DateTime']['output'];
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
};

export type IAddressFilterInput = {
  and?: InputMaybe<Array<IAddressFilterInput>>;
  cityName?: InputMaybe<CustomStringFilterInput>;
  cityReference?: InputMaybe<UuidOperationFilterInput>;
  countryISO?: InputMaybe<CustomStringFilterInput>;
  countryName?: InputMaybe<CustomStringFilterInput>;
  countyName?: InputMaybe<CustomStringFilterInput>;
  countyReference?: InputMaybe<UuidOperationFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  localPostCode?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  numbering?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<IAddressFilterInput>>;
  regionName?: InputMaybe<CustomStringFilterInput>;
  regionReference?: InputMaybe<UuidOperationFilterInput>;
  toponymy?: InputMaybe<CustomStringFilterInput>;
};

export type IAddressSortInput = {
  cityName?: InputMaybe<SortEnumType>;
  cityReference?: InputMaybe<SortEnumType>;
  countryISO?: InputMaybe<SortEnumType>;
  countryName?: InputMaybe<SortEnumType>;
  countyName?: InputMaybe<SortEnumType>;
  countyReference?: InputMaybe<SortEnumType>;
  creationDate?: InputMaybe<SortEnumType>;
  localPostCode?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  numbering?: InputMaybe<SortEnumType>;
  regionName?: InputMaybe<SortEnumType>;
  regionReference?: InputMaybe<SortEnumType>;
  toponymy?: InputMaybe<SortEnumType>;
};

export type IContactFilterInput = {
  and?: InputMaybe<Array<IContactFilterInput>>;
  contactInfo?: InputMaybe<CustomStringFilterInput>;
  contactInfoType?: InputMaybe<ContactInfoTypeOperationFilterInput>;
  contactType?: InputMaybe<ContactTypeOperationFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<IContactFilterInput>>;
};

export type ISubject = {
  addresses: Array<Address>;
  bankAccounts: Array<BankAccount>;
  categories: Array<SubjectCategory>;
  closureDate?: Maybe<Scalars['DateTime']['output']>;
  contacts: Array<Contact>;
  creationDate: Scalars['DateTime']['output'];
  customPersonType?: Maybe<Scalars['Int']['output']>;
  customSubjectStatus?: Maybe<Scalars['Int']['output']>;
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  entryStatus: EntryStatus;
  externalSourceCode?: Maybe<Scalars['String']['output']>;
  heirs: Array<SubjectRelation>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  officers: Array<SubjectRelation>;
  orgUnits: Array<OrgUnit>;
  owningMgmtSubjects: Array<SubjectRelation>;
  personType: PersonType;
  relationMains: Array<SubjectRelation>;
  relationSubordinates: Array<SubjectRelation>;
  subOrganizations: Array<SubjectRelation>;
  taxStatuses: Array<TaxStatus>;
};

export type ITaxConfigMainTableRowFilterInput = {
  and?: InputMaybe<Array<ITaxConfigMainTableRowFilterInput>>;
  groupingName?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ITaxConfigMainTableRowFilterInput>>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type ITaxConfigMainTableRowSortInput = {
  groupingName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type ITaxConfigSubTableRowFilterInput = {
  and?: InputMaybe<Array<ITaxConfigSubTableRowFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ITaxConfigSubTableRowFilterInput>>;
};

export type ITaxConfigSubTableRowSortInput = {
  id?: InputMaybe<SortEnumType>;
};

export type ITaxConfiguration = {
  availableMainTables: Array<Table>;
  availableSubTables: Array<KeyValuePairOfStringAndTable__>;
};

export enum IncomeMetric {
  Ares = 'ARES',
  CubicMetres = 'CUBIC_METRES',
  Rooms = 'ROOMS',
  SquareMetres = 'SQUARE_METRES',
}

export enum IncomeType {
  ActualIncome = 'ACTUAL_INCOME',
  BalanceSheetValue = 'BALANCE_SHEET_VALUE',
  PresumedIncome = 'PRESUMED_INCOME',
  ProposedIncomeByLawIt701_94 = 'PROPOSED_INCOME_BY_LAW_IT701_94',
}

export type InstallmentPaymentInput = {
  amount: Scalars['Decimal']['input'];
  billDate: Scalars['Date']['input'];
  billItemTypeId: Scalars['Int']['input'];
  termInstallmentIds: Array<Scalars['Int']['input']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type InterestRate = {
  __typename?: 'InterestRate';
  countryISO3: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  rate: Scalars['Decimal']['output'];
  since?: Maybe<Scalars['Date']['output']>;
  until?: Maybe<Scalars['Date']['output']>;
};

export type InterestRateFilterInput = {
  and?: InputMaybe<Array<InterestRateFilterInput>>;
  countryISO3?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<InterestRateFilterInput>>;
  rate?: InputMaybe<DecimalOperationFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type InterestRateInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  rate: Scalars['Decimal']['input'];
  since: Scalars['Date']['input'];
  until?: InputMaybe<Scalars['Date']['input']>;
};

export type InterestRateMutations = {
  __typename?: 'InterestRateMutations';
  add: ResultOfInterestRate;
  delete: Result;
  deleteRange: Result;
  update: ResultOfInterestRate;
};

export type InterestRateMutationsAddArgs = {
  input: InterestRateInput;
};

export type InterestRateMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type InterestRateMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type InterestRateMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: InterestRateInput;
};

export type InterestRateQueries = {
  __typename?: 'InterestRateQueries';
  exportToExcel: FileUrlOutput;
  get?: Maybe<InterestRate>;
  listInterestRates?: Maybe<ListInterestRatesConnection>;
};

export type InterestRateQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<InterestRateSortInput>>;
  where?: InputMaybe<InterestRateFilterInput>;
};

export type InterestRateQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type InterestRateQueriesListInterestRatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InterestRateSortInput>>;
  where?: InputMaybe<InterestRateFilterInput>;
};

export type InterestRateSortInput = {
  countryISO3?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  rate?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
};

export type InterventionType = {
  __typename?: 'InterventionType';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type InterventionTypeFilterInput = {
  and?: InputMaybe<Array<InterventionTypeFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<InterventionTypeFilterInput>>;
};

export type InterventionTypeInput = {
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type InterventionTypeMutations = {
  __typename?: 'InterventionTypeMutations';
  add: ResultOfInterventionType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfInterventionType;
};

export type InterventionTypeMutationsAddArgs = {
  input: InterventionTypeInput;
};

export type InterventionTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type InterventionTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type InterventionTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: InterventionTypeInput;
};

export type InterventionTypeQueries = {
  __typename?: 'InterventionTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<InterventionType>;
  listInterventionTypes?: Maybe<ListInterventionTypesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type InterventionTypeQueriesCanUseInternalCodeArgs = {
  currentInterventionTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type InterventionTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<InterventionTypeSortInput>>;
  where?: InputMaybe<InterventionTypeFilterInput>;
};

export type InterventionTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type InterventionTypeQueriesListInterventionTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InterventionTypeSortInput>>;
  where?: InputMaybe<InterventionTypeFilterInput>;
};

export type InterventionTypeSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type IssuesAverageResolutionDurationByStatusStatistics = {
  __typename?: 'IssuesAverageResolutionDurationByStatusStatistics';
  assignedDuration?: Maybe<Scalars['TimeSpan']['output']>;
  completedDuration?: Maybe<Scalars['TimeSpan']['output']>;
  inProgressDuration?: Maybe<Scalars['TimeSpan']['output']>;
  newDuration?: Maybe<Scalars['TimeSpan']['output']>;
  resolvedDuration?: Maybe<Scalars['TimeSpan']['output']>;
};

export type IssuesCountByStatusStatistics = {
  __typename?: 'IssuesCountByStatusStatistics';
  assignedStatusCount: Scalars['Int']['output'];
  completedStatusCount: Scalars['Int']['output'];
  inProgressStatusCount: Scalars['Int']['output'];
  newStatusCount: Scalars['Int']['output'];
  resolvedStatusCount: Scalars['Int']['output'];
};

export type IssuesExcludedFromMaintenanceContractLineChartDataPoint = {
  __typename?: 'IssuesExcludedFromMaintenanceContractLineChartDataPoint';
  excludedCount: Scalars['Int']['output'];
  nonExcludedCount: Scalars['Int']['output'];
};

export type IssuesExcludedFromMaintenanceContractStatistics = {
  __typename?: 'IssuesExcludedFromMaintenanceContractStatistics';
  excludedPercentage: Scalars['Float']['output'];
  nonExcludedPercentage: Scalars['Float']['output'];
};

export type IssuesPercentageByPriorityStatistics = {
  __typename?: 'IssuesPercentageByPriorityStatistics';
  criticalStatusPercentage: Scalars['Float']['output'];
  majorStatusPercentage: Scalars['Float']['output'];
  minorStatusPercentage: Scalars['Float']['output'];
  normalStatusPercentage: Scalars['Float']['output'];
};

export type IssuesPercentageByStatusStatistics = {
  __typename?: 'IssuesPercentageByStatusStatistics';
  assignedStatusPercentage: Scalars['Float']['output'];
  completedStatusPercentage: Scalars['Float']['output'];
  inProgressStatusPercentage: Scalars['Float']['output'];
  newStatusPercentage: Scalars['Float']['output'];
  resolvedStatusPercentage: Scalars['Float']['output'];
};

export type IssuesSlaRespectingPercentageStatistics = {
  __typename?: 'IssuesSLARespectingPercentageStatistics';
  notRespectingPercentage: Scalars['Float']['output'];
  respectingPercentage: Scalars['Float']['output'];
};

export type IssuesStatusLineChartDataPoint = {
  __typename?: 'IssuesStatusLineChartDataPoint';
  assignedCount: Scalars['Int']['output'];
  completedCount: Scalars['Int']['output'];
  inProgressCount: Scalars['Int']['output'];
  newCount: Scalars['Int']['output'];
  resolvedCount: Scalars['Int']['output'];
};

export type ItaIliaConfiguration = ITaxConfiguration & {
  __typename?: 'ItaILIAConfiguration';
  availableMainTables: Array<Table>;
  availableSubTables: Array<KeyValuePairOfStringAndTable__>;
};

export type ItaImuConfiguration = ITaxConfiguration & {
  __typename?: 'ItaIMUConfiguration';
  availableMainTables: Array<Table>;
  availableSubTables: Array<KeyValuePairOfStringAndTable__>;
};

export type KeyValuePairOfCostChargeAnalysisCategoryAndCostChargeAnalysis = {
  __typename?: 'KeyValuePairOfCostChargeAnalysisCategoryAndCostChargeAnalysis';
  key: CostChargeAnalysisCategory;
  value: CostChargeAnalysis;
};

export type KeyValuePairOfEstateMarketValueTypeAndDecimal = {
  __typename?: 'KeyValuePairOfEstateMarketValueTypeAndDecimal';
  key: EstateMarketValueType;
  value: Scalars['Decimal']['output'];
};

export type KeyValuePairOfInt32AndBooleanInput = {
  key: Scalars['Int']['input'];
  value: Scalars['Boolean']['input'];
};

export type KeyValuePairOfInt32AndCostChargeAnalysisValue = {
  __typename?: 'KeyValuePairOfInt32AndCostChargeAnalysisValue';
  key: Scalars['Int']['output'];
  value: CostChargeAnalysisValue;
};

export type KeyValuePairOfInt32AndCostChargeYearlyAnalysis = {
  __typename?: 'KeyValuePairOfInt32AndCostChargeYearlyAnalysis';
  key: Scalars['Int']['output'];
  value: CostChargeYearlyAnalysis;
};

export type KeyValuePairOfStringAndDouble = {
  __typename?: 'KeyValuePairOfStringAndDouble';
  key: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type KeyValuePairOfStringAndITaxConfigSubTableRow__ = {
  __typename?: 'KeyValuePairOfStringAndITaxConfigSubTableRow__';
  key: Scalars['String']['output'];
  value: Array<TaxConfigSubTableRow>;
};

export type KeyValuePairOfStringAndString = {
  __typename?: 'KeyValuePairOfStringAndString';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type KeyValuePairOfStringAndTable__ = {
  __typename?: 'KeyValuePairOfStringAndTable__';
  key: Scalars['String']['output'];
  value: Array<Table>;
};

export type KeyValuePairOfTicketTypeAndDouble = {
  __typename?: 'KeyValuePairOfTicketTypeAndDouble';
  key: TicketType;
  value: Scalars['Float']['output'];
};

export type LegalSubject = ISubject & {
  __typename?: 'LegalSubject';
  additionalGovIdCode?: Maybe<Scalars['String']['output']>;
  additionalTaxIdCode?: Maybe<Scalars['String']['output']>;
  addresses: Array<Address>;
  bankAccounts: Array<BankAccount>;
  bankingId1?: Maybe<Scalars['String']['output']>;
  bankingId2?: Maybe<Scalars['String']['output']>;
  baseCountryISO?: Maybe<Scalars['String']['output']>;
  baseCountryTaxIdCode?: Maybe<Scalars['String']['output']>;
  businessStart?: Maybe<Scalars['Date']['output']>;
  canUseDocumentName: Scalars['Boolean']['output'];
  categories: Array<SubjectCategory>;
  closureDate?: Maybe<Scalars['DateTime']['output']>;
  companiesHouseIdCode?: Maybe<Scalars['String']['output']>;
  companyGroupParent?: Maybe<SubjectRelation>;
  contact?: Maybe<Contact>;
  contacts: Array<Contact>;
  creationDate: Scalars['DateTime']['output'];
  customPersonType?: Maybe<Scalars['Int']['output']>;
  customSubjectStatus?: Maybe<Scalars['Int']['output']>;
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  documents: Array<Document>;
  entryStatus: EntryStatus;
  externalSourceCode?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  heirs: Array<SubjectRelation>;
  id: Scalars['Int']['output'];
  interGroupSignature?: Maybe<Scalars['String']['output']>;
  internalCode: Scalars['String']['output'];
  legalSubjectType: LegalSubjectType;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  officers: Array<SubjectRelation>;
  orgUnits: Array<OrgUnit>;
  owningMgmtSubjects: Array<SubjectRelation>;
  personType: PersonType;
  relationMains: Array<SubjectRelation>;
  relationSubordinates: Array<SubjectRelation>;
  shareCapital?: Maybe<Scalars['Decimal']['output']>;
  shorthandDescription?: Maybe<Scalars['String']['output']>;
  subOrganizations: Array<SubjectRelation>;
  taxStatuses: Array<TaxStatus>;
};

export type LegalSubjectCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type LegalSubjectContactArgs = {
  infoType: ContactInfoType;
};

export type LegalSubjectDocumentsArgs = {
  order?: InputMaybe<Array<DocumentSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type LegalSubjectInput = {
  additionalGovIdCode?: InputMaybe<Scalars['String']['input']>;
  additionalTaxIdCode?: InputMaybe<Scalars['String']['input']>;
  addresses: Array<AddressInput>;
  bankAccounts: Array<BankAccountInput>;
  bankingId1?: InputMaybe<Scalars['String']['input']>;
  bankingId2?: InputMaybe<Scalars['String']['input']>;
  baseCountryTaxIdCode?: InputMaybe<Scalars['String']['input']>;
  businessStart?: InputMaybe<Scalars['Date']['input']>;
  categoriesIds: Array<Scalars['Int']['input']>;
  closureDate?: InputMaybe<Scalars['Date']['input']>;
  companiesHouseIdCode?: InputMaybe<Scalars['String']['input']>;
  companyGroup?: InputMaybe<CompanyGroupInput>;
  contacts: Array<ContactInput>;
  customPersonType?: InputMaybe<Scalars['Int']['input']>;
  customSubjectStatus?: InputMaybe<Scalars['Int']['input']>;
  entryStatus: EntryStatus;
  externalSourceCode?: InputMaybe<Scalars['String']['input']>;
  fullName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  interGroupSignature?: InputMaybe<Scalars['String']['input']>;
  internalCode: Scalars['String']['input'];
  legalSubjectType: LegalSubjectType;
  officers: Array<OfficerInput>;
  ownerManagementSubjectIds: Array<Scalars['Int']['input']>;
  shareCapital?: InputMaybe<Scalars['Decimal']['input']>;
  shorthandDescription?: InputMaybe<Scalars['String']['input']>;
  taxStatuses: Array<TaxStatusInput>;
};

export enum LegalSubjectType {
  ActualLegalSubject = 'ACTUAL_LEGAL_SUBJECT',
  UnrecognizedBusinessSociety = 'UNRECOGNIZED_BUSINESS_SOCIETY',
  UnrecognizedNonbusinessSociety = 'UNRECOGNIZED_NONBUSINESS_SOCIETY',
}

export type LegalSubjectTypeOperationFilterInput = {
  eq?: InputMaybe<LegalSubjectType>;
  in?: InputMaybe<Array<LegalSubjectType>>;
  neq?: InputMaybe<LegalSubjectType>;
  nin?: InputMaybe<Array<LegalSubjectType>>;
};

export type LineChartDailySeriesOfChecklistTicketsCountLineChartDataPoint = {
  __typename?: 'LineChartDailySeriesOfChecklistTicketsCountLineChartDataPoint';
  dataPoint: ChecklistTicketsCountLineChartDataPoint;
  date: Scalars['Date']['output'];
};

export type LineChartDailySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint = {
  __typename?: 'LineChartDailySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
  dataPoint: IssuesExcludedFromMaintenanceContractLineChartDataPoint;
  date: Scalars['Date']['output'];
};

export type LineChartDailySeriesOfIssuesStatusLineChartDataPoint = {
  __typename?: 'LineChartDailySeriesOfIssuesStatusLineChartDataPoint';
  dataPoint: IssuesStatusLineChartDataPoint;
  date: Scalars['Date']['output'];
};

export type LineChartDailySeriesOfTicketsAmountChartDataPoint = {
  __typename?: 'LineChartDailySeriesOfTicketsAmountChartDataPoint';
  dataPoint: TicketsAmountChartDataPoint;
  date: Scalars['Date']['output'];
};

export type LineChartDailySeriesOfTicketsTypeLineChartDataPoint = {
  __typename?: 'LineChartDailySeriesOfTicketsTypeLineChartDataPoint';
  dataPoint: TicketsTypeLineChartDataPoint;
  date: Scalars['Date']['output'];
};

export type LineChartMonthlySeriesOfChecklistTicketsCountLineChartDataPoint = {
  __typename?: 'LineChartMonthlySeriesOfChecklistTicketsCountLineChartDataPoint';
  dataPoint: ChecklistTicketsCountLineChartDataPoint;
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartMonthlySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint = {
  __typename?: 'LineChartMonthlySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
  dataPoint: IssuesExcludedFromMaintenanceContractLineChartDataPoint;
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartMonthlySeriesOfIssuesStatusLineChartDataPoint = {
  __typename?: 'LineChartMonthlySeriesOfIssuesStatusLineChartDataPoint';
  dataPoint: IssuesStatusLineChartDataPoint;
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartMonthlySeriesOfTicketsAmountChartDataPoint = {
  __typename?: 'LineChartMonthlySeriesOfTicketsAmountChartDataPoint';
  dataPoint: TicketsAmountChartDataPoint;
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartMonthlySeriesOfTicketsCountLineChartDataPoint = {
  __typename?: 'LineChartMonthlySeriesOfTicketsCountLineChartDataPoint';
  dataPoint: TicketsCountLineChartDataPoint;
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartMonthlySeriesOfTicketsTotalAmountChartDataPoint = {
  __typename?: 'LineChartMonthlySeriesOfTicketsTotalAmountChartDataPoint';
  dataPoint: TicketsTotalAmountChartDataPoint;
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartMonthlySeriesOfTicketsTypeLineChartDataPoint = {
  __typename?: 'LineChartMonthlySeriesOfTicketsTypeLineChartDataPoint';
  dataPoint: TicketsTypeLineChartDataPoint;
  month: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartOfChecklistTicketsCountLineChartDataPoint = {
  __typename?: 'LineChartOfChecklistTicketsCountLineChartDataPoint';
  daily?: Maybe<Array<LineChartDailySeriesOfChecklistTicketsCountLineChartDataPoint>>;
  monthly?: Maybe<Array<LineChartMonthlySeriesOfChecklistTicketsCountLineChartDataPoint>>;
  weekly?: Maybe<Array<LineChartWeeklySeriesOfChecklistTicketsCountLineChartDataPoint>>;
};

export type LineChartOfIssuesExcludedFromMaintenanceContractLineChartDataPoint = {
  __typename?: 'LineChartOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
  daily?: Maybe<Array<LineChartDailySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint>>;
  monthly?: Maybe<Array<LineChartMonthlySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint>>;
  weekly?: Maybe<Array<LineChartWeeklySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint>>;
};

export type LineChartOfIssuesStatusLineChartDataPoint = {
  __typename?: 'LineChartOfIssuesStatusLineChartDataPoint';
  daily?: Maybe<Array<LineChartDailySeriesOfIssuesStatusLineChartDataPoint>>;
  monthly?: Maybe<Array<LineChartMonthlySeriesOfIssuesStatusLineChartDataPoint>>;
  weekly?: Maybe<Array<LineChartWeeklySeriesOfIssuesStatusLineChartDataPoint>>;
};

export type LineChartOfTicketsAmountChartDataPoint = {
  __typename?: 'LineChartOfTicketsAmountChartDataPoint';
  daily?: Maybe<Array<LineChartDailySeriesOfTicketsAmountChartDataPoint>>;
  monthly?: Maybe<Array<LineChartMonthlySeriesOfTicketsAmountChartDataPoint>>;
  weekly?: Maybe<Array<LineChartWeeklySeriesOfTicketsAmountChartDataPoint>>;
};

export type LineChartOfTicketsTypeLineChartDataPoint = {
  __typename?: 'LineChartOfTicketsTypeLineChartDataPoint';
  daily?: Maybe<Array<LineChartDailySeriesOfTicketsTypeLineChartDataPoint>>;
  monthly?: Maybe<Array<LineChartMonthlySeriesOfTicketsTypeLineChartDataPoint>>;
  weekly?: Maybe<Array<LineChartWeeklySeriesOfTicketsTypeLineChartDataPoint>>;
};

export enum LineChartType {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
}

export type LineChartWeeklySeriesOfChecklistTicketsCountLineChartDataPoint = {
  __typename?: 'LineChartWeeklySeriesOfChecklistTicketsCountLineChartDataPoint';
  dataPoint: ChecklistTicketsCountLineChartDataPoint;
  week: Scalars['Int']['output'];
  weekEndDate: Scalars['Date']['output'];
  weekStartDate: Scalars['Date']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartWeeklySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint = {
  __typename?: 'LineChartWeeklySeriesOfIssuesExcludedFromMaintenanceContractLineChartDataPoint';
  dataPoint: IssuesExcludedFromMaintenanceContractLineChartDataPoint;
  week: Scalars['Int']['output'];
  weekEndDate: Scalars['Date']['output'];
  weekStartDate: Scalars['Date']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartWeeklySeriesOfIssuesStatusLineChartDataPoint = {
  __typename?: 'LineChartWeeklySeriesOfIssuesStatusLineChartDataPoint';
  dataPoint: IssuesStatusLineChartDataPoint;
  week: Scalars['Int']['output'];
  weekEndDate: Scalars['Date']['output'];
  weekStartDate: Scalars['Date']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartWeeklySeriesOfTicketsAmountChartDataPoint = {
  __typename?: 'LineChartWeeklySeriesOfTicketsAmountChartDataPoint';
  dataPoint: TicketsAmountChartDataPoint;
  week: Scalars['Int']['output'];
  weekEndDate: Scalars['Date']['output'];
  weekStartDate: Scalars['Date']['output'];
  year: Scalars['Int']['output'];
};

export type LineChartWeeklySeriesOfTicketsTypeLineChartDataPoint = {
  __typename?: 'LineChartWeeklySeriesOfTicketsTypeLineChartDataPoint';
  dataPoint: TicketsTypeLineChartDataPoint;
  week: Scalars['Int']['output'];
  weekEndDate: Scalars['Date']['output'];
  weekStartDate: Scalars['Date']['output'];
  year: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type ListAccountingTypesConnection = {
  __typename?: 'ListAccountingTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListAccountingTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<AccountingItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListAccountingTypesEdge = {
  __typename?: 'ListAccountingTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: AccountingItem;
};

export type ListAddressFilterTypeFilterInput = {
  all?: InputMaybe<IAddressFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<IAddressFilterInput>;
  some?: InputMaybe<IAddressFilterInput>;
};

/** A connection to a list of items. */
export type ListAdministrationTermsConnection = {
  __typename?: 'ListAdministrationTermsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListAdministrationTermsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<AdministrationTerm>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListAdministrationTermsEdge = {
  __typename?: 'ListAdministrationTermsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: AdministrationTerm;
};

/** A connection to a list of items. */
export type ListAdministrationsConnection = {
  __typename?: 'ListAdministrationsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListAdministrationsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Administration>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListAdministrationsEdge = {
  __typename?: 'ListAdministrationsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Administration;
};

/** A connection to a list of items. */
export type ListAnomaliesConnection = {
  __typename?: 'ListAnomaliesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListAnomaliesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RegistryCommunicationAnomalyOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListAnomaliesEdge = {
  __typename?: 'ListAnomaliesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RegistryCommunicationAnomalyOutput;
};

export type ListAssetTaxDetailEstateItemFilterTypeFilterInput = {
  all?: InputMaybe<AssetTaxDetailEstateItemFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AssetTaxDetailEstateItemFilterInput>;
  some?: InputMaybe<AssetTaxDetailEstateItemFilterInput>;
};

export type ListAssetTaxDetailEstateUnitItemFilterTypeFilterInput = {
  all?: InputMaybe<AssetTaxDetailEstateUnitItemFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AssetTaxDetailEstateUnitItemFilterInput>;
  some?: InputMaybe<AssetTaxDetailEstateUnitItemFilterInput>;
};

/** A connection to a list of items. */
export type ListAuditEventsConnection = {
  __typename?: 'ListAuditEventsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListAuditEventsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<AuditLog>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListAuditEventsEdge = {
  __typename?: 'ListAuditEventsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: AuditLog;
};

/** A connection to a list of items. */
export type ListAvailableProviderSubjectsConnection = {
  __typename?: 'ListAvailableProviderSubjectsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListAvailableProviderSubjectsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ISubject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListAvailableProviderSubjectsEdge = {
  __typename?: 'ListAvailableProviderSubjectsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ISubject;
};

/** A connection to a list of items. */
export type ListBillItemTypesConnection = {
  __typename?: 'ListBillItemTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListBillItemTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<BillItemType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListBillItemTypesEdge = {
  __typename?: 'ListBillItemTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: BillItemType;
};

/** A connection to a list of items. */
export type ListBillsConnection = {
  __typename?: 'ListBillsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListBillsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Bill>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListBillsEdge = {
  __typename?: 'ListBillsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Bill;
};

/** A connection to a list of items. */
export type ListCadastralCategoriesConnection = {
  __typename?: 'ListCadastralCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCadastralCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CadastralCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCadastralCategoriesEdge = {
  __typename?: 'ListCadastralCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CadastralCategory;
};

export type ListCadastralCoordinatesFilterTypeFilterInput = {
  all?: InputMaybe<CadastralCoordinatesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CadastralCoordinatesFilterInput>;
  some?: InputMaybe<CadastralCoordinatesFilterInput>;
};

/** A connection to a list of items. */
export type ListCadastralUnitsConnection = {
  __typename?: 'ListCadastralUnitsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCadastralUnitsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CadastralUnit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCadastralUnitsEdge = {
  __typename?: 'ListCadastralUnitsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CadastralUnit;
};

/** A connection to a list of items. */
export type ListCalendarsConnection = {
  __typename?: 'ListCalendarsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCalendarsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Calendar>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCalendarsEdge = {
  __typename?: 'ListCalendarsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Calendar;
};

/** A connection to a list of items. */
export type ListCatalogueCategoriesConnection = {
  __typename?: 'ListCatalogueCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCatalogueCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CatalogueCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCatalogueCategoriesEdge = {
  __typename?: 'ListCatalogueCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogueCategory;
};

/** A connection to a list of items. */
export type ListCatalogueItemsConnection = {
  __typename?: 'ListCatalogueItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCatalogueItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CatalogueItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCatalogueItemsEdge = {
  __typename?: 'ListCatalogueItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogueItem;
};

/** A connection to a list of items. */
export type ListCatalogueSubCategoriesConnection = {
  __typename?: 'ListCatalogueSubCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCatalogueSubCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CatalogueSubCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCatalogueSubCategoriesEdge = {
  __typename?: 'ListCatalogueSubCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogueSubCategory;
};

/** A connection to a list of items. */
export type ListCatalogueTypesConnection = {
  __typename?: 'ListCatalogueTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCatalogueTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CatalogueType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCatalogueTypesEdge = {
  __typename?: 'ListCatalogueTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogueType;
};

/** A connection to a list of items. */
export type ListCataloguesConnection = {
  __typename?: 'ListCataloguesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCataloguesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CatalogueOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCataloguesEdge = {
  __typename?: 'ListCataloguesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogueOutput;
};

/** A connection to a list of items. */
export type ListCitiesConnection = {
  __typename?: 'ListCitiesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCitiesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<City>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCitiesEdge = {
  __typename?: 'ListCitiesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: City;
};

export type ListContactFilterTypeFilterInput = {
  all?: InputMaybe<IContactFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<IContactFilterInput>;
  some?: InputMaybe<IContactFilterInput>;
};

/** A connection to a list of items. */
export type ListContractTemplatesConnection = {
  __typename?: 'ListContractTemplatesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListContractTemplatesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ContractTemplate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListContractTemplatesEdge = {
  __typename?: 'ListContractTemplatesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ContractTemplate;
};

/** A connection to a list of items. */
export type ListContractTypesConnection = {
  __typename?: 'ListContractTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListContractTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ContractType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListContractTypesEdge = {
  __typename?: 'ListContractTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ContractType;
};

/** A connection to a list of items. */
export type ListContractsConnection = {
  __typename?: 'ListContractsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListContractsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ContractListOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListContractsEdge = {
  __typename?: 'ListContractsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ContractListOutput;
};

/** A connection to a list of items. */
export type ListCostChargesConnection = {
  __typename?: 'ListCostChargesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCostChargesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CostCharge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCostChargesEdge = {
  __typename?: 'ListCostChargesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CostCharge;
};

/** A connection to a list of items. */
export type ListCraftsConnection = {
  __typename?: 'ListCraftsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListCraftsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Craft>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListCraftsEdge = {
  __typename?: 'ListCraftsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Craft;
};

export type ListCustomStringFilterInput = {
  all?: InputMaybe<CustomStringFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CustomStringFilterInput>;
  some?: InputMaybe<CustomStringFilterInput>;
};

export type ListDayOfWeekOperationFilterInput = {
  all?: InputMaybe<DayOfWeekOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<DayOfWeekOperationFilterInput>;
  some?: InputMaybe<DayOfWeekOperationFilterInput>;
};

/** A connection to a list of items. */
export type ListEstateMainUsageTypesConnection = {
  __typename?: 'ListEstateMainUsageTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListEstateMainUsageTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateMainUsageType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListEstateMainUsageTypesEdge = {
  __typename?: 'ListEstateMainUsageTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateMainUsageType;
};

/** A connection to a list of items. */
export type ListEstateSubUnitConnection = {
  __typename?: 'ListEstateSubUnitConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListEstateSubUnitEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateSubUnit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListEstateSubUnitEdge = {
  __typename?: 'ListEstateSubUnitEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateSubUnit;
};

/** A connection to a list of items. */
export type ListEstateUnitGroupsConnection = {
  __typename?: 'ListEstateUnitGroupsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListEstateUnitGroupsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateUnitGroup>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListEstateUnitGroupsEdge = {
  __typename?: 'ListEstateUnitGroupsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateUnitGroup;
};

/** A connection to a list of items. */
export type ListEstateUnitsConnection = {
  __typename?: 'ListEstateUnitsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListEstateUnitsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateUnit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListEstateUnitsEdge = {
  __typename?: 'ListEstateUnitsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateUnit;
};

/** A connection to a list of items. */
export type ListEstateUsageTypesConnection = {
  __typename?: 'ListEstateUsageTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListEstateUsageTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<EstateUsageType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListEstateUsageTypesEdge = {
  __typename?: 'ListEstateUsageTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: EstateUsageType;
};

/** A connection to a list of items. */
export type ListEstatesConnection = {
  __typename?: 'ListEstatesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListEstatesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Estate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListEstatesEdge = {
  __typename?: 'ListEstatesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Estate;
};

/** A connection to a list of items. */
export type ListFcltContractTypesConnection = {
  __typename?: 'ListFcltContractTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListFcltContractTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<FcltContractType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListFcltContractTypesEdge = {
  __typename?: 'ListFcltContractTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: FcltContractType;
};

/** A connection to a list of items. */
export type ListFcltContractsConnection = {
  __typename?: 'ListFcltContractsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListFcltContractsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<FcltContract>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListFcltContractsEdge = {
  __typename?: 'ListFcltContractsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: FcltContract;
};

export type ListFilterInputTypeOfAdministrationTermFilterInput = {
  all?: InputMaybe<AdministrationTermFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AdministrationTermFilterInput>;
  some?: InputMaybe<AdministrationTermFilterInput>;
};

export type ListFilterInputTypeOfArticlePricePeriodFilterInput = {
  all?: InputMaybe<ArticlePricePeriodFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ArticlePricePeriodFilterInput>;
  some?: InputMaybe<ArticlePricePeriodFilterInput>;
};

export type ListFilterInputTypeOfAssetTaxCalculationFilterInput = {
  all?: InputMaybe<AssetTaxCalculationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AssetTaxCalculationFilterInput>;
  some?: InputMaybe<AssetTaxCalculationFilterInput>;
};

export type ListFilterInputTypeOfAssetTaxPaymentFilterInput = {
  all?: InputMaybe<AssetTaxPaymentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AssetTaxPaymentFilterInput>;
  some?: InputMaybe<AssetTaxPaymentFilterInput>;
};

export type ListFilterInputTypeOfBankAccountFilterInput = {
  all?: InputMaybe<BankAccountFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BankAccountFilterInput>;
  some?: InputMaybe<BankAccountFilterInput>;
};

export type ListFilterInputTypeOfBillFilterInput = {
  all?: InputMaybe<BillFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BillFilterInput>;
  some?: InputMaybe<BillFilterInput>;
};

export type ListFilterInputTypeOfBillRowFilterInput = {
  all?: InputMaybe<BillRowFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BillRowFilterInput>;
  some?: InputMaybe<BillRowFilterInput>;
};

export type ListFilterInputTypeOfBillingPauseFilterInput = {
  all?: InputMaybe<BillingPauseFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BillingPauseFilterInput>;
  some?: InputMaybe<BillingPauseFilterInput>;
};

export type ListFilterInputTypeOfCadastralExpensesFilterInput = {
  all?: InputMaybe<CadastralExpensesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CadastralExpensesFilterInput>;
  some?: InputMaybe<CadastralExpensesFilterInput>;
};

export type ListFilterInputTypeOfCadastralUnavailabilityFilterInput = {
  all?: InputMaybe<CadastralUnavailabilityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CadastralUnavailabilityFilterInput>;
  some?: InputMaybe<CadastralUnavailabilityFilterInput>;
};

export type ListFilterInputTypeOfCadastralUnitFilterInput = {
  all?: InputMaybe<CadastralUnitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CadastralUnitFilterInput>;
  some?: InputMaybe<CadastralUnitFilterInput>;
};

export type ListFilterInputTypeOfCatalogueItemFieldFilterInput = {
  all?: InputMaybe<CatalogueItemFieldFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CatalogueItemFieldFilterInput>;
  some?: InputMaybe<CatalogueItemFieldFilterInput>;
};

export type ListFilterInputTypeOfCatalogueItemFilterInput = {
  all?: InputMaybe<CatalogueItemFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CatalogueItemFilterInput>;
  some?: InputMaybe<CatalogueItemFilterInput>;
};

export type ListFilterInputTypeOfCatalogueSubCategoryFilterInput = {
  all?: InputMaybe<CatalogueSubCategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CatalogueSubCategoryFilterInput>;
  some?: InputMaybe<CatalogueSubCategoryFilterInput>;
};

export type ListFilterInputTypeOfCatalogueTypeActivityFilterInput = {
  all?: InputMaybe<CatalogueTypeActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CatalogueTypeActivityFilterInput>;
  some?: InputMaybe<CatalogueTypeActivityFilterInput>;
};

export type ListFilterInputTypeOfCatalogueTypeFieldFilterInput = {
  all?: InputMaybe<CatalogueTypeFieldFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CatalogueTypeFieldFilterInput>;
  some?: InputMaybe<CatalogueTypeFieldFilterInput>;
};

export type ListFilterInputTypeOfCatalogueTypeFilterInput = {
  all?: InputMaybe<CatalogueTypeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CatalogueTypeFilterInput>;
  some?: InputMaybe<CatalogueTypeFilterInput>;
};

export type ListFilterInputTypeOfCommEstateUnitFilterInput = {
  all?: InputMaybe<CommEstateUnitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CommEstateUnitFilterInput>;
  some?: InputMaybe<CommEstateUnitFilterInput>;
};

export type ListFilterInputTypeOfContactFilterInput = {
  all?: InputMaybe<ContactFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ContactFilterInput>;
  some?: InputMaybe<ContactFilterInput>;
};

export type ListFilterInputTypeOfContractFilterInput = {
  all?: InputMaybe<ContractFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ContractFilterInput>;
  some?: InputMaybe<ContractFilterInput>;
};

export type ListFilterInputTypeOfContractTemplateFilterInput = {
  all?: InputMaybe<ContractTemplateFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ContractTemplateFilterInput>;
  some?: InputMaybe<ContractTemplateFilterInput>;
};

export type ListFilterInputTypeOfCostChargeFieldFilterInput = {
  all?: InputMaybe<CostChargeFieldFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CostChargeFieldFilterInput>;
  some?: InputMaybe<CostChargeFieldFilterInput>;
};

export type ListFilterInputTypeOfCounterpartFilterInput = {
  all?: InputMaybe<CounterpartFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CounterpartFilterInput>;
  some?: InputMaybe<CounterpartFilterInput>;
};

export type ListFilterInputTypeOfEstateMarketValueFilterInput = {
  all?: InputMaybe<EstateMarketValueFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EstateMarketValueFilterInput>;
  some?: InputMaybe<EstateMarketValueFilterInput>;
};

export type ListFilterInputTypeOfEstateSubUnitFilterInput = {
  all?: InputMaybe<EstateSubUnitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EstateSubUnitFilterInput>;
  some?: InputMaybe<EstateSubUnitFilterInput>;
};

export type ListFilterInputTypeOfEstateTotalMarketValueCoefficientFilterInput = {
  all?: InputMaybe<EstateTotalMarketValueCoefficientFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EstateTotalMarketValueCoefficientFilterInput>;
  some?: InputMaybe<EstateTotalMarketValueCoefficientFilterInput>;
};

export type ListFilterInputTypeOfEstateUnitFilterInput = {
  all?: InputMaybe<EstateUnitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EstateUnitFilterInput>;
  some?: InputMaybe<EstateUnitFilterInput>;
};

export type ListFilterInputTypeOfEstateUnitFloorFilterInput = {
  all?: InputMaybe<EstateUnitFloorFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EstateUnitFloorFilterInput>;
  some?: InputMaybe<EstateUnitFloorFilterInput>;
};

export type ListFilterInputTypeOfEstateUnitSurfaceFilterInput = {
  all?: InputMaybe<EstateUnitSurfaceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EstateUnitSurfaceFilterInput>;
  some?: InputMaybe<EstateUnitSurfaceFilterInput>;
};

export type ListFilterInputTypeOfEstateUsageTypeFilterInput = {
  all?: InputMaybe<EstateUsageTypeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<EstateUsageTypeFilterInput>;
  some?: InputMaybe<EstateUsageTypeFilterInput>;
};

export type ListFilterInputTypeOfFcltContractFilterInput = {
  all?: InputMaybe<FcltContractFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FcltContractFilterInput>;
  some?: InputMaybe<FcltContractFilterInput>;
};

export type ListFilterInputTypeOfFloorFilterInput = {
  all?: InputMaybe<FloorFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FloorFilterInput>;
  some?: InputMaybe<FloorFilterInput>;
};

export type ListFilterInputTypeOfFrameworkAgreementFilterInput = {
  all?: InputMaybe<FrameworkAgreementFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FrameworkAgreementFilterInput>;
  some?: InputMaybe<FrameworkAgreementFilterInput>;
};

export type ListFilterInputTypeOfHolidayFilterInput = {
  all?: InputMaybe<HolidayFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<HolidayFilterInput>;
  some?: InputMaybe<HolidayFilterInput>;
};

export type ListFilterInputTypeOfLocatedUnitFilterInput = {
  all?: InputMaybe<LocatedUnitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocatedUnitFilterInput>;
  some?: InputMaybe<LocatedUnitFilterInput>;
};

export type ListFilterInputTypeOfOneshotAdditionFilterInput = {
  all?: InputMaybe<OneshotAdditionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<OneshotAdditionFilterInput>;
  some?: InputMaybe<OneshotAdditionFilterInput>;
};

export type ListFilterInputTypeOfOperationFilterInput = {
  all?: InputMaybe<OperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<OperationFilterInput>;
  some?: InputMaybe<OperationFilterInput>;
};

export type ListFilterInputTypeOfPenaltyFilterInput = {
  all?: InputMaybe<PenaltyFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PenaltyFilterInput>;
  some?: InputMaybe<PenaltyFilterInput>;
};

export type ListFilterInputTypeOfPenaltyValueFilterInput = {
  all?: InputMaybe<PenaltyValueFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PenaltyValueFilterInput>;
  some?: InputMaybe<PenaltyValueFilterInput>;
};

export type ListFilterInputTypeOfPerformedActivityFilterInput = {
  all?: InputMaybe<PerformedActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PerformedActivityFilterInput>;
  some?: InputMaybe<PerformedActivityFilterInput>;
};

export type ListFilterInputTypeOfPriceListArticleFilterInput = {
  all?: InputMaybe<PriceListArticleFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PriceListArticleFilterInput>;
  some?: InputMaybe<PriceListArticleFilterInput>;
};

export type ListFilterInputTypeOfPriceListFilterInput = {
  all?: InputMaybe<PriceListFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PriceListFilterInput>;
  some?: InputMaybe<PriceListFilterInput>;
};

export type ListFilterInputTypeOfQuoteArticleFilterInput = {
  all?: InputMaybe<QuoteArticleFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<QuoteArticleFilterInput>;
  some?: InputMaybe<QuoteArticleFilterInput>;
};

export type ListFilterInputTypeOfQuoteHistoryEntryFilterInput = {
  all?: InputMaybe<QuoteHistoryEntryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<QuoteHistoryEntryFilterInput>;
  some?: InputMaybe<QuoteHistoryEntryFilterInput>;
};

export type ListFilterInputTypeOfRatePlanFilterInput = {
  all?: InputMaybe<RatePlanFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RatePlanFilterInput>;
  some?: InputMaybe<RatePlanFilterInput>;
};

export type ListFilterInputTypeOfReadingValueFilterInput = {
  all?: InputMaybe<ReadingValueFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReadingValueFilterInput>;
  some?: InputMaybe<ReadingValueFilterInput>;
};

export type ListFilterInputTypeOfRecurringAdditionFilterInput = {
  all?: InputMaybe<RecurringAdditionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RecurringAdditionFilterInput>;
  some?: InputMaybe<RecurringAdditionFilterInput>;
};

export type ListFilterInputTypeOfRefactoringFilterInput = {
  all?: InputMaybe<RefactoringFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RefactoringFilterInput>;
  some?: InputMaybe<RefactoringFilterInput>;
};

export type ListFilterInputTypeOfRegistrationPaymentFilterInput = {
  all?: InputMaybe<RegistrationPaymentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RegistrationPaymentFilterInput>;
  some?: InputMaybe<RegistrationPaymentFilterInput>;
};

export type ListFilterInputTypeOfRegistrationPaymentRowFilterInput = {
  all?: InputMaybe<RegistrationPaymentRowFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RegistrationPaymentRowFilterInput>;
  some?: InputMaybe<RegistrationPaymentRowFilterInput>;
};

export type ListFilterInputTypeOfRegistryCommunicationAnomalyFilterInput = {
  all?: InputMaybe<RegistryCommunicationAnomalyFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RegistryCommunicationAnomalyFilterInput>;
  some?: InputMaybe<RegistryCommunicationAnomalyFilterInput>;
};

export type ListFilterInputTypeOfRegistryCommunicationFilterInput = {
  all?: InputMaybe<RegistryCommunicationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RegistryCommunicationFilterInput>;
  some?: InputMaybe<RegistryCommunicationFilterInput>;
};

export type ListFilterInputTypeOfReminderFilterInput = {
  all?: InputMaybe<ReminderFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReminderFilterInput>;
  some?: InputMaybe<ReminderFilterInput>;
};

export type ListFilterInputTypeOfReplyFilterInput = {
  all?: InputMaybe<ReplyFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReplyFilterInput>;
  some?: InputMaybe<ReplyFilterInput>;
};

export type ListFilterInputTypeOfRepossessionFilterInput = {
  all?: InputMaybe<RepossessionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RepossessionFilterInput>;
  some?: InputMaybe<RepossessionFilterInput>;
};

export type ListFilterInputTypeOfRevaluationHistoryFilterInput = {
  all?: InputMaybe<RevaluationHistoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RevaluationHistoryFilterInput>;
  some?: InputMaybe<RevaluationHistoryFilterInput>;
};

export type ListFilterInputTypeOfSlaFilterInput = {
  all?: InputMaybe<SlaFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SlaFilterInput>;
  some?: InputMaybe<SlaFilterInput>;
};

export type ListFilterInputTypeOfSecurityDepositFilterInput = {
  all?: InputMaybe<SecurityDepositFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SecurityDepositFilterInput>;
  some?: InputMaybe<SecurityDepositFilterInput>;
};

export type ListFilterInputTypeOfSecurityDepositInterestRowFilterInput = {
  all?: InputMaybe<SecurityDepositInterestRowFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SecurityDepositInterestRowFilterInput>;
  some?: InputMaybe<SecurityDepositInterestRowFilterInput>;
};

export type ListFilterInputTypeOfServiceActivityFilterInput = {
  all?: InputMaybe<ServiceActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ServiceActivityFilterInput>;
  some?: InputMaybe<ServiceActivityFilterInput>;
};

export type ListFilterInputTypeOfServiceFilterInput = {
  all?: InputMaybe<ServiceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ServiceFilterInput>;
  some?: InputMaybe<ServiceFilterInput>;
};

export type ListFilterInputTypeOfServiceSubCategoryFilterInput = {
  all?: InputMaybe<ServiceSubCategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ServiceSubCategoryFilterInput>;
  some?: InputMaybe<ServiceSubCategoryFilterInput>;
};

export type ListFilterInputTypeOfSessionFilterInput = {
  all?: InputMaybe<SessionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SessionFilterInput>;
  some?: InputMaybe<SessionFilterInput>;
};

export type ListFilterInputTypeOfSubjectCategoryFilterInput = {
  all?: InputMaybe<SubjectCategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SubjectCategoryFilterInput>;
  some?: InputMaybe<SubjectCategoryFilterInput>;
};

export type ListFilterInputTypeOfTakeoverFilterInput = {
  all?: InputMaybe<TakeoverFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TakeoverFilterInput>;
  some?: InputMaybe<TakeoverFilterInput>;
};

export type ListFilterInputTypeOfTaxStatusFilterInput = {
  all?: InputMaybe<TaxStatusFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TaxStatusFilterInput>;
  some?: InputMaybe<TaxStatusFilterInput>;
};

export type ListFilterInputTypeOfTermExtensionFilterInput = {
  all?: InputMaybe<TermExtensionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TermExtensionFilterInput>;
  some?: InputMaybe<TermExtensionFilterInput>;
};

export type ListFilterInputTypeOfTermInstallmentFilterInput = {
  all?: InputMaybe<TermInstallmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TermInstallmentFilterInput>;
  some?: InputMaybe<TermInstallmentFilterInput>;
};

export type ListFilterInputTypeOfTicketChecklistFilterInput = {
  all?: InputMaybe<TicketChecklistFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TicketChecklistFilterInput>;
  some?: InputMaybe<TicketChecklistFilterInput>;
};

export type ListFilterInputTypeOfTicketConditionFilterInput = {
  all?: InputMaybe<TicketConditionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TicketConditionFilterInput>;
  some?: InputMaybe<TicketConditionFilterInput>;
};

export type ListFilterInputTypeOfTicketFilterInput = {
  all?: InputMaybe<TicketFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TicketFilterInput>;
  some?: InputMaybe<TicketFilterInput>;
};

export type ListFilterInputTypeOfTicketHistoryEntryFilterInput = {
  all?: InputMaybe<TicketHistoryEntryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TicketHistoryEntryFilterInput>;
  some?: InputMaybe<TicketHistoryEntryFilterInput>;
};

export type ListFilterInputTypeOfTimeRangeFilterInput = {
  all?: InputMaybe<TimeRangeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TimeRangeFilterInput>;
  some?: InputMaybe<TimeRangeFilterInput>;
};

export type ListFilterInputTypeOfTransactorFilterInput = {
  all?: InputMaybe<TransactorFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TransactorFilterInput>;
  some?: InputMaybe<TransactorFilterInput>;
};

export type ListFilterInputTypeOfUnitExpensesFilterInput = {
  all?: InputMaybe<UnitExpensesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UnitExpensesFilterInput>;
  some?: InputMaybe<UnitExpensesFilterInput>;
};

export type ListFilterInputTypeOfUtilityChargeFieldFilterInput = {
  all?: InputMaybe<UtilityChargeFieldFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UtilityChargeFieldFilterInput>;
  some?: InputMaybe<UtilityChargeFieldFilterInput>;
};

export type ListFilterInputTypeOfValuationFilterInput = {
  all?: InputMaybe<ValuationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ValuationFilterInput>;
  some?: InputMaybe<ValuationFilterInput>;
};

export type ListFilterInputTypeOfWidgetConfigFilterInput = {
  all?: InputMaybe<WidgetConfigFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<WidgetConfigFilterInput>;
  some?: InputMaybe<WidgetConfigFilterInput>;
};

export type ListFilterInputTypeOfWidgetSectionFilterInput = {
  all?: InputMaybe<WidgetSectionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<WidgetSectionFilterInput>;
  some?: InputMaybe<WidgetSectionFilterInput>;
};

export type ListFilterInputTypeOfWidgetSectionRowFilterInput = {
  all?: InputMaybe<WidgetSectionRowFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<WidgetSectionRowFilterInput>;
  some?: InputMaybe<WidgetSectionRowFilterInput>;
};

export type ListFilterInputTypeOfWorkerFilterInput = {
  all?: InputMaybe<WorkerFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<WorkerFilterInput>;
  some?: InputMaybe<WorkerFilterInput>;
};

/** A connection to a list of items. */
export type ListFloorTemplatesPaginatedConnection = {
  __typename?: 'ListFloorTemplatesPaginatedConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListFloorTemplatesPaginatedEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<FloorTemplate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListFloorTemplatesPaginatedEdge = {
  __typename?: 'ListFloorTemplatesPaginatedEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: FloorTemplate;
};

/** A connection to a list of items. */
export type ListFunctionAreasConnection = {
  __typename?: 'ListFunctionAreasConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListFunctionAreasEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<FunctionArea>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListFunctionAreasEdge = {
  __typename?: 'ListFunctionAreasEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: FunctionArea;
};

/** A connection to a list of items. */
export type ListGroupConnection = {
  __typename?: 'ListGroupConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListGroupEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Group>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListGroupEdge = {
  __typename?: 'ListGroupEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Group;
};

/** A connection to a list of items. */
export type ListGroupedOperationsConnection = {
  __typename?: 'ListGroupedOperationsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListGroupedOperationsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<OperationGroupOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListGroupedOperationsEdge = {
  __typename?: 'ListGroupedOperationsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: OperationGroupOutput;
};

export type ListIntOperationFilterInput = {
  all?: InputMaybe<IntOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<IntOperationFilterInput>;
  some?: InputMaybe<IntOperationFilterInput>;
};

/** A connection to a list of items. */
export type ListInterestRatesConnection = {
  __typename?: 'ListInterestRatesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListInterestRatesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<InterestRate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListInterestRatesEdge = {
  __typename?: 'ListInterestRatesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: InterestRate;
};

/** A connection to a list of items. */
export type ListInterventionTypesConnection = {
  __typename?: 'ListInterventionTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListInterventionTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<InterventionType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListInterventionTypesEdge = {
  __typename?: 'ListInterventionTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: InterventionType;
};

export type ListListFilterInputTypeOfCatalogueTypeFieldFilterInput = {
  all?: InputMaybe<ListFilterInputTypeOfCatalogueTypeFieldFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ListFilterInputTypeOfCatalogueTypeFieldFilterInput>;
  some?: InputMaybe<ListFilterInputTypeOfCatalogueTypeFieldFilterInput>;
};

export type ListListFilterInputTypeOfUtilityChargeFieldFilterInput = {
  all?: InputMaybe<ListFilterInputTypeOfUtilityChargeFieldFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ListFilterInputTypeOfUtilityChargeFieldFilterInput>;
  some?: InputMaybe<ListFilterInputTypeOfUtilityChargeFieldFilterInput>;
};

/** A connection to a list of items. */
export type ListNotificationsConnection = {
  __typename?: 'ListNotificationsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListNotificationsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Notification>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListNotificationsEdge = {
  __typename?: 'ListNotificationsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Notification;
};

export type ListOrgUnitFilterTypeFilterInput = {
  all?: InputMaybe<OrgUnitFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<OrgUnitFilterInput>;
  some?: InputMaybe<OrgUnitFilterInput>;
};

/** A connection to a list of items. */
export type ListOrgUnitsConnection = {
  __typename?: 'ListOrgUnitsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListOrgUnitsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<OrgUnit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListOrgUnitsEdge = {
  __typename?: 'ListOrgUnitsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: OrgUnit;
};

/** A connection to a list of items. */
export type ListPenaltiesConnection = {
  __typename?: 'ListPenaltiesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListPenaltiesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Penalty>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListPenaltiesEdge = {
  __typename?: 'ListPenaltiesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Penalty;
};

/** A connection to a list of items. */
export type ListPriceListArticlesConnection = {
  __typename?: 'ListPriceListArticlesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListPriceListArticlesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PriceListArticle>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListPriceListArticlesEdge = {
  __typename?: 'ListPriceListArticlesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PriceListArticle;
};

/** A connection to a list of items. */
export type ListPriceListMeasurementUnitsConnection = {
  __typename?: 'ListPriceListMeasurementUnitsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListPriceListMeasurementUnitsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PriceListMeasurementUnit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListPriceListMeasurementUnitsEdge = {
  __typename?: 'ListPriceListMeasurementUnitsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PriceListMeasurementUnit;
};

/** A connection to a list of items. */
export type ListPriceListsConnection = {
  __typename?: 'ListPriceListsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListPriceListsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<PriceList>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListPriceListsEdge = {
  __typename?: 'ListPriceListsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PriceList;
};

/** A connection to a list of items. */
export type ListQualificationLevelsConnection = {
  __typename?: 'ListQualificationLevelsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListQualificationLevelsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<QualificationLevel>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListQualificationLevelsEdge = {
  __typename?: 'ListQualificationLevelsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: QualificationLevel;
};

/** A connection to a list of items. */
export type ListReadingsConnection = {
  __typename?: 'ListReadingsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListReadingsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Reading>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListReadingsEdge = {
  __typename?: 'ListReadingsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Reading;
};

/** A connection to a list of items. */
export type ListRegistrationOfficesConnection = {
  __typename?: 'ListRegistrationOfficesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListRegistrationOfficesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RegistrationOffice>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListRegistrationOfficesEdge = {
  __typename?: 'ListRegistrationOfficesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RegistrationOffice;
};

/** A connection to a list of items. */
export type ListRegistrationPaymentsConnection = {
  __typename?: 'ListRegistrationPaymentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListRegistrationPaymentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RegistrationPayment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListRegistrationPaymentsEdge = {
  __typename?: 'ListRegistrationPaymentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RegistrationPayment;
};

/** A connection to a list of items. */
export type ListRegistryCommunicationGroupsConnection = {
  __typename?: 'ListRegistryCommunicationGroupsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListRegistryCommunicationGroupsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RegistryCommunicationGroup>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListRegistryCommunicationGroupsEdge = {
  __typename?: 'ListRegistryCommunicationGroupsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RegistryCommunicationGroup;
};

/** A connection to a list of items. */
export type ListRegistryCommunicationsConnection = {
  __typename?: 'ListRegistryCommunicationsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListRegistryCommunicationsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RegistryCommunication>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListRegistryCommunicationsEdge = {
  __typename?: 'ListRegistryCommunicationsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RegistryCommunication;
};

/** A connection to a list of items. */
export type ListRevaluationDataConnection = {
  __typename?: 'ListRevaluationDataConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListRevaluationDataEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RevaluationData>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListRevaluationDataEdge = {
  __typename?: 'ListRevaluationDataEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RevaluationData;
};

/** A connection to a list of items. */
export type ListSlAsConnection = {
  __typename?: 'ListSLAsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListSlAsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Sla>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListSlAsEdge = {
  __typename?: 'ListSLAsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Sla;
};

/** A connection to a list of items. */
export type ListServiceActivityConnection = {
  __typename?: 'ListServiceActivityConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListServiceActivityEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ServiceActivity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListServiceActivityEdge = {
  __typename?: 'ListServiceActivityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ServiceActivity;
};

/** A connection to a list of items. */
export type ListServiceCategoriesConnection = {
  __typename?: 'ListServiceCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListServiceCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ServiceCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListServiceCategoriesEdge = {
  __typename?: 'ListServiceCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ServiceCategory;
};

/** A connection to a list of items. */
export type ListServiceSubCategoriesConnection = {
  __typename?: 'ListServiceSubCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListServiceSubCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ServiceSubCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListServiceSubCategoriesEdge = {
  __typename?: 'ListServiceSubCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ServiceSubCategory;
};

/** A connection to a list of items. */
export type ListServicesConnection = {
  __typename?: 'ListServicesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListServicesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Service>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListServicesEdge = {
  __typename?: 'ListServicesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Service;
};

export type ListStairFilterTypeFilterInput = {
  all?: InputMaybe<StairFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StairFilterInput>;
  some?: InputMaybe<StairFilterInput>;
};

/** A connection to a list of items. */
export type ListSubTableValueConnection = {
  __typename?: 'ListSubTableValueConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListSubTableValueEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TaxConfigSubTableRow>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListSubTableValueEdge = {
  __typename?: 'ListSubTableValueEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TaxConfigSubTableRow;
};

/** A connection to a list of items. */
export type ListSubjectCategoriesConnection = {
  __typename?: 'ListSubjectCategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListSubjectCategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<SubjectCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListSubjectCategoriesEdge = {
  __typename?: 'ListSubjectCategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: SubjectCategory;
};

export type ListSubjectRelationFilterTypeFilterInput = {
  all?: InputMaybe<SubjectRelationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<SubjectRelationFilterInput>;
  some?: InputMaybe<SubjectRelationFilterInput>;
};

/** A connection to a list of items. */
export type ListSubjectsConnection = {
  __typename?: 'ListSubjectsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListSubjectsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ISubject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListSubjectsEdge = {
  __typename?: 'ListSubjectsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ISubject;
};

/** A connection to a list of items. */
export type ListTableValuesConnection = {
  __typename?: 'ListTableValuesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTableValuesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TaxConfigMainTableRow>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTableValuesEdge = {
  __typename?: 'ListTableValuesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TaxConfigMainTableRow;
};

/** A connection to a list of items. */
export type ListTaxCreditsConnection = {
  __typename?: 'ListTaxCreditsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTaxCreditsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TaxCredit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTaxCreditsEdge = {
  __typename?: 'ListTaxCreditsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TaxCredit;
};

/** A connection to a list of items. */
export type ListTicketChecklistTemplatesConnection = {
  __typename?: 'ListTicketChecklistTemplatesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTicketChecklistTemplatesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TicketChecklistTemplate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTicketChecklistTemplatesEdge = {
  __typename?: 'ListTicketChecklistTemplatesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TicketChecklistTemplate;
};

/** A connection to a list of items. */
export type ListTicketChecklistsConnection = {
  __typename?: 'ListTicketChecklistsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTicketChecklistsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TicketChecklist>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTicketChecklistsEdge = {
  __typename?: 'ListTicketChecklistsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TicketChecklist;
};

/** A connection to a list of items. */
export type ListTicketChecklistsPerEstateUnitsConnection = {
  __typename?: 'ListTicketChecklistsPerEstateUnitsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTicketChecklistsPerEstateUnitsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TicketChecklistsPerEstateUnit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTicketChecklistsPerEstateUnitsEdge = {
  __typename?: 'ListTicketChecklistsPerEstateUnitsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TicketChecklistsPerEstateUnit;
};

/** A connection to a list of items. */
export type ListTicketTypesConnection = {
  __typename?: 'ListTicketTypesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTicketTypesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TicketType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTicketTypesEdge = {
  __typename?: 'ListTicketTypesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TicketType;
};

/** A connection to a list of items. */
export type ListTicketsConnection = {
  __typename?: 'ListTicketsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTicketsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Ticket>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTicketsEdge = {
  __typename?: 'ListTicketsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Ticket;
};

/** A connection to a list of items. */
export type ListTicketsPerEstateUnitsConnection = {
  __typename?: 'ListTicketsPerEstateUnitsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTicketsPerEstateUnitsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TicketsPerEstateUnit>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTicketsPerEstateUnitsEdge = {
  __typename?: 'ListTicketsPerEstateUnitsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TicketsPerEstateUnit;
};

/** A connection to a list of items. */
export type ListTicketsPerEstateUnitsPerYearsConnection = {
  __typename?: 'ListTicketsPerEstateUnitsPerYearsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListTicketsPerEstateUnitsPerYearsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TicketsPerEstateUnitsPerYear>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListTicketsPerEstateUnitsPerYearsEdge = {
  __typename?: 'ListTicketsPerEstateUnitsPerYearsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TicketsPerEstateUnitsPerYear;
};

/** A connection to a list of items. */
export type ListUsersConnection = {
  __typename?: 'ListUsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListUsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListUsersEdge = {
  __typename?: 'ListUsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: User;
};

/** A connection to a list of items. */
export type ListUtilityServicesConnection = {
  __typename?: 'ListUtilityServicesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListUtilityServicesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<UtilityService>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListUtilityServicesEdge = {
  __typename?: 'ListUtilityServicesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: UtilityService;
};

/** A connection to a list of items. */
export type ListUtilityTypeConnection = {
  __typename?: 'ListUtilityTypeConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListUtilityTypeEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<UtilityType>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListUtilityTypeEdge = {
  __typename?: 'ListUtilityTypeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: UtilityType;
};

export type ListUuidOperationFilterInput = {
  all?: InputMaybe<UuidOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UuidOperationFilterInput>;
  some?: InputMaybe<UuidOperationFilterInput>;
};

/** A connection to a list of items. */
export type ListVatRatesConnection = {
  __typename?: 'ListVATRatesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListVatRatesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<VatRate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListVatRatesEdge = {
  __typename?: 'ListVATRatesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: VatRate;
};

/** A connection to a list of items. */
export type ListWorkTeamsConnection = {
  __typename?: 'ListWorkTeamsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListWorkTeamsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<WorkTeam>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ListWorkTeamsEdge = {
  __typename?: 'ListWorkTeamsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: WorkTeam;
};

export type LocatedUnit = {
  __typename?: 'LocatedUnit';
  estateSubUnit?: Maybe<EstateSubUnit>;
  estateSubUnitId?: Maybe<Scalars['Int']['output']>;
  estateUnit: EstateUnit;
  estateUnitId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isMainUnit: Scalars['Boolean']['output'];
  isPartialLocation: Scalars['Boolean']['output'];
  isRegistryUpdateEnabled: Scalars['Boolean']['output'];
  surfaceSqM?: Maybe<Scalars['Int']['output']>;
};

export type LocatedUnitFilterInput = {
  and?: InputMaybe<Array<LocatedUnitFilterInput>>;
  estateSubUnitId?: InputMaybe<IntOperationFilterInput>;
  estateUnitId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isMainUnit?: InputMaybe<BooleanOperationFilterInput>;
  isPartialLocation?: InputMaybe<BooleanOperationFilterInput>;
  isRegistryUpdateEnabled?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<LocatedUnitFilterInput>>;
  surfaceSqM?: InputMaybe<IntOperationFilterInput>;
};

export type LocatedUnitInput = {
  estateSubUnitId?: InputMaybe<Scalars['Int']['input']>;
  estateUnitId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isMainUnit: Scalars['Boolean']['input'];
  isPartialLocation: Scalars['Boolean']['input'];
  isRegistryUpdateEnabled: Scalars['Boolean']['input'];
  surfaceSqM?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  jwt: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  user: UserModel;
};

export type ManagementOrgUnitInput = {
  closureDate?: InputMaybe<Scalars['DateTime']['input']>;
  contacts?: InputMaybe<Array<ContactInput>>;
  entryStatus?: InputMaybe<EntryStatus>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orgUnitId?: InputMaybe<Scalars['Int']['input']>;
  parentOrgUnitId?: InputMaybe<Scalars['Int']['input']>;
  parentSubjectId: Scalars['Int']['input'];
};

export type ManagementSubject = ISubject & {
  __typename?: 'ManagementSubject';
  additionalGovIdCode?: Maybe<Scalars['String']['output']>;
  additionalTaxIdCode?: Maybe<Scalars['String']['output']>;
  addresses: Array<Address>;
  bankAccounts: Array<BankAccount>;
  bankingId1?: Maybe<Scalars['String']['output']>;
  bankingId2?: Maybe<Scalars['String']['output']>;
  baseCountryISO?: Maybe<Scalars['String']['output']>;
  baseCountryTaxIdCode?: Maybe<Scalars['String']['output']>;
  businessStart?: Maybe<Scalars['Date']['output']>;
  canUseDocumentName: Scalars['Boolean']['output'];
  categories: Array<SubjectCategory>;
  closureDate?: Maybe<Scalars['DateTime']['output']>;
  companiesHouseIdCode?: Maybe<Scalars['String']['output']>;
  companyGroupParent?: Maybe<SubjectRelation>;
  contact?: Maybe<Contact>;
  contacts: Array<Contact>;
  creationDate: Scalars['DateTime']['output'];
  customPersonType?: Maybe<Scalars['Int']['output']>;
  customSubjectStatus?: Maybe<Scalars['Int']['output']>;
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  documents: Array<Document>;
  entryStatus: EntryStatus;
  externalSourceCode?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  heirs: Array<SubjectRelation>;
  id: Scalars['Int']['output'];
  interGroupSignature?: Maybe<Scalars['String']['output']>;
  internalCode: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  managementCode?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  officers: Array<SubjectRelation>;
  orgUnits: Array<OrgUnit>;
  owningMgmtSubjects: Array<SubjectRelation>;
  personType: PersonType;
  relationMains: Array<SubjectRelation>;
  relationSubordinates: Array<SubjectRelation>;
  shareCapital?: Maybe<Scalars['Decimal']['output']>;
  shorthandDescription?: Maybe<Scalars['String']['output']>;
  subOrganizations: Array<SubjectRelation>;
  taxStatuses: Array<TaxStatus>;
};

export type ManagementSubjectCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type ManagementSubjectContactArgs = {
  infoType: ContactInfoType;
};

export type ManagementSubjectDocumentsArgs = {
  order?: InputMaybe<Array<DocumentSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type ManagementSubjectInput = {
  additionalGovIdCode?: InputMaybe<Scalars['String']['input']>;
  additionalTaxIdCode?: InputMaybe<Scalars['String']['input']>;
  addresses: Array<AddressInput>;
  bankAccounts: Array<BankAccountInput>;
  bankingId1?: InputMaybe<Scalars['String']['input']>;
  bankingId2?: InputMaybe<Scalars['String']['input']>;
  baseCountryTaxIdCode?: InputMaybe<Scalars['String']['input']>;
  businessStart?: InputMaybe<Scalars['Date']['input']>;
  categoriesIds: Array<Scalars['Int']['input']>;
  closureDate?: InputMaybe<Scalars['Date']['input']>;
  companiesHouseIdCode?: InputMaybe<Scalars['String']['input']>;
  companyGroup?: InputMaybe<CompanyGroupInput>;
  contacts: Array<ContactInput>;
  customPersonType?: InputMaybe<Scalars['Int']['input']>;
  customSubjectStatus?: InputMaybe<Scalars['Int']['input']>;
  entryStatus: EntryStatus;
  externalSourceCode?: InputMaybe<Scalars['String']['input']>;
  fullName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  interGroupSignature?: InputMaybe<Scalars['String']['input']>;
  internalCode: Scalars['String']['input'];
  managementCode?: InputMaybe<Scalars['String']['input']>;
  officers: Array<OfficerInput>;
  shareCapital?: InputMaybe<Scalars['Decimal']['input']>;
  shorthandDescription?: InputMaybe<Scalars['String']['input']>;
  taxStatuses: Array<TaxStatusInput>;
};

export type MandatoryByLawChecklistTicketsStatusStatistics = {
  __typename?: 'MandatoryByLawChecklistTicketsStatusStatistics';
  donePercentage: Scalars['Float']['output'];
  expiredPercentage: Scalars['Float']['output'];
  scheduledPercentage: Scalars['Float']['output'];
};

export type MasterStatusUpdatedQuoteHistoryEntry = QuoteHistoryEntry & {
  __typename?: 'MasterStatusUpdatedQuoteHistoryEntry';
  id: Scalars['Int']['output'];
  newMasterStatus: QuoteMasterStatus;
  oldMasterStatus?: Maybe<QuoteMasterStatus>;
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type MasterStatusUpdatedTicketHistoryEntry = TicketHistoryEntry & {
  __typename?: 'MasterStatusUpdatedTicketHistoryEntry';
  id: Scalars['Int']['output'];
  newMasterStatus: TicketMasterStatus;
  oldMasterStatus?: Maybe<TicketMasterStatus>;
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export enum MeteringType {
  IncrementalReading = 'INCREMENTAL_READING',
  Usage = 'USAGE',
}

export type MeteringTypeOperationFilterInput = {
  eq?: InputMaybe<MeteringType>;
  in?: InputMaybe<Array<MeteringType>>;
  neq?: InputMaybe<MeteringType>;
  nin?: InputMaybe<Array<MeteringType>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  accountingItem: AccountingItemMutations;
  activeContract: ActiveContractMutations;
  admin: AdminMutations;
  administration: AdministrationMutations;
  administrationTerm: AdministrationTermMutations;
  assetTax: AssetTaxMutations;
  bill: BillMutations;
  billItemType: BillItemTypeMutations;
  cadastralLandCategory: CadastralLandCategoryMutations;
  cadastralUnit: CadastralUnitMutations;
  calendar: CalendarMutations;
  catalogue: CatalogueMutations;
  catalogueCategory: CatalogueCategoryMutations;
  catalogueItem: CatalogueItemMutations;
  catalogueType: CatalogueTypeMutations;
  city: CityMutations;
  confirmedRegistryCommunication: ConfirmedRegistryCommunicationMutations;
  contract: ContractMutations;
  contractTemplate: ContractTemplateMutations;
  contractType: ContractTypeMutations;
  costCharge: CostChargeMutations;
  craft: CraftMutations;
  estate: EstateMutations;
  estateMainUsageType: EstateMainUsageTypeMutations;
  estateSubUnit: EstateSubUnitMutations;
  estateUnit: EstateUnitMutations;
  estateUnitGroup: EstateUnitGroupMutations;
  estateUsageType: EstateUsageTypeMutations;
  fcltContract: FcltContractMutations;
  fcltContractType: FcltContractTypeMutations;
  floorTemplate: FloorTemplateMutations;
  functionArea: FunctionAreaMutations;
  interestRate: InterestRateMutations;
  interventionType: InterventionTypeMutations;
  login: UserLoginMutations;
  notification: NotificationMutations;
  orgUnit: OrgUnitMutations;
  passiveContract: PassiveContractMutations;
  penalty: PenaltyMutations;
  priceList: PriceListMutations;
  priceListArticle: PriceListArticleMutations;
  priceListMeasurementUnit: PriceListMeasurementUnitMutations;
  qualificationLevel: QualificationLevelMutations;
  reading: ReadingMutations;
  registrationOffice: RegistrationOfficeMutations;
  registrationPayment: RegistrationPaymentMutations;
  registryCommunication: RegistryCommunicationMutations;
  reportGenerator: ReportGeneratorMutations;
  service: ServiceMutations;
  serviceCategory: ServiceCategoryMutations;
  sla: SlaMutations;
  subject: SubjectMutations;
  taxConfiguration: TaxConfigMutations;
  taxCredit: TaxCreditMutations;
  temporaryRegistryCommunication: TemporaryRegistryCommunicationMutations;
  ticket: TicketMutations;
  ticketChecklist: TicketChecklistMutations;
  ticketChecklistTemplate: TicketChecklistTemplateMutations;
  ticketType: TicketTypeMutations;
  user: UserMutations;
  utilityService: UtilityServiceMutations;
  utilityType: UtilityTypeMutations;
  vatRate: VatRateMutations;
  workTeam: WorkTeamMutations;
};

export type NewReminderTicketHistoryEntry = TicketHistoryEntry & {
  __typename?: 'NewReminderTicketHistoryEntry';
  id: Scalars['Int']['output'];
  reminderDate: Scalars['Date']['output'];
  reminderSummary: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type NewReplyTicketHistoryEntry = TicketHistoryEntry & {
  __typename?: 'NewReplyTicketHistoryEntry';
  id: Scalars['Int']['output'];
  reply: Reply;
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type Notification = {
  id: Scalars['Int']['output'];
  status: NotificationStatus;
  timestamp: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type NotificationFilterInput = {
  and?: InputMaybe<Array<NotificationFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<NotificationFilterInput>>;
  status?: InputMaybe<NotificationStatusOperationFilterInput>;
  timestamp?: InputMaybe<DateTimeOperationFilterInput>;
  username?: InputMaybe<CustomStringFilterInput>;
};

export type NotificationMutations = {
  __typename?: 'NotificationMutations';
  delete: Result;
  deleteRange: Result;
  markAsRead: Result;
  markNewAsUnread: Result;
};

export type NotificationMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type NotificationMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type NotificationMutationsMarkAsReadArgs = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NotificationMutationsMarkNewAsUnreadArgs = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NotificationQueries = {
  __typename?: 'NotificationQueries';
  lastNotifications: Array<Notification>;
  listNotifications?: Maybe<ListNotificationsConnection>;
  listNotificationsFull: Array<Notification>;
};

export type NotificationQueriesListNotificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<NotificationSortInput>>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type NotificationQueriesListNotificationsFullArgs = {
  order?: InputMaybe<Array<NotificationSortInput>>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type NotificationSortInput = {
  id?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  timestamp?: InputMaybe<SortEnumType>;
  username?: InputMaybe<SortEnumType>;
};

export enum NotificationStatus {
  New = 'NEW',
  Read = 'READ',
  Unread = 'UNREAD',
}

export type NotificationStatusOperationFilterInput = {
  eq?: InputMaybe<NotificationStatus>;
  in?: InputMaybe<Array<NotificationStatus>>;
  neq?: InputMaybe<NotificationStatus>;
  nin?: InputMaybe<Array<NotificationStatus>>;
};

export type NullableOfAutomaticBooleanOperationFilterInput = {
  eq?: InputMaybe<AutomaticBoolean>;
  in?: InputMaybe<Array<InputMaybe<AutomaticBoolean>>>;
  neq?: InputMaybe<AutomaticBoolean>;
  nin?: InputMaybe<Array<InputMaybe<AutomaticBoolean>>>;
};

export type NullableOfBillingPeriodOperationFilterInput = {
  eq?: InputMaybe<BillingPeriod>;
  in?: InputMaybe<Array<InputMaybe<BillingPeriod>>>;
  neq?: InputMaybe<BillingPeriod>;
  nin?: InputMaybe<Array<InputMaybe<BillingPeriod>>>;
};

export type NullableOfBirthSexOperationFilterInput = {
  eq?: InputMaybe<BirthSex>;
  in?: InputMaybe<Array<InputMaybe<BirthSex>>>;
  neq?: InputMaybe<BirthSex>;
  nin?: InputMaybe<Array<InputMaybe<BirthSex>>>;
};

export type NullableOfCadastralUnitStatusOperationFilterInput = {
  eq?: InputMaybe<CadastralUnitStatus>;
  in?: InputMaybe<Array<InputMaybe<CadastralUnitStatus>>>;
  neq?: InputMaybe<CadastralUnitStatus>;
  nin?: InputMaybe<Array<InputMaybe<CadastralUnitStatus>>>;
};

export type NullableOfCalculationIssueOperationFilterInput = {
  eq?: InputMaybe<CalculationIssue>;
  in?: InputMaybe<Array<InputMaybe<CalculationIssue>>>;
  neq?: InputMaybe<CalculationIssue>;
  nin?: InputMaybe<Array<InputMaybe<CalculationIssue>>>;
};

export type NullableOfCompanyGroupOperationFilterInput = {
  eq?: InputMaybe<CompanyGroup>;
  in?: InputMaybe<Array<InputMaybe<CompanyGroup>>>;
  neq?: InputMaybe<CompanyGroup>;
  nin?: InputMaybe<Array<InputMaybe<CompanyGroup>>>;
};

export type NullableOfContractTerminatorOperationFilterInput = {
  eq?: InputMaybe<ContractTerminator>;
  in?: InputMaybe<Array<InputMaybe<ContractTerminator>>>;
  neq?: InputMaybe<ContractTerminator>;
  nin?: InputMaybe<Array<InputMaybe<ContractTerminator>>>;
};

export type NullableOfEstateUnitTypeOperationFilterInput = {
  eq?: InputMaybe<EstateUnitType>;
  in?: InputMaybe<Array<InputMaybe<EstateUnitType>>>;
  neq?: InputMaybe<EstateUnitType>;
  nin?: InputMaybe<Array<InputMaybe<EstateUnitType>>>;
};

export type NullableOfIncomeMetricOperationFilterInput = {
  eq?: InputMaybe<IncomeMetric>;
  in?: InputMaybe<Array<InputMaybe<IncomeMetric>>>;
  neq?: InputMaybe<IncomeMetric>;
  nin?: InputMaybe<Array<InputMaybe<IncomeMetric>>>;
};

export type NullableOfIncomeTypeOperationFilterInput = {
  eq?: InputMaybe<IncomeType>;
  in?: InputMaybe<Array<InputMaybe<IncomeType>>>;
  neq?: InputMaybe<IncomeType>;
  nin?: InputMaybe<Array<InputMaybe<IncomeType>>>;
};

export type NullableOfOccupantTypeOperationFilterInput = {
  eq?: InputMaybe<OccupantType>;
  in?: InputMaybe<Array<InputMaybe<OccupantType>>>;
  neq?: InputMaybe<OccupantType>;
  nin?: InputMaybe<Array<InputMaybe<OccupantType>>>;
};

export type NullableOfOfficerTypeOperationFilterInput = {
  eq?: InputMaybe<OfficerType>;
  in?: InputMaybe<Array<InputMaybe<OfficerType>>>;
  neq?: InputMaybe<OfficerType>;
  nin?: InputMaybe<Array<InputMaybe<OfficerType>>>;
};

export type NullableOfPlannedPeriodOperationFilterInput = {
  eq?: InputMaybe<PlannedPeriod>;
  in?: InputMaybe<Array<InputMaybe<PlannedPeriod>>>;
  neq?: InputMaybe<PlannedPeriod>;
  nin?: InputMaybe<Array<InputMaybe<PlannedPeriod>>>;
};

export type NullableOfRegistrationTaxExemptionOperationFilterInput = {
  eq?: InputMaybe<RegistrationTaxExemption>;
  in?: InputMaybe<Array<InputMaybe<RegistrationTaxExemption>>>;
  neq?: InputMaybe<RegistrationTaxExemption>;
  nin?: InputMaybe<Array<InputMaybe<RegistrationTaxExemption>>>;
};

export type NullableOfRegistrationTaxIncomeTypeOperationFilterInput = {
  eq?: InputMaybe<RegistrationTaxIncomeType>;
  in?: InputMaybe<Array<InputMaybe<RegistrationTaxIncomeType>>>;
  neq?: InputMaybe<RegistrationTaxIncomeType>;
  nin?: InputMaybe<Array<InputMaybe<RegistrationTaxIncomeType>>>;
};

export type NullableOfRegistrationTaxIncomeTypeRliOperationFilterInput = {
  eq?: InputMaybe<RegistrationTaxIncomeTypeRli>;
  in?: InputMaybe<Array<InputMaybe<RegistrationTaxIncomeTypeRli>>>;
  neq?: InputMaybe<RegistrationTaxIncomeTypeRli>;
  nin?: InputMaybe<Array<InputMaybe<RegistrationTaxIncomeTypeRli>>>;
};

export type NullableOfRegistrationTaxSpecialCaseOperationFilterInput = {
  eq?: InputMaybe<RegistrationTaxSpecialCase>;
  in?: InputMaybe<Array<InputMaybe<RegistrationTaxSpecialCase>>>;
  neq?: InputMaybe<RegistrationTaxSpecialCase>;
  nin?: InputMaybe<Array<InputMaybe<RegistrationTaxSpecialCase>>>;
};

export type NullableOfReleaseReasonOperationFilterInput = {
  eq?: InputMaybe<ReleaseReason>;
  in?: InputMaybe<Array<InputMaybe<ReleaseReason>>>;
  neq?: InputMaybe<ReleaseReason>;
  nin?: InputMaybe<Array<InputMaybe<ReleaseReason>>>;
};

export type NullableOfRepossessionReasonOperationFilterInput = {
  eq?: InputMaybe<RepossessionReason>;
  in?: InputMaybe<Array<InputMaybe<RepossessionReason>>>;
  neq?: InputMaybe<RepossessionReason>;
  nin?: InputMaybe<Array<InputMaybe<RepossessionReason>>>;
};

export type NullableOfRepossessionTypeOperationFilterInput = {
  eq?: InputMaybe<RepossessionType>;
  in?: InputMaybe<Array<InputMaybe<RepossessionType>>>;
  neq?: InputMaybe<RepossessionType>;
  nin?: InputMaybe<Array<InputMaybe<RepossessionType>>>;
};

export type NullableOfTakeoverTypeOperationFilterInput = {
  eq?: InputMaybe<TakeoverType>;
  in?: InputMaybe<Array<InputMaybe<TakeoverType>>>;
  neq?: InputMaybe<TakeoverType>;
  nin?: InputMaybe<Array<InputMaybe<TakeoverType>>>;
};

export type NullableOfTicketMasterStatusOperationFilterInput = {
  eq?: InputMaybe<TicketMasterStatus>;
  in?: InputMaybe<Array<InputMaybe<TicketMasterStatus>>>;
  neq?: InputMaybe<TicketMasterStatus>;
  nin?: InputMaybe<Array<InputMaybe<TicketMasterStatus>>>;
};

export type NullableOfUnitConditionOperationFilterInput = {
  eq?: InputMaybe<UnitCondition>;
  in?: InputMaybe<Array<InputMaybe<UnitCondition>>>;
  neq?: InputMaybe<UnitCondition>;
  nin?: InputMaybe<Array<InputMaybe<UnitCondition>>>;
};

export type NullableOfVatRateTypeOperationFilterInput = {
  eq?: InputMaybe<VatRateType>;
  in?: InputMaybe<Array<InputMaybe<VatRateType>>>;
  neq?: InputMaybe<VatRateType>;
  nin?: InputMaybe<Array<InputMaybe<VatRateType>>>;
};

export enum OccupantType {
  CommonArea = 'COMMON_AREA',
  CompanyGroupMember = 'COMPANY_GROUP_MEMBER',
  ThirdParties = 'THIRD_PARTIES',
}

export enum OfficeAccess {
  BackOffice = 'BACK_OFFICE',
  Both = 'BOTH',
  FrontOffice = 'FRONT_OFFICE',
}

export type OfficeAccessOperationFilterInput = {
  eq?: InputMaybe<OfficeAccess>;
  in?: InputMaybe<Array<OfficeAccess>>;
  neq?: InputMaybe<OfficeAccess>;
  nin?: InputMaybe<Array<OfficeAccess>>;
};

export type OfficerInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  officerId: Scalars['Int']['input'];
  officerType: OfficerType;
  since?: InputMaybe<Scalars['Date']['input']>;
  until?: InputMaybe<Scalars['Date']['input']>;
};

export enum OfficerType {
  Attorney = 'ATTORNEY',
  Curator = 'CURATOR',
  ExecutorAdministrator = 'EXECUTOR_ADMINISTRATOR',
  Guardian = 'GUARDIAN',
  LegalRepresentative = 'LEGAL_REPRESENTATIVE',
  SpecialLegalRepresentative = 'SPECIAL_LEGAL_REPRESENTATIVE',
  Trustee = 'TRUSTEE',
}

export type OfficialAct = {
  __typename?: 'OfficialAct';
  actRegistrationDates: Array<ActRegistrationDate>;
  actRegistrationFields: Array<ActRegistrationField>;
  creationDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  estateUnitId?: Maybe<Scalars['Int']['output']>;
  externalCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  issueDate?: Maybe<Scalars['Date']['output']>;
  issuerCode?: Maybe<Scalars['String']['output']>;
  issuerExternalCode?: Maybe<Scalars['String']['output']>;
  issuerName?: Maybe<Scalars['String']['output']>;
  protocolNumber: Scalars['String']['output'];
  registrationDate?: Maybe<Scalars['Date']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
};

export type OneOfTicketConditionInput = {
  catalogueCategoryEquality?: InputMaybe<TicketCatalogueCategoryEqualityConditionInput>;
  catalogueSubCategoryEquality?: InputMaybe<TicketCatalogueSubCategoryEqualityConditionInput>;
  catalogueTypeEquality?: InputMaybe<TicketCatalogueTypeEqualityConditionInput>;
  complex?: InputMaybe<ComplexTicketConditionInput>;
  masterStatus?: InputMaybe<TicketMasterStatusConditionInput>;
  priorityEquality?: InputMaybe<TicketPriorityEqualityConditionInput>;
  ticketTypeEquality?: InputMaybe<TicketTypeEqualityConditionInput>;
};

export type OneshotAddition = {
  __typename?: 'OneshotAddition';
  accountingItem: AccountingItem;
  accountingItemId: Scalars['Int']['output'];
  amount: Scalars['Decimal']['output'];
  billItemType: BillItemType;
  id: Scalars['Int']['output'];
  installments?: Maybe<Scalars['Int']['output']>;
  isBoundToTermDay: Scalars['Boolean']['output'];
  isRentalRateVariation: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  registrationPayment?: Maybe<RegistrationPayment>;
  startDate: Scalars['Date']['output'];
  termEndDate?: Maybe<Scalars['Date']['output']>;
  termStartDate?: Maybe<Scalars['Date']['output']>;
  vatRate: VatRate;
  vatRateId: Scalars['Int']['output'];
};

export type OneshotAdditionFilterInput = {
  accountingItemId?: InputMaybe<IntOperationFilterInput>;
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<OneshotAdditionFilterInput>>;
  billItemType?: InputMaybe<BillItemTypeFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  installments?: InputMaybe<IntOperationFilterInput>;
  isBoundToTermDay?: InputMaybe<BooleanOperationFilterInput>;
  isRentalRateVariation?: InputMaybe<BooleanOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<OneshotAdditionFilterInput>>;
  registrationPayment?: InputMaybe<RegistrationPaymentFilterInput>;
  startDate?: InputMaybe<DateOperationFilterInput>;
  termEndDate?: InputMaybe<DateOperationFilterInput>;
  termStartDate?: InputMaybe<DateOperationFilterInput>;
  vatRateId?: InputMaybe<IntOperationFilterInput>;
};

export type OneshotAdditionInput = {
  accountingItemId: Scalars['Int']['input'];
  amount: Scalars['Decimal']['input'];
  billItemTypeId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  installments?: InputMaybe<Scalars['Int']['input']>;
  isBoundToTermDay: Scalars['Boolean']['input'];
  isRentalRateVariation: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['Date']['input'];
  termEndDate?: InputMaybe<Scalars['Date']['input']>;
  termStartDate?: InputMaybe<Scalars['Date']['input']>;
  vatRateId: Scalars['Int']['input'];
};

export type Operation = {
  __typename?: 'Operation';
  amount: Scalars['Decimal']['output'];
  assetTaxPaymentId?: Maybe<Scalars['Int']['output']>;
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  since?: Maybe<Scalars['Date']['output']>;
  until?: Maybe<Scalars['Date']['output']>;
};

export type OperationFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<OperationFilterInput>>;
  assetTaxPaymentId?: InputMaybe<IntOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<OperationFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type OperationGroupOutput = {
  __typename?: 'OperationGroupOutput';
  amount: Scalars['Decimal']['output'];
  date: Scalars['Date']['output'];
  ids: Array<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
};

export type OperationGroupOutputFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<OperationGroupOutputFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  ids?: InputMaybe<ListIntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<OperationGroupOutputFilterInput>>;
};

export type OperationGroupOutputSortInput = {
  amount?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
};

export type OperationInput = {
  amount: Scalars['Decimal']['input'];
  date: Scalars['Date']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type OrgUnit = {
  __typename?: 'OrgUnit';
  children: Array<OrgUnit>;
  cities: Array<City>;
  closureDate?: Maybe<Scalars['DateTime']['output']>;
  contacts: Array<Contact>;
  creationDate: Scalars['DateTime']['output'];
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  entryStatus: EntryStatus;
  externalCode?: Maybe<Scalars['String']['output']>;
  geographicalCities?: Maybe<Array<Scalars['Int']['output']>>;
  id: Scalars['Int']['output'];
  influenceArea?: Maybe<GeoJsonPolygonType>;
  internalCode: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  orgUnitType: OrgUnitType;
  parentOrgUnit?: Maybe<OrgUnit>;
  parentOrgUnitId?: Maybe<Scalars['Int']['output']>;
  parentSubject: ISubject;
  parentSubjectId: Scalars['Int']['output'];
};

export type OrgUnitFilterInput = {
  and?: InputMaybe<Array<OrgUnitFilterInput>>;
  closureDate?: InputMaybe<DateTimeOperationFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  entryStatus?: InputMaybe<EntryStatusOperationFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  geographicalCities?: InputMaybe<ListIntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<OrgUnitFilterInput>>;
  orgUnitType?: InputMaybe<OrgUnitTypeOperationFilterInput>;
  parentOrgUnit?: InputMaybe<OrgUnitFilterInput>;
  parentOrgUnitId?: InputMaybe<IntOperationFilterInput>;
  parentSubject?: InputMaybe<SubjectFilterInput>;
  parentSubjectId?: InputMaybe<IntOperationFilterInput>;
};

export type OrgUnitMutations = {
  __typename?: 'OrgUnitMutations';
  addGeographicalOrgUnit: ResultOfOrgUnit;
  addManagementOrgUnit: ResultOfOrgUnit;
  delete: Result;
  updateGeographicalOrgUnit: ResultOfOrgUnit;
  updateManagementOrgUnit: ResultOfOrgUnit;
};

export type OrgUnitMutationsAddGeographicalOrgUnitArgs = {
  orgUnitInput: GeographicalOrgUnitInput;
};

export type OrgUnitMutationsAddManagementOrgUnitArgs = {
  orgUnitInput: ManagementOrgUnitInput;
};

export type OrgUnitMutationsDeleteArgs = {
  orgUnitId: Scalars['Int']['input'];
};

export type OrgUnitMutationsUpdateGeographicalOrgUnitArgs = {
  orgUnitInput: GeographicalOrgUnitInput;
};

export type OrgUnitMutationsUpdateManagementOrgUnitArgs = {
  orgUnitInput: ManagementOrgUnitInput;
};

export type OrgUnitQueries = {
  __typename?: 'OrgUnitQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  listOrgUnits?: Maybe<ListOrgUnitsConnection>;
  listOrgUnitsByManagementSubject: Array<OrgUnit>;
  listOrgUnitsFull: Array<OrgUnit>;
  listOrgUnitsTree: Array<OrgUnitTreeNode>;
  orgUnit?: Maybe<OrgUnit>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type OrgUnitQueriesCanUseInternalCodeArgs = {
  currentOrgUnitId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type OrgUnitQueriesListOrgUnitsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<OrgUnitSortInput>>;
  where?: InputMaybe<OrgUnitFilterInput>;
};

export type OrgUnitQueriesListOrgUnitsByManagementSubjectArgs = {
  excludeChildrenOfId?: InputMaybe<Scalars['Int']['input']>;
  managementSubjectIds: Array<Scalars['Int']['input']>;
  order?: InputMaybe<Array<OrgUnitSortInput>>;
  where?: InputMaybe<OrgUnitFilterInput>;
};

export type OrgUnitQueriesListOrgUnitsFullArgs = {
  order?: InputMaybe<Array<OrgUnitSortInput>>;
  where?: InputMaybe<OrgUnitFilterInput>;
};

export type OrgUnitQueriesListOrgUnitsTreeArgs = {
  orgUnitType: OrgUnitType;
};

export type OrgUnitQueriesOrgUnitArgs = {
  orgUnitId: Scalars['Int']['input'];
};

export type OrgUnitSortInput = {
  closureDate?: InputMaybe<SortEnumType>;
  creationDate?: InputMaybe<SortEnumType>;
  deletionDate?: InputMaybe<SortEnumType>;
  entryStatus?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  parentOrgUnit?: InputMaybe<OrgUnitSortInput>;
  parentOrgUnitId?: InputMaybe<SortEnumType>;
  parentSubject?: InputMaybe<SubjectSortInput>;
  parentSubjectId?: InputMaybe<SortEnumType>;
};

export type OrgUnitTreeNode = {
  __typename?: 'OrgUnitTreeNode';
  children?: Maybe<Array<OrgUnitTreeNode>>;
  id: Scalars['Int']['output'];
  isSubject: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum OrgUnitType {
  CostCentre = 'COST_CENTRE',
  GeographicalHierarchy = 'GEOGRAPHICAL_HIERARCHY',
  ManagementHierarchy = 'MANAGEMENT_HIERARCHY',
}

export type OrgUnitTypeOperationFilterInput = {
  eq?: InputMaybe<OrgUnitType>;
  in?: InputMaybe<Array<OrgUnitType>>;
  neq?: InputMaybe<OrgUnitType>;
  nin?: InputMaybe<Array<OrgUnitType>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PagedInfo = {
  __typename?: 'PagedInfo';
  pageNumber: Scalars['Long']['output'];
  pageSize: Scalars['Long']['output'];
  setPageNumber?: Maybe<PagedInfo>;
  setPageSize?: Maybe<PagedInfo>;
  setTotalPages?: Maybe<PagedInfo>;
  setTotalRecords?: Maybe<PagedInfo>;
  totalPages: Scalars['Long']['output'];
  totalRecords: Scalars['Long']['output'];
};

export type PagedInfoSetPageNumberArgs = {
  pageNumber: Scalars['Long']['input'];
};

export type PagedInfoSetPageSizeArgs = {
  pageSize: Scalars['Long']['input'];
};

export type PagedInfoSetTotalPagesArgs = {
  totalPages: Scalars['Long']['input'];
};

export type PagedInfoSetTotalRecordsArgs = {
  totalRecords: Scalars['Long']['input'];
};

export type PagedInfoInput = {
  pageNumber: Scalars['Long']['input'];
  pageSize: Scalars['Long']['input'];
  totalPages: Scalars['Long']['input'];
  totalRecords: Scalars['Long']['input'];
};

export type PagedResultOfAccountingItem = {
  __typename?: 'PagedResultOfAccountingItem';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAccountingItem>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<AccountingItem>;
};

export type PagedResultOfAccountingItemToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfAdministration = {
  __typename?: 'PagedResultOfAdministration';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAdministration>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Administration>;
};

export type PagedResultOfAdministrationToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfAdministrationTerm = {
  __typename?: 'PagedResultOfAdministrationTerm';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAdministrationTerm>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<AdministrationTerm>;
};

export type PagedResultOfAdministrationTermToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfAdministration__ = {
  __typename?: 'PagedResultOfAdministration__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAdministration__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Administration>>>;
};

export type PagedResultOfAdministration__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfBill = {
  __typename?: 'PagedResultOfBill';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfBill>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Bill>;
};

export type PagedResultOfBillToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfBillItemType = {
  __typename?: 'PagedResultOfBillItemType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfBillItemType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<BillItemType>;
};

export type PagedResultOfBillItemTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfBillingPause = {
  __typename?: 'PagedResultOfBillingPause';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfBillingPause>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<BillingPause>;
};

export type PagedResultOfBillingPauseToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCadastralLandCategory = {
  __typename?: 'PagedResultOfCadastralLandCategory';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCadastralLandCategory>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CadastralLandCategory>;
};

export type PagedResultOfCadastralLandCategoryToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCadastralUnit = {
  __typename?: 'PagedResultOfCadastralUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCadastralUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CadastralUnit>;
};

export type PagedResultOfCadastralUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCalendar = {
  __typename?: 'PagedResultOfCalendar';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCalendar>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Calendar>;
};

export type PagedResultOfCalendarToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCatalogueCategory = {
  __typename?: 'PagedResultOfCatalogueCategory';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueCategory>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CatalogueCategory>;
};

export type PagedResultOfCatalogueCategoryToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCatalogueItem = {
  __typename?: 'PagedResultOfCatalogueItem';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueItem>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CatalogueItem>;
};

export type PagedResultOfCatalogueItemToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCatalogueItem__ = {
  __typename?: 'PagedResultOfCatalogueItem__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueItem__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<CatalogueItem>>>;
};

export type PagedResultOfCatalogueItem__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCatalogueType = {
  __typename?: 'PagedResultOfCatalogueType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CatalogueType>;
};

export type PagedResultOfCatalogueTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCity = {
  __typename?: 'PagedResultOfCity';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCity>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<City>;
};

export type PagedResultOfCityToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfConfig = {
  __typename?: 'PagedResultOfConfig';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfConfig>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Config>;
};

export type PagedResultOfConfigToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfContract = {
  __typename?: 'PagedResultOfContract';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfContract>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Contract>;
};

export type PagedResultOfContractToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfContractTemplate = {
  __typename?: 'PagedResultOfContractTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfContractTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ContractTemplate>;
};

export type PagedResultOfContractTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfContractType = {
  __typename?: 'PagedResultOfContractType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfContractType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ContractType>;
};

export type PagedResultOfContractTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCostCharge = {
  __typename?: 'PagedResultOfCostCharge';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCostCharge>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CostCharge>;
};

export type PagedResultOfCostChargeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfCraft = {
  __typename?: 'PagedResultOfCraft';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCraft>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Craft>;
};

export type PagedResultOfCraftToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfDocument = {
  __typename?: 'PagedResultOfDocument';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfDocument>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Document>;
};

export type PagedResultOfDocumentToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfDocument__ = {
  __typename?: 'PagedResultOfDocument__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfDocument__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Document>>>;
};

export type PagedResultOfDocument__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfEstate = {
  __typename?: 'PagedResultOfEstate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Estate>;
};

export type PagedResultOfEstateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfEstateMainUsageType = {
  __typename?: 'PagedResultOfEstateMainUsageType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateMainUsageType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateMainUsageType>;
};

export type PagedResultOfEstateMainUsageTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfEstateSubUnit = {
  __typename?: 'PagedResultOfEstateSubUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateSubUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateSubUnit>;
};

export type PagedResultOfEstateSubUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfEstateUnit = {
  __typename?: 'PagedResultOfEstateUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateUnit>;
};

export type PagedResultOfEstateUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfEstateUnitGroup = {
  __typename?: 'PagedResultOfEstateUnitGroup';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUnitGroup>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateUnitGroup>;
};

export type PagedResultOfEstateUnitGroupToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfEstateUnit__ = {
  __typename?: 'PagedResultOfEstateUnit__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUnit__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<EstateUnit>>>;
};

export type PagedResultOfEstateUnit__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfEstateUsageType = {
  __typename?: 'PagedResultOfEstateUsageType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUsageType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateUsageType>;
};

export type PagedResultOfEstateUsageTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfFcltContract = {
  __typename?: 'PagedResultOfFcltContract';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFcltContract>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FcltContract>;
};

export type PagedResultOfFcltContractToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfFcltContractType = {
  __typename?: 'PagedResultOfFcltContractType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFcltContractType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FcltContractType>;
};

export type PagedResultOfFcltContractTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfFileUrlOutput = {
  __typename?: 'PagedResultOfFileUrlOutput';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFileUrlOutput>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FileUrlOutput>;
};

export type PagedResultOfFileUrlOutputToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfFloorTemplate = {
  __typename?: 'PagedResultOfFloorTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFloorTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FloorTemplate>;
};

export type PagedResultOfFloorTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfFunctionArea = {
  __typename?: 'PagedResultOfFunctionArea';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFunctionArea>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FunctionArea>;
};

export type PagedResultOfFunctionAreaToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfFunctionArea__ = {
  __typename?: 'PagedResultOfFunctionArea__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFunctionArea__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<FunctionArea>>>;
};

export type PagedResultOfFunctionArea__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfGroup = {
  __typename?: 'PagedResultOfGroup';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfGroup>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Group>;
};

export type PagedResultOfGroupToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfIEnumerableOfAssetTaxCalculation = {
  __typename?: 'PagedResultOfIEnumerableOfAssetTaxCalculation';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfAssetTaxCalculation>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<AssetTaxCalculation>>>;
};

export type PagedResultOfIEnumerableOfAssetTaxCalculationToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfIEnumerableOfAssetTaxPayment = {
  __typename?: 'PagedResultOfIEnumerableOfAssetTaxPayment';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfAssetTaxPayment>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<AssetTaxPayment>>>;
};

export type PagedResultOfIEnumerableOfAssetTaxPaymentToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfIEnumerableOfFileUrlOutput = {
  __typename?: 'PagedResultOfIEnumerableOfFileUrlOutput';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfFileUrlOutput>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<FileUrlOutput>>>;
};

export type PagedResultOfIEnumerableOfFileUrlOutputToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfIEnumerableOfTicket = {
  __typename?: 'PagedResultOfIEnumerableOfTicket';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfTicket>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Ticket>>>;
};

export type PagedResultOfIEnumerableOfTicketToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfIEnumerableOfTicketChecklist = {
  __typename?: 'PagedResultOfIEnumerableOfTicketChecklist';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfTicketChecklist>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<TicketChecklist>>>;
};

export type PagedResultOfIEnumerableOfTicketChecklistToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimal = {
  __typename?: 'PagedResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimal';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimal>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<KeyValuePairOfEstateMarketValueTypeAndDecimal>>;
};

export type PagedResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimalToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfInt32 = {
  __typename?: 'PagedResultOfInt32';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfInt32>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value: Scalars['Int']['output'];
};

export type PagedResultOfInt32ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfInterestRate = {
  __typename?: 'PagedResultOfInterestRate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfInterestRate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<InterestRate>;
};

export type PagedResultOfInterestRateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfInterventionType = {
  __typename?: 'PagedResultOfInterventionType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfInterventionType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<InterventionType>;
};

export type PagedResultOfInterventionTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfLegalSubject = {
  __typename?: 'PagedResultOfLegalSubject';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfLegalSubject>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<LegalSubject>;
};

export type PagedResultOfLegalSubjectToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfListOfFloorTemplate = {
  __typename?: 'PagedResultOfListOfFloorTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfListOfFloorTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<FloorTemplate>>>;
};

export type PagedResultOfListOfFloorTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfManagementSubject = {
  __typename?: 'PagedResultOfManagementSubject';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfManagementSubject>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ManagementSubject>;
};

export type PagedResultOfManagementSubjectToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfOperation = {
  __typename?: 'PagedResultOfOperation';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfOperation>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Operation>;
};

export type PagedResultOfOperationToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfOrgUnit = {
  __typename?: 'PagedResultOfOrgUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfOrgUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<OrgUnit>;
};

export type PagedResultOfOrgUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfPenalty = {
  __typename?: 'PagedResultOfPenalty';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPenalty>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Penalty>;
};

export type PagedResultOfPenaltyToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfPenalty__ = {
  __typename?: 'PagedResultOfPenalty__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPenalty__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Penalty>>>;
};

export type PagedResultOfPenalty__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfPhysicalSubject = {
  __typename?: 'PagedResultOfPhysicalSubject';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPhysicalSubject>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PhysicalSubject>;
};

export type PagedResultOfPhysicalSubjectToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfPriceList = {
  __typename?: 'PagedResultOfPriceList';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPriceList>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PriceList>;
};

export type PagedResultOfPriceListToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfPriceListArticle = {
  __typename?: 'PagedResultOfPriceListArticle';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPriceListArticle>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PriceListArticle>;
};

export type PagedResultOfPriceListArticleToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfPriceListMeasurementUnit = {
  __typename?: 'PagedResultOfPriceListMeasurementUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPriceListMeasurementUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PriceListMeasurementUnit>;
};

export type PagedResultOfPriceListMeasurementUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfQualificationLevel = {
  __typename?: 'PagedResultOfQualificationLevel';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfQualificationLevel>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<QualificationLevel>;
};

export type PagedResultOfQualificationLevelToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfReading = {
  __typename?: 'PagedResultOfReading';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfReading>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Reading>;
};

export type PagedResultOfReadingToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfRegistrationOffice = {
  __typename?: 'PagedResultOfRegistrationOffice';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfRegistrationOffice>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<RegistrationOffice>;
};

export type PagedResultOfRegistrationOfficeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfRegistrationPayment = {
  __typename?: 'PagedResultOfRegistrationPayment';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfRegistrationPayment>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<RegistrationPayment>;
};

export type PagedResultOfRegistrationPaymentToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfResult = {
  __typename?: 'PagedResultOfResult';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfResult>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Result>;
};

export type PagedResultOfResultToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfSla = {
  __typename?: 'PagedResultOfSLA';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfSla>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Sla>;
};

export type PagedResultOfSlaToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfSla__ = {
  __typename?: 'PagedResultOfSLA__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfSla__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Sla>>>;
};

export type PagedResultOfSla__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfService = {
  __typename?: 'PagedResultOfService';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfService>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Service>;
};

export type PagedResultOfServiceToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfServiceCategory = {
  __typename?: 'PagedResultOfServiceCategory';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfServiceCategory>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ServiceCategory>;
};

export type PagedResultOfServiceCategoryToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfTaxCredit = {
  __typename?: 'PagedResultOfTaxCredit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTaxCredit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TaxCredit>;
};

export type PagedResultOfTaxCreditToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfTicket = {
  __typename?: 'PagedResultOfTicket';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicket>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Ticket>;
};

export type PagedResultOfTicketToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfTicketChecklist = {
  __typename?: 'PagedResultOfTicketChecklist';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicketChecklist>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TicketChecklist>;
};

export type PagedResultOfTicketChecklistToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfTicketChecklistTemplate = {
  __typename?: 'PagedResultOfTicketChecklistTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicketChecklistTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TicketChecklistTemplate>;
};

export type PagedResultOfTicketChecklistTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfTicketType = {
  __typename?: 'PagedResultOfTicketType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicketType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TicketType>;
};

export type PagedResultOfTicketTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfUser = {
  __typename?: 'PagedResultOfUser';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfUser>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<User>;
};

export type PagedResultOfUserToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfUtilityService = {
  __typename?: 'PagedResultOfUtilityService';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfUtilityService>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<UtilityService>;
};

export type PagedResultOfUtilityServiceToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfUtilityType = {
  __typename?: 'PagedResultOfUtilityType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfUtilityType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<UtilityType>;
};

export type PagedResultOfUtilityTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfVatRate = {
  __typename?: 'PagedResultOfVATRate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfVatRate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<VatRate>;
};

export type PagedResultOfVatRateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PagedResultOfWorkTeam = {
  __typename?: 'PagedResultOfWorkTeam';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  pagedInfo?: Maybe<PagedInfo>;
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfWorkTeam>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<WorkTeam>;
};

export type PagedResultOfWorkTeamToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type PassiveContractMutations = {
  __typename?: 'PassiveContractMutations';
  addLandlords: Result;
  takeoverDeadLandlord: Result;
  takeoverLandlords: Result;
  takeoverTenants: Result;
  transferLandlords: Result;
};

export type PassiveContractMutationsAddLandlordsArgs = {
  contractId: Scalars['Int']['input'];
  newCounterpartInputs: Array<ContractVariationNewCounterpartInput>;
  updatedCounterpartInputs: Array<ContractVariationUpdatedCounterpartInput>;
};

export type PassiveContractMutationsTakeoverDeadLandlordArgs = {
  contractId: Scalars['Int']['input'];
  deadCounterpartId: Scalars['Int']['input'];
  heirInputs: Array<ContractDeathVariationNewCounterpartInput>;
  updatedCounterpartInputs: Array<ContractVariationUpdatedCounterpartInput>;
};

export type PassiveContractMutationsTakeoverLandlordsArgs = {
  contractId: Scalars['Int']['input'];
  newCounterpartInputs: Array<ContractNoDateNewCounterpartInput>;
  takeoverDate: Scalars['Date']['input'];
  takeoverType: TakeoverType;
  updatedCounterpartInputs: Array<ContractNoDateUpdateCounterpartInput>;
};

export type PassiveContractMutationsTakeoverTenantsArgs = {
  contractId: Scalars['Int']['input'];
  legalRepresentativeSubjectId: Scalars['Int']['input'];
  paymentDate: Scalars['Date']['input'];
  successorIds: Array<Scalars['Int']['input']>;
};

export type PassiveContractMutationsTransferLandlordsArgs = {
  contractId: Scalars['Int']['input'];
  newCounterpartInputs: Array<ContractNoDateNewCounterpartInput>;
  transferDate: Scalars['Date']['input'];
  updatedCounterpartInputs: Array<ContractNoDateUpdateCounterpartInput>;
};

export type PasswordExpirationNotification = Notification & {
  __typename?: 'PasswordExpirationNotification';
  id: Scalars['Int']['output'];
  passwordExpirationDate: Scalars['DateTime']['output'];
  status: NotificationStatus;
  timestamp: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export enum PaymentType {
  Aito = 'AITO',
  Asci = 'ASCI',
  Astr = 'ASTR',
  Cash = 'CASH',
  Ccpm = 'CCPM',
  Check = 'CHECK',
  DebtNote = 'DEBT_NOTE',
  F23 = 'F23',
  Mav = 'MAV',
  Nopa = 'NOPA',
  PostAccount = 'POST_ACCOUNT',
  Rid = 'RID',
  SalaryDeduction = 'SALARY_DEDUCTION',
  Undefined = 'UNDEFINED',
  WireTransfer = 'WIRE_TRANSFER',
}

export type PaymentTypeOperationFilterInput = {
  eq?: InputMaybe<PaymentType>;
  in?: InputMaybe<Array<PaymentType>>;
  neq?: InputMaybe<PaymentType>;
  nin?: InputMaybe<Array<PaymentType>>;
};

export type Penalty = {
  __typename?: 'Penalty';
  contract?: Maybe<FcltContract>;
  description: Scalars['String']['output'];
  flatIfConditions: Array<TicketCondition>;
  id: Scalars['Int']['output'];
  ifCondition: ComplexTicketCondition;
  internalCode: Scalars['String']['output'];
  thenOperator: BooleanOperator;
  thenPenalties: Array<PenaltyValue>;
};

export type PenaltyFilterInput = {
  and?: InputMaybe<Array<PenaltyFilterInput>>;
  contract?: InputMaybe<FcltContractFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  ifCondition?: InputMaybe<ComplexTicketConditionFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isAttachedToContract?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<PenaltyFilterInput>>;
  thenOperator?: InputMaybe<BooleanOperatorOperationFilterInput>;
  thenPenalties?: InputMaybe<ListFilterInputTypeOfPenaltyValueFilterInput>;
};

export type PenaltyInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  ifCondition: ComplexTicketConditionInput;
  internalCode: Scalars['String']['input'];
  thenOperator: BooleanOperator;
  thenPenalties: Array<PenaltyValueInput>;
};

export type PenaltyMutations = {
  __typename?: 'PenaltyMutations';
  addRange: ResultOfPenalty__;
  delete: Result;
  deleteRange: Result;
  update: ResultOfPenalty;
};

export type PenaltyMutationsAddRangeArgs = {
  inputs: Array<PenaltyInput>;
};

export type PenaltyMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type PenaltyMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type PenaltyMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: PenaltyInput;
};

export type PenaltyQueries = {
  __typename?: 'PenaltyQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<Penalty>;
  listPenalties?: Maybe<ListPenaltiesConnection>;
  listPenaltiesFull: Array<Penalty>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type PenaltyQueriesCanUseInternalCodeArgs = {
  currentPenaltyId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type PenaltyQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<PenaltySortInput>>;
  where?: InputMaybe<PenaltyFilterInput>;
};

export type PenaltyQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type PenaltyQueriesListPenaltiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PenaltySortInput>>;
  where?: InputMaybe<PenaltyFilterInput>;
};

export type PenaltyQueriesListPenaltiesFullArgs = {
  order?: InputMaybe<Array<PenaltySortInput>>;
  where?: InputMaybe<PenaltyFilterInput>;
};

export type PenaltyQueriesProposeNewInternalCodeArgs = {
  additionallyOccupiedCodes: Array<Scalars['String']['input']>;
  contractInternalCode?: InputMaybe<Scalars['String']['input']>;
};

export type PenaltySortInput = {
  contract?: InputMaybe<FcltContractSortInput>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  ifCondition?: InputMaybe<ComplexTicketConditionSortInput>;
  internalCode?: InputMaybe<SortEnumType>;
  thenOperator?: InputMaybe<SortEnumType>;
};

export enum PenaltyType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
}

export type PenaltyTypeOperationFilterInput = {
  eq?: InputMaybe<PenaltyType>;
  in?: InputMaybe<Array<PenaltyType>>;
  neq?: InputMaybe<PenaltyType>;
  nin?: InputMaybe<Array<PenaltyType>>;
};

export type PenaltyValue = {
  __typename?: 'PenaltyValue';
  amount: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  type: PenaltyType;
};

export type PenaltyValueFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<PenaltyValueFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<PenaltyValueFilterInput>>;
  type?: InputMaybe<PenaltyTypeOperationFilterInput>;
};

export type PenaltyValueInput = {
  amount: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  type: PenaltyType;
};

export type PerformedActivity = {
  __typename?: 'PerformedActivity';
  id: Scalars['Int']['output'];
  isMandatoryByLaw: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
  status: PerformedActivityStatus;
};

export type PerformedActivityFilterInput = {
  and?: InputMaybe<Array<PerformedActivityFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  isMandatoryByLaw?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<PerformedActivityFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
  status?: InputMaybe<PerformedActivityStatusOperationFilterInput>;
};

export type PerformedActivityInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  status: PerformedActivityStatus;
};

export enum PerformedActivityStatus {
  CannotPerform = 'CANNOT_PERFORM',
  PerformedSuccessfully = 'PERFORMED_SUCCESSFULLY',
  PerformedUnsuccessfully = 'PERFORMED_UNSUCCESSFULLY',
  ToBePerformed = 'TO_BE_PERFORMED',
}

export type PerformedActivityStatusOperationFilterInput = {
  eq?: InputMaybe<PerformedActivityStatus>;
  in?: InputMaybe<Array<PerformedActivityStatus>>;
  neq?: InputMaybe<PerformedActivityStatus>;
  nin?: InputMaybe<Array<PerformedActivityStatus>>;
};

export type PermissionSummary = {
  __typename?: 'PermissionSummary';
  canCreate: Scalars['Boolean']['output'];
  canDelete: Scalars['Boolean']['output'];
  canRead: Scalars['Boolean']['output'];
  canUpdate: Scalars['Boolean']['output'];
  feature: Scalars['String']['output'];
};

export enum PersonType {
  LegalPerson = 'LEGAL_PERSON',
  ManagementSubject = 'MANAGEMENT_SUBJECT',
  PhysicalPerson = 'PHYSICAL_PERSON',
}

export type PersonTypeOperationFilterInput = {
  eq?: InputMaybe<PersonType>;
  in?: InputMaybe<Array<PersonType>>;
  neq?: InputMaybe<PersonType>;
  nin?: InputMaybe<Array<PersonType>>;
};

export type PhysicalSubject = ISubject & {
  __typename?: 'PhysicalSubject';
  addresses: Array<Address>;
  bankAccounts: Array<BankAccount>;
  birthCountryTaxIdCode?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['Date']['output']>;
  birthLocation?: Maybe<Address>;
  birthSex?: Maybe<BirthSex>;
  canUseDocumentName: Scalars['Boolean']['output'];
  categories: Array<SubjectCategory>;
  closureDate?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Contact>;
  contacts: Array<Contact>;
  creationDate: Scalars['DateTime']['output'];
  customGender?: Maybe<Scalars['Int']['output']>;
  customPersonType?: Maybe<Scalars['Int']['output']>;
  customSubjectStatus?: Maybe<Scalars['Int']['output']>;
  deathDate?: Maybe<Scalars['Date']['output']>;
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  documents: Array<Document>;
  entryStatus: EntryStatus;
  externalSourceCode?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  heirs: Array<SubjectRelation>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  officers: Array<SubjectRelation>;
  orgUnits: Array<OrgUnit>;
  owningMgmtSubjects: Array<SubjectRelation>;
  personType: PersonType;
  professionalTaxIdCode?: Maybe<Scalars['String']['output']>;
  relationMains: Array<SubjectRelation>;
  relationSubordinates: Array<SubjectRelation>;
  subOrganizations: Array<SubjectRelation>;
  taxStatuses: Array<TaxStatus>;
};

export type PhysicalSubjectCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type PhysicalSubjectContactArgs = {
  infoType: ContactInfoType;
};

export type PhysicalSubjectDocumentsArgs = {
  order?: InputMaybe<Array<DocumentSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type PhysicalSubjectInput = {
  addresses: Array<AddressInput>;
  bankAccounts: Array<BankAccountInput>;
  birthCountryTaxIdCode?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['Date']['input']>;
  birthLocation?: InputMaybe<AddressInput>;
  birthSex?: InputMaybe<BirthSex>;
  categoriesIds: Array<Scalars['Int']['input']>;
  closureDate?: InputMaybe<Scalars['Date']['input']>;
  contacts: Array<ContactInput>;
  customGender?: InputMaybe<Scalars['Int']['input']>;
  customPersonType?: InputMaybe<Scalars['Int']['input']>;
  customSubjectStatus?: InputMaybe<Scalars['Int']['input']>;
  deathDate?: InputMaybe<Scalars['Date']['input']>;
  entryStatus: EntryStatus;
  externalSourceCode?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  heirs: Array<HeirInput>;
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  officers: Array<OfficerInput>;
  ownerManagementSubjectIds: Array<Scalars['Int']['input']>;
  professionalTaxIdCode?: InputMaybe<Scalars['String']['input']>;
  taxStatuses: Array<TaxStatusInput>;
};

export enum PlannedPeriod {
  Annual = 'ANNUAL',
  Bimonthly = 'BIMONTHLY',
  Biweekly = 'BIWEEKLY',
  Daily = 'DAILY',
  EveryFourMonths = 'EVERY_FOUR_MONTHS',
  Midweek = 'MIDWEEK',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Semiannual = 'SEMIANNUAL',
  ThriceWeekly = 'THRICE_WEEKLY',
  Weekly = 'WEEKLY',
}

export type PriceList = {
  __typename?: 'PriceList';
  articles: Array<PriceListArticle>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type PriceListArticle = {
  __typename?: 'PriceListArticle';
  actualPrice?: Maybe<Scalars['Decimal']['output']>;
  actualPriceSince?: Maybe<Scalars['Date']['output']>;
  actualPriceUntil?: Maybe<Scalars['Date']['output']>;
  catalogueTypeIds: Array<Scalars['Int']['output']>;
  catalogueTypes: Array<CatalogueType>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  measurementUnit: PriceListMeasurementUnit;
  name: Scalars['String']['output'];
  priceList: PriceList;
  pricePeriods: Array<ArticlePricePeriod>;
};

export type PriceListArticleFilterInput = {
  actualPrice?: InputMaybe<DecimalOperationFilterInput>;
  actualPriceSince?: InputMaybe<DateOperationFilterInput>;
  actualPriceUntil?: InputMaybe<DateOperationFilterInput>;
  and?: InputMaybe<Array<PriceListArticleFilterInput>>;
  catalogueTypeIds?: InputMaybe<ListIntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  measurementUnit?: InputMaybe<PriceListMeasurementUnitFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<PriceListArticleFilterInput>>;
  priceList?: InputMaybe<PriceListFilterInput>;
  pricePeriods?: InputMaybe<ListFilterInputTypeOfArticlePricePeriodFilterInput>;
};

export type PriceListArticleMutations = {
  __typename?: 'PriceListArticleMutations';
  add: ResultOfPriceListArticle;
  delete: Result;
  deleteRange: Result;
  importFromExcel: ResultOfInt32;
  update: ResultOfPriceListArticle;
};

export type PriceListArticleMutationsAddArgs = {
  input: AddPriceListArticleInput;
};

export type PriceListArticleMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type PriceListArticleMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type PriceListArticleMutationsImportFromExcelArgs = {
  file: Scalars['Upload']['input'];
};

export type PriceListArticleMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: UpdatePriceListArticleInput;
};

export type PriceListArticleQueries = {
  __typename?: 'PriceListArticleQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<PriceListArticle>;
  listPriceListArticles?: Maybe<ListPriceListArticlesConnection>;
  listPriceListArticlesFull: Array<PriceListArticle>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  templateOfImportFromExcel: FileUrlOutput;
};

export type PriceListArticleQueriesCanUseInternalCodeArgs = {
  currentPriceListArticleId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type PriceListArticleQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<PriceListArticleSortInput>>;
  where?: InputMaybe<PriceListArticleFilterInput>;
};

export type PriceListArticleQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type PriceListArticleQueriesListPriceListArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PriceListArticleSortInput>>;
  where?: InputMaybe<PriceListArticleFilterInput>;
};

export type PriceListArticleQueriesListPriceListArticlesFullArgs = {
  order?: InputMaybe<Array<PriceListArticleSortInput>>;
  where?: InputMaybe<PriceListArticleFilterInput>;
};

export type PriceListArticleSortInput = {
  actualPrice?: InputMaybe<SortEnumType>;
  actualPriceSince?: InputMaybe<SortEnumType>;
  actualPriceUntil?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  measurementUnit?: InputMaybe<PriceListMeasurementUnitSortInput>;
  name?: InputMaybe<SortEnumType>;
  priceList?: InputMaybe<PriceListSortInput>;
};

export type PriceListFilterInput = {
  and?: InputMaybe<Array<PriceListFilterInput>>;
  articles?: InputMaybe<ListFilterInputTypeOfPriceListArticleFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isDefault?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<PriceListFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type PriceListInput = {
  internalCode: Scalars['String']['input'];
  isDefault: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type PriceListMeasurementUnit = {
  __typename?: 'PriceListMeasurementUnit';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type PriceListMeasurementUnitFilterInput = {
  and?: InputMaybe<Array<PriceListMeasurementUnitFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<PriceListMeasurementUnitFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type PriceListMeasurementUnitInput = {
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type PriceListMeasurementUnitMutations = {
  __typename?: 'PriceListMeasurementUnitMutations';
  add: ResultOfPriceListMeasurementUnit;
  delete: Result;
  deleteRange: Result;
  update: ResultOfPriceListMeasurementUnit;
};

export type PriceListMeasurementUnitMutationsAddArgs = {
  input: PriceListMeasurementUnitInput;
};

export type PriceListMeasurementUnitMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type PriceListMeasurementUnitMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type PriceListMeasurementUnitMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: PriceListMeasurementUnitInput;
};

export type PriceListMeasurementUnitQueries = {
  __typename?: 'PriceListMeasurementUnitQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<PriceListMeasurementUnit>;
  listPriceListMeasurementUnits?: Maybe<ListPriceListMeasurementUnitsConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type PriceListMeasurementUnitQueriesCanUseInternalCodeArgs = {
  currentPriceListMeasurementUnitId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type PriceListMeasurementUnitQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<PriceListMeasurementUnitSortInput>>;
  where?: InputMaybe<PriceListMeasurementUnitFilterInput>;
};

export type PriceListMeasurementUnitQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type PriceListMeasurementUnitQueriesListPriceListMeasurementUnitsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PriceListMeasurementUnitSortInput>>;
  where?: InputMaybe<PriceListMeasurementUnitFilterInput>;
};

export type PriceListMeasurementUnitSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export type PriceListMutations = {
  __typename?: 'PriceListMutations';
  add: ResultOfPriceList;
  delete: Result;
  deleteRange: Result;
  update: ResultOfPriceList;
};

export type PriceListMutationsAddArgs = {
  input: PriceListInput;
};

export type PriceListMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type PriceListMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type PriceListMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: PriceListInput;
};

export type PriceListQueries = {
  __typename?: 'PriceListQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<PriceList>;
  listPriceLists?: Maybe<ListPriceListsConnection>;
  listPriceListsFull: Array<PriceList>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type PriceListQueriesCanUseInternalCodeArgs = {
  currentPriceListId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type PriceListQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<PriceListSortInput>>;
  where?: InputMaybe<PriceListFilterInput>;
};

export type PriceListQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type PriceListQueriesListPriceListsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PriceListSortInput>>;
  where?: InputMaybe<PriceListFilterInput>;
};

export type PriceListQueriesListPriceListsFullArgs = {
  order?: InputMaybe<Array<PriceListSortInput>>;
  where?: InputMaybe<PriceListFilterInput>;
};

export type PriceListSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  isDefault?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export enum Priority {
  Critical = 'CRITICAL',
  Major = 'MAJOR',
  Minor = 'MINOR',
  Normal = 'NORMAL',
}

export type PriorityOperationFilterInput = {
  eq?: InputMaybe<Priority>;
  in?: InputMaybe<Array<Priority>>;
  neq?: InputMaybe<Priority>;
  nin?: InputMaybe<Array<Priority>>;
};

export type QualificationLevel = {
  __typename?: 'QualificationLevel';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type QualificationLevelFilterInput = {
  and?: InputMaybe<Array<QualificationLevelFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<QualificationLevelFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type QualificationLevelInput = {
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type QualificationLevelMutations = {
  __typename?: 'QualificationLevelMutations';
  add: ResultOfQualificationLevel;
  delete: Result;
  deleteRange: Result;
  update: ResultOfQualificationLevel;
};

export type QualificationLevelMutationsAddArgs = {
  input: QualificationLevelInput;
};

export type QualificationLevelMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type QualificationLevelMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type QualificationLevelMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: QualificationLevelInput;
};

export type QualificationLevelQueries = {
  __typename?: 'QualificationLevelQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<QualificationLevel>;
  listQualificationLevels?: Maybe<ListQualificationLevelsConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type QualificationLevelQueriesCanUseInternalCodeArgs = {
  currentQualificationLevelId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type QualificationLevelQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<QualificationLevelSortInput>>;
  where?: InputMaybe<QualificationLevelFilterInput>;
};

export type QualificationLevelQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type QualificationLevelQueriesListQualificationLevelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<QualificationLevelSortInput>>;
  where?: InputMaybe<QualificationLevelFilterInput>;
};

export type QualificationLevelSortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  accountingItem: AccountingItemQueries;
  admin: AdminQueries;
  administration: AdministrationQueries;
  administrationTerm: AdministrationTermQueries;
  assetTax: AssetTaxQueries;
  bill: BillQueries;
  billItemType: BillItemTypeQueries;
  cadastralCategory: CadastralCategoryQueries;
  cadastralLandCategory: CadastralLandCategoryQueries;
  cadastralUnit: CadastralUnitQueries;
  calendar: CalendarQueries;
  catalogue: CatalogueQueries;
  catalogueCategory: CatalogueCategoryQueries;
  catalogueItem: CatalogueItemQueries;
  catalogueType: CatalogueTypeQueries;
  city: CityQueries;
  contract: ContractQueries;
  contractTemplate: ContractTemplateQueries;
  contractType: ContractTypeQueries;
  costCharge: CostChargeQueries;
  craft: CraftQueries;
  document: DocumentQueries;
  estate: EstateQueries;
  estateMainUsageType: EstateMainUsageTypeQueries;
  estateSubUnit: EstateSubUnitQueries;
  estateUnit: EstateUnitQueries;
  estateUnitGroup: EstateUnitGroupQueries;
  estateUsageType: EstateUsageTypeQueries;
  fcltContract: FcltContractQueries;
  fcltContractType: FcltContractTypeQueries;
  floorTemplate: FloorTemplateQueries;
  functionArea: FunctionAreaQueries;
  geocoding: GeocodingQueries;
  interestRate: InterestRateQueries;
  interventionType: InterventionTypeQueries;
  notification: NotificationQueries;
  orgUnit: OrgUnitQueries;
  penalty: PenaltyQueries;
  priceList: PriceListQueries;
  priceListArticle: PriceListArticleQueries;
  priceListMeasurementUnit: PriceListMeasurementUnitQueries;
  qualificationLevel: QualificationLevelQueries;
  reading: ReadingQueries;
  registrationOffice: RegistrationOfficeQueries;
  registrationPayment: RegistrationPaymentQueries;
  registryCommunication: RegistryCommunicationQueries;
  reportGenerator: ReportGeneratorQueries;
  revaluationData: RevaluationDataQueries;
  service: ServiceQueries;
  serviceCategory: ServiceCategoryQueries;
  sla: SlaQueries;
  subject: SubjectQueries;
  subjectCategory: SubjectCategoryQueries;
  taxConfiguration: TaxConfigQueries;
  taxCredit: TaxCreditQueries;
  ticket: TicketQueries;
  ticketChecklist: TicketChecklistQueries;
  ticketChecklistTemplate: TicketChecklistTemplateQueries;
  ticketType: TicketTypeQueries;
  user: UserQueries;
  utilityService: UtilityServiceQueries;
  utilityType: UtilityTypeQueries;
  vatRate: VatRateQueries;
  workTeam: WorkTeamQueries;
};

export type Quote = {
  __typename?: 'Quote';
  amount: Scalars['Decimal']['output'];
  approvedAmount: Scalars['Decimal']['output'];
  articles: Array<QuoteArticle>;
  classifications?: Maybe<Scalars['String']['output']>;
  externalCode?: Maybe<Scalars['String']['output']>;
  history: Array<QuoteHistoryEntry>;
  id: Scalars['Int']['output'];
  interventionDueDate?: Maybe<Scalars['Date']['output']>;
  isFrameworkAgreement?: Maybe<Scalars['Boolean']['output']>;
  masterStatus: QuoteMasterStatus;
  notes?: Maybe<Scalars['String']['output']>;
  orderNumber?: Maybe<Scalars['String']['output']>;
};

export type QuoteArticle = {
  __typename?: 'QuoteArticle';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isExcluded: Scalars['Boolean']['output'];
  measurementUnit: PriceListMeasurementUnit;
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  sourceArticle?: Maybe<PriceListArticle>;
  unitPrice: Scalars['Decimal']['output'];
};

export type QuoteArticleFilterInput = {
  and?: InputMaybe<Array<QuoteArticleFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isExcluded?: InputMaybe<BooleanOperationFilterInput>;
  measurementUnit?: InputMaybe<PriceListMeasurementUnitFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<QuoteArticleFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
  quantity?: InputMaybe<IntOperationFilterInput>;
  sourceArticle?: InputMaybe<PriceListArticleFilterInput>;
  unitPrice?: InputMaybe<DecimalOperationFilterInput>;
};

export type QuoteArticleInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  isExcluded: Scalars['Boolean']['input'];
  measurementUnitId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
  sourceArticleId?: InputMaybe<Scalars['Int']['input']>;
  unitPrice: Scalars['Decimal']['input'];
};

export type QuoteFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<QuoteFilterInput>>;
  approvedAmount?: InputMaybe<DecimalOperationFilterInput>;
  articles?: InputMaybe<ListFilterInputTypeOfQuoteArticleFilterInput>;
  classifications?: InputMaybe<CustomStringFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  history?: InputMaybe<ListFilterInputTypeOfQuoteHistoryEntryFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  interventionDueDate?: InputMaybe<DateOperationFilterInput>;
  isFrameworkAgreement?: InputMaybe<BooleanOperationFilterInput>;
  masterStatus?: InputMaybe<QuoteMasterStatusOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<QuoteFilterInput>>;
  orderNumber?: InputMaybe<CustomStringFilterInput>;
};

export type QuoteHistoryEntry = {
  id: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type QuoteHistoryEntryFilterInput = {
  and?: InputMaybe<Array<QuoteHistoryEntryFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<QuoteHistoryEntryFilterInput>>;
  timestamp?: InputMaybe<DateTimeOperationFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type QuoteInput = {
  articles: Array<QuoteArticleInput>;
  classifications?: InputMaybe<Scalars['String']['input']>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  interventionDueDate: Scalars['Date']['input'];
  isFrameworkAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  masterStatus: QuoteMasterStatus;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
};

export enum QuoteMasterStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
}

export type QuoteMasterStatusOperationFilterInput = {
  eq?: InputMaybe<QuoteMasterStatus>;
  in?: InputMaybe<Array<QuoteMasterStatus>>;
  neq?: InputMaybe<QuoteMasterStatus>;
  nin?: InputMaybe<Array<QuoteMasterStatus>>;
};

export type QuoteSortInput = {
  amount?: InputMaybe<SortEnumType>;
  approvedAmount?: InputMaybe<SortEnumType>;
  classifications?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  interventionDueDate?: InputMaybe<SortEnumType>;
  isFrameworkAgreement?: InputMaybe<SortEnumType>;
  masterStatus?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  orderNumber?: InputMaybe<SortEnumType>;
};

export enum RateAreaType {
  ByCity = 'BY_CITY',
  ByCounty = 'BY_COUNTY',
  ByRegion = 'BY_REGION',
  NoGrouping = 'NO_GROUPING',
}

export type RatePlan = {
  __typename?: 'RatePlan';
  id: Scalars['Int']['output'];
  isDeclarationExpected: Scalars['Boolean']['output'];
  isDeclared: Scalars['Boolean']['output'];
  newYearlyRate: Scalars['Decimal']['output'];
  since: Scalars['Date']['output'];
};

export type RatePlanFilterInput = {
  and?: InputMaybe<Array<RatePlanFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeclarationExpected?: InputMaybe<BooleanOperationFilterInput>;
  isDeclared?: InputMaybe<BooleanOperationFilterInput>;
  newYearlyRate?: InputMaybe<DecimalOperationFilterInput>;
  or?: InputMaybe<Array<RatePlanFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
};

export type RatePlanInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isDeclarationExpected: Scalars['Boolean']['input'];
  newYearlyRate: Scalars['Decimal']['input'];
  since: Scalars['Date']['input'];
};

export type Reading = {
  __typename?: 'Reading';
  id: Scalars['Int']['output'];
  isEstimated: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  readingTimestamp: Scalars['DateTime']['output'];
  utilityService: UtilityService;
  values: Array<ReadingValue>;
};

export type ReadingFilterInput = {
  and?: InputMaybe<Array<ReadingFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  isEstimated?: InputMaybe<BooleanOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ReadingFilterInput>>;
  readingTimestamp?: InputMaybe<DateTimeOperationFilterInput>;
  utilityService?: InputMaybe<UtilityServiceFilterInput>;
  values?: InputMaybe<ListFilterInputTypeOfReadingValueFilterInput>;
};

export type ReadingInput = {
  isEstimated: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  readingTimestamp: Scalars['DateTime']['input'];
  utilityServiceId: Scalars['Int']['input'];
  values: Array<ReadingValueInput>;
};

export type ReadingMutations = {
  __typename?: 'ReadingMutations';
  add: ResultOfReading;
  delete: Result;
  deleteRange: Result;
  update: ResultOfReading;
};

export type ReadingMutationsAddArgs = {
  input: ReadingInput;
};

export type ReadingMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type ReadingMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type ReadingMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ReadingInput;
};

export type ReadingQueries = {
  __typename?: 'ReadingQueries';
  listReadings?: Maybe<ListReadingsConnection>;
};

export type ReadingQueriesListReadingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ReadingSortInput>>;
  where?: InputMaybe<ReadingFilterInput>;
};

export type ReadingSortInput = {
  id?: InputMaybe<SortEnumType>;
  isEstimated?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  readingTimestamp?: InputMaybe<SortEnumType>;
  utilityService?: InputMaybe<UtilityServiceSortInput>;
};

export type ReadingValue = {
  __typename?: 'ReadingValue';
  id: Scalars['Int']['output'];
  touRateIndex: Scalars['Int']['output'];
  value?: Maybe<Scalars['Decimal']['output']>;
};

export type ReadingValueFilterInput = {
  and?: InputMaybe<Array<ReadingValueFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ReadingValueFilterInput>>;
  touRateIndex?: InputMaybe<IntOperationFilterInput>;
  value?: InputMaybe<DecimalOperationFilterInput>;
};

export type ReadingValueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  touRateIndex: Scalars['Int']['input'];
  value?: InputMaybe<Scalars['Decimal']['input']>;
};

export enum Reason {
  ModificationsToExisting = 'MODIFICATIONS_TO_EXISTING',
  NotSpecified = 'NOT_SPECIFIED',
  Ratification = 'RATIFICATION',
  RentStart = 'RENT_START',
  SilentRenewal = 'SILENT_RENEWAL',
  Transfer = 'TRANSFER',
}

export type ReasonOperationFilterInput = {
  eq?: InputMaybe<Reason>;
  in?: InputMaybe<Array<Reason>>;
  neq?: InputMaybe<Reason>;
  nin?: InputMaybe<Array<Reason>>;
};

export type RecurringAddition = {
  __typename?: 'RecurringAddition';
  accountingItem: AccountingItem;
  accountingItemId: Scalars['Int']['output'];
  amountPerInstallment: Scalars['Decimal']['output'];
  billItemType: BillItemType;
  excludeEndMonth?: Maybe<Scalars['Int']['output']>;
  excludeStartMonth?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  vatRate: VatRate;
  vatRateId: Scalars['Int']['output'];
};

export type RecurringAdditionFilterInput = {
  accountingItemId?: InputMaybe<IntOperationFilterInput>;
  amountPerInstallment?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<RecurringAdditionFilterInput>>;
  billItemType?: InputMaybe<BillItemTypeFilterInput>;
  excludeEndMonth?: InputMaybe<IntOperationFilterInput>;
  excludeStartMonth?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<RecurringAdditionFilterInput>>;
  vatRateId?: InputMaybe<IntOperationFilterInput>;
};

export type RecurringAdditionInput = {
  accountingItemId: Scalars['Int']['input'];
  amountPerInstallment: Scalars['Decimal']['input'];
  billItemTypeId: Scalars['Int']['input'];
  excludeEndMonth?: InputMaybe<Scalars['Int']['input']>;
  excludeStartMonth?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  vatRateId: Scalars['Int']['input'];
};

export type Refactoring = {
  __typename?: 'Refactoring';
  ageCoefficient?: Maybe<Scalars['Float']['output']>;
  buildingPermitYear?: Maybe<Scalars['Int']['output']>;
  condition: UnitCondition;
  estateUnitIds: Array<Scalars['Int']['output']>;
  estateUnits: Array<EstateUnit>;
  id: Scalars['Int']['output'];
  referenceYear: Scalars['Int']['output'];
};

export type RefactoringFilterInput = {
  ageCoefficient?: InputMaybe<FloatOperationFilterInput>;
  and?: InputMaybe<Array<RefactoringFilterInput>>;
  buildingPermitYear?: InputMaybe<IntOperationFilterInput>;
  condition?: InputMaybe<UnitConditionOperationFilterInput>;
  estateUnitIds?: InputMaybe<ListIntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RefactoringFilterInput>>;
  referenceYear?: InputMaybe<IntOperationFilterInput>;
};

export type RefactoringInput = {
  ageCoefficient?: InputMaybe<Scalars['Float']['input']>;
  buildingPermitYear?: InputMaybe<Scalars['Int']['input']>;
  condition: UnitCondition;
  estateUnitIds: Array<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  referenceYear: Scalars['Int']['input'];
};

export enum RegistrationDateType {
  ItNotaryActDate = 'IT_NOTARY_ACT_DATE',
  ItTranscriptionDate = 'IT_TRANSCRIPTION_DATE',
  ItWrittenAtDate = 'IT_WRITTEN_AT_DATE',
}

export enum RegistrationFieldType {
  ItCollectionNumber = 'IT_COLLECTION_NUMBER',
  ItRepertoireNumber = 'IT_REPERTOIRE_NUMBER',
  ItTranscriptionCity = 'IT_TRANSCRIPTION_CITY',
  ItTranscriptionNumber = 'IT_TRANSCRIPTION_NUMBER',
  ItWrittenAtCity = 'IT_WRITTEN_AT_CITY',
}

export type RegistrationOffice = {
  __typename?: 'RegistrationOffice';
  city?: Maybe<City>;
  cityId?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  externalCode: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type RegistrationOfficeFilterInput = {
  and?: InputMaybe<Array<RegistrationOfficeFilterInput>>;
  cityId?: InputMaybe<IntOperationFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RegistrationOfficeFilterInput>>;
};

export type RegistrationOfficeInput = {
  cityId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type RegistrationOfficeMutations = {
  __typename?: 'RegistrationOfficeMutations';
  add: ResultOfRegistrationOffice;
  delete: Result;
  deleteRange: Result;
  update: ResultOfRegistrationOffice;
};

export type RegistrationOfficeMutationsAddArgs = {
  input: RegistrationOfficeInput;
};

export type RegistrationOfficeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type RegistrationOfficeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type RegistrationOfficeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: RegistrationOfficeInput;
};

export type RegistrationOfficeQueries = {
  __typename?: 'RegistrationOfficeQueries';
  get?: Maybe<RegistrationOffice>;
  listRegistrationOffices?: Maybe<ListRegistrationOfficesConnection>;
};

export type RegistrationOfficeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type RegistrationOfficeQueriesListRegistrationOfficesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RegistrationOfficeSortInput>>;
  where?: InputMaybe<RegistrationOfficeFilterInput>;
};

export type RegistrationOfficeSortInput = {
  cityId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
};

export type RegistrationPayment = {
  __typename?: 'RegistrationPayment';
  contract: Contract;
  id: Scalars['Int']['output'];
  paymentCode: Scalars['String']['output'];
  paymentType: RegistrationPaymentType;
  paymentYear: Scalars['Int']['output'];
  rows: Array<RegistrationPaymentRow>;
  sanctionAmount: Scalars['Decimal']['output'];
  taxAmount: Scalars['Decimal']['output'];
  totalAmount: Scalars['Decimal']['output'];
  valueDate: Scalars['Date']['output'];
};

export type RegistrationPaymentFilterInput = {
  and?: InputMaybe<Array<RegistrationPaymentFilterInput>>;
  contract?: InputMaybe<ContractFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RegistrationPaymentFilterInput>>;
  paymentCode?: InputMaybe<CustomStringFilterInput>;
  paymentType?: InputMaybe<RegistrationPaymentTypeOperationFilterInput>;
  paymentYear?: InputMaybe<IntOperationFilterInput>;
  rows?: InputMaybe<ListFilterInputTypeOfRegistrationPaymentRowFilterInput>;
  sanctionAmount?: InputMaybe<DecimalOperationFilterInput>;
  taxAmount?: InputMaybe<DecimalOperationFilterInput>;
  totalAmount?: InputMaybe<DecimalOperationFilterInput>;
  valueDate?: InputMaybe<DateOperationFilterInput>;
};

export type RegistrationPaymentInput = {
  contractId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  paymentCode: Scalars['String']['input'];
  paymentYear: Scalars['Int']['input'];
  rows: Array<RegistrationPaymentRowInput>;
  sanctionAmount: Scalars['Decimal']['input'];
  taxAmount: Scalars['Decimal']['input'];
  totalAmount: Scalars['Decimal']['input'];
  valueDate: Scalars['Date']['input'];
};

export type RegistrationPaymentMutations = {
  __typename?: 'RegistrationPaymentMutations';
  add: ResultOfRegistrationPayment;
  delete: Result;
  deleteRange: Result;
  update: ResultOfRegistrationPayment;
};

export type RegistrationPaymentMutationsAddArgs = {
  input: RegistrationPaymentInput;
};

export type RegistrationPaymentMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type RegistrationPaymentMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type RegistrationPaymentMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: RegistrationPaymentInput;
};

export type RegistrationPaymentQueries = {
  __typename?: 'RegistrationPaymentQueries';
  exportToExcel: FileUrlOutput;
  get?: Maybe<RegistrationPayment>;
  listRegistrationPayments?: Maybe<ListRegistrationPaymentsConnection>;
};

export type RegistrationPaymentQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<RegistrationPaymentSortInput>>;
  where?: InputMaybe<RegistrationPaymentFilterInput>;
};

export type RegistrationPaymentQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type RegistrationPaymentQueriesListRegistrationPaymentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RegistrationPaymentSortInput>>;
  where?: InputMaybe<RegistrationPaymentFilterInput>;
};

export type RegistrationPaymentRow = {
  __typename?: 'RegistrationPaymentRow';
  amountCleared?: Maybe<Scalars['Decimal']['output']>;
  amountDue: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  payment: RegistrationPayment;
  paymentRowCode: Scalars['String']['output'];
  paymentRowReceivingEntity?: Maybe<Scalars['String']['output']>;
  paymentRowSection?: Maybe<Scalars['String']['output']>;
  referencePeriod?: Maybe<Scalars['Int']['output']>;
  referenceYear: Scalars['Int']['output'];
};

export type RegistrationPaymentRowFilterInput = {
  amountCleared?: InputMaybe<DecimalOperationFilterInput>;
  amountDue?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<RegistrationPaymentRowFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RegistrationPaymentRowFilterInput>>;
  payment?: InputMaybe<RegistrationPaymentFilterInput>;
  paymentRowCode?: InputMaybe<CustomStringFilterInput>;
  paymentRowReceivingEntity?: InputMaybe<CustomStringFilterInput>;
  paymentRowSection?: InputMaybe<CustomStringFilterInput>;
  referencePeriod?: InputMaybe<IntOperationFilterInput>;
  referenceYear?: InputMaybe<IntOperationFilterInput>;
};

export type RegistrationPaymentRowInput = {
  amountCleared?: InputMaybe<Scalars['Decimal']['input']>;
  amountDue: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  paymentRowCode: Scalars['String']['input'];
  paymentRowReceivingEntity?: InputMaybe<Scalars['String']['input']>;
  paymentRowSection?: InputMaybe<Scalars['String']['input']>;
  referencePeriod?: InputMaybe<Scalars['Int']['input']>;
  referenceYear: Scalars['Int']['input'];
};

export type RegistrationPaymentSortInput = {
  contract?: InputMaybe<ContractSortInput>;
  id?: InputMaybe<SortEnumType>;
  paymentCode?: InputMaybe<SortEnumType>;
  paymentType?: InputMaybe<SortEnumType>;
  paymentYear?: InputMaybe<SortEnumType>;
  sanctionAmount?: InputMaybe<SortEnumType>;
  taxAmount?: InputMaybe<SortEnumType>;
  totalAmount?: InputMaybe<SortEnumType>;
  valueDate?: InputMaybe<SortEnumType>;
};

export enum RegistrationPaymentType {
  ManualInput = 'MANUAL_INPUT',
  Payment = 'PAYMENT',
}

export type RegistrationPaymentTypeOperationFilterInput = {
  eq?: InputMaybe<RegistrationPaymentType>;
  in?: InputMaybe<Array<RegistrationPaymentType>>;
  neq?: InputMaybe<RegistrationPaymentType>;
  nin?: InputMaybe<Array<RegistrationPaymentType>>;
};

export type RegistrationTax = {
  __typename?: 'RegistrationTax';
  contractRegistrationCode?: Maybe<Scalars['String']['output']>;
  exemptions?: Maybe<RegistrationTaxExemption>;
  firstOnlineRegistrationDate?: Maybe<Scalars['Date']['output']>;
  firstRegistrationDate?: Maybe<Scalars['Date']['output']>;
  firstRegistrationPeriod: RegistrationTaxPeriod;
  incomeType?: Maybe<RegistrationTaxIncomeType>;
  incomeTypeRLI?: Maybe<RegistrationTaxIncomeTypeRli>;
  isAccountingManaged: Scalars['Boolean']['output'];
  isRLIModeEnabled: Scalars['Boolean']['output'];
  isTakeoverFromPreviousSubject: Scalars['Boolean']['output'];
  isVoluntarySanctionApplied: Scalars['Boolean']['output'];
  lastOnlinePaymentDate?: Maybe<Scalars['Date']['output']>;
  lastPaymentDate?: Maybe<Scalars['Date']['output']>;
  legalRepresentativeSubject?: Maybe<ISubject>;
  numberOfCopies: Scalars['Int']['output'];
  numberOfPages: Scalars['Int']['output'];
  originalSubjects: Array<ISubject>;
  paymentType: RegistrationTaxPaymentType;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  registrationOffice?: Maybe<RegistrationOffice>;
  registrationSerialNumber?: Maybe<Scalars['String']['output']>;
  registrationYear?: Maybe<Scalars['Int']['output']>;
  requestCode?: Maybe<Scalars['String']['output']>;
  specialCase?: Maybe<RegistrationTaxSpecialCase>;
  takeoverDate?: Maybe<Scalars['Date']['output']>;
  takeoverLegalRepresentativeSubjectId?: Maybe<Scalars['Int']['output']>;
  takeoverOriginalSubjectIds: Array<Scalars['Int']['output']>;
  takeoverType?: Maybe<TakeoverType>;
  taxableRateRatioPercent: Scalars['Decimal']['output'];
  tenantShareOfStampTaxPercent: Scalars['Decimal']['output'];
  tenantTaxSharePercent: Scalars['Decimal']['output'];
  transferResolutionAmount?: Maybe<Scalars['Decimal']['output']>;
};

export enum RegistrationTaxExemption {
  Duties = 'DUTIES',
  Stamp = 'STAMP',
  StampAndDuties = 'STAMP_AND_DUTIES',
}

export type RegistrationTaxFilterInput = {
  and?: InputMaybe<Array<RegistrationTaxFilterInput>>;
  contractRegistrationCode?: InputMaybe<CustomStringFilterInput>;
  exemptions?: InputMaybe<NullableOfRegistrationTaxExemptionOperationFilterInput>;
  firstOnlineRegistrationDate?: InputMaybe<DateOperationFilterInput>;
  firstRegistrationDate?: InputMaybe<DateOperationFilterInput>;
  firstRegistrationPeriod?: InputMaybe<RegistrationTaxPeriodOperationFilterInput>;
  incomeType?: InputMaybe<NullableOfRegistrationTaxIncomeTypeOperationFilterInput>;
  incomeTypeRLI?: InputMaybe<NullableOfRegistrationTaxIncomeTypeRliOperationFilterInput>;
  isAccountingManaged?: InputMaybe<BooleanOperationFilterInput>;
  isRLIModeEnabled?: InputMaybe<BooleanOperationFilterInput>;
  isTakeoverFromPreviousSubject?: InputMaybe<BooleanOperationFilterInput>;
  isVoluntarySanctionApplied?: InputMaybe<BooleanOperationFilterInput>;
  lastOnlinePaymentDate?: InputMaybe<DateOperationFilterInput>;
  lastPaymentDate?: InputMaybe<DateOperationFilterInput>;
  numberOfCopies?: InputMaybe<IntOperationFilterInput>;
  numberOfPages?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RegistrationTaxFilterInput>>;
  paymentType?: InputMaybe<RegistrationTaxPaymentTypeOperationFilterInput>;
  registrationNumber?: InputMaybe<CustomStringFilterInput>;
  registrationOffice?: InputMaybe<RegistrationOfficeFilterInput>;
  registrationSerialNumber?: InputMaybe<CustomStringFilterInput>;
  registrationYear?: InputMaybe<IntOperationFilterInput>;
  requestCode?: InputMaybe<CustomStringFilterInput>;
  specialCase?: InputMaybe<NullableOfRegistrationTaxSpecialCaseOperationFilterInput>;
  takeoverDate?: InputMaybe<DateOperationFilterInput>;
  takeoverLegalRepresentativeSubjectId?: InputMaybe<IntOperationFilterInput>;
  takeoverOriginalSubjectIds?: InputMaybe<ListIntOperationFilterInput>;
  takeoverType?: InputMaybe<NullableOfTakeoverTypeOperationFilterInput>;
  taxableRateRatioPercent?: InputMaybe<DecimalOperationFilterInput>;
  tenantShareOfStampTaxPercent?: InputMaybe<DecimalOperationFilterInput>;
  tenantTaxSharePercent?: InputMaybe<DecimalOperationFilterInput>;
  transferResolutionAmount?: InputMaybe<DecimalOperationFilterInput>;
};

export enum RegistrationTaxIncomeType {
  Farmland = 'FARMLAND',
  NonresidentialLeasing = 'NONRESIDENTIAL_LEASING',
  NonresidentialLeasingWithVat = 'NONRESIDENTIAL_LEASING_WITH_VAT',
  NonresidentialRental = 'NONRESIDENTIAL_RENTAL',
  NonresidentialRentalLaw133Art6 = 'NONRESIDENTIAL_RENTAL_LAW133_ART6',
  NonresidentialRentalLaw633Art10 = 'NONRESIDENTIAL_RENTAL_LAW633_ART10',
  NonresidentialRentalWithVat = 'NONRESIDENTIAL_RENTAL_WITH_VAT',
  OtherEstates = 'OTHER_ESTATES',
  OtherLeasing = 'OTHER_LEASING',
  OtherRentalLaw133Art6 = 'OTHER_RENTAL_LAW133_ART6',
  OtherRentalLaw633Art10 = 'OTHER_RENTAL_LAW633_ART10',
  ResidentialLeasing = 'RESIDENTIAL_LEASING',
  ResidentialRentalByBuilders = 'RESIDENTIAL_RENTAL_BY_BUILDERS',
  ResidentialRentalLaw133Art6 = 'RESIDENTIAL_RENTAL_LAW133_ART6',
  ResidentialRentalLaw633Art10 = 'RESIDENTIAL_RENTAL_LAW633_ART10',
  UrbanEstates = 'URBAN_ESTATES',
}

export enum RegistrationTaxIncomeTypeRli {
  ItaL1Residential = 'ITA_L1_RESIDENTIAL',
  ItaL2ResidentialDiscount = 'ITA_L2_RESIDENTIAL_DISCOUNT',
  ItaL3ResidentialWithVat = 'ITA_L3_RESIDENTIAL_WITH_VAT',
  ItaL4ResidentialFinancial = 'ITA_L4_RESIDENTIAL_FINANCIAL',
  ItaS1Nonresidential = 'ITA_S1_NONRESIDENTIAL',
  ItaS2InstrumentalWithVat = 'ITA_S2_INSTRUMENTAL_WITH_VAT',
  ItaS3NonresidentialFinancial = 'ITA_S3_NONRESIDENTIAL_FINANCIAL',
  ItaT1Farmland = 'ITA_T1_FARMLAND',
  ItaT2FarmlandDiscount = 'ITA_T2_FARMLAND_DISCOUNT',
  ItaT3NonbuildableLand = 'ITA_T3_NONBUILDABLE_LAND',
  ItaT4NonbuildableParkingWithVat = 'ITA_T4_NONBUILDABLE_PARKING_WITH_VAT',
}

export type RegistrationTaxInput = {
  contractRegistrationCode?: InputMaybe<Scalars['String']['input']>;
  exemptions?: InputMaybe<RegistrationTaxExemption>;
  firstOnlineRegistrationDate?: InputMaybe<Scalars['Date']['input']>;
  firstRegistrationDate?: InputMaybe<Scalars['Date']['input']>;
  firstRegistrationPeriod: RegistrationTaxPeriod;
  incomeType?: InputMaybe<RegistrationTaxIncomeType>;
  incomeTypeRLI?: InputMaybe<RegistrationTaxIncomeTypeRli>;
  isAccountingManaged: Scalars['Boolean']['input'];
  isRLIModeEnabled: Scalars['Boolean']['input'];
  isTakeoverFromPreviousSubject: Scalars['Boolean']['input'];
  isVoluntarySanctionApplied: Scalars['Boolean']['input'];
  lastOnlinePaymentDate?: InputMaybe<Scalars['Date']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['Date']['input']>;
  numberOfCopies: Scalars['Int']['input'];
  numberOfPages: Scalars['Int']['input'];
  paymentType: RegistrationTaxPaymentType;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  registrationOfficeId: Scalars['Int']['input'];
  registrationSerialNumber?: InputMaybe<Scalars['String']['input']>;
  registrationYear?: InputMaybe<Scalars['Int']['input']>;
  specialCase?: InputMaybe<RegistrationTaxSpecialCase>;
  takeoverDate?: InputMaybe<Scalars['Date']['input']>;
  takeoverLegalRepresentativeSubjectId?: InputMaybe<Scalars['Int']['input']>;
  takeoverOriginalSubjectIds: Array<Scalars['Int']['input']>;
  takeoverType?: InputMaybe<TakeoverType>;
  taxableRateRatioPercent: Scalars['Decimal']['input'];
  tenantShareOfStampTaxPercent: Scalars['Decimal']['input'];
  tenantTaxSharePercent: Scalars['Decimal']['input'];
  transferResolutionAmount?: InputMaybe<Scalars['Decimal']['input']>;
};

export enum RegistrationTaxPaymentType {
  ItaF24Elide = 'ITA_F24_ELIDE',
  ItaTelematico = 'ITA_TELEMATICO',
  Undefined = 'UNDEFINED',
}

export type RegistrationTaxPaymentTypeOperationFilterInput = {
  eq?: InputMaybe<RegistrationTaxPaymentType>;
  in?: InputMaybe<Array<RegistrationTaxPaymentType>>;
  neq?: InputMaybe<RegistrationTaxPaymentType>;
  nin?: InputMaybe<Array<RegistrationTaxPaymentType>>;
};

export enum RegistrationTaxPeriod {
  EntireDuration = 'ENTIRE_DURATION',
  Year = 'YEAR',
}

export type RegistrationTaxPeriodOperationFilterInput = {
  eq?: InputMaybe<RegistrationTaxPeriod>;
  in?: InputMaybe<Array<RegistrationTaxPeriod>>;
  neq?: InputMaybe<RegistrationTaxPeriod>;
  nin?: InputMaybe<Array<RegistrationTaxPeriod>>;
};

export type RegistrationTaxSortInput = {
  contractRegistrationCode?: InputMaybe<SortEnumType>;
  exemptions?: InputMaybe<SortEnumType>;
  firstOnlineRegistrationDate?: InputMaybe<SortEnumType>;
  firstRegistrationDate?: InputMaybe<SortEnumType>;
  firstRegistrationPeriod?: InputMaybe<SortEnumType>;
  incomeType?: InputMaybe<SortEnumType>;
  incomeTypeRLI?: InputMaybe<SortEnumType>;
  isAccountingManaged?: InputMaybe<SortEnumType>;
  isRLIModeEnabled?: InputMaybe<SortEnumType>;
  isTakeoverFromPreviousSubject?: InputMaybe<SortEnumType>;
  isVoluntarySanctionApplied?: InputMaybe<SortEnumType>;
  lastOnlinePaymentDate?: InputMaybe<SortEnumType>;
  lastPaymentDate?: InputMaybe<SortEnumType>;
  numberOfCopies?: InputMaybe<SortEnumType>;
  numberOfPages?: InputMaybe<SortEnumType>;
  paymentType?: InputMaybe<SortEnumType>;
  registrationNumber?: InputMaybe<SortEnumType>;
  registrationOffice?: InputMaybe<RegistrationOfficeSortInput>;
  registrationSerialNumber?: InputMaybe<SortEnumType>;
  registrationYear?: InputMaybe<SortEnumType>;
  requestCode?: InputMaybe<SortEnumType>;
  specialCase?: InputMaybe<SortEnumType>;
  takeoverDate?: InputMaybe<SortEnumType>;
  takeoverLegalRepresentativeSubjectId?: InputMaybe<SortEnumType>;
  takeoverType?: InputMaybe<SortEnumType>;
  taxableRateRatioPercent?: InputMaybe<SortEnumType>;
  tenantShareOfStampTaxPercent?: InputMaybe<SortEnumType>;
  tenantTaxSharePercent?: InputMaybe<SortEnumType>;
  transferResolutionAmount?: InputMaybe<SortEnumType>;
};

export enum RegistrationTaxSpecialCase {
  Ita_1YearsWithDifferentRates = 'ITA_1_YEARS_WITH_DIFFERENT_RATES',
  Ita_2Subletting = 'ITA_2_SUBLETTING',
  Ita_3YearsWithRatesDifferentFromWhole = 'ITA_3_YEARS_WITH_RATES_DIFFERENT_FROM_WHOLE',
}

export type RegistryCommunication = {
  __typename?: 'RegistryCommunication';
  anomalies: Array<RegistryCommunicationAnomaly>;
  attachedDocumentId?: Maybe<Scalars['String']['output']>;
  contract?: Maybe<Contract>;
  contractCode?: Maybe<Scalars['String']['output']>;
  contractFee?: Maybe<Scalars['Decimal']['output']>;
  contractSignatureDate?: Maybe<Scalars['Date']['output']>;
  contractType?: Maybe<Scalars['String']['output']>;
  countryISO3: Scalars['String']['output'];
  date: Scalars['Date']['output'];
  debtAmount?: Maybe<Scalars['Decimal']['output']>;
  debtBankAccountId?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  estatesUnits: Array<CommEstateUnit>;
  hasAnomalies: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  isExcluded: Scalars['Boolean']['output'];
  isPayingEntireContractFee: Scalars['Boolean']['output'];
  isSent: Scalars['Boolean']['output'];
  numberOfCopies?: Maybe<Scalars['Int']['output']>;
  numberOfPages?: Maybe<Scalars['Int']['output']>;
  office?: Maybe<RegistrationOffice>;
  payment?: Maybe<RegistrationPayment>;
  receipt?: Maybe<RegistryCommunicationReceipt>;
  registryFee?: Maybe<Scalars['Decimal']['output']>;
  registryFeeInterest?: Maybe<Scalars['Decimal']['output']>;
  registryFeePenalty?: Maybe<Scalars['Decimal']['output']>;
  registryNumber?: Maybe<Scalars['String']['output']>;
  requestingSubjectId?: Maybe<Scalars['Int']['output']>;
  requestingSubjectLegalRepresentativeId?: Maybe<Scalars['Int']['output']>;
  senderSubjectId?: Maybe<Scalars['Int']['output']>;
  stampFee?: Maybe<Scalars['Decimal']['output']>;
  stampFeeInterest?: Maybe<Scalars['Decimal']['output']>;
  stampFeePenalty?: Maybe<Scalars['Decimal']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
  type: CommunicationType;
};

export type RegistryCommunicationAnomaly = {
  __typename?: 'RegistryCommunicationAnomaly';
  description: Scalars['String']['output'];
};

export type RegistryCommunicationAnomalyFilterInput = {
  and?: InputMaybe<Array<RegistryCommunicationAnomalyFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<RegistryCommunicationAnomalyFilterInput>>;
};

export type RegistryCommunicationAnomalyOutput = {
  __typename?: 'RegistryCommunicationAnomalyOutput';
  contractInternalCode?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  guid: Scalars['UUID']['output'];
};

export type RegistryCommunicationAnomalyOutputFilterInput = {
  and?: InputMaybe<Array<RegistryCommunicationAnomalyOutputFilterInput>>;
  contractInternalCode?: InputMaybe<CustomStringFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  guid?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<RegistryCommunicationAnomalyOutputFilterInput>>;
};

export type RegistryCommunicationAnomalyOutputSortInput = {
  contractInternalCode?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  guid?: InputMaybe<SortEnumType>;
};

export type RegistryCommunicationFilterInput = {
  and?: InputMaybe<Array<RegistryCommunicationFilterInput>>;
  anomalies?: InputMaybe<ListFilterInputTypeOfRegistryCommunicationAnomalyFilterInput>;
  anyEstateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  attachedDocumentId?: InputMaybe<CustomStringFilterInput>;
  contract?: InputMaybe<ContractFilterInput>;
  contractCode?: InputMaybe<CustomStringFilterInput>;
  contractFee?: InputMaybe<DecimalOperationFilterInput>;
  contractSignatureDate?: InputMaybe<DateOperationFilterInput>;
  contractType?: InputMaybe<CustomStringFilterInput>;
  countryISO3?: InputMaybe<CustomStringFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  debtAmount?: InputMaybe<DecimalOperationFilterInput>;
  debtBankAccountId?: InputMaybe<IntOperationFilterInput>;
  endDate?: InputMaybe<DateOperationFilterInput>;
  estatesUnits?: InputMaybe<ListFilterInputTypeOfCommEstateUnitFilterInput>;
  hasAnomalies?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isExcluded?: InputMaybe<BooleanOperationFilterInput>;
  isPayingEntireContractFee?: InputMaybe<BooleanOperationFilterInput>;
  isSent?: InputMaybe<BooleanOperationFilterInput>;
  numberOfCopies?: InputMaybe<IntOperationFilterInput>;
  numberOfPages?: InputMaybe<IntOperationFilterInput>;
  office?: InputMaybe<RegistrationOfficeFilterInput>;
  or?: InputMaybe<Array<RegistryCommunicationFilterInput>>;
  payment?: InputMaybe<RegistrationPaymentFilterInput>;
  receipt?: InputMaybe<RegistryCommunicationReceiptFilterInput>;
  registryFee?: InputMaybe<DecimalOperationFilterInput>;
  registryFeeInterest?: InputMaybe<DecimalOperationFilterInput>;
  registryFeePenalty?: InputMaybe<DecimalOperationFilterInput>;
  registryNumber?: InputMaybe<CustomStringFilterInput>;
  requestingSubjectId?: InputMaybe<IntOperationFilterInput>;
  requestingSubjectLegalRepresentativeId?: InputMaybe<IntOperationFilterInput>;
  senderSubjectId?: InputMaybe<IntOperationFilterInput>;
  stampFee?: InputMaybe<DecimalOperationFilterInput>;
  stampFeeInterest?: InputMaybe<DecimalOperationFilterInput>;
  stampFeePenalty?: InputMaybe<DecimalOperationFilterInput>;
  startDate?: InputMaybe<DateOperationFilterInput>;
  type?: InputMaybe<CommunicationTypeOperationFilterInput>;
};

export type RegistryCommunicationGroup = {
  __typename?: 'RegistryCommunicationGroup';
  anomaliesCount: Scalars['Int']['output'];
  debtAmount?: Maybe<Scalars['Decimal']['output']>;
  debtBankAccount?: Maybe<BankAccount>;
  hasAnomalies: Scalars['Boolean']['output'];
  id: RegistryCommunicationGroupId;
  managementSubject: ISubject;
  requestingSubjectLegalRepresentative?: Maybe<ISubject>;
};

export type RegistryCommunicationGroupFilterInput = {
  and?: InputMaybe<Array<RegistryCommunicationGroupFilterInput>>;
  anomaliesCount?: InputMaybe<IntOperationFilterInput>;
  debtAmount?: InputMaybe<DecimalOperationFilterInput>;
  debtBankAccountReferenceCode?: InputMaybe<CustomStringFilterInput>;
  hasAnomalies?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<RegistryCommunicationGroupIdFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<RegistryCommunicationGroupFilterInput>>;
  requestingSubjectLegalRepresentativeName?: InputMaybe<CustomStringFilterInput>;
};

export type RegistryCommunicationGroupId = {
  __typename?: 'RegistryCommunicationGroupId';
  communicationType: CommunicationType;
  date?: Maybe<Scalars['Date']['output']>;
  debtBankAccountId?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  isActiveContract: Scalars['Boolean']['output'];
  managementSubjectId: Scalars['Int']['output'];
  requestingSubjectLegalRepresentativeId?: Maybe<Scalars['Int']['output']>;
};

export type RegistryCommunicationGroupIdFilterInput = {
  and?: InputMaybe<Array<RegistryCommunicationGroupIdFilterInput>>;
  communicationType?: InputMaybe<CommunicationTypeOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  debtBankAccountId?: InputMaybe<IntOperationFilterInput>;
  endDate?: InputMaybe<DateOperationFilterInput>;
  isActiveContract?: InputMaybe<BooleanOperationFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RegistryCommunicationGroupIdFilterInput>>;
  requestingSubjectLegalRepresentativeId?: InputMaybe<IntOperationFilterInput>;
};

export type RegistryCommunicationGroupIdInput = {
  communicationType: CommunicationType;
  date?: InputMaybe<Scalars['Date']['input']>;
  debtBankAccountId?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  isActiveContract: Scalars['Boolean']['input'];
  managementSubjectId: Scalars['Int']['input'];
  requestingSubjectLegalRepresentativeId?: InputMaybe<Scalars['Int']['input']>;
};

export type RegistryCommunicationGroupIdSortInput = {
  communicationType?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  debtBankAccountId?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  isActiveContract?: InputMaybe<SortEnumType>;
  managementSubjectId?: InputMaybe<SortEnumType>;
  requestingSubjectLegalRepresentativeId?: InputMaybe<SortEnumType>;
};

export type RegistryCommunicationGroupSortInput = {
  anomaliesCount?: InputMaybe<SortEnumType>;
  debtAmount?: InputMaybe<SortEnumType>;
  debtBankAccountReferenceCode?: InputMaybe<SortEnumType>;
  hasAnomalies?: InputMaybe<SortEnumType>;
  id?: InputMaybe<RegistryCommunicationGroupIdSortInput>;
  managementSubjectName?: InputMaybe<SortEnumType>;
  requestingSubjectLegalRepresentativeName?: InputMaybe<SortEnumType>;
};

export type RegistryCommunicationMutations = {
  __typename?: 'RegistryCommunicationMutations';
  deleteRange: Result;
  markAsExcluded: Result;
  markAsIncluded: Result;
};

export type RegistryCommunicationMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type RegistryCommunicationMutationsMarkAsExcludedArgs = {
  id: Scalars['Int']['input'];
};

export type RegistryCommunicationMutationsMarkAsIncludedArgs = {
  id: Scalars['Int']['input'];
};

export type RegistryCommunicationQueries = {
  __typename?: 'RegistryCommunicationQueries';
  exportGroupXmlRli: FileUrlOutput;
  exportGroupsToExcel: FileUrlOutput;
  group?: Maybe<RegistryCommunicationGroup>;
  listAnomalies?: Maybe<ListAnomaliesConnection>;
  listManagementSubjects: Array<ISubject>;
  listRegistryCommunicationGroups?: Maybe<ListRegistryCommunicationGroupsConnection>;
  listRegistryCommunications?: Maybe<ListRegistryCommunicationsConnection>;
};

export type RegistryCommunicationQueriesExportGroupXmlRliArgs = {
  groupId: ConfirmedRegistryCommunicationGroupIdInput;
};

export type RegistryCommunicationQueriesExportGroupsToExcelArgs = {
  isConfirmed: Scalars['Boolean']['input'];
  order?: InputMaybe<Array<RegistryCommunicationGroupSortInput>>;
  where?: InputMaybe<RegistryCommunicationGroupFilterInput>;
};

export type RegistryCommunicationQueriesGroupArgs = {
  id: RegistryCommunicationGroupIdInput;
};

export type RegistryCommunicationQueriesListAnomaliesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groupId: RegistryCommunicationGroupIdInput;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RegistryCommunicationAnomalyOutputSortInput>>;
  where?: InputMaybe<RegistryCommunicationAnomalyOutputFilterInput>;
};

export type RegistryCommunicationQueriesListRegistryCommunicationGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isConfirmed: Scalars['Boolean']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RegistryCommunicationGroupSortInput>>;
  where?: InputMaybe<RegistryCommunicationGroupFilterInput>;
};

export type RegistryCommunicationQueriesListRegistryCommunicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groupId: RegistryCommunicationGroupIdInput;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RegistryCommunicationSortInput>>;
  where?: InputMaybe<RegistryCommunicationFilterInput>;
};

export type RegistryCommunicationReceipt = {
  __typename?: 'RegistryCommunicationReceipt';
  contractAssignedNumber?: Maybe<Scalars['String']['output']>;
  failureMessage?: Maybe<Scalars['String']['output']>;
  isSuccessful: Scalars['Boolean']['output'];
  registrationNumber?: Maybe<Scalars['String']['output']>;
  registrationSeries?: Maybe<Scalars['String']['output']>;
};

export type RegistryCommunicationReceiptFilterInput = {
  and?: InputMaybe<Array<RegistryCommunicationReceiptFilterInput>>;
  contractAssignedNumber?: InputMaybe<CustomStringFilterInput>;
  failureMessage?: InputMaybe<CustomStringFilterInput>;
  isSuccessful?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<RegistryCommunicationReceiptFilterInput>>;
  registrationNumber?: InputMaybe<CustomStringFilterInput>;
  registrationSeries?: InputMaybe<CustomStringFilterInput>;
};

export type RegistryCommunicationReceiptSortInput = {
  contractAssignedNumber?: InputMaybe<SortEnumType>;
  failureMessage?: InputMaybe<SortEnumType>;
  isSuccessful?: InputMaybe<SortEnumType>;
  registrationNumber?: InputMaybe<SortEnumType>;
  registrationSeries?: InputMaybe<SortEnumType>;
};

export type RegistryCommunicationSortInput = {
  attachedDocumentId?: InputMaybe<SortEnumType>;
  contract?: InputMaybe<ContractSortInput>;
  contractCode?: InputMaybe<SortEnumType>;
  contractFee?: InputMaybe<SortEnumType>;
  contractSignatureDate?: InputMaybe<SortEnumType>;
  contractType?: InputMaybe<SortEnumType>;
  countryISO3?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  debtAmount?: InputMaybe<SortEnumType>;
  debtBankAccountId?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  hasAnomalies?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isExcluded?: InputMaybe<SortEnumType>;
  isPayingEntireContractFee?: InputMaybe<SortEnumType>;
  isSent?: InputMaybe<SortEnumType>;
  numberOfCopies?: InputMaybe<SortEnumType>;
  numberOfPages?: InputMaybe<SortEnumType>;
  office?: InputMaybe<RegistrationOfficeSortInput>;
  payment?: InputMaybe<RegistrationPaymentSortInput>;
  receipt?: InputMaybe<RegistryCommunicationReceiptSortInput>;
  registryFee?: InputMaybe<SortEnumType>;
  registryFeeInterest?: InputMaybe<SortEnumType>;
  registryFeePenalty?: InputMaybe<SortEnumType>;
  registryNumber?: InputMaybe<SortEnumType>;
  requestingSubjectId?: InputMaybe<SortEnumType>;
  requestingSubjectLegalRepresentativeId?: InputMaybe<SortEnumType>;
  senderSubjectId?: InputMaybe<SortEnumType>;
  stampFee?: InputMaybe<SortEnumType>;
  stampFeeInterest?: InputMaybe<SortEnumType>;
  stampFeePenalty?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export enum ReleaseReason {
  NotRenewedAtTermination = 'NOT_RENEWED_AT_TERMINATION',
  Termination = 'TERMINATION',
  Withdrawal = 'WITHDRAWAL',
}

export type Reminder = {
  __typename?: 'Reminder';
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  summary: Scalars['String']['output'];
};

export type ReminderDeletedTicketHistoryEntry = TicketHistoryEntry & {
  __typename?: 'ReminderDeletedTicketHistoryEntry';
  id: Scalars['Int']['output'];
  reminderDate: Scalars['Date']['output'];
  reminderSummary: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type ReminderFilterInput = {
  and?: InputMaybe<Array<ReminderFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ReminderFilterInput>>;
  summary?: InputMaybe<CustomStringFilterInput>;
};

export type ReminderInput = {
  date: Scalars['Date']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  summary: Scalars['String']['input'];
};

export type ReminderUpdatedTicketHistoryEntry = TicketHistoryEntry & {
  __typename?: 'ReminderUpdatedTicketHistoryEntry';
  id: Scalars['Int']['output'];
  newReminderDate: Scalars['Date']['output'];
  newReminderSummary: Scalars['String']['output'];
  oldReminderDate: Scalars['Date']['output'];
  oldReminderSummary: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type Reply = {
  __typename?: 'Reply';
  comment?: Maybe<Scalars['String']['output']>;
  documents: Array<Document>;
  id: Scalars['Int']['output'];
  images: Array<Document>;
  isOperator: Scalars['Boolean']['output'];
  timestamp: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type ReplyFilterInput = {
  and?: InputMaybe<Array<ReplyFilterInput>>;
  comment?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isOperator?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ReplyFilterInput>>;
  timestamp?: InputMaybe<DateTimeOperationFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export enum ReportFormat {
  Excel = 'EXCEL',
  Pdf = 'PDF',
}

export type ReportGeneratorFilterField = {
  __typename?: 'ReportGeneratorFilterField';
  isMandatory: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: CustomFieldType;
  validValues?: Maybe<Array<KeyValuePairOfStringAndString>>;
};

export type ReportGeneratorFilterInput = {
  dateValue?: InputMaybe<Scalars['Date']['input']>;
  fieldName: Scalars['String']['input'];
  numberValue?: InputMaybe<Scalars['Decimal']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type ReportGeneratorMutations = {
  __typename?: 'ReportGeneratorMutations';
  generateReports: ResultOfIEnumerableOfFileUrlOutput;
};

export type ReportGeneratorMutationsGenerateReportsArgs = {
  filters: Array<ReportGeneratorFilterInput>;
  reportGeneratorId: Scalars['UUID']['input'];
  targetReportFormats: Array<ReportFormat>;
};

export type ReportGeneratorOutput = {
  __typename?: 'ReportGeneratorOutput';
  filterFields: Array<Array<ReportGeneratorFilterField>>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  supportedFormats: Array<ReportFormat>;
};

export type ReportGeneratorQueries = {
  __typename?: 'ReportGeneratorQueries';
  availableReportGenerators: Array<ReportGeneratorOutput>;
};

export type Repossession = {
  __typename?: 'Repossession';
  estateUnit: EstateUnit;
  eventDate?: Maybe<Scalars['Date']['output']>;
  eventReason?: Maybe<RepossessionReason>;
  eventType?: Maybe<RepossessionType>;
  id: Scalars['Int']['output'];
  isAssignable?: Maybe<Scalars['Boolean']['output']>;
  isKeysReturned?: Maybe<Scalars['Boolean']['output']>;
  isWithValuables?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  unitStatus?: Maybe<UnitCondition>;
};

export type RepossessionFilterInput = {
  and?: InputMaybe<Array<RepossessionFilterInput>>;
  estateUnit?: InputMaybe<EstateUnitFilterInput>;
  eventDate?: InputMaybe<DateOperationFilterInput>;
  eventReason?: InputMaybe<NullableOfRepossessionReasonOperationFilterInput>;
  eventType?: InputMaybe<NullableOfRepossessionTypeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isAssignable?: InputMaybe<BooleanOperationFilterInput>;
  isKeysReturned?: InputMaybe<BooleanOperationFilterInput>;
  isWithValuables?: InputMaybe<BooleanOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<RepossessionFilterInput>>;
  unitStatus?: InputMaybe<NullableOfUnitConditionOperationFilterInput>;
};

export enum RepossessionReason {
  CityDecree = 'CITY_DECREE',
  EmergencyMaintenance = 'EMERGENCY_MAINTENANCE',
  EstateStatusCheck = 'ESTATE_STATUS_CHECK',
  GivenBackForcedSale = 'GIVEN_BACK_FORCED_SALE',
  GivenBackJudiciaryOfficial = 'GIVEN_BACK_JUDICIARY_OFFICIAL',
  GoodwillLoan = 'GOODWILL_LOAN',
  JudiciaryInjuction = 'JUDICIARY_INJUCTION',
  NegotiationCommercialLocation = 'NEGOTIATION_COMMERCIAL_LOCATION',
  NegotiationOccupationPayback = 'NEGOTIATION_OCCUPATION_PAYBACK',
  Other = 'OTHER',
  Squatting = 'SQUATTING',
  TechnicalDifficulties = 'TECHNICAL_DIFFICULTIES',
  TenantDefault = 'TENANT_DEFAULT',
}

export type RepossessionSortInput = {
  estateUnit?: InputMaybe<EstateUnitSortInput>;
  eventDate?: InputMaybe<SortEnumType>;
  eventReason?: InputMaybe<SortEnumType>;
  eventType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAssignable?: InputMaybe<SortEnumType>;
  isKeysReturned?: InputMaybe<SortEnumType>;
  isWithValuables?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  unitStatus?: InputMaybe<SortEnumType>;
};

export enum RepossessionType {
  BlockedRepossession = 'BLOCKED_REPOSSESSION',
  CheckBefore = 'CHECK_BEFORE',
  IncompleteRepossession = 'INCOMPLETE_REPOSSESSION',
  Repossession = 'REPOSSESSION',
}

export type Resolution = {
  __typename?: 'Resolution';
  closure?: Maybe<Scalars['DateTime']['output']>;
  diagnosis?: Maybe<Scalars['String']['output']>;
  interventionEnd?: Maybe<Scalars['DateTime']['output']>;
  interventionStart?: Maybe<Scalars['DateTime']['output']>;
  operationsPerformed?: Maybe<Scalars['String']['output']>;
  partsAndSupplies?: Maybe<Scalars['String']['output']>;
  resolutionNotes?: Maybe<Scalars['String']['output']>;
};

export type ResolutionFilterInput = {
  and?: InputMaybe<Array<ResolutionFilterInput>>;
  closure?: InputMaybe<DateTimeOperationFilterInput>;
  diagnosis?: InputMaybe<CustomStringFilterInput>;
  interventionEnd?: InputMaybe<DateTimeOperationFilterInput>;
  interventionStart?: InputMaybe<DateTimeOperationFilterInput>;
  operationsPerformed?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ResolutionFilterInput>>;
  partsAndSupplies?: InputMaybe<CustomStringFilterInput>;
  resolutionNotes?: InputMaybe<CustomStringFilterInput>;
};

export type ResolutionInput = {
  closure?: InputMaybe<Scalars['DateTime']['input']>;
  diagnosis?: InputMaybe<Scalars['String']['input']>;
  interventionEnd?: InputMaybe<Scalars['DateTime']['input']>;
  interventionStart?: InputMaybe<Scalars['DateTime']['input']>;
  operationsPerformed?: InputMaybe<Scalars['String']['input']>;
  partsAndSupplies?: InputMaybe<Scalars['String']['input']>;
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
};

export type ResolutionSortInput = {
  closure?: InputMaybe<SortEnumType>;
  diagnosis?: InputMaybe<SortEnumType>;
  interventionEnd?: InputMaybe<SortEnumType>;
  interventionStart?: InputMaybe<SortEnumType>;
  operationsPerformed?: InputMaybe<SortEnumType>;
  partsAndSupplies?: InputMaybe<SortEnumType>;
  resolutionNotes?: InputMaybe<SortEnumType>;
};

export type Result = {
  __typename?: 'Result';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfResult>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Result>;
};

export type ResultToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfAccountingItem = {
  __typename?: 'ResultOfAccountingItem';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAccountingItem>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<AccountingItem>;
};

export type ResultOfAccountingItemToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfAdministration = {
  __typename?: 'ResultOfAdministration';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAdministration>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Administration>;
};

export type ResultOfAdministrationToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfAdministrationTerm = {
  __typename?: 'ResultOfAdministrationTerm';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAdministrationTerm>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<AdministrationTerm>;
};

export type ResultOfAdministrationTermToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfAdministration__ = {
  __typename?: 'ResultOfAdministration__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfAdministration__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Administration>>>;
};

export type ResultOfAdministration__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfBill = {
  __typename?: 'ResultOfBill';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfBill>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Bill>;
};

export type ResultOfBillToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfBillItemType = {
  __typename?: 'ResultOfBillItemType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfBillItemType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<BillItemType>;
};

export type ResultOfBillItemTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfBillingPause = {
  __typename?: 'ResultOfBillingPause';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfBillingPause>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<BillingPause>;
};

export type ResultOfBillingPauseToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCadastralLandCategory = {
  __typename?: 'ResultOfCadastralLandCategory';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCadastralLandCategory>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CadastralLandCategory>;
};

export type ResultOfCadastralLandCategoryToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCadastralUnit = {
  __typename?: 'ResultOfCadastralUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCadastralUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CadastralUnit>;
};

export type ResultOfCadastralUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCalendar = {
  __typename?: 'ResultOfCalendar';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCalendar>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Calendar>;
};

export type ResultOfCalendarToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCatalogueCategory = {
  __typename?: 'ResultOfCatalogueCategory';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueCategory>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CatalogueCategory>;
};

export type ResultOfCatalogueCategoryToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCatalogueItem = {
  __typename?: 'ResultOfCatalogueItem';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueItem>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CatalogueItem>;
};

export type ResultOfCatalogueItemToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCatalogueItem__ = {
  __typename?: 'ResultOfCatalogueItem__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueItem__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<CatalogueItem>>>;
};

export type ResultOfCatalogueItem__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCatalogueType = {
  __typename?: 'ResultOfCatalogueType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCatalogueType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CatalogueType>;
};

export type ResultOfCatalogueTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCity = {
  __typename?: 'ResultOfCity';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCity>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<City>;
};

export type ResultOfCityToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfConfig = {
  __typename?: 'ResultOfConfig';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfConfig>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Config>;
};

export type ResultOfConfigToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfContract = {
  __typename?: 'ResultOfContract';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfContract>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Contract>;
};

export type ResultOfContractToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfContractTemplate = {
  __typename?: 'ResultOfContractTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfContractTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ContractTemplate>;
};

export type ResultOfContractTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfContractType = {
  __typename?: 'ResultOfContractType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfContractType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ContractType>;
};

export type ResultOfContractTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCostCharge = {
  __typename?: 'ResultOfCostCharge';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCostCharge>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<CostCharge>;
};

export type ResultOfCostChargeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfCraft = {
  __typename?: 'ResultOfCraft';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfCraft>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Craft>;
};

export type ResultOfCraftToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfDocument = {
  __typename?: 'ResultOfDocument';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfDocument>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Document>;
};

export type ResultOfDocumentToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfDocument__ = {
  __typename?: 'ResultOfDocument__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfDocument__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Document>>>;
};

export type ResultOfDocument__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfEstate = {
  __typename?: 'ResultOfEstate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Estate>;
};

export type ResultOfEstateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfEstateMainUsageType = {
  __typename?: 'ResultOfEstateMainUsageType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateMainUsageType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateMainUsageType>;
};

export type ResultOfEstateMainUsageTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfEstateSubUnit = {
  __typename?: 'ResultOfEstateSubUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateSubUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateSubUnit>;
};

export type ResultOfEstateSubUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfEstateUnit = {
  __typename?: 'ResultOfEstateUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateUnit>;
};

export type ResultOfEstateUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfEstateUnitGroup = {
  __typename?: 'ResultOfEstateUnitGroup';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUnitGroup>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateUnitGroup>;
};

export type ResultOfEstateUnitGroupToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfEstateUnit__ = {
  __typename?: 'ResultOfEstateUnit__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUnit__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<EstateUnit>>>;
};

export type ResultOfEstateUnit__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfEstateUsageType = {
  __typename?: 'ResultOfEstateUsageType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfEstateUsageType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<EstateUsageType>;
};

export type ResultOfEstateUsageTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfFcltContract = {
  __typename?: 'ResultOfFcltContract';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFcltContract>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FcltContract>;
};

export type ResultOfFcltContractToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfFcltContractType = {
  __typename?: 'ResultOfFcltContractType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFcltContractType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FcltContractType>;
};

export type ResultOfFcltContractTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfFileUrlOutput = {
  __typename?: 'ResultOfFileUrlOutput';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFileUrlOutput>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FileUrlOutput>;
};

export type ResultOfFileUrlOutputToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfFloorTemplate = {
  __typename?: 'ResultOfFloorTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFloorTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FloorTemplate>;
};

export type ResultOfFloorTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfFunctionArea = {
  __typename?: 'ResultOfFunctionArea';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFunctionArea>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<FunctionArea>;
};

export type ResultOfFunctionAreaToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfFunctionArea__ = {
  __typename?: 'ResultOfFunctionArea__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfFunctionArea__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<FunctionArea>>>;
};

export type ResultOfFunctionArea__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfGroup = {
  __typename?: 'ResultOfGroup';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfGroup>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Group>;
};

export type ResultOfGroupToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfIEnumerableOfAssetTaxCalculation = {
  __typename?: 'ResultOfIEnumerableOfAssetTaxCalculation';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfAssetTaxCalculation>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<AssetTaxCalculation>>>;
};

export type ResultOfIEnumerableOfAssetTaxCalculationToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfIEnumerableOfAssetTaxPayment = {
  __typename?: 'ResultOfIEnumerableOfAssetTaxPayment';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfAssetTaxPayment>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<AssetTaxPayment>>>;
};

export type ResultOfIEnumerableOfAssetTaxPaymentToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfIEnumerableOfFileUrlOutput = {
  __typename?: 'ResultOfIEnumerableOfFileUrlOutput';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfFileUrlOutput>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<FileUrlOutput>>>;
};

export type ResultOfIEnumerableOfFileUrlOutputToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfIEnumerableOfTicket = {
  __typename?: 'ResultOfIEnumerableOfTicket';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfTicket>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Ticket>>>;
};

export type ResultOfIEnumerableOfTicketToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfIEnumerableOfTicketChecklist = {
  __typename?: 'ResultOfIEnumerableOfTicketChecklist';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIEnumerableOfTicketChecklist>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<TicketChecklist>>>;
};

export type ResultOfIEnumerableOfTicketChecklistToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimal = {
  __typename?: 'ResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimal';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimal>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<KeyValuePairOfEstateMarketValueTypeAndDecimal>>;
};

export type ResultOfIReadOnlyDictionaryOfEstateMarketValueTypeAndDecimalToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfInt32 = {
  __typename?: 'ResultOfInt32';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfInt32>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value: Scalars['Int']['output'];
};

export type ResultOfInt32ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfInterestRate = {
  __typename?: 'ResultOfInterestRate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfInterestRate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<InterestRate>;
};

export type ResultOfInterestRateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfInterventionType = {
  __typename?: 'ResultOfInterventionType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfInterventionType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<InterventionType>;
};

export type ResultOfInterventionTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfLegalSubject = {
  __typename?: 'ResultOfLegalSubject';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfLegalSubject>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<LegalSubject>;
};

export type ResultOfLegalSubjectToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfListOfFloorTemplate = {
  __typename?: 'ResultOfListOfFloorTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfListOfFloorTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<FloorTemplate>>>;
};

export type ResultOfListOfFloorTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfManagementSubject = {
  __typename?: 'ResultOfManagementSubject';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfManagementSubject>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ManagementSubject>;
};

export type ResultOfManagementSubjectToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfOperation = {
  __typename?: 'ResultOfOperation';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfOperation>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Operation>;
};

export type ResultOfOperationToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfOrgUnit = {
  __typename?: 'ResultOfOrgUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfOrgUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<OrgUnit>;
};

export type ResultOfOrgUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfPenalty = {
  __typename?: 'ResultOfPenalty';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPenalty>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Penalty>;
};

export type ResultOfPenaltyToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfPenalty__ = {
  __typename?: 'ResultOfPenalty__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPenalty__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Penalty>>>;
};

export type ResultOfPenalty__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfPhysicalSubject = {
  __typename?: 'ResultOfPhysicalSubject';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPhysicalSubject>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PhysicalSubject>;
};

export type ResultOfPhysicalSubjectToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfPriceList = {
  __typename?: 'ResultOfPriceList';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPriceList>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PriceList>;
};

export type ResultOfPriceListToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfPriceListArticle = {
  __typename?: 'ResultOfPriceListArticle';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPriceListArticle>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PriceListArticle>;
};

export type ResultOfPriceListArticleToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfPriceListMeasurementUnit = {
  __typename?: 'ResultOfPriceListMeasurementUnit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfPriceListMeasurementUnit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<PriceListMeasurementUnit>;
};

export type ResultOfPriceListMeasurementUnitToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfQualificationLevel = {
  __typename?: 'ResultOfQualificationLevel';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfQualificationLevel>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<QualificationLevel>;
};

export type ResultOfQualificationLevelToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfReading = {
  __typename?: 'ResultOfReading';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfReading>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Reading>;
};

export type ResultOfReadingToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfRegistrationOffice = {
  __typename?: 'ResultOfRegistrationOffice';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfRegistrationOffice>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<RegistrationOffice>;
};

export type ResultOfRegistrationOfficeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfRegistrationPayment = {
  __typename?: 'ResultOfRegistrationPayment';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfRegistrationPayment>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<RegistrationPayment>;
};

export type ResultOfRegistrationPaymentToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfSla = {
  __typename?: 'ResultOfSLA';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfSla>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Sla>;
};

export type ResultOfSlaToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfSla__ = {
  __typename?: 'ResultOfSLA__';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfSla__>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Array<Maybe<Sla>>>;
};

export type ResultOfSla__ToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfService = {
  __typename?: 'ResultOfService';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfService>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Service>;
};

export type ResultOfServiceToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfServiceCategory = {
  __typename?: 'ResultOfServiceCategory';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfServiceCategory>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<ServiceCategory>;
};

export type ResultOfServiceCategoryToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfTaxCredit = {
  __typename?: 'ResultOfTaxCredit';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTaxCredit>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TaxCredit>;
};

export type ResultOfTaxCreditToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfTicket = {
  __typename?: 'ResultOfTicket';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicket>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<Ticket>;
};

export type ResultOfTicketToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfTicketChecklist = {
  __typename?: 'ResultOfTicketChecklist';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicketChecklist>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TicketChecklist>;
};

export type ResultOfTicketChecklistToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfTicketChecklistTemplate = {
  __typename?: 'ResultOfTicketChecklistTemplate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicketChecklistTemplate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TicketChecklistTemplate>;
};

export type ResultOfTicketChecklistTemplateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfTicketType = {
  __typename?: 'ResultOfTicketType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfTicketType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<TicketType>;
};

export type ResultOfTicketTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfUser = {
  __typename?: 'ResultOfUser';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfUser>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<User>;
};

export type ResultOfUserToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfUtilityService = {
  __typename?: 'ResultOfUtilityService';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfUtilityService>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<UtilityService>;
};

export type ResultOfUtilityServiceToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfUtilityType = {
  __typename?: 'ResultOfUtilityType';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfUtilityType>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<UtilityType>;
};

export type ResultOfUtilityTypeToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfVatRate = {
  __typename?: 'ResultOfVATRate';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfVatRate>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<VatRate>;
};

export type ResultOfVatRateToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export type ResultOfWorkTeam = {
  __typename?: 'ResultOfWorkTeam';
  correlationId?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isSuccess: Scalars['Boolean']['output'];
  status: ResultStatus;
  successMessage?: Maybe<Scalars['String']['output']>;
  toPagedResult?: Maybe<PagedResultOfWorkTeam>;
  validationErrors?: Maybe<Array<Maybe<ValidationError>>>;
  value?: Maybe<WorkTeam>;
};

export type ResultOfWorkTeamToPagedResultArgs = {
  pagedInfo?: InputMaybe<PagedInfoInput>;
};

export enum ResultStatus {
  Conflict = 'CONFLICT',
  CriticalError = 'CRITICAL_ERROR',
  Error = 'ERROR',
  Forbidden = 'FORBIDDEN',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Ok = 'OK',
  Unauthorized = 'UNAUTHORIZED',
  Unavailable = 'UNAVAILABLE',
}

export type Revaluation = {
  __typename?: 'Revaluation';
  baseRevaluationRate?: Maybe<Scalars['Decimal']['output']>;
  isAbsoluteRevaluationApplied: Scalars['Boolean']['output'];
  isBackHistoryEnabled: Scalars['Boolean']['output'];
  isRevaluationCalculated: Scalars['Boolean']['output'];
  nextApplicationDate: Scalars['Date']['output'];
  rateType: RevaluationRateType;
  referencePeriodEnd: Scalars['Date']['output'];
  referencePeriodStart: Scalars['Date']['output'];
  revaluationPeriodMonths: Scalars['Int']['output'];
  revaluationSharePercent: Scalars['Decimal']['output'];
};

export type RevaluationData = {
  __typename?: 'RevaluationData';
  baseYear: Scalars['Int']['output'];
  countryISO3: Scalars['String']['output'];
  dataProvider: Scalars['UUID']['output'];
  id: Scalars['Int']['output'];
  month: Scalars['Int']['output'];
  revaluationIndex: Scalars['Decimal']['output'];
  year: Scalars['Int']['output'];
};

export type RevaluationDataFilterInput = {
  and?: InputMaybe<Array<RevaluationDataFilterInput>>;
  baseYear?: InputMaybe<IntOperationFilterInput>;
  countryISO3?: InputMaybe<CustomStringFilterInput>;
  dataProvider?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  month?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RevaluationDataFilterInput>>;
  revaluationIndex?: InputMaybe<DecimalOperationFilterInput>;
  year?: InputMaybe<IntOperationFilterInput>;
};

export type RevaluationDataQueries = {
  __typename?: 'RevaluationDataQueries';
  exportToExcel: FileUrlOutput;
  get?: Maybe<RevaluationData>;
  listRevaluationData?: Maybe<ListRevaluationDataConnection>;
};

export type RevaluationDataQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<RevaluationDataSortInput>>;
  where?: InputMaybe<RevaluationDataFilterInput>;
};

export type RevaluationDataQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type RevaluationDataQueriesListRevaluationDataArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<RevaluationDataSortInput>>;
  where?: InputMaybe<RevaluationDataFilterInput>;
};

export type RevaluationDataSortInput = {
  baseYear?: InputMaybe<SortEnumType>;
  countryISO3?: InputMaybe<SortEnumType>;
  dataProvider?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  month?: InputMaybe<SortEnumType>;
  revaluationIndex?: InputMaybe<SortEnumType>;
  year?: InputMaybe<SortEnumType>;
};

export type RevaluationFilterInput = {
  and?: InputMaybe<Array<RevaluationFilterInput>>;
  baseRevaluationRate?: InputMaybe<DecimalOperationFilterInput>;
  isAbsoluteRevaluationApplied?: InputMaybe<BooleanOperationFilterInput>;
  isBackHistoryEnabled?: InputMaybe<BooleanOperationFilterInput>;
  isRevaluationCalculated?: InputMaybe<BooleanOperationFilterInput>;
  nextApplicationDate?: InputMaybe<DateOperationFilterInput>;
  or?: InputMaybe<Array<RevaluationFilterInput>>;
  rateType?: InputMaybe<RevaluationRateTypeOperationFilterInput>;
  referencePeriodEnd?: InputMaybe<DateOperationFilterInput>;
  referencePeriodStart?: InputMaybe<DateOperationFilterInput>;
  revaluationPeriodMonths?: InputMaybe<IntOperationFilterInput>;
  revaluationSharePercent?: InputMaybe<DecimalOperationFilterInput>;
};

export type RevaluationHistory = {
  __typename?: 'RevaluationHistory';
  baseYearlyRate: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  indexPercent: Scalars['Decimal']['output'];
  revaluationAmount: Scalars['Decimal']['output'];
  since: Scalars['Date']['output'];
  yearlyRateWithRevaluation: Scalars['Decimal']['output'];
};

export type RevaluationHistoryFilterInput = {
  and?: InputMaybe<Array<RevaluationHistoryFilterInput>>;
  baseYearlyRate?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  indexPercent?: InputMaybe<DecimalOperationFilterInput>;
  or?: InputMaybe<Array<RevaluationHistoryFilterInput>>;
  revaluationAmount?: InputMaybe<DecimalOperationFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  yearlyRateWithRevaluation?: InputMaybe<DecimalOperationFilterInput>;
};

export type RevaluationInput = {
  baseRevaluationRate?: InputMaybe<Scalars['Decimal']['input']>;
  isAbsoluteRevaluationApplied: Scalars['Boolean']['input'];
  isBackHistoryEnabled: Scalars['Boolean']['input'];
  isRevaluationCalculated: Scalars['Boolean']['input'];
  nextApplicationDate: Scalars['Date']['input'];
  rateType: RevaluationRateType;
  referencePeriodEnd: Scalars['Date']['input'];
  referencePeriodStart: Scalars['Date']['input'];
  revaluationPeriodMonths: Scalars['Int']['input'];
  revaluationSharePercent: Scalars['Decimal']['input'];
};

export enum RevaluationRateType {
  ActualRate = 'ACTUAL_RATE',
  BaseRate = 'BASE_RATE',
  MultiyearRate = 'MULTIYEAR_RATE',
}

export type RevaluationRateTypeOperationFilterInput = {
  eq?: InputMaybe<RevaluationRateType>;
  in?: InputMaybe<Array<RevaluationRateType>>;
  neq?: InputMaybe<RevaluationRateType>;
  nin?: InputMaybe<Array<RevaluationRateType>>;
};

export type RevaluationSortInput = {
  baseRevaluationRate?: InputMaybe<SortEnumType>;
  isAbsoluteRevaluationApplied?: InputMaybe<SortEnumType>;
  isBackHistoryEnabled?: InputMaybe<SortEnumType>;
  isRevaluationCalculated?: InputMaybe<SortEnumType>;
  nextApplicationDate?: InputMaybe<SortEnumType>;
  rateType?: InputMaybe<SortEnumType>;
  referencePeriodEnd?: InputMaybe<SortEnumType>;
  referencePeriodStart?: InputMaybe<SortEnumType>;
  revaluationPeriodMonths?: InputMaybe<SortEnumType>;
  revaluationSharePercent?: InputMaybe<SortEnumType>;
};

export type Sla = {
  __typename?: 'SLA';
  contract?: Maybe<FcltContract>;
  description: Scalars['String']['output'];
  flatIfConditions: Array<TicketCondition>;
  flatThenConditions: Array<TicketCondition>;
  id: Scalars['Int']['output'];
  ifCondition: ComplexTicketCondition;
  internalCode: Scalars['String']['output'];
  thenCondition: ComplexTicketCondition;
};

export type SlaFilterInput = {
  and?: InputMaybe<Array<SlaFilterInput>>;
  contract?: InputMaybe<FcltContractFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  ifCondition?: InputMaybe<ComplexTicketConditionFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isAttachedToContract?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<SlaFilterInput>>;
  thenCondition?: InputMaybe<ComplexTicketConditionFilterInput>;
};

export type SlaInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  ifCondition: ComplexTicketConditionInput;
  internalCode: Scalars['String']['input'];
  thenCondition: ComplexTicketConditionInput;
};

export type SlaMutations = {
  __typename?: 'SLAMutations';
  addRange: ResultOfSla__;
  delete: Result;
  deleteRange: Result;
  update: ResultOfSla;
};

export type SlaMutationsAddRangeArgs = {
  inputs: Array<SlaInput>;
};

export type SlaMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type SlaMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type SlaMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: SlaInput;
};

export type SlaQueries = {
  __typename?: 'SLAQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<Sla>;
  listSLAs?: Maybe<ListSlAsConnection>;
  listSLAsFull: Array<Sla>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type SlaQueriesCanUseInternalCodeArgs = {
  currentSLAId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type SlaQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<SlaSortInput>>;
  where?: InputMaybe<SlaFilterInput>;
};

export type SlaQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type SlaQueriesListSlAsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SlaSortInput>>;
  where?: InputMaybe<SlaFilterInput>;
};

export type SlaQueriesListSlAsFullArgs = {
  order?: InputMaybe<Array<SlaSortInput>>;
  where?: InputMaybe<SlaFilterInput>;
};

export type SlaQueriesProposeNewInternalCodeArgs = {
  additionallyOccupiedCodes: Array<Scalars['String']['input']>;
  contractInternalCode?: InputMaybe<Scalars['String']['input']>;
};

export type SlaSortInput = {
  contract?: InputMaybe<FcltContractSortInput>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  ifCondition?: InputMaybe<ComplexTicketConditionSortInput>;
  internalCode?: InputMaybe<SortEnumType>;
  thenCondition?: InputMaybe<ComplexTicketConditionSortInput>;
};

export type SecurityDeposit = {
  __typename?: 'SecurityDeposit';
  bankAccountId?: Maybe<Scalars['Int']['output']>;
  baseAmount: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  interestCalculationEndDate?: Maybe<Scalars['Date']['output']>;
  interestCalculationStartDate?: Maybe<Scalars['Date']['output']>;
  interestRows: Array<SecurityDepositInterestRow>;
  isInterestCalculated: Scalars['Boolean']['output'];
  isSuretyRenewable: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  since?: Maybe<Scalars['Date']['output']>;
  subject?: Maybe<ISubject>;
  subjectId?: Maybe<Scalars['Int']['output']>;
  suretySubject?: Maybe<ISubject>;
  suretySubjectId?: Maybe<Scalars['Int']['output']>;
  takeoverDate?: Maybe<Scalars['Date']['output']>;
  type: SecurityDepositType;
  until?: Maybe<Scalars['Date']['output']>;
};

export type SecurityDepositFilterInput = {
  and?: InputMaybe<Array<SecurityDepositFilterInput>>;
  bankAccountId?: InputMaybe<IntOperationFilterInput>;
  baseAmount?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  interestCalculationEndDate?: InputMaybe<DateOperationFilterInput>;
  interestCalculationStartDate?: InputMaybe<DateOperationFilterInput>;
  interestRows?: InputMaybe<ListFilterInputTypeOfSecurityDepositInterestRowFilterInput>;
  isInterestCalculated?: InputMaybe<BooleanOperationFilterInput>;
  isSuretyRenewable?: InputMaybe<BooleanOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<SecurityDepositFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  subjectId?: InputMaybe<IntOperationFilterInput>;
  suretySubjectId?: InputMaybe<IntOperationFilterInput>;
  takeoverDate?: InputMaybe<DateOperationFilterInput>;
  type?: InputMaybe<SecurityDepositTypeOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type SecurityDepositInput = {
  bankAccountId?: InputMaybe<Scalars['Int']['input']>;
  baseAmount: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  interestCalculationStartDate?: InputMaybe<Scalars['Date']['input']>;
  isInterestCalculated: Scalars['Boolean']['input'];
  isSuretyRenewable: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  since?: InputMaybe<Scalars['Date']['input']>;
  subjectId?: InputMaybe<Scalars['Int']['input']>;
  suretySubjectId?: InputMaybe<Scalars['Int']['input']>;
  takeoverDate?: InputMaybe<Scalars['Date']['input']>;
  type: SecurityDepositType;
  until?: InputMaybe<Scalars['Date']['input']>;
};

export type SecurityDepositInterestRow = {
  __typename?: 'SecurityDepositInterestRow';
  appliedInterestRate: Scalars['Decimal']['output'];
  baseAmount: Scalars['Decimal']['output'];
  calculationDate: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  interestAmount: Scalars['Decimal']['output'];
  since?: Maybe<Scalars['Date']['output']>;
  until?: Maybe<Scalars['Date']['output']>;
};

export type SecurityDepositInterestRowFilterInput = {
  and?: InputMaybe<Array<SecurityDepositInterestRowFilterInput>>;
  appliedInterestRate?: InputMaybe<DecimalOperationFilterInput>;
  baseAmount?: InputMaybe<DecimalOperationFilterInput>;
  calculationDate?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  interestAmount?: InputMaybe<DecimalOperationFilterInput>;
  or?: InputMaybe<Array<SecurityDepositInterestRowFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export enum SecurityDepositType {
  BankAccount = 'BANK_ACCOUNT',
  BankSurety = 'BANK_SURETY',
  Cash = 'CASH',
  InsuranceSurety = 'INSURANCE_SURETY',
}

export type SecurityDepositTypeOperationFilterInput = {
  eq?: InputMaybe<SecurityDepositType>;
  in?: InputMaybe<Array<SecurityDepositType>>;
  neq?: InputMaybe<SecurityDepositType>;
  nin?: InputMaybe<Array<SecurityDepositType>>;
};

export type Service = {
  __typename?: 'Service';
  activities: Array<ServiceActivity>;
  category: ServiceCategory;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subCategory: ServiceSubCategory;
};

export type ServiceActivity = {
  __typename?: 'ServiceActivity';
  activityType: ServiceActivityType;
  id: Scalars['Int']['output'];
  isMandatoryByLaw: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: Service;
};

export type ServiceActivityFilterInput = {
  activityType?: InputMaybe<ServiceActivityTypeOperationFilterInput>;
  and?: InputMaybe<Array<ServiceActivityFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  isMandatoryByLaw?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ServiceActivityFilterInput>>;
  type?: InputMaybe<ServiceFilterInput>;
};

export type ServiceActivityInput = {
  activityType: ServiceActivityType;
  id?: InputMaybe<Scalars['Int']['input']>;
  isMandatoryByLaw: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceActivitySortInput = {
  activityType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isMandatoryByLaw?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  type?: InputMaybe<ServiceSortInput>;
};

export enum ServiceActivityType {
  OnIncident = 'ON_INCIDENT',
  PlannedMaintenance = 'PLANNED_MAINTENANCE',
}

export type ServiceActivityTypeOperationFilterInput = {
  eq?: InputMaybe<ServiceActivityType>;
  in?: InputMaybe<Array<ServiceActivityType>>;
  neq?: InputMaybe<ServiceActivityType>;
  nin?: InputMaybe<Array<ServiceActivityType>>;
};

export type ServiceCategory = {
  __typename?: 'ServiceCategory';
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  services: Array<Service>;
  subCategories: Array<ServiceSubCategory>;
};

export type ServiceCategoryFilterInput = {
  and?: InputMaybe<Array<ServiceCategoryFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ServiceCategoryFilterInput>>;
  services?: InputMaybe<ListFilterInputTypeOfServiceFilterInput>;
  subCategories?: InputMaybe<ListFilterInputTypeOfServiceSubCategoryFilterInput>;
};

export type ServiceCategoryInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subCategories: Array<ServiceSubCategoryInput>;
};

export type ServiceCategoryMutations = {
  __typename?: 'ServiceCategoryMutations';
  add: ResultOfServiceCategory;
  delete: Result;
  deleteRange: Result;
  update: ResultOfServiceCategory;
};

export type ServiceCategoryMutationsAddArgs = {
  input: ServiceCategoryInput;
};

export type ServiceCategoryMutationsDeleteArgs = {
  serviceCategoryId: Scalars['Int']['input'];
};

export type ServiceCategoryMutationsDeleteRangeArgs = {
  serviceCategoryIds: Array<Scalars['Int']['input']>;
};

export type ServiceCategoryMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ServiceCategoryInput;
};

export type ServiceCategoryQueries = {
  __typename?: 'ServiceCategoryQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  canUseInternalCodeSubCategory: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<ServiceCategory>;
  listServiceCategories?: Maybe<ListServiceCategoriesConnection>;
  listServiceSubCategories?: Maybe<ListServiceSubCategoriesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  proposeNewInternalCodeSubCategory?: Maybe<Scalars['String']['output']>;
};

export type ServiceCategoryQueriesCanUseInternalCodeArgs = {
  currentServiceCategoryId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type ServiceCategoryQueriesCanUseInternalCodeSubCategoryArgs = {
  currentServiceSubCategoryId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  serviceCategoryId?: InputMaybe<Scalars['Int']['input']>;
};

export type ServiceCategoryQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<ServiceCategorySortInput>>;
  where?: InputMaybe<ServiceCategoryFilterInput>;
};

export type ServiceCategoryQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type ServiceCategoryQueriesListServiceCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ServiceCategorySortInput>>;
  where?: InputMaybe<ServiceCategoryFilterInput>;
};

export type ServiceCategoryQueriesListServiceSubCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ServiceSubCategorySortInput>>;
  serviceCategoryId?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ServiceSubCategoryFilterInput>;
};

export type ServiceCategoryQueriesProposeNewInternalCodeSubCategoryArgs = {
  additionallyOccupiedCodes: Array<Scalars['String']['input']>;
  parentInternalCode: Scalars['String']['input'];
};

export type ServiceCategorySortInput = {
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type ServiceFilterInput = {
  activities?: InputMaybe<ListFilterInputTypeOfServiceActivityFilterInput>;
  and?: InputMaybe<Array<ServiceFilterInput>>;
  category?: InputMaybe<ServiceCategoryFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ServiceFilterInput>>;
  subCategory?: InputMaybe<ServiceSubCategoryFilterInput>;
};

export type ServiceInput = {
  activities: Array<ServiceActivityInput>;
  categoryId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  subCategoryId: Scalars['Int']['input'];
};

export type ServiceMutations = {
  __typename?: 'ServiceMutations';
  add: ResultOfService;
  delete: Result;
  deleteRange: Result;
  update: ResultOfService;
};

export type ServiceMutationsAddArgs = {
  input: ServiceInput;
};

export type ServiceMutationsDeleteArgs = {
  serviceId: Scalars['Int']['input'];
};

export type ServiceMutationsDeleteRangeArgs = {
  serviceIds: Array<Scalars['Int']['input']>;
};

export type ServiceMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: ServiceInput;
};

export type ServiceQueries = {
  __typename?: 'ServiceQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<Service>;
  listServiceActivity?: Maybe<ListServiceActivityConnection>;
  listServices?: Maybe<ListServicesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type ServiceQueriesCanUseInternalCodeArgs = {
  currentServiceId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type ServiceQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<ServiceSortInput>>;
  where?: InputMaybe<ServiceFilterInput>;
};

export type ServiceQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type ServiceQueriesListServiceActivityArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ServiceActivitySortInput>>;
  serviceId?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ServiceActivityFilterInput>;
};

export type ServiceQueriesListServicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ServiceSortInput>>;
  where?: InputMaybe<ServiceFilterInput>;
};

export type ServiceSortInput = {
  category?: InputMaybe<ServiceCategorySortInput>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  subCategory?: InputMaybe<ServiceSubCategorySortInput>;
};

export type ServiceSubCategory = {
  __typename?: 'ServiceSubCategory';
  category: ServiceCategory;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  services: Array<Service>;
};

export type ServiceSubCategoryFilterInput = {
  and?: InputMaybe<Array<ServiceSubCategoryFilterInput>>;
  category?: InputMaybe<ServiceCategoryFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<ServiceSubCategoryFilterInput>>;
  services?: InputMaybe<ListFilterInputTypeOfServiceFilterInput>;
};

export type ServiceSubCategoryInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceSubCategorySortInput = {
  category?: InputMaybe<ServiceCategorySortInput>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type Session = {
  __typename?: 'Session';
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastRefreshIPAddress?: Maybe<Scalars['String']['output']>;
  lastRefreshLocation?: Maybe<Scalars['String']['output']>;
  lastRefreshUserAgent?: Maybe<Scalars['String']['output']>;
  loginIPAddress?: Maybe<Scalars['String']['output']>;
  loginLocation?: Maybe<Scalars['String']['output']>;
  loginUserAgent?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiration: Scalars['DateTime']['output'];
};

export type SessionFilterInput = {
  and?: InputMaybe<Array<SessionFilterInput>>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastRefreshIPAddress?: InputMaybe<CustomStringFilterInput>;
  lastRefreshLocation?: InputMaybe<CustomStringFilterInput>;
  lastRefreshUserAgent?: InputMaybe<CustomStringFilterInput>;
  loginIPAddress?: InputMaybe<CustomStringFilterInput>;
  loginLocation?: InputMaybe<CustomStringFilterInput>;
  loginUserAgent?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<SessionFilterInput>>;
  refreshTokenExpiration?: InputMaybe<DateTimeOperationFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Stair = {
  __typename?: 'Stair';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type StairFilterInput = {
  and?: InputMaybe<Array<StairFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<StairFilterInput>>;
};

export type StairInput = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type StairSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
};

export enum SubValueType {
  Boolean = 'BOOLEAN',
  City = 'CITY',
  Currency = 'CURRENCY',
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING',
}

export type Subject = LegalSubject | ManagementSubject | PhysicalSubject;

export type SubjectCategory = {
  __typename?: 'SubjectCategory';
  creationDate: Scalars['DateTime']['output'];
  function: CategoryFunctionFlags;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  subjects: Array<Subject>;
};

export type SubjectCategoryFilterInput = {
  and?: InputMaybe<Array<SubjectCategoryFilterInput>>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  function?: InputMaybe<CategoryFunctionOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<SubjectCategoryFilterInput>>;
};

export type SubjectCategoryQueries = {
  __typename?: 'SubjectCategoryQueries';
  allSubjectCategories: Array<SubjectCategory>;
  listSubjectCategories?: Maybe<ListSubjectCategoriesConnection>;
  subjectCategory?: Maybe<SubjectCategory>;
};

export type SubjectCategoryQueriesAllSubjectCategoriesArgs = {
  order?: InputMaybe<Array<SubjectCategorySortInput>>;
  where?: InputMaybe<SubjectCategoryFilterInput>;
};

export type SubjectCategoryQueriesListSubjectCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SubjectCategorySortInput>>;
  where?: InputMaybe<SubjectCategoryFilterInput>;
};

export type SubjectCategoryQueriesSubjectCategoryArgs = {
  subjectCategoryId: Scalars['Int']['input'];
};

export type SubjectCategorySortInput = {
  creationDate?: InputMaybe<SortEnumType>;
  function?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type SubjectDocumentExpiredNotification = DocumentExpiredNotification &
  Notification & {
    __typename?: 'SubjectDocumentExpiredNotification';
    documentCmisId: Scalars['String']['output'];
    entityId: Scalars['Int']['output'];
    id: Scalars['Int']['output'];
    status: NotificationStatus;
    timestamp: Scalars['DateTime']['output'];
    username: Scalars['String']['output'];
  };

export type SubjectDocumentMutations = {
  __typename?: 'SubjectDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: ResultOfDocument__;
  update: ResultOfDocument;
};

export type SubjectDocumentMutationsAddRangeArgs = {
  inputs: Array<DocumentInput>;
  subjectId: Scalars['Int']['input'];
};

export type SubjectDocumentMutationsDeleteRangeArgs = {
  cmisIds: Array<Scalars['String']['input']>;
  subjectId: Scalars['Int']['input'];
};

export type SubjectDocumentMutationsUpdateArgs = {
  input: DocumentInput;
  subjectId: Scalars['Int']['input'];
};

/** A connection to a list of items. */
export type SubjectDocumentsConnection = {
  __typename?: 'SubjectDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SubjectDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<SubjectDocumentsOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SubjectDocumentsEdge = {
  __typename?: 'SubjectDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: SubjectDocumentsOutput;
};

export type SubjectDocumentsFlatOutputFilterInput = {
  and?: InputMaybe<Array<SubjectDocumentsFlatOutputFilterInput>>;
  document?: InputMaybe<DocumentFilterInput>;
  or?: InputMaybe<Array<SubjectDocumentsFlatOutputFilterInput>>;
  subjectInternalCode?: InputMaybe<CustomStringFilterInput>;
  subjectName?: InputMaybe<CustomStringFilterInput>;
};

export type SubjectDocumentsOutput = {
  __typename?: 'SubjectDocumentsOutput';
  guid: Scalars['UUID']['output'];
  subRows: Array<Document>;
  subjectInternalCode: Scalars['String']['output'];
  subjectName: Scalars['String']['output'];
};

export type SubjectDocumentsOutputSortInput = {
  guid?: InputMaybe<SortEnumType>;
  subjectInternalCode?: InputMaybe<SortEnumType>;
  subjectName?: InputMaybe<SortEnumType>;
};

export type SubjectFilterInput = {
  additionalGovIdCode?: InputMaybe<CustomStringFilterInput>;
  additionalTaxIdCode?: InputMaybe<CustomStringFilterInput>;
  addresses?: InputMaybe<ListAddressFilterTypeFilterInput>;
  and?: InputMaybe<Array<SubjectFilterInput>>;
  bankAccounts?: InputMaybe<ListFilterInputTypeOfBankAccountFilterInput>;
  bankingId1?: InputMaybe<CustomStringFilterInput>;
  bankingId2?: InputMaybe<CustomStringFilterInput>;
  baseCountryISO?: InputMaybe<CustomStringFilterInput>;
  baseCountryTaxIdCode?: InputMaybe<CustomStringFilterInput>;
  birthCountryTaxIdCode?: InputMaybe<CustomStringFilterInput>;
  birthDate?: InputMaybe<DateOperationFilterInput>;
  birthSex?: InputMaybe<NullableOfBirthSexOperationFilterInput>;
  businessStart?: InputMaybe<DateOperationFilterInput>;
  categories?: InputMaybe<ListFilterInputTypeOfSubjectCategoryFilterInput>;
  closureDate?: InputMaybe<DateTimeOperationFilterInput>;
  companiesHouseIdCode?: InputMaybe<CustomStringFilterInput>;
  contacts?: InputMaybe<ListContactFilterTypeFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  customGender?: InputMaybe<IntOperationFilterInput>;
  customPersonType?: InputMaybe<IntOperationFilterInput>;
  customSubjectStatus?: InputMaybe<IntOperationFilterInput>;
  deathDate?: InputMaybe<DateOperationFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  entryStatus?: InputMaybe<EntryStatusOperationFilterInput>;
  externalSourceCode?: InputMaybe<CustomStringFilterInput>;
  firstName?: InputMaybe<CustomStringFilterInput>;
  fullName?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  interGroupSignature?: InputMaybe<CustomStringFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  lastName?: InputMaybe<CustomStringFilterInput>;
  legalResidentialAddress?: InputMaybe<IAddressFilterInput>;
  legalSubjectType?: InputMaybe<LegalSubjectTypeOperationFilterInput>;
  location?: InputMaybe<CustomStringFilterInput>;
  managementCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<SubjectFilterInput>>;
  orgUnits?: InputMaybe<ListOrgUnitFilterTypeFilterInput>;
  personType?: InputMaybe<PersonTypeOperationFilterInput>;
  professionalTaxIdCode?: InputMaybe<CustomStringFilterInput>;
  relationMains?: InputMaybe<ListSubjectRelationFilterTypeFilterInput>;
  relationSubordinates?: InputMaybe<ListSubjectRelationFilterTypeFilterInput>;
  shareCapital?: InputMaybe<DecimalOperationFilterInput>;
  shorthandDescription?: InputMaybe<CustomStringFilterInput>;
  taxStatuses?: InputMaybe<ListFilterInputTypeOfTaxStatusFilterInput>;
};

export type SubjectMutations = {
  __typename?: 'SubjectMutations';
  addHeirs: ResultOfPhysicalSubject;
  addLegalSubject: ResultOfLegalSubject;
  addManagementSubject: ResultOfManagementSubject;
  addPhysicalSubject: ResultOfPhysicalSubject;
  delete: Result;
  deleteByIds: Result;
  document: SubjectDocumentMutations;
  updateLegalSubject: ResultOfLegalSubject;
  updateManagementSubject: ResultOfManagementSubject;
  updatePhysicalSubject: ResultOfPhysicalSubject;
};

export type SubjectMutationsAddHeirsArgs = {
  heirs: Array<HeirInput>;
  subjectId: Scalars['Int']['input'];
};

export type SubjectMutationsAddLegalSubjectArgs = {
  input: LegalSubjectInput;
};

export type SubjectMutationsAddManagementSubjectArgs = {
  input: ManagementSubjectInput;
};

export type SubjectMutationsAddPhysicalSubjectArgs = {
  input: PhysicalSubjectInput;
};

export type SubjectMutationsDeleteArgs = {
  subjectId: Scalars['Int']['input'];
};

export type SubjectMutationsDeleteByIdsArgs = {
  subjectIds: Array<Scalars['Int']['input']>;
};

export type SubjectMutationsUpdateLegalSubjectArgs = {
  input: LegalSubjectInput;
};

export type SubjectMutationsUpdateManagementSubjectArgs = {
  input: ManagementSubjectInput;
};

export type SubjectMutationsUpdatePhysicalSubjectArgs = {
  input: PhysicalSubjectInput;
};

export type SubjectQueries = {
  __typename?: 'SubjectQueries';
  canBeGroupLeader: Scalars['Boolean']['output'];
  canUseInterGroupSignature: Scalars['Boolean']['output'];
  canUseInternalCode: Scalars['Boolean']['output'];
  checkItalianTaxID: Scalars['Boolean']['output'];
  exportSubjectsToExcel: FileUrlOutput;
  listSubjects?: Maybe<ListSubjectsConnection>;
  listSubjectsFull: Array<ISubject>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<ISubject>;
};

export type SubjectQueriesCanBeGroupLeaderArgs = {
  managementSubjectId: Scalars['Int']['input'];
  subjectId?: InputMaybe<Scalars['Int']['input']>;
};

export type SubjectQueriesCanUseInterGroupSignatureArgs = {
  companyGroupId: Scalars['Int']['input'];
  currentSubjectId?: InputMaybe<Scalars['Int']['input']>;
  signature: Scalars['String']['input'];
};

export type SubjectQueriesCanUseInternalCodeArgs = {
  currentSubjectId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type SubjectQueriesCheckItalianTaxIdArgs = {
  birthDate: Scalars['Date']['input'];
  cityIstatCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  taxId: Scalars['String']['input'];
};

export type SubjectQueriesExportSubjectsToExcelArgs = {
  order?: InputMaybe<Array<SubjectSortInput>>;
  where?: InputMaybe<SubjectFilterInput>;
};

export type SubjectQueriesListSubjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SubjectSortInput>>;
  where?: InputMaybe<SubjectFilterInput>;
};

export type SubjectQueriesListSubjectsFullArgs = {
  order?: InputMaybe<Array<SubjectSortInput>>;
  where?: InputMaybe<SubjectFilterInput>;
};

export type SubjectQueriesSubjectArgs = {
  subjectId: Scalars['Int']['input'];
};

export type SubjectRelation = {
  __typename?: 'SubjectRelation';
  creationDate: Scalars['DateTime']['output'];
  groupRelationType?: Maybe<CompanyGroup>;
  id: Scalars['Int']['output'];
  main: ISubject;
  mainId: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  officerRelationType?: Maybe<OfficerType>;
  relationType: SubjectRelationType;
  since?: Maybe<Scalars['Date']['output']>;
  subordinate: ISubject;
  subordinateId: Scalars['Int']['output'];
  until?: Maybe<Scalars['Date']['output']>;
};

export type SubjectRelationFilterInput = {
  and?: InputMaybe<Array<SubjectRelationFilterInput>>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  groupRelationType?: InputMaybe<NullableOfCompanyGroupOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  main?: InputMaybe<SubjectFilterInput>;
  mainId?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  officerRelationType?: InputMaybe<NullableOfOfficerTypeOperationFilterInput>;
  or?: InputMaybe<Array<SubjectRelationFilterInput>>;
  relationType?: InputMaybe<SubjectRelationTypeOperationFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  subordinate?: InputMaybe<SubjectFilterInput>;
  subordinateId?: InputMaybe<IntOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type SubjectRelationSortInput = {
  creationDate?: InputMaybe<SortEnumType>;
  groupRelationType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  main?: InputMaybe<SubjectSortInput>;
  mainId?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  officerRelationType?: InputMaybe<SortEnumType>;
  relationType?: InputMaybe<SortEnumType>;
  since?: InputMaybe<SortEnumType>;
  subordinate?: InputMaybe<SubjectSortInput>;
  subordinateId?: InputMaybe<SortEnumType>;
  until?: InputMaybe<SortEnumType>;
};

export enum SubjectRelationType {
  CompanyGroup = 'COMPANY_GROUP',
  Heir = 'HEIR',
  ManagementEntityOwned = 'MANAGEMENT_ENTITY_OWNED',
  Officer = 'OFFICER',
  SubOrganization = 'SUB_ORGANIZATION',
}

export type SubjectRelationTypeOperationFilterInput = {
  eq?: InputMaybe<SubjectRelationType>;
  in?: InputMaybe<Array<SubjectRelationType>>;
  neq?: InputMaybe<SubjectRelationType>;
  nin?: InputMaybe<Array<SubjectRelationType>>;
};

export type SubjectSortInput = {
  additionalGovIdCode?: InputMaybe<SortEnumType>;
  additionalTaxIdCode?: InputMaybe<SortEnumType>;
  bankingId1?: InputMaybe<SortEnumType>;
  bankingId2?: InputMaybe<SortEnumType>;
  baseCountryISO?: InputMaybe<SortEnumType>;
  baseCountryTaxIdCode?: InputMaybe<SortEnumType>;
  birthCountryTaxIdCode?: InputMaybe<SortEnumType>;
  birthDate?: InputMaybe<SortEnumType>;
  birthLocation?: InputMaybe<AddressSortInput>;
  birthSex?: InputMaybe<SortEnumType>;
  businessStart?: InputMaybe<SortEnumType>;
  closureDate?: InputMaybe<SortEnumType>;
  companiesHouseIdCode?: InputMaybe<SortEnumType>;
  companyGroupParent?: InputMaybe<SubjectRelationSortInput>;
  creationDate?: InputMaybe<SortEnumType>;
  customGender?: InputMaybe<SortEnumType>;
  customPersonType?: InputMaybe<SortEnumType>;
  customSubjectStatus?: InputMaybe<SortEnumType>;
  deathDate?: InputMaybe<SortEnumType>;
  deletionDate?: InputMaybe<SortEnumType>;
  entryStatus?: InputMaybe<SortEnumType>;
  externalSourceCode?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  interGroupSignature?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  legalResidentialAddress?: InputMaybe<IAddressSortInput>;
  legalSubjectType?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  managementCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  personType?: InputMaybe<SortEnumType>;
  professionalTaxIdCode?: InputMaybe<SortEnumType>;
  shareCapital?: InputMaybe<SortEnumType>;
  shorthandDescription?: InputMaybe<SortEnumType>;
};

export type SublocatedContractInput = {
  anytimeTerminationWarningMonths?: InputMaybe<Scalars['Int']['input']>;
  firstTermDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  firstTermExpirationDate?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['Int']['input'];
  nonRenewalWarningMonths?: InputMaybe<Scalars['Int']['input']>;
  secondTermDurationMonths?: InputMaybe<Scalars['Int']['input']>;
  secondTermExpirationDate?: InputMaybe<Scalars['Date']['input']>;
  terminationDate?: InputMaybe<Scalars['Date']['input']>;
  terminator?: InputMaybe<ContractTerminator>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notifyUser: Notification;
};

export enum SurfaceMeasurementMetric {
  Rooms = 'ROOMS',
  SquareMetreGrossNormal = 'SQUARE_METRE_GROSS_NORMAL',
  SquareMetreHeatingCooling = 'SQUARE_METRE_HEATING_COOLING',
  SquareMetreNetLowCeiling = 'SQUARE_METRE_NET_LOW_CEILING',
  SquareMetreNetNormal = 'SQUARE_METRE_NET_NORMAL',
}

export type SurfaceMeasurementMetricOperationFilterInput = {
  eq?: InputMaybe<SurfaceMeasurementMetric>;
  in?: InputMaybe<Array<SurfaceMeasurementMetric>>;
  neq?: InputMaybe<SurfaceMeasurementMetric>;
  nin?: InputMaybe<Array<SurfaceMeasurementMetric>>;
};

export enum SurfaceType {
  CommonArea = 'COMMON_AREA',
  MainArea = 'MAIN_AREA',
  SideArea = 'SIDE_AREA',
}

export type SurfaceTypeOperationFilterInput = {
  eq?: InputMaybe<SurfaceType>;
  in?: InputMaybe<Array<SurfaceType>>;
  neq?: InputMaybe<SurfaceType>;
  nin?: InputMaybe<Array<SurfaceType>>;
};

export type SwitchTenantInput = {
  newTenant: Scalars['UUID']['input'];
};

export type Table = {
  __typename?: 'Table';
  canAddRemoveRows: Scalars['Boolean']['output'];
  code: Scalars['String']['output'];
  columns: Array<Column>;
  grouping: RateAreaType;
  parameters: Array<Scalars['String']['output']>;
};

export type Takeover = {
  __typename?: 'Takeover';
  effectiveDate: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  legalRepresentativeSubject?: Maybe<ISubject>;
  legalRepresentativeSubjectId?: Maybe<Scalars['Int']['output']>;
  newSubject: ISubject;
  newSubjectId: Scalars['Int']['output'];
  originalSubject: ISubject;
  originalSubjectId: Scalars['Int']['output'];
  takeoverDate: Scalars['Date']['output'];
  type: TakeoverType;
};

export type TakeoverFilterInput = {
  and?: InputMaybe<Array<TakeoverFilterInput>>;
  effectiveDate?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  legalRepresentativeSubjectId?: InputMaybe<IntOperationFilterInput>;
  newSubjectId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<TakeoverFilterInput>>;
  originalSubjectId?: InputMaybe<IntOperationFilterInput>;
  takeoverDate?: InputMaybe<DateOperationFilterInput>;
  type?: InputMaybe<TakeoverTypeOperationFilterInput>;
};

export enum TakeoverType {
  ItaT1Demise = 'ITA_T1_DEMISE',
  ItaT2RightsTransfer = 'ITA_T2_RIGHTS_TRANSFER',
  ItaT3CompanyTransformation = 'ITA_T3_COMPANY_TRANSFORMATION',
  ItaT4CompanyMerger = 'ITA_T4_COMPANY_MERGER',
  ItaT5CompanySplit = 'ITA_T5_COMPANY_SPLIT',
  ItaT6Others = 'ITA_T6_OTHERS',
}

export type TakeoverTypeOperationFilterInput = {
  eq?: InputMaybe<TakeoverType>;
  in?: InputMaybe<Array<TakeoverType>>;
  neq?: InputMaybe<TakeoverType>;
  nin?: InputMaybe<Array<TakeoverType>>;
};

export type TaxCalculator = {
  __typename?: 'TaxCalculator';
  configuration: ITaxConfiguration;
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
};

export type TaxCalculatorName = {
  __typename?: 'TaxCalculatorName';
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
};

export type TaxConfigCoefficientSubTableRow = {
  __typename?: 'TaxConfigCoefficientSubTableRow';
  coefficient?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  referenceYear: Scalars['String']['output'];
};

export type TaxConfigColumn = {
  __typename?: 'TaxConfigColumn';
  booleanValue?: Maybe<Scalars['Boolean']['output']>;
  dateValue?: Maybe<Scalars['Date']['output']>;
  key: Scalars['String']['output'];
  numberValue?: Maybe<Scalars['Decimal']['output']>;
  stringValue?: Maybe<Scalars['String']['output']>;
  type: SubValueType;
};

export type TaxConfigGenericRow = {
  __typename?: 'TaxConfigGenericRow';
  id: Scalars['Int']['output'];
  otherColumns: Array<TaxConfigColumn>;
  year: Scalars['Int']['output'];
};

export type TaxConfigGroupedRow = {
  __typename?: 'TaxConfigGroupedRow';
  city?: Maybe<City>;
  grouping: RateAreaType;
  groupingName?: Maybe<Scalars['String']['output']>;
  groupingReference?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['Int']['output'];
  otherColumns: Array<TaxConfigColumn>;
  year: Scalars['Int']['output'];
};

export type TaxConfigInput = {
  columnValues?: InputMaybe<Array<TaxConfigSubValueColumnInput>>;
  subValues?: InputMaybe<Array<TaxConfigSubValueRowInput>>;
};

export type TaxConfigMainTableRow = TaxConfigGenericRow | TaxConfigGroupedRow;

export type TaxConfigMutations = {
  __typename?: 'TaxConfigMutations';
  addSubTableValue: Result;
  addTableValue: Result;
  deleteSubTableValue: Result;
  deleteSubTableValueRange: Result;
  deleteTableValue: Result;
  deleteTableValueRange: Result;
  updateSubTableValue: Result;
  updateTableValue: Result;
};

export type TaxConfigMutationsAddSubTableValueArgs = {
  calculatorId: Scalars['UUID']['input'];
  groupReference?: InputMaybe<Scalars['UUID']['input']>;
  input: TaxConfigSubValueRowInput;
  tableCode: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type TaxConfigMutationsAddTableValueArgs = {
  calculatorId: Scalars['UUID']['input'];
  input: TaxConfigInput;
  tableCode: Scalars['String']['input'];
};

export type TaxConfigMutationsDeleteSubTableValueArgs = {
  calculatorId: Scalars['UUID']['input'];
  groupReference?: InputMaybe<Scalars['UUID']['input']>;
  subTableValueId: Scalars['Int']['input'];
  tableCode: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type TaxConfigMutationsDeleteSubTableValueRangeArgs = {
  calculatorId: Scalars['UUID']['input'];
  groupReference?: InputMaybe<Scalars['UUID']['input']>;
  subTableValueIds: Array<Scalars['Int']['input']>;
  tableCode: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type TaxConfigMutationsDeleteTableValueArgs = {
  calculatorId: Scalars['UUID']['input'];
  tableValueId: Scalars['Int']['input'];
};

export type TaxConfigMutationsDeleteTableValueRangeArgs = {
  calculatorId: Scalars['UUID']['input'];
  tableValueIds: Array<Scalars['Int']['input']>;
};

export type TaxConfigMutationsUpdateSubTableValueArgs = {
  calculatorId: Scalars['UUID']['input'];
  groupReference?: InputMaybe<Scalars['UUID']['input']>;
  input: TaxConfigSubValueRowInput;
  subTableValueId: Scalars['Int']['input'];
  tableCode: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type TaxConfigMutationsUpdateTableValueArgs = {
  calculatorId: Scalars['UUID']['input'];
  input: TaxConfigInput;
  tableCode: Scalars['String']['input'];
  tableValueId: Scalars['Int']['input'];
};

export type TaxConfigQueries = {
  __typename?: 'TaxConfigQueries';
  availableCalculators: Array<TaxCalculator>;
  checkTableValueExists: Scalars['Boolean']['output'];
  exportToExcelMainTable: FileUrlOutput;
  exportToExcelSubTables: FileUrlOutput;
  historyAvailableCalculators: Array<TaxCalculatorName>;
  listSubTableValue?: Maybe<ListSubTableValueConnection>;
  listSubTableValueFull: Array<TaxConfigSubTableRow>;
  listTableValues?: Maybe<ListTableValuesConnection>;
  tableValue?: Maybe<TaxConfigMainTableRow>;
  tableValueBundle?: Maybe<TaxConfigValueBundle>;
};

export type TaxConfigQueriesCheckTableValueExistsArgs = {
  calculatorId: Scalars['UUID']['input'];
  groupingReference?: InputMaybe<Scalars['UUID']['input']>;
  tableCode: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type TaxConfigQueriesExportToExcelMainTableArgs = {
  calculatorId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<ITaxConfigMainTableRowSortInput>>;
  tableCode: Scalars['String']['input'];
  where?: InputMaybe<ITaxConfigMainTableRowFilterInput>;
};

export type TaxConfigQueriesExportToExcelSubTablesArgs = {
  calculatorId: Scalars['UUID']['input'];
  groupReference?: InputMaybe<Scalars['UUID']['input']>;
  order?: InputMaybe<Array<ITaxConfigSubTableRowSortInput>>;
  subTable: Scalars['String']['input'];
  tableCode: Scalars['String']['input'];
  where?: InputMaybe<ITaxConfigSubTableRowFilterInput>;
  year: Scalars['Int']['input'];
};

export type TaxConfigQueriesListSubTableValueArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  calculatorId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  groupReference?: InputMaybe<Scalars['UUID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ITaxConfigMainTableRowSortInput>>;
  subTable: Scalars['String']['input'];
  tableCode: Scalars['String']['input'];
  where?: InputMaybe<ITaxConfigMainTableRowFilterInput>;
  year: Scalars['Int']['input'];
};

export type TaxConfigQueriesListSubTableValueFullArgs = {
  calculatorId: Scalars['UUID']['input'];
  groupReference?: InputMaybe<Scalars['UUID']['input']>;
  subTable: Scalars['String']['input'];
  tableCode: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type TaxConfigQueriesListTableValuesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  calculatorId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ITaxConfigMainTableRowSortInput>>;
  tableCode: Scalars['String']['input'];
  where?: InputMaybe<ITaxConfigMainTableRowFilterInput>;
};

export type TaxConfigQueriesTableValueArgs = {
  calculatorId: Scalars['UUID']['input'];
  tableCode: Scalars['String']['input'];
  tableValueId: Scalars['Int']['input'];
};

export type TaxConfigQueriesTableValueBundleArgs = {
  calculatorId: Scalars['UUID']['input'];
  tableCode: Scalars['String']['input'];
  tableValueId: Scalars['Int']['input'];
};

export type TaxConfigRateSubTableRow = {
  __typename?: 'TaxConfigRateSubTableRow';
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  rate?: Maybe<Scalars['Decimal']['output']>;
};

export type TaxConfigSubTableRow = TaxConfigCoefficientSubTableRow | TaxConfigRateSubTableRow;

export type TaxConfigSubValueColumnInput = {
  booleanValue?: InputMaybe<Scalars['Boolean']['input']>;
  code: Scalars['String']['input'];
  dateValue?: InputMaybe<Scalars['Date']['input']>;
  numberValue?: InputMaybe<Scalars['Decimal']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
  valueType: SubValueType;
};

export type TaxConfigSubValueRowInput = {
  columnValues: Array<TaxConfigSubValueColumnInput>;
  subTable?: InputMaybe<Scalars['String']['input']>;
};

export type TaxConfigValueBundle = {
  __typename?: 'TaxConfigValueBundle';
  allSubTableValues: Array<KeyValuePairOfStringAndITaxConfigSubTableRow__>;
  calculator: TaxCalculator;
  mainValue: TaxConfigMainTableRow;
};

export type TaxCredit = {
  __typename?: 'TaxCredit';
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  managementSubjectId: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  operations: Array<Operation>;
  taxCode: Scalars['String']['output'];
};

export type TaxCreditFilterInput = {
  and?: InputMaybe<Array<TaxCreditFilterInput>>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  managementSubjectId?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  operations?: InputMaybe<ListFilterInputTypeOfOperationFilterInput>;
  or?: InputMaybe<Array<TaxCreditFilterInput>>;
  taxCode?: InputMaybe<CustomStringFilterInput>;
};

export type TaxCreditMutations = {
  __typename?: 'TaxCreditMutations';
  add: ResultOfTaxCredit;
  addOperation: ResultOfOperation;
  delete: Result;
  deleteOperation: Result;
  deleteOperationsRange: Result;
  deleteRange: Result;
  updateOperation: ResultOfOperation;
};

export type TaxCreditMutationsAddArgs = {
  input: AddTaxCreditInput;
};

export type TaxCreditMutationsAddOperationArgs = {
  input: OperationInput;
  taxCreditId: Scalars['Int']['input'];
};

export type TaxCreditMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type TaxCreditMutationsDeleteOperationArgs = {
  operationId: Scalars['Int']['input'];
  taxCreditId: Scalars['Int']['input'];
};

export type TaxCreditMutationsDeleteOperationsRangeArgs = {
  operationIds: Array<Scalars['Int']['input']>;
  taxCreditId: Scalars['Int']['input'];
};

export type TaxCreditMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type TaxCreditMutationsUpdateOperationArgs = {
  input: OperationInput;
  operationId: Scalars['Int']['input'];
  taxCreditId: Scalars['Int']['input'];
};

export type TaxCreditQueries = {
  __typename?: 'TaxCreditQueries';
  get?: Maybe<TaxCredit>;
  listGroupedOperations?: Maybe<ListGroupedOperationsConnection>;
  listTaxCredits?: Maybe<ListTaxCreditsConnection>;
};

export type TaxCreditQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type TaxCreditQueriesListGroupedOperationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<OperationGroupOutputSortInput>>;
  taxCreditId: Scalars['Int']['input'];
  where?: InputMaybe<OperationGroupOutputFilterInput>;
};

export type TaxCreditQueriesListTaxCreditsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TaxCreditSortInput>>;
  where?: InputMaybe<TaxCreditFilterInput>;
};

export type TaxCreditSortInput = {
  deletionDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  managementSubjectId?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  taxCode?: InputMaybe<SortEnumType>;
};

export type TaxStatus = {
  __typename?: 'TaxStatus';
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  since?: Maybe<Scalars['Date']['output']>;
  taxStatusType: TaxStatusType;
  until?: Maybe<Scalars['Date']['output']>;
};

export type TaxStatusFilterInput = {
  and?: InputMaybe<Array<TaxStatusFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<TaxStatusFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  taxStatusType?: InputMaybe<TaxStatusTypeOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type TaxStatusInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  since?: InputMaybe<Scalars['Date']['input']>;
  taxStatusType: TaxStatusType;
  until?: InputMaybe<Scalars['Date']['input']>;
};

export enum TaxStatusType {
  ApplySplitPayment = 'APPLY_SPLIT_PAYMENT',
  VatSubjectAsLandlord = 'VAT_SUBJECT_AS_LANDLORD',
  VatSubjectAsTenant = 'VAT_SUBJECT_AS_TENANT',
}

export type TaxStatusTypeOperationFilterInput = {
  eq?: InputMaybe<TaxStatusType>;
  in?: InputMaybe<Array<TaxStatusType>>;
  neq?: InputMaybe<TaxStatusType>;
  nin?: InputMaybe<Array<TaxStatusType>>;
};

export type TemporaryRegistryCommunicationGroupIdInput = {
  communicationType: CommunicationType;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  isActiveContract: Scalars['Boolean']['input'];
  managementSubjectId: Scalars['Int']['input'];
};

export type TemporaryRegistryCommunicationMutations = {
  __typename?: 'TemporaryRegistryCommunicationMutations';
  confirm: Result;
  confirmAll: Result;
  confirmRange: Result;
};

export type TemporaryRegistryCommunicationMutationsConfirmArgs = {
  date: Scalars['Date']['input'];
  debtBankAccountId: Scalars['Int']['input'];
  groupId: TemporaryRegistryCommunicationGroupIdInput;
  requestingSubjectLegalRepresentativeId: Scalars['Int']['input'];
};

export type TemporaryRegistryCommunicationMutationsConfirmAllArgs = {
  inputs: Array<ConfirmTemporaryRegistryCommunicationGroupInput>;
};

export type TemporaryRegistryCommunicationMutationsConfirmRangeArgs = {
  groupIds: Array<TemporaryRegistryCommunicationGroupIdInput>;
  inputs: Array<ConfirmTemporaryRegistryCommunicationGroupInput>;
};

export type TermExtension = {
  __typename?: 'TermExtension';
  daysCount: Scalars['Int']['output'];
  feeDifference?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
};

export type TermExtensionFilterInput = {
  and?: InputMaybe<Array<TermExtensionFilterInput>>;
  daysCount?: InputMaybe<IntOperationFilterInput>;
  feeDifference?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<TermExtensionFilterInput>>;
};

export type TermExtensionInput = {
  daysCount: Scalars['Int']['input'];
  feeDifference?: InputMaybe<Scalars['Decimal']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type TermGroupedInstallmentPayment = {
  __typename?: 'TermGroupedInstallmentPayment';
  billDate: Scalars['Date']['output'];
  billId: Scalars['Int']['output'];
  billInternalCode: Scalars['String']['output'];
  billIsTemporary: Scalars['Boolean']['output'];
  billItemTypeVATRate: VatRate;
  termInstallments: Array<TermInstallment>;
  totalAmount: Scalars['Decimal']['output'];
  totalAmountPerVATRate: Scalars['Decimal']['output'];
};

export type TermGroupedInstallmentPaymentInput = {
  billId?: InputMaybe<Scalars['Int']['input']>;
  installmentNumbers: Array<Scalars['Int']['input']>;
  paymentDate: Scalars['Date']['input'];
};

export type TermInstallment = {
  __typename?: 'TermInstallment';
  administrationTerm: AdministrationTerm;
  amount: Scalars['Decimal']['output'];
  billItemType: BillItemType;
  dueDate: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  installmentNumber: Scalars['Int']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  payments: Array<BillRow>;
  since: Scalars['Date']['output'];
  until: Scalars['Date']['output'];
};

export type TermInstallmentFilterInput = {
  administrationTerm?: InputMaybe<AdministrationTermFilterInput>;
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<TermInstallmentFilterInput>>;
  billItemType?: InputMaybe<BillItemTypeFilterInput>;
  dueDate?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  installmentNumber?: InputMaybe<IntOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<TermInstallmentFilterInput>>;
  payments?: InputMaybe<ListFilterInputTypeOfBillRowFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type TermInstallmentInput = {
  amount: Scalars['Decimal']['input'];
  billItemTypeId: Scalars['Int']['input'];
  dueDate: Scalars['Date']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  installmentNumber: Scalars['Int']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  since: Scalars['Date']['input'];
  until: Scalars['Date']['input'];
};

export enum TermType {
  ExtraordinaryAsset = 'EXTRAORDINARY_ASSET',
  ExtraordinaryNonAsset = 'EXTRAORDINARY_NON_ASSET',
  Generic = 'GENERIC',
  Heating = 'HEATING',
}

export type TermTypeOperationFilterInput = {
  eq?: InputMaybe<TermType>;
  in?: InputMaybe<Array<TermType>>;
  neq?: InputMaybe<TermType>;
  nin?: InputMaybe<Array<TermType>>;
};

export type Ticket = {
  __typename?: 'Ticket';
  canUseDocumentName: Scalars['Boolean']['output'];
  catalogueItemIds: Array<Scalars['Int']['output']>;
  catalogueItems: Array<CatalogueItem>;
  catalogueType: CatalogueType;
  catalogueTypeId: Scalars['Int']['output'];
  checklist?: Maybe<TicketChecklist>;
  children: Array<Ticket>;
  contract?: Maybe<FcltContract>;
  customType?: Maybe<TicketType>;
  description?: Maybe<Scalars['String']['output']>;
  documents: Array<Document>;
  dueDate: Scalars['Date']['output'];
  history: Array<TicketHistoryEntry>;
  id: Scalars['Int']['output'];
  images: Array<Document>;
  internalCode: Scalars['String']['output'];
  isExcludedFromMaintenanceContract: Scalars['Boolean']['output'];
  isOverduePlannedPeriod: Scalars['Boolean']['output'];
  isWorkSafetyExpected: Scalars['Boolean']['output'];
  locationEstateUnit: EstateUnit;
  locationEstateUnitId: Scalars['Int']['output'];
  locationFloor?: Maybe<Floor>;
  locationFloorId?: Maybe<Scalars['Int']['output']>;
  locationRoom?: Maybe<Scalars['String']['output']>;
  locationSector?: Maybe<Scalars['String']['output']>;
  mainType: TicketMainType;
  masterStatus: TicketMasterStatus;
  performedActivities: Array<PerformedActivity>;
  plannedTeam?: Maybe<WorkTeam>;
  plannedTeamLeaderUser?: Maybe<User>;
  plannedTeamLeaderUserId?: Maybe<Scalars['Int']['output']>;
  priority: Priority;
  quote?: Maybe<Quote>;
  reminders: Array<Reminder>;
  replies: Array<Reply>;
  requestDateTime: Scalars['DateTime']['output'];
  requestor?: Maybe<Scalars['String']['output']>;
  requestorContactEmail?: Maybe<Scalars['String']['output']>;
  requestorContactPhone?: Maybe<Scalars['String']['output']>;
  resolution?: Maybe<Resolution>;
  summary?: Maybe<Scalars['String']['output']>;
  supplierSubject: ISubject;
  supplierSubjectId: Scalars['Int']['output'];
  workOrderReference?: Maybe<Scalars['String']['output']>;
  workers: Array<Worker>;
};

export type TicketCanUseDocumentNameArgs = {
  name: Scalars['String']['input'];
};

export type TicketDocumentsArgs = {
  order?: InputMaybe<Array<DocumentSortInput>>;
  where?: InputMaybe<DocumentFilterInput>;
};

export type TicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics = {
  __typename?: 'TicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics';
  excludedAmountPercentage: Scalars['Float']['output'];
  nonExcludedAmountPercentage: Scalars['Float']['output'];
};

export type TicketCatalogueCategoryEqualityCondition = TicketCondition & {
  __typename?: 'TicketCatalogueCategoryEqualityCondition';
  id: Scalars['Int']['output'];
  operator: EqualityOperator;
  targetCatalogueCategory: CatalogueCategory;
  targetCatalogueCategoryId: Scalars['Int']['output'];
};

export type TicketCatalogueCategoryEqualityConditionInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  operator: EqualityOperator;
  targetCatalogueCategoryId: Scalars['Int']['input'];
};

export type TicketCatalogueSubCategoryEqualityCondition = TicketCondition & {
  __typename?: 'TicketCatalogueSubCategoryEqualityCondition';
  id: Scalars['Int']['output'];
  operator: EqualityOperator;
  targetCatalogueSubCategory: CatalogueSubCategory;
  targetCatalogueSubCategoryId: Scalars['Int']['output'];
};

export type TicketCatalogueSubCategoryEqualityConditionInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  operator: EqualityOperator;
  targetCatalogueSubCategoryId: Scalars['Int']['input'];
};

export type TicketCatalogueTypeEqualityCondition = TicketCondition & {
  __typename?: 'TicketCatalogueTypeEqualityCondition';
  id: Scalars['Int']['output'];
  operator: EqualityOperator;
  targetCatalogueType: CatalogueType;
  targetCatalogueTypeId: Scalars['Int']['output'];
};

export type TicketCatalogueTypeEqualityConditionInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  operator: EqualityOperator;
  targetCatalogueTypeId: Scalars['Int']['input'];
};

export type TicketChecklist = {
  __typename?: 'TicketChecklist';
  catalogueType: CatalogueType;
  catalogueTypeId: Scalars['Int']['output'];
  contract: FcltContract;
  costBaseFactor: CostBaseFactor;
  estateUnit: EstateUnit;
  estateUnitId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  onTriggerActivities?: Maybe<Array<CatalogueTypeActivity>>;
  onTriggerActivityIds?: Maybe<Array<Scalars['Int']['output']>>;
  onTriggerCraft?: Maybe<Craft>;
  onTriggerInterventionType?: Maybe<InterventionType>;
  preventativeActivities?: Maybe<Array<CatalogueTypeActivity>>;
  preventativeActivityIds?: Maybe<Array<Scalars['Int']['output']>>;
  preventativeCraft?: Maybe<Craft>;
  preventativeDaysOfWeek?: Maybe<Array<DayOfWeek>>;
  preventativeInterventionType?: Maybe<InterventionType>;
  preventativePlannedPeriod?: Maybe<PlannedPeriod>;
  preventativeToleranceDays?: Maybe<Scalars['Int']['output']>;
  rawWorkCost: Scalars['Decimal']['output'];
  safetyCost: Scalars['Decimal']['output'];
  type: TicketChecklistTemplateType;
};

export type TicketChecklistFilterInput = {
  and?: InputMaybe<Array<TicketChecklistFilterInput>>;
  catalogueCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueSubCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueType?: InputMaybe<CustomStringFilterInput>;
  catalogueTypeId?: InputMaybe<IntOperationFilterInput>;
  contract?: InputMaybe<FcltContractFilterInput>;
  costBaseFactor?: InputMaybe<CostBaseFactorOperationFilterInput>;
  estateUnitId?: InputMaybe<IntOperationFilterInput>;
  estateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  onTriggerActivityIds?: InputMaybe<ListIntOperationFilterInput>;
  onTriggerCraft?: InputMaybe<CraftFilterInput>;
  onTriggerInterventionType?: InputMaybe<InterventionTypeFilterInput>;
  or?: InputMaybe<Array<TicketChecklistFilterInput>>;
  preventativeActivityIds?: InputMaybe<ListIntOperationFilterInput>;
  preventativeCraft?: InputMaybe<CraftFilterInput>;
  preventativeDaysOfWeek?: InputMaybe<ListDayOfWeekOperationFilterInput>;
  preventativeInterventionType?: InputMaybe<InterventionTypeFilterInput>;
  preventativePlannedPeriod?: InputMaybe<NullableOfPlannedPeriodOperationFilterInput>;
  preventativeToleranceDays?: InputMaybe<IntOperationFilterInput>;
  rawWorkCost?: InputMaybe<DecimalOperationFilterInput>;
  safetyCost?: InputMaybe<DecimalOperationFilterInput>;
  type?: InputMaybe<TicketChecklistTemplateTypeOperationFilterInput>;
};

export type TicketChecklistMutations = {
  __typename?: 'TicketChecklistMutations';
  addRange: ResultOfIEnumerableOfTicketChecklist;
  delete: Result;
  deleteRange: Result;
  update: ResultOfTicketChecklist;
};

export type TicketChecklistMutationsAddRangeArgs = {
  contractId: Scalars['Int']['input'];
  inputs: Array<TicketChecklistTemplatesPerEstateUnitInput>;
};

export type TicketChecklistMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type TicketChecklistMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type TicketChecklistMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTicketChecklistInput;
};

export type TicketChecklistQueries = {
  __typename?: 'TicketChecklistQueries';
  exportToExcel: FileUrlOutput;
  get?: Maybe<TicketChecklist>;
  listTicketChecklists?: Maybe<ListTicketChecklistsConnection>;
  listTicketChecklistsFull: Array<TicketChecklist>;
  listTicketChecklistsPerEstateUnits?: Maybe<ListTicketChecklistsPerEstateUnitsConnection>;
};

export type TicketChecklistQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<TicketChecklistSortInput>>;
  where?: InputMaybe<TicketChecklistFilterInput>;
};

export type TicketChecklistQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type TicketChecklistQueriesListTicketChecklistsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketChecklistSortInput>>;
  where?: InputMaybe<TicketChecklistFilterInput>;
};

export type TicketChecklistQueriesListTicketChecklistsFullArgs = {
  order?: InputMaybe<Array<TicketChecklistSortInput>>;
  where?: InputMaybe<TicketChecklistFilterInput>;
};

export type TicketChecklistQueriesListTicketChecklistsPerEstateUnitsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketChecklistSortInput>>;
  where?: InputMaybe<TicketChecklistFilterInput>;
};

export type TicketChecklistSortInput = {
  catalogueCategory?: InputMaybe<SortEnumType>;
  catalogueSubCategory?: InputMaybe<SortEnumType>;
  catalogueType?: InputMaybe<SortEnumType>;
  catalogueTypeId?: InputMaybe<SortEnumType>;
  contract?: InputMaybe<FcltContractSortInput>;
  costBaseFactor?: InputMaybe<SortEnumType>;
  estateUnitId?: InputMaybe<SortEnumType>;
  estateUnitInternalCode?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  onTriggerCraft?: InputMaybe<CraftSortInput>;
  onTriggerInterventionType?: InputMaybe<InterventionTypeSortInput>;
  preventativeCraft?: InputMaybe<CraftSortInput>;
  preventativeInterventionType?: InputMaybe<InterventionTypeSortInput>;
  preventativePlannedPeriod?: InputMaybe<SortEnumType>;
  preventativeToleranceDays?: InputMaybe<SortEnumType>;
  rawWorkCost?: InputMaybe<SortEnumType>;
  safetyCost?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export type TicketChecklistTemplate = {
  __typename?: 'TicketChecklistTemplate';
  catalogueType: CatalogueType;
  catalogueTypeId: Scalars['Int']['output'];
  costBaseFactor: CostBaseFactor;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  onTriggerActivities?: Maybe<Array<CatalogueTypeActivity>>;
  onTriggerActivityIds?: Maybe<Array<Scalars['Int']['output']>>;
  onTriggerCraft?: Maybe<Craft>;
  onTriggerInterventionType?: Maybe<InterventionType>;
  preventativeActivities?: Maybe<Array<CatalogueTypeActivity>>;
  preventativeActivityIds?: Maybe<Array<Scalars['Int']['output']>>;
  preventativeCraft?: Maybe<Craft>;
  preventativeDaysOfWeek?: Maybe<Array<DayOfWeek>>;
  preventativeInterventionType?: Maybe<InterventionType>;
  preventativePlannedPeriod?: Maybe<PlannedPeriod>;
  preventativeToleranceDays?: Maybe<Scalars['Int']['output']>;
  rawWorkCost: Scalars['Decimal']['output'];
  safetyCost: Scalars['Decimal']['output'];
  type: TicketChecklistTemplateType;
};

export type TicketChecklistTemplateFilterInput = {
  and?: InputMaybe<Array<TicketChecklistTemplateFilterInput>>;
  catalogueCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueSubCategory?: InputMaybe<CustomStringFilterInput>;
  catalogueType?: InputMaybe<CustomStringFilterInput>;
  catalogueTypeId?: InputMaybe<IntOperationFilterInput>;
  costBaseFactor?: InputMaybe<CostBaseFactorOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  onTriggerActivityIds?: InputMaybe<ListIntOperationFilterInput>;
  onTriggerCraft?: InputMaybe<CraftFilterInput>;
  onTriggerInterventionType?: InputMaybe<InterventionTypeFilterInput>;
  or?: InputMaybe<Array<TicketChecklistTemplateFilterInput>>;
  preventativeActivityIds?: InputMaybe<ListIntOperationFilterInput>;
  preventativeCraft?: InputMaybe<CraftFilterInput>;
  preventativeDaysOfWeek?: InputMaybe<ListDayOfWeekOperationFilterInput>;
  preventativeInterventionType?: InputMaybe<InterventionTypeFilterInput>;
  preventativePlannedPeriod?: InputMaybe<NullableOfPlannedPeriodOperationFilterInput>;
  preventativeToleranceDays?: InputMaybe<IntOperationFilterInput>;
  rawWorkCost?: InputMaybe<DecimalOperationFilterInput>;
  safetyCost?: InputMaybe<DecimalOperationFilterInput>;
  type?: InputMaybe<TicketChecklistTemplateTypeOperationFilterInput>;
};

export type TicketChecklistTemplateInput = {
  catalogueTypeId: Scalars['Int']['input'];
  costBaseFactor: CostBaseFactor;
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  onTriggerActivityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  onTriggerCraftId?: InputMaybe<Scalars['Int']['input']>;
  onTriggerInterventionTypeId?: InputMaybe<Scalars['Int']['input']>;
  preventativeActivityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  preventativeCraftId?: InputMaybe<Scalars['Int']['input']>;
  preventativeDaysOfWeek?: InputMaybe<Array<DayOfWeek>>;
  preventativeInterventionTypeId?: InputMaybe<Scalars['Int']['input']>;
  preventativePlannedPeriod?: InputMaybe<PlannedPeriod>;
  preventativeToleranceDays?: InputMaybe<Scalars['Int']['input']>;
  rawWorkCost: Scalars['Decimal']['input'];
  safetyCost: Scalars['Decimal']['input'];
  type: TicketChecklistTemplateType;
};

export type TicketChecklistTemplateMutations = {
  __typename?: 'TicketChecklistTemplateMutations';
  add: ResultOfTicketChecklistTemplate;
  delete: Result;
  deleteRange: Result;
  update: ResultOfTicketChecklistTemplate;
};

export type TicketChecklistTemplateMutationsAddArgs = {
  input: TicketChecklistTemplateInput;
};

export type TicketChecklistTemplateMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type TicketChecklistTemplateMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type TicketChecklistTemplateMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: TicketChecklistTemplateInput;
};

export type TicketChecklistTemplateQueries = {
  __typename?: 'TicketChecklistTemplateQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<TicketChecklistTemplate>;
  listTicketChecklistTemplates?: Maybe<ListTicketChecklistTemplatesConnection>;
  listTicketChecklistTemplatesFull: Array<TicketChecklistTemplate>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type TicketChecklistTemplateQueriesCanUseInternalCodeArgs = {
  currentTicketChecklistTemplateId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type TicketChecklistTemplateQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<TicketChecklistTemplateSortInput>>;
  where?: InputMaybe<TicketChecklistTemplateFilterInput>;
};

export type TicketChecklistTemplateQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type TicketChecklistTemplateQueriesListTicketChecklistTemplatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketChecklistTemplateSortInput>>;
  where?: InputMaybe<TicketChecklistTemplateFilterInput>;
};

export type TicketChecklistTemplateQueriesListTicketChecklistTemplatesFullArgs = {
  order?: InputMaybe<Array<TicketChecklistTemplateSortInput>>;
  where?: InputMaybe<TicketChecklistTemplateFilterInput>;
};

export type TicketChecklistTemplateSortInput = {
  catalogueCategory?: InputMaybe<SortEnumType>;
  catalogueSubCategory?: InputMaybe<SortEnumType>;
  catalogueType?: InputMaybe<SortEnumType>;
  catalogueTypeId?: InputMaybe<SortEnumType>;
  costBaseFactor?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  onTriggerCraft?: InputMaybe<CraftSortInput>;
  onTriggerInterventionType?: InputMaybe<InterventionTypeSortInput>;
  preventativeCraft?: InputMaybe<CraftSortInput>;
  preventativeInterventionType?: InputMaybe<InterventionTypeSortInput>;
  preventativePlannedPeriod?: InputMaybe<SortEnumType>;
  preventativeToleranceDays?: InputMaybe<SortEnumType>;
  rawWorkCost?: InputMaybe<SortEnumType>;
  safetyCost?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export enum TicketChecklistTemplateType {
  OnTriggerCondition = 'ON_TRIGGER_CONDITION',
  Preventative = 'PREVENTATIVE',
  PreventativeAndOnTriggerCondition = 'PREVENTATIVE_AND_ON_TRIGGER_CONDITION',
}

export type TicketChecklistTemplateTypeOperationFilterInput = {
  eq?: InputMaybe<TicketChecklistTemplateType>;
  in?: InputMaybe<Array<TicketChecklistTemplateType>>;
  neq?: InputMaybe<TicketChecklistTemplateType>;
  nin?: InputMaybe<Array<TicketChecklistTemplateType>>;
};

export type TicketChecklistTemplatesPerEstateUnitInput = {
  estateUnitId: Scalars['Int']['input'];
  templateIds: Array<Scalars['Int']['input']>;
};

export type TicketChecklistsPerEstateUnit = {
  __typename?: 'TicketChecklistsPerEstateUnit';
  estateUnit: EstateUnit;
  estateUnitId: Scalars['Int']['output'];
  ticketChecklists: Array<TicketChecklist>;
};

export type TicketCondition = {
  id: Scalars['Int']['output'];
};

export type TicketConditionFilterInput = {
  and?: InputMaybe<Array<TicketConditionFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<TicketConditionFilterInput>>;
};

export type TicketDocumentMutations = {
  __typename?: 'TicketDocumentMutations';
  addRange: ResultOfDocument__;
  deleteRange: ResultOfDocument__;
  update: ResultOfDocument;
};

export type TicketDocumentMutationsAddRangeArgs = {
  inputs: Array<DocumentInput>;
  ticketId: Scalars['Int']['input'];
};

export type TicketDocumentMutationsDeleteRangeArgs = {
  cmisIds: Array<Scalars['String']['input']>;
  ticketId: Scalars['Int']['input'];
};

export type TicketDocumentMutationsUpdateArgs = {
  input: DocumentInput;
  ticketId: Scalars['Int']['input'];
};

/** A connection to a list of items. */
export type TicketDocumentsConnection = {
  __typename?: 'TicketDocumentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TicketDocumentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TicketDocumentsOutput>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type TicketDocumentsEdge = {
  __typename?: 'TicketDocumentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TicketDocumentsOutput;
};

export type TicketDocumentsFlatOutputFilterInput = {
  and?: InputMaybe<Array<TicketDocumentsFlatOutputFilterInput>>;
  document?: InputMaybe<DocumentFilterInput>;
  isTicketExcludedFromMaintenanceContract?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<TicketDocumentsFlatOutputFilterInput>>;
  ticketInternalCode?: InputMaybe<CustomStringFilterInput>;
};

export type TicketDocumentsOutput = {
  __typename?: 'TicketDocumentsOutput';
  guid: Scalars['UUID']['output'];
  isTicketExcludedFromMaintenanceContract: Scalars['Boolean']['output'];
  subRows: Array<Document>;
  ticketInternalCode: Scalars['String']['output'];
};

export type TicketDocumentsOutputSortInput = {
  guid?: InputMaybe<SortEnumType>;
  isTicketExcludedFromMaintenanceContract?: InputMaybe<SortEnumType>;
  ticketInternalCode?: InputMaybe<SortEnumType>;
};

export type TicketFilterInput = {
  and?: InputMaybe<Array<TicketFilterInput>>;
  catalogueItemIds?: InputMaybe<ListIntOperationFilterInput>;
  catalogueTypeId?: InputMaybe<IntOperationFilterInput>;
  checklist?: InputMaybe<TicketChecklistFilterInput>;
  children?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  contract?: InputMaybe<FcltContractFilterInput>;
  customType?: InputMaybe<TicketTypeFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  dueDate?: InputMaybe<DateOperationFilterInput>;
  history?: InputMaybe<ListFilterInputTypeOfTicketHistoryEntryFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isExcludedFromMaintenanceContract?: InputMaybe<BooleanOperationFilterInput>;
  isMandatoryByLaw?: InputMaybe<BooleanOperationFilterInput>;
  isOverduePlannedPeriod?: InputMaybe<BooleanOperationFilterInput>;
  isWorkSafetyExpected?: InputMaybe<BooleanOperationFilterInput>;
  locationEstateUnitId?: InputMaybe<IntOperationFilterInput>;
  locationEstateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  locationFloorId?: InputMaybe<IntOperationFilterInput>;
  locationRoom?: InputMaybe<CustomStringFilterInput>;
  locationSector?: InputMaybe<CustomStringFilterInput>;
  mainType?: InputMaybe<TicketMainTypeOperationFilterInput>;
  masterStatus?: InputMaybe<TicketMasterStatusOperationFilterInput>;
  or?: InputMaybe<Array<TicketFilterInput>>;
  performedActivities?: InputMaybe<ListFilterInputTypeOfPerformedActivityFilterInput>;
  plannedTeam?: InputMaybe<WorkTeamFilterInput>;
  plannedTeamLeaderUserId?: InputMaybe<IntOperationFilterInput>;
  priority?: InputMaybe<PriorityOperationFilterInput>;
  quote?: InputMaybe<QuoteFilterInput>;
  reminders?: InputMaybe<ListFilterInputTypeOfReminderFilterInput>;
  replies?: InputMaybe<ListFilterInputTypeOfReplyFilterInput>;
  requestDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  requestYear?: InputMaybe<IntOperationFilterInput>;
  requestor?: InputMaybe<CustomStringFilterInput>;
  requestorContactEmail?: InputMaybe<CustomStringFilterInput>;
  requestorContactPhone?: InputMaybe<CustomStringFilterInput>;
  resolution?: InputMaybe<ResolutionFilterInput>;
  summary?: InputMaybe<CustomStringFilterInput>;
  supplierSubjectId?: InputMaybe<IntOperationFilterInput>;
  supplierSubjectName?: InputMaybe<CustomStringFilterInput>;
  workOrderReference?: InputMaybe<CustomStringFilterInput>;
  workers?: InputMaybe<ListFilterInputTypeOfWorkerFilterInput>;
};

export type TicketHistoryEntry = {
  id: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type TicketHistoryEntryFilterInput = {
  and?: InputMaybe<Array<TicketHistoryEntryFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<TicketHistoryEntryFilterInput>>;
  timestamp?: InputMaybe<DateTimeOperationFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type TicketInput = {
  catalogueItemIds: Array<Scalars['Int']['input']>;
  catalogueTypeId: Scalars['Int']['input'];
  customTypeId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['Date']['input'];
  internalCode: Scalars['String']['input'];
  isWorkSafetyExpected: Scalars['Boolean']['input'];
  locationEstateUnitId: Scalars['Int']['input'];
  locationFloorId?: InputMaybe<Scalars['Int']['input']>;
  locationRoom?: InputMaybe<Scalars['String']['input']>;
  locationSector?: InputMaybe<Scalars['String']['input']>;
  masterStatus: TicketMasterStatus;
  performedActivityInputs: Array<PerformedActivityInput>;
  plannedTeamId?: InputMaybe<Scalars['Int']['input']>;
  plannedTeamLeaderUserId?: InputMaybe<Scalars['Int']['input']>;
  priority: Priority;
  quote?: InputMaybe<QuoteInput>;
  reminders: Array<ReminderInput>;
  requestDateTime: Scalars['DateTime']['input'];
  requestor?: InputMaybe<Scalars['String']['input']>;
  requestorContactEmail?: InputMaybe<Scalars['String']['input']>;
  requestorContactPhone?: InputMaybe<Scalars['String']['input']>;
  resolution: ResolutionInput;
  summary?: InputMaybe<Scalars['String']['input']>;
  supplierSubjectId: Scalars['Int']['input'];
  workOrderReference?: InputMaybe<Scalars['String']['input']>;
  workers: Array<WorkerInput>;
};

export enum TicketMainType {
  ChecklistOnTriggerCondition = 'CHECKLIST_ON_TRIGGER_CONDITION',
  ChecklistPreventative = 'CHECKLIST_PREVENTATIVE',
  Issue = 'ISSUE',
  IssueParent = 'ISSUE_PARENT',
}

export type TicketMainTypeOperationFilterInput = {
  eq?: InputMaybe<TicketMainType>;
  in?: InputMaybe<Array<TicketMainType>>;
  neq?: InputMaybe<TicketMainType>;
  nin?: InputMaybe<Array<TicketMainType>>;
};

export enum TicketMasterStatus {
  Assigned = 'ASSIGNED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
  Resolved = 'RESOLVED',
}

export type TicketMasterStatusCondition = TicketCondition & {
  __typename?: 'TicketMasterStatusCondition';
  calendar: Calendar;
  id: Scalars['Int']['output'];
  maxTimePeriodInMinutes?: Maybe<Scalars['Int']['output']>;
  minTimePeriodInMinutes?: Maybe<Scalars['Int']['output']>;
  targetMasterStatus: TicketMasterStatus;
  timeComparisonOperator: ComparisonOperator;
};

export type TicketMasterStatusConditionInput = {
  calendarId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  maxTimePeriodInMinutes?: InputMaybe<Scalars['Int']['input']>;
  minTimePeriodInMinutes?: InputMaybe<Scalars['Int']['input']>;
  targetMasterStatus: TicketMasterStatus;
  timeComparisonOperator: ComparisonOperator;
};

export type TicketMasterStatusOperationFilterInput = {
  eq?: InputMaybe<TicketMasterStatus>;
  in?: InputMaybe<Array<TicketMasterStatus>>;
  neq?: InputMaybe<TicketMasterStatus>;
  nin?: InputMaybe<Array<TicketMasterStatus>>;
};

export type TicketMutations = {
  __typename?: 'TicketMutations';
  addIssue: ResultOfTicket;
  addOnTriggerChecklistTicketRange: ResultOfIEnumerableOfTicket;
  convertToExcludedFromMaintenanceContract: ResultOfTicket;
  delete: Result;
  deleteRange: Result;
  document: TicketDocumentMutations;
  sendReply: ResultOfTicket;
  update: ResultOfTicket;
};

export type TicketMutationsAddIssueArgs = {
  input: TicketInput;
};

export type TicketMutationsAddOnTriggerChecklistTicketRangeArgs = {
  input: AddOnTriggerChecklistTicketRangeInput;
};

export type TicketMutationsConvertToExcludedFromMaintenanceContractArgs = {
  ticketId: Scalars['Int']['input'];
};

export type TicketMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type TicketMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type TicketMutationsSendReplyArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  documentInputs: Array<DocumentInput>;
  ticketId: Scalars['Int']['input'];
};

export type TicketMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: TicketInput;
};

export type TicketPriorityEqualityCondition = TicketCondition & {
  __typename?: 'TicketPriorityEqualityCondition';
  id: Scalars['Int']['output'];
  operator: EqualityOperator;
  targetPriority: Priority;
};

export type TicketPriorityEqualityConditionInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  operator: EqualityOperator;
  targetPriority: Priority;
};

export type TicketQueries = {
  __typename?: 'TicketQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  checklistTicketsCountLineChart: LineChartOfChecklistTicketsCountLineChartDataPoint;
  checklistTicketsMandatoryByLawPerformedActivitiesStatistics?: Maybe<Array<KeyValuePairOfStringAndDouble>>;
  exportToExcel: FileUrlOutput;
  get?: Maybe<Ticket>;
  issuesAverageResolutionDurationByStatusStatistics: IssuesAverageResolutionDurationByStatusStatistics;
  issuesCountByStatusStatistics: IssuesCountByStatusStatistics;
  issuesExcludedFromMaintenanceContractLineChart: LineChartOfIssuesExcludedFromMaintenanceContractLineChartDataPoint;
  issuesExcludedFromMaintenanceContractStatistics?: Maybe<IssuesExcludedFromMaintenanceContractStatistics>;
  issuesPercentageByPriorityStatistics?: Maybe<IssuesPercentageByPriorityStatistics>;
  issuesPercentageByStatusStatistics?: Maybe<IssuesPercentageByStatusStatistics>;
  issuesPercentageByTypeStatistics?: Maybe<Array<KeyValuePairOfTicketTypeAndDouble>>;
  issuesSLARespectingPercentageStatistics?: Maybe<IssuesSlaRespectingPercentageStatistics>;
  issuesStatusLineChart: LineChartOfIssuesStatusLineChartDataPoint;
  listAvailableProviderSubjects?: Maybe<ListAvailableProviderSubjectsConnection>;
  listTickets?: Maybe<ListTicketsConnection>;
  listTicketsForCalendar: Array<CalendarTicketOutput>;
  listTicketsPerEstateUnits?: Maybe<ListTicketsPerEstateUnitsConnection>;
  listTicketsPerEstateUnitsPerYears?: Maybe<ListTicketsPerEstateUnitsPerYearsConnection>;
  mandatoryByLawChecklistTicketsStatusStatistics?: Maybe<MandatoryByLawChecklistTicketsStatusStatistics>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
  ticketAmountPercentageByIsExcludedFromMaintenanceContractStatistics?: Maybe<TicketAmountPercentageByIsExcludedFromMaintenanceContractStatistics>;
  ticketsAmountLineChart: LineChartOfTicketsAmountChartDataPoint;
  ticketsCountMonthlyChart: Array<LineChartMonthlySeriesOfTicketsCountLineChartDataPoint>;
  ticketsTotalAmountMonthlyChart: Array<LineChartMonthlySeriesOfTicketsTotalAmountChartDataPoint>;
  ticketsTypeLineChart: LineChartOfTicketsTypeLineChartDataPoint;
  yearlyTicketAmountStatistics: YearlyTicketAmountStatistics;
};

export type TicketQueriesCanUseInternalCodeArgs = {
  currentTicketId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type TicketQueriesChecklistTicketsCountLineChartArgs = {
  chartType: LineChartType;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesChecklistTicketsMandatoryByLawPerformedActivitiesStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<TicketSortInput>>;
  where?: InputMaybe<TicketFilterInput>;
};

export type TicketQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type TicketQueriesIssuesAverageResolutionDurationByStatusStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesCountByStatusStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesExcludedFromMaintenanceContractLineChartArgs = {
  chartType: LineChartType;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesExcludedFromMaintenanceContractStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesPercentageByPriorityStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesPercentageByStatusStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesPercentageByTypeStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesSlaRespectingPercentageStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesIssuesStatusLineChartArgs = {
  chartType: LineChartType;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesListAvailableProviderSubjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  catalogueItemIds: Array<Scalars['Int']['input']>;
  estateUnitId: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SubjectSortInput>>;
  where?: InputMaybe<SubjectFilterInput>;
};

export type TicketQueriesListTicketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketSortInput>>;
  where?: InputMaybe<TicketFilterInput>;
};

export type TicketQueriesListTicketsForCalendarArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
  where?: InputMaybe<CalendarTicketOutputFilterInput>;
};

export type TicketQueriesListTicketsPerEstateUnitsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketsPerEstateUnitSortInput>>;
  where?: InputMaybe<TicketFilterInput>;
};

export type TicketQueriesListTicketsPerEstateUnitsPerYearsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketsPerEstateUnitsPerYearSortInput>>;
  where?: InputMaybe<TicketFilterInput>;
};

export type TicketQueriesMandatoryByLawChecklistTicketsStatusStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesProposeNewInternalCodeArgs = {
  mainType: TicketMainType;
};

export type TicketQueriesTicketAmountPercentageByIsExcludedFromMaintenanceContractStatisticsArgs = {
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesTicketsAmountLineChartArgs = {
  chartType: LineChartType;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketQueriesTicketsCountMonthlyChartArgs = {
  years: Array<Scalars['Int']['input']>;
};

export type TicketQueriesTicketsTotalAmountMonthlyChartArgs = {
  years: Array<Scalars['Int']['input']>;
};

export type TicketQueriesTicketsTypeLineChartArgs = {
  chartType: LineChartType;
  endDate: Scalars['Date']['input'];
  startDate: Scalars['Date']['input'];
};

export type TicketSortInput = {
  catalogueTypeId?: InputMaybe<SortEnumType>;
  checklist?: InputMaybe<TicketChecklistSortInput>;
  contract?: InputMaybe<FcltContractSortInput>;
  customType?: InputMaybe<TicketTypeSortInput>;
  description?: InputMaybe<SortEnumType>;
  dueDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  isExcludedFromMaintenanceContract?: InputMaybe<SortEnumType>;
  isOverduePlannedPeriod?: InputMaybe<SortEnumType>;
  isWorkSafetyExpected?: InputMaybe<SortEnumType>;
  locationEstateUnitId?: InputMaybe<SortEnumType>;
  locationFloorId?: InputMaybe<SortEnumType>;
  locationRoom?: InputMaybe<SortEnumType>;
  locationSector?: InputMaybe<SortEnumType>;
  mainType?: InputMaybe<SortEnumType>;
  masterStatus?: InputMaybe<SortEnumType>;
  plannedTeam?: InputMaybe<WorkTeamSortInput>;
  plannedTeamLeaderUserId?: InputMaybe<SortEnumType>;
  priority?: InputMaybe<SortEnumType>;
  quote?: InputMaybe<QuoteSortInput>;
  requestDateTime?: InputMaybe<SortEnumType>;
  requestor?: InputMaybe<SortEnumType>;
  requestorContactEmail?: InputMaybe<SortEnumType>;
  requestorContactPhone?: InputMaybe<SortEnumType>;
  resolution?: InputMaybe<ResolutionSortInput>;
  summary?: InputMaybe<SortEnumType>;
  supplierSubjectId?: InputMaybe<SortEnumType>;
  supplierSubjectName?: InputMaybe<SortEnumType>;
  workOrderReference?: InputMaybe<SortEnumType>;
};

export type TicketType = {
  __typename?: 'TicketType';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
};

export type TicketTypeEqualityCondition = TicketCondition & {
  __typename?: 'TicketTypeEqualityCondition';
  id: Scalars['Int']['output'];
  operator: EqualityOperator;
  targetTicketType: TicketType;
};

export type TicketTypeEqualityConditionInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  operator: EqualityOperator;
  targetTicketTypeId: Scalars['Int']['input'];
};

export type TicketTypeFilterInput = {
  and?: InputMaybe<Array<TicketTypeFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<TicketTypeFilterInput>>;
  ordering?: InputMaybe<IntOperationFilterInput>;
};

export type TicketTypeInput = {
  description: Scalars['String']['input'];
  internalCode: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type TicketTypeMutations = {
  __typename?: 'TicketTypeMutations';
  add: ResultOfTicketType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfTicketType;
};

export type TicketTypeMutationsAddArgs = {
  input: TicketTypeInput;
};

export type TicketTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type TicketTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type TicketTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: TicketTypeInput;
};

export type TicketTypeQueries = {
  __typename?: 'TicketTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<TicketType>;
  listTicketTypes?: Maybe<ListTicketTypesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type TicketTypeQueriesCanUseInternalCodeArgs = {
  currentTicketTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type TicketTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<TicketTypeSortInput>>;
  where?: InputMaybe<TicketTypeFilterInput>;
};

export type TicketTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type TicketTypeQueriesListTicketTypesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TicketTypeSortInput>>;
  where?: InputMaybe<TicketTypeFilterInput>;
};

export type TicketTypeSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  ordering?: InputMaybe<SortEnumType>;
};

export type TicketsAmountChartDataPoint = {
  __typename?: 'TicketsAmountChartDataPoint';
  excludedAmount: Scalars['Decimal']['output'];
  nonExcludedAmount: Scalars['Decimal']['output'];
};

export type TicketsCountLineChartDataPoint = {
  __typename?: 'TicketsCountLineChartDataPoint';
  ticketsCount: Scalars['Int']['output'];
};

export type TicketsPerEstateUnit = {
  __typename?: 'TicketsPerEstateUnit';
  locationEstateUnit: EstateUnit;
  locationEstateUnitId: Scalars['Int']['output'];
  tickets: Array<Ticket>;
};

export type TicketsPerEstateUnitSortInput = {
  locationEstateUnitId?: InputMaybe<SortEnumType>;
  locationEstateUnitInternalCode?: InputMaybe<SortEnumType>;
};

export type TicketsPerEstateUnitsPerYear = {
  __typename?: 'TicketsPerEstateUnitsPerYear';
  requestYear: Scalars['Int']['output'];
  tickets: Array<TicketsPerEstateUnit>;
};

export type TicketsPerEstateUnitsPerYearSortInput = {
  requestYear?: InputMaybe<SortEnumType>;
};

export type TicketsTotalAmountChartDataPoint = {
  __typename?: 'TicketsTotalAmountChartDataPoint';
  totalAmount: Scalars['Decimal']['output'];
};

export type TicketsTypeLineChartDataPoint = {
  __typename?: 'TicketsTypeLineChartDataPoint';
  issuesCount: Scalars['Int']['output'];
  onTriggerConditionCount: Scalars['Int']['output'];
  preventiveCount: Scalars['Int']['output'];
};

export type TimeRange = {
  __typename?: 'TimeRange';
  since: Scalars['TimeSpan']['output'];
  until: Scalars['TimeSpan']['output'];
};

export type TimeRangeFilterInput = {
  and?: InputMaybe<Array<TimeRangeFilterInput>>;
  or?: InputMaybe<Array<TimeRangeFilterInput>>;
  since?: InputMaybe<TimeSpanOperationFilterInput>;
  until?: InputMaybe<TimeSpanOperationFilterInput>;
};

export type TimeRangeInput = {
  since: Scalars['TimeSpan']['input'];
  until: Scalars['TimeSpan']['input'];
};

export type TimeSpanOperationFilterInput = {
  eq?: InputMaybe<Scalars['TimeSpan']['input']>;
  gt?: InputMaybe<Scalars['TimeSpan']['input']>;
  gte?: InputMaybe<Scalars['TimeSpan']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  lt?: InputMaybe<Scalars['TimeSpan']['input']>;
  lte?: InputMaybe<Scalars['TimeSpan']['input']>;
  neq?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngt?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngte?: InputMaybe<Scalars['TimeSpan']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  nlt?: InputMaybe<Scalars['TimeSpan']['input']>;
  nlte?: InputMaybe<Scalars['TimeSpan']['input']>;
};

export type Transactor = {
  __typename?: 'Transactor';
  addressId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  invoiceAddressId: Scalars['Int']['output'];
  isInvoiced: Scalars['Boolean']['output'];
  since: Scalars['Date']['output'];
  subject: ISubject;
  subjectId: Scalars['Int']['output'];
  transactionSharePercent: Scalars['Float']['output'];
  type: PaymentType;
  until?: Maybe<Scalars['Date']['output']>;
};

export type TransactorFilterInput = {
  addressId?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<TransactorFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  invoiceAddressId?: InputMaybe<IntOperationFilterInput>;
  isInvoiced?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<TransactorFilterInput>>;
  since?: InputMaybe<DateOperationFilterInput>;
  subjectId?: InputMaybe<IntOperationFilterInput>;
  transactionSharePercent?: InputMaybe<FloatOperationFilterInput>;
  type?: InputMaybe<PaymentTypeOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type TransactorInput = {
  addressId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  invoiceAddressId: Scalars['Int']['input'];
  isInvoiced: Scalars['Boolean']['input'];
  since: Scalars['Date']['input'];
  subjectId: Scalars['Int']['input'];
  transactionSharePercent: Scalars['Float']['input'];
  type: PaymentType;
  until?: InputMaybe<Scalars['Date']['input']>;
};

export enum Trend {
  Down = 'DOWN',
  Same = 'SAME',
  Up = 'UP',
}

export enum UnitCondition {
  Acceptable = 'ACCEPTABLE',
  Degraded = 'DEGRADED',
  Normal = 'NORMAL',
  Unavailable = 'UNAVAILABLE',
}

export type UnitConditionOperationFilterInput = {
  eq?: InputMaybe<UnitCondition>;
  in?: InputMaybe<Array<UnitCondition>>;
  neq?: InputMaybe<UnitCondition>;
  nin?: InputMaybe<Array<UnitCondition>>;
};

export type UnitExpenses = {
  __typename?: 'UnitExpenses';
  amount: Scalars['Decimal']['output'];
  estateUnit: EstateUnit;
  id: Scalars['Int']['output'];
  referenceYear: Scalars['Int']['output'];
  revaluationFactor?: Maybe<Scalars['Float']['output']>;
};

export type UnitExpensesFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<UnitExpensesFilterInput>>;
  estateUnit?: InputMaybe<EstateUnitFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<UnitExpensesFilterInput>>;
  referenceYear?: InputMaybe<IntOperationFilterInput>;
  revaluationFactor?: InputMaybe<FloatOperationFilterInput>;
};

export type UpdatePriceListArticleInput = {
  catalogueTypeIds: Array<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  measurementUnitId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  priceListId: Scalars['Int']['input'];
  pricePeriods: Array<ArticlePricePeriodInput>;
};

export type UpdateTicketChecklistInput = {
  costBaseFactor: CostBaseFactor;
  internalCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
  onTriggerActivityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  preventativeActivityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  preventativeDaysOfWeek?: InputMaybe<Array<DayOfWeek>>;
  preventativePlannedPeriod?: InputMaybe<PlannedPeriod>;
  preventativeToleranceDays?: InputMaybe<Scalars['Int']['input']>;
  rawWorkCost: Scalars['Decimal']['input'];
  safetyCost: Scalars['Decimal']['input'];
};

export type UsageTypeDistribution = {
  __typename?: 'UsageTypeDistribution';
  percentage: Scalars['Float']['output'];
  usageTypeName: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type UsageTypeDistributionConnection = {
  __typename?: 'UsageTypeDistributionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsageTypeDistributionEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<UsageTypeDistribution>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UsageTypeDistributionEdge = {
  __typename?: 'UsageTypeDistributionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: UsageTypeDistribution;
};

export type UsageTypeDistributionFilterInput = {
  and?: InputMaybe<Array<UsageTypeDistributionFilterInput>>;
  or?: InputMaybe<Array<UsageTypeDistributionFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
  usageTypeName?: InputMaybe<CustomStringFilterInput>;
};

export type UsageTypeDistributionSortInput = {
  percentage?: InputMaybe<SortEnumType>;
  usageTypeName?: InputMaybe<SortEnumType>;
};

export type User = {
  __typename?: 'User';
  ceasedDate?: Maybe<Scalars['DateTime']['output']>;
  contacts: Array<IamContact>;
  creationDate: Scalars['DateTime']['output'];
  deletionDate?: Maybe<Scalars['DateTime']['output']>;
  enabledSince?: Maybe<Scalars['DateTime']['output']>;
  facilityDashboard: Array<WidgetSection>;
  firstName?: Maybe<Scalars['String']['output']>;
  groups: Array<Group>;
  id: Scalars['Int']['output'];
  lastLogInAttempt?: Maybe<Scalars['DateTime']['output']>;
  lastLoggedIn?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  lastPasswordUpdated?: Maybe<Scalars['DateTime']['output']>;
  lockedSince?: Maybe<Scalars['DateTime']['output']>;
  lockedUntil?: Maybe<Scalars['DateTime']['output']>;
  mainDashboard: Array<WidgetSection>;
  managementOrgUnits: Array<OrgUnit>;
  managementSubjects: Array<ISubject>;
  officeAccess: OfficeAccess;
  orgUnits?: Maybe<Array<Scalars['Int']['output']>>;
  passwordExpiredSince?: Maybe<Scalars['DateTime']['output']>;
  preferredLanguageCode?: Maybe<Scalars['String']['output']>;
  sessions: Array<Session>;
  status: UserStatus;
  subjects?: Maybe<Array<Scalars['Int']['output']>>;
  supplierSubject?: Maybe<ISubject>;
  supplierSubjectId?: Maybe<Scalars['Int']['output']>;
  suspensionReason?: Maybe<Scalars['String']['output']>;
  type: UserType;
  unlock: Scalars['Boolean']['output'];
  userName: Scalars['String']['output'];
};

export type UserUnlockArgs = {
  newPasswordHash: Scalars['String']['input'];
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  ceasedDate?: InputMaybe<DateTimeOperationFilterInput>;
  contacts?: InputMaybe<ListFilterInputTypeOfContactFilterInput>;
  creationDate?: InputMaybe<DateTimeOperationFilterInput>;
  deletionDate?: InputMaybe<DateTimeOperationFilterInput>;
  enabledSince?: InputMaybe<DateTimeOperationFilterInput>;
  facilityDashboard?: InputMaybe<ListFilterInputTypeOfWidgetSectionFilterInput>;
  firstName?: InputMaybe<CustomStringFilterInput>;
  groupName?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastLogInAttempt?: InputMaybe<DateTimeOperationFilterInput>;
  lastLoggedIn?: InputMaybe<DateTimeOperationFilterInput>;
  lastName?: InputMaybe<CustomStringFilterInput>;
  lastPasswordUpdated?: InputMaybe<DateTimeOperationFilterInput>;
  lockedSince?: InputMaybe<DateTimeOperationFilterInput>;
  lockedUntil?: InputMaybe<DateTimeOperationFilterInput>;
  mainDashboard?: InputMaybe<ListFilterInputTypeOfWidgetSectionFilterInput>;
  managementSubjectName?: InputMaybe<CustomStringFilterInput>;
  officeAccess?: InputMaybe<OfficeAccessOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  orgUnits?: InputMaybe<ListIntOperationFilterInput>;
  passwordExpiredSince?: InputMaybe<DateTimeOperationFilterInput>;
  preferredLanguageCode?: InputMaybe<CustomStringFilterInput>;
  sessions?: InputMaybe<ListFilterInputTypeOfSessionFilterInput>;
  status?: InputMaybe<UserStatusOperationFilterInput>;
  subjects?: InputMaybe<ListIntOperationFilterInput>;
  supplierSubjectId?: InputMaybe<IntOperationFilterInput>;
  suspensionReason?: InputMaybe<CustomStringFilterInput>;
  type?: InputMaybe<UserTypeOperationFilterInput>;
  userName?: InputMaybe<CustomStringFilterInput>;
};

export type UserLoginMutations = {
  __typename?: 'UserLoginMutations';
  login: LoginResult;
  loginOIDC: LoginResult;
  refreshAccessToken: LoginResult;
};

export type UserLoginMutationsLoginArgs = {
  input: LoginInput;
};

export type UserLoginMutationsLoginOidcArgs = {
  idToken: Scalars['String']['input'];
};

export type UserLoginMutationsRefreshAccessTokenArgs = {
  accessToken: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  username: Scalars['String']['output'];
};

export type UserMutations = {
  __typename?: 'UserMutations';
  changePassword: Result;
  revokeAllSessions: Result;
  revokeSession: Result;
  switchTenant?: Maybe<LoginResult>;
  updateFacilityDashboardWidgets: Result;
  updateMainDashboardWidgets: Result;
};

export type UserMutationsChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type UserMutationsRevokeSessionArgs = {
  sessionId: Scalars['Int']['input'];
};

export type UserMutationsSwitchTenantArgs = {
  input: SwitchTenantInput;
};

export type UserMutationsUpdateFacilityDashboardWidgetsArgs = {
  inputs: Array<WidgetSectionInput>;
};

export type UserMutationsUpdateMainDashboardWidgetsArgs = {
  inputs: Array<WidgetSectionInput>;
};

export type UserQueries = {
  __typename?: 'UserQueries';
  me?: Maybe<User>;
  sessions: Array<Session>;
};

export type UserSortInput = {
  ceasedDate?: InputMaybe<SortEnumType>;
  creationDate?: InputMaybe<SortEnumType>;
  deletionDate?: InputMaybe<SortEnumType>;
  enabledSince?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastLogInAttempt?: InputMaybe<SortEnumType>;
  lastLoggedIn?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  lastPasswordUpdated?: InputMaybe<SortEnumType>;
  lockedSince?: InputMaybe<SortEnumType>;
  lockedUntil?: InputMaybe<SortEnumType>;
  officeAccess?: InputMaybe<SortEnumType>;
  passwordExpiredSince?: InputMaybe<SortEnumType>;
  preferredLanguageCode?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  supplierSubjectId?: InputMaybe<SortEnumType>;
  suspensionReason?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Ceased = 'CEASED',
  Suspended = 'SUSPENDED',
}

export type UserStatusOperationFilterInput = {
  eq?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  neq?: InputMaybe<UserStatus>;
  nin?: InputMaybe<Array<UserStatus>>;
};

export enum UserType {
  ExternalSupplier = 'EXTERNAL_SUPPLIER',
  Internal = 'INTERNAL',
}

export type UserTypeOperationFilterInput = {
  eq?: InputMaybe<UserType>;
  in?: InputMaybe<Array<UserType>>;
  neq?: InputMaybe<UserType>;
  nin?: InputMaybe<Array<UserType>>;
};

export enum UtilityCategory {
  CleaningAndMaintenance = 'CLEANING_AND_MAINTENANCE',
  DistrictCooling = 'DISTRICT_COOLING',
  DistrictHeating = 'DISTRICT_HEATING',
  Electrical = 'ELECTRICAL',
  Gardening = 'GARDENING',
  LiquidFossilFuels = 'LIQUID_FOSSIL_FUELS',
  NaturalGas = 'NATURAL_GAS',
  PostalService = 'POSTAL_SERVICE',
  PublicTransportation = 'PUBLIC_TRANSPORTATION',
  Sewage = 'SEWAGE',
  StreetLighting = 'STREET_LIGHTING',
  Telecommunication = 'TELECOMMUNICATION',
  WasteManagementCollection = 'WASTE_MANAGEMENT_COLLECTION',
  WaterSupply = 'WATER_SUPPLY',
}

export type UtilityCategoryOperationFilterInput = {
  eq?: InputMaybe<UtilityCategory>;
  in?: InputMaybe<Array<UtilityCategory>>;
  neq?: InputMaybe<UtilityCategory>;
  nin?: InputMaybe<Array<UtilityCategory>>;
};

export type UtilityChargeField = {
  __typename?: 'UtilityChargeField';
  id: Scalars['UUID']['output'];
  isMandatory: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  type: CustomFieldType;
  validValues?: Maybe<Array<Scalars['String']['output']>>;
};

export type UtilityChargeFieldFilterInput = {
  and?: InputMaybe<Array<UtilityChargeFieldFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isMandatory?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<UtilityChargeFieldFilterInput>>;
  type?: InputMaybe<CustomFieldTypeOperationFilterInput>;
  validValues?: InputMaybe<ListCustomStringFilterInput>;
};

export type UtilityChargeFieldInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  isMandatory: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  type: CustomFieldType;
  validValues?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UtilityService = {
  __typename?: 'UtilityService';
  accountingItem: AccountingItem;
  accountingItemId: Scalars['Int']['output'];
  activationDate: Scalars['Date']['output'];
  contractNominalTension?: Maybe<Scalars['String']['output']>;
  contractPowerMaximum?: Maybe<Scalars['String']['output']>;
  contractPowerNominal?: Maybe<Scalars['String']['output']>;
  deactivationDate?: Maybe<Scalars['Date']['output']>;
  deactivationRequestDate?: Maybe<Scalars['Date']['output']>;
  deposit?: Maybe<Scalars['Decimal']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  estateIds: Array<Scalars['Int']['output']>;
  estateUnitIds: Array<Scalars['Int']['output']>;
  estateUnits: Array<EstateUnit>;
  estates: Array<Estate>;
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  isFreeMarket: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  orgUnit: OrgUnit;
  orgUnitId: Scalars['Int']['output'];
  providerSubject: ISubject;
  providerSubjectId: Scalars['Int']['output'];
  referenceSubject: ISubject;
  referenceSubjectId: Scalars['Int']['output'];
  status: EntryStatus;
  utilityContractCode: Scalars['String']['output'];
  utilityDeliveryPointCode?: Maybe<Scalars['String']['output']>;
  utilityMeterSerial?: Maybe<Scalars['String']['output']>;
  utilityType: UtilityType;
  utilityUserCode: Scalars['String']['output'];
};

export type UtilityServiceFilterInput = {
  accountingItemDescription?: InputMaybe<CustomStringFilterInput>;
  accountingItemId?: InputMaybe<IntOperationFilterInput>;
  accountingItemInternalCode?: InputMaybe<CustomStringFilterInput>;
  activationDate?: InputMaybe<DateOperationFilterInput>;
  and?: InputMaybe<Array<UtilityServiceFilterInput>>;
  contractNominalTension?: InputMaybe<CustomStringFilterInput>;
  contractPowerMaximum?: InputMaybe<CustomStringFilterInput>;
  contractPowerNominal?: InputMaybe<CustomStringFilterInput>;
  deactivationDate?: InputMaybe<DateOperationFilterInput>;
  deactivationRequestDate?: InputMaybe<DateOperationFilterInput>;
  deposit?: InputMaybe<DecimalOperationFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  estateIds?: InputMaybe<ListIntOperationFilterInput>;
  estateInternalCode?: InputMaybe<CustomStringFilterInput>;
  estateUnitIds?: InputMaybe<ListIntOperationFilterInput>;
  estateUnitInternalCode?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  isFreeMarket?: InputMaybe<BooleanOperationFilterInput>;
  notes?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<UtilityServiceFilterInput>>;
  orgUnitId?: InputMaybe<IntOperationFilterInput>;
  orgUnitName?: InputMaybe<CustomStringFilterInput>;
  providerSubjectBaseCountryTaxIdCode?: InputMaybe<CustomStringFilterInput>;
  providerSubjectId?: InputMaybe<IntOperationFilterInput>;
  providerSubjectInternalCode?: InputMaybe<CustomStringFilterInput>;
  providerSubjectName?: InputMaybe<CustomStringFilterInput>;
  providerSubjectProfessionalTaxIdCode?: InputMaybe<CustomStringFilterInput>;
  referenceSubjectId?: InputMaybe<IntOperationFilterInput>;
  referenceSubjectName?: InputMaybe<CustomStringFilterInput>;
  status?: InputMaybe<EntryStatusOperationFilterInput>;
  utilityContractCode?: InputMaybe<CustomStringFilterInput>;
  utilityDeliveryPointCode?: InputMaybe<CustomStringFilterInput>;
  utilityMeterSerial?: InputMaybe<CustomStringFilterInput>;
  utilityType?: InputMaybe<UtilityTypeFilterInput>;
  utilityUserCode?: InputMaybe<CustomStringFilterInput>;
};

export type UtilityServiceInput = {
  accountingItemId: Scalars['Int']['input'];
  activationDate: Scalars['Date']['input'];
  contractNominalTension?: InputMaybe<Scalars['String']['input']>;
  contractPowerMaximum?: InputMaybe<Scalars['String']['input']>;
  contractPowerNominal?: InputMaybe<Scalars['String']['input']>;
  deposit?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  estateIds: Array<Scalars['Int']['input']>;
  estateUnitIds: Array<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  isFreeMarket: Scalars['Boolean']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  orgUnitId: Scalars['Int']['input'];
  providerSubjectId: Scalars['Int']['input'];
  referenceSubjectId: Scalars['Int']['input'];
  status: EntryStatus;
  utilityContractCode: Scalars['String']['input'];
  utilityDeliveryPointCode?: InputMaybe<Scalars['String']['input']>;
  utilityMeterSerial?: InputMaybe<Scalars['String']['input']>;
  utilityTypeId: Scalars['Int']['input'];
  utilityUserCode: Scalars['String']['input'];
};

export type UtilityServiceMutations = {
  __typename?: 'UtilityServiceMutations';
  add: ResultOfUtilityService;
  delete: Result;
  deleteRange: Result;
  update: ResultOfUtilityService;
};

export type UtilityServiceMutationsAddArgs = {
  input: UtilityServiceInput;
};

export type UtilityServiceMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type UtilityServiceMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type UtilityServiceMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: UtilityServiceInput;
};

export type UtilityServiceQueries = {
  __typename?: 'UtilityServiceQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<UtilityService>;
  listUtilityServices?: Maybe<ListUtilityServicesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type UtilityServiceQueriesCanUseInternalCodeArgs = {
  currentUtilityServiceId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type UtilityServiceQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<UtilityServiceSortInput>>;
  where?: InputMaybe<UtilityServiceFilterInput>;
};

export type UtilityServiceQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type UtilityServiceQueriesListUtilityServicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UtilityServiceSortInput>>;
  where?: InputMaybe<UtilityServiceFilterInput>;
};

export type UtilityServiceSortInput = {
  accountingItemDescription?: InputMaybe<SortEnumType>;
  accountingItemId?: InputMaybe<SortEnumType>;
  accountingItemInternalCode?: InputMaybe<SortEnumType>;
  activationDate?: InputMaybe<SortEnumType>;
  contractNominalTension?: InputMaybe<SortEnumType>;
  contractPowerMaximum?: InputMaybe<SortEnumType>;
  contractPowerNominal?: InputMaybe<SortEnumType>;
  deactivationDate?: InputMaybe<SortEnumType>;
  deactivationRequestDate?: InputMaybe<SortEnumType>;
  deposit?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  isFreeMarket?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  orgUnitId?: InputMaybe<SortEnumType>;
  orgUnitName?: InputMaybe<SortEnumType>;
  providerSubjectBaseCountryTaxIdCode?: InputMaybe<SortEnumType>;
  providerSubjectId?: InputMaybe<SortEnumType>;
  providerSubjectInternalCode?: InputMaybe<SortEnumType>;
  providerSubjectName?: InputMaybe<SortEnumType>;
  providerSubjectProfessionalTaxIdCode?: InputMaybe<SortEnumType>;
  referenceSubjectId?: InputMaybe<SortEnumType>;
  referenceSubjectName?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  utilityContractCode?: InputMaybe<SortEnumType>;
  utilityDeliveryPointCode?: InputMaybe<SortEnumType>;
  utilityMeterSerial?: InputMaybe<SortEnumType>;
  utilityType?: InputMaybe<UtilityTypeSortInput>;
  utilityUserCode?: InputMaybe<SortEnumType>;
};

export type UtilityType = {
  __typename?: 'UtilityType';
  category: UtilityCategory;
  chargeFields?: Maybe<Array<Array<UtilityChargeField>>>;
  description: Scalars['String']['output'];
  expenseClass?: Maybe<Scalars['String']['output']>;
  externalCode?: Maybe<Scalars['String']['output']>;
  hasHeatingAccountingSystem: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  measurementUnit: Scalars['String']['output'];
  measurementUnitDescription: Scalars['String']['output'];
  meteringType: MeteringType;
  timeOfUseRateCount: Scalars['Int']['output'];
};

export type UtilityTypeFilterInput = {
  and?: InputMaybe<Array<UtilityTypeFilterInput>>;
  category?: InputMaybe<UtilityCategoryOperationFilterInput>;
  chargeFields?: InputMaybe<ListListFilterInputTypeOfUtilityChargeFieldFilterInput>;
  description?: InputMaybe<CustomStringFilterInput>;
  expenseClass?: InputMaybe<CustomStringFilterInput>;
  externalCode?: InputMaybe<CustomStringFilterInput>;
  hasHeatingAccountingSystem?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  measurementUnit?: InputMaybe<CustomStringFilterInput>;
  measurementUnitDescription?: InputMaybe<CustomStringFilterInput>;
  meteringType?: InputMaybe<MeteringTypeOperationFilterInput>;
  or?: InputMaybe<Array<UtilityTypeFilterInput>>;
  timeOfUseRateCount?: InputMaybe<IntOperationFilterInput>;
};

export type UtilityTypeInput = {
  category: UtilityCategory;
  chargeFields?: InputMaybe<Array<Array<UtilityChargeFieldInput>>>;
  description: Scalars['String']['input'];
  expenseClass?: InputMaybe<Scalars['String']['input']>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  hasHeatingAccountingSystem: Scalars['Boolean']['input'];
  internalCode: Scalars['String']['input'];
  measurementUnit: Scalars['String']['input'];
  measurementUnitDescription: Scalars['String']['input'];
  meteringType: MeteringType;
  timeOfUseRateCount: Scalars['Int']['input'];
};

export type UtilityTypeMutations = {
  __typename?: 'UtilityTypeMutations';
  add: ResultOfUtilityType;
  delete: Result;
  deleteRange: Result;
  update: ResultOfUtilityType;
};

export type UtilityTypeMutationsAddArgs = {
  input: UtilityTypeInput;
};

export type UtilityTypeMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type UtilityTypeMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type UtilityTypeMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: UtilityTypeInput;
};

export type UtilityTypeQueries = {
  __typename?: 'UtilityTypeQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<UtilityType>;
  listUtilityType?: Maybe<ListUtilityTypeConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type UtilityTypeQueriesCanUseInternalCodeArgs = {
  currentUtilityTypeId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type UtilityTypeQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<UtilityTypeSortInput>>;
  where?: InputMaybe<UtilityTypeFilterInput>;
};

export type UtilityTypeQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type UtilityTypeQueriesListUtilityTypeArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<UtilityTypeSortInput>>;
  where?: InputMaybe<UtilityTypeFilterInput>;
};

export type UtilityTypeSortInput = {
  category?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  expenseClass?: InputMaybe<SortEnumType>;
  externalCode?: InputMaybe<SortEnumType>;
  hasHeatingAccountingSystem?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  measurementUnit?: InputMaybe<SortEnumType>;
  measurementUnitDescription?: InputMaybe<SortEnumType>;
  meteringType?: InputMaybe<SortEnumType>;
  timeOfUseRateCount?: InputMaybe<SortEnumType>;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type VatRate = {
  __typename?: 'VATRate';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  internalCode: Scalars['String']['output'];
  ratePercent: Scalars['Float']['output'];
  type: VatRateType;
};

export type VatRateFilterInput = {
  and?: InputMaybe<Array<VatRateFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<VatRateFilterInput>>;
  ratePercent?: InputMaybe<FloatOperationFilterInput>;
  type?: InputMaybe<VatRateTypeOperationFilterInput>;
};

export type VatRateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
  ratePercent: Scalars['Float']['input'];
  type: VatRateType;
};

export type VatRateMutations = {
  __typename?: 'VATRateMutations';
  add: ResultOfVatRate;
  delete: Result;
  deleteRange: Result;
  update: ResultOfVatRate;
};

export type VatRateMutationsAddArgs = {
  input: VatRateInput;
};

export type VatRateMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type VatRateMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type VatRateMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: VatRateInput;
};

export type VatRateQueries = {
  __typename?: 'VATRateQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<VatRate>;
  listVATRates?: Maybe<ListVatRatesConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type VatRateQueriesCanUseInternalCodeArgs = {
  currentVATRateId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type VatRateQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<VatRateSortInput>>;
  where?: InputMaybe<VatRateFilterInput>;
};

export type VatRateQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type VatRateQueriesListVatRatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<VatRateSortInput>>;
  where?: InputMaybe<VatRateFilterInput>;
};

export type VatRateSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  ratePercent?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export enum VatRateType {
  Exempt = 'EXEMPT',
  NonTaxable = 'NON_TAXABLE',
  Rate = 'RATE',
}

export type VatRateTypeOperationFilterInput = {
  eq?: InputMaybe<VatRateType>;
  in?: InputMaybe<Array<VatRateType>>;
  neq?: InputMaybe<VatRateType>;
  nin?: InputMaybe<Array<VatRateType>>;
};

export type ValidationError = {
  __typename?: 'ValidationError';
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  severity: ValidationSeverity;
};

export enum ValidationSeverity {
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING',
}

export type Valuation = {
  __typename?: 'Valuation';
  iasValue?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['Int']['output'];
  mortgageAmount?: Maybe<Scalars['Decimal']['output']>;
  rbaValue?: Maybe<Scalars['Decimal']['output']>;
  referenceYear: Scalars['Int']['output'];
  revampOperations?: Maybe<Scalars['Int']['output']>;
  transferYear?: Maybe<Scalars['Int']['output']>;
};

export type ValuationFilterInput = {
  and?: InputMaybe<Array<ValuationFilterInput>>;
  iasValue?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  mortgageAmount?: InputMaybe<DecimalOperationFilterInput>;
  or?: InputMaybe<Array<ValuationFilterInput>>;
  rbaValue?: InputMaybe<DecimalOperationFilterInput>;
  referenceYear?: InputMaybe<IntOperationFilterInput>;
  revampOperations?: InputMaybe<IntOperationFilterInput>;
  transferYear?: InputMaybe<IntOperationFilterInput>;
};

export type WidgetConfig = {
  __typename?: 'WidgetConfig';
  id: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type WidgetConfigFilterInput = {
  and?: InputMaybe<Array<WidgetConfigFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<WidgetConfigFilterInput>>;
  type?: InputMaybe<CustomStringFilterInput>;
  width?: InputMaybe<IntOperationFilterInput>;
};

export type WidgetConfigInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  width: Scalars['Int']['input'];
};

export type WidgetSection = {
  __typename?: 'WidgetSection';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  rows: Array<WidgetSectionRow>;
  title?: Maybe<Scalars['String']['output']>;
};

export type WidgetSectionFilterInput = {
  and?: InputMaybe<Array<WidgetSectionFilterInput>>;
  backgroundColor?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<WidgetSectionFilterInput>>;
  rows?: InputMaybe<ListFilterInputTypeOfWidgetSectionRowFilterInput>;
  title?: InputMaybe<CustomStringFilterInput>;
};

export type WidgetSectionInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rows: Array<WidgetSectionRowInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type WidgetSectionRow = {
  __typename?: 'WidgetSectionRow';
  id: Scalars['Int']['output'];
  widgets: Array<WidgetConfig>;
};

export type WidgetSectionRowFilterInput = {
  and?: InputMaybe<Array<WidgetSectionRowFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<WidgetSectionRowFilterInput>>;
  widgets?: InputMaybe<ListFilterInputTypeOfWidgetConfigFilterInput>;
};

export type WidgetSectionRowInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  widgets: Array<WidgetConfigInput>;
};

export type WorkTeam = {
  __typename?: 'WorkTeam';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  insertionDate: Scalars['Date']['output'];
  internalCode: Scalars['String']['output'];
  leaderUser: User;
  leaderUserId: Scalars['Int']['output'];
  providerSubject: ISubject;
  providerSubjectId: Scalars['Int']['output'];
  workers: Array<Worker>;
};

export type WorkTeamFilterInput = {
  and?: InputMaybe<Array<WorkTeamFilterInput>>;
  description?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  insertionDate?: InputMaybe<DateOperationFilterInput>;
  internalCode?: InputMaybe<CustomStringFilterInput>;
  leaderUserId?: InputMaybe<IntOperationFilterInput>;
  leaderUserName?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<WorkTeamFilterInput>>;
  providerSubjectId?: InputMaybe<IntOperationFilterInput>;
  providerSubjectName?: InputMaybe<CustomStringFilterInput>;
  workers?: InputMaybe<ListFilterInputTypeOfWorkerFilterInput>;
};

export type WorkTeamInput = {
  description: Scalars['String']['input'];
  insertionDate: Scalars['Date']['input'];
  internalCode: Scalars['String']['input'];
  leaderUserId: Scalars['Int']['input'];
  providerSubjectId: Scalars['Int']['input'];
  workers: Array<WorkerInput>;
};

export type WorkTeamMutations = {
  __typename?: 'WorkTeamMutations';
  add: ResultOfWorkTeam;
  delete: Result;
  deleteRange: Result;
  update: ResultOfWorkTeam;
};

export type WorkTeamMutationsAddArgs = {
  input: WorkTeamInput;
};

export type WorkTeamMutationsDeleteArgs = {
  id: Scalars['Int']['input'];
};

export type WorkTeamMutationsDeleteRangeArgs = {
  ids: Array<Scalars['Int']['input']>;
};

export type WorkTeamMutationsUpdateArgs = {
  id: Scalars['Int']['input'];
  input: WorkTeamInput;
};

export type WorkTeamQueries = {
  __typename?: 'WorkTeamQueries';
  canUseInternalCode: Scalars['Boolean']['output'];
  exportToExcel: FileUrlOutput;
  get?: Maybe<WorkTeam>;
  listWorkTeams?: Maybe<ListWorkTeamsConnection>;
  proposeNewInternalCode?: Maybe<Scalars['String']['output']>;
};

export type WorkTeamQueriesCanUseInternalCodeArgs = {
  currentWorkTeamId?: InputMaybe<Scalars['Int']['input']>;
  internalCode: Scalars['String']['input'];
};

export type WorkTeamQueriesExportToExcelArgs = {
  order?: InputMaybe<Array<WorkTeamSortInput>>;
  where?: InputMaybe<WorkTeamFilterInput>;
};

export type WorkTeamQueriesGetArgs = {
  id: Scalars['Int']['input'];
};

export type WorkTeamQueriesListWorkTeamsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<WorkTeamSortInput>>;
  where?: InputMaybe<WorkTeamFilterInput>;
};

export type WorkTeamSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  insertionDate?: InputMaybe<SortEnumType>;
  internalCode?: InputMaybe<SortEnumType>;
  leaderUserId?: InputMaybe<SortEnumType>;
  leaderUserName?: InputMaybe<SortEnumType>;
  providerSubjectId?: InputMaybe<SortEnumType>;
  providerSubjectName?: InputMaybe<SortEnumType>;
};

export type Worker = {
  __typename?: 'Worker';
  craft: Craft;
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  qualificationLevel: QualificationLevel;
  since: Scalars['Date']['output'];
  until?: Maybe<Scalars['Date']['output']>;
};

export type WorkerFilterInput = {
  and?: InputMaybe<Array<WorkerFilterInput>>;
  craft?: InputMaybe<CraftFilterInput>;
  firstName?: InputMaybe<CustomStringFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastName?: InputMaybe<CustomStringFilterInput>;
  or?: InputMaybe<Array<WorkerFilterInput>>;
  qualificationLevel?: InputMaybe<QualificationLevelFilterInput>;
  since?: InputMaybe<DateOperationFilterInput>;
  until?: InputMaybe<DateOperationFilterInput>;
};

export type WorkerInput = {
  craftId: Scalars['Int']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  lastName: Scalars['String']['input'];
  qualificationLevelId: Scalars['Int']['input'];
  since: Scalars['Date']['input'];
  until?: InputMaybe<Scalars['Date']['input']>;
};

export type YearlyTicketAmountStatistics = {
  __typename?: 'YearlyTicketAmountStatistics';
  excludedAmount: Scalars['Decimal']['output'];
  excludedAmountTrend: Trend;
  nonExcludedAmount: Scalars['Decimal']['output'];
  nonExcludedAmountTrend: Trend;
  totalAmount: Scalars['Decimal']['output'];
  totalAmountTrend: Trend;
};
