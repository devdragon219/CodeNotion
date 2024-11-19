using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace RealGimm.Infra.MsSql.Anag
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "anag");

            migrationBuilder.CreateTable(
                name: "SubjectCategories",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Function = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false, computedColumnSql: "CASE\r\n    WHEN [PersonType] = 0\r\n    THEN [LastName] + ' ' + [FirstName]\r\n    ELSE COALESCE([ShorthandDescription], [FullName])\r\nEND", stored: true),
                    PersonType = table.Column<int>(type: "int", nullable: false),
                    InternalCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ExternalSourceCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CustomPersonType = table.Column<int>(type: "int", nullable: true),
                    CustomSubjectStatus = table.Column<int>(type: "int", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ClosureDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    ShorthandDescription = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    BaseCountryTaxIdCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AdditionalTaxIdCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BaseCountryISO = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BusinessStart = table.Column<DateOnly>(type: "date", nullable: true),
                    ShareCapital = table.Column<decimal>(type: "decimal(18,6)", precision: 18, scale: 6, nullable: true),
                    CompaniesHouseIdCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AdditionalGovIdCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BankingId1 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BankingId2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    InterGroupSignature = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    LegalSubjectType = table.Column<int>(type: "int", nullable: true),
                    ManagementCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CustomGender = table.Column<int>(type: "int", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    BirthSex = table.Column<int>(type: "int", nullable: true),
                    BirthCountryTaxIdCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BirthDate = table.Column<DateOnly>(type: "date", nullable: true),
                    DeathDate = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubjectId = table.Column<int>(type: "int", nullable: false),
                    AddressType = table.Column<int>(type: "int", nullable: false),
                    CityName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CityReference = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CountyName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CountyReference = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RegionName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    RegionReference = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CountryName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CountryISO = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    Toponymy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Numbering = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    LocalPostCode = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Address_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BankAccount",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubjectId = table.Column<int>(type: "int", nullable: false),
                    BankAccountType = table.Column<int>(type: "int", nullable: false),
                    ReferenceCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ReferenceCodeType = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    AccountHolder = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BankAccount_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrgUnit",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrgUnitType = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    InternalCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ExternalCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    EntryStatus = table.Column<int>(type: "int", nullable: false),
                    InfluenceArea = table.Column<Polygon>(type: "geography", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClosureDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GeographicalCities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentOrgUnitId = table.Column<int>(type: "int", nullable: true),
                    ParentSubjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrgUnit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrgUnit_OrgUnit_ParentOrgUnitId",
                        column: x => x.ParentOrgUnitId,
                        principalSchema: "anag",
                        principalTable: "OrgUnit",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrgUnit_Subjects_ParentSubjectId",
                        column: x => x.ParentSubjectId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SubjectRelation",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MainId = table.Column<int>(type: "int", nullable: false),
                    SubordinateId = table.Column<int>(type: "int", nullable: false),
                    RelationType = table.Column<int>(type: "int", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true),
                    OfficerRelationType = table.Column<int>(type: "int", nullable: true),
                    GroupRelationType = table.Column<int>(type: "int", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubjectRelation_Subjects_MainId",
                        column: x => x.MainId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SubjectRelation_Subjects_SubordinateId",
                        column: x => x.SubordinateId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SubjectSubjectCategory",
                schema: "anag",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "int", nullable: false),
                    SubjectsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectSubjectCategory", x => new { x.CategoriesId, x.SubjectsId });
                    table.ForeignKey(
                        name: "FK_SubjectSubjectCategory_SubjectCategories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalSchema: "anag",
                        principalTable: "SubjectCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectSubjectCategory_Subjects_SubjectsId",
                        column: x => x.SubjectsId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaxStatus",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubjectId = table.Column<int>(type: "int", nullable: false),
                    TaxStatusType = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    Since = table.Column<DateOnly>(type: "date", nullable: true),
                    Until = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxStatus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaxStatus_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contact",
                schema: "anag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubjectId = table.Column<int>(type: "int", nullable: true),
                    OrgUnitId = table.Column<int>(type: "int", nullable: true),
                    ContactType = table.Column<int>(type: "int", nullable: false),
                    ContactInfo = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    ContactInfoType = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(3192)", maxLength: 3192, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contact_OrgUnit_OrgUnitId",
                        column: x => x.OrgUnitId,
                        principalSchema: "anag",
                        principalTable: "OrgUnit",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Contact_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalSchema: "anag",
                        principalTable: "Subjects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_SubjectId_AddressType_CountryISO_CityName_Toponymy_Numbering",
                schema: "anag",
                table: "Address",
                columns: new[] { "SubjectId", "AddressType", "CountryISO", "CityName", "Toponymy", "Numbering" },
                unique: true,
                filter: "[CountryISO] IS NOT NULL AND [CityName] IS NOT NULL AND [Toponymy] IS NOT NULL AND [Numbering] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_BankAccount_SubjectId_BankAccountType_ReferenceCodeType_ReferenceCode",
                schema: "anag",
                table: "BankAccount",
                columns: new[] { "SubjectId", "BankAccountType", "ReferenceCodeType", "ReferenceCode" },
                unique: true,
                filter: "[ReferenceCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Contact_OrgUnitId",
                schema: "anag",
                table: "Contact",
                column: "OrgUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Contact_SubjectId_ContactType_ContactInfoType_ContactInfo",
                schema: "anag",
                table: "Contact",
                columns: new[] { "SubjectId", "ContactType", "ContactInfoType", "ContactInfo" },
                unique: true,
                filter: "[SubjectId] IS NOT NULL AND [ContactInfo] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnit_InternalCode",
                schema: "anag",
                table: "OrgUnit",
                column: "InternalCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnit_ParentOrgUnitId",
                schema: "anag",
                table: "OrgUnit",
                column: "ParentOrgUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_OrgUnit_ParentSubjectId",
                schema: "anag",
                table: "OrgUnit",
                column: "ParentSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectRelation_MainId_SubordinateId_RelationType",
                schema: "anag",
                table: "SubjectRelation",
                columns: new[] { "MainId", "SubordinateId", "RelationType" },
                unique: true,
                filter: "[Since] IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectRelation_MainId_SubordinateId_RelationType_Since",
                schema: "anag",
                table: "SubjectRelation",
                columns: new[] { "MainId", "SubordinateId", "RelationType", "Since" },
                unique: true,
                filter: "[Since] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectRelation_SubordinateId",
                schema: "anag",
                table: "SubjectRelation",
                column: "SubordinateId");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_ExternalSourceCode",
                schema: "anag",
                table: "Subjects",
                column: "ExternalSourceCode");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_InternalCode",
                schema: "anag",
                table: "Subjects",
                column: "InternalCode");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectSubjectCategory_SubjectsId",
                schema: "anag",
                table: "SubjectSubjectCategory",
                column: "SubjectsId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxStatus_SubjectId",
                schema: "anag",
                table: "TaxStatus",
                column: "SubjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "BankAccount",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "Contact",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "SubjectRelation",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "SubjectSubjectCategory",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "TaxStatus",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "OrgUnit",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "SubjectCategories",
                schema: "anag");

            migrationBuilder.DropTable(
                name: "Subjects",
                schema: "anag");
        }
    }
}
