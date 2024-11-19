using RealGimm.Core.Asst.CadastralCategoryAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class CadastralCategoryConfiguration : IEntityTypeConfiguration<CadastralCategory>
{
  public void Configure(EntityTypeBuilder<CadastralCategory> builder)
  {
    builder.Property(p => p.CountryISO)
      .HasConversion(ValueConverters.UpperConverter);
  }
}
