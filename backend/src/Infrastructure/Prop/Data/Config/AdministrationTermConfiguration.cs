using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.AdministrationTermAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class AdministrationTermConfiguration : IEntityTypeConfiguration<AdministrationTerm>
{
  public void Configure(EntityTypeBuilder<AdministrationTerm> builder)
  {
    builder
      .HasMany(administrationTerm => administrationTerm.Installments)
      .WithOne(installment => installment.AdministrationTerm)
      .IsRequired();
  }
}
