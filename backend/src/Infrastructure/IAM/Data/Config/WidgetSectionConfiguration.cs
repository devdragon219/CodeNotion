using RealGimm.Core.IAM.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.IAM.Data.Config;

[IAMConfig]
public class WidgetSectionConfiguration : IEntityTypeConfiguration<WidgetSection>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<WidgetSection> builder)
  {
    var deleteBehavior = DbDialect == SupportedDbDialect.MsSqlServer
      ? DeleteBehavior.ClientCascade
      : DeleteBehavior.Cascade;

    builder
      .HasOne<User>()
      .WithMany(user => user.MainDashboard)
      .IsRequired(false)
      .HasForeignKey(nameof(User.MainDashboard) + nameof(User) + nameof(User.Id))
      .OnDelete(deleteBehavior);

    builder
      .HasOne<User>()
      .WithMany(user => user.FacilityDashboard)
      .IsRequired(false)
      .HasForeignKey(nameof(User.FacilityDashboard) + nameof(User) + nameof(User.Id))
      .OnDelete(deleteBehavior);
  }
}
