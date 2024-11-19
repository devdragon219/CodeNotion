using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.ContractTypeAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ContractTypeConfiguration : IEntityTypeConfiguration<ContractType>
{
  public void Configure(EntityTypeBuilder<ContractType> builder)
  {
    builder
      .HasMany(contractType => contractType.ContractTemplates)
      .WithOne(template => template.ContractType)
      .OnDelete(DeleteBehavior.Restrict);

    builder
      .HasMany(contractType => contractType.Contracts)
      .WithOne(contract => contract.Type)
      .OnDelete(DeleteBehavior.Restrict);
  }
}
