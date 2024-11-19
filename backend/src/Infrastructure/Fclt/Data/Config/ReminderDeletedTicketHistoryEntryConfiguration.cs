using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ReminderDeletedTicketHistoryEntryConfiguration : IEntityTypeConfiguration<ReminderDeletedTicketHistoryEntry>
{
  public void Configure(EntityTypeBuilder<ReminderDeletedTicketHistoryEntry> builder)
  {
    builder.HasBaseType<TicketHistoryEntry>();
  }
}
