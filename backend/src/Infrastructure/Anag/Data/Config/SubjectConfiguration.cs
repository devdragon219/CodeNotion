using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class SubjectConfiguration : IEntityTypeConfiguration<Subject>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<Subject> builder)
  {
    builder.HasDiscriminator(p => p.PersonType)
      .HasValue<PhysicalSubject>(PersonType.PhysicalPerson)
      .HasValue<LegalSubject>(PersonType.LegalPerson)
      .HasValue<ManagementSubject>(PersonType.ManagementSubject);
    
    builder.HasIndex(p => p.ExternalSourceCode);
    builder.HasIndex(p => p.InternalCode);

    var sqlServerComputedName = $"""
      CASE
          WHEN [{nameof(Subject.PersonType)}] = {(int)PersonType.PhysicalPerson}
          THEN [{nameof(PhysicalSubject.LastName)}] + ' ' + [{nameof(PhysicalSubject.FirstName)}]
          ELSE COALESCE([{nameof(IBusinessSubject.ShorthandDescription)}], [{nameof(IBusinessSubject.FullName)}])
      END
      """;

    var pgSqlComputedName = $"""
      CASE
        WHEN "{nameof(PersonType)}" = {(int)PersonType.PhysicalPerson}
        THEN "{nameof(PhysicalSubject.LastName)}" || ' ' || "{nameof(PhysicalSubject.FirstName)}"
      ELSE
        COALESCE("{nameof(IBusinessSubject.ShorthandDescription)}", "{nameof(IBusinessSubject.FullName)}")
      END
      """;

    builder
      .Property(subject => subject.Name)
      .HasComputedColumnSql(DbDialect == SupportedDbDialect.PostgreSQL
        ? pgSqlComputedName
        : sqlServerComputedName,
        true);
  }
}
