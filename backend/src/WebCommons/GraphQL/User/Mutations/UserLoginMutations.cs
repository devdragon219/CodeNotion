using RealGimm.Core.Mtnt.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Mtnt;
using RealGimm.WebCommons.GraphQL.User.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace RealGimm.WebCommons.GraphQL.User.Mutations;

public class UserLoginMutations
{
  public async Task<LoginResult> Login(
    LoginInput input,
    [Service] ILogger<UserLoginMutations> logger,
    [Service] IHttpContextAccessor contextAccessor,
    [Service] IConfiguration configuration,
    [Service] ILoginProvider loginProvider,
    [Service] INetLocationProvider locationProvider,
    [Service] IAuthSettingsProvider authSettingsProvider,
    CancellationToken cancellationToken = default)
  {
    var isValid = await loginProvider.VerifyUserCredentialsAsync(input.Username, input.Password, cancellationToken);

    if (isValid != LoginCheckStatus.Success)
    {
      logger.LogInformation("Login attempt failed for username {username} from {remoteIp}: {status}",
        input.Username,
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress,
        isValid);

      await loginProvider.ProcessFailedLoginAttemptAsync(input.Username, cancellationToken);

      throw new LoginFailedException(isValid.ToString()) {
        LoginStatus = isValid
      };
    }

    return await TryLogin(
      input.Username,
      logger,
      contextAccessor,
      configuration,
      loginProvider,
      locationProvider,
      authSettingsProvider,
      cancellationToken);
  }

  public async Task<LoginResult> LoginOIDC(
    string idToken,
    [Service] ILogger<UserLoginMutations> logger,
    [Service] IHttpContextAccessor contextAccessor,
    [Service] IConfiguration configuration,
    [Service] ILoginProvider loginProvider,
    [Service] IJWTVerifier jwtVerifier,
    [Service] INetLocationProvider locationProvider,
    [Service] IAuthSettingsProvider authSettingsProvider,
    CancellationToken cancellationToken = default)
  {
    var tokenData = await jwtVerifier.CheckIssuerSignature(idToken);

    if (tokenData is null)
    {
      logger.LogInformation("Login attempt failed for invalid token from {remoteIp}",
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress);

      throw new LoginFailedException() {
        LoginStatus = LoginCheckStatus.InvalidCredentials
      };
    }

    var username = await loginProvider
      .VerifyUserTokenAsync(
        tokenData.Issuer,
        tokenData.Audiences.ToArray(),
        tokenData.Subject,
        cancellationToken);

    if (string.IsNullOrEmpty(username))
    {
      var candidateUsername = tokenData.Subject;
      var candidateName = tokenData.Subject;
      
      if (tokenData.TryGetClaim("name", out Claim nameClaim))
      {
        candidateName = nameClaim.Value;
      }

      if (tokenData.TryGetClaim("preferred_username", out Claim preferredUsernameClaim))
      {
        candidateUsername = preferredUsernameClaim.Value;
      }

      username = await loginProvider.TryAutocreateUser(
        tokenData.Issuer,
        tokenData.Audiences.ToArray(),
        tokenData.Subject,
        candidateUsername,
        candidateName,
        cancellationToken);
    }

    if (string.IsNullOrEmpty(username))
    {
      logger.LogInformation("Login attempt failed for token from {remoteIp}",
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress);

      throw new LoginFailedException() {
        LoginStatus = LoginCheckStatus.InvalidCredentials
      };
    }

    return await TryLogin(
      username,
      logger,
      contextAccessor,
      configuration,
      loginProvider,
      locationProvider,
      authSettingsProvider,
      cancellationToken);
  }

