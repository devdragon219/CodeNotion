using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.IntegrationTests;

public class UserDataProvider : IUserDataProvider
{
  public static readonly UserDataProvider Instance = new();
    
  private Guid _tenantId = new("23678668-d90a-49e4-b542-b0d96f5122c2");
  private string _username = "IntegrationTests";

  public string Username => _username;
  public Guid TenantId => _tenantId;

  //For testing purposes, apply the filtering logic.
  public bool IsHeadlessTask => false;

  public void SetUsername(string username) => _username = username ?? throw new ArgumentNullException(nameof(username));

  public void SetTenantId(Guid tenantId) => _tenantId = tenantId;
}
