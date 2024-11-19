using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class ContractDocumentExpiredNotificationConfiguration : IEntityTypeConfiguration<ContractDocumentExpiredNotification>
{
  public void Configure(EntityTypeBuilder<ContractDocumentExpiredNotification> builder)
  {
  }
}
