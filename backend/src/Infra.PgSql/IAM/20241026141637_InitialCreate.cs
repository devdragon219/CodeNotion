using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.IAM
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    OfficeAccess = table.Column<int>(type: "integer", nullable: false),
                    SupplierSubjectId = table.Column<int>(type: "integer", nullable: true),
                    PasswordHash = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    BearerToken = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    ExternalAuthSub = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    ExternalAuthIss = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    ExternalAuthAud = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    PreferredLanguageCode = table.Column<string>(type: "text", nullable: true),
                    FirstName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    LastName = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    SuspensionReason = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CeasedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastPasswordUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastLoggedIn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastLogInAttempt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LockedSince = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LockedUntil = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EnabledSince = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PasswordExpiredSince = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FailedLoginAttemptsCount = table.Column<int>(type: "integer", nullable: false),
                    MainDashboard = table.Column<string>(type: "jsonb", nullable: true),
                    FacilityDashboard = table.Column<string>(type: "jsonb", nullable: true),
                    Subjects = table.Column<int[]>(type: "integer[]", nullable: true),
                    OrgUnits = table.Column<int[]>(type: "integer[]", nullable: true)
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
                    Feature = table.Column<string>(type: "text", nullable: false),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    CanRead = table.Column<bool>(type: "boolean", nullable: false),
                    CanCreate = table.Column<bool>(type: "boolean", nullable: false),
                    CanUpdate = table.Column<bool>(type: "boolean", nullable: false),
                    CanDelete = table.Column<bool>(type: "boolean", nullable: false)
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ContactType = table.Column<int>(type: "integer", nullable: false),
                    ContactInfo = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    ContactInfoType = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(3192)", maxLength: 3192, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true)
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RefreshToken = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    LoginUserAgent = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    LoginIPAddress = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    LoginLocation = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    LastRefreshIPAddress = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    LastRefreshLocation = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    LastRefreshUserAgent = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RefreshTokenExpiration = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true)
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
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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
                name: "Groups",
                schema: "iam");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "iam");
        }
    }
}
