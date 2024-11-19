using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ServiceSubCategoryConfiguration : IEntityTypeConfiguration<ServiceSubCategory>
{
  public void Configure(EntityTypeBuilder<ServiceSubCategory> builder)
  {
    builder.HasOne(subcat => subcat.Category)
      .WithMany(c => c.SubCategories)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
