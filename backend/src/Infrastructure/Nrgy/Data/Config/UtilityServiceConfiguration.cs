using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Config;

[NrgyConfig]
public class UtilityServiceConfiguration : IEntityTypeConfiguration<UtilityService>
{
  public void Configure(EntityTypeBuilder<UtilityService> builder)
  {
    builder
      .HasMany<CostCharge>()
      .WithOne(costCharge => costCharge.Service)
      .OnDelete(DeleteBehavior.Restrict);

    builder
      .HasOne(utilityService => utilityService.UtilityType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
