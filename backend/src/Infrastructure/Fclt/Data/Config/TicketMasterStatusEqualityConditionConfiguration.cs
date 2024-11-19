using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketMasterStatusConditionConfiguration : IEntityTypeConfiguration<TicketMasterStatusCondition>
{
  public void Configure(EntityTypeBuilder<TicketMasterStatusCondition> builder)
  {
    builder.HasBaseType<TicketCondition>();

    builder
      .HasOne(condition => condition.Calendar)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
