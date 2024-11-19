using RealGimm.Core.IAM.GroupAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.IAM.Data.Config;

[IAMConfig]
public class GroupConfiguration : IEntityTypeConfiguration<Group>
{
  public void Configure(EntityTypeBuilder<Group> builder)
  {
    builder.Ignore(u => u.Users);

    builder.Navigation(g => g.Features).AutoInclude();
  }
}
