using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Nrgy.ReadingAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Config;

[NrgyConfig]
public class ReadingConfiguration : IEntityTypeConfiguration<Reading>
{
  public void Configure(EntityTypeBuilder<Reading> builder)
  {
    builder.OwnsMany(reading => reading.Values);
  }
}
