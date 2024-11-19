namespace RealGimm.SharedKernel.Interfaces;

public interface IUserDataGenerator
{
  (string, string, string) GetAdminUsernamePasswordAndHash(string tenantName);
}