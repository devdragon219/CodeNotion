using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class TicketChecklistTemplateConfiguration : IEntityTypeConfiguration<TicketChecklistTemplate>,
  IDatabaseDependentConfiguration
{
  public SupportedDbDialect DbDialect { get; set; }

  public void Configure(EntityTypeBuilder<TicketChecklistTemplate> builder)
  {
    if (DbDialect == SupportedDbDialect.PostgreSQL)
    {
      builder
        .Property(template => template.PreventativeDaysOfWeek)
        .HasConversion(
          daysOfWeek => daysOfWeek == null ? null : daysOfWeek.Select(dayOfWeek => (int)dayOfWeek).ToArray(),
          intArray => intArray == null ? null : intArray.Select(intValue => (DayOfWeek)intValue).ToArray());
    }
    else if (DbDialect == SupportedDbDialect.MsSqlServer)
    {
      builder
        .Property(template => template.PreventativeDaysOfWeek)
        .HasConversion(
          daysOfWeek => daysOfWeek == null ? null : daysOfWeek.Select(dayOfWeek => (int)dayOfWeek),
          intArray => intArray == null ? null : intArray.Select(intValue => (DayOfWeek)intValue).ToArray());
    }
  }
}
