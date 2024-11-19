using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.WebCommons.GraphQL.User;

public static class Jwt
{
  public static readonly string COOKIE_NAME = "rg_token";
  public static readonly string CONF_SIGNING_KEY = "JwtSigningKey";
  public static readonly string CONF_DURATION = "JwtDurationMinutes";
  public static readonly string SELECTED_TENANT = "rg_mtnt_selected";
  public static readonly string AVAILABLE_TENANT = "rg_mtnt_";
  public static readonly string AVAILABLE_FEATURE = "rg_perm";
  public static readonly string AVAILABLE_OFFICE = "rg_office";

  static readonly int _defaultDurationMinutes = 30;

  public static DateTime GetExpiration(IConfiguration conf)
  {
    var confDuration = conf[CONF_DURATION];

    return DateTime.UtcNow.AddMinutes(
        (!string.IsNullOrEmpty(confDuration) && confDuration.Length < 6 && confDuration.All(char.IsDigit))
            ? Convert.ToInt32(confDuration)
            : _defaultDurationMinutes
        );
  }

  public static IEnumerable<Claim> MakeClaims(
    string username,
    Dictionary<string, string> availableFeatures,
    Dictionary<Guid, string> userTenants,
    Guid? selectedTenant,
    OfficeAccess? officeAccess)
  {
    // See Confluence documentation on the string format
    var permissionString = string.Join("#", availableFeatures
      .Select(kvp => new
      {
        kvp.Key,
        Value = (kvp.Value.Contains('C') ? 1 : 0)
          + (kvp.Value.Contains('R') ? 2 : 0)
          + (kvp.Value.Contains('U') ? 4 : 0)
          + (kvp.Value.Contains('D') ? 8 : 0)
      })
      .Where(v => v.Value > 0)
      .Select(kvp => $"{kvp.Key}:{kvp.Value:X}"));

    var officeAccessString = officeAccess switch
    {
      OfficeAccess.Both => "BF",
      OfficeAccess.BackOffice => "B",
      OfficeAccess.FrontOffice => "F",
      _ => null
    };

    return userTenants
          .Select(kvp => new Claim($"{AVAILABLE_TENANT}{kvp.Key}", kvp.Value))
          .Concat(selectedTenant.HasValue
            ? [new(SELECTED_TENANT, selectedTenant.Value.ToString())]
            : Array.Empty<Claim>())
          .Concat(!string.IsNullOrEmpty(permissionString)
            ? [new(AVAILABLE_FEATURE, permissionString)]
            : Array.Empty<Claim>())
          .Concat(!string.IsNullOrEmpty(officeAccessString)
            ? [new(AVAILABLE_OFFICE, officeAccessString)]
            : Array.Empty<Claim>())
          .Concat([
            new(ClaimTypes.NameIdentifier, username),
            new(JwtRegisteredClaimNames.Sub, username),
          ]);
  }

  public static SecurityToken CreateToken(
    string issuer,
    string audience,
    JwtSecurityTokenHandler tokenHandler,
    IEnumerable<Claim> claims,
    IConfiguration configuration)
    => tokenHandler.CreateToken(new SecurityTokenDescriptor
    {
      Issuer = issuer,
      Audience = audience,
      Claims = claims.ToDictionary(claim => claim.Type, claim => (object)claim.Value),
      Expires = GetExpiration(configuration),
      Subject = new ClaimsIdentity(),
      SigningCredentials = new SigningCredentials(GetSecurityKey(configuration), SecurityAlgorithms.HmacSha256)
    });

  public static IEnumerable<string> GetRoles(string permissionString, string officeAccessString)
  {
    ArgumentNullException.ThrowIfNull(permissionString);
    ArgumentNullException.ThrowIfNull(officeAccessString);

    var roles = new List<string>();

    if (!string.IsNullOrWhiteSpace(permissionString))
    {
      var permissionRoles = permissionString.Split('#').SelectMany(s =>
      {
        var sParts = s.Split(':');
        var flags = Convert.ToInt32(sParts[1], 16);

        return new[] { 1, 2, 4, 8 }
          .Where(f => (flags & f) > 0)
          .Select(f => f == 1 ? "C" : (f == 2 ? "R" : (f == 4 ? "U" : (f == 8 ? "D" : string.Empty))))
          .Where(f => !string.IsNullOrEmpty(f))
          .Select(f => sParts[0] + "_" + f);
      });

      roles.AddRange(permissionRoles);
    }

    if (!string.IsNullOrWhiteSpace(officeAccessString))
    {
      var officeAccessRoles = officeAccessString
        .Where(symbol => symbol is 'F' or 'B')
        .Select(symbol => $"OFFICE_{symbol}");

      roles.AddRange(officeAccessRoles);
    }

    return roles;
  }

  public static SymmetricSecurityKey GetSecurityKey(IConfiguration conf)
  {
    return new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
              conf[CONF_SIGNING_KEY] ?? string.Empty
            )
          );
  }
}
