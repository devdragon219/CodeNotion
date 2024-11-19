using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
  public void Configure(EntityTypeBuilder<Address> builder)
  {
    builder.Property(a => a.CountryISO)
      .HasConversion(ValueConverters.UpperNullableConverter);

    builder.HasIndex(a => new
    {
      a.SubjectId,
      a.AddressType,
      a.CountryISO,
      a.CityName,
      a.Toponymy,
      a.Numbering
    }).IsUnique();
  }
}
