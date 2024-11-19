using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class CatalogueSubCategoryConfiguration : IEntityTypeConfiguration<CatalogueSubCategory>
{
  public void Configure(EntityTypeBuilder<CatalogueSubCategory> builder)
  {
    builder.HasOne(subcat => subcat.Category)
      .WithMany(c => c.SubCategories)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
