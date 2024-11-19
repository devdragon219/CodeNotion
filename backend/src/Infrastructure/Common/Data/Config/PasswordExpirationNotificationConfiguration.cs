using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class PasswordExpirationNotificationConfiguration : IEntityTypeConfiguration<PasswordExpirationNotification>
{
  public void Configure(EntityTypeBuilder<PasswordExpirationNotification> builder)
  {
  }
}
