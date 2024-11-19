using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class RecurringAdditionConfiguration : IEntityTypeConfiguration<RecurringAddition>
{
  public void Configure(EntityTypeBuilder<RecurringAddition> builder)
  {
    builder
      .HasOne(b => b.BillItemType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
