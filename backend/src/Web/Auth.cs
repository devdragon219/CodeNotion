using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web;
public class Auth : IAuthSettingsProvider
{
  public static readonly string ISSUER = "https://auth-backoffice.realgimm.com";
  public static readonly string AUDIENCE = "https://graphql-backoffice.realgimm.com";
  public string Issuer => ISSUER;

  public string Audience => AUDIENCE;
}