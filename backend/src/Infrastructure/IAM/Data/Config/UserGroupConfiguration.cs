using RealGimm.Core.IAM.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.IAM.Data.Config;

[IAMConfig]
public class UserGroupConfiguration : IEntityTypeConfiguration<UserGroup>
{
  public void Configure(EntityTypeBuilder<UserGroup> builder)
  {
    builder.HasKey(ug => new { ug.GroupId, ug.UserId });

    builder.HasOne(ug => ug.User)
      .WithMany(u => u.UserGroups)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(ug => ug.Group)
      .WithMany(u => u.UserGroups)
      .OnDelete(DeleteBehavior.Cascade);

    builder.Ignore(p => p.Id);
  }
}
