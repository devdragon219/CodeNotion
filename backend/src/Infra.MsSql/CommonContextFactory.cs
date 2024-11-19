using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Common.Data;

namespace RealGimm.Infra.MsSql;

public class CommonContextFactory : IDesignTimeDbContextFactory<CommonDbContext>
{
  public CommonDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "MsSqlServer")
      ])
      .Build();

    return new CommonDbContext(configuration, null, null, null);
  }
}
