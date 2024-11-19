using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using RealGimm.WebCommons;
using RealGimm.WebCommons.GraphQL.User;

namespace RealGimm.FunctionalTests.TenantCtl;

public static class JwtParser
{
  public static ClaimsIdentity Decode(string jwt)
  {
    var handler = new JwtSecurityTokenHandler();
    var token = handler.ReadJwtToken(jwt);

    var permissionClaim = token.Claims.FirstOrDefault(c => c.Type == Jwt.AVAILABLE_FEATURE);
    var officeAccessClaim = token.Claims.FirstOrDefault(c => c.Type == Jwt.AVAILABLE_OFFICE);

    return HttpRequestPermissionInterceptor.DecodeRoles(
      permissionClaim?.Value ?? string.Empty,
      officeAccessClaim?.Value ?? string.Empty);
  }
}
