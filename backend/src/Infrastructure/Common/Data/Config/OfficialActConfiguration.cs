using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealGimm.Core.Common.OfficialActAggregate;

namespace RealGimm.Infrastructure.Common.Data.Config;

[CommonConfig]
public class OfficialActConfiguration : IEntityTypeConfiguration<OfficialAct>
{
  public void Configure(EntityTypeBuilder<OfficialAct> builder)
  {
  }
}
