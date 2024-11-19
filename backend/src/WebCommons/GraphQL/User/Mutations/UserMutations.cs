using RealGimm.Core.Mtnt.Interfaces;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.WebCommons.Mapping;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using RealGimm.WebCommons.GraphQL.User.Models;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.WebCommons.GraphQL.User.Mutations;

public class UserMutations
{
  public async Task<LoginResult?> SwitchTenant(
    SwitchTenantInput input,
    ClaimsPrincipal user,
    [Service] ILogger<UserMutations> logger,
    [Service] IHttpContextAccessor contextAccessor,
    [Service] IConfiguration configuration,
    [Service] ILoginProvider loginProvider,
    [Service] INetLocationProvider locationProvider,
    [Service] IAuthSettingsProvider authSettingsProvider,
    CancellationToken cancellationToken = default)
  {
    var username = user.FindFirstValue(ClaimTypes.NameIdentifier)!;
    var tenants = await loginProvider.GetUserActiveTenantsAsync(username, cancellationToken);

    if (!tenants.Any(t => t.Key == input.newTenant))
    {
      logger.LogInformation("Switch tenant failed (not a tenant for this user) for {remoteIp} to {newTenant}",
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress,
        input.newTenant);

      throw new UnauthorizedAccessException();
    }

    var features = await loginProvider.GetUserFeaturesAsync(username, input.newTenant, cancellationToken);
    var officeAccess = await loginProvider.GetUserOfficeAccessAsync(username, input.newTenant, cancellationToken);

    // Assume valid
    var handler = new JwtSecurityTokenHandler();
    var claims = Jwt.MakeClaims(username, features, tenants, input.newTenant, officeAccess);
    var accessToken = Jwt.CreateToken(
      authSettingsProvider.Issuer,
      authSettingsProvider.Audience,
      handler,
      claims,
      configuration);
    var userModel = new UserModel(username);

    var session = new Session();
    session.SetRefreshToken(RefreshToken.Generate(), RefreshToken.GetExpiration(configuration));

    var loginIp = contextAccessor?.HttpContext?.Connection.RemoteIpAddress?.ToString();

    session.SetUserData(
      contextAccessor?.HttpContext?.Request.Headers.UserAgent,
      loginIp,
      await locationProvider.DescribeNetLocation(loginIp));

    await loginProvider.AddSessionAndClearExpiredAsync(username, tenants.Single().Key, session, cancellationToken);

    return new LoginResult
    {
      User = userModel,
      Jwt = handler.WriteToken(accessToken),
      RefreshToken = session.RefreshToken,
      Claims = claims
    };
  }

  public async Task<Result> ChangePassword(
    ChangePasswordInput input,
    ClaimsPrincipal user,
    [Service] ILogger<UserMutations> logger,
    [Service] IHttpContextAccessor contextAccessor,
    [Service] ILoginProvider loginProvider,
    CancellationToken cancellationToken = default)
  {
    var username = user.FindFirstValue(ClaimTypes.NameIdentifier)!;

    if (!username.Equals(input.Username))
    {
      logger.LogInformation("Update password failed (username mismatch) for {remoteIp} username {username}",
        contextAccessor?.HttpContext?.Connection.RemoteIpAddress,
        username);
      return Result.Invalid(ErrorCode.InvalidUserUpdating.ToValidationError());
    }

    return await loginProvider.UpdatePasswordAsync(input.Username, input.CurrentPassword, input.NewPassword, cancellationToken)
      ? Result.Success()
      : Result.Error();
  }

  public async Task<Result> RevokeSession(
    int sessionId,
    [Service] IUserDataProvider userDataProvider,
    [Service] IRepository<Core.IAM.UserAggregate.User> repository,
    CancellationToken cancellationToken = default)
  {
    var user = await repository
      .AsQueryable(
        new UserByUsernameSpec(userDataProvider.Username),
        new EntityNonDeletedSpec<Core.IAM.UserAggregate.User>(),
        new UserIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (user is null)
    {
      return Result.NotFound();
    }

    var session = user.Sessions.SingleOrDefault(session => session.Id == sessionId);
    if (session is null)
    {
      return Result.NotFound();
    }

    user.RevokeSession(session);
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  public async Task<Result> RevokeAllSessions(
    [Service] IUserDataProvider userDataProvider,
    [Service] IRepository<Core.IAM.UserAggregate.User> repository,
    CancellationToken cancellationToken = default)
  {
    var user = await repository
      .AsQueryable(
        new UserByUsernameSpec(userDataProvider.Username),
        new EntityNonDeletedSpec<Core.IAM.UserAggregate.User>(),
        new UserIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (user is null)
    {
      return Result.NotFound();
    }

    user.RevokeAllSessions();
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  public async Task<Result> UpdateMainDashboardWidgets(
    WidgetSectionInput[] inputs,
    [Service] IUserDataProvider userDataProvider,
    [Service] IRepository<Core.IAM.UserAggregate.User> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var user = await repository
      .AsQueryable(
        new UserByUsernameSpec(userDataProvider.Username),
        new EntityNonDeletedSpec<Core.IAM.UserAggregate.User>(),
        new UserIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (user is null)
    {
      return Result.NotFound();
    }

    inputs.FixOrderFields();

    await mapper.UpdateCollectionAsync(inputs, user.MainDashboard, cancellationToken);
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  public async Task<Result> UpdateFacilityDashboardWidgets(
    WidgetSectionInput[] inputs,
    [Service] IUserDataProvider userDataProvider,
    [Service] IRepository<Core.IAM.UserAggregate.User> repository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var user = await repository
      .AsQueryable(
        new UserByUsernameSpec(userDataProvider.Username),
        new EntityNonDeletedSpec<Core.IAM.UserAggregate.User>(),
        new UserIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (user is null)
    {
      return Result.NotFound();
    }

    inputs.FixOrderFields();

    await mapper.UpdateCollectionAsync(inputs, user.FacilityDashboard, cancellationToken);
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }
}
