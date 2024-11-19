using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class PhysicalSubjectConfiguration : IEntityTypeConfiguration<PhysicalSubject>
{
  public void Configure(EntityTypeBuilder<PhysicalSubject> builder)
  {
    builder.Property(p => p.ProfessionalTaxIdCode)
      .HasColumnName("BaseCountryTaxIdCode");
  }
}
