using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class ContractExpirationNotificationConfiguration : IEntityTypeConfiguration<ContractsExpirationNotification>
{
  public void Configure(EntityTypeBuilder<ContractsExpirationNotification> builder)
  {
  }
}
