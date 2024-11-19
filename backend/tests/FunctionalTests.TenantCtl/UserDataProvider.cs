using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.TenantCtl;

public class UserDataProvider : IUserDataProvider
{
  public static readonly UserDataProvider Instance = new();
  
  private Guid _tenantId;
  private string _username = "FunctionalTests";

  public string Username => _username;
  public Guid TenantId => _tenantId;
  public bool IsHeadlessTask => true;

  public void SetUsername(string username) => _username = username ?? throw new ArgumentNullException(nameof(username));

  public void SetTenantId(Guid tenantId) => _tenantId = tenantId;
}
