using RealGimm.Core.Common.CustomCodeAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class CustomCodeConfiguration : IEntityTypeConfiguration<CustomCode>
{
  public void Configure(EntityTypeBuilder<CustomCode> builder)
  {
    builder.HasIndex(cc => new {
      cc.DataProvider,
      cc.Group
    });

    builder.HasIndex(cc => cc.ExternalCode);
    builder.HasIndex(cc => cc.InternalCode);
  }
}
