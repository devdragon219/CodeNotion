using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.IAM.Data;

namespace RealGimm.Infra.MsSql;

public class IAMContextFactory : IDesignTimeDbContextFactory<IAMDbContext>
{
  public IAMDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "MsSqlServer")
      ])
      .Build();

    return new IAMDbContext(configuration, null, null, null);
  }
}
