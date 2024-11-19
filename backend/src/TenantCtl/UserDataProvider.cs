using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.TenantCtl;

public class UserDataProvider : IUserDataProvider
{
  private Guid _tenantId;
  private string _username = "TenantCtl";

  public string Username => _username;
  public Guid TenantId => _tenantId;
  public bool IsHeadlessTask => true;
  
  public void SetTenantId(Guid tenantId) => _tenantId = tenantId;

  public void SetUsername(string username) => _username = username ?? "TenantCtl";
}
