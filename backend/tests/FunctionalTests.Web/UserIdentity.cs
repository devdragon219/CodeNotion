using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RealGimm.Core.IAM;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Web;
using RealGimm.WebCommons.GraphQL.User;

namespace RealGimm.FunctionalTests.Web;

public class UserIdentity
{
  private readonly IConfiguration _configuration;

  private ClaimsPrincipal? _defaultUserClaims;
  private string? _defaultToken;

  public const string DefaultUserName = "admin@tenant1";
  public const string DefaultUserPassword = "password";
  public const string DefaultTenant = "tenant1";
  public static readonly Guid DefaultTenantGuid = Guid.Parse("6b29fc40-ca47-1067-b31d-00dd010662da");

  public UserIdentity(IConfiguration configuration)
  {
    _configuration = configuration;
  }

  public ClaimsPrincipal GetDefaultUserClaims()
  {
    if (_defaultUserClaims is null)
    {
      MakeIdentityData();
    }

    return _defaultUserClaims!;
  }

  public string GetDefaultUserJwt()
  {
    if (_defaultToken is null)
    {
      MakeIdentityData();
    }

    return _defaultToken!;
  }

  private void MakeIdentityData()
  {
    var features = Features.UserFeatureList()
      .Concat(Features.AdminFeatureList())
      .ToDictionary(x => x, x => "CRUD");

    var handler = new JwtSecurityTokenHandler();
    var token = handler.CreateToken(new SecurityTokenDescriptor
    {
      Issuer = Auth.ISSUER,
      Audience = Auth.AUDIENCE,
      Claims = Jwt.MakeClaims(
          DefaultUserName,
          features,
          new() { [DefaultTenantGuid] = DefaultUserName },
          DefaultTenantGuid,
          OfficeAccess.Both
        ).ToDictionary(c => c.Type, c => (object)c.Value),
      Expires = null,
      Subject = new ClaimsIdentity(),
      SigningCredentials = new SigningCredentials(
          Jwt.GetSecurityKey(_configuration),
          SecurityAlgorithms.HmacSha256)
    });

    _defaultToken = handler.WriteToken(token);

    _defaultUserClaims = new ClaimsPrincipal();
    _defaultUserClaims.AddIdentity(JwtParser.Decode(_defaultToken));
  }
}
