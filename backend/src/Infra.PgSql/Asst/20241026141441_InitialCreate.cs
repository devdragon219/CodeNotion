using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.Asst
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "asst");

            

            migrationBuilder.CreateTable(
                name: "CadastralCategories",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    GroupName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    CountryISO = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    CadastralValueFactor = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    CadastralValueTaxFactor = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    IsInstrumental = table.Column<bool>(type: "boolean", nullable: false),
                    IsTaxed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadastralCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CadastralLandCategories",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CountryISO = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadastralLandCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogueCategories",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogueCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstateMainUsageTypes",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateMainUsageTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EstateUsageTypes",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Ordering = table.Column<int>(type: "integer", nullable: false),
                    IsForEstate = table.Column<bool>(type: "boolean", nullable: false),
                    IsForEstateUnit = table.Column<bool>(type: "boolean", nullable: false),
                    IsForEstateSubUnit = table.Column<bool>(type: "boolean", nullable: false),
                    IsForContracts = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateUsageTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FloorTemplates",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Position = table.Column<float>(type: "real", nullable: false),
                    Guid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FloorTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FunctionArea",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    SurfaceType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionArea", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogueSubCategory",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogueSubCategory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CatalogueSubCategory_CatalogueCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "asst",
                        principalTable: "CatalogueCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Estates",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Ownership = table.Column<int>(type: "integer", nullable: false),
                    MainUsageTypeId = table.Column<int>(type: "integer", nullable: false),
                    UsageTypeId = table.Column<int>(type: "integer", nullable: false),
                    SurfaceAreaSqM = table.Column<int>(type: "integer", nullable: true),
                    BuildYear = table.Column<int>(type: "integer", nullable: true),
                    DecommissioningDate = table.Column<DateOnly>(type: "date", nullable: true),
                    ManagementSubjectId = table.Column<int>(type: "integer", nullable: false),
                    ManagementOrgUnitId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TotalMarketValue_TotalSurfaceAreaSqM = table.Column<int>(type: "integer", nullable: true),
                    TotalMarketValue_Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Estates_EstateMainUsageTypes_MainUsageTypeId",
                        column: x => x.MainUsageTypeId,
                        principalSchema: "asst",
                        principalTable: "EstateMainUsageTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Estates_EstateUsageTypes_UsageTypeId",
                        column: x => x.UsageTypeId,
                        principalSchema: "asst",
                        principalTable: "EstateUsageTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CatalogueTypes",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    SubCategoryId = table.Column<int>(type: "integer", nullable: true),
                    Fields = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogueTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CatalogueTypes_CatalogueCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "asst",
                        principalTable: "CatalogueCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CatalogueTypes_CatalogueSubCategory_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalSchema: "asst",
                        principalTable: "CatalogueSubCategory",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Address",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateId = table.Column<int>(type: "integer", nullable: true),
                    AddressType = table.Column<int>(type: "integer", nullable: false),
                    CityName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CityReference = table.Column<Guid>(type: "uuid", nullable: true),
                    CountyName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CountyReference = table.Column<Guid>(type: "uuid", nullable: true),
                    RegionName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegionReference = table.Column<Guid>(type: "uuid", nullable: true),
                    CountryName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CountryISO = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    Toponymy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Numbering = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    LocalPostCode = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LocationLatLon = table.Column<Point>(type: "geometry", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Address_Estates_EstateId",
                        column: x => x.EstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EstateMarketValue",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    EstateTotalMarketValueEstateId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateMarketValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstateMarketValue_Estates_EstateTotalMarketValueEstateId",
                        column: x => x.EstateTotalMarketValueEstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstateTotalMarketValueCoefficient",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    EstateTotalMarketValueEstateId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateTotalMarketValueCoefficient", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstateTotalMarketValueCoefficient_Estates_EstateTotalMarket~",
                        column: x => x.EstateTotalMarketValueEstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Floor",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Position = table.Column<float>(type: "real", nullable: false),
                    TemplateReference = table.Column<Guid>(type: "uuid", nullable: false),
                    EstateId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Floor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Floor_Estates_EstateId",
                        column: x => x.EstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Refactoring",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateId = table.Column<int>(type: "integer", nullable: false),
                    ReferenceYear = table.Column<int>(type: "integer", nullable: false),
                    BuildingPermitYear = table.Column<int>(type: "integer", nullable: true),
                    Condition = table.Column<int>(type: "integer", nullable: false),
                    AgeCoefficient = table.Column<double>(type: "double precision", nullable: true),
                    EstateUnitIds = table.Column<int[]>(type: "integer[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refactoring", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Refactoring_Estates_EstateId",
                        column: x => x.EstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stair",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    EstateId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stair", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stair_Estates_EstateId",
                        column: x => x.EstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Valuation",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateId = table.Column<int>(type: "integer", nullable: false),
                    ReferenceYear = table.Column<int>(type: "integer", nullable: false),
                    IASValue = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RBAValue = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    MortgageAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    TransferYear = table.Column<int>(type: "integer", nullable: true),
                    RevampOperations = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Valuation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Valuation_Estates_EstateId",
                        column: x => x.EstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CatalogueItems",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateId = table.Column<int>(type: "integer", nullable: false),
                    CatalogueTypeId = table.Column<int>(type: "integer", nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ActivationDate = table.Column<DateOnly>(type: "date", nullable: false),
                    LastMaintenanceDate = table.Column<DateOnly>(type: "date", nullable: false),
                    DecommissioningDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Fields = table.Column<string>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogueItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CatalogueItems_CatalogueTypes_CatalogueTypeId",
                        column: x => x.CatalogueTypeId,
                        principalSchema: "asst",
                        principalTable: "CatalogueTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CatalogueItems_Estates_EstateId",
                        column: x => x.EstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CatalogueTypeActivity",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    ActivityType = table.Column<int>(type: "integer", nullable: false),
                    IsMandatoryByLaw = table.Column<bool>(type: "boolean", nullable: false),
                    TypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogueTypeActivity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CatalogueTypeActivity_CatalogueTypes_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "asst",
                        principalTable: "CatalogueTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CatalogueTypeEstateUsageType",
                schema: "asst",
                columns: table => new
                {
                    CatalogueTypeId = table.Column<int>(type: "integer", nullable: false),
                    UsageTypesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogueTypeEstateUsageType", x => new { x.CatalogueTypeId, x.UsageTypesId });
                    table.ForeignKey(
                        name: "FK_CatalogueTypeEstateUsageType_CatalogueTypes_CatalogueTypeId",
                        column: x => x.CatalogueTypeId,
                        principalSchema: "asst",
                        principalTable: "CatalogueTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CatalogueTypeEstateUsageType_EstateUsageTypes_UsageTypesId",
                        column: x => x.UsageTypesId,
                        principalSchema: "asst",
                        principalTable: "EstateUsageTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstateUnits",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    UsageTypeId = table.Column<int>(type: "integer", nullable: false),
                    OwnershipType = table.Column<int>(type: "integer", nullable: false),
                    OwnershipStartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    OwnershipEndDate = table.Column<DateOnly>(type: "date", nullable: true),
                    OwnershipPercent = table.Column<double>(type: "double precision", nullable: true),
                    SharedArea = table.Column<bool>(type: "boolean", nullable: false),
                    ProcurementActId = table.Column<int>(type: "integer", nullable: true),
                    ManagementSubjectId = table.Column<int>(type: "integer", nullable: false),
                    CostCentreId = table.Column<int>(type: "integer", nullable: true),
                    DisusedDate = table.Column<DateOnly>(type: "date", nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastRelevantChangeDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EstateId = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    SubNumbering = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    StairId = table.Column<int>(type: "integer", nullable: true),
                    OfficialActId = table.Column<int>(type: "integer", nullable: true),
                    HistoryTags = table.Column<Guid[]>(type: "uuid[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstateUnits_Address_AddressId",
                        column: x => x.AddressId,
                        principalSchema: "asst",
                        principalTable: "Address",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstateUnits_EstateUsageTypes_UsageTypeId",
                        column: x => x.UsageTypeId,
                        principalSchema: "asst",
                        principalTable: "EstateUsageTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EstateUnits_Estates_EstateId",
                        column: x => x.EstateId,
                        principalSchema: "asst",
                        principalTable: "Estates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstateUnits_Stair_StairId",
                        column: x => x.StairId,
                        principalSchema: "asst",
                        principalTable: "Stair",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CadastralUnits",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastRelevantChangeDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    HistoryTags = table.Column<Guid[]>(type: "uuid[]", nullable: false),
                    IsCadastralRegistrationInProgress = table.Column<bool>(type: "boolean", nullable: false),
                    IsAncillaryUnit = table.Column<bool>(type: "boolean", nullable: false),
                    Income_CadastralCategoryId = table.Column<int>(type: "integer", nullable: true),
                    Income_CadastralLandCategoryId = table.Column<int>(type: "integer", nullable: true),
                    Income_MacroCategory = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Income_MicroCategory = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Income_Metric = table.Column<int>(type: "integer", nullable: true),
                    Income_MetricAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    Income_MetricRentedAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    Income_RegisteredSurface = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    Income_Type = table.Column<int>(type: "integer", nullable: true),
                    Income_CadastralAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    Income_FarmAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    Income_LandAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    Income_MarketValue = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    CadastralNotes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    FiscalNotes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    ConsortiumNotes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Inspection_Date = table.Column<DateOnly>(type: "date", nullable: true),
                    Inspection_ProtocolDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Inspection_ProtocolNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Inspection_Heading = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Inspection_MacroZone = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Inspection_MicroZone = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Inspection_IsHistoricalEstate = table.Column<bool>(type: "boolean", nullable: true),
                    Inspection_IsDirectRestriction = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadastralUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CadastralUnits_Address_AddressId",
                        column: x => x.AddressId,
                        principalSchema: "asst",
                        principalTable: "Address",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CadastralUnits_CadastralCategories_Income_CadastralCategory~",
                        column: x => x.Income_CadastralCategoryId,
                        principalSchema: "asst",
                        principalTable: "CadastralCategories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CadastralUnits_CadastralLandCategories_Income_CadastralLand~",
                        column: x => x.Income_CadastralLandCategoryId,
                        principalSchema: "asst",
                        principalTable: "CadastralLandCategories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CadastralUnits_EstateUnits_EstateUnitId",
                        column: x => x.EstateUnitId,
                        principalSchema: "asst",
                        principalTable: "EstateUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstateSubUnits",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    OccupantType = table.Column<int>(type: "integer", nullable: true),
                    OccupantId = table.Column<int>(type: "integer", nullable: true),
                    UsageTypeId = table.Column<int>(type: "integer", nullable: true),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    OrgUnitId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SurfaceSqM = table.Column<int>(type: "integer", nullable: true),
                    OccupancyPercent = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateSubUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstateSubUnits_EstateUnits_EstateUnitId",
                        column: x => x.EstateUnitId,
                        principalSchema: "asst",
                        principalTable: "EstateUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstateSubUnits_EstateUsageTypes_UsageTypeId",
                        column: x => x.UsageTypeId,
                        principalSchema: "asst",
                        principalTable: "EstateUsageTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EstateUnitFloor",
                schema: "asst",
                columns: table => new
                {
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    FloorId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateUnitFloor", x => new { x.EstateUnitId, x.FloorId });
                    table.ForeignKey(
                        name: "FK_EstateUnitFloor_EstateUnits_EstateUnitId",
                        column: x => x.EstateUnitId,
                        principalSchema: "asst",
                        principalTable: "EstateUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstateUnitFloor_Floor_FloorId",
                        column: x => x.FloorId,
                        principalSchema: "asst",
                        principalTable: "Floor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EstateUnitSurface",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    Metric = table.Column<int>(type: "integer", nullable: false),
                    SurfaceSqMTotal = table.Column<int>(type: "integer", nullable: true),
                    SurfaceSqMCommonArea = table.Column<int>(type: "integer", nullable: true),
                    SurfaceSqMSideArea = table.Column<int>(type: "integer", nullable: true),
                    FloorId = table.Column<int>(type: "integer", nullable: true),
                    FunctionAreaId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstateUnitSurface", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstateUnitSurface_EstateUnits_EstateUnitId",
                        column: x => x.EstateUnitId,
                        principalSchema: "asst",
                        principalTable: "EstateUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EstateUnitSurface_Floor_FloorId",
                        column: x => x.FloorId,
                        principalSchema: "asst",
                        principalTable: "Floor",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EstateUnitSurface_FunctionArea_FunctionAreaId",
                        column: x => x.FunctionAreaId,
                        principalSchema: "asst",
                        principalTable: "FunctionArea",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Repossession",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    EventDate = table.Column<DateOnly>(type: "date", nullable: true),
                    EventType = table.Column<int>(type: "integer", nullable: true),
                    EventReason = table.Column<int>(type: "integer", nullable: true),
                    UnitStatus = table.Column<int>(type: "integer", nullable: true),
                    IsAssignable = table.Column<bool>(type: "boolean", nullable: true),
                    IsKeysReturned = table.Column<bool>(type: "boolean", nullable: true),
                    IsWithValuables = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Repossession", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Repossession_EstateUnits_EstateUnitId",
                        column: x => x.EstateUnitId,
                        principalSchema: "asst",
                        principalTable: "EstateUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UnitExpenses",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: false),
                    ReferenceYear = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    RevaluationFactor = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitExpenses_EstateUnits_EstateUnitId",
                        column: x => x.EstateUnitId,
                        principalSchema: "asst",
                        principalTable: "EstateUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetTaxCalculations",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CadastralUnitId = table.Column<int>(type: "integer", nullable: false),
                    TaxCalculator = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    TaxCalculatorId = table.Column<Guid>(type: "uuid", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    ExpectedInstallments = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetTaxCalculations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssetTaxCalculations_CadastralUnits_CadastralUnitId",
                        column: x => x.CadastralUnitId,
                        principalSchema: "asst",
                        principalTable: "CadastralUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CadastralCoordinates",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CadastralUnitId = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Level1 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Level2 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Level3 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Level4 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Level5 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CoordinateType = table.Column<int>(type: "integer", nullable: false),
                    ITTavPartita = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ITTavCorpo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ITTavPorzione = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    UnmanagedOverride = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadastralCoordinates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CadastralCoordinates_CadastralUnits_CadastralUnitId",
                        column: x => x.CadastralUnitId,
                        principalSchema: "asst",
                        principalTable: "CadastralUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CadastralExpenses",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CadastralUnitId = table.Column<int>(type: "integer", nullable: false),
                    ExpenseType = table.Column<int>(type: "integer", nullable: false),
                    ReferenceYear = table.Column<int>(type: "integer", nullable: false),
                    FiscalYear = table.Column<int>(type: "integer", nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    RevaluationFactor = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadastralExpenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CadastralExpenses_CadastralUnits_CadastralUnitId",
                        column: x => x.CadastralUnitId,
                        principalSchema: "asst",
                        principalTable: "CadastralUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CadastralUnavailability",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CadastralUnitId = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadastralUnavailability", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CadastralUnavailability_CadastralUnits_CadastralUnitId",
                        column: x => x.CadastralUnitId,
                        principalSchema: "asst",
                        principalTable: "CadastralUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CadastralUnitTaxConfig",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TaxCalculator = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsMandatory = table.Column<bool>(type: "boolean", nullable: false),
                    TemplateTypeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    CadastralUnitId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadastralUnitTaxConfig", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CadastralUnitTaxConfig_CadastralUnits_CadastralUnitId",
                        column: x => x.CadastralUnitId,
                        principalSchema: "asst",
                        principalTable: "CadastralUnits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AssetTaxPayment",
                schema: "asst",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AssetTaxCalculationId = table.Column<int>(type: "integer", nullable: true),
                    ManagementSubjectId = table.Column<int>(type: "integer", nullable: false),
                    ManagementSubjectBankAccountId = table.Column<int>(type: "integer", nullable: true),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    PropertyMonths = table.Column<int>(type: "integer", nullable: false),
                    GrossCadastralIncome = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    ActualizedCadastralIncome = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    BaseTaxableAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    DebitedAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    CreditedAmount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    TaxName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    IsDefinitive = table.Column<bool>(type: "boolean", nullable: false),
                    ExpectedDueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    InstallmentsPaid = table.Column<int[]>(type: "integer[]", nullable: false),
                    Issue = table.Column<int>(type: "integer", nullable: true),
                    IsIssueOverridden = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetTaxPayment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssetTaxPayment_AssetTaxCalculations_AssetTaxCalculationId",
                        column: x => x.AssetTaxCalculationId,
                        principalSchema: "asst",
                        principalTable: "AssetTaxCalculations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_EstateId",
                schema: "asst",
                table: "Address",
                column: "EstateId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetTaxCalculations_CadastralUnitId",
                schema: "asst",
                table: "AssetTaxCalculations",
                column: "CadastralUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetTaxPayment_AssetTaxCalculationId",
                schema: "asst",
                table: "AssetTaxPayment",
                column: "AssetTaxCalculationId");

            migrationBuilder.CreateIndex(
                name: "IX_CadastralCoordinates_CadastralUnitId",
                schema: "asst",
                table: "CadastralCoordinates",
                column: "CadastralUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_CadastralExpenses_CadastralUnitId",
                schema: "asst",
                table: "CadastralExpenses",
                column: "CadastralUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_CadastralUnavailability_CadastralUnitId",
                schema: "asst",
                table: "CadastralUnavailability",
                column: "CadastralUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_CadastralUnits_AddressId",
                schema: "asst",
                table: "CadastralUnits",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CadastralUnits_EstateUnitId",
                schema: "asst",
                table: "CadastralUnits",
                column: "EstateUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_CadastralUnits_Income_CadastralCategoryId",
                schema: "asst",
                table: "CadastralUnits",
                column: "Income_CadastralCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CadastralUnits_Income_CadastralLandCategoryId",
                schema: "asst",
                table: "CadastralUnits",
                column: "Income_CadastralLandCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CadastralUnitTaxConfig_CadastralUnitId_TaxCalculator_Code",
                schema: "asst",
                table: "CadastralUnitTaxConfig",
                columns: new[] { "CadastralUnitId", "TaxCalculator", "Code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CatalogueItems_CatalogueTypeId",
                schema: "asst",
                table: "CatalogueItems",
                column: "CatalogueTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogueItems_EstateId",
                schema: "asst",
                table: "CatalogueItems",
                column: "EstateId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogueSubCategory_CategoryId",
                schema: "asst",
                table: "CatalogueSubCategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogueTypeActivity_TypeId",
                schema: "asst",
                table: "CatalogueTypeActivity",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogueTypeEstateUsageType_UsageTypesId",
                schema: "asst",
                table: "CatalogueTypeEstateUsageType",
                column: "UsageTypesId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogueTypes_CategoryId",
                schema: "asst",
                table: "CatalogueTypes",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogueTypes_SubCategoryId",
                schema: "asst",
                table: "CatalogueTypes",
                column: "SubCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateMarketValue_EstateTotalMarketValueEstateId",
                schema: "asst",
                table: "EstateMarketValue",
                column: "EstateTotalMarketValueEstateId");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_InternalCode",
                schema: "asst",
                table: "Estates",
                column: "InternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_MainUsageTypeId",
                schema: "asst",
                table: "Estates",
                column: "MainUsageTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Estates_UsageTypeId",
                schema: "asst",
                table: "Estates",
                column: "UsageTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateSubUnits_EstateUnitId",
                schema: "asst",
                table: "EstateSubUnits",
                column: "EstateUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateSubUnits_InternalCode",
                schema: "asst",
                table: "EstateSubUnits",
                column: "InternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_EstateSubUnits_UsageTypeId",
                schema: "asst",
                table: "EstateSubUnits",
                column: "UsageTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateTotalMarketValueCoefficient_EstateTotalMarketValueEst~",
                schema: "asst",
                table: "EstateTotalMarketValueCoefficient",
                column: "EstateTotalMarketValueEstateId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnitFloor_FloorId",
                schema: "asst",
                table: "EstateUnitFloor",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnits_AddressId",
                schema: "asst",
                table: "EstateUnits",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnits_EstateId",
                schema: "asst",
                table: "EstateUnits",
                column: "EstateId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnits_InternalCode",
                schema: "asst",
                table: "EstateUnits",
                column: "InternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnits_StairId",
                schema: "asst",
                table: "EstateUnits",
                column: "StairId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnits_UsageTypeId",
                schema: "asst",
                table: "EstateUnits",
                column: "UsageTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnitSurface_EstateUnitId",
                schema: "asst",
                table: "EstateUnitSurface",
                column: "EstateUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnitSurface_FloorId",
                schema: "asst",
                table: "EstateUnitSurface",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_EstateUnitSurface_FunctionAreaId",
                schema: "asst",
                table: "EstateUnitSurface",
                column: "FunctionAreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Floor_EstateId",
                schema: "asst",
                table: "Floor",
                column: "EstateId");

            migrationBuilder.CreateIndex(
                name: "IX_Refactoring_EstateId",
                schema: "asst",
                table: "Refactoring",
                column: "EstateId");

            migrationBuilder.CreateIndex(
                name: "IX_Repossession_EstateUnitId",
                schema: "asst",
                table: "Repossession",
                column: "EstateUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Stair_EstateId",
                schema: "asst",
                table: "Stair",
                column: "EstateId");

            migrationBuilder.CreateIndex(
                name: "IX_UnitExpenses_EstateUnitId",
                schema: "asst",
                table: "UnitExpenses",
                column: "EstateUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Valuation_EstateId",
                schema: "asst",
                table: "Valuation",
                column: "EstateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetTaxPayment",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CadastralCoordinates",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CadastralExpenses",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CadastralUnavailability",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CadastralUnitTaxConfig",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CatalogueItems",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CatalogueTypeActivity",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CatalogueTypeEstateUsageType",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateMarketValue",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateSubUnits",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateTotalMarketValueCoefficient",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateUnitFloor",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateUnitSurface",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "FloorTemplates",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "Refactoring",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "Repossession",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "UnitExpenses",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "Valuation",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "AssetTaxCalculations",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CatalogueTypes",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "Floor",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "FunctionArea",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CadastralUnits",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CatalogueSubCategory",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CadastralCategories",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CadastralLandCategories",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateUnits",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "CatalogueCategories",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "Address",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "Stair",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "Estates",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateMainUsageTypes",
                schema: "asst");

            migrationBuilder.DropTable(
                name: "EstateUsageTypes",
                schema: "asst");
        }
    }
}
