using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.WorkTeamAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class WorkTeamConfiguration : IEntityTypeConfiguration<WorkTeam>
{
  public void Configure(EntityTypeBuilder<WorkTeam> builder)
  {
    builder
      .HasMany(workTeam => workTeam.Workers)
      .WithOne()
      .IsRequired(false)
      .OnDelete(DeleteBehavior.Cascade);
  }
}
