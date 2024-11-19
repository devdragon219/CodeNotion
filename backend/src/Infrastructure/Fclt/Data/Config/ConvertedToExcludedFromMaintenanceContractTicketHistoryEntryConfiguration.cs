using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class ConvertedToExcludedFromMaintenanceContractTicketHistoryEntryConfiguration : IEntityTypeConfiguration<ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry>
{
  public void Configure(EntityTypeBuilder<ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry> builder)
  {
    builder.HasBaseType<TicketHistoryEntry>();
  }
}
