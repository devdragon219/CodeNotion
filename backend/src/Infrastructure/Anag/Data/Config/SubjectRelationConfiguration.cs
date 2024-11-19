using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class SubjectRelationConfiguration : IEntityTypeConfiguration<SubjectRelation>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<SubjectRelation> builder)
  {
    builder.HasIndex(ug => new
    {
      ug.MainId,
      ug.SubordinateId,
      ug.RelationType,
      ug.Since
    })
      .IsUnique();

    var filterString = DbDialect == SupportedDbDialect.MsSqlServer
      ? "[Since] IS NULL"
      : "\"Since\" IS NULL";

    builder.HasIndex(ug => new
    {
      ug.MainId,
      ug.SubordinateId,
      ug.RelationType,
    })
      .HasFilter(filterString)
      .IsUnique();

    if (DbDialect == SupportedDbDialect.MsSqlServer)
    {
      builder.HasOne(r => r.Main)
        .WithMany(s => s.RelationMains)
        .HasForeignKey(s => s.MainId)
        .OnDelete(DeleteBehavior.ClientCascade);

      builder.HasOne(r => r.Subordinate)
        .WithMany(s => s.RelationSubordinates)
        .HasForeignKey(s => s.SubordinateId)
        .OnDelete(DeleteBehavior.ClientCascade);
    }
    else
    {
      builder.HasOne(r => r.Main)
        .WithMany(s => s.RelationMains)
        .HasForeignKey(s => s.MainId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(r => r.Subordinate)
        .WithMany(s => s.RelationSubordinates)
        .HasForeignKey(s => s.SubordinateId)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
