using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class SLAConfiguration : IEntityTypeConfiguration<SLA>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<SLA> builder)
  {
    var deleteBehavior = DbDialect == SupportedDbDialect.MsSqlServer
      ? DeleteBehavior.ClientCascade
      : DeleteBehavior.Cascade;

    builder
      .HasOne(sla => sla.IfCondition)
      .WithOne()
      .HasForeignKey<ComplexTicketCondition>("SLAIfId")
      .IsRequired(false)
      .OnDelete(deleteBehavior);

    builder
      .HasOne(sla => sla.ThenCondition)
      .WithOne()
      .HasForeignKey<ComplexTicketCondition>("SLAThenId")
      .IsRequired(false)
      .OnDelete(deleteBehavior);
  }
}
