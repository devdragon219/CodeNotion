using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.ContractAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ContractConfiguration : IEntityTypeConfiguration<Contract>
{
  public void Configure(EntityTypeBuilder<Contract> builder)
  {
    builder
      .HasOne(contract => contract.OriginalTemplate)
      .WithMany()
      .OnDelete(DeleteBehavior.SetNull);

    builder.OwnsMany(contract => contract.FrameworkAgreements);

    builder
      .HasOne(contract => contract.OriginalEstateUnitGroup)
      .WithMany()
      .OnDelete(DeleteBehavior.SetNull);

    builder
      .HasMany(contract => contract.SLAs)
      .WithOne(sla => sla.Contract)
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(contract => contract.Penalties)
      .WithOne(penalty => penalty.Contract)
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(contract => contract.TicketChecklists)
      .WithOne(ticketChecklist => ticketChecklist.Contract)
      .OnDelete(DeleteBehavior.Cascade);

    builder.OwnsOne(contract => contract.BillingInfo);

    builder
      .HasMany(contract => contract.PriceLists)
      .WithMany();

    builder.OwnsMany(contract => contract.TermExtensions);
  }
}
