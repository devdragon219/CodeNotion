using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealGimm.Infra.MsSql.Nrgy
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "nrgy");

            migrationBuilder.CreateTable(
                name: "UtilityTypes",
                schema: "nrgy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Category = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: false),
                    InternalCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ExpenseClass = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MeasurementUnit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MeasurementUnitDescription = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TimeOfUseRateCount = table.Column<int>(type: "int", nullable: false),
                    MeteringType = table.Column<int>(type: "int", nullable: false),
                    HasHeatingAccountingSystem = table.Column<bool>(type: "bit", nullable: false),
                    ChargeFields = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UtilityTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UtilityServices",
                schema: "nrgy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InternalCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UtilityTypeId = table.Column<int>(type: "int", nullable: false),
                    EstateIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EstateUnitIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProviderSubjectId = table.Column<int>(type: "int", nullable: false),
                    ReferenceSubjectId = table.Column<int>(type: "int", nullable: false),
                    OrgUnitId = table.Column<int>(type: "int", nullable: false),
                    AccountingItemId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    UtilityUserCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UtilityContractCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UtilityMeterSerial = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UtilityDeliveryPointCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsFreeMarket = table.Column<bool>(type: "bit", nullable: false),
                    Deposit = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ActivationDate = table.Column<DateOnly>(type: "date", nullable: false),
                    DeactivationRequestDate = table.Column<DateOnly>(type: "date", nullable: true),
                    DeactivationDate = table.Column<DateOnly>(type: "date", nullable: true),
                    ContractPowerMaximum = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ContractPowerNominal = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ContractNominalTension = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UtilityServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UtilityServices_UtilityTypes_UtilityTypeId",
                        column: x => x.UtilityTypeId,
                        principalSchema: "nrgy",
                        principalTable: "UtilityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CostCharges",
                schema: "nrgy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    PeriodStart = table.Column<DateOnly>(type: "date", nullable: false),
                    PeriodEnd = table.Column<DateOnly>(type: "date", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: false),
                    ReferenceDate = table.Column<DateOnly>(type: "date", nullable: false),
                    DueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalVATAmount = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: false),
                    InvoicedConsumptionAmount = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: false),
                    ActualConsumption_Since = table.Column<DateOnly>(type: "date", nullable: true),
                    ActualConsumption_Until = table.Column<DateOnly>(type: "date", nullable: true),
                    ExpectedConsumption_Since = table.Column<DateOnly>(type: "date", nullable: true),
                    ExpectedConsumption_Until = table.Column<DateOnly>(type: "date", nullable: true),
                    Fields = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostCharges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CostCharges_UtilityServices_ServiceId",
                        column: x => x.ServiceId,
                        principalSchema: "nrgy",
                        principalTable: "UtilityServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Readings",
                schema: "nrgy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UtilityServiceId = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    ReadingTimestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsEstimated = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Readings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Readings_UtilityServices_UtilityServiceId",
                        column: x => x.UtilityServiceId,
                        principalSchema: "nrgy",
                        principalTable: "UtilityServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CostCharge_ActualConsumption_Values",
                schema: "nrgy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CostChargeConsumptionCostChargeId = table.Column<int>(type: "int", nullable: false),
                    TOURateIndex = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostCharge_ActualConsumption_Values", x => new { x.CostChargeConsumptionCostChargeId, x.Id });
                    table.ForeignKey(
                        name: "FK_CostCharge_ActualConsumption_Values_CostCharges_CostChargeConsumptionCostChargeId",
                        column: x => x.CostChargeConsumptionCostChargeId,
                        principalSchema: "nrgy",
                        principalTable: "CostCharges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CostCharge_ExpectedConsumption_Values",
                schema: "nrgy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CostChargeConsumptionCostChargeId = table.Column<int>(type: "int", nullable: false),
                    TOURateIndex = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostCharge_ExpectedConsumption_Values", x => new { x.CostChargeConsumptionCostChargeId, x.Id });
                    table.ForeignKey(
                        name: "FK_CostCharge_ExpectedConsumption_Values_CostCharges_CostChargeConsumptionCostChargeId",
                        column: x => x.CostChargeConsumptionCostChargeId,
                        principalSchema: "nrgy",
                        principalTable: "CostCharges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Readings_Values",
                schema: "nrgy",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReadingId = table.Column<int>(type: "int", nullable: false),
                    TOURateIndex = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Readings_Values", x => new { x.ReadingId, x.Id });
                    table.ForeignKey(
                        name: "FK_Readings_Values_Readings_ReadingId",
                        column: x => x.ReadingId,
                        principalSchema: "nrgy",
                        principalTable: "Readings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CostCharges_ServiceId",
                schema: "nrgy",
                table: "CostCharges",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Readings_UtilityServiceId",
                schema: "nrgy",
                table: "Readings",
                column: "UtilityServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_UtilityServices_UtilityTypeId",
                schema: "nrgy",
                table: "UtilityServices",
                column: "UtilityTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CostCharge_ActualConsumption_Values",
                schema: "nrgy");

            migrationBuilder.DropTable(
                name: "CostCharge_ExpectedConsumption_Values",
                schema: "nrgy");

            migrationBuilder.DropTable(
                name: "Readings_Values",
                schema: "nrgy");

            migrationBuilder.DropTable(
                name: "CostCharges",
                schema: "nrgy");

            migrationBuilder.DropTable(
                name: "Readings",
                schema: "nrgy");

            migrationBuilder.DropTable(
                name: "UtilityServices",
                schema: "nrgy");

            migrationBuilder.DropTable(
                name: "UtilityTypes",
                schema: "nrgy");
        }
    }
}
