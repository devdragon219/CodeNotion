using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ApprovedAmountUpdatedQuoteHistoryEntryConfiguration : IEntityTypeConfiguration<ApprovedAmountUpdatedQuoteHistoryEntry>
{
  public void Configure(EntityTypeBuilder<ApprovedAmountUpdatedQuoteHistoryEntry> builder)
  {
    builder.HasBaseType<QuoteHistoryEntry>();
  }
}
