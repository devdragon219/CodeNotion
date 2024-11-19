using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.BillAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class BillRowConfiguration : IEntityTypeConfiguration<BillRow>
{
  public void Configure(EntityTypeBuilder<BillRow> builder)
  {
    builder
      .HasOne(b => b.OneshotAdditionSource)
      .WithMany();
    builder
      .HasOne(b => b.RecurringAdditionSource)
      .WithMany();
    builder
      .HasOne(b => b.TermInstallmentSource)
      .WithMany(ti => ti.Payments);

    builder
      .HasOne(b => b.ItemType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
