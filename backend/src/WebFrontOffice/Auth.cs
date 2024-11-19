using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebFrontOffice;

public class Auth : IAuthSettingsProvider
{
  public static readonly string ISSUER = "https://auth-frontoffice.realgimm.com";
  public static readonly string AUDIENCE = "https://graphql-frontoffice.realgimm.com";
  public string Issuer => ISSUER;

  public string Audience => AUDIENCE;
}