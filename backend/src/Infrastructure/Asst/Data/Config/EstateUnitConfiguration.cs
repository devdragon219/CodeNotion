using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class EstateUnitConfiguration : IEntityTypeConfiguration<EstateUnit>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<EstateUnit> builder)
  {
    builder.HasIndex(cc => cc.InternalCode);

    builder
      .HasOne(estateUnit => estateUnit.UsageType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);

    var deleteBehavior = DbDialect == SupportedDbDialect.MsSqlServer
      ? DeleteBehavior.ClientCascade
      : DeleteBehavior.Cascade;

    builder
      .HasMany(eu => eu.CadastralUnits)
      .WithOne(cu => cu.EstateUnit)
      .OnDelete(deleteBehavior);

    builder
      .HasMany(x => x.Floors)
      .WithMany(x => x.EstateUnits)
      .UsingEntity<EstateUnitFloor>(
        l => l.HasOne(e => e.Floor).WithMany(e => e.EstateUnitFloor).OnDelete(DeleteBehavior.Cascade),
        r => r.HasOne(e => e.EstateUnit).WithMany(e => e.EstateUnitFloors).OnDelete(DeleteBehavior.Cascade));
  }
}
