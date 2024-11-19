using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketCatalogueCategoryEqualityConditionConfiguration : IEntityTypeConfiguration<TicketCatalogueCategoryEqualityCondition>
{
  public void Configure(EntityTypeBuilder<TicketCatalogueCategoryEqualityCondition> builder)
  {
    builder.HasBaseType<TicketCondition>();
  }
}
