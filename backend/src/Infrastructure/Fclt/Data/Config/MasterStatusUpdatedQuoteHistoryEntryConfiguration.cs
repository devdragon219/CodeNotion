using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class MasterStatusUpdatedQuoteHistoryEntryConfiguration : IEntityTypeConfiguration<MasterStatusUpdatedQuoteHistoryEntry>
{
  public void Configure(EntityTypeBuilder<MasterStatusUpdatedQuoteHistoryEntry> builder)
  {
    builder.HasBaseType<QuoteHistoryEntry>();
  }
}
