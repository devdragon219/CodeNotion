using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Econ.Data;

namespace RealGimm.Infra.MsSql;

public class EconContextFactory : IDesignTimeDbContextFactory<EconDbContext>
{
  public EconDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "MsSqlServer")
      ])
      .Build();

    return new EconDbContext(configuration, null, null, null);
  }
}
