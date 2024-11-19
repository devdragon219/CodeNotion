using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class PenaltyConfiguration : IEntityTypeConfiguration<Penalty>
{
  public void Configure(EntityTypeBuilder<Penalty> builder)
  {
    builder
      .HasOne(penalty => penalty.IfCondition)
      .WithOne()
      .HasForeignKey<ComplexTicketCondition>()
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(penalty => penalty.ThenPenalties)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);
  }
}
