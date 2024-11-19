using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Fclt.Data;

namespace RealGimm.Infra.MsSql;

public class FcltContextFactory : IDesignTimeDbContextFactory<FcltDbContext>
{
  public FcltDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "MsSqlServer")
      ])
      .Build();

    return new FcltDbContext(configuration, null, null, null);
  }
}
