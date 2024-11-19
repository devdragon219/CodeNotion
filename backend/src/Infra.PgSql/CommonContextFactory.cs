using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Common.Data;

namespace RealGimm.Infra.PgSql;

public class CommonContextFactory : IDesignTimeDbContextFactory<CommonDbContext>
{
  public CommonDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "PostgreSQL")
      ])
      .Build();

    return new CommonDbContext(configuration, null, null, null);
  }
}
