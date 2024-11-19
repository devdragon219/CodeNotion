using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.Prop
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "prop");

            

            migrationBuilder.CreateTable(
                name: "Administrations",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateId = table.Column<int>(type: "integer", nullable: false),
                    AdministratorSubjectId = table.Column<int>(type: "integer", nullable: false),
                    AdministratorBankAccountId = table.Column<int>(type: "integer", nullable: true),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    AdministrationType = table.Column<int>(type: "integer", nullable: false),
                    PaymentType = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    IsPaymentDataIncluded = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillItemTypes",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsForContractFee = table.Column<bool>(type: "boolean", nullable: false),
                    IsForContractCosts = table.Column<bool>(type: "boolean", nullable: false),
                    IsForAdministration = table.Column<bool>(type: "boolean", nullable: false),
                    IsPositive = table.Column<bool>(type: "boolean", nullable: false),
                    IsForTax = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultAccountingItemId = table.Column<int>(type: "integer", nullable: true),
                    ActiveSubjectVRId = table.Column<int>(type: "integer", nullable: false),
                    ActiveExemptVRId = table.Column<int>(type: "integer", nullable: false),
                    ActiveNonTaxableVRId = table.Column<int>(type: "integer", nullable: false),
                    PassiveSubjectVRId = table.Column<int>(type: "integer", nullable: false),
                    PassiveExemptVRId = table.Column<int>(type: "integer", nullable: false),
                    PassiveNonTaxableVRId = table.Column<int>(type: "integer", nullable: false),
                    AdministrationVRId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillItemTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContractTypes",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsStampTax = table.Column<bool>(type: "boolean", nullable: false),
                    IsRegistrationTax = table.Column<bool>(type: "boolean", nullable: false),
                    Nature = table.Column<int>(type: "integer", nullable: false),
                    UsageTypeId = table.Column<int>(type: "integer", nullable: false),
                    IsRentChargeApplicable = table.Column<bool>(type: "boolean", nullable: false),
                    IsAbsoluteRevaluation = table.Column<bool>(type: "boolean", nullable: false),
                    IsRevaluationApplicable = table.Column<bool>(type: "boolean", nullable: false),
                    RevaluationRatePercent = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RevaluationCalculationMonth = table.Column<int>(type: "integer", nullable: true),
                    RevaluationIndexMonth = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxPercent = table.Column<double>(type: "double precision", nullable: true),
                    RegistrationTaxTenantPercent = table.Column<double>(type: "double precision", nullable: true),
                    RegistrationTaxIncomeType = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RegistrationOffices",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    CityId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationOffices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AdministrationTerms",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AdministrationId = table.Column<int>(type: "integer", nullable: false),
                    TermType = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: false),
                    ExpectedAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdministrationTerms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdministrationTerms_Administrations_AdministrationId",
                        column: x => x.AdministrationId,
                        principalSchema: "prop",
                        principalTable: "Administrations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contracts",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    PreviousCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ManagementSubjectId = table.Column<int>(type: "integer", nullable: false),
                    TypeId = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<int>(type: "integer", nullable: false),
                    AgreementDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EffectStartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    LastRenewalStartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    FirstTermDurationMonths = table.Column<int>(type: "integer", nullable: true),
                    SecondTermDurationMonths = table.Column<int>(type: "integer", nullable: true),
                    FirstTermExpirationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    SecondTermExpirationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    AnytimeTerminationWarningMonths = table.Column<int>(type: "integer", nullable: true),
                    NonRenewalWarningMonths = table.Column<int>(type: "integer", nullable: true),
                    BillingStartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    BillingAfterTerm = table.Column<bool>(type: "boolean", nullable: false),
                    RecoverBillsAfterSuspension = table.Column<bool>(type: "boolean", nullable: false),
                    BillingAlignedToCalendarYear = table.Column<bool>(type: "boolean", nullable: false),
                    BillingAppliesBaseFee = table.Column<bool>(type: "boolean", nullable: false),
                    BillingBaseFee = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    BillingBaseFeeBillItemTypeId = table.Column<int>(type: "integer", nullable: true),
                    BillingVATRateType = table.Column<int>(type: "integer", nullable: true),
                    BillingPeriod = table.Column<int>(type: "integer", nullable: true),
                    BillingWithSplitPayment = table.Column<bool>(type: "boolean", nullable: false),
                    BillingWithStampTax = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    BillingNotes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    ReleaseReason = table.Column<int>(type: "integer", nullable: true),
                    ReleaseDate = table.Column<DateOnly>(type: "date", nullable: true),
                    TerminationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Terminator = table.Column<int>(type: "integer", nullable: true),
                    IsOccupiedWithoutRight = table.Column<bool>(type: "boolean", nullable: true),
                    BillingEndDate = table.Column<DateOnly>(type: "date", nullable: true),
                    SublocatedContractId = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_IsTakeoverFromPreviousSubject = table.Column<bool>(type: "boolean", nullable: true),
                    RegistrationTaxData_TakeoverOriginalSubjectIds = table.Column<int[]>(type: "integer[]", nullable: true),
                    RegistrationTaxData_TakeoverType = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_TakeoverLegalRepresentativeSubjectId = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_TakeoverDate = table.Column<DateOnly>(type: "date", nullable: true),
                    RegistrationTaxData_PaymentType = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_IsRLIModeEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    RegistrationTaxData_IsAccountingManaged = table.Column<bool>(type: "boolean", nullable: true),
                    RegistrationTaxData_IncomeTypeRLI = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_IncomeType = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_RegistrationSerialNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegistrationTaxData_RegistrationNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegistrationTaxData_RegistrationYear = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_ContractRegistrationCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegistrationTaxData_RequestCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegistrationTaxData_RegistrationOfficeId = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_TaxableRateRatioPercent = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RegistrationTaxData_TenantTaxSharePercent = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RegistrationTaxData_FirstRegistrationPeriod = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_FirstRegistrationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    RegistrationTaxData_FirstOnlineRegistrationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    RegistrationTaxData_LastPaymentDate = table.Column<DateOnly>(type: "date", nullable: true),
                    RegistrationTaxData_LastOnlinePaymentDate = table.Column<DateOnly>(type: "date", nullable: true),
                    RegistrationTaxData_Exemptions = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_TransferResolutionAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RegistrationTaxData_SpecialCase = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_NumberOfPages = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_NumberOfCopies = table.Column<int>(type: "integer", nullable: true),
                    RegistrationTaxData_TenantShareOfStampTaxPercent = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RegistrationTaxData_IsVoluntarySanctionApplied = table.Column<bool>(type: "boolean", nullable: true),
                    RevaluationData_RevaluationPeriodMonths = table.Column<int>(type: "integer", nullable: true),
                    RevaluationData_IsAbsoluteRevaluationApplied = table.Column<bool>(type: "boolean", nullable: true),
                    RevaluationData_IsRevaluationCalculated = table.Column<bool>(type: "boolean", nullable: true),
                    RevaluationData_ReferencePeriodStart = table.Column<DateOnly>(type: "date", nullable: true),
                    RevaluationData_ReferencePeriodEnd = table.Column<DateOnly>(type: "date", nullable: true),
                    RevaluationData_RevaluationSharePercent = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RevaluationData_RateType = table.Column<int>(type: "integer", nullable: true),
                    RevaluationData_BaseRevaluationRate = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RevaluationData_NextApplicationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    RevaluationData_IsBackHistoryEnabled = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contracts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contracts_BillItemTypes_BillingBaseFeeBillItemTypeId",
                        column: x => x.BillingBaseFeeBillItemTypeId,
                        principalSchema: "prop",
                        principalTable: "BillItemTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Contracts_ContractTypes_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "prop",
                        principalTable: "ContractTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contracts_Contracts_SublocatedContractId",
                        column: x => x.SublocatedContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contracts_RegistrationOffices_RegistrationTaxData_Registrat~",
                        column: x => x.RegistrationTaxData_RegistrationOfficeId,
                        principalSchema: "prop",
                        principalTable: "RegistrationOffices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TermInstallment",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AdministrationTermId = table.Column<int>(type: "integer", nullable: false),
                    InstallmentNumber = table.Column<int>(type: "integer", nullable: false),
                    DueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: false),
                    BillItemTypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TermInstallment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TermInstallment_AdministrationTerms_AdministrationTermId",
                        column: x => x.AdministrationTermId,
                        principalSchema: "prop",
                        principalTable: "AdministrationTerms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TermInstallment_BillItemTypes_BillItemTypeId",
                        column: x => x.BillItemTypeId,
                        principalSchema: "prop",
                        principalTable: "BillItemTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BillingPause",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    IsRecoveryArrears = table.Column<bool>(type: "boolean", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingPause", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_BillingPause_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalSourceCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ExternalExportCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    TransactorSubjectId = table.Column<int>(type: "integer", nullable: false),
                    MainCounterpartSubjectId = table.Column<int>(type: "integer", nullable: false),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: true),
                    InvoiceId = table.Column<int>(type: "integer", nullable: true),
                    IsOccupiedWithoutRight = table.Column<bool>(type: "boolean", nullable: false),
                    IsInvoiced = table.Column<bool>(type: "boolean", nullable: false),
                    TransactorPaymentType = table.Column<int>(type: "integer", nullable: false),
                    ContractId = table.Column<int>(type: "integer", nullable: true),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    FinalDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EmissionType = table.Column<int>(type: "integer", nullable: false),
                    ContractBillingPeriod = table.Column<int>(type: "integer", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bills_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Counterpart",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: false),
                    IsMainCounterpart = table.Column<bool>(type: "boolean", nullable: false),
                    ContractSharePercent = table.Column<double>(type: "double precision", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Counterpart", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_Counterpart_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LocatedUnit",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    EstateSubUnitId = table.Column<int>(type: "integer", nullable: true),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    IsMainUnit = table.Column<bool>(type: "boolean", nullable: false),
                    IsRegistryUpdateEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    IsPartialLocation = table.Column<bool>(type: "boolean", nullable: false),
                    SurfaceSqM = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocatedUnit", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_LocatedUnit_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RatePlan",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    NewYearlyRate = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    IsDeclarationExpected = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeclared = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RatePlan", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_RatePlan_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecurringAddition",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BillItemTypeId = table.Column<int>(type: "integer", nullable: false),
                    AccountingItemId = table.Column<int>(type: "integer", nullable: false),
                    VATRateId = table.Column<int>(type: "integer", nullable: false),
                    AmountPerInstallment = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    ExcludeStartMonth = table.Column<int>(type: "integer", nullable: true),
                    ExcludeEndMonth = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    ContractId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecurringAddition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecurringAddition_BillItemTypes_BillItemTypeId",
                        column: x => x.BillItemTypeId,
                        principalSchema: "prop",
                        principalTable: "BillItemTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecurringAddition_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistrationPayments",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    PaymentType = table.Column<int>(type: "integer", nullable: false),
                    PaymentYear = table.Column<int>(type: "integer", nullable: false),
                    PaymentCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ValueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    TaxAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    SanctionAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistrationPayments_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RevaluationHistory",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    BaseYearlyRate = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    IndexPercent = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    RevaluationAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    YearlyRateWithRevaluation = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RevaluationHistory", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_RevaluationHistory_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SecurityDeposit",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    BaseAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    IsInterestCalculated = table.Column<bool>(type: "boolean", nullable: false),
                    InterestCalculationStartDate = table.Column<DateOnly>(type: "date", nullable: true),
                    InterestCalculationEndDate = table.Column<DateOnly>(type: "date", nullable: true),
                    TakeoverDate = table.Column<DateOnly>(type: "date", nullable: true),
                    SuretySubjectId = table.Column<int>(type: "integer", nullable: true),
                    IsSuretyRenewable = table.Column<bool>(type: "boolean", nullable: false),
                    BankAccountId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecurityDeposit", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_SecurityDeposit_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Takeover",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    OriginalSubjectId = table.Column<int>(type: "integer", nullable: false),
                    NewSubjectId = table.Column<int>(type: "integer", nullable: false),
                    LegalRepresentativeSubjectId = table.Column<int>(type: "integer", nullable: true),
                    TakeoverDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EffectiveDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Takeover", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_Takeover_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactor",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    InvoiceAddressId = table.Column<int>(type: "integer", nullable: false),
                    TransactionSharePercent = table.Column<double>(type: "double precision", nullable: false),
                    IsInvoiced = table.Column<bool>(type: "boolean", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactor", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_Transactor_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OneshotAddition",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BillItemTypeId = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    AccountingItemId = table.Column<int>(type: "integer", nullable: false),
                    VATRateId = table.Column<int>(type: "integer", nullable: false),
                    IsRentalRateVariation = table.Column<bool>(type: "boolean", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    Installments = table.Column<int>(type: "integer", nullable: true),
                    IsBoundToTermDay = table.Column<bool>(type: "boolean", nullable: false),
                    TermStartDate = table.Column<DateOnly>(type: "date", nullable: true),
                    TermEndDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    RegistrationPaymentId = table.Column<int>(type: "integer", nullable: true),
                    ContractId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OneshotAddition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OneshotAddition_BillItemTypes_BillItemTypeId",
                        column: x => x.BillItemTypeId,
                        principalSchema: "prop",
                        principalTable: "BillItemTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OneshotAddition_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OneshotAddition_RegistrationPayments_RegistrationPaymentId",
                        column: x => x.RegistrationPaymentId,
                        principalSchema: "prop",
                        principalTable: "RegistrationPayments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RegistrationPaymentRow",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PaymentId = table.Column<int>(type: "integer", nullable: false),
                    PaymentRowCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    PaymentRowSection = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    PaymentRowReceivingEntity = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ReferenceYear = table.Column<int>(type: "integer", nullable: false),
                    ReferencePeriod = table.Column<int>(type: "integer", nullable: true),
                    AmountDue = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    AmountCleared = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrationPaymentRow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistrationPaymentRow_RegistrationPayments_PaymentId",
                        column: x => x.PaymentId,
                        principalSchema: "prop",
                        principalTable: "RegistrationPayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistryCommunications",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsSent = table.Column<bool>(type: "boolean", nullable: false),
                    IsExcluded = table.Column<bool>(type: "boolean", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    CountryISO3 = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    OfficeId = table.Column<int>(type: "integer", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    RegistryNumber = table.Column<string>(type: "text", nullable: true),
                    DebtBankAccountId = table.Column<int>(type: "integer", nullable: true),
                    DebtAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    SenderSubjectId = table.Column<int>(type: "integer", nullable: true),
                    ContractId = table.Column<int>(type: "integer", nullable: true),
                    ContractCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    RequestingSubjectId = table.Column<int>(type: "integer", nullable: true),
                    RequestingSubjectLegalRepresentativeId = table.Column<int>(type: "integer", nullable: true),
                    ContractType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: true),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: true),
                    ContractFee = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    IsPayingEntireContractFee = table.Column<bool>(type: "boolean", nullable: false),
                    RegistryFee = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    StampFee = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RegistryFeePenalty = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    StampFeePenalty = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RegistryFeeInterest = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    StampFeeInterest = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    ContractSignatureDate = table.Column<DateOnly>(type: "date", nullable: true),
                    NumberOfPages = table.Column<int>(type: "integer", nullable: true),
                    NumberOfCopies = table.Column<int>(type: "integer", nullable: true),
                    AttachedDocumentId = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    PaymentId = table.Column<int>(type: "integer", nullable: true),
                    Receipt_IsSuccessful = table.Column<bool>(type: "boolean", nullable: true),
                    Receipt_FailureMessage = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Receipt_ContractAssignedNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Receipt_RegistrationSeries = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Receipt_RegistrationNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistryCommunications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistryCommunications_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "prop",
                        principalTable: "Contracts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RegistryCommunications_RegistrationOffices_OfficeId",
                        column: x => x.OfficeId,
                        principalSchema: "prop",
                        principalTable: "RegistrationOffices",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RegistryCommunications_RegistrationPayments_PaymentId",
                        column: x => x.PaymentId,
                        principalSchema: "prop",
                        principalTable: "RegistrationPayments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SecurityDepositInterestRow",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SecurityDepositContractId = table.Column<int>(type: "integer", nullable: false),
                    SecurityDepositId = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    BaseAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    CalculationDate = table.Column<DateOnly>(type: "date", nullable: false),
                    InterestAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    AppliedInterestRate = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecurityDepositInterestRow", x => new { x.SecurityDepositContractId, x.SecurityDepositId, x.Id });
                    table.ForeignKey(
                        name: "FK_SecurityDepositInterestRow_SecurityDeposit_SecurityDepositC~",
                        columns: x => new { x.SecurityDepositContractId, x.SecurityDepositId },
                        principalSchema: "prop",
                        principalTable: "SecurityDeposit",
                        principalColumns: new[] { "ContractId", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BillRow",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BillId = table.Column<int>(type: "integer", nullable: false),
                    ItemTypeId = table.Column<int>(type: "integer", nullable: false),
                    VATRateId = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    RecurringAdditionSourceId = table.Column<int>(type: "integer", nullable: true),
                    OneshotAdditionSourceId = table.Column<int>(type: "integer", nullable: true),
                    TermInstallmentSourceId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillRow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillRow_BillItemTypes_ItemTypeId",
                        column: x => x.ItemTypeId,
                        principalSchema: "prop",
                        principalTable: "BillItemTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BillRow_Bills_BillId",
                        column: x => x.BillId,
                        principalSchema: "prop",
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillRow_OneshotAddition_OneshotAdditionSourceId",
                        column: x => x.OneshotAdditionSourceId,
                        principalSchema: "prop",
                        principalTable: "OneshotAddition",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BillRow_RecurringAddition_RecurringAdditionSourceId",
                        column: x => x.RecurringAdditionSourceId,
                        principalSchema: "prop",
                        principalTable: "RecurringAddition",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BillRow_TermInstallment_TermInstallmentSourceId",
                        column: x => x.TermInstallmentSourceId,
                        principalSchema: "prop",
                        principalTable: "TermInstallment",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CommEstateUnit",
                schema: "prop",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CommunicationIndex = table.Column<int>(type: "integer", nullable: false),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    EstateUnitType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CityId = table.Column<int>(type: "integer", nullable: true),
                    CadastreType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    EstatePartition = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CadastralCoordinateLevel1 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CadastralCoordinateLevel2 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CadastralCoordinateLevel3 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CadastralCoordinateLevel4 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CadastralCategory = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CadastralAddressToponymy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CadastralAddressNumbering = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    CadastralIncome = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RegistryCommunicationId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommEstateUnit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommEstateUnit_RegistryCommunications_RegistryCommunication~",
                        column: x => x.RegistryCommunicationId,
                        principalSchema: "prop",
                        principalTable: "RegistryCommunications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegistryCommunicationAnomaly",
                schema: "prop",
                columns: table => new
                {
                    RegistryCommunicationId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistryCommunicationAnomaly", x => new { x.RegistryCommunicationId, x.Id });
                    table.ForeignKey(
                        name: "FK_RegistryCommunicationAnomaly_RegistryCommunications_Registr~",
                        column: x => x.RegistryCommunicationId,
                        principalSchema: "prop",
                        principalTable: "RegistryCommunications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdministrationTerms_AdministrationId",
                schema: "prop",
                table: "AdministrationTerms",
                column: "AdministrationId");

            migrationBuilder.CreateIndex(
                name: "IX_BillRow_BillId",
                schema: "prop",
                table: "BillRow",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillRow_ItemTypeId",
                schema: "prop",
                table: "BillRow",
                column: "ItemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_BillRow_OneshotAdditionSourceId",
                schema: "prop",
                table: "BillRow",
                column: "OneshotAdditionSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_BillRow_RecurringAdditionSourceId",
                schema: "prop",
                table: "BillRow",
                column: "RecurringAdditionSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_BillRow_TermInstallmentSourceId",
                schema: "prop",
                table: "BillRow",
                column: "TermInstallmentSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_ContractId",
                schema: "prop",
                table: "Bills",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_CommEstateUnit_RegistryCommunicationId",
                schema: "prop",
                table: "CommEstateUnit",
                column: "RegistryCommunicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_BillingBaseFeeBillItemTypeId",
                schema: "prop",
                table: "Contracts",
                column: "BillingBaseFeeBillItemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_InternalCode",
                schema: "prop",
                table: "Contracts",
                column: "InternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_RegistrationTaxData_RegistrationOfficeId",
                schema: "prop",
                table: "Contracts",
                column: "RegistrationTaxData_RegistrationOfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_SublocatedContractId",
                schema: "prop",
                table: "Contracts",
                column: "SublocatedContractId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_TypeId",
                schema: "prop",
                table: "Contracts",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_OneshotAddition_BillItemTypeId",
                schema: "prop",
                table: "OneshotAddition",
                column: "BillItemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_OneshotAddition_ContractId",
                schema: "prop",
                table: "OneshotAddition",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_OneshotAddition_RegistrationPaymentId",
                schema: "prop",
                table: "OneshotAddition",
                column: "RegistrationPaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_RecurringAddition_BillItemTypeId",
                schema: "prop",
                table: "RecurringAddition",
                column: "BillItemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecurringAddition_ContractId",
                schema: "prop",
                table: "RecurringAddition",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationPaymentRow_PaymentId",
                schema: "prop",
                table: "RegistrationPaymentRow",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationPayments_ContractId",
                schema: "prop",
                table: "RegistrationPayments",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistryCommunications_ContractId",
                schema: "prop",
                table: "RegistryCommunications",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistryCommunications_OfficeId",
                schema: "prop",
                table: "RegistryCommunications",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_RegistryCommunications_PaymentId",
                schema: "prop",
                table: "RegistryCommunications",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_TermInstallment_AdministrationTermId",
                schema: "prop",
                table: "TermInstallment",
                column: "AdministrationTermId");

            migrationBuilder.CreateIndex(
                name: "IX_TermInstallment_BillItemTypeId",
                schema: "prop",
                table: "TermInstallment",
                column: "BillItemTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillingPause",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "BillRow",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "CommEstateUnit",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "Counterpart",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "LocatedUnit",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RatePlan",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RegistrationPaymentRow",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RegistryCommunicationAnomaly",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RevaluationHistory",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "SecurityDepositInterestRow",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "Takeover",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "Transactor",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "Bills",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "OneshotAddition",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RecurringAddition",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "TermInstallment",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RegistryCommunications",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "SecurityDeposit",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "AdministrationTerms",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RegistrationPayments",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "Administrations",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "Contracts",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "BillItemTypes",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "ContractTypes",
                schema: "prop");

            migrationBuilder.DropTable(
                name: "RegistrationOffices",
                schema: "prop");
        }
    }
}
