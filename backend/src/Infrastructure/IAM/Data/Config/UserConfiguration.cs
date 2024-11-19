using RealGimm.Core.IAM.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RealGimm.Infrastructure.IAM.Data.Config;

[IAMConfig]
public class UserConfiguration : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    builder
      .HasIndex(user => user.UserName)
      .IsUnique();

    builder.Ignore(user => user.Groups);

    builder
      .Navigation(user => user.UserGroups)
      .AutoInclude();
  }
}
