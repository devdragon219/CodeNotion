using RealGimm.Core.Common.CityAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class CityConfiguration : IEntityTypeConfiguration<City>
{
  public void Configure(EntityTypeBuilder<City> builder)
  {
    builder.Property(c => c.CountryISO)
      .HasConversion(ValueConverters.UpperConverter);

    builder.HasIndex(c => c.Guid);
    builder.HasIndex(c => c.CountyGuid);
    builder.HasIndex(c => c.RegionGuid);
    builder.HasIndex(c => c.CityProvider);
    builder.HasIndex(c => c.CountryISO);
    builder.HasIndex(c => c.CadastralCode);
    builder.HasIndex(c => new { c.CityProvider, c.RegionExternalCode });
    builder.HasIndex(c => new { c.CityProvider, c.CountyExternalCode });
    builder.HasIndex(c => new { c.CityProvider, c.CityExternalCode });
  }
}
