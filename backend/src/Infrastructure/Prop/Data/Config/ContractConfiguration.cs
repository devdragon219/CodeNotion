using RealGimm.Core.Prop.ContractAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Prop.Data.Config;

public class ContractConfiguration : IEntityTypeConfiguration<Contract>
{
  private readonly bool _isInMemory;
  
  public ContractConfiguration(bool isInMemory) => _isInMemory = isInMemory;
  
  public void Configure(EntityTypeBuilder<Contract> builder)
  {
    builder.HasIndex(c => c.InternalCode);
    
    builder
      .HasOne(contract => contract.Type)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasMany(c => c.SubLocations)
      .WithOne(sl => sl.SublocatedContract)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasMany(c => c.RegistrationPayments)
      .WithOne(rp => rp.Contract)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasMany(c => c.Bills)
      .WithOne(b => b.Contract)
      .OnDelete(DeleteBehavior.Restrict);

    builder.OwnsMany(c => c.LocatedUnits);
    builder.OwnsMany(c => c.Counterparts);
    builder.OwnsMany(c => c.Transactors);
    builder.OwnsMany(c => c.SecurityDeposits,
      sdBuilder => sdBuilder.OwnsMany(sd => sd.InterestRows));
    builder.OwnsMany(c => c.Takeovers);
    builder.OwnsMany(c => c.BillingPauses);
    builder.OwnsMany(c => c.RatePlans);
    builder.OwnsMany(c => c.RevaluationHistories);
    builder
      .HasMany(c => c.OneshotAdditions)
      .WithOne()
      .IsRequired();

    builder.HasMany(c => c.RecurringAdditions)
      .WithOne()
      .IsRequired();

    builder.OwnsOne(c => c.RegistrationTaxData, r =>
    {
      if (_isInMemory)
      {
        r.Property(p => p.TakeoverOriginalSubjectIds)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => string.IsNullOrEmpty(v)
                    ? Array.Empty<int>()
                    : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Convert.ToInt32(e)).ToArray());
      }

      r.HasOne(rd => rd.RegistrationOffice)
        .WithMany()
        .OnDelete(DeleteBehavior.Restrict);
    });

    builder.OwnsOne(c => c.RevaluationData);
  }
}
