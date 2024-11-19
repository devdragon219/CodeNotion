using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class EstateUnitDocumentExpiredNotificationConfiguration : IEntityTypeConfiguration<EstateUnitDocumentExpiredNotification>
{
  public void Configure(EntityTypeBuilder<EstateUnitDocumentExpiredNotification> builder)
  {
  }
}
