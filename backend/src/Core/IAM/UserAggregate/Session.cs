using System.ComponentModel.DataAnnotations;
using HotChocolate;

namespace RealGimm.Core.IAM.UserAggregate;

public class Session : EntityBase
{
  [Required, MaxLength(StrFieldSizes.HASH_OR_TOKEN), GraphQLIgnore]
  public string? RefreshToken { get; private set; }

  [MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? LoginUserAgent { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? LoginIPAddress { get; private set; }
  [MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? LoginLocation { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? LastRefreshIPAddress { get; private set; }
  [MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? LastRefreshLocation { get; private set; }
  [MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? LastRefreshUserAgent { get; private set; }
  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;
  public DateTime RefreshTokenExpiration { get; private set; }

  public void SetCreationDate(DateTime newCreationDate) => CreationDate = newCreationDate;

  public void SetUserData(string? userAgent, string? loginIP, string? loginLocation)
  {
    LoginUserAgent = userAgent;
    LoginIPAddress = loginIP;
    LoginLocation = loginLocation;
  }

  public void SetRefreshUserData(string? userAgent, string? ip, string? location)
  {
    LastRefreshIPAddress = ip;
    LastRefreshLocation = location;;
  }

  public void SetRefreshToken(string newToken, DateTime expiration)
  {
    RefreshToken = newToken;
    RefreshTokenExpiration = expiration;
  }
}
