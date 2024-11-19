using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class EstatePortfolioExportIsReadyNotificationConfiguration : IEntityTypeConfiguration<EstatePortfolioExportIsReadyNotification>
{
  public void Configure(EntityTypeBuilder<EstatePortfolioExportIsReadyNotification> builder)
  {
  }
}
