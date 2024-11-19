using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.WorkTeamAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class WorkerConfiguration : IEntityTypeConfiguration<Worker>
{
  public void Configure(EntityTypeBuilder<Worker> builder)
  {
    builder
      .HasOne(workMan => workMan.Craft)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);

    builder
      .HasOne(workMan => workMan.QualificationLevel)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
