using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class CadastralLandCategoryConfiguration : IEntityTypeConfiguration<CadastralLandCategory>
{
  public void Configure(EntityTypeBuilder<CadastralLandCategory> builder)
  {
    builder.Property(p => p.CountryISO)
      .HasConversion(ValueConverters.UpperConverter);
  }
}
