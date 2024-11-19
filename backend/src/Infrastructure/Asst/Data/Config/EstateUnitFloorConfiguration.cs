using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class EstateUnitFloorConfiguration : IEntityTypeConfiguration<EstateUnitFloor>
{
  public void Configure(EntityTypeBuilder<EstateUnitFloor> builder)
  {
    builder.Ignore(x => x.Id);

    builder.HasKey(x => new { x.EstateUnitId, x.FloorId });
  }
}
