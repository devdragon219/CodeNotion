using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Anag.Data.Config;

[AnagConfig]
public class BankAccountConfiguration : IEntityTypeConfiguration<BankAccount>
{
  public void Configure(EntityTypeBuilder<BankAccount> builder)
  {
    builder.HasIndex(ba => new
    {
      ba.SubjectId,
      ba.BankAccountType,
      ba.ReferenceCodeType,
      ba.ReferenceCode
    }).IsUnique();
  }
}
