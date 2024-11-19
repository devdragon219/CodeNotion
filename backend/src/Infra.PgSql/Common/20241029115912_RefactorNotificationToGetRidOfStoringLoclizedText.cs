using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealGimm.Infra.PgSql.Common
{
    /// <inheritdoc />
    public partial class RefactorNotificationToGetRidOfStoringLoclizedText : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Body",
                schema: "common",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Title",
                schema: "common",
                table: "Notifications");

            migrationBuilder.AddColumn<int>(
                name: "ContractsExpirationNotification_DaysToExpiration",
                schema: "common",
                table: "Notifications",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DaysToExpiration",
                schema: "common",
                table: "Notifications",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContractsExpirationNotification_DaysToExpiration",
                schema: "common",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "DaysToExpiration",
                schema: "common",
                table: "Notifications");

            migrationBuilder.AddColumn<string>(
                name: "Body",
                schema: "common",
                table: "Notifications",
                type: "character varying(3192)",
                maxLength: 3192,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                schema: "common",
                table: "Notifications",
                type: "character varying(120)",
                maxLength: 120,
                nullable: false,
                defaultValue: "");
        }
    }
}
