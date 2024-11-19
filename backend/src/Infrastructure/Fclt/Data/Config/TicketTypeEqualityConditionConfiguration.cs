using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketTypeEqualityConditionConfiguration : IEntityTypeConfiguration<TicketTypeEqualityCondition>
{
  public void Configure(EntityTypeBuilder<TicketTypeEqualityCondition> builder)
  {
    builder.HasBaseType<TicketCondition>();
  }
}
