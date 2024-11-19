using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
  public void Configure(EntityTypeBuilder<Notification> builder)
  {
    builder.HasIndex(c => c.Username);
  }
}
