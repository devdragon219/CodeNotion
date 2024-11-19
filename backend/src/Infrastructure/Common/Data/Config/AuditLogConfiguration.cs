using RealGimm.Core.Common.AuditLogAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
  public void Configure(EntityTypeBuilder<AuditLog> builder)
  {
  }
}
