using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class CadastralUnitTaxConfigConfiguration : IEntityTypeConfiguration<CadastralUnitTaxConfig>
{
  public void Configure(EntityTypeBuilder<CadastralUnitTaxConfig> builder)
  {
    builder
      .HasIndex(
        "CadastralUnitId",
        nameof(CadastralUnitTaxConfig.TaxCalculator),
        nameof(CadastralUnitTaxConfig.Code))
      .IsUnique();
  }
}
