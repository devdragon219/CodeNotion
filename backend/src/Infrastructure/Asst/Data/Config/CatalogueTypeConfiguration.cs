using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Asst.CatalogueTypeAggregate;

namespace RealGimm.Infrastructure.Asst.Data.Config;

[AsstConfig]
public class CatalogueTypeConfiguration : IEntityTypeConfiguration<CatalogueType>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<CatalogueType> builder)
  {
    builder.HasOne(t => t.Category)
      .WithMany(c => c.CatalogueTypes)
      .OnDelete(DeleteBehavior.Restrict);

    builder
      .HasMany(e => e.UsageTypes)
      .WithMany();

    builder
      .Property(item => item.Fields)
      .HasColumnType(DbDialect == SupportedDbDialect.PostgreSQL
        ? "jsonb"
        : "nvarchar(max)")
      .HasConversion(
          fields => fields == null
            ? null
            : JsonSerializer.Serialize(fields, null as JsonSerializerOptions),
          json => string.IsNullOrEmpty(json)
            ? default
            : JsonSerializer.Deserialize<CatalogueTypeField[][]>(json, null as JsonSerializerOptions));

    builder.OwnsMany(item => item.Activities, activityBuilder =>
    {
      activityBuilder.HasKey(activity => activity.Id);
    });
  }
}
