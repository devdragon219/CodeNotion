using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class CalendarDayConfiguration : IEntityTypeConfiguration<CalendarDay>
{
  public void Configure(EntityTypeBuilder<CalendarDay> builder)
  {
    builder.OwnsMany(day => day.TimeRanges);
  }
}
