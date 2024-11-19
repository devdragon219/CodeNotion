using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealGimm.Infra.PgSql.Fclt
{
    /// <inheritdoc />
    public partial class MakeQuoteInterventionDueDateNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "InterventionDueDate",
                schema: "fclt",
                table: "Quote",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "InterventionDueDate",
                schema: "fclt",
                table: "Quote",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);
        }
    }
}
