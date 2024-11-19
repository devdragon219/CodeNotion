using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class CatalogueItemDocumentExpiredNotificationConfiguration : IEntityTypeConfiguration<CatalogueItemDocumentExpiredNotification>
{
  public void Configure(EntityTypeBuilder<CatalogueItemDocumentExpiredNotification> builder)
  {
  }
}
