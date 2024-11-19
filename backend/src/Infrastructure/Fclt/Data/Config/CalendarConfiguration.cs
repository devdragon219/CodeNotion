using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.Infrastructure.Fclt.Data.Config;

[FcltConfig]
public class CalendarConfiguration : IEntityTypeConfiguration<Calendar>
{
  public void Configure(EntityTypeBuilder<Calendar> builder)
  {
    builder
      .HasMany(calendar => calendar.Days)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);

    builder
      .HasMany(calendar => calendar.Holidays)
      .WithOne()
      .OnDelete(DeleteBehavior.Cascade);
  }
}
