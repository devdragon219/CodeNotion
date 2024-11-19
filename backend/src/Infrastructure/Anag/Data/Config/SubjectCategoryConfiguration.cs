using RealGimm.Core.Anag.SubjectCategoryAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class SubjectCategoryConfiguration : IEntityTypeConfiguration<SubjectCategory>
{
  public void Configure(EntityTypeBuilder<SubjectCategory> builder)
  {
  }
}
