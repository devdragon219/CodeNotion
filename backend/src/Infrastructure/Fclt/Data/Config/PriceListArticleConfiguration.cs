using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.PriceListArticleAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class PriceListArticleConfiguration : IEntityTypeConfiguration<PriceListArticle>
{
  public void Configure(EntityTypeBuilder<PriceListArticle> builder)
  {
    builder
      .HasMany(article => article.PricePeriods)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);
  }
}
