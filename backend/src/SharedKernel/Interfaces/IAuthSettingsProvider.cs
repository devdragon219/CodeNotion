namespace RealGimm.SharedKernel.Interfaces;

public interface IAuthSettingsProvider
{
  public string Issuer { get; }
  public string Audience { get; }
}