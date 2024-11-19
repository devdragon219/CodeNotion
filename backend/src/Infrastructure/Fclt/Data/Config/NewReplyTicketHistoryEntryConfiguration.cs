using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class NewReplyTicketHistoryEntryConfiguration : IEntityTypeConfiguration<NewReplyTicketHistoryEntry>
{
  public void Configure(EntityTypeBuilder<NewReplyTicketHistoryEntry> builder)
  {
    builder.HasBaseType<TicketHistoryEntry>();

    builder
      .HasOne(entry => entry.Reply)
      .WithOne()
      .HasForeignKey<NewReplyTicketHistoryEntry>()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
