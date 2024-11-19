using System.Security.Cryptography;
using Microsoft.Extensions.Configuration;

namespace RealGimm.WebCommons.GraphQL.User;

public static class RefreshToken
{
  private const int _defaultDurationMinutes = 480;

  public const string CONFIG_DURATION_KEY = "RefreshTokenDuration";

  public static string Generate()
  {
    var randomNumber = new byte[64];
    
    using var generator = RandomNumberGenerator.Create();
    generator.GetBytes(randomNumber);

    return Convert.ToBase64String(randomNumber);
  }

  public static DateTime GetExpiration(IConfiguration configuration)
  {
    if (!int.TryParse(configuration[CONFIG_DURATION_KEY], out var duration))
    {
      duration = _defaultDurationMinutes;
    }

    return DateTime.UtcNow.AddMinutes(duration);
  }
}
