using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Infrastructure.Mtnt.Data;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.Core.IAM.UserAggregate;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using RealGimm.SharedKernel;
using RealGimm.Core.IAM.Services;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Mtnt;

namespace RealGimm.Infrastructure.Mtnt.IAM;

public class LoginProvider : ILoginProvider
{
  private readonly ILogger<LoginProvider> _logger;
  private readonly MtntDbContext _mtnt;
  private readonly IConfiguration _configuration;
  private readonly IServiceProvider _serviceProvider;
  private readonly PasswordHasher<object> _passwordHasher = new();

  public LoginProvider(
    ILogger<LoginProvider> logger,
    MtntDbContext mtnt,
    IConfiguration configuration,
    IServiceProvider serviceProvider)
  {
    _mtnt = mtnt;
    _logger = logger;
    _configuration = configuration;
    _serviceProvider = serviceProvider;
  }

  public async Task<LoginCheckStatus> VerifyUserCredentialsAsync(
    string username,
    string passwordHash,
    CancellationToken cancellationToken = default)
  {
    var checkUsername = username.ToLowerInvariant();

    var userResults = await CheckUserPredicateAsync(
      u => u.UserName == checkUsername,
      passwordHash,
      cancellationToken: cancellationToken);

    if (userResults.Length == 0)
    {
      return LoginCheckStatus.InvalidCredentials;
    }
    else if (userResults.Any(u => u.user.LockedSince.HasValue))
    {
      return LoginCheckStatus.UserLocked;
    }
    else if (userResults.Any(u => u.user.PasswordExpiredSince.HasValue))
    {
      return LoginCheckStatus.PasswordExpired;
    }

    return LoginCheckStatus.Success;
  }

  public async Task<string?> VerifyUserTokenAsync(
    string issuer,
    string[] audiences,
    string subject,
    CancellationToken cancellationToken = default)
  {
    var userResults = await CheckUserPredicateAsync(
      u =>
        !u.LockedSince.HasValue &&
        u.ExternalAuthIss == issuer &&
        audiences.Contains(u.ExternalAuthAud) &&
        u.ExternalAuthSub == subject,
      cancellationToken: cancellationToken);

    //The first username for this subject/issuer
    return userResults.Length > 0
      ? userResults[0].user.UserName
      : null;
  }

  public async Task<string?> TryAutocreateUser(
    string issuer,
    string[] audiences,
    string subject,
    string username,
    string firstName,
    CancellationToken cancellationToken = default)
  {
    var tenants = await _mtnt.Tenants
      .Where(t => !t.DeletionDate.HasValue && !t.LockedSince.HasValue)
      .Select(t => new { t.GUID, t.Name })
      .ToDictionaryAsync(o => o.GUID, o => o.Name, cancellationToken);

    foreach (var tenant in tenants)
    {
      await using var tenantScope = _serviceProvider.CreateAsyncScope();

      var udp = tenantScope.ServiceProvider.GetRequiredService<IUserDataProvider>();

      udp.SetTenantId(tenant.Key);

      var userCreationService = tenantScope.ServiceProvider
        .GetRequiredService<UserCreationService>();

      var newUsername = await userCreationService.TryCreateUser(
        issuer,
        audiences,
        subject,
        username,
        firstName,
        cancellationToken
      );

      if (newUsername is not null)
      {
        return newUsername;
      }
    }

    return null;
  }

  public async Task<LoginCheckStatus> VerifyApiCredentialsAsync(string bearerToken, CancellationToken cancellationToken = default)
  {
    var result = await CheckUserPredicateAsync(
      u => !u.LockedSince.HasValue && u.BearerToken == bearerToken,
      cancellationToken: cancellationToken);

    return result.Length > 0
      ? LoginCheckStatus.Success
      : LoginCheckStatus.InvalidCredentials;
  }

  public async Task ProcessFailedLoginAttemptAsync(string username, CancellationToken cancellationToken = default)
  {
    var tenants = await _mtnt.Tenants
      .Where(tenant => tenant.DeletionDate == null && tenant.LockedSince == null)
      .Select(tenant => new { tenant.GUID, tenant.Name })
      .ToListAsync(cancellationToken);

    foreach (var tenant in tenants)
    {
      using var context = MakeIAMDbContext(tenant.GUID);

      var user = await context.Users.FirstOrDefaultAsync(
        user => user.UserName == username && user.LockedSince == null,
        cancellationToken);

      if (user == null)
      {
        continue;
      }

      user.IncreaseFailedLoginAttemptsCount();

      if (user.FailedLoginAttemptsCount > Constants.MAX_FAILED_LOGIN_ATTEMPS_COUNT)
      {
        user.Suspend(UserStatus.Suspended, lockedSince: DateTime.UtcNow, "Too many failed login attempts");
      }

      await context.SaveChangesAsync(cancellationToken);
    }
  }

