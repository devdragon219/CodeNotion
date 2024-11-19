using RealGimm.Core.Asst.EstateAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class EstateConfiguration : IEntityTypeConfiguration<Estate>
{
  public void Configure(EntityTypeBuilder<Estate> builder)
  {
    var ownedBuilder = builder.OwnsOne(estate => estate.TotalMarketValue);
    ownedBuilder.OwnsMany(tmv => tmv.Coefficients).HasKey(tmvc => tmvc.Id);
    ownedBuilder.OwnsMany(tmv => tmv.MarketValues).HasKey(tmvv => tmvv.Id);

    builder.HasIndex(cc => cc.InternalCode);

    builder
      .HasOne(e => e.UsageType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
    
    builder
      .HasOne(e => e.MainUsageType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
