using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealGimm.Infra.MsSql.IAM
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "iam");

            migrationBuilder.CreateTable(
                name: "Groups",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    OfficeAccess = table.Column<int>(type: "int", nullable: false),
                    SupplierSubjectId = table.Column<int>(type: "int", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    BearerToken = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    ExternalAuthSub = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    ExternalAuthIss = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    ExternalAuthAud = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    PreferredLanguageCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    SuspensionReason = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CeasedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastPasswordUpdated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastLoggedIn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastLogInAttempt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockedSince = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockedUntil = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EnabledSince = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PasswordExpiredSince = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FailedLoginAttemptsCount = table.Column<int>(type: "int", nullable: false),
                    Subjects = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrgUnits = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GroupFeature",
                schema: "iam",
                columns: table => new
                {
                    Feature = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    CanRead = table.Column<bool>(type: "bit", nullable: false),
                    CanCreate = table.Column<bool>(type: "bit", nullable: false),
                    CanUpdate = table.Column<bool>(type: "bit", nullable: false),
                    CanDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupFeature", x => new { x.Feature, x.GroupId });
                    table.ForeignKey(
                        name: "FK_GroupFeature_Groups_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "iam",
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contact",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactType = table.Column<int>(type: "int", nullable: false),
                    ContactInfo = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    ContactInfoType = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contact_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "iam",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Session",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RefreshToken = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    LoginUserAgent = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    LoginIPAddress = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LoginLocation = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    LastRefreshIPAddress = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LastRefreshLocation = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    LastRefreshUserAgent = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RefreshTokenExpiration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Session", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Session_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "iam",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserGroup",
                schema: "iam",
                columns: table => new
                {
                    GroupId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroup", x => new { x.GroupId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserGroup_Groups_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "iam",
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroup_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "iam",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WidgetSection",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BackgroundColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FacilityDashboardUserId = table.Column<int>(type: "int", nullable: true),
                    MainDashboardUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WidgetSection", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WidgetSection_Users_FacilityDashboardUserId",
                        column: x => x.FacilityDashboardUserId,
                        principalSchema: "iam",
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WidgetSection_Users_MainDashboardUserId",
                        column: x => x.MainDashboardUserId,
                        principalSchema: "iam",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WidgetSectionRow",
                schema: "iam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order = table.Column<int>(type: "int", nullable: false),
                    WidgetSectionId = table.Column<int>(type: "int", nullable: true)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order = table.Column<int>(type: "int", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WidgetSectionRowId = table.Column<int>(type: "int", nullable: true)
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
                name: "IX_Contact_UserId",
                schema: "iam",
                table: "Contact",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupFeature_GroupId",
                schema: "iam",
                table: "GroupFeature",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Session_UserId",
                schema: "iam",
                table: "Session",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroup_UserId",
                schema: "iam",
                table: "UserGroup",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserName",
                schema: "iam",
                table: "Users",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WidgetConfig_WidgetSectionRowId",
                schema: "iam",
                table: "WidgetConfig",
                column: "WidgetSectionRowId");

            migrationBuilder.CreateIndex(
                name: "IX_WidgetSection_FacilityDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                column: "FacilityDashboardUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WidgetSection_MainDashboardUserId",
                schema: "iam",
                table: "WidgetSection",
                column: "MainDashboardUserId");

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
                name: "Contact",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "GroupFeature",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "Session",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "UserGroup",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "WidgetConfig",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "Groups",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "WidgetSectionRow",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "WidgetSection",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "iam");
        }
    }
}
