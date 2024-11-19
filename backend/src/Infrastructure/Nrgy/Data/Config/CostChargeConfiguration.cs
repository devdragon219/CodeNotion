using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Nrgy.CostChargeAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Config;

[NrgyConfig]
public class CostChargeConfiguration : IEntityTypeConfiguration<CostCharge>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<CostCharge> builder)
  {
    builder.OwnsOne(costCharge => costCharge.ActualConsumption, consumptionBuilder =>
    {
      consumptionBuilder
        .OwnsMany(consumption => consumption.Values)
        .ToTable($"{nameof(CostCharge)}_{nameof(CostCharge.ActualConsumption)}_{nameof(CostCharge.ActualConsumption.Values)}");
    });

    builder.OwnsOne(costCharge => costCharge.ExpectedConsumption, consumptionBuilder =>
    {
      consumptionBuilder
        .OwnsMany(consumption => consumption.Values)
        .ToTable($"{nameof(CostCharge)}_{nameof(CostCharge.ExpectedConsumption)}_{nameof(CostCharge.ExpectedConsumption.Values)}");
    });

    builder
      .Property(costCharge => costCharge.Fields)
            .HasColumnType(DbDialect == SupportedDbDialect.PostgreSQL
        ? "jsonb"
        : "nvarchar(max)")
      .HasConversion(
          fields => fields == null
            ? null
            : JsonSerializer.Serialize(fields, null as JsonSerializerOptions),
          json => string.IsNullOrEmpty(json)
            ? Array.Empty<CostChargeField>()
            : JsonSerializer.Deserialize<CostChargeField[]>(json, null as JsonSerializerOptions)!);
  }
}
