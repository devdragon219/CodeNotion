using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class NewReminderTicketHistoryEntryConfiguration : IEntityTypeConfiguration<NewReminderTicketHistoryEntry>
{
  public void Configure(EntityTypeBuilder<NewReminderTicketHistoryEntry> builder)
  {
    builder.HasBaseType<TicketHistoryEntry>();
  }
}
