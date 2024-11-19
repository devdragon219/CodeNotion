using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealGimm.Infra.MsSql.Common
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
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DaysToExpiration",
                schema: "common",
                table: "Notifications",
                type: "int",
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
                type: "nvarchar(3192)",
                maxLength: 3192,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                schema: "common",
                table: "Notifications",
                type: "nvarchar(120)",
                maxLength: 120,
                nullable: false,
                defaultValue: "");
        }
    }
}
