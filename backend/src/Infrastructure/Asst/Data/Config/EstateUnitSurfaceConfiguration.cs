using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class EstateUnitSurfaceConfiguration : IEntityTypeConfiguration<EstateUnitSurface>
{
  public void Configure(EntityTypeBuilder<EstateUnitSurface> builder)
  {
    builder
      .HasOne(surface => surface.FunctionArea)
      .WithMany()
      .HasForeignKey(surface => surface.FunctionAreaId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