  private async Task<LoginResult> TryLogin(
    string username,
    ILogger<UserLoginMutations> logger,
    IHttpContextAccessor contextAccessor,
    IConfiguration configuration,
    ILoginProvider loginProvider,
    INetLocationProvider locationProvider,
    IAuthSettingsProvider authSettingsProvider,
    CancellationToken cancellationToken = default)
  {
    await loginProvider.ResetLoginAttemptsCountAsync(username, cancellationToken);

    var tenants = await loginProvider.GetUserActiveTenantsAsync(username, cancellationToken);

    var features = tenants.Count == 1
      ? await loginProvider.GetUserFeaturesAsync(username, tenants.First().Key, cancellationToken)
      : new Dictionary<string, string>();

    var officeAccess = tenants.Count == 1
      ? await loginProvider.GetUserOfficeAccessAsync(username, tenants.First().Key, cancellationToken)
      : (OfficeAccess?)null;

    // Assume valid
    var handler = new JwtSecurityTokenHandler();
    var selectedTenant = tenants.Count == 1 ? tenants.First().Key : (Guid?)null;
    var claims = Jwt.MakeClaims(username, features, tenants, selectedTenant, officeAccess);
    var accessToken = Jwt.CreateToken(
      authSettingsProvider.Issuer,
      authSettingsProvider.Audience,
      handler,
      claims,
      configuration);
    var refreshToken = RefreshToken.Generate();

    if (tenants.Count == 1)
    {
      var session = new Session();
      session.SetRefreshToken(refreshToken, RefreshToken.GetExpiration(configuration));

      var loginIp = contextAccessor?.HttpContext?.Connection.RemoteIpAddress?.ToString();

      session.SetUserData(
        contextAccessor?.HttpContext?.Request.Headers.UserAgent,
        loginIp,
        await locationProvider.DescribeNetLocation(loginIp));

      await loginProvider.AddSessionAndClearExpiredAsync(username, tenants.Single().Key, session, cancellationToken);
    }

    return new LoginResult
    {
      User = new UserModel(username),
      Jwt = handler.WriteToken(accessToken),
      RefreshToken = refreshToken,
      Claims = claims
    };
  }

  public async Task<LoginResult> RefreshAccessToken(
    string accessToken,
    string refreshToken,
    [Service] ILogger<UserLoginMutations> logger,
    [Service] IHttpContextAccessor contextAccessor,
    [Service] IConfiguration configuration,
    [Service] ILoginProvider loginProvider,
    [Service] INetLocationProvider locationProvider,
    [Service] IAuthSettingsProvider authSettingsProvider,
    CancellationToken cancellationToken = default)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    var validationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = Jwt.GetSecurityKey(configuration),
      ValidateIssuer = true,
      ValidIssuer = authSettingsProvider.Issuer,
      ValidateAudience = true,
      ValidAudience = authSettingsProvider.Audience,
      ValidateLifetime = false
    };

    var oldClaims = tokenHandler.ValidateToken(accessToken, validationParameters, out var validatedToken);
    var username = oldClaims.FindFirstValue(ClaimTypes.NameIdentifier)!;
    var targetTenant = Guid.Parse(oldClaims.FindFirstValue(Jwt.SELECTED_TENANT)!);

    var session = await loginProvider.GetSessionByRefreshTokenAsync(username, targetTenant, refreshToken, cancellationToken);
    if (session is null || session.RefreshTokenExpiration <= DateTime.UtcNow)
    {
      logger.LogInformation(
        "Refresh token verification failed for username {username} from {remoteIp} (tenant: {tenant})",
        username,
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress?.ToString() ?? "unknown IP address",
        targetTenant);

      throw new LoginFailedException() {
        LoginStatus = LoginCheckStatus.InvalidCredentials
      };
    }

    var tenants = await loginProvider.GetUserActiveTenantsAsync(username, cancellationToken);
    var features = await loginProvider.GetUserFeaturesAsync(username, targetTenant, cancellationToken);
    var officeAccess = await loginProvider.GetUserOfficeAccessAsync(username, targetTenant, cancellationToken);
    var newClaims = Jwt.MakeClaims(username, features, tenants, targetTenant, officeAccess);
    var newAccessToken = Jwt.CreateToken(
      authSettingsProvider.Issuer,
      authSettingsProvider.Audience,
      tokenHandler,
      newClaims,
      configuration);
    var userModel = new UserModel(username);
    var newRefreshToken = RefreshToken.Generate();

    var refreshIp = contextAccessor?.HttpContext?.Connection.RemoteIpAddress?.ToString();

    await loginProvider.RefreshSessionAsync(
      username,
      targetTenant,
      session.Id,
      newRefreshToken,
      RefreshToken.GetExpiration(configuration),
      contextAccessor?.HttpContext?.Request.Headers.UserAgent,
      refreshIp,
      await locationProvider.DescribeNetLocation(refreshIp),
      cancellationToken);

    return new LoginResult
    {
      User = userModel,
      Jwt = tokenHandler.WriteToken(newAccessToken),
      RefreshToken = newRefreshToken,
      Claims = newClaims
    };
  }
}
