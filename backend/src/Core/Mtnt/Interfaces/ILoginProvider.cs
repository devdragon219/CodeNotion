using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Core.Mtnt.Interfaces;

public interface ILoginProvider
{
  Task<LoginCheckStatus> VerifyUserCredentialsAsync(string username, string passwordHash, CancellationToken cancellationToken = default);
  
  Task<string?> VerifyUserTokenAsync(
    string issuer,
    string[] audiences,
    string subject,
    CancellationToken cancellationToken = default);

  Task<string?> TryAutocreateUser(
    string issuer,
    string[] audiences,
    string subject,
    string username,
    string firstName,
    CancellationToken cancellationToken = default);
  
  Task<LoginCheckStatus> VerifyApiCredentialsAsync(string bearerToken, CancellationToken cancellationToken = default);

  Task ProcessFailedLoginAttemptAsync(string username, CancellationToken cancellationToken = default);
  
  Task ResetLoginAttemptsCountAsync(string username, CancellationToken cancellationToken = default);

  Task<Dictionary<Guid, string>> GetUserActiveTenantsAsync(string username, CancellationToken cancellationToken = default);
  
  Task<Dictionary<Guid, string>> GetUserAllTenantsAsync(string username, CancellationToken cancellationToken = default);
  
  Task<Dictionary<string, string>> GetUserFeaturesAsync(
    string username,
    Guid tenant,
    CancellationToken cancellationToken = default);

  Task<OfficeAccess> GetUserOfficeAccessAsync(string username, Guid tenant, CancellationToken cancellationToken = default);

  Task<bool> UpdatePasswordAsync(
    string username,
    string oldPasswordHash,
    string newPasswordHash,
    CancellationToken cancellationToken = default);

  Task AddSessionAndClearExpiredAsync(
    string username,
    Guid tenant,
    Session session,
    CancellationToken cancellationToken = default);

  Task<Session?> GetSessionByRefreshTokenAsync(
    string username,
    Guid tenant,
    string refreshToken,
    CancellationToken cancellationToken = default);

  Task RefreshSessionAsync(
    string username,
    Guid tenant,
    int sessionId,
    string refreshToken,
    DateTime refreshTokenExpiration,
    string? userAgent,
    string? refreshIP,
    string? refreshLocation,
    CancellationToken cancellationToken = default);
}
