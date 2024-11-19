using Microsoft.Extensions.Hosting;

namespace RealGimm.FunctionalTests.Tasks;

public interface ITestHostProvider
{
  public IHost GetHost();
  public Task ResetTenantDatabaseAsync();
}
