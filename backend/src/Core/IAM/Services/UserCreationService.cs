using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.SharedKernel;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.IAM.Services;

public class UserCreationService : IConfigurableModule
{
  public const string PARAM_AUDIENCE = "oidc-audience";
  public const string PARAM_ISSUER = "oidc-issuer";
  public const string PARAM_GROUP = "oidc-default-group-id";
  public const string PARAM_AUTOCREATE = "oidc-autocreate";
  public required IRepository<User> _userRepo { private get; init; }
  public required IReadRepository<Group> _groupRepo { private get; init; }
  public required IReadRepository<Config> _configRepo { private get; init; }

  public string[] ConfigurationParameters => [
    PARAM_AUDIENCE,
    PARAM_ISSUER,
    PARAM_AUTOCREATE,
    PARAM_GROUP
  ];

  public ConfigFunction Function => ConfigFunction.ExternalLogin;

  public async Task<string?> TryCreateUser(
    string issuer,
    string[] audiences,
    string subject,
    string username,
    string firstName,
    CancellationToken cancellationToken
  )
  {
    //Check if this tenant has the configuration settings for automatic user creation
    var externalAuthConfig = await _configRepo
      .AsQueryable(new ConfigByFunctionSpec(ConfigFunction.ExternalLogin))
      .ToListAsync(cancellationToken);

    var audienceConf = externalAuthConfig
      .FirstOrDefault(c => c.Name == PARAM_AUDIENCE
        && c.Value is not null);

    var issuerConf = externalAuthConfig
      .FirstOrDefault(c => c.Name == PARAM_ISSUER
        && c.Value is not null);

    var defaultGroup = externalAuthConfig
      .FirstOrDefault(c => c.Name == PARAM_GROUP
        && c.Value is not null);

    if (externalAuthConfig.Any(
      c => c.Name == PARAM_AUTOCREATE && c.Value.IsHumanTrue())
      && defaultGroup is not null
      && audienceConf is not null
      && audiences.Contains(audienceConf.Value)
      && issuerConf is not null
      && issuer == issuerConf.Value)
    {
      //This is the correct tenant. Create the user and return the username
      var newUser = new User(username, UserType.Internal, null);
      newUser.SetExternalAuth(subject, issuer, audienceConf.Value!);
      newUser.SetName(firstName, null);

      var defaultGroupId = Convert.ToInt32(defaultGroup.Value!);

      var group = await _groupRepo
        .AsQueryable(new GetByIdSpec<Group>(defaultGroupId))
        .FirstOrDefaultAsync(cancellationToken);

      if (group is not null)
      {
        newUser.AddGroup(group);

        await _userRepo.AddAsync(newUser, cancellationToken);

        return newUser.UserName;
      }
    }

    return null;
  }
}
