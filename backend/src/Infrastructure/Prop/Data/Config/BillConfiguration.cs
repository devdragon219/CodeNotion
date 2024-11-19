using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Prop.BillAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Config;

[PropConfig]
public class BillConfiguration : IEntityTypeConfiguration<Bill>
{
  public void Configure(EntityTypeBuilder<Bill> builder)
  {
    builder
      .HasMany(b => b.BillRows)
      .WithOne(br => br.Bill)
      .IsRequired();
  }
}
