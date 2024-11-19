using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class DocumentExpiredNotificationConfiguration : IEntityTypeConfiguration<DocumentExpiredNotification>
{
  public void Configure(EntityTypeBuilder<DocumentExpiredNotification> builder)
  {
  }
}
