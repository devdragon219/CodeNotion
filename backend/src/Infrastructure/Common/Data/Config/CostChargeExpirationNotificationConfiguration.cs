using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class CostChargeExpirationNotificationConfiguration : IEntityTypeConfiguration<CostChargesExpirationNotification>
{
  public void Configure(EntityTypeBuilder<CostChargesExpirationNotification> builder)
  {
  }
}
