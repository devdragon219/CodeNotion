using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class ConfigConfiguration : IEntityTypeConfiguration<Core.Common.ConfigAggregate.Config>
{
  public void Configure(EntityTypeBuilder<Core.Common.ConfigAggregate.Config> builder)
  {
    builder.HasIndex(c => new
    {
      c.Function,
      c.Name
    }).IsUnique();
  }
}
