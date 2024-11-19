using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Config;

[NrgyConfig]
public class UtilityTypeConfiguration : IEntityTypeConfiguration<UtilityType>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<UtilityType> builder)
  {
    builder
      .Property(item => item.ChargeFields)
      .HasColumnType(DbDialect == SupportedDbDialect.PostgreSQL
        ? "jsonb"
        : "nvarchar(max)")
      .HasConversion(
          fields => fields == null
            ? null
            : JsonSerializer.Serialize(fields, null as JsonSerializerOptions),
          json => string.IsNullOrEmpty(json)
            ? default
            : JsonSerializer.Deserialize<UtilityChargeField[][]>(json, null as JsonSerializerOptions));
  }
}
