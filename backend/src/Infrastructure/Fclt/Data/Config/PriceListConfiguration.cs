using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.PriceListAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class PriceListConfiguration : IEntityTypeConfiguration<PriceList>
{
  public void Configure(EntityTypeBuilder<PriceList> builder)
  {
    builder
      .HasMany(priceList => priceList.Articles)
      .WithOne(article => article.PriceList)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
