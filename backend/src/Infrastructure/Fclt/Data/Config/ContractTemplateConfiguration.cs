using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ContractTemplateConfiguration : IEntityTypeConfiguration<ContractTemplate>
{
  public void Configure(EntityTypeBuilder<ContractTemplate> builder)
  {
    builder
      .HasMany(contractTemplate => contractTemplate.SLAs)
      .WithMany()
      .UsingEntity<Dictionary<string, object>>(
        "ContractTemplateSLARelation",
        relation => relation.HasOne<SLA>().WithMany().OnDelete(DeleteBehavior.Restrict),
        relation => relation.HasOne<ContractTemplate>().WithMany().OnDelete(DeleteBehavior.Cascade));

    builder
      .HasMany(contractTemplate => contractTemplate.Penalties)
      .WithMany()
      .UsingEntity<Dictionary<string, object>>(
        "ContractTemplatePenaltyRelation",
        relation => relation.HasOne<Penalty>().WithMany().OnDelete(DeleteBehavior.Restrict),
        relation => relation.HasOne<ContractTemplate>().WithMany().OnDelete(DeleteBehavior.Cascade));
  }
}
