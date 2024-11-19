using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.NotificationAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class SubjectDocumentExpiredNotificationConfiguration : IEntityTypeConfiguration<SubjectDocumentExpiredNotification>
{
  public void Configure(EntityTypeBuilder<SubjectDocumentExpiredNotification> builder)
  {
  }
}
