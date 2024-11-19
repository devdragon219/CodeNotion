using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web;

public class UserDataProvider : IUserDataProvider
{
  public static readonly UserDataProvider Instance = new();
  
  private Guid _tenantId;
  private string _username = "admin@tenant1"; // must match the user configured in TestInfrastructureProvider to access all subjects

  public string Username => _username;
  public Guid TenantId => _tenantId;
  public bool IsHeadlessTask => false;

  public void SetUsername(string username) => _username = username ?? throw new ArgumentNullException(nameof(username));

  public void SetTenantId(Guid tenantId) => _tenantId = tenantId;
}
