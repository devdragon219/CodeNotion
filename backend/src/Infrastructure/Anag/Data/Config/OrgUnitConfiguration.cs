using RealGimm.Core.Anag.OrgUnitAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class OrgUnitConfiguration : IEntityTypeConfiguration<OrgUnit>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<OrgUnit> builder)
  {
    if (DbDialect == SupportedDbDialect.MsSqlServer)
    {
      builder.HasOne(s => s.ParentSubject)
        .WithMany(s => s.OrgUnits)
        .HasForeignKey(s => s.ParentSubjectId)
        .OnDelete(DeleteBehavior.ClientCascade);

      builder
        .HasOne(o => o.ParentOrgUnit)
        .WithMany(o => o.Children)
        .HasForeignKey(o => o.ParentOrgUnitId)
        .OnDelete(DeleteBehavior.ClientCascade);
    }
    else
    {
      builder.HasOne(s => s.ParentSubject)
        .WithMany(s => s.OrgUnits)
        .HasForeignKey(s => s.ParentSubjectId)
        .OnDelete(DeleteBehavior.Cascade);

      builder
        .HasOne(o => o.ParentOrgUnit)
        .WithMany(o => o.Children)
        .HasForeignKey(o => o.ParentOrgUnitId)
        .OnDelete(DeleteBehavior.Cascade);
    }
    builder.HasIndex(o => o.InternalCode)
      .IsUnique();
  }
}
