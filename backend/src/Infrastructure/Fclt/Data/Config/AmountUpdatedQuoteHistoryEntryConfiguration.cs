using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class AmountUpdatedQuoteHistoryEntryConfiguration : IEntityTypeConfiguration<AmountUpdatedQuoteHistoryEntry>
{
  public void Configure(EntityTypeBuilder<AmountUpdatedQuoteHistoryEntry> builder)
  {
    builder.HasBaseType<QuoteHistoryEntry>();
  }
}
