using System.Security.Claims;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using RealGimm.WebCommons.GraphQL.User;

namespace RealGimm.WebCommons;

public class HttpRequestPermissionInterceptor : DefaultHttpRequestInterceptor
{
  public static readonly string RG_PERMISSION_AUTHENTICATION_SCHEME = "RgAuthentication";

  public static ClaimsIdentity DecodeRoles(string permissionString, string officeAccessString)
  {
    var roleClaims = Jwt
      .GetRoles(permissionString, officeAccessString)
      .Select(permission => new Claim(ClaimTypes.Role, permission));

    var identity = new ClaimsIdentity(RG_PERMISSION_AUTHENTICATION_SCHEME);
    identity.AddClaims(roleClaims);

    return identity;
  }

  public override ValueTask OnCreateAsync(
    HttpContext context,
    IRequestExecutor requestExecutor,
    IQueryRequestBuilder requestBuilder,
    CancellationToken cancellationToken)
  {
    if (context.User.Identity?.IsAuthenticated ?? false)
    {
      var permissionsClaim = context.User.Claims.FirstOrDefault(claim => claim.Type == Jwt.AVAILABLE_FEATURE);
      var officeAccessClaim = context.User.Claims.FirstOrDefault(claim => claim.Type == Jwt.AVAILABLE_OFFICE);

      var rgIdentity = DecodeRoles(
        permissionsClaim?.Value ?? string.Empty,
        officeAccessClaim?.Value ?? string.Empty);

      context.User.AddIdentity(rgIdentity);
    }

    return base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);
  }
}
