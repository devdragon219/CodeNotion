using Microsoft.IdentityModel.JsonWebTokens;

namespace RealGimm.SharedKernel.Interfaces;

public interface IJWTVerifier
{
  Task<JsonWebToken?> CheckIssuerSignature(string jwt);
  Task<bool> CheckAudience(string jwt, string audience);
}