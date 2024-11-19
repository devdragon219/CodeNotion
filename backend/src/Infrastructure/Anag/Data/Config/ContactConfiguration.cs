using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class ContactConfiguration : IEntityTypeConfiguration<Contact>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<Contact> builder)
  {
    builder.HasIndex(c => new
    {
      c.SubjectId,
      c.ContactType,
      c.ContactInfoType,
      c.ContactInfo
    }).IsUnique();

    if (DbDialect == SupportedDbDialect.MsSqlServer)
    {
      builder.HasOne(c => c.Subject)
        .WithMany(s => s.Contacts)
        .OnDelete(DeleteBehavior.ClientCascade);

      builder.HasOne(c => c.OrgUnit)
        .WithMany(o => o.Contacts)
        .OnDelete(DeleteBehavior.ClientCascade);
    }
    else
    {
      builder.HasOne(c => c.Subject)
        .WithMany(s => s.Contacts)
        .OnDelete(DeleteBehavior.Cascade);

      builder.HasOne(c => c.OrgUnit)
        .WithMany(o => o.Contacts)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}
