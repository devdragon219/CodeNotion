using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ServiceConfiguration : IEntityTypeConfiguration<Service>
{
  public void Configure(EntityTypeBuilder<Service> builder)
  {
    builder.HasOne(t => t.Category)
      .WithMany(c => c.Services)
      .OnDelete(DeleteBehavior.Restrict);

    builder.OwnsMany(item => item.Activities, activityBuilder =>
    {
      activityBuilder.HasKey(activity => activity.Id);
    });
  }
}
