using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.Econ
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "econ");

            

            migrationBuilder.CreateTable(
                name: "Invoices",
                schema: "econ",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    TransactorSubjectId = table.Column<int>(type: "integer", nullable: false),
                    EstateUnitId = table.Column<int>(type: "integer", nullable: true),
                    TransactorPaymentType = table.Column<int>(type: "integer", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TransactorBankAccountId = table.Column<int>(type: "integer", nullable: true),
                    PaymentTerms = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaxCredits",
                schema: "econ",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ManagementSubjectId = table.Column<int>(type: "integer", nullable: false),
                    TaxCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxCredits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentInstallment",
                schema: "econ",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InstallmentNumber = table.Column<int>(type: "integer", nullable: false),
                    DueDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    InvoiceId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentInstallment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentInstallment_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalSchema: "econ",
                        principalTable: "Invoices",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Operation",
                schema: "econ",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,6)", precision: 18, scale: 6, nullable: false),
                    AssetTaxPaymentId = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    TaxCreditId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Operation_TaxCredits_TaxCreditId",
                        column: x => x.TaxCreditId,
                        principalSchema: "econ",
                        principalTable: "TaxCredits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Operation_TaxCreditId",
                schema: "econ",
                table: "Operation",
                column: "TaxCreditId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentInstallment_InvoiceId",
                schema: "econ",
                table: "PaymentInstallment",
                column: "InvoiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Operation",
                schema: "econ");

            migrationBuilder.DropTable(
                name: "PaymentInstallment",
                schema: "econ");

            migrationBuilder.DropTable(
                name: "TaxCredits",
                schema: "econ");

            migrationBuilder.DropTable(
                name: "Invoices",
                schema: "econ");
        }
    }
}
