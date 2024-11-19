using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class EstateDocumentExpiredNotificationConfiguration : IEntityTypeConfiguration<EstateDocumentExpiredNotification>
{
  public void Configure(EntityTypeBuilder<EstateDocumentExpiredNotification> builder)
  {
  }
}
