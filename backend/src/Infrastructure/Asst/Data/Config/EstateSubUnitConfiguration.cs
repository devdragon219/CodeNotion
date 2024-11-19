using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.EstateSubUnitAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class EstateSubUnitConfiguration : IEntityTypeConfiguration<EstateSubUnit>
{
  public void Configure(EntityTypeBuilder<EstateSubUnit> builder)
  {
    builder.HasIndex(cc => cc.InternalCode);
  }
}
