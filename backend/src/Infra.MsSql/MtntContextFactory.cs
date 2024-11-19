using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using RealGimm.Infrastructure.Mtnt.Data;

namespace RealGimm.Infra.MsSql;

public class MtntContextFactory : IDesignTimeDbContextFactory<MtntDbContext>
{
  public MtntDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .AddCommandLine(args)
      .AddInMemoryCollection([
        new KeyValuePair<string, string?>("DatabaseProvider", "MsSqlServer")
      ])
      .Build();

    return new MtntDbContext(configuration, null, null);
  }
}
