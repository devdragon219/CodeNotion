using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class CadastralUnitConfiguration : IEntityTypeConfiguration<CadastralUnit>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<CadastralUnit> builder)
  {
    builder.OwnsOne(cadastralUnit => cadastralUnit.Income);
    builder.OwnsOne(cadastralUnit => cadastralUnit.Inspection);

    var deleteBehavior = DbDialect == SupportedDbDialect.MsSqlServer
      ? DeleteBehavior.ClientCascade
      : DeleteBehavior.Cascade;

    builder
      .HasOne(cadastralUnit => cadastralUnit.Address)
      .WithOne()
      .HasForeignKey<CadastralUnit>(cadastralUnit => cadastralUnit.AddressId)
      .OnDelete(deleteBehavior);
  }
}
