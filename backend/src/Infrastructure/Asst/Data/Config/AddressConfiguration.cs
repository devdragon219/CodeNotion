using RealGimm.Core.Asst.EstateAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
  public void Configure(EntityTypeBuilder<Address> builder)
  {
    builder.Property(p => p.CountryISO)
      .HasConversion(ValueConverters.UpperNullableConverter);
  }
}
