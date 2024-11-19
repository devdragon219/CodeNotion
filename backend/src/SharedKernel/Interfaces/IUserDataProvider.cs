namespace RealGimm.SharedKernel.Interfaces;

public interface IUserDataProvider
{
  string Username { get; }
  Guid TenantId { get; }
  bool IsHeadlessTask { get; }
  
  public void SetUsername(string username);

  public void SetTenantId(Guid tenantId);  
}
