using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class OneshotAdditionConfiguration : IEntityTypeConfiguration<OneshotAddition>
{
  public void Configure(EntityTypeBuilder<OneshotAddition> builder)
  {
    builder
      .HasOne(b => b.RegistrationPayment)
      .WithMany();

    builder
      .HasOne(b => b.BillItemType)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
