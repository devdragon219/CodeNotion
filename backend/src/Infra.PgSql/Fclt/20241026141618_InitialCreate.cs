using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.Fclt
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "fclt");

            

            migrationBuilder.CreateTable(
                name: "Calendars",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    TimeZoneId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calendars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContractTypes",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Crafts",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crafts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstateUnitGroups",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ManagementSubjectId = table.Column<int>(type: "integer", nullable: false),
                    EstateUnitIds = table.Column<int[]>(type: "integer[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateUnitGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InterventionTypes",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterventionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PriceListMeasurementUnits",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceListMeasurementUnits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PriceLists",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QualificationLevels",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualificationLevels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TicketTypes",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkTeams",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    ProviderSubjectId = table.Column<int>(type: "integer", nullable: false),
                    LeaderUserId = table.Column<int>(type: "integer", nullable: false),
                    InsertionDate = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkTeams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CalendarDay",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DayOfWeek = table.Column<int>(type: "integer", nullable: false),
                    CalendarId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendarDay", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CalendarDay_Calendars_CalendarId",
                        column: x => x.CalendarId,
                        principalSchema: "fclt",
                        principalTable: "Calendars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Holiday",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Periodicity = table.Column<int>(type: "integer", nullable: false),
                    CalendarId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holiday", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Holiday_Calendars_CalendarId",
                        column: x => x.CalendarId,
                        principalSchema: "fclt",
                        principalTable: "Calendars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContractTemplates",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ContractTypeId = table.Column<int>(type: "integer", nullable: false),
                    CatalogueTypeIds = table.Column<int[]>(type: "integer[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContractTemplates_ContractTypes_ContractTypeId",
                        column: x => x.ContractTypeId,
                        principalSchema: "fclt",
                        principalTable: "ContractTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TicketChecklistTemplates",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    CatalogueTypeId = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    RawWorkCost = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    SafetyCost = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    CostBaseFactor = table.Column<int>(type: "integer", nullable: false),
                    PreventativePlannedPeriod = table.Column<int>(type: "integer", nullable: true),
                    PreventativeDaysOfWeek = table.Column<int[]>(type: "integer[]", nullable: true),
                    PreventativeToleranceDays = table.Column<int>(type: "integer", nullable: true),
                    PreventativeInterventionTypeId = table.Column<int>(type: "integer", nullable: true),
                    PreventativeCraftId = table.Column<int>(type: "integer", nullable: true),
                    PreventativeActivityIds = table.Column<int[]>(type: "integer[]", nullable: true),
                    OnTriggerInterventionTypeId = table.Column<int>(type: "integer", nullable: true),
                    OnTriggerCraftId = table.Column<int>(type: "integer", nullable: true),
                    OnTriggerActivityIds = table.Column<int[]>(type: "integer[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketChecklistTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketChecklistTemplates_Crafts_OnTriggerCraftId",
                        column: x => x.OnTriggerCraftId,
                        principalSchema: "fclt",
                        principalTable: "Crafts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketChecklistTemplates_Crafts_PreventativeCraftId",
                        column: x => x.PreventativeCraftId,
                        principalSchema: "fclt",
                        principalTable: "Crafts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketChecklistTemplates_InterventionTypes_OnTriggerInterve~",
                        column: x => x.OnTriggerInterventionTypeId,
                        principalSchema: "fclt",
                        principalTable: "InterventionTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketChecklistTemplates_InterventionTypes_PreventativeInte~",
                        column: x => x.PreventativeInterventionTypeId,
                        principalSchema: "fclt",
                        principalTable: "InterventionTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PriceListArticles",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    MeasurementUnitId = table.Column<int>(type: "integer", nullable: false),
                    PriceListId = table.Column<int>(type: "integer", nullable: false),
                    CatalogueTypeIds = table.Column<int[]>(type: "integer[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PriceListArticles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PriceListArticles_PriceListMeasurementUnits_MeasurementUnit~",
                        column: x => x.MeasurementUnitId,
                        principalSchema: "fclt",
                        principalTable: "PriceListMeasurementUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PriceListArticles_PriceLists_PriceListId",
                        column: x => x.PriceListId,
                        principalSchema: "fclt",
                        principalTable: "PriceLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TimeRange",
                schema: "fclt",
                columns: table => new
                {
                    CalendarDayId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Since = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    Until = table.Column<TimeOnly>(type: "time without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeRange", x => new { x.CalendarDayId, x.Id });
                    table.ForeignKey(
                        name: "FK_TimeRange_CalendarDay_CalendarDayId",
                        column: x => x.CalendarDayId,
                        principalSchema: "fclt",
                        principalTable: "CalendarDay",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contracts",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    TypeId = table.Column<int>(type: "integer", nullable: false),
                    OriginalTemplateId = table.Column<int>(type: "integer", nullable: true),
                    EntryStatus = table.Column<int>(type: "integer", nullable: false),
                    ProviderSubjectId = table.Column<int>(type: "integer", nullable: false),
                    AgreementDate = table.Column<DateOnly>(type: "date", nullable: true),
                    EffectiveDate = table.Column<DateOnly>(type: "date", nullable: false),
                    ExpirationDate = table.Column<DateOnly>(type: "date", nullable: false),
                    CancellationNoticeDaysCount = table.Column<int>(type: "integer", nullable: true),
                    RenewalNoticeDaysCount = table.Column<int>(type: "integer", nullable: true),
                    MaximumRenewalDaysCount = table.Column<int>(type: "integer", nullable: true),
                    OriginalEstateUnitGroupId = table.Column<int>(type: "integer", nullable: true),
                    EstateUnitIds = table.Column<int[]>(type: "integer[]", nullable: false),
                    CatalogueTypeIds = table.Column<int[]>(type: "integer[]", nullable: false),
                    BillingInfo_BillingPeriod = table.Column<int>(type: "integer", nullable: true),
                    BillingInfo_VATPercentage = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    BillingInfo_PurchaseFeeWithoutVAT = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    BillingInfo_FixedRateFee = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    BillingInfo_DiscountPercentage = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contracts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contracts_ContractTemplates_OriginalTemplateId",
                        column: x => x.OriginalTemplateId,
                        principalSchema: "fclt",
                        principalTable: "ContractTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Contracts_ContractTypes_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "fclt",
                        principalTable: "ContractTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contracts_EstateUnitGroups_OriginalEstateUnitGroupId",
                        column: x => x.OriginalEstateUnitGroupId,
                        principalSchema: "fclt",
                        principalTable: "EstateUnitGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ArticlePricePeriod",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    Price = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    PriceListArticleId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticlePricePeriod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArticlePricePeriod_PriceListArticles_PriceListArticleId",
                        column: x => x.PriceListArticleId,
                        principalSchema: "fclt",
                        principalTable: "PriceListArticles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContractPriceList",
                schema: "fclt",
                columns: table => new
                {
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    PriceListsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractPriceList", x => new { x.ContractId, x.PriceListsId });
                    table.ForeignKey(
                        name: "FK_ContractPriceList_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "fclt",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContractPriceList_PriceLists_PriceListsId",
                        column: x => x.PriceListsId,
                        principalSchema: "fclt",
                        principalTable: "PriceLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FrameworkAgreement",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FrameworkAgreement", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_FrameworkAgreement_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "fclt",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Penalties",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    ThenOperator = table.Column<int>(type: "integer", nullable: false),
                    ContractId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Penalties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Penalties_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "fclt",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SLAs",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    ContractId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SLAs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SLAs_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "fclt",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TermExtension",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    DaysCount = table.Column<int>(type: "integer", nullable: false),
                    FeeDifference = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TermExtension", x => new { x.ContractId, x.Id });
                    table.ForeignKey(
                        name: "FK_TermExtension_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "fclt",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TicketChecklists",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    ContractId = table.Column<int>(type: "integer", nullable: false),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    CatalogueTypeId = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    RawWorkCost = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    SafetyCost = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    CostBaseFactor = table.Column<int>(type: "integer", nullable: false),
                    PreventativePlannedPeriod = table.Column<int>(type: "integer", nullable: true),
                    PreventativeDaysOfWeek = table.Column<int[]>(type: "integer[]", nullable: true),
                    PreventativeToleranceDays = table.Column<int>(type: "integer", nullable: true),
                    PreventativeInterventionTypeId = table.Column<int>(type: "integer", nullable: true),
                    PreventativeCraftId = table.Column<int>(type: "integer", nullable: true),
                    PreventativeActivityIds = table.Column<int[]>(type: "integer[]", nullable: true),
                    OnTriggerInterventionTypeId = table.Column<int>(type: "integer", nullable: true),
                    OnTriggerCraftId = table.Column<int>(type: "integer", nullable: true),
                    OnTriggerActivityIds = table.Column<int[]>(type: "integer[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketChecklists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketChecklists_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "fclt",
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketChecklists_Crafts_OnTriggerCraftId",
                        column: x => x.OnTriggerCraftId,
                        principalSchema: "fclt",
                        principalTable: "Crafts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketChecklists_Crafts_PreventativeCraftId",
                        column: x => x.PreventativeCraftId,
                        principalSchema: "fclt",
                        principalTable: "Crafts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketChecklists_InterventionTypes_OnTriggerInterventionTyp~",
                        column: x => x.OnTriggerInterventionTypeId,
                        principalSchema: "fclt",
                        principalTable: "InterventionTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TicketChecklists_InterventionTypes_PreventativeIntervention~",
                        column: x => x.PreventativeInterventionTypeId,
                        principalSchema: "fclt",
                        principalTable: "InterventionTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ContractTemplatePenaltyRelation",
                schema: "fclt",
                columns: table => new
                {
                    ContractTemplateId = table.Column<int>(type: "integer", nullable: false),
                    PenaltiesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractTemplatePenaltyRelation", x => new { x.ContractTemplateId, x.PenaltiesId });
                    table.ForeignKey(
                        name: "FK_ContractTemplatePenaltyRelation_ContractTemplates_ContractT~",
                        column: x => x.ContractTemplateId,
                        principalSchema: "fclt",
                        principalTable: "ContractTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContractTemplatePenaltyRelation_Penalties_PenaltiesId",
                        column: x => x.PenaltiesId,
                        principalSchema: "fclt",
                        principalTable: "Penalties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PenaltyValue",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    PenaltyId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PenaltyValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PenaltyValue_Penalties_PenaltyId",
                        column: x => x.PenaltyId,
                        principalSchema: "fclt",
                        principalTable: "Penalties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContractTemplateSLARelation",
                schema: "fclt",
                columns: table => new
                {
                    ContractTemplateId = table.Column<int>(type: "integer", nullable: false),
                    SLAsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractTemplateSLARelation", x => new { x.ContractTemplateId, x.SLAsId });
                    table.ForeignKey(
                        name: "FK_ContractTemplateSLARelation_ContractTemplates_ContractTempl~",
                        column: x => x.ContractTemplateId,
                        principalSchema: "fclt",
                        principalTable: "ContractTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContractTemplateSLARelation_SLAs_SLAsId",
                        column: x => x.SLAsId,
                        principalSchema: "fclt",
                        principalTable: "SLAs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TicketCondition",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComplexTicketConditionId = table.Column<int>(type: "integer", nullable: true),
                    Discriminator = table.Column<string>(type: "character varying(55)", maxLength: 55, nullable: false),
                    ComplexTicketCondition_Operator = table.Column<int>(type: "integer", nullable: true),
                    PenaltyId = table.Column<int>(type: "integer", nullable: true),
                    SLAIfId = table.Column<int>(type: "integer", nullable: true),
                    SLAThenId = table.Column<int>(type: "integer", nullable: true),
                    TicketCatalogueCategoryEqualityCondition_Operator = table.Column<int>(type: "integer", nullable: true),
                    TargetCatalogueCategoryId = table.Column<int>(type: "integer", nullable: true),
                    TicketCatalogueSubCategoryEqualityCondition_Operator = table.Column<int>(type: "integer", nullable: true),
                    TargetCatalogueSubCategoryId = table.Column<int>(type: "integer", nullable: true),
                    Operator = table.Column<int>(type: "integer", nullable: true),
                    TargetCatalogueTypeId = table.Column<int>(type: "integer", nullable: true),
                    TargetMasterStatus = table.Column<int>(type: "integer", nullable: true),
                    TimeComparisonOperator = table.Column<int>(type: "integer", nullable: true),
                    CalendarId = table.Column<int>(type: "integer", nullable: true),
                    MinTimePeriodInMinutes = table.Column<int>(type: "integer", nullable: true),
                    MaxTimePeriodInMinutes = table.Column<int>(type: "integer", nullable: true),
                    TicketPriorityEqualityCondition_Operator = table.Column<int>(type: "integer", nullable: true),
                    TargetPriority = table.Column<int>(type: "integer", nullable: true),
                    TicketTypeEqualityCondition_Operator = table.Column<int>(type: "integer", nullable: true),
                    TargetTicketTypeId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketCondition", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketCondition_Calendars_CalendarId",
                        column: x => x.CalendarId,
                        principalSchema: "fclt",
                        principalTable: "Calendars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TicketCondition_Penalties_PenaltyId",
                        column: x => x.PenaltyId,
                        principalSchema: "fclt",
                        principalTable: "Penalties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketCondition_SLAs_SLAIfId",
                        column: x => x.SLAIfId,
                        principalSchema: "fclt",
                        principalTable: "SLAs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketCondition_SLAs_SLAThenId",
                        column: x => x.SLAThenId,
                        principalSchema: "fclt",
                        principalTable: "SLAs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketCondition_TicketCondition_ComplexTicketConditionId",
                        column: x => x.ComplexTicketConditionId,
                        principalSchema: "fclt",
                        principalTable: "TicketCondition",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketCondition_TicketTypes_TargetTicketTypeId",
                        column: x => x.TargetTicketTypeId,
                        principalSchema: "fclt",
                        principalTable: "TicketTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    MainType = table.Column<int>(type: "integer", nullable: false),
                    MasterStatus = table.Column<int>(type: "integer", nullable: false),
                    LocationEstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    LocationFloorId = table.Column<int>(type: "integer", nullable: true),
                    LocationSector = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    LocationRoom = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Requestor = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    RequestorContactEmail = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    RequestorContactPhone = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    RequestDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    IsExcludedFromMaintenanceContract = table.Column<bool>(type: "boolean", nullable: false),
                    IsWorkSafetyExpected = table.Column<bool>(type: "boolean", nullable: false),
                    WorkOrderReference = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CustomTypeId = table.Column<int>(type: "integer", nullable: true),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    CatalogueTypeId = table.Column<int>(type: "integer", nullable: false),
                    CatalogueItemIds = table.Column<int[]>(type: "integer[]", nullable: false),
                    ContractId = table.Column<int>(type: "integer", nullable: true),
                    ChecklistId = table.Column<int>(type: "integer", nullable: true),
                    Summary = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    Resolution_InterventionStart = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Resolution_InterventionEnd = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Resolution_Closure = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Resolution_OperationsPerformed = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Resolution_Diagnosis = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Resolution_ResolutionNotes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Resolution_PartsAndSupplies = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    SupplierSubjectId = table.Column<int>(type: "integer", nullable: false),
                    PlannedTeamId = table.Column<int>(type: "integer", nullable: true),
                    PlannedTeamLeaderUserId = table.Column<int>(type: "integer", nullable: true),
                    IsOverduePlannedPeriod = table.Column<bool>(type: "boolean", nullable: false),
                    TicketId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalSchema: "fclt",
                        principalTable: "Contracts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_TicketChecklists_ChecklistId",
                        column: x => x.ChecklistId,
                        principalSchema: "fclt",
                        principalTable: "TicketChecklists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tickets_TicketTypes_CustomTypeId",
                        column: x => x.CustomTypeId,
                        principalSchema: "fclt",
                        principalTable: "TicketTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalSchema: "fclt",
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tickets_WorkTeams_PlannedTeamId",
                        column: x => x.PlannedTeamId,
                        principalSchema: "fclt",
                        principalTable: "WorkTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PerformedActivity",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TicketId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsMandatoryByLaw = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformedActivity", x => new { x.TicketId, x.Id });
                    table.ForeignKey(
                        name: "FK_PerformedActivity_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalSchema: "fclt",
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Quote",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    MasterStatus = table.Column<int>(type: "integer", nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsFrameworkAgreement = table.Column<bool>(type: "boolean", nullable: true),
                    Classifications = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    InterventionDueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    OrderNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quote", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Quote_Tickets_Id",
                        column: x => x.Id,
                        principalSchema: "fclt",
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reminder",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TicketId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Summary = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reminder", x => new { x.TicketId, x.Id });
                    table.ForeignKey(
                        name: "FK_Reminder_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalSchema: "fclt",
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reply",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsOperator = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    TicketId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reply", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reply_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalSchema: "fclt",
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Worker",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    LastName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: false),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    CraftId = table.Column<int>(type: "integer", nullable: false),
                    QualificationLevelId = table.Column<int>(type: "integer", nullable: false),
                    TicketId = table.Column<int>(type: "integer", nullable: true),
                    WorkTeamId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Worker", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Worker_Crafts_CraftId",
                        column: x => x.CraftId,
                        principalSchema: "fclt",
                        principalTable: "Crafts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Worker_QualificationLevels_QualificationLevelId",
                        column: x => x.QualificationLevelId,
                        principalSchema: "fclt",
                        principalTable: "QualificationLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Worker_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalSchema: "fclt",
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Worker_WorkTeams_WorkTeamId",
                        column: x => x.WorkTeamId,
                        principalSchema: "fclt",
                        principalTable: "WorkTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuoteArticle",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuoteId = table.Column<int>(type: "integer", nullable: false),
                    SourceArticleId = table.Column<int>(type: "integer", nullable: true),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false),
                    MeasurementUnitId = table.Column<int>(type: "integer", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    IsExcluded = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteArticle", x => new { x.QuoteId, x.Id });
                    table.ForeignKey(
                        name: "FK_QuoteArticle_PriceListArticles_SourceArticleId",
                        column: x => x.SourceArticleId,
                        principalSchema: "fclt",
                        principalTable: "PriceListArticles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuoteArticle_PriceListMeasurementUnits_MeasurementUnitId",
                        column: x => x.MeasurementUnitId,
                        principalSchema: "fclt",
                        principalTable: "PriceListMeasurementUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuoteArticle_Quote_QuoteId",
                        column: x => x.QuoteId,
                        principalSchema: "fclt",
                        principalTable: "Quote",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuoteHistoryEntry",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Discriminator = table.Column<string>(type: "character varying(55)", maxLength: 55, nullable: false),
                    QuoteId = table.Column<int>(type: "integer", nullable: true),
                    OldAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    NewAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    OldApprovedAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    NewApprovedAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    OldMasterStatus = table.Column<int>(type: "integer", nullable: true),
                    NewMasterStatus = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteHistoryEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuoteHistoryEntry_Quote_QuoteId",
                        column: x => x.QuoteId,
                        principalSchema: "fclt",
                        principalTable: "Quote",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TicketHistoryEntry",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Discriminator = table.Column<string>(type: "character varying(89)", maxLength: 89, nullable: false),
                    TicketId = table.Column<int>(type: "integer", nullable: true),
                    OldMasterStatus = table.Column<int>(type: "integer", nullable: true),
                    NewMasterStatus = table.Column<int>(type: "integer", nullable: true),
                    NewReminderTicketHistoryEntry_ReminderDate = table.Column<DateOnly>(type: "date", nullable: true),
                    NewReminderTicketHistoryEntry_ReminderSummary = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    ReplyId = table.Column<int>(type: "integer", nullable: true),
                    ReminderDate = table.Column<DateOnly>(type: "date", nullable: true),
                    ReminderSummary = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    OldReminderDate = table.Column<DateOnly>(type: "date", nullable: true),
                    OldReminderSummary = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    NewReminderDate = table.Column<DateOnly>(type: "date", nullable: true),
                    NewReminderSummary = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketHistoryEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketHistoryEntry_Reply_ReplyId",
                        column: x => x.ReplyId,
                        principalSchema: "fclt",
                        principalTable: "Reply",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TicketHistoryEntry_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalSchema: "fclt",
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticlePricePeriod_PriceListArticleId",
                schema: "fclt",
                table: "ArticlePricePeriod",
                column: "PriceListArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarDay_CalendarId",
                schema: "fclt",
                table: "CalendarDay",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_ContractPriceList_PriceListsId",
                schema: "fclt",
                table: "ContractPriceList",
                column: "PriceListsId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_OriginalEstateUnitGroupId",
                schema: "fclt",
                table: "Contracts",
                column: "OriginalEstateUnitGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_OriginalTemplateId",
                schema: "fclt",
                table: "Contracts",
                column: "OriginalTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_TypeId",
                schema: "fclt",
                table: "Contracts",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ContractTemplatePenaltyRelation_PenaltiesId",
                schema: "fclt",
                table: "ContractTemplatePenaltyRelation",
                column: "PenaltiesId");

            migrationBuilder.CreateIndex(
                name: "IX_ContractTemplates_ContractTypeId",
                schema: "fclt",
                table: "ContractTemplates",
                column: "ContractTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ContractTemplateSLARelation_SLAsId",
                schema: "fclt",
                table: "ContractTemplateSLARelation",
                column: "SLAsId");

            migrationBuilder.CreateIndex(
                name: "IX_Holiday_CalendarId",
                schema: "fclt",
                table: "Holiday",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_Penalties_ContractId",
                schema: "fclt",
                table: "Penalties",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_PenaltyValue_PenaltyId",
                schema: "fclt",
                table: "PenaltyValue",
                column: "PenaltyId");

            migrationBuilder.CreateIndex(
                name: "IX_PriceListArticles_MeasurementUnitId",
                schema: "fclt",
                table: "PriceListArticles",
                column: "MeasurementUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_PriceListArticles_PriceListId",
                schema: "fclt",
                table: "PriceListArticles",
                column: "PriceListId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteArticle_MeasurementUnitId",
                schema: "fclt",
                table: "QuoteArticle",
                column: "MeasurementUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteArticle_SourceArticleId",
                schema: "fclt",
                table: "QuoteArticle",
                column: "SourceArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteHistoryEntry_QuoteId",
                schema: "fclt",
                table: "QuoteHistoryEntry",
                column: "QuoteId");

            migrationBuilder.CreateIndex(
                name: "IX_Reply_TicketId",
                schema: "fclt",
                table: "Reply",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_SLAs_ContractId",
                schema: "fclt",
                table: "SLAs",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklists_ContractId",
                schema: "fclt",
                table: "TicketChecklists",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklists_OnTriggerCraftId",
                schema: "fclt",
                table: "TicketChecklists",
                column: "OnTriggerCraftId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklists_OnTriggerInterventionTypeId",
                schema: "fclt",
                table: "TicketChecklists",
                column: "OnTriggerInterventionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklists_PreventativeCraftId",
                schema: "fclt",
                table: "TicketChecklists",
                column: "PreventativeCraftId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklists_PreventativeInterventionTypeId",
                schema: "fclt",
                table: "TicketChecklists",
                column: "PreventativeInterventionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklistTemplates_OnTriggerCraftId",
                schema: "fclt",
                table: "TicketChecklistTemplates",
                column: "OnTriggerCraftId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklistTemplates_OnTriggerInterventionTypeId",
                schema: "fclt",
                table: "TicketChecklistTemplates",
                column: "OnTriggerInterventionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklistTemplates_PreventativeCraftId",
                schema: "fclt",
                table: "TicketChecklistTemplates",
                column: "PreventativeCraftId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketChecklistTemplates_PreventativeInterventionTypeId",
                schema: "fclt",
                table: "TicketChecklistTemplates",
                column: "PreventativeInterventionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketCondition_CalendarId",
                schema: "fclt",
                table: "TicketCondition",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketCondition_ComplexTicketConditionId",
                schema: "fclt",
                table: "TicketCondition",
                column: "ComplexTicketConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketCondition_PenaltyId",
                schema: "fclt",
                table: "TicketCondition",
                column: "PenaltyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketCondition_SLAIfId",
                schema: "fclt",
                table: "TicketCondition",
                column: "SLAIfId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketCondition_SLAThenId",
                schema: "fclt",
                table: "TicketCondition",
                column: "SLAThenId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketCondition_TargetTicketTypeId",
                schema: "fclt",
                table: "TicketCondition",
                column: "TargetTicketTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketHistoryEntry_ReplyId",
                schema: "fclt",
                table: "TicketHistoryEntry",
                column: "ReplyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketHistoryEntry_TicketId",
                schema: "fclt",
                table: "TicketHistoryEntry",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_ChecklistId",
                schema: "fclt",
                table: "Tickets",
                column: "ChecklistId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_ContractId",
                schema: "fclt",
                table: "Tickets",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_CustomTypeId",
                schema: "fclt",
                table: "Tickets",
                column: "CustomTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_PlannedTeamId",
                schema: "fclt",
                table: "Tickets",
                column: "PlannedTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TicketId",
                schema: "fclt",
                table: "Tickets",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_CraftId",
                schema: "fclt",
                table: "Worker",
                column: "CraftId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_QualificationLevelId",
                schema: "fclt",
                table: "Worker",
                column: "QualificationLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_TicketId",
                schema: "fclt",
                table: "Worker",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Worker_WorkTeamId",
                schema: "fclt",
                table: "Worker",
                column: "WorkTeamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArticlePricePeriod",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "ContractPriceList",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "ContractTemplatePenaltyRelation",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "ContractTemplateSLARelation",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "FrameworkAgreement",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Holiday",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "PenaltyValue",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "PerformedActivity",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "QuoteArticle",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "QuoteHistoryEntry",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Reminder",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "TermExtension",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "TicketChecklistTemplates",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "TicketCondition",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "TicketHistoryEntry",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "TimeRange",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Worker",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "PriceListArticles",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Quote",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Penalties",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "SLAs",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Reply",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "CalendarDay",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "QualificationLevels",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "PriceListMeasurementUnits",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "PriceLists",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Tickets",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Calendars",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "TicketChecklists",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "TicketTypes",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "WorkTeams",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Contracts",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Crafts",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "InterventionTypes",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "ContractTemplates",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "EstateUnitGroups",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "ContractTypes",
                schema: "fclt");
        }
    }
}
