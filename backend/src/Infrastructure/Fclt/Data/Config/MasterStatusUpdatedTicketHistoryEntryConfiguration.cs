using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class MasterStatusUpdatedTicketHistoryEntryConfiguration : IEntityTypeConfiguration<MasterStatusUpdatedTicketHistoryEntry>
{
  public void Configure(EntityTypeBuilder<MasterStatusUpdatedTicketHistoryEntry> builder)
  {
    builder.HasBaseType<TicketHistoryEntry>();
  }
}
