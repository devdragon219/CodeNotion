using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.CatalogueItemAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class CatalogueItemConfiguration : IEntityTypeConfiguration<CatalogueItem>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<CatalogueItem> builder)
  {
    builder
      .HasOne(item => item.CatalogueType)
      .WithMany(type => type.Items)
      .OnDelete(DeleteBehavior.Restrict);

    builder
      .Property(o => o.Fields)
      .HasColumnType(DbDialect == SupportedDbDialect.PostgreSQL
        ? "jsonb"
        : "nvarchar(max)")
      .HasConversion(
          fields => fields == null
            ? null
            : JsonSerializer.Serialize(fields, null as JsonSerializerOptions),
          json => string.IsNullOrEmpty(json)
            ? Array.Empty<CatalogueItemField>()
            : JsonSerializer.Deserialize<CatalogueItemField[]>(json, null as JsonSerializerOptions)!);
  }
}
