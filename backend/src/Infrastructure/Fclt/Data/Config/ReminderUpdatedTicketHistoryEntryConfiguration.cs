using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ReminderUpdatedTicketHistoryEntryConfiguration : IEntityTypeConfiguration<ReminderUpdatedTicketHistoryEntry>
{
  public void Configure(EntityTypeBuilder<ReminderUpdatedTicketHistoryEntry> builder)
  {
    builder.HasBaseType<TicketHistoryEntry>();
  }
}
