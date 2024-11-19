using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
  public void Configure(EntityTypeBuilder<Ticket> builder)
  {
    builder.OwnsOne(ticket => ticket.Resolution);
    builder.OwnsMany(ticket => ticket.PerformedActivities);
    builder.OwnsMany(ticket => ticket.Reminders);
    
    builder
      .HasMany(ticket => ticket.Replies)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(ticket => ticket.History)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasOne(ticket => ticket.Quote)
      .WithOne()
      .HasForeignKey<Quote>()
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(ticket => ticket.Workers)
      .WithOne()
      .IsRequired(false)
      .OnDelete(DeleteBehavior.Restrict);

    builder
      .HasOne(ticket => ticket.PlannedTeam)
      .WithMany()
      .OnDelete(DeleteBehavior.SetNull);

    builder
      .HasMany(ticket => ticket.Children)
      .WithOne()
      .OnDelete(DeleteBehavior.Restrict);

    builder
      .HasOne(ticket => ticket.Checklist)
      .WithMany()
      .OnDelete(DeleteBehavior.Restrict);
  }
}