  public async Task ResetLoginAttemptsCountAsync(string username, CancellationToken cancellationToken = default)
  {
    var tenants = await _mtnt.Tenants
      .Where(tenant => tenant.DeletionDate == null && tenant.LockedSince == null)
      .Select(tenant => new { tenant.GUID, tenant.Name })
      .ToListAsync(cancellationToken);

    foreach (var tenant in tenants)
    {
      using var context = MakeIAMDbContext(tenant.GUID);

      var user = await context.Users.FirstOrDefaultAsync(
        user => user.UserName == username && user.LockedSince == null,
        cancellationToken);

      if (user == null)
      {
        continue;
      }

      user.ResetFailedLoginAttemptsCountAsync();
      await context.SaveChangesAsync(cancellationToken);
    }
  }

  public async Task<Dictionary<Guid, string>> GetUserActiveTenantsAsync(string username, CancellationToken cancellationToken = default)
  {
    var checkUsername = username.ToLowerInvariant();

    return (await CheckUserPredicateAsync(
      u => !u.LockedSince.HasValue && u.UserName == checkUsername,
      cancellationToken: cancellationToken))
      .ToDictionary(ur => ur.tenantGuid, ur => ur.tenantName);
  }

  public async Task<Dictionary<Guid, string>> GetUserAllTenantsAsync(string username, CancellationToken cancellationToken = default)
  {
    var checkUsername = username.ToLowerInvariant();

    return (await CheckUserPredicateAsync(
      u => u.UserName == checkUsername, cancellationToken: cancellationToken)
    )
    .ToDictionary(ur => ur.tenantGuid, ur => ur.tenantName);
  }

  public async Task<OfficeAccess> GetUserOfficeAccessAsync(
    string username,
    Guid tenant,
    CancellationToken cancellationToken = default)
  {
    using var context = MakeIAMDbContext(tenant);

    var user = await context.Users.SingleAsync(
      user => !user.DeletionDate.HasValue &&
      user.UserName == username.ToLowerInvariant(),
      cancellationToken);

    return user.OfficeAccess;
  }

  public async Task<Dictionary<string, string>> GetUserFeaturesAsync(
    string username,
    Guid tenant,
    CancellationToken cancellationToken = default)
  {
    using var context = MakeIAMDbContext(tenant);

    var checkUsername = username.ToLowerInvariant();

    var user = await context.Users
      .Include(u => u.UserGroups)
        .ThenInclude(ug => ug.Group)
        .ThenInclude(g => g.Features)
      .FirstOrDefaultAsync(u => !u.DeletionDate.HasValue && u.UserName == checkUsername, cancellationToken);

    if (user == null)
    {
      _logger.LogInformation("Unable to find user {username} in {tenantId} for enabled features",
        checkUsername,
        tenant);
      return new Dictionary<string, string>();
    }

    return user.Groups
      .SelectMany(g => g.Features)
      .GroupBy(f => f.Feature)
      .ToDictionary(
        fgrp => fgrp.Key,
        fgrp =>
          (fgrp.Any(f => f.CanCreate) ? "C" : string.Empty) +
          (fgrp.Any(f => f.CanRead) ? "R" : string.Empty) +
          (fgrp.Any(f => f.CanUpdate) ? "U" : string.Empty) +
          (fgrp.Any(f => f.CanDelete) ? "D" : string.Empty));
  }

