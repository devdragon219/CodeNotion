using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Collections.Concurrent;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.IAM;

public class JWTVerifier : IJWTVerifier
{
  // Cache configuration managers to avoid fetching JWKS on every request
  private static readonly ConcurrentDictionary<string, ConfigurationManager<OpenIdConnectConfiguration>>
    _configurationManagers = new();

  public async Task<JsonWebToken?> CheckIssuerSignature(string jwt)
  {
    if (string.IsNullOrEmpty(jwt))
      return null;

    // Parse the JWT safely without validating        
    var tokenHandler = new JsonWebTokenHandler();
    var jwtToken = tokenHandler.ReadJsonWebToken(jwt);

    if (jwtToken == null)
      return null;

    // Extract issuer from token
    string issuer = jwtToken.Issuer;
    if (string.IsNullOrEmpty(issuer))
      return null;

    ConfigurationManager<OpenIdConnectConfiguration> configurationManager = _configurationManagers.GetOrAdd(
        issuer,
        issuer => new ConfigurationManager<OpenIdConnectConfiguration>(
            $"{issuer}/.well-known/openid-configuration",
            new OpenIdConnectConfigurationRetriever()));

    OpenIdConnectConfiguration config = await configurationManager.GetConfigurationAsync();

    TokenValidationParameters validationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidIssuer = issuer,
      ValidateIssuerSigningKey = true,
      IssuerSigningKeys = config.SigningKeys,
      ValidateLifetime = true,
      ValidateAudience = false // Audience is not to be checked now
    };

    try
    {
      // Validate token
      var validationResult = await tokenHandler.ValidateTokenAsync(jwt, validationParameters);

      // Return the issuer if valid
      return jwtToken;
    }
    catch (SecurityTokenException)
    {
      // Token validation failed
      return null;
    }
  }

  public async Task<bool> CheckAudience(string jwt, string audience)
  {
    if (string.IsNullOrEmpty(jwt))
      return false;

    // Parse the JWT safely without validating        
    var tokenHandler = new JsonWebTokenHandler();
    var jwtToken = tokenHandler.ReadJsonWebToken(jwt);

    if (jwtToken == null)
      return false;

    // Extract issuer from token
    string issuer = jwtToken.Issuer;
    if (string.IsNullOrEmpty(issuer))
      return false;

    ConfigurationManager<OpenIdConnectConfiguration> configurationManager = _configurationManagers.GetOrAdd(
        issuer,
        issuer => new ConfigurationManager<OpenIdConnectConfiguration>(
            $"{issuer}/.well-known/openid-configuration",
            new OpenIdConnectConfigurationRetriever()));

    OpenIdConnectConfiguration config = await configurationManager.GetConfigurationAsync();

    TokenValidationParameters validationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidIssuer = issuer,
      ValidateIssuerSigningKey = true,
      IssuerSigningKeys = config.SigningKeys,
      ValidateLifetime = true,
      ValidateAudience = true,
      ValidAudience = audience
    };

    try
    {
      // Validate token
      var validationResult = await tokenHandler.ValidateTokenAsync(jwt, validationParameters);

      return true;
    }
    catch (SecurityTokenException)
    {
      // Token validation failed
      return false;
    }
  }
}