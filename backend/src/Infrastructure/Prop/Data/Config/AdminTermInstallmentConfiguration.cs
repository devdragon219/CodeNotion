using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.AdministrationTermAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class AdminTermInstallmentConfiguration : IEntityTypeConfiguration<TermInstallment>
{
  public void Configure(EntityTypeBuilder<TermInstallment> builder)
  {
    builder
      .HasOne(t => t.BillItemType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
