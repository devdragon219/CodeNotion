using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.AdministrationAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class AdministrationConfiguration : IEntityTypeConfiguration<Administration>
{
  public void Configure(EntityTypeBuilder<Administration> builder)
  {
    builder
      .HasMany(adm => adm.Terms)
      .WithOne(term => term.Administration)
      .IsRequired()
      .OnDelete(DeleteBehavior.Cascade);
  }
}