  public async Task<bool> UpdatePasswordAsync(
    string username,
    string oldPasswordHash,
    string newPasswordHash,
    CancellationToken cancellationToken = default)
  {
    // This method also updates all tenants where password is null,
    //  provided that at least one provider exists with this password.
    // This is to support the user being later invited to join a second tenant,
    //  and then being removed from the previous.
    // If the passwords are different, the password update timestamp is updated.
    // This method should be called on each successful login.

    var isLoginSuccessful = await VerifyUserCredentialsAsync(username, oldPasswordHash, cancellationToken);

    if (isLoginSuccessful == LoginCheckStatus.InvalidCredentials)
    {
      _logger.LogWarning("Invalid old password on password update for {username}",
          username);

      return false;
    }

    // If password verified successfully, update everywhere, even for
    //  users where external auth is set up
    var tenants = await _mtnt.Tenants
      .Where(t => !t.DeletionDate.HasValue && !t.LockedSince.HasValue)
      .Select(t => new { t.GUID, t.Name })
      .ToDictionaryAsync(o => o.GUID, o => o.Name, cancellationToken);

    var checkUsername = username.ToLowerInvariant();

    foreach (var tenant in tenants)
    {
      using var context = MakeIAMDbContext(tenant.Key);

      var user = await context.Users
        .FirstOrDefaultAsync(
          u => !u.DeletionDate.HasValue && u.UserName == checkUsername,
          cancellationToken);

      if (user != null)
      {
        user.SetPassword(_passwordHasher.HashPassword(new object(), newPasswordHash));

        await context.SaveChangesAsync(cancellationToken);
      }
    }

    return true;
  }

  public async Task AddSessionAndClearExpiredAsync(
    string username,
    Guid tenant,
    Session session,
    CancellationToken cancellationToken = default)
  {
    using var context = MakeIAMDbContext(tenant);

    var user = await context.Users
      .Include(user => user.Sessions)
      .SingleAsync(user => user.UserName == username, cancellationToken);

    user.AddSession(session);
    user.CleanExpiredSessions();

    await context.SaveChangesAsync(cancellationToken);
  }

  public async Task<Session?> GetSessionByRefreshTokenAsync(
    string username,
    Guid tenant,
    string refreshToken,
    CancellationToken cancellationToken = default)
  {
    using var context = MakeIAMDbContext(tenant);

    return await context.Users
      .Where(user => user.UserName == username)
      .SelectMany(user => user.Sessions)
      .Where(session => session.RefreshToken == refreshToken && session.RefreshTokenExpiration > DateTime.UtcNow)
      .SingleOrDefaultAsync(cancellationToken);
  }

  public async Task RefreshSessionAsync(
    string username,
    Guid tenant,
    int sessionId,
    string refreshToken,
    DateTime refreshTokenExpiration,
    string? userAgent,
    string? refreshIP,
    string? refreshLocation,
    CancellationToken cancellationToken = default)
  {
    using var context = MakeIAMDbContext(tenant);

    var user = await context.Users
      .Include(user => user.Sessions)
      .SingleAsync(user => user.UserName == username, cancellationToken);

    var session = user.Sessions.Single(session => session.Id == sessionId);
    session.SetRefreshToken(refreshToken, refreshTokenExpiration);
    session.SetRefreshUserData(userAgent, refreshIP, refreshLocation);

    await context.SaveChangesAsync(cancellationToken);
  }

  private async Task<UserResult[]> CheckUserPredicateAsync(
    Expression<Func<User, bool>> userPredicateExpression,
    string? passwordToCheck = null,
    bool markLogin = false,
    CancellationToken cancellationToken = default)
  {
    var tenants = await _mtnt.Tenants
      .Where(t => !t.DeletionDate.HasValue && !t.LockedSince.HasValue)
      .Select(t => new { t.GUID, t.Name })
      .ToDictionaryAsync(o => o.GUID, o => o.Name, cancellationToken);

    var outList = new List<UserResult>();

    foreach (var tenant in tenants)
    {
      using var context = MakeIAMDbContext(tenant.Key);

      var firstFound = await context.Users
        .Where(u => !u.DeletionDate.HasValue)
        .FirstOrDefaultAsync(userPredicateExpression, cancellationToken);

      if (firstFound == null)
      {
        continue;
      }

      var passwordMatch = passwordToCheck is not null
        && firstFound.PasswordHash != null
        && _passwordHasher.VerifyHashedPassword(new object(), firstFound.PasswordHash, passwordToCheck) != PasswordVerificationResult.Failed;

      if (passwordToCheck is null || passwordMatch)
      {
        outList.Add(new UserResult(
          tenant.Key,
          tenant.Value,
          firstFound
        ));
      }

      if (markLogin)
      {
        firstFound.MarkLogin(passwordMatch);
      }
    }

    return [.. outList];
  }

  private IAMDbContext MakeIAMDbContext(Guid tenant)
    => new(_configuration, null, null, tenant);

  private sealed record UserResult(Guid tenantGuid, string tenantName, User user);
}
