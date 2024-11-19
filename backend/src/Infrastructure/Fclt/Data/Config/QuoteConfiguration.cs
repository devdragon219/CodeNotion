using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class QuoteConfiguration : IEntityTypeConfiguration<Quote>
{
  public void Configure(EntityTypeBuilder<Quote> builder)
  {
    builder.OwnsMany(quote => quote.Articles);

    builder
      .HasMany(ticket => ticket.History)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);
  }
}
