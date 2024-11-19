using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class TaxConfigConfiguration : IEntityTypeConfiguration<TaxConfig>
{
  public void Configure(EntityTypeBuilder<TaxConfig> builder)
  {
    builder
      .HasMany(tc => tc.SubValues)
      .WithOne()
      .IsRequired();
  }
}
