using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketPriorityEqualityConditionCondition : IEntityTypeConfiguration<TicketPriorityEqualityCondition>
{
  public void Configure(EntityTypeBuilder<TicketPriorityEqualityCondition> builder)
  {
    builder.HasBaseType<TicketCondition>();
  }
}
