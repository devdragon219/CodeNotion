using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketCatalogueTypeEqualityConditionConfiguration : IEntityTypeConfiguration<TicketCatalogueTypeEqualityCondition>
{
  public void Configure(EntityTypeBuilder<TicketCatalogueTypeEqualityCondition> builder)
  {
    builder.HasBaseType<TicketCondition>();
  }
}
