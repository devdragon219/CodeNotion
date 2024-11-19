using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealGimm.Infra.PgSql.IAM
{
    /// <inheritdoc />
    public partial class FixWidgetKeyName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WidgetSection_Users_facilityDashboardUser",
                schema: "iam",
                table: "WidgetSection");

            migrationBuilder.DropForeignKey(
                name: "FK_WidgetSection_Users_mainDashboardUser",
                schema: "iam",
                table: "WidgetSection");

            migrationBuilder.RenameColumn(
                name: "mainDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                newName: "MainDashboardUserId");

            migrationBuilder.RenameColumn(
                name: "facilityDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                newName: "FacilityDashboardUserId");

            migrationBuilder.RenameIndex(
                name: "IX_WidgetSection_mainDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                newName: "IX_WidgetSection_MainDashboardUserId");

            migrationBuilder.RenameIndex(
                name: "IX_WidgetSection_facilityDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                newName: "IX_WidgetSection_FacilityDashboardUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetSection_Users_FacilityDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                column: "FacilityDashboardUserId",
                principalSchema: "iam",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetSection_Users_MainDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                column: "MainDashboardUserId",
                principalSchema: "iam",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WidgetSection_Users_FacilityDashboardUserId",
                schema: "iam",
                table: "WidgetSection");

            migrationBuilder.DropForeignKey(
                name: "FK_WidgetSection_Users_MainDashboardUserId",
                schema: "iam",
                table: "WidgetSection");

            migrationBuilder.RenameColumn(
                name: "MainDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                newName: "mainDashboardUser");

            migrationBuilder.RenameColumn(
                name: "FacilityDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                newName: "facilityDashboardUser");

            migrationBuilder.RenameIndex(
                name: "IX_WidgetSection_MainDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                newName: "IX_WidgetSection_mainDashboardUser");

            migrationBuilder.RenameIndex(
                name: "IX_WidgetSection_FacilityDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                newName: "IX_WidgetSection_facilityDashboardUser");

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetSection_Users_facilityDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                column: "facilityDashboardUser",
                principalSchema: "iam",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WidgetSection_Users_mainDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                column: "mainDashboardUser",
                principalSchema: "iam",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
