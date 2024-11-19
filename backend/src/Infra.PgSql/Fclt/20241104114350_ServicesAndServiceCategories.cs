using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RealGimm.Infra.PgSql.Fclt
{
    /// <inheritdoc />
    public partial class ServicesAndServiceCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceCategories",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceSubCategory",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceSubCategory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceSubCategory_ServiceCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "fclt",
                        principalTable: "ServiceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    InternalCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    SubCategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_ServiceCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalSchema: "fclt",
                        principalTable: "ServiceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Services_ServiceSubCategory_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalSchema: "fclt",
                        principalTable: "ServiceSubCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceActivity",
                schema: "fclt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    ActivityType = table.Column<int>(type: "integer", nullable: false),
                    IsMandatoryByLaw = table.Column<bool>(type: "boolean", nullable: false),
                    TypeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceActivity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceActivity_Services_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "fclt",
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceActivity_TypeId",
                schema: "fclt",
                table: "ServiceActivity",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_CategoryId",
                schema: "fclt",
                table: "Services",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_SubCategoryId",
                schema: "fclt",
                table: "Services",
                column: "SubCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceSubCategory_CategoryId",
                schema: "fclt",
                table: "ServiceSubCategory",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceActivity",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "Services",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "ServiceSubCategory",
                schema: "fclt");

            migrationBuilder.DropTable(
                name: "ServiceCategories",
                schema: "fclt");
        }
    }
}
