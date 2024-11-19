using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.Common
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "common");

            

            migrationBuilder.CreateTable(
                name: "AccountingItems",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountingItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    TablePk = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: false),
                    AuditData = table.Column<string>(type: "character varying(7400)", maxLength: 7400, nullable: true),
                    AuditUser = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    Action = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    AuditDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Name2 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Name3 = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    CityProvider = table.Column<Guid>(type: "uuid", nullable: false),
                    CountyName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CountyGuid = table.Column<Guid>(type: "uuid", nullable: true),
                    RegionName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegionGuid = table.Column<Guid>(type: "uuid", nullable: true),
                    CountryName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CountryISO = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CadastralCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CityExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CountyExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegionExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CountyShortCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsCountyMainCity = table.Column<bool>(type: "boolean", nullable: false),
                    ClimateZoneCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    AdministrativeBoundary = table.Column<Polygon>(type: "geometry", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Config",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Function = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Value = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    LastUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Config", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CostCentres",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ManagementSubjectId = table.Column<int>(type: "integer", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostCentres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomCodes",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    DataProvider = table.Column<Guid>(type: "uuid", nullable: false),
                    Group = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Function = table.Column<int>(type: "integer", nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomCodes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InterestRates",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Rate = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    CountryISO3 = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterestRates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Title = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Body = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Discriminator = table.Column<string>(type: "character varying(55)", maxLength: 55, nullable: false),
                    ContractIds = table.Column<int[]>(type: "integer[]", nullable: true),
                    IsActiveContracts = table.Column<bool>(type: "boolean", nullable: true),
                    CostChargeIds = table.Column<int[]>(type: "integer[]", nullable: true),
                    DocumentCmisId = table.Column<string>(type: "text", nullable: true),
                    EntityId = table.Column<int>(type: "integer", nullable: true),
                    EstateId = table.Column<int>(type: "integer", nullable: true),
                    CatalogueTypeId = table.Column<int>(type: "integer", nullable: true),
                    IsContractActive = table.Column<bool>(type: "boolean", nullable: true),
                    IsContractSublocated = table.Column<bool>(type: "boolean", nullable: true),
                    DownloadGuid = table.Column<Guid>(type: "uuid", nullable: true),
                    PasswordExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OfficialActs",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProtocolNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegistrationNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    IssuerName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    IssuerCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IssuerExternalCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IssueDate = table.Column<DateOnly>(type: "date", nullable: true),
                    RegistrationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfficialActs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RevaluationData",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Month = table.Column<int>(type: "integer", nullable: false),
                    DataProvider = table.Column<Guid>(type: "uuid", nullable: false),
                    CountryISO3 = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    BaseYear = table.Column<int>(type: "integer", nullable: false),
                    RevaluationIndex = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RevaluationData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaxConfigs",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TaxCalculator = table.Column<Guid>(type: "uuid", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Table = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    GroupingName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    GroupingReference = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VATRates",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    RatePercent = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VATRates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ActRegistrationDate",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DateType = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<DateOnly>(type: "date", nullable: false),
                    OfficialActId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActRegistrationDate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActRegistrationDate_OfficialActs_OfficialActId",
                        column: x => x.OfficialActId,
                        principalSchema: "common",
                        principalTable: "OfficialActs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActRegistrationField",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FieldType = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    OfficialActId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActRegistrationField", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActRegistrationField_OfficialActs_OfficialActId",
                        column: x => x.OfficialActId,
                        principalSchema: "common",
                        principalTable: "OfficialActs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TaxConfigSubValue",
                schema: "common",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Label = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    SubTable = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    NumberValue = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: true),
                    StringValue = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    DateValue = table.Column<DateOnly>(type: "date", nullable: true),
                    BooleanValue = table.Column<bool>(type: "boolean", nullable: true),
                    ValueType = table.Column<int>(type: "integer", nullable: false),
                    TaxConfigId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxConfigSubValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaxConfigSubValue_TaxConfigs_TaxConfigId",
                        column: x => x.TaxConfigId,
                        principalSchema: "common",
                        principalTable: "TaxConfigs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActRegistrationDate_OfficialActId",
                schema: "common",
                table: "ActRegistrationDate",
                column: "OfficialActId");

            migrationBuilder.CreateIndex(
                name: "IX_ActRegistrationField_OfficialActId",
                schema: "common",
                table: "ActRegistrationField",
                column: "OfficialActId");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CadastralCode",
                schema: "common",
                table: "Cities",
                column: "CadastralCode");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CityProvider",
                schema: "common",
                table: "Cities",
                column: "CityProvider");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CityProvider_CityExternalCode",
                schema: "common",
                table: "Cities",
                columns: new[] { "CityProvider", "CityExternalCode" });

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CityProvider_CountyExternalCode",
                schema: "common",
                table: "Cities",
                columns: new[] { "CityProvider", "CountyExternalCode" });

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CityProvider_RegionExternalCode",
                schema: "common",
                table: "Cities",
                columns: new[] { "CityProvider", "RegionExternalCode" });

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CountryISO",
                schema: "common",
                table: "Cities",
                column: "CountryISO");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_CountyGuid",
                schema: "common",
                table: "Cities",
                column: "CountyGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_Guid",
                schema: "common",
                table: "Cities",
                column: "Guid");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_RegionGuid",
                schema: "common",
                table: "Cities",
                column: "RegionGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Config_Function_Name",
                schema: "common",
                table: "Config",
                columns: new[] { "Function", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomCodes_DataProvider_Group",
                schema: "common",
                table: "CustomCodes",
                columns: new[] { "DataProvider", "Group" });

            migrationBuilder.CreateIndex(
                name: "IX_CustomCodes_ExternalCode",
                schema: "common",
                table: "CustomCodes",
                column: "ExternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_CustomCodes_InternalCode",
                schema: "common",
                table: "CustomCodes",
                column: "InternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Username",
                schema: "common",
                table: "Notifications",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_TaxConfigSubValue_TaxConfigId",
                schema: "common",
                table: "TaxConfigSubValue",
                column: "TaxConfigId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountingItems",
                schema: "common");

            migrationBuilder.DropTable(
                name: "ActRegistrationDate",
                schema: "common");

            migrationBuilder.DropTable(
                name: "ActRegistrationField",
                schema: "common");

            migrationBuilder.DropTable(
                name: "AuditLogs",
                schema: "common");

            migrationBuilder.DropTable(
                name: "Cities",
                schema: "common");

            migrationBuilder.DropTable(
                name: "Config",
                schema: "common");

            migrationBuilder.DropTable(
                name: "CostCentres",
                schema: "common");

            migrationBuilder.DropTable(
                name: "CustomCodes",
                schema: "common");

            migrationBuilder.DropTable(
                name: "InterestRates",
                schema: "common");

            migrationBuilder.DropTable(
                name: "Notifications",
                schema: "common");

            migrationBuilder.DropTable(
                name: "RevaluationData",
                schema: "common");

            migrationBuilder.DropTable(
                name: "TaxConfigSubValue",
                schema: "common");

            migrationBuilder.DropTable(
                name: "VATRates",
                schema: "common");

            migrationBuilder.DropTable(
                name: "OfficialActs",
                schema: "common");

            migrationBuilder.DropTable(
                name: "TaxConfigs",
                schema: "common");
        }
    }
}
