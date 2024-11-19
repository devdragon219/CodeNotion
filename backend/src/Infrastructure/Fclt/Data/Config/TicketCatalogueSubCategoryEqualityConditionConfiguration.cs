using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketCatalogueSubCategoryEqualityConditionConfiguration : IEntityTypeConfiguration<TicketCatalogueSubCategoryEqualityCondition>
{
  public void Configure(EntityTypeBuilder<TicketCatalogueSubCategoryEqualityCondition> builder)
  {
    builder.HasBaseType<TicketCondition>();
  }
}
