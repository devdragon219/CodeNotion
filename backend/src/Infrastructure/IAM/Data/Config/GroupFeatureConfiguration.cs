using RealGimm.Core.IAM.GroupAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.IAM.Data.Config;

[IAMConfig]
public class GroupFeatureConfiguration : IEntityTypeConfiguration<GroupFeature>
{
  public void Configure(EntityTypeBuilder<GroupFeature> builder)
  {
    builder.HasKey(gf => new { gf.Feature, gf.GroupId });
  }
}
