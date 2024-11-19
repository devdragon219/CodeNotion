using RealGimm.Core.Mtnt.TenantAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Mtnt.Data.Config;

[MtntConfig]
public class TenantConfiguration : IEntityTypeConfiguration<Tenant>
{
  public void Configure(EntityTypeBuilder<Tenant> builder)
  {
    builder.HasIndex(p => p.GUID).IsUnique();
  }
}
