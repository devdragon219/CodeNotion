using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.IAM
{
    /// <inheritdoc />
    public partial class MakeWidgetsStoredAsEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FacilityDashboard",
                schema: "iam",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MainDashboard",
                schema: "iam",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "WidgetSection",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    BackgroundColor = table.Column<string>(type: "text", nullable: true),
                    facilityDashboardUser = table.Column<int>(type: "integer", nullable: true),
                    mainDashboardUser = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WidgetSection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WidgetSection_Users_facilityDashboardUser",
                        column: x => x.facilityDashboardUser,
                        principalSchema: "iam",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WidgetSection_Users_mainDashboardUser",
                        column: x => x.mainDashboardUser,
                        principalSchema: "iam",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WidgetSectionRow",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    WidgetSectionId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WidgetSectionRow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WidgetSectionRow_WidgetSection_WidgetSectionId",
                        column: x => x.WidgetSectionId,
                        principalSchema: "iam",
                        principalTable: "WidgetSection",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WidgetConfig",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    Width = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    WidgetSectionRowId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WidgetConfig", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WidgetConfig_WidgetSectionRow_WidgetSectionRowId",
                        column: x => x.WidgetSectionRowId,
                        principalSchema: "iam",
                        principalTable: "WidgetSectionRow",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_WidgetConfig_WidgetSectionRowId",
                schema: "iam",
                table: "WidgetConfig",
                column: "WidgetSectionRowId");

            migrationBuilder.CreateIndex(
                name: "IX_WidgetSection_facilityDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                column: "facilityDashboardUser");

            migrationBuilder.CreateIndex(
                name: "IX_WidgetSection_mainDashboardUser",
                schema: "iam",
                table: "WidgetSection",
                column: "mainDashboardUser");

            migrationBuilder.CreateIndex(
                name: "IX_WidgetSectionRow_WidgetSectionId",
                schema: "iam",
                table: "WidgetSectionRow",
                column: "WidgetSectionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WidgetConfig",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "WidgetSectionRow",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "WidgetSection",
                schema: "iam");

            migrationBuilder.AddColumn<string>(
                name: "FacilityDashboard",
                schema: "iam",
                table: "Users",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MainDashboard",
                schema: "iam",
                table: "Users",
                type: "jsonb",
                nullable: true);
        }
    }
}
